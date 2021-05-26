import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { PgService } from '../pg/pg.service';
import { PgModule } from '../pg/pg.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { WsSessionsModule } from '../ws-sessions/ws-sessions.module';
import { WsSessionsService } from '../ws-sessions/ws-sessions.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
    PgModule,
    WsSessionsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    PgService,
    JwtStrategy,
    WsSessionsService,
  ],
  exports: [AuthService, UsersService, PgService, JwtStrategy, JwtModule],
})
export class AuthModule {}
