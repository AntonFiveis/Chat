import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MessagesModule } from '../messages/messages.module';
import { MessagesService } from '../messages/messages.service';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 10485760, //1024 * 1024 * 10 === 10mb
      },
    }),
    MessagesModule,
  ],
  providers: [ChatsService, MessagesService],
  controllers: [ChatsController],
})
export class ChatsModule {}
