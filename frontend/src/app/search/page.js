"use client"
import { useState } from "react"
import GameCard from "@/components/GameCard"
import SearchBar from "@/components/SearchBar"
import { search } from "@/services/searchService"

export default function SearchPage() {
  const [results, setResults] = useState([])

  async function handleSearch({ gameName }) {
    try {
      const response = await search({ gameName })
      setResults(response.items)
    } catch {
      alert("Falha na pesquisa")
    }
  }

  function handleAdd(game) {
    console.log("Adicionar:", game)
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} buttonText="Pesquisar" />

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {results.map(game => (
          <GameCard
            key={game.id}
            game={game}
            onAdd={() => handleAdd(game)}
          />
        ))}
      </div>
    </>
  )
}