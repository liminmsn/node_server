import { WssType } from "../core/ServerWebSocket";
import { WsData } from "./WsData";
import type WebSocket from 'ws';
import chalk from 'chalk';

export class Ws {
    constructor(ws: WssType) {
        ws.on('connection', (client) => {
            console.log(chalk.bgRed('客户端加入'));
            // client.send('你已经加入!');
            WsMsgProcess.init(client);
        });

    }
}

//Commid JSON
interface WsMsgType<T> {
    command: string
    data: T
}

export class WsMsgProcess {
    static data = new WsData();
    static init(client: WebSocket) {
        const objList: any[] = [WsLogin];
        client.on('message', (message: string) => {
            console.log('收到消息:', message.toString());
            try {
                const { command, data } = JSON.parse(message) as WsMsgType<any>;
                const itemClass = objList.filter(item => item['commd'] == command)[0] as typeof WsMsgProcessItem;
                if (itemClass != null) {
                    new itemClass(client, data).run();
                }
            } catch (error) {
                client.send("你发送的数据格式不正确!");
            }
        });
        client.on('close', function () {
            console.log(chalk.bgRed('客户端断开连接'));
        });
    }
}

class WsMsgProcessItem {
    constructor(public client: WebSocket, public data: any) { }
    run() {
        throw new Error("需要继承类重写");
    }
}


//登录
export class WsLogin extends WsMsgProcessItem {
    static commd = 'login'
    constructor(public client: WebSocket, public data: any) { super(client, data) }
    run(): void {
        console.log("登录了", JSON.stringify(this.data));
    }
}