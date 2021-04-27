import 'reflect-metadata';
import { NestFactory } from '@nestjs/core/nest-factory';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
dotenv.config();
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.setGlobalPrefix('api');
  await app.listen(3001);
}
bootstrap();
