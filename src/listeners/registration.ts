import { Namespace, Server, Socket } from "socket.io";
import { IUser } from "../../interfaces/User";
import { findUserByName, registerUser } from "../controllers/users.js";

export function listenRegistration(socket: Socket, _: Server | Namespace) {
  socket.on("register_user", async (user: IUser) => {
    const alreadyExists = await findUserByName(user.name);

    if (alreadyExists) {
      socket.emit("failed_user_exists");
      return;
    }

    const result = await registerUser(user);

    if (result && result.acknowledged) {
      socket.emit("user_registered");
    } else {
      socket.emit("failed_user_registered");
    }
  });
}
