import { Module } from '@nestjs/common';
import { ChatMembersService } from './chat-members.service';
import { ChatMembersController } from './chat-members.controller';
import { UsersModule } from '../users/users.module';
import { ChatsModule } from '../chats/chats.module';
import { UsersService } from '../users/users.service';
import { ChatsService } from '../chats/chats.service';
import { MessagesService } from '../messages/messages.service';

@Module({
  imports: [ChatsModule, UsersModule],
  providers: [ChatMembersService, ChatsService, UsersService, MessagesService],
  controllers: [ChatMembersController],
  exports: [UsersService],
})
export class ChatMembersModule {}
