import { forwardRef, Module } from '@nestjs/common';
import { ChatMembersService } from './chat-members.service';
import { ChatMembersController } from './chat-members.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { MessagesService } from '../messages/messages.service';
import { WsSessionsService } from '../ws-sessions/ws-sessions.service';

@Module({
  imports: [UsersModule, WsSessionsService],
  providers: [
    ChatMembersService,
    UsersService,
    MessagesService,
    WsSessionsService,
  ],
  controllers: [ChatMembersController],
  exports: [UsersService],
})
export class ChatMembersModule {}
