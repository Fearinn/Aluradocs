import { Namespace, Server, Socket } from "socket.io";
import { IUser } from "../../interfaces/User";
import { findUserByName } from "../controllers/users.js";
import { createJwt } from "../utils/createJwt.js";
import { authenticateUser } from "../utils/authenticateUser.js";

export function listenLogin(socket: Socket, _: Server | Namespace) {
  socket.on("authenticate_user", async ({ name, password }: IUser) => {
    const user = await findUserByName(name);

    const authenticated = user ? authenticateUser(password, user) : false;

    if (authenticated && user) {
      const token = createJwt({ name: user.name });
      socket.emit("user_authenticated", token);
    } else {
      socket.emit("failed_user_authenticated");
    }
  });
}
