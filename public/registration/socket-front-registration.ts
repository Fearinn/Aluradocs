import { IUser } from "../../interfaces/User";

// @ts-ignore
const socket = io();

export function emitRegisterUser(name: string, password: string) {
  const user: IUser = { name, password };
  socket.emit("register_user", user);
}

socket.on("user_registered", () => {
  alert("User successfully registered!");
});

socket.on("failed_user_registered", () => {
  alert("User registration failed!");
});

socket.on("failed_user_exists", () => {
  alert("User registration failed, this username has already been used!");
});
