import { IUser } from "../../interfaces/User";
import { setCookie } from "../utils/cookie.js";

// @ts-ignore
const socket = io();

export function emitAuthenticateUser(name: string, password: string) {
  const user: IUser = { name, password };
  socket.emit("authenticate_user", user);
}

socket.on("user_authenticated", (token: string) => {
  setCookie("tokenJwt", token);
  window.location.href = "/";
});

socket.on("failed_user_authenticated", () => {
  alert("User denied");
});
