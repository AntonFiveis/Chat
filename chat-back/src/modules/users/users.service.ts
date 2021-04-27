import {Injectable, Patch} from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UsersDTO } from './interfaces/users-dto';
import { Users } from './interfaces/users.entity';
@Injectable()
export class UsersService {
  constructor(private pgService: PgService) {}
  private tableName = 'Users';
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
  // @Patch
}
