import { Module } from '@nestjs/common';
import { ChatMembersService } from './chat-members.service';

@Module({
  providers: [ChatMembersService],
})
export class ChatMembersModule {}
