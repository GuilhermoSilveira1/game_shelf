import express from 'express';
import searchRouter from './routes/searchRoutes.js';
import authRouter from './routes/authRoutes.js'
import shelfRouter from './routes/shelfRoutes.js'
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000", // URL do frontend
  credentials: true
}));

app.use(express.json());

// Rota de pesquisa de jogos
app.use('/games', searchRouter);

// Rota de autenticação e criação de usuário
app.use('/auth', authRouter)

// Rota da shelf do usuário
app.use('/shelf', shelfRouter)

export default app;
