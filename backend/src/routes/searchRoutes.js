import express from 'express';
import {
  listAllGames,
  listGamesByNameOrGenre
} from '../controllers/searchController.js';
import { listOneGame } from '../controllers/searchController.js';

const router = express.Router();

// GET /games/search
router.get('/search', listGamesByNameOrGenre);

// Read - GET (específico, pega apenas 1 jogo)
router.get('/:gameId', listOneGame);

// GET /games
router.get('/', listAllGames);

export default router;
