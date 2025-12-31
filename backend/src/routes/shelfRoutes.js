// src/routes/produtoRoutes.js
const express = require('express');
const router = express.Router(); // É só no front que o routing é feito sozinho, aqui precisa importar

// Importamos o nosso controller
const shelfController = require('../controllers/shelfController');

// Definimos as rotas e associamos às funções do controller
router.get('/', shelfController.listarTodosJogos);