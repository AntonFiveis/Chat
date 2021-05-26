import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { ChatsDTO, ChatsUpdates } from './interfaces/chats.dto';
import Chats from './interfaces/chats.entity';
import { MessagesService } from '../messages/messages.service';
import { ChatsWithMessages } from './interfaces/chats.output.dto';
import * as fs from 'fs';
import { ImageMinService } from '../image-min/image-min.service';
import {Readable} from "stream";

@Injectable()
export class ChatsService {
  constructor(
    private pgService: PgService,
    private messagesService: MessagesService,
    private imageMinService: ImageMinService,
  ) {}
  private tableName = 'Chats';

  async uploadPhoto(
    image: Express.Multer.File,
    chatID: string,
    userID: string,
  ): Promise<string> {
    const chat: Chats = await this.pgService.findOne({
      tableName: this.tableName,
      where: { chatID, ownerID: userID },
    });
    if (!chat) throw new UnauthorizedException('You are not chat owner!');
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
    await this.updateChat(chatID, { photo: name });

    if (chat.photo) {
      fs.unlinkSync(`./photos/${chat.photo}`);
    }

    return name;
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

  async checkOwner(chatID: string, userID: string): Promise<boolean> {
    const res = await this.pgService.findOne({
      tableName: this.tableName,
      where: { chatID, ownerID: userID },
    });
    return !!res;
  }
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
