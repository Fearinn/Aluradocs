import { IUser } from "../../interfaces/User";

// @ts-ignore
const socket = io();

export function emitRegisterUser(name: string, password: string) {
  const user: IUser = { name, password };
  socket.emit("register_user", user);
}
