// Aqui fica a comunicação com o backend

const API = "http://localhost:5000"

export async function login(data) {
  const res = await fetch(`${API}/auth`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })

  if (!res.ok) throw new Error("Erro ao logar")

  return res.json()
}

export async function register(data) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })

  return res.json()
}
