import { forwardRef, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { WsSessionsModule } from '../ws-sessions/ws-sessions.module';
import {ChatMembersService} from "../chat-members/chat-members.service";
import {WsSessionsService} from "../ws-sessions/ws-sessions.service";

@Module({
  imports: [forwardRef(() => WsSessionsModule)],
  providers: [MessagesService,ChatMembersService, WsSessionsService],
  exports: [MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
