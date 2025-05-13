import WebSocket from 'ws';
import http from 'http';
import { Ws } from '../ws/Ws';

export type WssType = WebSocket.Server<typeof WebSocket, typeof http.IncomingMessage>;
export type ServerWebSocketType = http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
//Socker服务类
export class ServerWebSocket {
    private static _ws: WssType;
    public static get ws() { return ServerWebSocket._ws }
    //创建ws服务
    static new(server: ServerWebSocketType) {
        new ServerWebSocket(server);
    }
    constructor(server: ServerWebSocketType) {
        ServerWebSocket._ws = new WebSocket.Server({ server });
        const ws = ServerWebSocket._ws;
        new Ws();
    }
}