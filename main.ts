import { Server } from "./app/core/Server";
import { Index } from "./app/router/Index";

const app = new Server(8080);
app.addList([new Index()])
app.start();