import {Controller, Post, UseGuards, Request, Body} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtValidationOutput } from '../auth/jwt.strategy';
import {ChatsDTO} from "./interfaces/chats.dto";

@UseGuards(JwtAuthGuard)
@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}
  @Post()
  async createNewChat(
    @Request() { user }: JwtValidationOutput,
    @Body('chatDTO') chatDTO: ChatsDTO,
  ): Promise<string> {
    return await this.chatsService.createChat(chatDTO);
  }
}
