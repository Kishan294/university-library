import jwt from "jsonwebtoken";
import { config } from "./config";

const secret = config.env.secret;
export const createVerificationToken = (email: string) => {
  return jwt.sign({ email }, secret, { expiresIn: "1h" });
};
