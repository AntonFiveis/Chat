import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MessagesModule } from '../messages/messages.module';
import { MessagesService } from '../messages/messages.service';
import { ChatMembersModule } from '../chat-members/chat-members.module';
import { ChatMembersService } from '../chat-members/chat-members.service';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 10485760, //1024 * 1024 * 10 === 10mb
      },
    }),
    MessagesModule,
    ChatMembersModule,
  ],
  providers: [ChatsService, MessagesService, ChatMembersService],
  controllers: [ChatsController],
  exports: [],
})
export class ChatsModule {}
