import {
  Controller,
  Get,
  UseGuards,
  Request,
  Patch,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { JwtValidationOutput } from '../auth/jwt.strategy';
import { UsersUpdates } from './interfaces/users.dto';
import { UsersOutputDTO } from './interfaces/users.output.dto';
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('/me')
  async getUserFriends(
    @Request() { user }: JwtValidationOutput,
  ): Promise<UsersOutputDTO> {
    const { password, salt, ...result } = await this.usersService.findOneByID(
      user.userID,
    );
    return result;
  }
  @Patch()
  async updateUserInfo(
    @Request() { user }: JwtValidationOutput,
    @Body('updates') updates: UsersUpdates,
  ): Promise<void> {
    await this.usersService.updateUser(user.userID, updates);
  }
  @Delete()
  async deleteUser(@Request() { user }: JwtValidationOutput): Promise<void> {
    await this.usersService.deleteUser(user.userID);
  }
  @Get('/email')
  async getUserByEmail(@Query('email') email: string): Promise<UsersOutputDTO> {
    const {
      password,
      salt,
      ...result
    } = await this.usersService.findOneByEmail(email);
    return result;
  }
  @Get('/phone')
  async getUserByPhone(@Query('phone') phone: string): Promise<UsersOutputDTO> {
    const {
      password,
      salt,
      ...result
    } = await this.usersService.findOneByPhone(phone);
    return result;
  }
  @Get('/nickname')
  async getUserByNickname(@Query('nickname') nickname: string): Promise<UsersOutputDTO> {
    const {
      password,
      salt,
      ...result
    } = await this.usersService.findOneByNickname(nickname);
    return result;
  }
}
