import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatMembersService } from './chat-members.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Users } from '../users/interfaces/users.entity';
@UseGuards(JwtAuthGuard)
@Controller('chat-members')
export class ChatMembersController {
  constructor(private chatMembersService: ChatMembersService) {}

  @Get('/:chatID')
  async getChatMembers(@Param('chatID') chatID: string): Promise<Users[]> {
    return this.chatMembersService.getChatMembers(chatID);
  }
}
