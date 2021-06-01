import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import Messages from './interfaces/messages.entity';
import { MessagesDTO } from './interfaces/messages.dto';
import { v4 as uuid } from 'uuid';
@Injectable()
export class MessagesService {
  constructor(private pgService: PgService) {}
  private tableName = 'Messages';
  async getLast50messages(chatUUID: string): Promise<Messages[]> {
    const res = await this.pgService.useQuery(
      `SELECT * FROM "${this.tableName}" WHERE "chatUUID" = '${chatUUID}' ORDER BY "date" LIMIT 50`,
    );
    return res.rows;
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

  async createNewMessage(messagesDTO: MessagesDTO): Promise<Date> {
    const res = await this.pgService.create({
      tableName: this.tableName,
      values: [{ ...messagesDTO, messagesUUID: uuid() }],
      returning: 'date',
    });
    return res.rows[0].date;
  }
}
