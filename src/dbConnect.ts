import * as dotenv from "dotenv";
import { Collection, MongoClient } from "mongodb";

dotenv.config();

const client: MongoClient = new MongoClient(process.env.MONGO_URL!);

export let docsCollection: Collection | null = null;
export let usersCollection: Collection | null = null;

try {
  if (!process.env.MONGO_DB_NAME) {
    throw new Error("The database name is undefined");
  }

  const db = client.db(process.env.MONGO_DB_NAME);
  await client.connect();

  docsCollection = db.collection("docs");
  usersCollection = db.collection("users");

  if (!docsCollection || !usersCollection) {
    throw new Error("There was an error selecting the collection");
  }

  console.log("Database successfully connected");
} catch (error) {
  console.log(error);
}
