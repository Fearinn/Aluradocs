import jwt from "jsonwebtoken";

export function createJwt(payload: { name: string }) {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });

  return token;
}
