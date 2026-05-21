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
    <div className="p-8">

      {/* Janela principal */}
      <div
        className="
          bg-[#ff77d9]
          border-4
          border-[#3b2a1f]
          shadow-[10px_10px_0px_#3b2a1f]
          overflow-hidden
        "
      >

        {/* Header retrô */}
        <div
          className="
            bg-[#f4ef45]
            border-b-4
            border-[#3b2a1f]
            px-4
            py-3
            flex
            items-center
            gap-3
          "
        >
          <div className="w-5 h-5 bg-[#58d0e0] border-2 border-[#3b2a1f]" />
          <div className="w-5 h-5 bg-[#ff6464] border-2 border-[#3b2a1f]" />
          <div className="w-5 h-5 bg-[#5a54f2] border-2 border-[#3b2a1f]" />

          <span className="font-black text-[#3b2a1f] uppercase">
            Save Data.exe
          </span>
        </div>

        <div className="p-8">

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">

            {/* Lado esquerdo */}
            <div>

              {/* Capa */}
              <div
                className="
                  bg-[#58d0e0]
                  border-4
                  border-[#3b2a1f]
                  shadow-[8px_8px_0px_#3b2a1f]
                  p-3
                  mb-6
                "
              >
                <img
                  src={selectedGame.game.coverUrl}
                  alt={selectedGame.game.name}
                  className="
                    w-full
                    border-4
                    border-[#3b2a1f]
                  "
                />
              </div>

              {/* Botões */}
              <div className="flex flex-col gap-4">

                <button
                  onClick={() => handleEdit(selectedGame)}
                  className="
                    bg-[#5a54f2]
                    border-4
                    border-[#3b2a1f]
                    text-white
                    font-black
                    uppercase
                    px-4
                    py-4
                    shadow-[6px_6px_0px_#3b2a1f]

                    hover:translate-x-[3px]
                    hover:translate-y-[3px]
                    hover:shadow-[3px_3px_0px_#3b2a1f]

                    transition-all
                    duration-150
                  "
                >
                  ✏️ Editar jogo
                </button>

                <button
                  onClick={() => handleRemove(selectedGame.game.id)}
                  className="
                    bg-[#ff6464]
                    border-4
                    border-[#3b2a1f]
                    text-white
                    font-black
                    uppercase
                    px-4
                    py-4
                    shadow-[6px_6px_0px_#3b2a1f]

                    hover:translate-x-[3px]
                    hover:translate-y-[3px]
                    hover:shadow-[3px_3px_0px_#3b2a1f]

                    transition-all
                    duration-150
                  "
                >
                  🗑 Remover jogo
                </button>

              </div>

            </div>

            {/* Lado direito */}
            <div className="flex flex-col gap-6">

              {/* Título */}
              <div
                className="
                  bg-[#5a54f2]
                  border-4
                  border-[#3b2a1f]
                  shadow-[8px_8px_0px_#3b2a1f]
                  p-6
                "
              >
                <h1
                  className="
                    text-5xl
                    font-black
                    uppercase
                    text-white
                    leading-tight
                  "
                >
                  {selectedGame.game.name}
                </h1>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4">

                {selectedGame.status && (
                  <div
                    className="
                      bg-[#58d0e0]
                      border-4
                      border-[#3b2a1f]
                      px-4
                      py-3
                      font-black
                      text-[#3b2a1f]
                      shadow-[6px_6px_0px_#3b2a1f]
                    "
                  >
                    🎮 {selectedGame.status}
                  </div>
                )}

                {selectedGame.rating && (
                  <div
                    className="
                      bg-[#f4ef45]
                      border-4
                      border-[#3b2a1f]
                      px-4
                      py-3
                      font-black
                      text-[#3b2a1f]
                      shadow-[6px_6px_0px_#3b2a1f]
                    "
                  >
                    ⭐ {selectedGame.rating}/10
                  </div>
                )}

                {selectedGame.time_played && (
                  <div
                    className="
                      bg-[#ff6464]
                      border-4
                      border-[#3b2a1f]
                      px-4
                      py-3
                      font-black
                      text-white
                      shadow-[6px_6px_0px_#3b2a1f]
                    "
                  >
                    ⏱ {selectedGame.time_played}h
                  </div>
                )}

              </div>

              {/* Descrição */}
              <div
                className="
                  bg-[#58d0e0]
                  border-4
                  border-[#3b2a1f]
                  shadow-[8px_8px_0px_#3b2a1f]
                  p-6
                "
              >
                <h2
                  className="
                    text-2xl
                    font-black
                    uppercase
                    text-[#3b2a1f]
                    mb-4
                  "
                >
                  📖 Sobre o jogo
                </h2>

                <p
                  className="
                    text-[#3b2a1f]
                    font-bold
                    leading-relaxed
                    text-lg
                  "
                >
                  {selectedGame.game.summary}
                </p>
              </div>

            </div>

          </div>

          {/* Form */}
          {showForm && (
            <div className="mt-10">
              <ShelfUpdateForm
                game={selectedGame}
                onClose={() => setShowForm(false)}
              />
            </div>
          )}

        </div>
      </div>
    </div>
)
}