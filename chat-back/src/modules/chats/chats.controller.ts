import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
  Query,
  Res,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { ChatsService } from './chats.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtValidationOutput } from '../auth/jwt.strategy';

@UseGuards(JwtAuthGuard)
@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}
  @Get('/:filename')
  async getChatPhoto(
    @Res() res: Response,
    @Param('filename') filename: string,
  ): Promise<void> {
    const stream = await this.chatsService.getPhoto(filename);
    stream.pipe(res);
  }

  @Post('/file')
  @UseInterceptors(FileInterceptor('image'))
  async uploadChatPhoto(
    @UploadedFile() image: Express.Multer.File,
    @Request() { user }: JwtValidationOutput,
    @Query('chatID') chatID: string,
  ): Promise<string> {
    return this.chatsService.uploadPhoto(image, chatID, user.userID);
  }
}
