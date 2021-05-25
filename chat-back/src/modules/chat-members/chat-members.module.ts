import { Module } from '@nestjs/common';
import { ChatMembersService } from './chat-members.service';
import { ChatMembersController } from './chat-members.controller';

@Module({
  providers: [ChatMembersService],
  controllers: [ChatMembersController],
})
export class ChatMembersModule {}
