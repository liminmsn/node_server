import type { Request, Response, Express } from 'express';
import { ServerWebSocket } from './ServerWebSocket';
import express from "express";
import chalk from 'chalk';
import http from 'http';
//核心http服务类
export class Server {
    private app: Express;
    constructor() {
        this.app = express();
    }
    addList(list: ServerItem[]) {
        list.forEach(item => {
            const target = Object.getPrototypeOf(item);
            if (target.type == 'GET') this.app.get(target['url'], item.call);
            if (target.type == 'POST') this.app.post(target['url'], item.call);
        });
        return this;
    }
    startWs(port: number) {
        new ServerWebSocket(http.createServer(this.app)).start(port);
        return this;
    }
    start(port: number) {
        console.log(chalk.blue(`系统平台:${process.platform}-${process.arch}`));
        console.log(chalk.blue(`node版本:${process.version}`));
        this.app.listen(port, () => {
            console.log(`http服务地址: ${chalk.green(`http://localhost:${port}`)}`);
        });
        return this;
    }
}


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