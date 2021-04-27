import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PgModule } from './modules/pg/pg.module';

@Module({
  imports: [AuthModule, UsersModule, PgModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
