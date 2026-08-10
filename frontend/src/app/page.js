"use client"

import { useRouter } from "next/navigation"
import "./globals.css";
import { useEffect } from "react"
import { BACKEND_API } from "@/config/api"
import { checkBackendHealth } from "@/services/healthService"

export default function HomePage() {

  const router = useRouter()

  useEffect(() => {
      const controller = new AbortController()
      checkBackendHealth({
        signal: controller.signal,
        }).catch((error) => {
        if (error.name !== "AbortError") {
          console.log(
          "Backend sendo inicializado:",
          error.message
          )
        }
      })
      return () => {
        controller.abort()
      }
    }, [])

  return (
    <html>
      <body>
        <div
          className="
            min-h-screen
            bg-[#c8c5dd]
            flex
            items-center
            justify-center
            p-6
          "
        >

          {/* Janela principal */}
          <div
            className="
              w-full
              max-w-4xl
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
                GameShelf.exe
              </span>
            </div>

            {/* Conteúdo */}
            <div className="p-10 text-center">

              {/* Logo/Título */}
              <div
                className="
                  bg-[#5a54f2]
                  border-4
                  border-[#3b2a1f]
                  shadow-[8px_8px_0px_#3b2a1f]
                  p-8
                  mb-8
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
                  GAME
                  <br />
                  SHELF
                </h1>
              </div>

              {/* Slogan */}
              <div
                className="
                  bg-[#58d0e0]
                  border-4
                  border-[#3b2a1f]
                  shadow-[8px_8px_0px_#3b2a1f]
                  p-6
                  mb-10
                  max-w-2xl
                  mx-auto
                "
              >
                <p
                  className="
                    text-2xl
                    md:text-3xl
                    font-black
                    text-[#3b2a1f]
                    uppercase
                    leading-snug
                  "
                >
                  Seu organizador de jogos
                </p>

                <p
                  className="
                    mt-4
                    text-[#3b2a1f]
                    font-bold
                    text-lg
                  "
                >
                  Organize sua coleção, acompanhe seu progresso
                  e monte sua shelf gamer.
                </p>
              </div>

              {/* Botões */}
              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  gap-6
                  justify-center
                "
              >

                {/* Login */}
                <button
                  onClick={() => router.push("/login")}
                  className="
                    bg-[#f4ef45]
                    border-4
                    border-[#3b2a1f]
                    px-10
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
                  🔑 Login
                </button>

                {/* Cadastro */}
                <button
                  onClick={() => router.push("/register")}
                  className="
                    bg-[#5a54f2]
                    border-4
                    border-[#3b2a1f]
                    px-10
                    py-5
                    text-white
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
                  ✨ Criar Conta
                </button>

              </div>

            </div>
          </div>
        </div>
      </body>
    </html>
  )
}