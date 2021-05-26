import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { ChatMembersService } from './chat-members.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtValidationOutput } from '../auth/jwt.strategy';
import { ChatsWithMessages } from '../chats/interfaces/chats.output.dto';
import { Users } from '../users/interfaces/users.entity';
@UseGuards(JwtAuthGuard)
@Controller('chat-members')
export class ChatMembersController {
  constructor(private chatMembersService: ChatMembersService) {}

  @Get()
  async getMyChats(
    @Request() { user }: JwtValidationOutput,
  ): Promise<ChatsWithMessages[]> {
    return this.chatMembersService.getMyChats(user.userID);
  }

  @Get('/:chatID')
  async getChatMembers(@Param('chatID') chatID: string): Promise<Users[]> {
    return this.chatMembersService.getChatMembers(chatID);
  }
}
