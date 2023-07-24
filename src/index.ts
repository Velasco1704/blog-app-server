import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes";
import postRouter from "./routes/post.routes";
import { PORT } from "./config";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", userRouter);
app.use("/api", postRouter);

app.listen(PORT);
