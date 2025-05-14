import WebSocket from 'ws';
import chalk from 'chalk';
import http from 'http';
import { Ws } from '../ws/Ws';

export type WssType = WebSocket.Server<typeof WebSocket, typeof http.IncomingMessage>;
export type ServerWebSocketType = http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
/**WebSocker服务类 */
export class ServerWebSocket {
    server: ServerWebSocketType;
    constructor(server: ServerWebSocketType) {
        this.server = server;
    }
    start(port: number) {
        const ws = new WebSocket.Server({ server: this.server });
        new Ws(ws);
        this.server.listen(port, () => { 
            console.log(`ws服务地址:${chalk.green(`wss://localhost:${port}`)}`);
        });
    }
}