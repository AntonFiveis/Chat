import { Module } from '@nestjs/common';
import { WsSessionsService } from './ws-sessions.service';
import { WsSessionsGateway } from './ws-sessions.gateway';

@Module({
  providers: [WsSessionsService, WsSessionsGateway],
})
export class WsSessionsModule {}
