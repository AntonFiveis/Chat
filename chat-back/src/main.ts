import 'reflect-metadata';
import { NestFactory } from '@nestjs/core/nest-factory';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
dotenv.config();
import { AppModule } from './app.module';
import { JsonRpcWsAdapter } from './adapters/jsonrpc-ws.adapter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useWebSocketAdapter(new JsonRpcWsAdapter(app));
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
