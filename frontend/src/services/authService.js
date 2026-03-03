const API = "http://localhost:5000"

export async function login(data) {
  // data = { identifier, password }
  const res = await fetch(`${API}/auth`, {
    method: "POST",
    credentials: "include",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.mensagem || "Erro no login")
  }
  return res.json()
}

export async function register(data) {
  // data = { email, username, password }
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.mensagem || "Erro no registro")
  }
  return res.json()
}

export async function logout() {
  await fetch(`${API}/auth/logout`, {
    method: "POST",
    credentials: "include"
  });
}