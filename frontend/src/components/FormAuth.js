// Mais tarde vou precisar adicionar mais um campo para username
// Ou apenas colocar uma descrição melhor
"use client"
import { useState } from "react"

export default function FormAuth({ onSubmit, buttonText }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button>{buttonText}</button>
    </form>
  )
}
