// Aqui é o equivalente das views do django, é chamado a função que corresponde ao dado que se quer mostrar,
// e envia como resposta
// A shelf é onde o usuário vai colocar os jogos 

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
exports.listarTodosJogos = (req,res) => {
  res.json(jogos);
};

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
});
