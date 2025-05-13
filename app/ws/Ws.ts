import { ServerWebSocket, WssType } from "../core/ServerWebSocket";

export class Ws {
    private ws: WssType;
    constructor() {
        this.ws = ServerWebSocket.ws;
        this.init();
    }
    init() {
        const ws = this.ws;
        // WebSocket 连接事件
        ws.on('connection', function connection(ws) {
            console.log('客户端已连接');

            ws.on('message', function incoming(message) {
                console.log('收到消息:', message.toString());

                // 回复客户端
                ws.send(`你说的是: ${message}`);
            });

            ws.send('欢迎连接 WebSocket 服务！');
        });
    }
}