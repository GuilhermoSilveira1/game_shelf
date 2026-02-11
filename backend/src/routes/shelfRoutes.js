import express from 'express';
import { addGameToShelf, listGamesFromShelf, updateGameInShelf, deleteGameInShelf, listOneGameFromShelf } from '../controllers/shelfController.js';
import verifyToken from '../middleware/verificarJWT.js' 

const router = express.Router();

// CRUD da shelf

// Create - POST
router.post('/', verifyToken, addGameToShelf);

// Read - GET (geral, pega todos os jogos)
router.get('/', verifyToken, listGamesFromShelf);

// Read - GET (específico, pega apenas 1 jogo)
router.get('/:gameId', verifyToken, listOneGameFromShelf);

// Update - PATCH
router.patch('/:gameId', verifyToken, updateGameInShelf);

// Delete - DELETE
router.delete('/:gameId', verifyToken, deleteGameInShelf)

export default router;
