"use client"

import { useRouter } from "next/navigation"

const STATUS_LABELS = {
  WANT_TO_PLAY: "Quero jogar",
  PLAYING: "Jogando",
  COMPLETED: "Finalizado",
  DROPPED: "Abandonei",
}

export default function GameShelfCard({
  game,
  shelf,
}) {
  const router = useRouter()

  const statusLabel = shelf?.status
    ? STATUS_LABELS[shelf.status] ||
      shelf.status
    : null

  const ratingLabel =
    typeof shelf?.rating === "number"
      ? `${shelf.rating}/10`
      : null

  const platform =
    shelf?.plataform ?? shelf?.platform

  function handleClick() {
    router.push(`/shelf/${game.id}`)
  }

  return (
    <article
      onClick={handleClick}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          handleClick()
        }
      }}
      role="button"
      tabIndex={0}
      className="
        cursor-pointer
        min-w-0
        w-full
        h-full
        bg-[#ff77d9]
        border-4
        border-[#3b2a1f]
        shadow-[6px_6px_0px_#3b2a1f]
        sm:shadow-[8px_8px_0px_#3b2a1f]
        transition-all
        duration-150
        hover:translate-x-[4px]
        hover:translate-y-[4px]
        hover:shadow-[3px_3px_0px_#3b2a1f]
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
          py-2
          flex
          gap-2
        "
      >
        <div className="w-4 h-4 bg-[#58d0e0] border-2 border-[#3b2a1f]" />
        <div className="w-4 h-4 bg-[#ff6464] border-2 border-[#3b2a1f]" />
        <div className="w-4 h-4 bg-[#5a54f2] border-2 border-[#3b2a1f]" />
      </div>

      <div className="p-3 sm:p-4">
        <div
          className="
            relative
            w-full
            aspect-[3/4]
            bg-[#c8c5dd]
            border-4
            border-[#3b2a1f]
            overflow-hidden
          "
        >
          {game.coverUrl ? (
            {game.coverUrl}
          ) : (
            <div
              className="
                w-full
                h-full
                flex
                flex-col
                justify-center
                items-center
                gap-3
                p-4
                text-center
                bg-[#58d0e0]
                text-[#3b2a1f]
              "
            >
              <span className="text-4xl">🎮</span>

              <span className="font-black uppercase text-sm">
                Capa indisponível
              </span>
            </div>
          )}

          {statusLabel && (
            <span
              className="
                absolute
                top-2
                left-2
                max-w-[65%]
                bg-[#58d0e0]
                border-2
                border-[#3b2a1f]
                px-2
                py-1
                text-xs
                font-black
                text-[#3b2a1f]
                break-words
              "
            >
              {statusLabel}
            </span>
          )}

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

        <h2
          className="
            mt-4
            min-w-0
            break-words
            [overflow-wrap:anywhere]
            text-lg
            font-black
            text-[#3b2a1f]
            leading-tight
          "
        >
          {game.name}
        </h2>

        <div className="flex flex-wrap gap-2 mt-3">
          {platform && (
            <span
              className="
                max-w-full
                break-words
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
              🎮 Plataforma: {platform}
            </span>
          )}

          {typeof shelf?.time_played ===
            "number" && (
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
    </article>
  )
}