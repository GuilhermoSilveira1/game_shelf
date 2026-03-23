"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import GameCard from "@/components/GameCard"

const API = "http://localhost:5000"

export default function ShelfPage() {
  const router = useRouter()
  const [games, setGames] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
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
      // assumindo que backend retorna { items: [...] }
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

  function handleSearch(e) {
    e.preventDefault()
    fetchShelf()
  }

  useEffect(() => {
    fetchShelf()
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <h1>Minha Shelf</h1>

      {loading && <p>Carregando...</p>}

      {!loading && games.length === 0 && (
        <p>Você ainda não possui jogos na shelf.</p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16
        }}
      >
        {games.map(item => (
          <GameCard
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