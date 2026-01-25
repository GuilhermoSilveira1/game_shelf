import express from 'express';
import {
  listAllGames,
  listGamesByNameOrGenre
} from '../controllers/searchController.js';

const router = express.Router();

// GET /games/search?name=Sekiro
// GET /games/search?genre=Action
router.get('/search', listGamesByNameOrGenre);

// GET /games
router.get('/', listAllGames);

export default router;
