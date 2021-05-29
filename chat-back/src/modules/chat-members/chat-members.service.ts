import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { ChatMembersDTO } from './interfaces/chat-members.dto';
import ChatMembers from './interfaces/chat-members.entity';
import { UsersService } from '../users/users.service';
import { Users } from '../users/interfaces/users.entity';
import { v4 as uuid } from 'uuid';
@Injectable()
export class ChatMembersService {
  constructor(
    private pgService: PgService,
    private usersService: UsersService,
  ) {}
  private tableName = 'ChatMembers';

  async getChatMembers(chatID: string): Promise<Users[]> {
    const userIDs: ChatMembers[] = await this.pgService.find({
      tableName: this.tableName,
      where: { chatID },
    });
    return Promise.all(
      userIDs.map(async (user) => {
        return this.usersService.findOneByID(user.userID);
      }),
    );
  }

  async getMyChats(userID: string): Promise<ChatMembers[]> {
    return await this.pgService.find({
      tableName: this.tableName,
      where: { userID },
    });
  }

  async addUserToChat({ userID, chatID }: ChatMembersDTO): Promise<void> {
    await this.pgService.create({
      tableName: this.tableName,
      values: [{ userID, chatID, chatMembersID: uuid() }],
    });
  }

  async removeUserFromChat({ userID, chatID }: ChatMembersDTO): Promise<void> {
    await this.pgService.delete({
      tableName: this.tableName,
      where: { userID, chatID },
    });
  }
}
