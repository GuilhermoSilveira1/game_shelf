"use client"

import { useBackendHealth } from "@/hooks/useBackendHealth"

export default function BackendInitializer({
  children,
}) {
  const {
    status,
    attempt,
    maxAttempts,
    elapsedSeconds,
    retry,
  } = useBackendHealth()

  console.log("Backend status:", status)

  if (status === "ready") {
    return <> {children} </>
  }

  if (status === "error") {
    return (
      <main
        className="
          min-h-screen
          bg-[#f7e7c6]
          flex
          items-center
          justify-center
          px-5
          py-10
        "
      >
        <section
          className="
            w-full
            max-w-2xl
            bg-[#ff6464]
            border-4
            border-[#3b2a1f]
            shadow-[10px_10px_0px_#3b2a1f]
            p-6
            sm:p-8
          "
        >
          <div
            className="
              bg-white
              border-4
              border-[#3b2a1f]
              w-20
              h-20
              flex
              items-center
              justify-center
              text-4xl
              mb-6
              shadow-[5px_5px_0px_#3b2a1f]
            "
          >
            ⚠️
          </div>

          <h1
            className="
              text-3xl
              sm:text-5xl
              font-black
              uppercase
              text-white
              leading-none
              mb-5
            "
          >
            Não foi possível ligar o servidor
          </h1>

          <p
            className="
              text-white
              font-bold
              text-base
              sm:text-lg
              mb-6
            "
          >
            O servidor gratuito pode estar temporariamente
            indisponível. Aguarde alguns segundos e tente novamente.
          </p>

          <button
            type="button"
            onClick={retry}
            className="
              bg-[#f4ef45]
              text-[#3b2a1f]
              border-4
              border-[#3b2a1f]
              shadow-[6px_6px_0px_#3b2a1f]
              px-6
              py-4
              font-black
              uppercase
              cursor-pointer
              transition-transform
              hover:-translate-y-1
              active:translate-x-1
              active:translate-y-1
              active:shadow-none
            "
          >
            Tentar novamente
          </button>
        </section>
      </main>
    )
  }

  const progress = Math.min(
    (attempt / maxAttempts) * 100,
    100
  )

  return (
    <main
      className="
        min-h-screen
        bg-[#f7e7c6]
        flex
        items-center
        justify-center
        px-5
        py-10
      "
    >
      <section
        className="
          w-full
          max-w-2xl
          bg-[#58d0e0]
          border-4
          border-[#3b2a1f]
          shadow-[10px_10px_0px_#3b2a1f]
          p-6
          sm:p-8
        "
      >
        <div
          className="
            bg-[#f4ef45]
            border-4
            border-[#3b2a1f]
            w-20
            h-20
            flex
            items-center
            justify-center
            text-4xl
            mb-6
            shadow-[5px_5px_0px_#3b2a1f]
            animate-pulse
          "
        >
          🎮
        </div>

        <p
          className="
            inline-block
            bg-[#5a54f2]
            text-white
            border-4
            border-[#3b2a1f]
            px-3
            py-2
            font-black
            uppercase
            text-sm
            mb-5
          "
        >
          Inicialização do sistema
        </p>

        <h1
          className="
            text-3xl
            sm:text-5xl
            font-black
            uppercase
            text-[#3b2a1f]
            leading-none
            mb-5
          "
        >
          Ligando o Game Shelf
        </h1>

        <p
          className="
            text-[#3b2a1f]
            font-bold
            text-base
            sm:text-lg
          "
        >
          O servidor está hospedado em um plano gratuito e pode
          levar alguns segundos para iniciar no primeiro acesso.
        </p>

        <div className="mt-8">
          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-2
              mb-3
              text-[#3b2a1f]
              font-black
            "
          >
            <span>
              Preparando o servidor...
            </span>

            <span>
              {elapsedSeconds}s
            </span>
          </div>

          <div
            className="
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
                bg-[#5a54f2]
                transition-[width]
                duration-500
              "
              style={{
                width: `${Math.max(progress, 5)}%`,
              }}
            />
          </div>

          <p
            className="
              mt-3
              text-[#3b2a1f]
              font-bold
              text-sm
            "
          >
            Verificação {attempt} de {maxAttempts}
          </p>
        </div>

        <div
          className="
            mt-7
            bg-white
            border-4
            border-[#3b2a1f]
            p-4
          "
        >
          <p
            className="
              text-[#3b2a1f]
              font-bold
            "
          >
            Não feche esta página. A aplicação será liberada
            automaticamente quando o servidor responder.
          </p>
        </div>
      </section>
    </main>
  )
}