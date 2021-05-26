import { Module } from '@nestjs/common';
import { WsSessionsService } from './ws-sessions.service';
import { WsSessionsGateway } from './ws-sessions.gateway';
import { ChatsModule } from '../chats/chats.module';
import { ChatsService } from '../chats/chats.service';
import { MessagesModule } from '../messages/messages.module';
import { MessagesService } from '../messages/messages.service';
import { ChatMembersModule } from '../chat-members/chat-members.module';
import { ChatMembersService } from '../chat-members/chat-members.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ChatsModule,
    MessagesModule,
    ChatMembersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [
    WsSessionsService,
    WsSessionsGateway,
    ChatsService,
    MessagesService,
    ChatMembersService,

  ],
})
export class WsSessionsModule {}
