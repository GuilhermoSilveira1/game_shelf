/* 
Esse service serve tanto para o search quanto para a shelf, já que 
os dois basicamente mostram os game cards.
 */
const API = "http://localhost:5000"

export async function search(data) {
  const res = await fetch(`${API}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  if (!res.ok) throw new Error("Erro na busca")

  return res.json()
}