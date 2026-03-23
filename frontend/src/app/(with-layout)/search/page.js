"use client"
import { useState } from "react"
import GameSearchCard from "@/components/GameSearchCard"
import SearchBar from "@/components/SearchBar"
import ShelfCreateForm from "@/components/ShelfCreateForm"
import { search } from "@/services/searchService"

export default function SearchPage() {
  const [results, setResults] = useState([])
  const [selectedGame, setSelectedGame] = useState(null)
  const [showForm, setShowForm] = useState(false)

  async function handleSearch({ gameName }) {
    try {
      const response = await search({ gameName })
      setResults(response.items)
    } catch {
      alert("Falha na pesquisa")
    }
  }

  function handleAdd(game) {
    setSelectedGame(game)
    setShowForm(true)
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
          />
        ))}
      </div>

      {showForm && (
        <ShelfCreateForm
          game={selectedGame}
          onClose={() => setShowForm(false)}
        />
      )}

    </>
  )
}