import { IUser } from "../../interfaces/User";
import { usersCollection } from "../dbConnect.js";
import { createHashAndSalt } from "../utils/createHashAndSalt.js";

export function registerUser({ name, password }: IUser) {
  if (usersCollection) {
    const { hash, salt } = createHashAndSalt(password);
    return usersCollection.insertOne({
      name,
      password: hash,
      passwordSalt: salt,
    });
  }
}

export function findUserByName({ name }: IUser) {
  if (usersCollection) {
    return usersCollection.findOne({ name });
  }
}
