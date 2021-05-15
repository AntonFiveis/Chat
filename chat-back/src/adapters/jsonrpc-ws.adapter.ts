import {
  AbstractWsAdapter,
  MessageMappingProperties,
} from '@nestjs/websockets';
import * as ws from 'ws';
import { INestApplicationContext, WsMessageHandler } from '@nestjs/common';
import { EMPTY, fromEvent, Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import {
  JsonRpcError,
  JsonRpcErrorCodes,
  JsonRpcRequest,
  JsonRpcResponse,
} from '../interfaces/json-rpc';
import { generateJsonRpcFromValue } from '../helpers/json-rpc.utils';

export class JsonRpcWsAdapter extends AbstractWsAdapter {
  constructor(appOrHttpServer?: INestApplicationContext) {
    super(appOrHttpServer);
  }

  public create(port: number, options?: Record<string, unknown>): ws.Server {
    return port === 0 && this.httpServer
      ? new ws.Server({ server: this.httpServer, ...options })
      : new ws.Server({ port, ...options });
  }

  public bindMessageHandlers(
    client: WebSocket,
    handlers: MessageMappingProperties[],
    process: (data: unknown) => Observable<unknown>,
  ): void {
    fromEvent(client, 'message')
      .pipe(
        mergeMap((data) =>
          this.bindMessageHandler(data as MessageEvent, handlers, process),
        ),
        filter((result) => result !== undefined),
      )
      .subscribe((response) => client.send(JSON.stringify(response)));
  }

  public bindMessageHandler(
    buffer: MessageEvent,
    handlers: MessageMappingProperties[],
    process: (data: unknown) => Observable<unknown>,
  ): Observable<JsonRpcResponse | JsonRpcError> {
    let res = new Observable<unknown>();
    let id = 0;
    try {
      const message: JsonRpcRequest = JSON.parse(buffer.data);
      id = message.id;
      const messageHandler = handlers.find(
        (handler) => handler.message === message.method,
      );

      if (!messageHandler) {
        return EMPTY;
      }
      res = process(messageHandler.callback(message.params));

      return res.pipe(
        map<unknown, JsonRpcResponse | JsonRpcError>((value) =>
          generateJsonRpcFromValue(
            value as Record<string, unknown>,
            message.id,
          ),
        ),
      );
    } catch (error) {
      res = process({
        error: {
          code: JsonRpcErrorCodes.PARSE_ERROR,
          message: 'Request is not in JSON format',
        },
      });
    } finally {
      return res.pipe(
        map<unknown, JsonRpcResponse | JsonRpcError>((value) =>
          generateJsonRpcFromValue(value as Record<string, unknown>, id),
        ),
      );
    }
  }
}
