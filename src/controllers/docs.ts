import collectionDocs from "../dbConnect.js";

export function findDocument(name: string) {
  const doc = collectionDocs?.findOne({ name: name });
  return doc;
}

export function updateDocumentDB(name: string, text: string) {
  const update = collectionDocs?.updateOne(
    { name: name },
    {
      $set: {
        text: text,
      },
    }
  );

  return update
}
