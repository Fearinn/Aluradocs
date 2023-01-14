import { findDocument, updateDocumentDB } from "./controllers/docs.js";
import io from "./server.js";
io.on("connection", (socket) => {
    console.log("A client has been connected. ID: " + socket.id);
    socket.on("select_document", async (documentName, callback) => {
        socket.join(documentName);
        const doc = await findDocument(documentName);
        if (doc && doc.text)
            callback(doc.text);
    });
    socket.on("textarea", async ({ text, documentName }) => {
        const update = await updateDocumentDB(documentName, text);
        if (update && update.matchedCount) {
            socket.to(documentName).emit("textarea_clients", text);
        }
    });
});
