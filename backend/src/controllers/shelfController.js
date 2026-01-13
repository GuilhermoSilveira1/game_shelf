import * as shelfService from '../services/shelfService.js';

// GET /games
export async function listAllGames(req, res) {
  try {
    const DEFAULT_LIMIT = 50;
    const MAX_LIMIT = 200;
    const limit = Math.min(parseInt(req.query.limit ?? DEFAULT_LIMIT, 10), MAX_LIMIT);
    const page = Math.max(parseInt(req.query.page ?? 1, 10), 1);
    const games = await shelfService.listAllGamesLocal(limit, page);
    return res.json({ count: games.length, page, limit, items: games });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar jogos' });
  }
}

// GET /games/search?name=Sekiro
// GET /games/search?genre=Action
export async function listGamesByNameOrGenre(req, res) {
  try {
    // Normaliza
    let { name, genre, limit, page } = req.query;
    name = typeof name === 'string' ? name.trim() : undefined;
    genre = typeof genre === 'string' ? genre.trim() : undefined;

    if (!name && !genre) {
      return res.status(400).json({ message: 'Informe name ou genre' });
    }

    // Valida termo de busca mínimo (evita buscar por "a", "e")
    if (name && name.length < 2) {
      return res.status(400).json({ message: 'name deve ter ao menos 2 caracteres' });
    }

    // Converte paginação
    const DEFAULT_LIMIT = 20;
    const MAX_LIMIT = 100;
    const parsedLimit = Math.min(parseInt(limit ?? DEFAULT_LIMIT, 10), MAX_LIMIT);
    const parsedPage = Math.max(parseInt(page ?? 1, 10), 1);

    let games;

    if (name) {
      // tenta local
      games = await shelfService.findGamesByNameLocal(name, parsedLimit, parsedPage);
      if (!games.length) {
        // busca IGDB, persiste e reconsulta local paginado
        await shelfService.getOrFetchGamesByName(name);
        games = await shelfService.findGamesByNameLocal(name, parsedLimit, parsedPage);
      }
    } else {
      games = await shelfService.findGamesByGenreNameLocal(genre, parsedLimit, parsedPage);
    }

    return res.json({
      count: games.length,
      page: parsedPage,
      limit: parsedLimit,
      items: games,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar jogos' });
  }
}
