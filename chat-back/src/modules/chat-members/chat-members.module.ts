import { Module } from '@nestjs/common';
import { ChatMembersService } from './chat-members.service';
import { ChatMembersController } from './chat-members.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { MessagesService } from '../messages/messages.service';

@Module({
  imports: [UsersModule],
  providers: [ChatMembersService, UsersService, MessagesService],
  controllers: [ChatMembersController],
  exports: [UsersService],
})
export class ChatMembersModule {}
