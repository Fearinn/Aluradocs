import collectionDocs from "../dbConnect.js";
import IDocument from "../../interfaces/Documents.js";

export function findDocument(name: string) {
  if (collectionDocs) {
    const doc = collectionDocs.findOne({ name: name });
    return doc;
  }
}

export function updateDocumentDB(name: string, text: string) {
  if (collectionDocs) {
    const update = collectionDocs?.updateOne(
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
  if (collectionDocs) {
    const docs = (await collectionDocs.find({}).toArray()) as IDocument[];
    return docs;
  }
}

export function addDocumentDB(name: string) {
  if (collectionDocs) {
    const result = collectionDocs.insertOne({ name: name, text: "" });
    return result;
  }
}

export function deleteDocumentDB(name: string) {
  if (collectionDocs) {
    const deletion = collectionDocs.deleteOne({name: name})
    return deletion
  }
}
