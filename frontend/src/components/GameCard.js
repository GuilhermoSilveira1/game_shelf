"use client"
import { useRouter } from "next/navigation"

/**
 * Props
 * - game: { id, name, coverUrl }
 * - shelf?: {
 *     gameId, status, description?, plataform?, rating?, time_played?
 *   }
 * - onAdd?: () => void            // usado na tela de busca
 * - onRemove?: () => void         // opcional: remover da shelf
 * - onEdit?: () => void           // opcional: editar sem navegar
 */
export default function GameCard({ game, shelf, onAdd, onRemove, onEdit }) {
  const router = useRouter()

  // Derivados para UI
  const isInShelf = Boolean(shelf)
  const statusLabel = shelf?.status ?? "Não adicionado"
  const ratingLabel = shelf?.rating ? `★ ${shelf.rating}` : null
  const platformLabel = shelf?.plataform || null

  function goToDetails() {
    // Se vier da shelf, navegar para detalhes da shelf
    // Se vier da busca, você pode decidir navegar para /game/[id] ou abrir modal
    router.push(`/shelf/${game.id}`)
  }

  return (
    <div
      className="game-card"
      onClick={goToDetails}
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

        {/* Badge de status (se já estiver na shelf) */}
        {isInShelf && (
          <span
            className="status-badge"
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              background: "#111",
              color: "#fff",
              fontSize: 12,
              padding: "2px 6px",
              borderRadius: 4,
              opacity: 0.9
            }}
          >
            {statusLabel}
          </span>
        )}

        {/* Nota (se houver) */}
        {ratingLabel && (
          <span
            className="rating-badge"
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

      <p style={{ margin: "8px 0 4px", fontWeight: 600 }}>{game.name}</p>

      {/* Plataforma e tempo jogado, se vierem */}
      {platformLabel && (
        <p style={{ margin: 0, fontSize: 12, color: "#666" }}>{platformLabel}</p>
      )}
      {typeof shelf?.time_played === "number" && (
        <p style={{ margin: "2px 0 0", fontSize: 12, color: "#666" }}>
          {shelf.time_played} h
        </p>
      )}

      {/* Ações contextuais */}
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        {!isInShelf && onAdd && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation() // evita disparar o onClick do card
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