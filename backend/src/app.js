import express from 'express';
import shelfRouter from './routes/shelfRoutes.js';

const app = express();

app.use(express.json());
app.use('/games', shelfRouter);

export default app;
