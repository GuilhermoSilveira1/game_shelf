import { BACKEND_API } from "@/config/api";

export async function search({ gameName }) {
  const params = new URLSearchParams({
    name: gameName,
  });

  const res = await fetch(
    `${BACKEND_API}/games/search?${params.toString()}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);

    throw new Error(
      errorData?.mensagem ||
        errorData?.message ||
        "Erro na busca"
    );
  }

  return res.json();
}

export async function searchOneGame(gameId) {
  const res = await fetch(
    `${BACKEND_API}/games/${encodeURIComponent(gameId)}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);

    throw new Error(
      errorData?.mensagem ||
        errorData?.message ||
        "Erro ao buscar o jogo"
    );
  }

  return res.json();
}