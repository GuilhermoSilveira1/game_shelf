"use client"
import { useState } from "react"
import { updateShelf} from "@/services/shelfService"
import { useRouter } from "next/navigation"

export default function ShelfUpdateForm({ game }) {
  const router = useRouter()

  // Dados da shelf
  const [status, setStatus] = useState(game?.status || "WANT_TO_PLAY")
  const [description, setDescription] = useState(game?.description || "")
  const [plataform, setPlataform] = useState(game?.plataform || "")
  const [rating, setRating] = useState(game?.rating || "")
  const [timePlayed, setTimePlayed] = useState(game?.time_played || "")

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      if (game) {
        await updateShelf(game.gameId, {
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
    <form
      onSubmit={handleSubmit}
      className="
        mt-8
        bg-[#58d0e0]
        border-4
        border-[#3b2a1f]
        shadow-[10px_10px_0px_#3b2a1f]
        overflow-hidden
      "
    >

      {/* Header */}
      <div
        className="
          bg-[#5a54f2]
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
        <div className="w-5 h-5 bg-[#f4ef45] border-2 border-[#3b2a1f]" />

        <span className="font-black text-white uppercase">
          EditSaveData.exe
        </span>
      </div>

      {/* Conteúdo */}
      <div className="p-8 flex flex-col gap-6">

        {/* Status */}
        <div>

          <label
            className="
              block
              mb-2
              text-[#3b2a1f]
              font-black
              uppercase
              text-lg
            "
          >
            🎮 Status atual
          </label>

          <select
            value={status}
            onChange={e => setStatus(e.target.value)}

            className="
              w-full
              bg-[#ff77d9]
              border-4
              border-[#3b2a1f]
              px-4
              py-4
              text-[#3b2a1f]
              font-black
              outline-none
              shadow-[6px_6px_0px_#3b2a1f]

              focus:translate-x-[2px]
              focus:translate-y-[2px]
              focus:shadow-[3px_3px_0px_#3b2a1f]

              transition-all
              duration-150
            "
          >
            <option value="WANT_TO_PLAY">
              Quero jogar
            </option>

            <option value="PLAYING">
              Jogando
            </option>

            <option value="COMPLETED">
              Finalizado
            </option>

            <option value="DROPPED">
              Abandonei
            </option>
          </select>

        </div>

        {/* Descrição */}
        <div>

          <label
            className="
              block
              mb-2
              text-[#3b2a1f]
              font-black
              uppercase
              text-lg
            "
          >
            📝 Notas do jogador
          </label>

          <textarea
            placeholder="Escreva suas observações..."
            value={description}
            onChange={e => setDescription(e.target.value)}

            className="
              w-full
              min-h-[160px]
              bg-[#ff77d9]
              border-4
              border-[#3b2a1f]
              px-4
              py-4
              text-[#3b2a1f]
              font-bold
              outline-none
              resize-none
              shadow-[6px_6px_0px_#3b2a1f]

              placeholder:text-[#3b2a1f]
              placeholder:opacity-70

              focus:translate-x-[2px]
              focus:translate-y-[2px]
              focus:shadow-[3px_3px_0px_#3b2a1f]

              transition-all
              duration-150
            "
          />

        </div>

        {/* Infos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Plataforma */}
          <div>

            <label
              className="
                block
                mb-2
                text-[#3b2a1f]
                font-black
                uppercase
                text-lg
              "
            >
              🕹 Plataforma
            </label>

            <input
              placeholder="PC, PS2, Switch..."
              value={plataform}
              onChange={e => setPlataform(e.target.value)}

              className="
                w-full
                bg-[#58d0e0]
                border-4
                border-[#3b2a1f]
                px-4
                py-4
                text-[#3b2a1f]
                font-black
                outline-none
                shadow-[6px_6px_0px_#3b2a1f]

                placeholder:text-[#3b2a1f]
                placeholder:opacity-70
              "
            />

          </div>

          {/* Nota */}
          <div>

            <label
              className="
                block
                mb-2
                text-[#3b2a1f]
                font-black
                uppercase
                text-lg
              "
            >
              ⭐ Nota
            </label>

            <input
              placeholder="0-10"
              type="number"
              value={rating}
              onChange={e => setRating(e.target.value)}

              className="
                w-full
                bg-[#f4ef45]
                border-4
                border-[#3b2a1f]
                px-4
                py-4
                text-[#3b2a1f]
                font-black
                outline-none
                shadow-[6px_6px_0px_#3b2a1f]
              "
            />

          </div>

          {/* Horas */}
          <div>

            <label
              className="
                block
                mb-2
                text-[#3b2a1f]
                font-black
                uppercase
                text-lg
              "
            >
              ⏱ Tempo jogado
            </label>

            <input
              placeholder="Horas"
              type="number"
              value={timePlayed}
              onChange={e => setTimePlayed(e.target.value)}

              className="
                w-full
                bg-[#ff6464]
                border-4
                border-[#3b2a1f]
                px-4
                py-4
                text-white
                font-black
                outline-none
                shadow-[6px_6px_0px_#3b2a1f]

                placeholder:text-white
                placeholder:opacity-70
              "
            />

          </div>

        </div>

        {/* Botão */}
        <button
          className="
            mt-4
            bg-[#5a54f2]
            border-4
            border-[#3b2a1f]
            px-6
            py-5
            text-white
            font-black
            uppercase
            text-2xl
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
          💾 Salvar progresso
        </button>

      </div>
    </form>
  )
}