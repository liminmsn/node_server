import http from 'http';
import WebSocket from 'ws';
import type { Express } from 'express';

//web+Socker服务类
export class ServerWebSocket {
    static wss: WebSocket.Server<typeof WebSocket, typeof http.IncomingMessage>
    //获取wss单列
    static getContext(app: Express) {
        if (this.wss) {
            return this.wss;
        }
        return new ServerWebSocket(app);
    }
    constructor(app: Express) {
        const server = http.createServer(app)
        ServerWebSocket.wss = new WebSocket.Server({ server });
    }
}