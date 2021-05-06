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
import { Users } from './interfaces/users.entity';
import { UsersUpdates } from './interfaces/users-dto';
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('/me')
  async getUserFriends(
    @Request() { user }: JwtValidationOutput,
  ): Promise<Users> {
    return await this.usersService.findOneByID(user.userID);
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
  async getUserByEmail(@Query('email') email: string): Promise<Users> {
    return await this.usersService.findOneByEmail(email);
  }
}
