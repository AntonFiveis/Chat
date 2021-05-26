import { Injectable } from '@nestjs/common';
import WsSession, { WsSessionsUpdates } from './interfaces/ws-sessions.entity';
import WebSocket from 'ws';
import { generateJsonRpcNotification } from '../../helpers/json-rpc.utils';
const connectedClients: WsSession[] = [];
@Injectable()
export class WsSessionsService {
  addNewSession(session: WsSession): void {
    connectedClients.push(session);
  }
  removeSession(socket: WebSocket): void {
    const index = connectedClients.findIndex((cc) => cc.socket == socket);
    connectedClients.splice(index, 1);
  }

  updateSession(accessToken: string, updates: WsSessionsUpdates): void {
    const index = connectedClients.findIndex(
      (cc) => cc.accessToken == accessToken,
    );
    connectedClients[index] = {
      ...connectedClients[index],
      ...updates,
    };
  }

  sendResponse(
    wsSessions: WsSession[],
    params: unknown,
    notification: string,
  ): void {
    wsSessions.forEach((s): void => {
      const message = generateJsonRpcNotification(notification, params);
      s.socket.send(JSON.stringify(message));
    });
  }

  getAllSessions(): WsSession[] {
    return connectedClients;
  }

  findSession(socket: WebSocket): WsSession | undefined {
    return connectedClients.find((cc) => cc.socket == socket);
  }
  findSessionsByUserID(userID: string): WsSession[] {
    return connectedClients.filter((cc) => cc.userID == userID);
  }
}
