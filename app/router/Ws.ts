import { Request, Response } from "express";
import { ServerItem } from "../core/Server";
import { Wss } from "../wss/Wss";

@ServerItem.Type("GET")
@ServerItem.Url("/wss")
export class Ws extends ServerItem {
    call(req: Request, res: Response): void {
        Wss.init()
        res.send("wss启动！")
    }
}