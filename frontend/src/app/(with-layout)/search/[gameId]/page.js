"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ShelfCreateForm from "@/components/ShelfCreateForm"
import { searchOneGame } from "@/services/searchService"

export default function SearchDetailsPage() {
  const { gameId } = useParams()
  const [selectedGame, setSelectedGame] = useState(null)

  async function load(id) {
    const response = await searchOneGame(id)
    console.log("Detalhes:", response)
    setSelectedGame(response)
  }

  useEffect(() => {
    if (gameId) {
      load(gameId)
    }
  }, [gameId])

  if (!selectedGame) return <p>Carregando...</p>

  return (
  <div className="p-4">
    <h1 className="text-2xl font-bold">
      {selectedGame.game.name}
    </h1>

    <img
      src={selectedGame.game.coverUrl}
      alt={selectedGame.game.name}
      className="w-64 my-4"
    />

    <p className="mb-4">
      {selectedGame.game.summary}
    </p>

    <p>Status: {selectedGame.status}</p>
    <p>Plataforma: {selectedGame.plataform}</p>

    <ShelfCreateForm game={selectedGame} />
  </div>
)
}