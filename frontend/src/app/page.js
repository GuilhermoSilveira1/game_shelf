'use client';
import { useState } from 'react';
import getGames from '@/scripts/getGames';

export default function Home() {
  const [games, setGames] = useState([]);

  async function handleGetGames() {
    const data = await getGames();
    setGames(data);
  }

  return (
    <div>
      <h1>Hello World!</h1>

      <button onClick={handleGetGames}>
        Puxar os jogos
      </button>

      <ul>
        {games.map(game => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
}
