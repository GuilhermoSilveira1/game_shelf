import { useRouter } from "next/navigation"

export default function GameShelfCard({ game, shelf, onAdd, onRemove, onEdit }) {
  const router = useRouter()
  const STATUS_LABELS = {
    WANT_TO_PLAY: "Quero jogar",
    PLAYING: "Jogando",
    COMPLETED: "Finalizado",
    DROPPED: "Abandonei"
  }

  const isInShelf = !!shelf

  const statusLabel = shelf?.status ?? null
  const ratingLabel =
    typeof shelf?.rating === "number" ? `${shelf.rating}/10` : null

  const platformLabel = shelf?.platform
    ? `Plataforma: ${shelf.platform}`
    : null

    function handleClick() {
      router.push(`/shelf/${game.id}`)
    }

  return (
    <div
      onClick={handleClick}
      className="
        cursor-pointer
        bg-[#ff77d9]
        border-4
        border-[#3b2a1f]
        shadow-[8px_8px_0px_#3b2a1f]
        transition-all
        duration-150
        hover:translate-x-[4px]
        hover:translate-y-[4px]
        hover:shadow-[4px_4px_0px_#3b2a1f]
        overflow-hidden
        w-[240px]
      "
    >

      {/* Header retrô */}
      <div
        className="
          bg-[#f4ef45]
          border-b-4
          border-[#3b2a1f]
          px-3
          py-2
          flex
          gap-2
        "
      >
        <div className="w-4 h-4 bg-[#58d0e0] border-2 border-[#3b2a1f]" />
        <div className="w-4 h-4 bg-[#ff6464] border-2 border-[#3b2a1f]" />
        <div className="w-4 h-4 bg-[#5a54f2] border-2 border-[#3b2a1f]" />
      </div>

      <div className="p-3">

        {/* Capa */}
        <div className="relative">

          <img
            src={game.coverUrl}
            alt={game.name}
            className="
              w-full
              h-[300px]
              object-cover
              border-4
              border-[#3b2a1f]
            "
          />

          {/* STATUS */}
          {isInShelf && statusLabel && (
            <span
              className="
                absolute
                top-2
                left-2
                bg-[#58d0e0]
                border-2
                border-[#3b2a1f]
                px-2
                py-1
                text-xs
                font-black
                text-[#3b2a1f]
              "
            >
              {STATUS_LABELS[statusLabel]}
            </span>
          )}

          {/* NOTA */}
          {ratingLabel && (
            <span
              className="
                absolute
                top-2
                right-2
                bg-[#f4ef45]
                border-2
                border-[#3b2a1f]
                px-2
                py-1
                text-xs
                font-black
                text-[#3b2a1f]
              "
            >
              ⭐ {ratingLabel}
            </span>
          )}
        </div>

        {/* Nome */}
        <h2
          className="
            mt-4
            text-lg
            font-black
            text-[#3b2a1f]
            leading-tight
          "
        >
          {game.name}
        </h2>

        {/* Infos */}
        <div className="flex flex-wrap gap-2 mt-3">

          {platformLabel && (
            <span
              className="
                bg-[#5a54f2]
                border-2
                border-[#3b2a1f]
                px-2
                py-1
                text-xs
                font-bold
                text-white
              "
            >
              🎮 {platformLabel}
            </span>
          )}

          {typeof shelf?.time_played === "number" && (
            <span
              className="
                bg-[#ff6464]
                border-2
                border-[#3b2a1f]
                px-2
                py-1
                text-xs
                font-bold
                text-white
              "
            >
              ⏱ {shelf.time_played}h
            </span>
          )}

        </div>
      </div>
    </div>
  )
}