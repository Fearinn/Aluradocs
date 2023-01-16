import IDocument from "../../interfaces/Documents.js";
import { insertDocumentLink, removeDocumentLink } from "./domManipulation.js";

// @ts-ignore
const socket = io();

socket.emit("request_documents", (documents: IDocument[]) => {
  documents.forEach((doc) => insertDocumentLink(doc.name));
});

socket.on("add_document_clients", (name: string) => {
  insertDocumentLink(name);
});

socket.on("document_exists", (name: string) => {
    alert(`O documento ${name} já existe!`)
})

socket.on("delete_document_clients", (name: string) => {
  removeDocumentLink(name)
})

export function emitAddDocument(name: string) {
  socket.emit("add_document", name);
}
