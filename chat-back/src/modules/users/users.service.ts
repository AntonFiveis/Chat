import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UsersDto, UsersUpdates } from './interfaces/users.dto';
import { Users } from './interfaces/users.entity';
import Chats from '../chats/interfaces/chats.entity';
import * as fs from 'fs';
import { ImageMinService } from '../image-min/image-min.service';
import { Readable } from 'stream';
@Injectable()
export class UsersService {
  constructor(
    private pgService: PgService,
    private imageMinService: ImageMinService,
  ) {}
  private tableName = 'Users';
  async findOneByEmail(email: string): Promise<Users> {
    return await this.pgService.findOne({
      tableName: this.tableName,
      where: { email },
    });
  }

  async findOneByNickname(nickname: string): Promise<Users> {
    return await this.pgService.findOne({
      tableName: this.tableName,
      where: { nickname },
    });
  }

  async findOneByPhone(phone: string): Promise<Users> {
    return await this.pgService.findOne({
      tableName: this.tableName,
      where: { phone },
    });
  }

  async findOneByID(userID: string): Promise<Users> {
    return await this.pgService.findOne({
      tableName: this.tableName,
      where: { userID },
    });
  }
  async createNewUser(userDTO: UsersDto): Promise<string> {
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

  async uploadPhoto(
    image: Express.Multer.File,
    userID: string,
  ): Promise<string> {
    const user: Users = await this.findOneByID(userID);
    if (!user) throw new UnauthorizedException('You are not chat owner!');
    const destinationPath = './avatars';
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
    await this.updateUser(userID, { photo: name });

    if (user.photo) {
      fs.unlinkSync(`./avatars/${user.photo}`);
    }

    return name;
  }

  async getPhoto(path: string): Promise<Readable> {
    return new Promise((resolve, reject) => {
      fs.readFile('/avatars/' + path, null, (err, data) => {
        if (err) reject();

        const stream = new Readable();
        stream.push(data);
        stream.push(null);
        resolve(stream);
      });
    });
  }
}
