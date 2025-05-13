import { ServerWebSocket, WssType } from "../core/ServerWebSocket";

export class Wss {
    static init() {
        new Wss(ServerWebSocket.wss)
    }
    private wss: WssType;
    constructor(wss: WssType) {
        this.wss = wss;
    }
}