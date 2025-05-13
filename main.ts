import { Server } from "./app/core/Server";
import { Index } from "./app/router/Index";
import { Ws } from "./app/router/Ws";

const app = new Server(8080);
app.addList([new Index(), new Ws()])
app.start();