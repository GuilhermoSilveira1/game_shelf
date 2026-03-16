"use client"
import { useState } from "react"
import { updateShelf} from "@/services/shelfService"
import { useRouter } from "next/navigation"

export default function ShelfUpdateForm({ data }) {
  const router = useRouter()

  // Dados da shelf
  const [status, setStatus] = useState(data?.status || "WANT_TO_PLAY")
  const [description, setDescription] = useState(data?.description || "")
  const [plataform, setPlataform] = useState(data?.plataform || "")
  const [rating, setRating] = useState(data?.rating || "")
  const [timePlayed, setTimePlayed] = useState(data?.time_played || "")

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      if (data) {
        await updateShelf(data.gameId, {
          status,
          description,
          plataform,
          rating,
          time_played: timePlayed,
        })
      }
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

      <select value={plataform} onChange={e => setPlataform(e.target.value)}>
        <option value="PLAYSTATION">Playstation</option>
        <option value="NINTENDO">Nintendo</option>
        <option value="XBOX">Xbox</option>
        <option value="PC">Pc</option>
      </select>

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