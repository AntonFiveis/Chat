import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { UsersContactsDTO } from './interfaces/users-contacts.dto';
import UsersContacts from './interfaces/users-contacts.entity';
import { UsersService } from '../users/users.service';
import { UsersOutputDTO } from '../users/interfaces/users.output.dto';
@Injectable()
export class UsersContactsService {
  constructor(
    private pgService: PgService,
    private usersService: UsersService,
  ) {}
  private tableName = 'UsersContacts';
  async addFriend(usersContactsDTO: UsersContactsDTO): Promise<void> {
    if (await this.checkIsFriend(usersContactsDTO))
      await this.pgService.create({
        tableName: this.tableName,
        values: [{ ...usersContactsDTO }],
      });
  }

  async getFriendList(userEmail: string): Promise<UsersOutputDTO[]> {
    const friends: UsersContacts[] = await this.pgService.find({
      tableName: this.tableName,
      where: { userEmail },
    });
    return Promise.all(
      friends.map(async (friend) => {
        return this.usersService.findOneByEmail(friend.friendUserEmail);
      }),
    );
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
