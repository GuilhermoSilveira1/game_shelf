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

  async function fetchShelf(name = "") {
    try {
      setLoading(true)

      const params = new URLSearchParams()
      if (name) params.append("name", name)

      const res = await fetch(`${API}/shelf?${params.toString()}`, {
        method: "GET",
        credentials: "include"
      })

      if (!res.ok) throw new Error()

      const data = await res.json()

      // assumindo que backend retorna { items: [...] }
      setGames(data.items || data)
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
    fetchShelf(searchTerm)
  }

  useEffect(() => {
    fetchShelf()
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <h1>Minha Shelf</h1>

      {/* Barra de pesquisa */}
      <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Buscar jogo na shelf..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: 8, width: 250 }}
        />
        <button type="submit" style={{ marginLeft: 8 }}>
          Buscar
        </button>
      </form>

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
        {games.map(game => (
          <GameCard
            key={game.id}
            game={{
              id: game.id,
              name: game.name,
              coverUrl: game.coverUrl
            }}
            shelf={game}
            onClick={() => router.push(`/shelf/${game.id}`)}
            onRemove={() => handleRemove(game.id)}
          />
        ))}
      </div>
    </div>
  )
}