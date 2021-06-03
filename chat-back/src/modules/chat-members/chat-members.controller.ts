import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatMembersService } from './chat-members.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersOutputDTO } from '../users/interfaces/users.output.dto';
@UseGuards(JwtAuthGuard)
@Controller('chat-members')
export class ChatMembersController {
  constructor(private chatMembersService: ChatMembersService) {}

  @Get('/:chatUUID')
  async getChatMembers(
    @Param('chatUUID') chatUUID: string,
  ): Promise<UsersOutputDTO[]> {
    return this.chatMembersService.getChatMembers(chatUUID);
  }
}
