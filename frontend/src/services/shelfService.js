const API = "http://localhost:5000"

// GET /shelf (lista todos os jogos na shelf do usuário)
export async function getShelf(token) {
  const res = await fetch(`${API}/shelf`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  if (!res.ok) throw new Error("Erro ao obter shelf")
  return res.json()
}

// GET /shelf/:gameId (pega apenas UM jogo da shelf)
export async function getOneFromShelf(gameId, token) {
  const res = await fetch(`${API}/shelf/${gameId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  if (!res.ok) throw new Error("Erro ao obter jogo da shelf")
  return res.json()
}

// POST /shelf (adicionar jogo novo à shelf)
export async function addToShelf(data) {
  const res = await fetch(`${API}/shelf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${data.token}`
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

  if (!res.ok) throw new Error("Erro ao adicionar jogo à shelf")
  return res.json()
}

// PATCH /shelf/:gameId (atualizar informações)
export async function updateShelf(gameId, data) {
  const res = await fetch(`${API}/shelf/${gameId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${data.token}`
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) throw new Error("Erro ao atualizar jogo da shelf")
  return res.json()
}

// DELETE /shelf/:gameId (remover jogo)
export async function deleteFromShelf(gameId, token) {
  const res = await fetch(`${API}/shelf/${gameId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  if (!res.ok) throw new Error("Erro ao remover jogo da shelf")
  return res.json()
}