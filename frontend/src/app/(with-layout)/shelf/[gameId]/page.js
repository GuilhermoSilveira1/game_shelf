"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getOneFromShelf } from "@/services/shelfService"
import ShelfUpdateForm from "@/components/ShelfUpdateForm"
import GameCard from "@/components/GameCard"

export default function ShelfDetailsPage() {
  const { gameId } = useParams()
    const [selectedGame, setSelectedGame] = useState(null)

  async function load(id) {
    const response = await getOneFromShelf(id)
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

    <ShelfUpdateForm game={selectedGame} />
  </div>
)
}