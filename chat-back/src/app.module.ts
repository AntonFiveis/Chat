import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PgModule } from './modules/pg/pg.module';
import { UsersContactsModule } from './modules/users-contacts/users-contacts.module';
import { ChatsModule } from './modules/chats/chats.module';
import { ChatMembersModule } from './modules/chat-members/chat-members.module';
import { WsSessionsModule } from './modules/ws-sessions/ws-sessions.module';
import { MessagesModule } from './modules/messages/messages.module';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    PgModule,
    UsersContactsModule,
    ChatsModule,
    ChatMembersModule,
    WsSessionsModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
