import { listenDoc } from "./listeners/document.js";
import { listenHome } from "./listeners/home.js";
import { listenLogin } from "./listeners/login.js";
import { listenRegistration } from "./listeners/registration.js";
import io from "./server.js";

io.use((socket, next) => {
  next();
});

io.on("connection", (socket) => {
  listenHome(socket, io);
  listenDoc(socket, io);
  listenRegistration(socket, io);
  listenLogin(socket, io);
});
