// src/index.js
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware para interpretar JSON
app.use(express.json());

// Importamos o nosso arquivo de rotas de produtos
const produtoRoutes = require('./routes/produtoRoutes');

// Usamos o roteador na nossa aplicação, definindo um prefixo
// Todas as rotas em 'produtoRoutes' terão '/api/produtos' antes
app.use('/api/produtos', produtoRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API de Produtos funcionando!');
});

// Inicialização do servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});