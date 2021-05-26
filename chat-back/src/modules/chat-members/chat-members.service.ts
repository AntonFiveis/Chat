import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { ChatMembersDTO } from './interfaces/chat-members.dto';
import ChatMembers from './interfaces/chat-members.entity';
import { ChatsWithMessages } from '../chats/interfaces/chats.output.dto';
import { ChatsService } from '../chats/chats.service';
import { UsersService } from '../users/users.service';
import { Users } from '../users/interfaces/users.entity';

@Injectable()
export class ChatMembersService {
  constructor(
    private pgService: PgService,
    private chatsService: ChatsService,
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

  async getMyChats(userID: string): Promise<ChatsWithMessages[]> {
    const chatsIDs: ChatMembers[] = await this.pgService.find({
      tableName: this.tableName,
      where: { userID },
    });
    return Promise.all(
      chatsIDs.map(async (chat) => {
        return await this.chatsService.getChatWithMessages(chat.chatID);
      }),
    );
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
