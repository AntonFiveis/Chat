import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { v4 as uuid } from 'uuid';
import { UsersContactsDTO } from './interfaces/users-contacts.dto';
import UsersContacts from './interfaces/users-contacts.entity';
@Injectable()
export class UsersContactsService {
  constructor(private pgService: PgService) {}
  private tableName = 'UsersContacts';
  async addFriend(usersContactsDTO: UsersContactsDTO): Promise<void> {
    await this.pgService.create({
      tableName: this.tableName,
      values: [{ ...usersContactsDTO, contactID: uuid() }],
    });
  }

  async getFriendList(userID: string): Promise<UsersContacts[]> {
    return await this.pgService.find({
      tableName: this.tableName,
      where: { userID },
    });
  }

  async deleteFromFriendList(
    usersContactsDTO: UsersContactsDTO,
  ): Promise<void> {
    await this.pgService.delete({
      tableName: this.tableName,
      where: { ...usersContactsDTO },
    });
  }

  async checkIsFriend(usersContractsDTO: UsersContactsDTO): Promise<boolean> {
    const res = await this.pgService.findOne({
      tableName: this.tableName,
      where: { ...usersContractsDTO },
    });
    return !!res;
  }
}
