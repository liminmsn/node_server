import { Request, Response } from "express";
import { Server, ServerItem } from "../core/Server";
import { ServerWebSocket } from "../core/ServerWebSocket";

@ServerItem.Url("/")
@ServerItem.Type("GET")
export class Index extends ServerItem {
    call(req: Request, res: Response): void {
        res.send("http服务,ws服务已经启动");
    }
}