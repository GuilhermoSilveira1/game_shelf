const API = "http://localhost:5000"

export async function search({ gameName }) {
  const params = new URLSearchParams({
    name: gameName
  });

  const res = await fetch(`${API}/games/search?${params.toString()}`, {
    method: "GET",
    credentials: "include"
  });

  if (!res.ok) throw new Error("Erro na busca");

  return res.json();
}

// Procurar apenas 1 jogo
export async function searchOneGame({ gameId }) {
  const params = new URLSearchParams({
    Id: gameId
  });

  const res = await fetch(`${API}/games/search?${params.toString()}`, {
    method: "GET",
    credentials: "include"
  });

  if (!res.ok) throw new Error("Erro na busca");

  return res.json();
}