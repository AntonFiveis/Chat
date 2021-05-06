import { Injectable } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UsersDTO, UsersUpdates } from './interfaces/users-dto';
import { Users } from './interfaces/users.entity';
@Injectable()
export class UsersService {
  constructor(private pgService: PgService) {}
  private tableName = 'Users';

  async findOneByID(userID: string): Promise<Users> {
    return await this.pgService.findOne({
      tableName: this.tableName,
      where: { userID },
    });
  }
  async createNewUser(userDTO: UsersDTO): Promise<string> {
    const salt = bcrypt.genSaltSync();
    const password = bcrypt.hashSync(userDTO.password, salt);
    return (
      await this.pgService.create({
        tableName: this.tableName,
        values: [{ ...userDTO, userID: uuid(), salt, password }],
        returning: 'userID',
      })
    ).rows[0].userID;
  }

  async findOneByEmail(email: string): Promise<Users> {
    return this.pgService.findOne({
      tableName: this.tableName,
      where: { email },
    });
  }

  async deleteUser(userID: string): Promise<void> {
    await this.pgService.delete({
      tableName: this.tableName,
      where: { userID },
      cascade: true,
    });
  }

  async updateUser(userID: string, updates: UsersUpdates): Promise<void> {
    await this.pgService.update({
      tableName: this.tableName,
      updates: { ...updates },
      where: { userID },
    });
  }
}
