import { Request, Response } from "express";
import { ServerItem } from "../core/Server";
import { Wss } from "../ws/Wss";

@ServerItem.Type("GET")
@ServerItem.Url("/wss")
class Ws extends ServerItem {
    call(req: Request, res: Response): void {
        Wss.init()
        res.send("wss启动！")
    }
}