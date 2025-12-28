// src/index.js
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Mock de jogos para testar se a API está funcionando
const jogos = [
  {
    "id": "1",
    "name": "Fortnite",
    "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/33214-{width}x{height}.jpg",
    "igdb_id": "1905"
  },
  {
    "id": "2",
    "name": "Monster Hunter",
    "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/33214-{width}x{height}.jpg",
    "igdb_id": "1905"
  },
  {
    "id": "3",
    "name": "Overwatch",
    "box_art_url": "https://static-cdn.jtvnw.net/ttv-boxart/33214-{width}x{height}.jpg",
    "igdb_id": "1905"
  }
];

// Rota para listar todos os jogos (no caso quero testar se consigo requisitar corretamente os jogos do front para o back)
app.get('/games', (req,res) => {
  res.json(jogos);
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
});
