import { Namespace, Server, Socket } from "socket.io";
import {
  deleteDocumentDB,
  findDocument,
  updateDocumentDB,
} from "../controllers/docs.js";
import {
  addConnection,
  findConnection,
  getConnections,
  removeConnection,
} from "../controllers/connections.js";
import { IConnection } from "../../interfaces/Connection.js";

export function listenDoc(socket: Socket, io: Server | Namespace) {
  socket.on(
    "select_document",
    async ({ documentName, username }: IConnection, sendDocument) => {
      const document = await findDocument(documentName);

      if (document) {
        socket.join(documentName);

        const connectionExists = findConnection({ documentName, username });

        if (connectionExists) {
          socket.emit("user_already_in_document");
        } else {
          addConnection({ documentName, username });

          socket.data = {
            userIn: true,
          };

          const usersInDocument = getConnections(documentName);

          io.to(documentName).emit("users_in_document", usersInDocument);

          sendDocument(documentName);
        }
      }

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

      socket.on("disconnect", () => {
        if (!socket.data.userIn) return;
        
        removeConnection({ documentName, username });

        const usersInDocument = getConnections(documentName);

        io.to(documentName).emit("users_in_document", usersInDocument);
      });
    }
  );
}
