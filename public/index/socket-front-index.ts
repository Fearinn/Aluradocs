import IDocument from "../../interfaces/Documents.js";
import { getCookie } from "../utils/cookie.js";
import { insertDocumentLink, removeDocumentLink } from "./domManipulation.js";

// @ts-ignore
const socket = io("/users", {
  auth: {
    token: getCookie("tokenJwt"),
  },
});

socket.on("connect_error", () => {
  alert("User not authorized! Please login.");
  window.location.href = "/login.html";
});

socket.emit("request_documents", (documents: IDocument[]) => {
  documents.forEach((doc) => insertDocumentLink(doc.name));
});

socket.on("add_document_clients", (name: string) => {
  insertDocumentLink(name);
});

socket.on("document_exists", (name: string) => {
  alert(`O documento ${name} já existe!`);
});

socket.on("delete_document_clients", (name: string) => {
  removeDocumentLink(name);
});

export function emitAddDocument(name: string) {
  socket.emit("add_document", name);
}
