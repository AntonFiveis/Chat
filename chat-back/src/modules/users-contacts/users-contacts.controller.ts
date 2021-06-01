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
import {UsersOutputDTO} from "../users/interfaces/users.output.dto";

@UseGuards(JwtAuthGuard)
@Controller('users-contacts')
export class UsersContactsController {
  constructor(private usersContactsService: UsersContactsService) {}

  @Post()
  async addFriend(
    @Request() { user }: JwtValidationOutput,
    @Query('friendUserEmail') friendUserEmail: string,
  ): Promise<void> {
    await this.usersContactsService.addFriend({
      userEmail: user.email,
      friendUserEmail,
    });
  }

  @Delete()
  async removeFriend(
    @Request() { user }: JwtValidationOutput,
    @Query('friendUserEmail') friendUserEmail: string,
  ): Promise<void> {
    await this.usersContactsService.deleteFromFriendList({
      userEmail: user.email,
      friendUserEmail,
    });
  }

  @Get()
  async getMyFriendList(
    @Request() { user }: JwtValidationOutput,
  ): Promise<UsersOutputDTO[]> {
    return this.usersContactsService.getFriendList(user.email);
  }
}
