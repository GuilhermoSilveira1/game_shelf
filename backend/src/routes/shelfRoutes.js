import express from 'express';
import {listAllGames, listGamesByGenre, listGamesByName} from "../controllers/shelfController";

const router = express.Router();

// GET /games/search?name=Sekiro
// GET /games/search?genre=Action
router.get('/search', async (req, res) => {
  try {
    const { name, genre } = req.query;

    if (!name && !genre) {
      return res.status(400).json({ message: 'Informe nome ou gênero do jogo' });
    }

    const data = name
      ? await listGamesByName(name)
      : await listGamesByGenre(genre);

    return res.json({ count: data.length, items: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao pesquisar jogos.' });
  }
});

// (opcional) GET /games - lista de todos os jogos
router.get('/', async (_req, res) => {
  const data = await listAllGames();
  res.json({ count: data.length, items: data });
});

export default router;
