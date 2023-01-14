import { documentName, updateText } from "./common/domUpdate.js";
//@ts-ignore
const socket = io();
export function emitTextArea(args) {
    socket.emit("textarea", args);
}
function selectDocument(name) {
    socket.emit("select_document", name, (text) => {
        updateText(text);
    });
}
socket.on("textarea_clients", (texto) => {
    updateText(texto);
});
socket.on("document_text", (text) => {
    updateText(text);
});
if (documentName)
    selectDocument(documentName);
