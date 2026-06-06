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
    <form
      onSubmit={handleSubmit}
      className="
        w-full
        max-w-xl
        bg-[#ff77d9]
        border-4
        border-[#3b2a1f]
        shadow-[12px_12px_0px_#3b2a1f]
        overflow-hidden
      "
    >

      {/* Barra retrô */}
      <div
        className="
          bg-[#f4ef45]
          border-b-4
          border-[#3b2a1f]
          px-4
          py-3
          flex
          items-center
          gap-3
        "
      >
        <div className="w-5 h-5 bg-[#58d0e0] border-2 border-[#3b2a1f]" />
        <div className="w-5 h-5 bg-[#ff6464] border-2 border-[#3b2a1f]" />
        <div className="w-5 h-5 bg-[#5a54f2] border-2 border-[#3b2a1f]" />

        <span className="font-black text-[#3b2a1f] uppercase">
          {variant === "login" ? "Login.exe" : "Register.exe"}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="p-8">

        {/* Título */}
        <div
          className="
            bg-[#5a54f2]
            border-4
            border-[#3b2a1f]
            shadow-[8px_8px_0px_#3b2a1f]
            p-6
            mb-8
            text-center
          "
        >
          <h1
            className="
              text-4xl
              font-black
              uppercase
              text-white
            "
          >
            {variant === "login"
              ? "Entrar"
              : "Criar Conta"}
          </h1>
        </div>

        {/* Campos */}
        <div className="flex flex-col gap-6">

          {variant === "login" ? (
            <>
              <input
                placeholder="Email ou nome de usuário"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                autoComplete="username"

                className="
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
            </>
          ) : (
            <>
              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"

                className="
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
                "
              />

              <input
                placeholder="Nome de usuário"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"

                className="
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
                "
              />
            </>
          )}

          {/* Senha */}
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete={
              variant === "login"
                ? "current-password"
                : "new-password"
            }

            className="
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
              mt-4
              bg-[#f4ef45]
              border-4
              border-[#3b2a1f]
              px-6
              py-5
              text-[#3b2a1f]
              font-black
              uppercase
              text-2xl
              shadow-[8px_8px_0px_#3b2a1f]

              hover:translate-x-[4px]
              hover:translate-y-[4px]
              hover:shadow-[4px_4px_0px_#3b2a1f]

              active:translate-x-[8px]
              active:translate-y-[8px]
              active:shadow-none

              transition-all
              duration-150
            "
          >
            {buttonText}
          </button>

        </div>

      </div>
    </form>
  )
}