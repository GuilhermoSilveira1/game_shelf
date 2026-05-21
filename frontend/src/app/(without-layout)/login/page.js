"use client"
import FormAuth from "@/components/FormAuth"
import { login } from "@/services/authService"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  async function handleLogin(data) {
    try {
      await login(data)
      router.push("/shelf")
    } catch (err) {
      alert("Falha no login")
    }
  }

  return (
    <div
      className="
        min-h-screen
        bg-[#c8c5dd]
        flex
        items-center
        justify-center
        p-6
        overflow-hidden
      "
    >

      {/* Decorações de fundo */}
      <div
        className="
          absolute
          top-10
          left-10
          w-32
          h-32
          bg-[#58d0e0]
          border-4
          border-[#3b2a1f]
          rotate-12
        "
      />

      <div
        className="
          absolute
          bottom-16
          right-16
          w-40
          h-40
          bg-[#f4ef45]
          border-4
          border-[#3b2a1f]
          -rotate-12
        "
      />

      {/* Conteúdo */}
      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          gap-8
          w-full
        "
      >

        {/* Logo */}
        <div
          className="
            bg-[#5a54f2]
            border-4
            border-[#3b2a1f]
            shadow-[10px_10px_0px_#3b2a1f]
            px-10
            py-8
            text-center
          "
        >
          <h1
            className="
              text-6xl
              md:text-7xl
              font-black
              uppercase
              text-white
              leading-none
            "
          >
            🎮 GAME
            <br />
            SHELF
          </h1>

          <p
            className="
              mt-4
              text-white
              font-bold
              text-lg
              uppercase
            "
          >
            Player Login
          </p>
        </div>

        {/* Formulário */}
        <FormAuth
          variant="login"
          onSubmit={handleLogin}
          buttonText="Entrar"
        />

        {/* Texto extra */}
        <div
          className="
            bg-[#58d0e0]
            border-4
            border-[#3b2a1f]
            shadow-[6px_6px_0px_#3b2a1f]
            px-6
            py-3
          "
        >
          <p
            className="
              text-[#3b2a1f]
              font-black
              uppercase
              text-center
            "
          >
            Continue sua coleção gamer 🚀
          </p>
        </div>

      </div>
    </div>
  )
}