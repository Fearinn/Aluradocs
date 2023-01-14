import collectionDocs from "../dbConnect.js";
export function findDocument(name) {
    const doc = collectionDocs?.findOne({ name: name });
    return doc;
}
export function updateDocumentDB(name, text) {
    const update = collectionDocs?.updateOne({ name: name }, {
        $set: {
            text: text,
        },
    });
    return update;
}
