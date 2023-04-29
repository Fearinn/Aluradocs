import { Server, Socket } from "socket.io";
import { deleteDocumentDB, updateDocumentDB } from "../controllers/docs.js";

export function listenDoc(socket: Socket, io: Server) {
  socket.on("delete_document", async (name: string) => {
    const deletion = await deleteDocumentDB(name);

    if (deletion && deletion.deletedCount) {
      io.emit("delete_document_clients", name);
    }
  });

  socket.on("textarea", async ({ text, name }) => {
    const update = await updateDocumentDB(name, text);

    if (update && update.matchedCount) {
      socket.to(name).emit("textarea_clients", text);
    }
  });
}
