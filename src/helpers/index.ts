import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const tokenSign = async (user: User) =>
  sign({ id: user.id }, JWT_SECRET, { expiresIn: "2h" });
