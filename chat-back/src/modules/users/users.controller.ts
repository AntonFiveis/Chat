import {
  Controller,
  Get,
  UseGuards,
  Request,
  Patch,
  Body,
  Delete,
  Query,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  Res,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { JwtValidationOutput } from '../auth/jwt.strategy';
import { UsersUpdates } from './interfaces/users.dto';
import { UsersOutputDTO } from './interfaces/users.output.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('/me')
  async getUserFriends(
    @Request() { user }: JwtValidationOutput,
  ): Promise<UsersOutputDTO> {
    return this.usersService.findOneByEmail(user.email);
  }
  @Patch()
  async updateUserInfo(
    @Request() { user }: JwtValidationOutput,
    @Body('updates') updates: UsersUpdates,
  ): Promise<void> {
    await this.usersService.updateUser(user.email, updates);
  }
  @Delete()
  async deleteUser(@Request() { user }: JwtValidationOutput): Promise<void> {
    await this.usersService.deleteUser(user.email);
  }
  @Get('/email')
  async getUsersByEmail(
    @Query('email') email: string,
  ): Promise<UsersOutputDTO[]> {
    return this.usersService.findByEmail(email);
  }

  @Get('/phone')
  async getUsersByPhone(
    @Query('phone') phone: string,
  ): Promise<UsersOutputDTO[]> {
    return this.usersService.findByPhone(phone);
  }
  @Get('/nickname')
  async getUsersByNickname(
    @Query('nickname') nickname: string,
  ): Promise<UsersOutputDTO[]> {
    return this.usersService.findByNickname(nickname);
  }

  @Post('/file')
  @UseInterceptors(FileInterceptor('image'))
  async uploadChatPhoto(
    @UploadedFile() image: Express.Multer.File,
    @Request() { user }: JwtValidationOutput,
  ): Promise<string> {
    return this.usersService.uploadPhoto(image, user.email);
  }
  @Get('/file/:filename')
  async getPhoto(
    @Res() res: Response,
    @Param('filename') filename: string,
  ): Promise<void> {
    const stream = await this.usersService.getPhoto(filename);
    stream.pipe(res);
  }
}
