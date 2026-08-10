"use client"

import { useState } from "react"

import GameSearchCard from "@/components/GameSearchCard"
import SearchBar from "@/components/SearchBar"
import { search } from "@/services/searchService"
import "../../globals.css"

export default function SearchPage() {
  const [results, setResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  async function handleSearch({ gameName }) {
    try {
      const response = await search({ gameName })

      const items = Array.isArray(response)
        ? response
        : response?.items ?? []

      setResults(items)
      setHasSearched(true)
    } catch (error) {
      console.error("Erro na pesquisa:", error)
      alert(error.message || "Falha na pesquisa")
    }
  }

  return (
    <html>
      <body>
        <div
          className="
            min-h-screen
            min-w-0
            bg-[#c8c5dd]
            p-4
            sm:p-6
            lg:p-8
          "
        >
          {/* Header */}
          <header
            className="
              min-w-0
              bg-[#58d0e0]
              border-4
              border-[#3b2a1f]
              shadow-[6px_6px_0px_#3b2a1f]
              sm:shadow-[8px_8px_0px_#3b2a1f]
              lg:shadow-[10px_10px_0px_#3b2a1f]
              p-4
              sm:p-6
              mb-8
              sm:mb-10
            "
          >
            <h1
              className="
                break-words
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-black
                text-[#3b2a1f]
                uppercase
                tracking-wide
              "
            >
              Game Shelf
            </h1>

            <p className="text-[#3b2a1f] mt-2 font-bold">
              Organize sua coleção de jogos
            </p>
          </header>

          {/* Busca */}
          <section
            className="
              min-w-0
              bg-[#f57edb]
              border-4
              border-[#3b2a1f]
              shadow-[6px_6px_0px_#3b2a1f]
              sm:shadow-[8px_8px_0px_#3b2a1f]
              lg:shadow-[10px_10px_0px_#3b2a1f]
              p-4
              sm:p-6
              mb-8
              sm:mb-10
            "
          >
            <SearchBar
              onSubmit={handleSearch}
              buttonText="Pesquisar"
            />
          </section>

          {hasSearched && results.length === 0 && (
            <section
              className="
                max-w-xl
                bg-[#ff6464]
                border-4
                border-[#3b2a1f]
                shadow-[6px_6px_0px_#3b2a1f]
                p-5
                sm:p-6
                text-white
              "
            >
              <h2 className="text-2xl font-black uppercase">
                Nenhum jogo encontrado
              </h2>

              <p className="mt-2 font-bold">
                Tente pesquisar usando outro nome.
              </p>
            </section>
          )}

          {/* Jogos */}
          {results.length > 0 && (
            <section
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
                2xl:grid-cols-4
                gap-6
                lg:gap-8
              "
            >
              {results.map((game) => (
                <GameSearchCard
                  key={game.id}
                  game={game}
                />
              ))}
            </section>
          )}
        </div>
      </body>
    </html>
  )
}