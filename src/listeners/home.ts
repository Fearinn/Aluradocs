import { Server, Socket } from "socket.io";
import IDocument from "../../interfaces/Documents";
import {
  getDocuments,
  findDocument,
  addDocumentDB,
} from "../controllers/docs.js";

export function listenHome(socket: Socket, io: Server) {
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
    async (name: string, callback: (text: string) => {}) => {
      socket.join(name);
      const doc = await findDocument(name);
      if (doc && doc.text) callback(doc.text);
    }
  );
}
