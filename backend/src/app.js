import express from 'express';
import shelfRouter from './routes/searchRoutes.js';
import authRouter from './routes/authRoutes.js'

const app = express();

app.use(express.json());
app.use('/games', shelfRouter);
app.use('/auth', authRouter)

export default app;
