import { BACKEND_API } from "@/config/api"

export async function checkBackendHealth({ signal } = {}) {
  const response = await fetch(`${BACKEND_API}/health`, {
    method: "GET",
    cache: "no-store",
    signal,
  })

  if (!response.ok) {
    throw new Error(
      `Backend indisponível. Status: ${response.status}`
    )
  }

  return true
}