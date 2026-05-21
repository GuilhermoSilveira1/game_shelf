"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import GameShelfCard from "@/components/GameShelfCard"

const API = "http://localhost:5000"

export default function ShelfPage() {
  const router = useRouter()
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(false)

  async function fetchShelf() {
    try {
      setLoading(true)

      const res = await fetch(`${API}/shelf`, {
        method: "GET",
        credentials: "include"
      })

      if (!res.ok) throw new Error()

      const data = await res.json()
      console.log("Shelf data:", data)
      setGames(Array.isArray(data) ? data : data.items || [])
    } catch (err) {
      alert("Erro ao carregar shelf")
    } finally {
      setLoading(false)
    }
  }

  async function handleRemove(gameId) {
    try {
      const res = await fetch(`${API}/shelf/${gameId}`, {
        method: "DELETE",
        credentials: "include"
      })

      if (!res.ok) throw new Error()

      // remove da UI
      setGames(prev => prev.filter(g => g.id !== gameId))
    } catch {
      alert("Erro ao remover jogo")
    }
  }

  useEffect(() => {
    fetchShelf()
  }, [])

  return (
    <div className="p-8">

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
                text-5xl
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
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          xl:grid-cols-4
          gap-8
          mt-8
        "
      >
        {games.map((item) => (
          <GameShelfCard
            key={item.id}
            game={{
              id: item.game.id,
              name: item.game.name,
              coverUrl: item.game.coverUrl
            }}
            shelf={item}
            onClick={() => router.push(`/shelf/${item.id}`)}
            onRemove={() => handleRemove(item.id)}
          />
        ))}
      </div>

    </div>
  )
}