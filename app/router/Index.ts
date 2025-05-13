import { Request, Response } from "express";
import { Server, ServerItem } from "../core/Server";
import { ServerWebSocket } from "../core/ServerWebSocket";

@ServerItem.Url("/")
@ServerItem.Type("GET")
export class Index extends ServerItem {
    call(req: Request, res: Response): void {
        new ServerWebSocket(Server.app);
        res.send("服务启动成功！");
    }
}