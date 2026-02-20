// Chamada logo após realizar login para guardar o token enviado pelo backend
export function saveToken(token) {
  localStorage.setItem("token", token)
}

// Função que vou chamar toda vez que precisar autenticar o usuário
export function getToken() {
  return localStorage.getItem("token")
}

// Essa função serve para fazer o logout
export function removeToken() {
  localStorage.removeItem("token")
}
