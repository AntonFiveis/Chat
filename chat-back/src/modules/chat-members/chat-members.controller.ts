import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { ChatMembersService } from './chat-members.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtValidationOutput } from '../auth/jwt.strategy';
import ChatMembers from './interfaces/chat-members.entity';
@UseGuards(JwtAuthGuard)
@Controller('chat-members')
export class ChatMembersController {
  constructor(private chatMembersService: ChatMembersService) {}

  @Get()
  async getMyChats(
    @Request() { user }: JwtValidationOutput,
  ): Promise<ChatMembers[]> {
    return this.chatMembersService.getMyChats(user.userID);
  }

  @Get('/:chatID')
  async getChatMembers(
    @Param('chatID') chatID: string,
  ): Promise<ChatMembers[]> {
    return this.chatMembersService.getChatMembers(chatID);
  }
}
