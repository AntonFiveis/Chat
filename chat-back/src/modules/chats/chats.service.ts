import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { ChatsDTO, ChatsUpdates } from './interfaces/chats.dto';
import Chats from './interfaces/chats.entity';
import { MessagesService } from '../messages/messages.service';
import { ChatsWithMessages } from './interfaces/chats.output.dto';

@Injectable()
export class ChatsService {
  constructor(
    private pgService: PgService,
    private messagesService: MessagesService,
  ) {}
  private tableName = 'Chats';

  async createChat(chatDTO: ChatsDTO): Promise<string> {
    const res = await this.pgService.create({
      tableName: this.tableName,
      values: [chatDTO],
      returning: 'chatID',
    });
    return res.rows[0].chatID;
  }
  async updateChat(chatID: string, updates: ChatsUpdates): Promise<void> {
    await this.pgService.update({
      tableName: this.tableName,
      updates: { ...updates },
      where: { chatID },
    });
  }
  async deleteChat(chatID: string): Promise<void> {
    await this.pgService.delete({
      tableName: this.tableName,
      where: { chatID },
      cascade: true,
    });
  }
  // async updateChatPhoto(chatID: string, photo: File): Promise<void> {}

  async getChatWithMessages(chatID: string): Promise<ChatsWithMessages> {
    const chat: Chats = await this.pgService.findOne({
      tableName: this.tableName,
      where: { chatID },
    });
    const messages = await this.messagesService.getLast50messages(chatID);
    return { ...chat, messages };
  }
}
