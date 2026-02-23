"use client"
import { useState } from "react"
import { updateShelf, addToShelf } from "@/services/shelfService"
import { useRouter } from "next/navigation"
import { getToken } from "@/utils/storage"

export default function ShelfForm({ data }) {
  const router = useRouter()
  const token = getToken()

  // Dados da shelf
  const [status, setStatus] = useState(data?.status || "WANT_TO_PLAY")
  const [description, setDescription] = useState(data?.description || "")
  const [plataform, setPlataform] = useState(data?.plataform || "")
  const [rating, setRating] = useState(data?.rating || "")
  const [timePlayed, setTimePlayed] = useState(data?.time_played || "")

  async function handleSubmit(e) {
    e.preventDefault()

    if (data?.gameId) {
      await updateShelf(data.gameId, {
        token,
        status,
        description,
        plataform,
        rating,
        time_played: timePlayed,
      })
    } else {
      await addToShelf({
        token,
        gameId: data.id,
        status,
        description,
        plataform,
        rating,
        time_played: timePlayed,
      })
    }

    router.push("/shelf")
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="WANT_TO_PLAY">Quero jogar</option>
        <option value="PLAYING">Jogando</option>
        <option value="COMPLETED">Finalizado</option>
        <option value="DROPPED">Abandonei</option>
      </select>

      <textarea
        placeholder="Descrição"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <input
        placeholder="Plataforma"
        value={plataform}
        onChange={e => setPlataform(e.target.value)}
      />

      <input
        placeholder="Nota (0-10)"
        type="number"
        value={rating}
        onChange={e => setRating(e.target.value)}
      />

      <input
        placeholder="Horas jogadas"
        type="number"
        value={timePlayed}
        onChange={e => setTimePlayed(e.target.value)}
      />

      <button>Salvar</button>
    </form>
  )
}