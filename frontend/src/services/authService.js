const API = "http://localhost:5000"

export async function login(data) {
  // data = { identifier, password }
  const res = await fetch(`${API}/auth`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error("Erro ao logar")
  return res.json()
}

export async function register(data) {
  // data = { email, username, password }
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error("Erro ao registrar")
  return res.json()
}