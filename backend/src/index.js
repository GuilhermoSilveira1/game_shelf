import app from './app.js';

// Olhar a importação do arquivo .env

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
