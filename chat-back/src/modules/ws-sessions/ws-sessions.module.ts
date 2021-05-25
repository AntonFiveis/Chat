import { Module } from '@nestjs/common';
import { WsSessionsService } from './ws-sessions.service';
import { WsSessionsGateway } from './ws-sessions.gateway';
import { ChatsModule } from '../chats/chats.module';
import { ChatsService } from '../chats/chats.service';
import { MessagesModule } from '../messages/messages.module';
import { MessagesService } from '../messages/messages.service';
import { ChatMembersModule } from '../chat-members/chat-members.module';
import { ChatMembersService } from '../chat-members/chat-members.service';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [ChatsModule, MessagesModule, ChatMembersModule, AuthModule],
  providers: [
    WsSessionsService,
    WsSessionsGateway,
    ChatsService,
    MessagesService,
    ChatMembersService,
    JwtStrategy,
  ],
})
export class WsSessionsModule {}
