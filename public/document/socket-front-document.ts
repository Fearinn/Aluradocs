import { JwtPayload } from "jsonwebtoken";
import { getCookie } from "../utils/cookie.js";
import {
  alertAndRedirect,
  documentName,
  updateConnectedUsers,
  updateText,
} from "./domManipulation.js";
import { IConnection } from "../../interfaces/Connection.js";

//@ts-ignore
const socket = io("/users", {
  auth: {
    token: getCookie("tokenJwt"),
  },
});

export function emitTextArea(doc: { name: string; text: string }) {
  socket.emit("textarea", doc);
}

export function deleteDocument(name: string) {
  socket.emit("delete_document", name);
}

socket.on("textarea_clients", (text: string) => {
  updateText(text);
});

socket.on("document_text", (text: string) => {
  updateText(text);
});

socket.on("delete_document_clients", (name: string) => {
  alertAndRedirect(name);
});

socket.on("connect_error", () => {
  alert("User not authorized! Please login.");
  window.location.href = "/login.html";
});

function selectDocument(connection: IConnection) {
  socket.emit("select_document", connection, (text: string) => {
    updateText(text);
  });
}

function handleAuthorization(payload: JwtPayload) {
  if (documentName) selectDocument({ documentName, username: payload.name });
}

socket.on("user_authorized-doc", handleAuthorization);

socket.on("users_in_document", updateConnectedUsers);

socket.on("user_already_in_document", () => {
  alert("Document open in other page");
  window.location.href = "/";
});
