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
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    ChatsModule,
    MessagesModule,
    ChatMembersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
    UsersModule,
  ],
  providers: [
    WsSessionsService,
    WsSessionsGateway,
    ChatsService,
    MessagesService,
    ChatMembersService,
    UsersService,
  ],
})
export class WsSessionsModule {}
