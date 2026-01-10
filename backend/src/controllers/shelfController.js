// Aqui é o equivalente das views do django, é chamado a função que corresponde ao dado que se quer mostrar,
// e envia como resposta
// A shelf é onde o usuário vai colocar os jogos 

import * as shelfService from '../services/shelfService.js';

export async function listAllGames(req, res) {
  try {
    const games = shelfService.listAllGamesLocal()

    return res.json(games)    
  } catch {
      return res.status()
  }
}

export async function listGamesByName(req, res) {
  try {
    const name = req.params
    const games = await shelfService.findGamesByNameLocal(name)
    if (games.length) {
      return res.json(games)
    } else {
      const games = await shelfService.getOrFetchGamesByName(name)
      return res.json(games)
    } 
    
  } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar os jogos' });
  }
}

export async function listGamesByGenre(req, res) {
  try {
    const genre = req.params
    const games = await shelfService.findGamesByGenreNameLocal(genre)
    return res.json(games)
  } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar os jogos' });
  }
}