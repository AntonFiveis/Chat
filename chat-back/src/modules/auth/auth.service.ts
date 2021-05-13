import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { v4 as uuid } from 'uuid';
import {JwtService} from "@nestjs/jwt";
import { TokensPair } from './interfaces/tokens-pair';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDTO } from './interfaces/auth-credentials-dto';
import { UsersDto } from '../users/interfaces/users.dto';
import { Users } from '../users/interfaces/users.entity';
import * as bcrypt from 'bcrypt';
import { RefreshTokenEntity } from './interfaces/refresh-token-entity';
@Injectable()
export class AuthService {
  constructor(
    private pgService: PgService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private tableName = 'RefreshTokens';

  async signUp(userDTO: UsersDto, fingerprint: string): Promise<TokensPair> {
    const userID = await this.usersService.createNewUser(userDTO);
    return await this.createTokenPair(userID, fingerprint);
  }

  async createTokenPair(
    userID: string,
    fingerprint: string,
  ): Promise<TokensPair> {
    const accessToken = this.generateAccessToken(userID);
    const expiresIn = Date.now() + 1000 * 60 * 60 * 24 * 60; // 60 days
    const tokens = (
      await this.pgService.useQuery(
        `SELECT * FROM "RefreshTokens" where "userID" = '${userID}' ORDER BY "expiresIn" `,
      )
    ).rows;
    if (tokens.length > 4) {
      await this.pgService.delete({
        tableName: this.tableName,
        where: { refreshToken: tokens[0].refreshToken },
      });
    }
    const refreshToken = (
      await this.pgService.create({
        tableName: this.tableName,
        values: [{ refreshToken: uuid(), fingerprint, expiresIn, userID }],
        returning: 'refreshToken',
      })
    ).rows[0].refreshToken;
    return { accessToken, refreshToken };
  }

  generateAccessToken(userID: string): string {
    return this.jwtService.sign({ userID });
  }

  async login(
    { email, password }: AuthCredentialsDTO,
    fingerprint: string,
  ): Promise<TokensPair> {
    const user: Users = await this.usersService.findOneByEmail(email);
    if (await this.validatePassword(user, password))
      return this.createTokenPair(user.userID, fingerprint);
    else throw new UnauthorizedException('Incorrect credentials');
  }

  async validatePassword(
    { salt, password }: Users,
    pass: string,
  ): Promise<boolean> {
    return (await bcrypt.hash(pass, salt)) === password;
  }

  async logout(email: string, fingerprint: string): Promise<void> {
    await this.pgService.delete({
      tableName: this.tableName,
      where: { email, fingerprint },
    });
  }

  async refreshToken(
    refreshToken: string,
    fingerprint: string,
  ): Promise<TokensPair> {
    const refreshTokenEntity: RefreshTokenEntity = (
      await this.pgService.useQuery(
        `DELETE FROM "RefreshTokens" where ("refreshToken"='${refreshToken}' AND "fingerprint"='${fingerprint}') RETURNING * `,
      )
    ).rows[0];
    if (!refreshTokenEntity) throw new UnauthorizedException('Invalid session');
    return await this.createTokenPair(refreshTokenEntity.userID, fingerprint);
  }
}
