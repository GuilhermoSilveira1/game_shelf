import { useRouter } from "next/navigation"

export default function GameSearchCard({ game }) {
  const router = useRouter()

  function handleClick() {
    router.push(`/search/${game.id}`)
  }

  return (
    <div
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
    w-[220px]
  "
  onClick={handleClick}
>

  {/* Barra estilo janela retrô */}
  <div
      className="
        bg-[#f4ef45]
        border-b-4
        border-[#3b2a1f]
        px-3
        py-2
        flex
        items-center
        gap-2
      "
    >
      <div className="w-4 h-4 bg-[#58d0e0] border-2 border-[#3b2a1f]" />
      <div className="w-4 h-4 bg-[#ff6464] border-2 border-[#3b2a1f]" />
      <div className="w-4 h-4 bg-[#5a54f2] border-2 border-[#3b2a1f]" />
    </div>

    {/* Imagem */}
    <div className="p-3">
      <div
        className="
          border-4
          border-[#3b2a1f]
          overflow-hidden
          bg-[#58d0e0]
        "
      >
        <img
          src={game.coverUrl}
          alt={game.name}
          className="
            w-full
            h-[280px]
            object-cover
          "
        />
      </div>

      {/* Nome */}
      <p
        className="
          mt-4
          text-[#3b2a1f]
          font-black
          text-lg
          leading-tight
        "
      >
        {game.name}
      </p>
    </div>
  </div>
  )
}