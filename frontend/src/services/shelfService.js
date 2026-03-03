const API = "http://localhost:5000"

// GET /shelf (lista todos os jogos na shelf do usuário)
export async function getShelf(token) {
  const res = await fetch(`${API}/shelf`, {
    method: "GET",
    credentials: "include"
  })

  if (!res.ok) throw new Error("Erro ao obter shelf")
  return res.json()
}

// GET /shelf/:gameId (pega apenas UM jogo da shelf)
export async function getOneFromShelf(gameId, token) {
  const res = await fetch(`${API}/shelf/${gameId}`, {
    method: "GET",
    credentials: "include"
  })

  if (!res.ok) throw new Error("Erro ao obter jogo da shelf")
  return res.json()
}

// POST /shelf (adicionar jogo novo à shelf)
export async function addToShelf(data) {
  const res = await fetch(`${API}/shelf`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      gameId: data.gameId,
      status: data.status,
      description: data.description,
      plataform: data.plataform,
      rating: data.rating,
      time_played: data.time_played
    })
  })

  if (!res.ok) {
    const error = await res.text()
    console.error(error)
    throw new Error("Erro ao adicionar jogo à shelf")
  }

  return res.json()
}

// PATCH /shelf/:gameId (atualizar informações)
export async function updateShelf(gameId, data) {
  const res = await fetch(`${API}/shelf/${gameId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    const error = await res.text()
    console.error(error)
    throw new Error("Erro ao atualizar jogo da shelf")
  }

  return res.json()
}

// DELETE /shelf/:gameId (remover jogo)
export async function deleteFromShelf(gameId, token) {
  const res = await fetch(`${API}/shelf/${gameId}`, {
    method: "DELETE",
    credentials: "include"
  })

  if (!res.ok) throw new Error("Erro ao remover jogo da shelf")
  return res.json()
}