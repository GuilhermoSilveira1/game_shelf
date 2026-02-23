"use client"
import { useState } from "react"
import GameCard from "@/components/GameCard"
import SearchBar from "@/components/SearchBar"
import { search } from "@/services/gameService"
import { getToken } from "@/utils/storage"

export default function SearchPage() {
  const token = getToken()
  const [results, setResults] = useState([])

  async function handleSearch({ gameName }) {
    try {
      const response = await search({ token, gameName })
      setResults(response) // Lista de jogos
    } catch {
      alert("Falha na pesquisa")
    }
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} buttonText="Pesquisar" />

      <div>
        {results.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </>
  )
}