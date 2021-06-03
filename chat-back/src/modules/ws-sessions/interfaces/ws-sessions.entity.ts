import WebSocket from 'ws';

export default interface WsSession {
  socket: WebSocket;
  accessToken: string;
  userEmail: string;
}

export interface WsSessionsUpdates {
  accessToken?: string;
}
