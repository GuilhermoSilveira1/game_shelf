import { useRouter } from "next/navigation"

export default function GameSearchCard({ game, onAdd }) {
  const router = useRouter()

  function handleClick() {
    router.push(`/search/${game.id}`)
  }

  return (
    <div
      className="game-card"
      onClick={handleClick}
      style={{
        cursor: "pointer",
        border: "1px solid #eee",
        borderRadius: 8,
        padding: 12,
        width: 180
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={game.coverUrl}
          alt={game.name}
          style={{ width: "100%", borderRadius: 6 }}
        />
      </div>

      <p style={{ margin: "8px 0 4px", fontWeight: 600 }}>
        {game.name}
      </p>

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onAdd()
            }}
          >
            Adicionar
          </button>
      </div>
    </div>
  )
}