import * as shelfService from '../services/shelfService.js';

// GET /games
export async function listAllGames(req, res) {
  try {
    const games = await shelfService.listAllGamesLocal();
    return res.json({
      count: games.length,
      items: games,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar jogos' });
  }
}

// GET /games/search?name=Sekiro
// GET /games/search?genre=Action
export async function listGamesByNameOrGenre(req, res) {
  try {
    const { name, genre } = req.query;

    if (!name && !genre) {
      return res
        .status(400)
        .json({ message: 'Informe name ou genre' });
    }

    let games;

    if (name) {
      // tenta local → IGDB
      games = await shelfService.findGamesByNameLocal(name);
      if (!games.length) {
        games = await shelfService.getOrFetchGamesByName(name);
      }
    } else {
      games = await shelfService.findGamesByGenreNameLocal(genre);
    }

    return res.json({
      count: games.length,
      items: games,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar jogos' });
  }
}
