"use client"
import { useState } from "react"
import GameSearchCard from "@/components/GameSearchCard"
import SearchBar from "@/components/SearchBar"
import ShelfCreateForm from "@/components/ShelfCreateForm"
import { search } from "@/services/searchService"
import { useRouter } from "next/navigation"

export default function SearchPage() {
  const [results, setResults] = useState([])
  const router = useRouter()

  async function handleSearch({ gameName }) {
    try {
      const response = await search({ gameName })
      setResults(response.items)
    } catch {
      alert("Falha na pesquisa")
    }
  }

  return (
    <>
      <div className="min-h-screen bg-[#c8c5dd] p-8">

        {/* Header */}
        <div
          className="
            bg-[#58d0e0]
            border-4
            border-[#3b2a1f]
            shadow-[10px_10px_0px_#3b2a1f]
            p-6
            mb-10
          "
        >
          <h1
            className="
              text-5xl
              font-black
              text-[#3b2a1f]
              uppercase
              tracking-wider
            "
          >
            🎮 Game Shelf
          </h1>

          <p className="text-[#3b2a1f] mt-2 font-bold">
            Organize sua coleção de jogos
          </p>
        </div>

        {/* Search */}
        <div
          className="
            bg-[#f57edb]
            border-4
            border-[#3b2a1f]
            shadow-[10px_10px_0px_#3b2a1f]
            p-6
            mb-10
          "
        >
          <SearchBar
            onSubmit={handleSearch}
            buttonText="Pesquisar"
          />
        </div>

        {/* Jogos */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-8
          "
        >
          {results.map((game) => (
            <div
              key={game.id}
              onClick={() => router.push(`/search/${game.id}`)}
              className="
                cursor-pointer
                bg-[#5a54f2]
                border-4
                border-[#3b2a1f]
                shadow-[10px_10px_0px_#3b2a1f]
                transition-all
                duration-150
                hover:translate-x-[4px]
                hover:translate-y-[4px]
                hover:shadow-[6px_6px_0px_#3b2a1f]
                overflow-hidden
              "
            >
              {/* Barra estilo janela */}
              <div
                className="
                  bg-[#f1ea43]
                  border-b-4
                  border-[#3b2a1f]
                  p-2
                  flex
                  gap-2
                "
              >
                <div className="w-4 h-4 bg-[#f57edb] border-2 border-[#3b2a1f]" />
                <div className="w-4 h-4 bg-[#58d0e0] border-2 border-[#3b2a1f]" />
                <div className="w-4 h-4 bg-[#ff6464] border-2 border-[#3b2a1f]" />
              </div>

              {/* Conteúdo */}
              <div className="p-4">
                <GameSearchCard
                  game={game}
                  onAdd={() => handleAdd(game)}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}