import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import Messages from './interfaces/messages.entity';
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}
  @Get()
  async get50MessagesFromBothSides(
    @Query('date') date: Date,
    @Query('chatUUID') chatUUID: string,
  ): Promise<Messages[]> {
    return this.messagesService.get50MessagesFromBothSidesOf(chatUUID, date);
  }
  @Get('/unread-count')
  async getUnreadMessCount(
    @Query('lastMessageUUID') lastMessageUUID: string,
    @Query('chatUUID') chatUUID: string,
  ): Promise<number> {
    return this.messagesService.getUnreadMessCount(chatUUID, lastMessageUUID);
  }
}
