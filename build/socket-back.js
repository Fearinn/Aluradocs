import io from "./server.js";
io.on("connection", (socket) => {
    console.log("A client has been connected. ID: " + socket.id);
    socket.on("select_document", (documentName, callback) => {
        socket.join(documentName);
        const doc = findDocument(documentName);
        // if (doc?.text) callback(doc.text);
    });
    socket.on("textarea", ({ text, documentName }) => {
        if (documentName)
            socket.to(documentName).emit("textarea_clients", text);
    });
});
function findDocument(documentName) {
}
