import express from 'express';
import gameRoutes from './routes/shelfRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(gameRoutes);
app.use(userRoutes);

export default app;
