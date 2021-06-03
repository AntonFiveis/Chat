import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import Messages from './interfaces/messages.entity';
import { MessagesDTO } from './interfaces/messages.dto';
import { v4 as uuid } from 'uuid';
import { Readable } from 'stream';
import * as fs from 'fs';
import Chats from '../chats/interfaces/chats.entity';
import { ImageMinService } from '../image-min/image-min.service';
import { ChatMembersService } from '../chat-members/chat-members.service';
import { WsSessionsService } from '../ws-sessions/ws-sessions.service';
@Injectable()
export class MessagesService {
  constructor(
    private pgService: PgService,
    private imageMinService: ImageMinService,
    private chatMembersService: ChatMembersService,
    private wsSessionsService: WsSessionsService,
  ) {}
  private tableName = 'Messages';
  async getLast50messages(chatUUID: string): Promise<Messages[]> {
    const res = await this.pgService.useQuery(
      `SELECT * FROM "${this.tableName}" WHERE "chatUUID" = '${chatUUID}' ORDER BY "date" LIMIT 50`,
    );
    return res.rows;
  }

  async getPhoto(path: string): Promise<Readable> {
    return new Promise((resolve, reject) => {
      fs.readFile('./images/' + path, null, (err, data) => {
        if (err) reject();

        const stream = new Readable();
        stream.push(data);
        stream.push(null);
        resolve(stream);
      });
    });
  }

  async uploadPhoto(
    image: Express.Multer.File,
    chatUUID: string,
    userEmail: string,
  ): Promise<void> {
    const destinationPath = './images';
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath);
    }
    const name = this.imageMinService.editFileName(image);
    await this.imageMinService.minimizeImage(image, destinationPath, 75, name);
    const { messagesUUID, date } = await this.createNewMessage({
      photo: name,
      chatUUID,
      userEmail,
    });

    const chatMembers = await this.chatMembersService.getChatMembers(chatUUID);
    for (const cm of chatMembers) {
      const wsSessions = this.wsSessionsService.findSessionsByUserEmail(
        cm.email,
      );
      this.wsSessionsService.sendResponse(
        wsSessions,
        { messagesUUID, date, userEmail, chatUUID },
        'ADD_MESSAGES',
      );
    }
  }

  async getUnreadMessCount(
    chatUUID: string,
    lastMessageUUID: string,
  ): Promise<number> {
    const res = await this.pgService.useQuery(
      `SELECT COUNT(*) as count FROM "${this.tableName}" WHERE "chatUUID" = '${chatUUID}' 
                                        AND "date"> (SELECT "date" FROM "${this.tableName}" WHERE "messageUUID" = '${lastMessageUUID}')`,
    );
    return res.rows[0].count;
  }

  async get50MessagesFromBothSidesOf(
    chatUUID: string,
    date: Date,
  ): Promise<Messages[]> {
    const res = await this.pgService.useQuery(
      `
SELECT * FROM "${
        this.tableName
      }" WHERE "chatUUID" = '${chatUUID}' AND "date">'${date.toISOString()}' ORDER BY "date" LIMIT 50 
UNION ALL
SELECT * FROM "${
        this.tableName
      }" WHERE "chatUUID" = '${chatUUID}' AND "date"< '${date.toISOString()}' ORDER BY "date" DESC LIMIT 50
`,
    );
    return res.rows;
  }

  async createNewMessage(
    messagesDTO: MessagesDTO,
  ): Promise<{ date: Date; messagesUUID: string }> {
    const res = await this.pgService.create({
      tableName: this.tableName,
      values: [{ ...messagesDTO, messagesUUID: uuid() }],
    });
    return { date: res.rows[0].date, messagesUUID: res.rows[0].messagesUUID };
  }
}
