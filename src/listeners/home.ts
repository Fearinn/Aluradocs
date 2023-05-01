import { Namespace, Server, Socket } from "socket.io";
import IDocument from "../../interfaces/Documents";
import {
  getDocuments,
  findDocument,
  addDocumentDB,
} from "../controllers/docs.js";
import { IConnection } from "../../interfaces/Connection";

export function listenHome(socket: Socket, io: Server | Namespace) {
  socket.on(
    "request_documents",
    async (sendDocuments: (docs: IDocument[]) => void) => {
      const docs = await getDocuments();
      if (docs) sendDocuments(docs);
    }
  );

  socket.on("add_document", async (name: string) => {
    const docExists = !!(await findDocument(name));

    if (docExists) {
      socket.emit("document_exists", name);
    } else {
      const result = await addDocumentDB(name);
      if (result && result.acknowledged) {
        io.emit("add_document_clients", name);
      }
    }
  });

  socket.on(
    "select_document",
    async (connection: IConnection, callback: (text: string) => void) => {
      socket.join(connection.documentName);
      const doc = await findDocument(connection.documentName);
      if (doc && doc.text) callback(doc.text);
    }
  );
}
