import type { Request, Response, Express } from 'express';
import { ServerWebSocket, ServerWebSocketType } from './ServerWebSocket';
import http from 'http';
import express from "express";
import chalk from 'chalk';

//监听基类
export abstract class ServerItem {
    //注解url
    static Url(url: string) {
        return function (target: Function) {
            //@ts-ignore
            target.prototype['url'] = url;
        }
    }
    //注解type
    static Type(type: 'POST' | 'GET') {
        return function (target: Function) {
            //@ts-ignore
            target.prototype['type'] = type;
        }
    }
    //监听事件
    abstract call(req: Request, res: Response): void;
}

//核心http服务类
export class Server {
    static app: Express;
    static server: ServerWebSocketType;
    private port = 0;
    constructor(port: number) {
        this.port = port;
        Server.app = express();
        Server.server = http.createServer(Server.app);
        ServerWebSocket.new(Server.server);
    }
    list_: ServerItem[] = [];
    addList(list: ServerItem[]) {
        this.list_ = list;
        list.forEach(item => {
            const target = Object.getPrototypeOf(item);
            if (target.type == 'GET') Server.app.get(target['url'], item.call);
            if (target.type == 'POST') Server.app.post(target['url'], item.call);
        });
        return this;
    }
    start() {
        console.log(chalk.blue(`系统平台:${process.platform}-${process.arch}`));
        console.log(chalk.blue(`node版本:${process.version}`));
        Server.app.listen(this.port, () => {
            console.log(`http服务地址: ${chalk.green(`http://localhost:${this.port}`)}`);
        });
        Server.server.listen(8081, () => {
            console.log(`ws服务地址: ${chalk.green(`http://localhost:8081`)}`);
        });
    }
}