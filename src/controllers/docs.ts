import { docsCollection } from "../dbConnect.js";
import IDocument from "../../interfaces/Documents.js";

export function findDocument(name: string) {
  if (docsCollection) {
    const doc = docsCollection.findOne({ name: name });
    return doc;
  }
}

export function updateDocumentDB(name: string, text: string) {
  if (docsCollection) {
    const update = docsCollection.updateOne(
      { name: name },
      {
        $set: {
          text: text,
        },
      }
    );
    return update;
  }
}

export async function getDocuments() {
  if (docsCollection) {
    const docs = await docsCollection.find<IDocument>({}).toArray();
    return docs;
  }
}

export function addDocumentDB(name: string) {
  if (docsCollection) {
    const result = docsCollection.insertOne({
      name: name,
      text: "",
    });
    return result;
  }
}

export function deleteDocumentDB(name: string) {
  if (docsCollection) {
    const deletion = docsCollection.deleteOne({ name: name });
    return deletion;
  }
}
