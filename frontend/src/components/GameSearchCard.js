"use client"

import { useRouter } from "next/navigation"

export default function GameSearchCard({ game }) {
  const router = useRouter()

  function handleClick() {
    router.push(`/search/${game.id}`)
  }

  const coverUrl = game.coverUrl

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
        h-full
        min-w-0
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
      {/* Header retrô */}
      <div
        className="
          bg-[#f4ef45]
          border-b-4
          border-[#3b2a1f]
          px-3
          py-2
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <span
          className="
            truncate
            font-black
            uppercase
            text-xs
            text-[#3b2a1f]
          "
        >
          Game Search
        </span>

        <div className="flex gap-2 shrink-0">
          <div className="w-4 h-4 bg-[#58d0e0] border-2 border-[#3b2a1f]" />
          <div className="w-4 h-4 bg-[#ff6464] border-2 border-[#3b2a1f]" />
          <div className="w-4 h-4 bg-[#5a54f2] border-2 border-[#3b2a1f]" />
        </div>
      </div>

      {/* Conteúdo */}
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
          {coverUrl ? (
            {coverUrl}
          ) : (
            <div
              className="
                w-full
                h-full
                flex
                flex-col
                items-center
                justify-center
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
        </div>

        <h2
          className="
            mt-4
            min-w-0
            break-words
            text-lg
            font-black
            text-[#3b2a1f]
            leading-tight
          "
        >
          {game.name}
        </h2>

        {(game.releaseDate || game.genre) && (
          <div
            className="
              mt-3
              flex
              flex-wrap
              gap-2
              text-xs
              font-bold
              text-[#3b2a1f]
            "
          >
            {game.releaseDate && (
              <span
                className="
                  bg-white
                  border-2
                  border-[#3b2a1f]
                  px-2
                  py-1
                "
              >
                📅 {game.releaseDate}
              </span>
            )}

            {game.genre && (
              <span
                className="
                  bg-[#58d0e0]
                  border-2
                  border-[#3b2a1f]
                  px-2
                  py-1
                "
              >
                🎮 {game.genre}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  )
}