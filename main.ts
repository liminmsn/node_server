import { Server, ServerItem } from "./app/core/Server";
import { Index } from "./app/router/Index";
const httpReqList: ServerItem[] = [new Index()]; 
new Server().addList(httpReqList).start(8080).startWs(8081);