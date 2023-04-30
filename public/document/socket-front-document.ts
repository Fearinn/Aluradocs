import { getCookie } from "../utils/cookie.js";
import {
  alertAndRedirect,
  documentName,
  updateText,
} from "./domManipulation.js";

//@ts-ignore
const socket = io("/users", {
  auth: {
    token: getCookie("tokenJwt"),
  },
});

export function emitTextArea(doc: { name: string; text: string }) {
  socket.emit("textarea", doc);
}

function selectDocument(name: string) {
  socket.emit("select_document", name, (text: string) => {
    updateText(text);
  });
}

export function deleteDocument(name: string) {
  socket.emit("delete_document", name);
}

socket.on("textarea_clients", (texto: string) => {
  updateText(texto);
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

if (documentName) selectDocument(documentName);
