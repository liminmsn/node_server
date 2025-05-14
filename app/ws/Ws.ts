import { WssType } from "../core/ServerWebSocket";
import { WsData, WsUser } from "./WsData";
import type WebSocket from 'ws';
import chalk from 'chalk';

export class Ws {
    constructor(ws: WssType) {
        ws.on('connection', (client) => {
            console.log(chalk.bgRed('客户端链接'));
            // client.send('你已经加入!');
            WsMsgProcess.init(client);

            // 心跳检测相关
            let isAlive = true;
            client.on('pong', () => {
                isAlive = true;
            });
            // 定时发送 ping
            const interval = setInterval(() => {
                console.log('发送ping');
                if (!isAlive) {
                    console.log('心跳超时，断开连接');
                    client.terminate();
                    clearInterval(interval);
                    return;
                }
                isAlive = false;
                client.ping();
            }, 300000); // 30秒心跳一次
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
        const objList: any[] = [WsLogin,WsHallCount];
        client.on('message', (message: string) => {
            console.log('收到消息:' + chalk.greenBright(message.toString()));
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
    constructor(public client: WebSocket, public data: any) { super(client, data) }
    static commd = 'login'
    run(): void {
        WsMsgProcess.data.joinHall(new WsUser(this.data['id'], this.client, ''))
        console.log("登录了", JSON.stringify(this.data));
    }
}
//获取大厅人数
export class WsHallCount extends WsMsgProcessItem {
    constructor(public client: WebSocket, public data: any) { super(client, data) }
    static commd = 'hall_count'
    run() {
        const count = WsMsgProcess.data.hallCount();
        this.client.send(count);
        console.log("大厅人数", count);
    }
}