"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { searchOneGame } from "@/services/searchService"
import ShelfCreateForm from "@/components/ShelfCreateForm"

export default function SearchDetailsPage() {
  const { gameId } = useParams()
  const [selectedGame, setSelectedGame] = useState(null)
  const [showForm, setShowForm] = useState(false)
  
  function handleAdd() {
    setShowForm(true)
  }

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
        {selectedGame.name}
      </h1>

      <img
        src={selectedGame.coverUrl}
        alt={selectedGame.name}
        className="w-64 my-4"
      />

      <p className="mb-4">
        {selectedGame.summary}
      </p>

      <button onClick={() => handleAdd()}>Adicionar</button>

      {showForm && (
        <ShelfCreateForm
          game={selectedGame}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}