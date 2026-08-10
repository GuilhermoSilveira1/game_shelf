"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import "../../globals.css"

export default function LogoutPage() {

  const router = useRouter()

  useEffect(() => {

    function logout() {
      try {

        // futuramente:
        // remover token
        // limpar cookies
        // limpar session storage

        setTimeout(() => {
          router.push("/login")
        }, 2500)

      } catch (err) {
        alert("Falha no logout")
      }
    }

    logout()

  }, [router])

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

          {/* Janela */}
          <div
            className="
              w-full
              max-w-2xl
              bg-[#ff77d9]
              border-4
              border-[#3b2a1f]
              shadow-[12px_12px_0px_#3b2a1f]
              overflow-hidden
              text-center
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
                Logout.exe
              </span>
            </div>

            {/* Conteúdo */}
            <div className="p-10">

              {/* Ícone */}
              <div
                className="
                  inline-block
                  bg-[#5a54f2]
                  border-4
                  border-[#3b2a1f]
                  shadow-[8px_8px_0px_#3b2a1f]
                  px-8
                  py-6
                  mb-8
                "
              >
                <span className="text-6xl">
                  👋
                </span>
              </div>

              {/* Texto */}
              <h1
                className="
                  text-4xl
                  font-black
                  uppercase
                  text-[#3b2a1f]
                  mb-4
                "
              >
                Logout realizado!
              </h1>

              <p
                className="
                  text-[#3b2a1f]
                  font-bold
                  text-xl
                  mb-8
                "
              >
                Redirecionando para tela de login...
              </p>

              {/* Barra fake loading */}
              <div
                className="
                  w-full
                  h-8
                  bg-white
                  border-4
                  border-[#3b2a1f]
                  overflow-hidden
                "
              >
                <div
                  className="
                    h-full
                    w-2/3
                    bg-[#58d0e0]
                    border-r-4
                    border-[#3b2a1f]
                    animate-pulse
                  "
                />
              </div>

              {/* Texto extra */}
              <p
                className="
                  mt-6
                  text-[#3b2a1f]
                  font-black
                  uppercase
                "
              >
                Save completed ✔
              </p>

            </div>
          </div>
        </div>
      </body>
    </html>
  )
}