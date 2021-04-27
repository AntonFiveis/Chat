import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PgModule } from '../pg/pg.module';
import { PgService } from '../pg/pg.service';

@Module({
  imports: [PgModule],
  controllers: [UsersController],
  providers: [UsersService, PgService],
  exports: [UsersService, PgService],
})
export class UsersModule {}
