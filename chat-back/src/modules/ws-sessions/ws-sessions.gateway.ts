import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { WsSessionsService } from './ws-sessions.service';
import { ChatsService } from '../chats/chats.service';
import { ChatMembersService } from '../chat-members/chat-members.service';
import { ChatMembersDTO } from '../chat-members/interfaces/chat-members.dto';
import WebSocket from 'ws';
import {
  JsonRpcError,
  JsonRpcErrorCodes,
  JsonRpcNotification,
} from '../../interfaces/json-rpc';
import { JwtService } from '@nestjs/jwt';
import { generateJsonRpcNotification } from '../../helpers/json-rpc.utils';

@WebSocketGateway({ path: '/' })
export class WsSessionsGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private wsSessionsService: WsSessionsService,
    private chatsService: ChatsService,
    private chatMembersService: ChatMembersService,
    private jwtService: JwtService,
  ) {}

  @SubscribeMessage('ADD_CHAT_MEMBER')
  async handleMessage(
    @MessageBody() chatMembersDTO: ChatMembersDTO,
    @ConnectedSocket() socket: WebSocket,
  ): Promise<JsonRpcError | JsonRpcNotification | unknown> {
    const session = this.wsSessionsService.findSession(socket);
    try {
      if (!session) {
        throw new Error();
      }
      this.jwtService.verify(session.accessToken);
      await this.chatMembersService.addUserToChat(chatMembersDTO);
      const newChatMemberSessions = this.wsSessionsService.findSessionsByUserID(
        chatMembersDTO.userID,
      );
      if (!newChatMemberSessions) return { ok: true };
      const chatWithMessages = this.chatsService.getChatWithMessages(
        chatMembersDTO.chatID,
      );
      newChatMemberSessions.forEach((session) => {
        const message = generateJsonRpcNotification(
          'ADD_CHAT_MEMBER',
          chatWithMessages,
        );
        session.socket.send(JSON.stringify(message));
      });
    } catch (e) {
      return {
        error: {
          code: JsonRpcErrorCodes.INVALID_REQUEST,
          message: 'INVALID TOKEN!',
        },
      };
    }
  }

  handleConnection() {}

  handleDisconnect() {}
}
