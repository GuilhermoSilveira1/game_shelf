"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { deleteFromShelf, getOneFromShelf } from "@/services/shelfService"
import ShelfUpdateForm from "@/components/ShelfUpdateForm"
import { useRouter } from "next/navigation"

export default function ShelfDetailsPage() {
  const router = useRouter()

  const { gameId } = useParams()
  const [selectedGame, setSelectedGame] = useState(null)
  const [showForm, setShowForm] = useState(false)

  function handleEdit() {
    if (showForm == false) {
      setShowForm(true)
    }
    if (showForm == true) {
      setShowForm(false)
    }
  }

  async function handleRemove(gameId) {
    try {
      await deleteFromShelf(gameId)
      
      router.push("/shelf")
    } 
    catch (err) {
        console.error(err)
        alert("Erro ao remover jogo")
    }
  }

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

    <button onClick={() => handleEdit(selectedGame)}>Editar</button>
    <button onClick={() => handleRemove(selectedGame.game.id)}>Remover jogo</button>

    {showForm && (
      <ShelfUpdateForm
        game={selectedGame}
        onClose={() => setShowForm(false)}
      />
      )}
  </div>
)
}