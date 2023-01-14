import { documentName, updateText } from "./common/domUpdate.js";

//@ts-ignore
const socket = io();

export function emitTextArea(args: {
  text: string;
  documentName: string | null;
}) {
  socket.emit("textarea", args);
}

function selectDocument(name: string) {
  socket.emit("select_document", name, (text: string) => {
    updateText(text);
  });
}

socket.on("textarea_clients", (texto: string) => {
  updateText(texto);
});

socket.on("document_text", (text: string) => {
  updateText(text);
});

if (documentName) selectDocument(documentName);
