"use client"
import { useState } from "react"

export default function FormAuth({ onSubmit, buttonText, variant = "login" }) {
  const [identifier, setIdentifier] = useState("")   // usado no login
  const [email, setEmail] = useState("")             // usado no register
  const [username, setUsername] = useState("")       // usado no register
  const [password, setPassword] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    if (variant === "login") {
      // envia em um único campo
      onSubmit({ identifier, password })
      return
    }

    // register
    onSubmit({ email, username, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      {variant === "login" ? (
        <>
          <input
            placeholder="Email ou nome de usuário"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            autoComplete="username" // ajuda os gerenciadores de senha
          />
        </>
      ) : (
        <>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            placeholder="Nome de usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
          />
        </>
      )}

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete={variant === "login" ? "current-password" : "new-password"}
      />

      <button type="submit">{buttonText}</button>
    </form>
  )
}