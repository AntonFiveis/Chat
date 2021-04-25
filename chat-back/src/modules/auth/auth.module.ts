import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { PgService } from '../pg/pg.service';
import { PgModule } from '../pg/pg.module';

@Module({
  imports: [UsersModule, PgModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, PgService],
  exports: [AuthService, UsersService, PgService],
})
export class AuthModule {}
