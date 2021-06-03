import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PgService } from '../pg/pg.service';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UsersDto, UsersUpdates } from './interfaces/users.dto';
import { Users } from './interfaces/users.entity';
import * as fs from 'fs';
import { ImageMinService } from '../image-min/image-min.service';
import { Readable } from 'stream';
import { UsersOutputDTO } from './interfaces/users.output.dto';
@Injectable()
export class UsersService {
  constructor(
    private pgService: PgService,
    private imageMinService: ImageMinService,
  ) {}
  private tableName = 'Users';

  splitUser(user: Users): UsersOutputDTO {
    const { password, salt, ...result } = user;
    return result;
  }

  async findOneByEmail(email: string): Promise<UsersOutputDTO> {
    const res: Users = await this.pgService.findOne({
      tableName: this.tableName,
      where: { email },
    });
    return this.splitUser(res);
  }

  async findByEmail(email: string): Promise<UsersOutputDTO[]> {
    const res = await this.pgService.useQuery(
      `SELECT * FROM "Users" WHERE "email" LIKE '${email}%'`,
    );
    return res.rows.map((user) => this.splitUser(user));
  }

  async findByName(name: string): Promise<UsersOutputDTO[]> {
    const res = await this.pgService.useQuery(
      `SELECT * FROM "Users" WHERE "name" LIKE '${name}%'`,
    );
    return res.rows.map((user) => this.splitUser(user));
  }

  async findOneByEmailWithPassword(email: string): Promise<Users> {
    return await this.pgService.findOne({
      tableName: this.tableName,
      where: { email },
    });
  }

  async findByNickname(nickname: string): Promise<UsersOutputDTO[]> {
    const res = await this.pgService.useQuery(
      `SELECT * FROM "Users" WHERE "nickname" LIKE '${nickname}%'`,
    );
    return res.rows.map((user) => this.splitUser(user));
  }

  async findByPhone(phone: string): Promise<UsersOutputDTO[]> {
    const res = await this.pgService.useQuery(
      `SELECT * FROM "Users" WHERE "phone" LIKE '${phone}%'`,
    );
    return res.rows.map((user) => this.splitUser(user));
  }

  async createNewUser(userDTO: UsersDto): Promise<string> {
    const salt = bcrypt.genSaltSync();
    const password = bcrypt.hashSync(userDTO.password, salt);
    return (
      await this.pgService.create({
        tableName: this.tableName,
        values: [{ ...userDTO, salt, password }],
        returning: 'email',
      })
    ).rows[0].email;
  }

  async deleteUser(email: string): Promise<void> {
    await this.pgService.delete({
      tableName: this.tableName,
      where: { email },
      cascade: true,
    });
  }

  async updateUser(email: string, updates: UsersUpdates): Promise<void> {
    await this.pgService.update({
      tableName: this.tableName,
      updates: { ...updates },
      where: { email },
    });
  }

  async uploadPhoto(
    image: Express.Multer.File,
    email: string,
  ): Promise<string> {
    const user: UsersOutputDTO = await this.findOneByEmail(email);
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
    await this.updateUser(email, { photo: name });

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
