import {
  Controller,
  Post,
  Query,
  UseGuards,
  Request,
  Delete,
  Get,
} from '@nestjs/common';
import { UsersContactsService } from './users-contacts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtValidationOutput } from '../auth/jwt.strategy';
import { Users } from '../users/interfaces/users.entity';

@UseGuards(JwtAuthGuard)
@Controller('users-contacts')
export class UsersContactsController {
  constructor(private usersContactsService: UsersContactsService) {}

  @Post()
  async addFriend(
    @Request() { user }: JwtValidationOutput,
    @Query('friendUserID') friendUserID: string,
  ): Promise<void> {
    await this.usersContactsService.addFriend({
      userID: user.userID,
      friendUserID,
    });
  }

  @Delete()
  async removeFriend(
    @Request() { user }: JwtValidationOutput,
    @Query('friendUserID') friendUserID: string,
  ): Promise<void> {
    await this.usersContactsService.deleteFromFriendList({
      userID: user.userID,
      friendUserID,
    });
  }

  @Get()
  async getMyFriendList(
    @Request() { user }: JwtValidationOutput,
  ): Promise<Users[]> {
    return this.usersContactsService.getFriendList(user.userID);
  }
}
