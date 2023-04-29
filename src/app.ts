import { listenDoc } from "./document/listeners.js";
import { listenHome } from "./home/listeners.js";
import { listenRegistration } from "./registration/listeners.js";
import io from "./server.js";

io.on("connection", (socket) => {
  listenHome(socket, io);
  listenDoc(socket, io);
  listenRegistration(socket, io);
});
