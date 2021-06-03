import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { ChatMembersDTO } from './interfaces/chat-members.dto';
import ChatMembers from './interfaces/chat-members.entity';
import { UsersService } from '../users/users.service';
import { UsersOutputDTO } from '../users/interfaces/users.output.dto';
@Injectable()
export class ChatMembersService {
  constructor(
    private pgService: PgService,
    private usersService: UsersService,
  ) {}
  private tableName = 'ChatMembers';

  async getChatMembers(chatUUID: string): Promise<UsersOutputDTO[]> {
    const userEmails: ChatMembers[] = await this.pgService.find({
      tableName: this.tableName,
      where: { chatUUID },
    });
    return Promise.all(
      userEmails.map(async (user) => {
        return this.usersService.findOneByEmail(user.userEmail);
      }),
    );
  }

  async getMyChats(userEmail: string): Promise<ChatMembers[]> {
    return await this.pgService.find({
      tableName: this.tableName,
      where: { userEmail },
    });
  }

  async addUsersToChat(chatMembersDTO: ChatMembersDTO[]): Promise<void> {
    for (const cm of chatMembersDTO) {
      await this.pgService.create({
        tableName: this.tableName,
        values: [{ ...cm }],
      });
    }
  }

  async removeUserFromChat({
    userEmail,
    chatUUID,
  }: ChatMembersDTO): Promise<void> {
    await this.pgService.delete({
      tableName: this.tableName,
      where: { userEmail, chatUUID },
    });
  }
}
