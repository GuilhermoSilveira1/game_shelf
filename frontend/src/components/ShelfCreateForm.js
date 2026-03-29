"use client"
import { useState } from "react"
import { addToShelf } from "@/services/shelfService"
import { useRouter } from "next/navigation"

export default function ShelfCreateForm({ game }) {
  const router = useRouter()

  const [status, setStatus] = useState("WANT_TO_PLAY")
  const [description, setDescription] = useState("")
  const [plataform, setPlataform] = useState("")
  const [rating, setRating] = useState("")
  const [timePlayed, setTimePlayed] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await addToShelf({
        gameId: game.gameId,
        status,
        description,
        plataform,
        rating: rating ? Number(rating) : null,
        time_played: timePlayed ? Number(timePlayed) : null,
      })
      
      router.push("/shelf")
    } catch (err) {
      console.error(err)
      alert("Erro ao salvar jogo")
    }
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

      <button type="submit">Adicionar</button>
    </form>
  )
}