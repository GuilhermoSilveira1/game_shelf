"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import GameShelfCard from "@/components/GameShelfCard"
import {
  deleteFromShelf,
  getShelf,
} from "@/services/shelfService"

export default function ShelfPage() {
  const router = useRouter()

  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchShelf = useCallback(async () => {
    try {
      setLoading(true)

      const data = await getShelf()

      console.log("Shelf data:", data)

      setGames(
        Array.isArray(data)
          ? data
          : data?.items ?? []
      )
    } catch (err) {
      console.error("Erro ao carregar shelf:", err)

      alert(
        err.message ||
          "Erro ao carregar shelf"
      )
    } finally {
      setLoading(false)
    }
  }, [])

  async function handleRemove(gameId) {
    try {
      await deleteFromShelf(gameId)

      // Remove da interface sem precisar consultar a API novamente.
      setGames((currentGames) =>
        currentGames.filter(
          (item) => item.game.id !== gameId
        )
      )
    } catch (err) {
      console.error("Erro ao remover jogo:", err)

      alert(
        err.message ||
          "Erro ao remover jogo"
      )
    }
  }

  useEffect(() => {
    fetchShelf()
  }, [fetchShelf])

  return (
    <div className="
      min-w-0
      w-full
      p-4
      sm:p-6
      lg:p-8
      ">
      {/* Header */}
      <div
        className="
          bg-[#5a54f2]
          border-4
          border-[#3b2a1f]
          shadow-[8px_8px_0px_#3b2a1f]
          p-6
          mb-8
        "
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1
              className="
                break-words
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-black
                uppercase
                text-white
                leading-none
              "
            >
              📚 Minha Shelf
            </h1>

            <p
              className="
                text-white
                font-bold
                mt-3
                text-lg
              "
            >
              Sua coleção gamer retrô
            </p>
          </div>

          {/* Stats */}
          <div
            className="
              bg-[#f4ef45]
              border-4
              border-[#3b2a1f]
              px-5
              py-4
              text-[#3b2a1f]
              font-black
              shadow-[6px_6px_0px_#3b2a1f]
            "
          >
            🎮 {games.length} jogos
          </div>
        </div>
      </div>

      {/* Estado loading */}
      {loading && (
        <div
          className="
            bg-[#58d0e0]
            border-4
            border-[#3b2a1f]
            shadow-[8px_8px_0px_#3b2a1f]
            p-6
            inline-block
          "
        >
          <p className="font-black text-[#3b2a1f] text-xl">
            ⏳ Carregando coleção...
          </p>
        </div>
      )}

      {/* Empty state */}
      {!loading && games.length === 0 && (
        <div
          className="
            bg-[#ff6464]
            border-4
            border-[#3b2a1f]
            shadow-[8px_8px_0px_#3b2a1f]
            p-8
            max-w-xl
          "
        >
          <h2
            className="
              text-3xl
              font-black
              uppercase
              text-white
              mb-4
            "
          >
            Shelf vazia!
          </h2>

          <p className="text-white font-bold text-lg">
            Adicione jogos para começar sua coleção.
          </p>
        </div>
      )}

      {/* Grid */}
      {!loading && games.length > 0 && (
        <div
        className="
            min-w-0
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-6
            lg:gap-8
            mt-8
          "
        >
          {games.map((item) => {
            const gameId = item.game.id

            return (
              <GameShelfCard
                key={item.id ?? gameId}
                game={item.game}
                shelf={item}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}