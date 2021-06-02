import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { ChatsDTO, ChatsUpdates } from './interfaces/chats.dto';
import Chats from './interfaces/chats.entity';
import { MessagesService } from '../messages/messages.service';
import { ChatsWithMessagesAndMembers } from './interfaces/chats.output.dto';
import * as fs from 'fs';
import { ImageMinService } from '../image-min/image-min.service';
import { Readable } from 'stream';
import { ChatMembersService } from '../chat-members/chat-members.service';
import ChatMembers from '../chat-members/interfaces/chat-members.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ChatsService {
  constructor(
    private pgService: PgService,
    private messagesService: MessagesService,
    private imageMinService: ImageMinService,
    private chatMembersService: ChatMembersService,
  ) {}
  private tableName = 'Chats';

  async uploadPhoto(
    image: Express.Multer.File,
    chatUUID: string,
    userEmail: string,
  ): Promise<string> {
    const chat: Chats = await this.pgService.findOne({
      tableName: this.tableName,
      where: { chatUUID },
    });
    if (!chat) throw new NotFoundException('Chat not found');
    if (chat.ownerEmail !== userEmail)
      throw new UnauthorizedException('You are not chat owner!');
    const destinationPath = './photos';
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath);
    }

    const name = this.imageMinService.editFileName(image);
    await this.imageMinService.minimizeImage(
      image,
      destinationPath,
      0.75,
      name,
    );
    await this.updateChat(chatUUID, { photo: name });

    if (chat.photo) {
      fs.unlinkSync(`./photos/${chat.photo}`);
    }

    return name;
  }

  async getMyChats(userEmail: string): Promise<ChatsWithMessagesAndMembers[]> {
    const chatIDs: ChatMembers[] = await this.chatMembersService.getMyChats(
      userEmail,
    );
    return Promise.all(
      chatIDs.map(async (chat) => {
        return this.getChatWithMessagesAndMembers(chat.chatUUID);
      }),
    );
  }

  async getPhoto(path: string): Promise<Readable> {
    return new Promise((resolve, reject) => {
      fs.readFile('/photos/' + path, null, (err, data) => {
        if (err) reject();

        const stream = new Readable();
        stream.push(data);
        stream.push(null);
        resolve(stream);
      });
    });
  }

  async createChat(chatDTO: ChatsDTO, email: string): Promise<string> {
    const res = await this.pgService.create({
      tableName: this.tableName,
      values: [{ ...chatDTO, chatUUID: uuid(), ownerEmail: email }],
      returning: 'chatUUID',
    });
    return res.rows[0].chatUUID;
  }
  async updateChat(chatUUID: string, updates: ChatsUpdates): Promise<void> {
    await this.pgService.update({
      tableName: this.tableName,
      updates: { ...updates },
      where: { chatUUID },
    });
  }
  async deleteChat(chatUUID: string): Promise<void> {
    await this.pgService.delete({
      tableName: this.tableName,
      where: { chatUUID },
      cascade: true,
    });
  }
  // async updateChatPhoto(chatID: string, photo: File): Promise<void> {}

  async getChatWithMessagesAndMembers(
    chatUUID: string,
  ): Promise<ChatsWithMessagesAndMembers> {
    const chat: Chats = await this.pgService.findOne({
      tableName: this.tableName,
      where: { chatUUID },
    });
    const messages = await this.messagesService.getLast50messages(chatUUID);

    const chatMembers = await this.chatMembersService.getChatMembers(chatUUID);
    return { ...chat, messages, chatMembers };
  }
}
