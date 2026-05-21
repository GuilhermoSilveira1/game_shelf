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
    if (showForm == false) {
      setShowForm(true)
    }
    if (showForm == true) {
      setShowForm(false)
    }
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
    <div className="min-h-screen bg-[#c8c5dd] p-8">

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

        {/* Barra retrô */}
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
            Game Details.exe
          </span>
        </div>

        {/* Conteúdo */}
        <div className="p-8">

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">

            {/* Capa */}
            <div>

              <div
                className="
                  bg-[#58d0e0]
                  border-4
                  border-[#3b2a1f]
                  shadow-[8px_8px_0px_#3b2a1f]
                  p-3
                "
              >
                <img
                  src={selectedGame.coverUrl}
                  alt={selectedGame.name}
                  className="
                    w-full
                    border-4
                    border-[#3b2a1f]
                  "
                />
              </div>

            </div>

            {/* Infos */}
            <div className="flex flex-col">

              {/* Título */}
              <div
                className="
                  bg-[#5a54f2]
                  border-4
                  border-[#3b2a1f]
                  shadow-[8px_8px_0px_#3b2a1f]
                  p-5
                  mb-6
                "
              >
                <h1
                  className="
                    text-4xl
                    font-black
                    text-white
                    uppercase
                    leading-tight
                  "
                >
                  {selectedGame.name}
                </h1>
              </div>

              {/* Resumo */}
              <div
                className="
                  bg-[#58d0e0]
                  border-4
                  border-[#3b2a1f]
                  shadow-[8px_8px_0px_#3b2a1f]
                  p-5
                  mb-6
                "
              >
                <h2
                  className="
                    text-xl
                    font-black
                    text-[#3b2a1f]
                    uppercase
                    mb-3
                  "
                >
                  📖 Sobre o jogo
                </h2>

                <p
                  className="
                    text-[#3b2a1f]
                    font-bold
                    leading-relaxed
                  "
                >
                  {selectedGame.summary}
                </p>
              </div>

              {/* Botão */}
              <button
                onClick={() => handleAdd()}
                className="
                  self-start
                  bg-[#f4ef45]
                  border-4
                  border-[#3b2a1f]
                  px-8
                  py-4
                  text-[#3b2a1f]
                  font-black
                  uppercase
                  text-lg
                  shadow-[8px_8px_0px_#3b2a1f]

                  hover:translate-x-[4px]
                  hover:translate-y-[4px]
                  hover:shadow-[4px_4px_0px_#3b2a1f]

                  active:translate-x-[8px]
                  active:translate-y-[8px]
                  active:shadow-none

                  transition-all
                  duration-150
                "
              >
                ➕ Adicionar à coleção
              </button>

            </div>

          </div>

          {/* Modal/Form */}
          {showForm && (
            <div className="mt-10">
              <ShelfCreateForm
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