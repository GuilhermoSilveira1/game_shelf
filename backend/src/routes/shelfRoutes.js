import { Router } from 'express';
import { listarTodosJogos } from '../controllers/gameController.js';

const router = Router();

router.get('/games', listarTodosJogos);

export default router;