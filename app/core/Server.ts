import type { AddressInfo } from 'net';
import type { Request, Response, Express } from 'express';
import express from "express";
import chalk from 'chalk';

//核心web服务类
export class Server {
    static app: Express;
    port = 0;
    constructor(port: number) {
        Server.app = express();
        this.port = port;
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
        const server = Server.app.listen(this.port, () => {
            console.log(chalk.blue(`系统平台:${process.platform}-${process.arch}`));
            console.log(chalk.blue(`node版本:${process.version}`));
            const address = server.address() as AddressInfo;
            let host = address.address;
            if (host === '::') host = 'localhost'; // 兼容 IPv6
            console.log(`服务器地址: ${chalk.green(`http://${host}:${address.port}`)}`);
        });
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