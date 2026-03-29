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

        {isInShelf && statusLabel && (
          <span
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              background: "#111",
              color: "#fff",
              fontSize: 12,
              padding: "2px 6px",
              borderRadius: 4
            }}
          >
            {STATUS_LABELS[statusLabel]}
          </span>
        )}

        {ratingLabel && (
          <span
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "#FFD25A",
              color: "#111",
              fontSize: 12,
              padding: "2px 6px",
              borderRadius: 4
            }}
          >
            {ratingLabel}
          </span>
        )}
      </div>

      <p style={{ margin: "8px 0 4px", fontWeight: 600 }}>
        {game.name}
      </p>

      {platformLabel && (
        <p style={{ fontSize: 12, color: "#666" }}>
          {platformLabel}
        </p>
      )}

      {typeof shelf?.time_played === "number" && (
        <p style={{ fontSize: 12, color: "#666" }}>
          {shelf.time_played} h
        </p>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        {!isInShelf && onAdd && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onAdd()
            }}
          >
            Adicionar
          </button>
        )}

        {isInShelf && onEdit && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
            }}
          >
            Editar
          </button>
        )}

        {isInShelf && onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
          >
            Remover
          </button>
        )}
      </div>
    </div>
  )
}