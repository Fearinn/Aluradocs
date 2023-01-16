import {
  addDocumentDB,
  deleteDocumentDB,
  findDocument,
  getDocuments,
  updateDocumentDB,
} from "./controllers/docs.js";
import IDocument from "../interfaces/Documents.js";
import io from "./server.js";

io.on("connection", (socket) => {
  socket.on(
    "request_documents",
    async (sendDocuments: (docs: IDocument[]) => {}) => {
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
});
