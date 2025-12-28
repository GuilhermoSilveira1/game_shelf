export default async function getGames() {
  const response = await fetch('http://localhost:4000/games');
  return response.json();
}
