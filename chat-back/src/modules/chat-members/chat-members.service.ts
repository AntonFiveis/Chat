import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { ChatMembersDTO } from './interfaces/chat-members.dto';
import ChatMembers from './interfaces/chat-members.entity';

@Injectable()
export class ChatMembersService {
  constructor(private pgService: PgService) {}
  private tableName = 'ChatMembers';

  async getChatMembers(chatID: string): Promise<ChatMembers[]> {
    return this.pgService.find({
      tableName: this.tableName,
      where: { chatID },
    });
  }

  async getMyChats(userID: string): Promise<ChatMembers[]> {
    return this.pgService.find({
      tableName: this.tableName,
      where: { userID },
    });
  }

  async addUserToChat({ userID, chatID }: ChatMembersDTO): Promise<void> {
    await this.pgService.create({
      tableName: this.tableName,
      values: [{ userID, chatID }],
    });
  }

  async removeUserFromChat({ userID, chatID }: ChatMembersDTO): Promise<void> {
    await this.pgService.delete({
      tableName: this.tableName,
      where: { userID, chatID },
    });
  }
}
