"use client"
import SearchBar from "@/components/SearchBar"
import { search } from "@/services/gameService"
import { getToken } from "@/utils/storage"
import { useRouter } from "next/navigation"

export default function SearchPage() {
  const router = useRouter()
  const token = getToken()

  async function handleSearch(data) {
    try {
      const response = await search(data)

    } catch {
      alert("Falha na pesquisa")
    }
  }

  return (
    <SearchBar onSubmit={handleSearch} buttonText="Pesquisar" />

  )
}
