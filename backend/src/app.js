import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import searchRouter from "./routes/searchRoutes.js";
import authRouter from "./routes/authRoutes.js";
import shelfRouter from "./routes/shelfRoutes.js";

const app = express();

if (!process.env.FRONTEND_URL) {
  throw new Error(
    "A variável FRONTEND_URL não está configurada."
  );
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/games", searchRouter);
app.use("/auth", authRouter);
app.use("/shelf", shelfRouter);

export default app;