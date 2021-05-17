import WebSocket from 'ws';

export default interface WsSession {
  socket: WebSocket;
  accessToken: string;
  userID: string;
}

export interface WsSessionsUpdates {
  accessToken?: string;
  userID?: string;
}
