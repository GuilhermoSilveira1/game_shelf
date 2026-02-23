"use client"
import { useState } from "react"

export default function SearchBar({ onSubmit }) {
  const [gameName, setgameName] = useState("")

    function handleSubmit(e) {
    e.preventDefault()

    onSubmit({ gameName })
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <input
            placeholder="Pesquise o nome do jogo"
            value={gameName}
            onChange={e => setgameName(e.target.value)}
            />
            <button type="submit">{buttonText}</button>
        </form>
    </>
  )
}