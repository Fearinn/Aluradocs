import * as dotenv from "dotenv";
import { Collection, MongoClient } from "mongodb";

dotenv.config();

const client: MongoClient = new MongoClient(process.env.MONGO_URL!);

let collectionDocs: Collection | undefined;

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

  if (!collectionDocs) {
    throw new Error("There was an error selecting the collection");
  }

  console.log("Database successfully connected");
} catch (error) {
  console.log(error);
}

export default collectionDocs;
