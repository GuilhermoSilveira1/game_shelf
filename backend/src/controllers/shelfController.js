// Aqui é o equivalente das views do django, é chamado a função que corresponde ao dado que se quer mostrar,
// e envia como resposta
// A shelf é onde o usuário vai colocar os jogos 

// Mock de jogos para testar se a API está funcionando
import * as gameService from '../services/gameService.js';

export async function listarTodosJogos(req, res) {
  try {
    const jogos = await gameService.listarTodosJogos();
    res.json(jogos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar jogos' });
  }
}
