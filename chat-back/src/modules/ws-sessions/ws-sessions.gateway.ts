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
  ErrorType,
  JsonRpcErrorCodes,
  NotificationPayload,
} from '../../interfaces/json-rpc';
import { JwtService } from '@nestjs/jwt';
import { generateJsonRpcNotification } from '../../helpers/json-rpc.utils';
import WsSession from './interfaces/ws-sessions.entity';
import { IncomingMessage } from 'http';
import * as cookie from 'cookie';
import { MessagesDTO } from '../messages/interfaces/messages.dto';
import { MessagesService } from '../messages/messages.service';
import { ChatsWithUsersDTO } from '../chats/interfaces/chats.dto';
import { UnauthorizedException } from '@nestjs/common';

const invalidTokenError = {
  error: {
    code: JsonRpcErrorCodes.INVALID_REQUEST,
    message: 'INVALID TOKEN!',
  },
};

@WebSocketGateway({ path: '/' })
export class WsSessionsGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private wsSessionsService: WsSessionsService,
    private chatsService: ChatsService,
    private chatMembersService: ChatMembersService,
    private jwtService: JwtService,
    private messagesService: MessagesService,
  ) {}

  @SubscribeMessage('ADD_MESSAGE')
  async addMessage(
    @MessageBody() messagesDTO: MessagesDTO,
    @ConnectedSocket() socket: WebSocket,
  ): Promise<{ ok: boolean } | { error: ErrorType }> {
    const session = this.wsSessionsService.findSession(socket);
    try {
      if (!session) throw new Error();
      this.jwtService.verify(session.accessToken);
      const chatMembers = await this.chatMembersService.getChatMembers(
        messagesDTO.chatUUID,
      );
      const {
        date,
        messagesUUID,
      } = await this.messagesService.createNewMessage(messagesDTO);
      chatMembers.forEach((cm) => {
        const sessions: WsSession[] = this.wsSessionsService.findSessionsByUserEmail(
          cm.email,
        );
        this.wsSessionsService.sendResponse(
          sessions,
          { ...messagesDTO, date, messagesUUID },
          'ADD_MESSAGE',
        );
      });
      return { ok: true };
    } catch (e) {
      return invalidTokenError;
    }
  }

  @SubscribeMessage('ADD_CHAT')
  async addChat(
    @MessageBody() { users, ...chatDTO }: ChatsWithUsersDTO,
    @ConnectedSocket() socket: WebSocket,
  ): Promise<{ ok: boolean } | { error: ErrorType }> {
    const session = this.wsSessionsService.findSession(socket);
    try {
      if (!session) throw new Error();
      const res = this.jwtService.verify(session.accessToken);
      const chatUUID = await this.chatsService.createChat(chatDTO, res.email);

      await this.chatMembersService.addUsersToChat(
        users.map((us) => {
          return { chatUUID, userEmail: us };
        }),
      );
      const chatMembers = await this.chatMembersService.getChatMembers(
        chatUUID,
      );
      for (const user of users) {
        const userSessions: WsSession[] = this.wsSessionsService.findSessionsByUserEmail(
          user,
        );
        this.wsSessionsService.sendResponse(
          userSessions,
          { ...chatDTO, chatUUID, messages: [], chatMembers },
          'ADD_CHAT',
        );
      }
      return { ok: true };
    } catch (e) {
      return invalidTokenError;
    }
  }

  @SubscribeMessage('ADD_CHAT_MEMBERS')
  async addChatMember(
    @MessageBody() chatMembersDTO: ChatMembersDTO[],
    @ConnectedSocket() socket: WebSocket,
  ): Promise<{ ok: boolean } | { error: ErrorType }> {
    const session = this.wsSessionsService.findSession(socket);
    try {
      if (!session) {
        throw new Error();
      }
      const res = this.jwtService.verify(session.accessToken);
      if (
        !(await this.chatsService.checkOwner(
          res.email,
          chatMembersDTO[0].chatUUID,
        ))
      ) {
        throw new UnauthorizedException(`You don't have rights to do this`);
      }
      const chatWithMessages = await this.chatsService.getChatWithMessagesAndMembers(
        chatMembersDTO[0].chatUUID,
      );
      await this.chatMembersService.addUsersToChat(chatMembersDTO);
      for (const cm of chatMembersDTO) {
        const newChatMemberSessions: WsSession[] = this.wsSessionsService.findSessionsByUserEmail(
          cm.userEmail,
        );
        if (!newChatMemberSessions) return { ok: true };

        this.wsSessionsService.sendResponse(
          newChatMemberSessions,
          chatWithMessages,
          'ADD_CHAT',
        );
      }
      const chatMembers = await this.chatMembersService.getChatMembers(
        chatMembersDTO[0].chatUUID,
      );

      for (const cm of chatMembers) {
        const chatMembersSessions: WsSession[] = this.wsSessionsService.findSessionsByUserEmail(
          cm.email,
        );
        this.wsSessionsService.sendResponse(
          chatMembersSessions,
          chatMembers,
          'SET_CHAT_MEMBERS',
        );
      }
      return { ok: true };
    } catch (e) {
      return invalidTokenError;
    }
  }

  @SubscribeMessage('REMOVE_CHAT_MEMBER')
  async removeChatMember(
    @MessageBody() chatMembersDTO: ChatMembersDTO,
    @ConnectedSocket() socket: WebSocket,
  ): Promise<{ ok: boolean } | { error: ErrorType }> {
    const session = this.wsSessionsService.findSession(socket);
    try {
      if (!session) {
        throw new Error();
      }
      const res = this.jwtService.verify(session.accessToken);
      if (
        !(await this.chatsService.checkOwner(
          res.email,
          chatMembersDTO.chatUUID,
        ))
      ) {
        throw new UnauthorizedException(`You don't have rights to do this`);
      }
      await this.chatMembersService.removeUserFromChat(chatMembersDTO);
      const chatMemberSessions: WsSession[] = this.wsSessionsService.findSessionsByUserEmail(
        chatMembersDTO.userEmail,
      );
      if (!chatMemberSessions) return { ok: true };
      this.wsSessionsService.sendResponse(
        chatMemberSessions,
        { chatUUID: chatMembersDTO.chatUUID },
        'REMOVE_CHAT',
      );
      const chatMembers = await this.chatMembersService.getChatMembers(
        chatMembersDTO.chatUUID,
      );
      for (const cm of chatMembers) {
        const chatMembersSessions: WsSession[] = this.wsSessionsService.findSessionsByUserEmail(
          cm.email,
        );
        this.wsSessionsService.sendResponse(
          chatMembersSessions,
          chatMembers,
          'SET_CHAT_MEMBERS',
        );
      }
      return { ok: true };
    } catch (e) {
      return invalidTokenError;
    }
  }

  async handleConnection(
    client: WebSocket,
    request: IncomingMessage,
  ): Promise<void> {
    const accessToken = cookie.parse(
      request.headers.cookie ? request.headers.cookie : '',
    ).accessToken;
    const sendResponse = (payload: NotificationPayload): void => {
      client.send(
        JSON.stringify(generateJsonRpcNotification('CONNECT', payload)),
      );
    };
    try {
      if (!accessToken) {
        throw new Error();
      }
      const res = this.jwtService.verify(accessToken);
      const session: WsSession = {
        accessToken,
        userEmail: res.email,
        socket: client,
      };

      this.wsSessionsService.addNewSession(session);
      const chats = await this.chatsService.getMyChats(res.email);
      sendResponse({ ok: true, chats });
    } catch (error) {
      sendResponse({ ok: false, code: -32600, message: 'INVALID TOKEN' });
      return client.close(1014);
    }
  }

  handleDisconnect(client: WebSocket): void {
    this.wsSessionsService.removeSession(client);
  }
}
