import { BACKEND_API } from "@/config/api"

export async function checkBackendHealth({ signal } = {}) {
  const response = await fetch(`${BACKEND_API}/health`, {
    method: "GET",
    cache: "no-store",
    signal,
  })

  if (!response.ok) {
    throw new Error("O backend ainda não está disponível.")
  }

  return response.json()
}