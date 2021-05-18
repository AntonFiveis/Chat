import { Injectable } from '@nestjs/common';
import WsSession, { WsSessionsUpdates } from './interfaces/ws-sessions.entity';
import WebSocket from 'ws';

@Injectable()
export class WsSessionsService {
  private connectedClients: WsSession[] = [];
  addNewSession(session: WsSession): void {
    this.connectedClients.push(session);
  }
  removeSession(socket: WebSocket): void {
    const index = this.connectedClients.findIndex((cc) => cc.socket == socket);
    this.connectedClients.splice(index, 1);
  }

  updateSession(socket: WebSocket, updates: WsSessionsUpdates): void {
    const index = this.connectedClients.findIndex((cc) => cc.socket == socket);
    this.connectedClients[index] = {
      ...this.connectedClients[index],
      ...updates,
    };
  }

  getAllSessions(): WsSession[] {
    return this.connectedClients;
  }

  findSession(socket: WebSocket): WsSession | undefined {
    return this.connectedClients.find((cc) => cc.socket == socket);
  }
  findSessionsByUserID(userID: string): WsSession[] {
    return this.connectedClients.filter((cc) => cc.userID == userID);
  }
}
