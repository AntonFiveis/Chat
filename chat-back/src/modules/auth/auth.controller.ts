import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './interfaces/auth-credentials-dto';
import { TokensPair } from './interfaces/tokens-pair';
import { UsersDTO } from '../users/interfaces/users-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  sendTokens({ accessToken, refreshToken }: TokensPair, res: Response): void {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 5.184e9,
      path: '/auth',
      secure: true,
    });
    res.send({ accessToken });
  }
  @Post('signup')
  async signUp(
    @Body('user') userDTO: UsersDTO,
    @Body('fingerprint') fingerprint: string,
    @Res() res: Response,
  ): Promise<void> {
    const { accessToken, refreshToken } = await this.authService.signUp(
      userDTO,
      fingerprint,
    );
    this.sendTokens({ accessToken, refreshToken }, res);
  }

  @Post('login')
  async login(
    @Body('authCredentials') { email, password }: AuthCredentialsDTO,
    @Body('fingerprint') fingerprint: string,
    @Res() res: Response,
  ): Promise<void> {
    const { accessToken, refreshToken } = await this.authService.login(
      { email, password },
      fingerprint,
    );
    this.sendTokens({ accessToken, refreshToken }, res);
  }

  @Delete()
  async logout(
    @Body('email') email: string,
    @Body('fingerprint') fingerprint: string,
  ): Promise<void> {
    await this.authService.logout(email, fingerprint);
  }

  @Post('refresh')
  async refreshTokenPair(
    @Req() request: Request,
    @Body('fingerprint') fingerprint: string,
    @Res() res: Response,
  ): Promise<void> {
    const {
      accessToken,
      refreshToken,
    }: TokensPair = await this.authService.refreshToken(
      request.cookies['refreshToken'],
      fingerprint,
    );
    this.sendTokens({ accessToken, refreshToken }, res);
  }
}
