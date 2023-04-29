import { Server, Socket } from "socket.io";
import { IUser } from "../../interfaces/User";

export function listenRegistration(socket: Socket, _: Server) {
  socket.on("register_user", ({name, password}: IUser) => {
    console.log(name, password);
  });
}
