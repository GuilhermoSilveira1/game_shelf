// src/index.js
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'API Node funcionando!' });
});

const PORT = process.env.PORT || 3000;
appapp.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
});
