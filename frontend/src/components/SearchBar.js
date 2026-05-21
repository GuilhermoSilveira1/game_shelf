"use client"
import { useState } from "react"

export default function SearchBar({ onSubmit, buttonText }) {
  const [gameName, setGameName] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({ gameName })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex
        flex-col
        md:flex-row
        gap-4
        items-stretch
      "
    >

      {/* Input */}
      <input
        placeholder="Pesquise o nome do jogo"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
        className="
          flex-1
          bg-[#58d0e0]
          border-4
          border-[#3b2a1f]
          px-5
          py-4
          text-[#3b2a1f]
          font-black
          text-lg
          outline-none
          shadow-[6px_6px_0px_#3b2a1f]

          placeholder:text-[#3b2a1f]
          placeholder:opacity-70

          focus:translate-x-[2px]
          focus:translate-y-[2px]
          focus:shadow-[3px_3px_0px_#3b2a1f]

          transition-all
          duration-150
        "
      />

      {/* Botão */}
      <button
        type="submit"
        className="
          bg-[#f4ef45]
          border-4
          border-[#3b2a1f]
          px-8
          py-4
          text-[#3b2a1f]
          font-black
          uppercase
          text-lg
          shadow-[6px_6px_0px_#3b2a1f]

          hover:translate-x-[3px]
          hover:translate-y-[3px]
          hover:shadow-[3px_3px_0px_#3b2a1f]

          active:translate-x-[6px]
          active:translate-y-[6px]
          active:shadow-none

          transition-all
          duration-150
        "
      >
        🔎 {buttonText}
      </button>

    </form>
  )
}