import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PgModule } from '../pg/pg.module';
import { PgService } from '../pg/pg.service';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [PgModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, PgService, JwtStrategy],
  exports: [UsersService, PgService],
})
export class UsersModule {}
