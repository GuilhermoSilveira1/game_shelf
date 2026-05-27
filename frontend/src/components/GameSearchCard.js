import { useRouter } from "next/navigation"

export default function GameSearchCard({ game }) {
  const router = useRouter()

  function handleClick() {
    router.push(`/search/${game.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border-2 border-black bg-[#e5e5e5] hover:bg-[#d4d4d4] transition-all shadow-[4px_4px_0px_black]"
    >
      {/* Header retrô */}
      <div className="bg-[#000080] text-white text-xs px-2 py-1 font-bold flex justify-between items-center">
        <span>Game Search</span>
        <span>🗖 🗙</span>
      </div>

      {/* Conteúdo */}
      <div className="p-3 flex gap-3">
        {/* Capa */}
        <img
          src={game.cover}
          alt={game.name}
          className="w-16 h-20 object-cover border border-black"
        />

        <div className="flex flex-col justify-between">
          {/* Nome */}
          <h3 className="font-bold text-sm">{game.name}</h3>

          {/* Placeholder pra infos futuras */}
          <div className="text-xs text-gray-700">
            {game.releaseDate && <p>📅 {game.releaseDate}</p>}
            {game.genre && <p>🎮 {game.genre}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}