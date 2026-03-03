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