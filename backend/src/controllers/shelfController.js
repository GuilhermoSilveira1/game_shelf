// Rotas CRUD shelf
import * as shelfService from '../services/shelfService.js';

// Rota POST para adicionar jogo na shelf
export async function addGameToShelf(req, res) {
    // Adicionando o Id do usuário
    const userId = req.user.id;
    const { gameId, status, description, plataform, rating, time_played } = req.body;

    // Validando se os dados necessários foram enviados, usuário já foi validado no verifyToken
    if (!gameId || !status) {
    return res.status(400).json({ message: 'Dados faltando na requisição' });
    }

    try {
        // Com os Ids e os dados, joga para a shelf do usuário
        await shelfService.addGame({
        userId,
        gameId,
        status,
        description,
        plataform,
        rating,
        time_played
        });

        // Jogo adicionado na shelf, retorna uma mensagem de OK para o front
        return res.status(201).json({ "message": "Jogo adicionado com sucesso!" }) 
    } catch (err) {
        console.log(`Erro ocorrido ao tentar adicionar jogo: ${err}`)
        return res.status(400).json({
        "mensagem": "Erro ao tentar processar a solicitação"
      });
    }
} 

// Rota GET para ler todos os jogos adicionados na shelf
export async function listGamesFromShelf(req, res) {
    // Já validou o id do usuário, então só precisa usar isso para puxar a shelf
    const user = req.user.id;

    const listshelf = await shelfService.listGames(user);

    res.status(200).json(listshelf)
}

// Rota GET para ler 1 jogo específico
export async function listOneGameFromShelf(req, res) {
    // Já validou o id do usuário, então só precisa usar isso para puxar a shelf
    const userId = req.user.id
    const gameId = Number(req.params.gameId);

    const listshelf = await shelfService.listOneGame(userId, gameId);

    res.status(200).json(listshelf)
}

// Rota PATCH para ajustar dados de um jogo na shelf
export async function updateGameInShelf(req, res) {
    // Puxando os dados da requisição
    const userId = req.user.id;
    const gameId = Number(req.params.gameId);
    const data = req.body;

    await shelfService.updateGame(userId, gameId, data);

    // Retornar resposta para o front
    return res.status(200).json({ "message": "Jogo atualizado com sucesso!" })
}

// Rota DELETE para deletar um jogo da Shelf
export async function deleteGameInShelf (req, res) {
    // Pegar o userId e gameId
    const userId = req.user.id;
    const gameId = req.params.gameId;

    // Envia isso para o service
    await shelfService.deleteGame(userId, gameId)

    // Retorna mensagem para o usuário
    return res.status(200).json({ "message": "jogo removido com sucesso!" })
}