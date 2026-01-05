import express from 'express';
import shelfRouter from './routes/shelfRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use('/games', shelfRouter);
app.use('/user', userRoutes);

export default app;
