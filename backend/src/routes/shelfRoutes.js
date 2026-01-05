
// src/routes/games.js
import express from 'express';
import { getOrFetchGamesByName, getOrFetchGamesByGenreName } from '../services/gamesService.js';
import { listAllGamesLocal } from '../repositories/gamesRepo.js';

const router = express.Router();

// GET /games/search?name=Sekiro
// GET /games/search?genre=Action
router.get('/search', async (req, res) => {
  try {
    const { name, genre } = req.query;

    if (!name && !genre) {
      return res.status(400).json({ message: 'Informe ?name= ou ?genre=' });
    }

    const data = name
      ? await getOrFetchGamesByName(name)
      : await getOrFetchGamesByGenreName(genre);

    return res.json({ count: data.length, items: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao pesquisar jogos.' });
  }
});

// (opcional) GET /games - lista local
router.get('/', async (_req, res) => {
  const data = await listAllGamesLocal();
  res.json({ count: data.length, items: data });
});

export default router;
