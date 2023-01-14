import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
const client = new MongoClient(process.env.MONGO_URL);
let collectionDocs;
try {
    if (!process.env.MONGO_DB_NAME) {
        throw new Error("The database name is undefined");
    }
    if (!process.env.MONGO_COLLECTION) {
        throw new Error("The collection name is undefined");
    }
    const db = client.db(process.env.MONGO_DB_NAME);
    await client.connect();
    collectionDocs = db.collection(process.env.MONGO_COLLECTION);
    console.log("Database successfully connected");
}
catch (error) {
    console.log(error);
}
export default collectionDocs;
