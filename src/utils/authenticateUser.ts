import { scryptSync, timingSafeEqual } from "crypto";
import { IUser } from "../../interfaces/User";

export function authenticateUser(
  submittedPassword: string,
  { password, passwordSalt = "" }: IUser
) {
  const hashTest = scryptSync(submittedPassword, passwordSalt, 64);

  const realHash = Buffer.from(password, "hex");

  return timingSafeEqual(hashTest, realHash);
}
