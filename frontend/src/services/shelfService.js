import { BACKEND_API } from "@/config/api";

async function readResponse(res) {
  const contentType = res.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return res.json();
  }

  return null;
}

async function throwResponseError(res, fallbackMessage) {
  const errorData = await readResponse(res);

  throw new Error(
    errorData?.mensagem ||
      errorData?.message ||
      fallbackMessage
  );
}

export async function getShelf() {
  const res = await fetch(`${BACKEND_API}/shelf`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    await throwResponseError(res, "Erro ao obter shelf");
  }

  return readResponse(res);
}

export async function getOneFromShelf(gameId) {
  const res = await fetch(
    `${BACKEND_API}/shelf/${encodeURIComponent(gameId)}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    await throwResponseError(
      res,
      "Erro ao obter jogo da shelf"
    );
  }

  return readResponse(res);
}

export async function addToShelf(data) {
  const res = await fetch(`${BACKEND_API}/shelf`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gameId: data.gameId,
      status: data.status,
      description: data.description,
      plataform: data.plataform,
      rating: data.rating,
      time_played: data.time_played,
    }),
  });

  if (!res.ok) {
    await throwResponseError(
      res,
      "Erro ao adicionar jogo à shelf"
    );
  }

  return readResponse(res);
}

export async function updateShelf(gameId, data) {
  const res = await fetch(
    `${BACKEND_API}/shelf/${encodeURIComponent(gameId)}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    await throwResponseError(
      res,
      "Erro ao atualizar jogo da shelf"
    );
  }

  return readResponse(res);
}

export async function deleteFromShelf(gameId) {
  const res = await fetch(
    `${BACKEND_API}/shelf/${encodeURIComponent(gameId)}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!res.ok) {
    await throwResponseError(
      res,
      "Erro ao remover jogo da shelf"
    );
  }

  return readResponse(res);
}