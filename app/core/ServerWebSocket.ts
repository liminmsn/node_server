import http from 'http';
import WebSocket from 'ws';
import type { Express } from 'express';

export type WssType = WebSocket.Server<typeof WebSocket, typeof http.IncomingMessage>;
//Socker服务类
export class ServerWebSocket {
    private static _wss: WssType;
    public static get wss() { return ServerWebSocket._wss }
    constructor(app: Express) {
        const server = http.createServer(app)
        ServerWebSocket._wss = new WebSocket.Server({ server });
    }
    //创建ws服务
    static new(app: Express) {
        if (this._wss == null) new ServerWebSocket(app);
    }
}