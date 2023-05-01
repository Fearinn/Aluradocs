import { listenDoc } from "./listeners/document.js";
import { listenHome } from "./listeners/home.js";
import { listenLogin } from "./listeners/login.js";
import { listenRegistration } from "./listeners/registration.js";
import jwt from "jsonwebtoken";
import io from "./server.js";

const nspUsers = io.of("/users");

nspUsers.use((socket, next) => {
  const token = socket.handshake.auth.token;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    socket.emit("user_authorized-doc", payload);

    next();
  } catch (err: any) {
    next(err);
  }
});

io.on("connection", (socket) => {
  listenRegistration(socket, io);
  listenLogin(socket, io);
});

nspUsers.on("connection", (socket) => {
  listenHome(socket, nspUsers);
  listenDoc(socket, nspUsers);
});
