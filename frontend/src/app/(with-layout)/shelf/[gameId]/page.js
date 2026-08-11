"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"

import {
  deleteFromShelf,
  getOneFromShelf,
} from "@/services/shelfService"
import ShelfUpdateForm from "@/components/ShelfUpdateForm"

const STATUS_LABELS = {
  WANT_TO_PLAY: "Quero jogar",
  PLAYING: "Jogando",
  COMPLETED: "Finalizado",
  DROPPED: "Abandonei",
}

export default function ShelfDetailsPage() {
  const router = useRouter()
  const { gameId } = useParams()

  const [selectedGame, setSelectedGame] =
    useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  async function handleRemove(id) {
    try {
      await deleteFromShelf(id)
      router.push("/shelf")
    } catch (error) {
      console.error(error)
      alert(
        error.message ||
          "Erro ao remover jogo"
      )
    }
  }

  useEffect(() => {
    if (!gameId) {
      return
    }

    let isMounted = true

    async function load() {
      try {
        setLoading(true)
        setError("")

        const response =
          await getOneFromShelf(gameId)

        if (isMounted) {
          setSelectedGame(response)
        }
      } catch (error) {
        console.error(
          "Erro ao carregar detalhes:",
          error
        )

        if (isMounted) {
          setError(
            error.message ||
              "Erro ao carregar o jogo"
          )
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      isMounted = false
    }
  }, [gameId])

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div
          className="
            inline-block
            bg-[#58d0e0]
            border-4
            border-[#3b2a1f]
            shadow-[6px_6px_0px_#3b2a1f]
            p-5
          "
        >
          <p className="font-black text-[#3b2a1f] text-lg">
            ⏳ Carregando detalhes...
          </p>
        </div>
      </div>
    )
  }

  if (error || !selectedGame) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div
          className="
            max-w-xl
            bg-[#ff6464]
            border-4
            border-[#3b2a1f]
            shadow-[6px_6px_0px_#3b2a1f]
            p-6
            text-white
          "
        >
          <h1 className="text-2xl font-black uppercase">
            Erro ao carregar
          </h1>

          <p className="mt-3 font-bold">
            {error || "Jogo não encontrado."}
          </p>

          <button
            type="button"
            onClick={() => router.push("/shelf")}
            className="
              mt-6
              bg-[#f4ef45]
              border-4
              border-[#3b2a1f]
              px-4
              py-3
              text-[#3b2a1f]
              font-black
              uppercase
              shadow-[4px_4px_0px_#3b2a1f]
            "
          >
            Voltar para a Shelf
          </button>
        </div>
      </div>
    )
  }

  const game = selectedGame.game
  const summary =
    game.summary?.trim() ||
    "Nenhuma descrição disponível para este jogo."

  return (
    <div
      className="
        min-w-0
        w-full
        p-4
        sm:p-6
        lg:p-8
      "
    >
      {/* Janela principal */}
      <div
        className="
          min-w-0
          w-full
          bg-[#ff77d9]
          border-4
          border-[#3b2a1f]
          shadow-[6px_6px_0px_#3b2a1f]
          sm:shadow-[8px_8px_0px_#3b2a1f]
          lg:shadow-[10px_10px_0px_#3b2a1f]
          overflow-hidden
        "
      >
        {/* Header */}
        <div
          className="
            bg-[#f4ef45]
            border-b-4
            border-[#3b2a1f]
            px-3
            sm:px-4
            py-3
            flex
            items-center
            gap-2
            sm:gap-3
            min-w-0
          "
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#58d0e0] border-2 border-[#3b2a1f] shrink-0" />
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#ff6464] border-2 border-[#3b2a1f] shrink-0" />
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#5a54f2] border-2 border-[#3b2a1f] shrink-0" />

          <span
            className="
              min-w-0
              truncate
              font-black
              text-[#3b2a1f]
              uppercase
              text-sm
              sm:text-base
            "
          >
            Save Data.exe
          </span>
        </div>

        <div className="min-w-0 p-4 sm:p-6 lg:p-8">
          <div
            className="
              min-w-0
              grid
              grid-cols-1
              lg:grid-cols-[260px_minmax(0,1fr)]
              xl:grid-cols-[300px_minmax(0,1fr)]
              gap-6
              lg:gap-8
              xl:gap-10
            "
          >
            {/* Lado esquerdo */}
            <div className="min-w-0 w-full">
              {/* Capa */}
              <div
                className="
                  max-w-sm
                  mx-auto
                  lg:max-w-none
                  bg-[#58d0e0]
                  border-4
                  border-[#3b2a1f]
                  shadow-[6px_6px_0px_#3b2a1f]
                  sm:shadow-[8px_8px_0px_#3b2a1f]
                  p-3
                  mb-6
                "
              >
                {game.coverUrl ? (
                  <Image
                    src={game.coverUrl}
                    alt={`Capa de ${game.name}`}
                    width={300}
                    height={400}
                  />
                ) : (
                  <div
                    className="
                      w-full
                      aspect-[3/4]
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-3
                      bg-[#c8c5dd]
                      border-4
                      border-[#3b2a1f]
                      p-4
                      text-center
                    "
                  >
                    <span className="text-5xl">🎮</span>

                    <span className="font-black uppercase text-[#3b2a1f]">
                      Capa indisponível
                    </span>
                  </div>
                )}
              </div>

              {/* Botões */}
              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-1
                  gap-4
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setShowForm(
                      (current) => !current
                    )
                  }
                  className="
                    w-full
                    bg-[#5a54f2]
                    border-4
                    border-[#3b2a1f]
                    text-white
                    font-black
                    uppercase
                    px-4
                    py-4
                    shadow-[5px_5px_0px_#3b2a1f]
                    hover:translate-x-[3px]
                    hover:translate-y-[3px]
                    hover:shadow-[2px_2px_0px_#3b2a1f]
                    transition-all
                    duration-150
                  "
                >
                  {showForm
                    ? "✕ Fechar edição"
                    : "✏️ Editar jogo"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleRemove(selectedGame.id)
                  }
                  className="
                    w-full
                    bg-[#ff6464]
                    border-4
                    border-[#3b2a1f]
                    text-white
                    font-black
                    uppercase
                    px-4
                    py-4
                    shadow-[5px_5px_0px_#3b2a1f]
                    hover:translate-x-[3px]
                    hover:translate-y-[3px]
                    hover:shadow-[2px_2px_0px_#3b2a1f]
                    transition-all
                    duration-150
                  "
                >
                  🗑 Remover jogo
                </button>
              </div>
            </div>

            {/* Lado direito */}
            <div
              className="
                min-w-0
                w-full
                flex
                flex-col
                gap-6
              "
            >
              {/* Título */}
              <div
                className="
                  min-w-0
                  w-full
                  bg-[#5a54f2]
                  border-4
                  border-[#3b2a1f]
                  shadow-[6px_6px_0px_#3b2a1f]
                  sm:shadow-[8px_8px_0px_#3b2a1f]
                  p-4
                  sm:p-6
                  overflow-hidden
                "
              >
                <h1
                  className="
                    max-w-full
                    break-words
                    [overflow-wrap:anywhere]
                    text-3xl
                    sm:text-4xl
                    xl:text-5xl
                    font-black
                    uppercase
                    text-white
                    leading-tight
                  "
                >
                  {game.name}
                </h1>
              </div>

              {/* Stats */}
              <div
                className="
                  min-w-0
                  flex
                  flex-col
                  sm:flex-row
                  sm:flex-wrap
                  gap-3
                  sm:gap-4
                "
              >
                {selectedGame.status && (
                  <div
                    className="
                      min-w-0
                      bg-[#58d0e0]
                      border-4
                      border-[#3b2a1f]
                      px-4
                      py-3
                      font-black
                      text-[#3b2a1f]
                      shadow-[4px_4px_0px_#3b2a1f]
                      break-words
                    "
                  >
                    🎮{" "}
                    {STATUS_LABELS[
                      selectedGame.status
                    ] || selectedGame.status}
                  </div>
                )}

                {selectedGame.rating !== null &&
                  selectedGame.rating !==
                    undefined && (
                    <div
                      className="
                        bg-[#f4ef45]
                        border-4
                        border-[#3b2a1f]
                        px-4
                        py-3
                        font-black
                        text-[#3b2a1f]
                        shadow-[4px_4px_0px_#3b2a1f]
                      "
                    >
                      ⭐ {selectedGame.rating}/10
                    </div>
                  )}

                {selectedGame.time_played !== null &&
                  selectedGame.time_played !==
                    undefined && (
                    <div
                      className="
                        bg-[#ff6464]
                        border-4
                        border-[#3b2a1f]
                        px-4
                        py-3
                        font-black
                        text-white
                        shadow-[4px_4px_0px_#3b2a1f]
                      "
                    >
                      ⏱ {selectedGame.time_played}h
                    </div>
                  )}
              </div>

              {/* Descrição */}
              <section
                className="
                  min-w-0
                  w-full
                  max-w-full
                  bg-[#58d0e0]
                  border-4
                  border-[#3b2a1f]
                  shadow-[6px_6px_0px_#3b2a1f]
                  sm:shadow-[8px_8px_0px_#3b2a1f]
                  p-4
                  sm:p-6
                  overflow-hidden
                "
              >
                <h2
                  className="
                    text-xl
                    sm:text-2xl
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
                    block
                    min-w-0
                    max-w-full
                    whitespace-pre-wrap
                    break-words
                    [overflow-wrap:anywhere]
                    text-[#3b2a1f]
                    font-bold
                    leading-relaxed
                    text-base
                    sm:text-lg
                  "
                >
                  {summary}
                </p>
              </section>
            </div>
          </div>

          {/* Formulário */}
          {showForm && (
            <div className="min-w-0 mt-8 sm:mt-10">
              <ShelfUpdateForm
                game={selectedGame}
                onClose={() =>
                  setShowForm(false)
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}