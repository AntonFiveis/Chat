import {
  Body,
  Controller,
  Delete,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './interfaces/auth-credentials-dto';
import { TokensPair } from './interfaces/tokens-pair';
import { UsersDto } from '../users/interfaces/users.dto';
import { WsSessionsService } from '../ws-sessions/ws-sessions.service';
import { JwtValidationOutput } from './jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private wsSessionsService: WsSessionsService,
  ) {}

  sendTokens({ accessToken, refreshToken }: TokensPair, res: Response): void {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 5.184e9,
      path: '/api/auth',
      secure: true,
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 5.184e9,
      path: '/',
      secure: true,
    });
    const finishDate = Number(new Date()) + 20 * 60 * 1000;
    res.send({ accessToken, finishDate });
  }

  @Post('signup')
  async signUp(
    @Body('user') userDTO: UsersDto,
    @Body('fingerprint') fingerprint: string,
    @Res({ passthrough: true }) res: Response,
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
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    try {
      const { accessToken, refreshToken } = await this.authService.login(
        { email, password },
        fingerprint,
      );
      this.sendTokens({ accessToken, refreshToken }, res);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Delete()
  async logout(
    @Req() { user }: JwtValidationOutput,
    @Body('fingerprint') fingerprint: string,
  ): Promise<void> {
    await this.authService.logout(user.email, fingerprint);
  }

  @Post('refresh')
  async refreshTokenPair(
    @Req() request: Request,
    @Body('fingerprint') fingerprint: string,
    @Res() res: Response,
  ): Promise<void> {
    if (!request.cookies['refreshToken'] || !request.cookies['accessToken'])
      throw new UnauthorizedException();
    const {
      accessToken,
      refreshToken,
    }: TokensPair = await this.authService.refreshToken(
      request.cookies['refreshToken'],
      fingerprint,
    );
    this.wsSessionsService.updateSession(request.cookies['accessToken'], {
      accessToken,
    });
    this.sendTokens({ accessToken, refreshToken }, res);
  }
}
