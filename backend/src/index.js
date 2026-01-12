import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('TWITCH_CLIENT_ID:', process.env.TWITCH_CLIENT_ID);
  console.log('TWITCH_CLIENT_SECRET:', process.env.TWITCH_CLIENT_SECRET ? 'OK' : 'MISSING');
});
