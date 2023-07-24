import { config } from "dotenv";
config();

export const PORT = process.env.PORT ?? 3003;
export const JWT_SECRET = process.env.SECRET ?? "";
