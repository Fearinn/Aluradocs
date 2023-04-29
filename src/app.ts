import { listenDoc } from "./document/listeners.js";
import { listenHome } from "./home/listeners.js";
import io from "./server.js";

io.on("connection", (socket) => {
  listenHome(socket, io);
  listenDoc(socket, io);
});
