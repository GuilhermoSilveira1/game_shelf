"use client"
import { useState } from "react"
import GameSearchCard from "@/components/GameSearchCard"
import SearchBar from "@/components/SearchBar"
import ShelfCreateForm from "@/components/ShelfCreateForm"
import { search } from "@/services/searchService"
import { useRouter } from "next/navigation"

export default function SearchPage() {
  const [results, setResults] = useState([])
  const router = useRouter()

  async function handleSearch({ gameName }) {
    try {
      const response = await search({ gameName })
      setResults(response.items)
    } catch {
      alert("Falha na pesquisa")
    }
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} buttonText="Pesquisar" />

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {results.map(game => (
          <GameSearchCard
            key={game.id}
            game={game}
            onAdd={() => handleAdd(game)}
            onClick={() => router.push(`/search/${game.id}`)}
          />
        ))}
      </div>

    </>
  )
}