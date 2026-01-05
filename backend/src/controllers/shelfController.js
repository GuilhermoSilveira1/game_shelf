// Aqui é o equivalente das views do django, é chamado a função que corresponde ao dado que se quer mostrar,
// e envia como resposta
// A shelf é onde o usuário vai colocar os jogos 

import * as shelfService from '../services/shelfService.js';

export async function listarTodosJogos(req, res) {
  try {
    const jogos = await shelfService.listarTodosJogos();
    res.json(jogos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar jogos' });
  }
}
