import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import Messages from './interfaces/messages.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtValidationOutput } from '../auth/jwt.strategy';
import { Response } from 'express';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/file')
  @UseInterceptors(FileInterceptor('image'))
  async uploadChatPhoto(
    @UploadedFile() image: Express.Multer.File,
    @Request() { user }: JwtValidationOutput,
    @Query('chatUUID') chatUUID: string,
  ): Promise<void> {
    await this.messagesService.uploadPhoto(image, chatUUID, user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async get50MessagesFromBothSides(
    @Query('date') date: Date,
    @Query('chatUUID') chatUUID: string,
  ): Promise<Messages[]> {
    return this.messagesService.get50MessagesFromBothSidesOf(chatUUID, date);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/unread-count')
  async getUnreadMessCount(
    @Query('lastMessageUUID') lastMessageUUID: string,
    @Query('chatUUID') chatUUID: string,
  ): Promise<number> {
    return this.messagesService.getUnreadMessCount(chatUUID, lastMessageUUID);
  }
  @Get('/:filename')
  async getChatPhoto(
    @Res() res: Response,
    @Param('filename') filename: string,
  ): Promise<void> {
    const stream = await this.messagesService.getPhoto(filename);
    stream.pipe(res);
  }
}
