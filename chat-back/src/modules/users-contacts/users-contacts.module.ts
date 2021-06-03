import { Module } from '@nestjs/common';
import { UsersContactsService } from './users-contacts.service';
import { UsersContactsController } from './users-contacts.controller';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [AuthModule],
  providers: [UsersContactsService, JwtStrategy],
  controllers: [UsersContactsController],
})
export class UsersContactsModule {}
