import Link from "next/link";
import "../globals.css";

export const metadata = {
  title: "Game Shelf",
  description: "Organize seus jogos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#c8c5dd] min-h-screen overflow-hidden">

        <div className="relative flex h-screen">

          {/* Decorações de fundo */}
          <div
            className="
              absolute
              bottom-10
              left-10
              w-40
              h-40
              bg-[#f4ef45]
              border-4
              border-[#3b2a1f]
              -rotate-12
            "
          />

          {/* Sidebar */}
          <aside
            className="
              relative
              z-10
              w-72
              bg-[#5a54f2]
              border-r-4
              border-[#3b2a1f]
              flex
              flex-col
              p-4
              gap-4
            "
          >

            {/* Logo */}
            <div
              className="
                bg-[#f4ef45]
                border-4
                border-[#3b2a1f]
                p-4
                text-center
              "
            >
              <h1
                className="
                  text-3xl
                  font-black
                  uppercase
                  text-[#3b2a1f]
                  leading-none
                "
              >
                GAME
                <br />
                SHELF
              </h1>

              <p
                className="
                  mt-2
                  text-xs
                  font-bold
                  uppercase
                  text-[#3b2a1f]
                "
              >
                Sua coleção gamer
              </p>
            </div>

            {/* Navegação */}
            <nav className="flex flex-col gap-4">

              <Link href="/search">
                <button
                  className="
                    w-full

                    bg-[#58d0e0]
                    border-4
                    border-[#3b2a1f]

                    p-3

                    font-black
                    uppercase
                    text-[#3b2a1f]

                    shadow-[4px_4px_0px_#3b2a1f]

                    hover:translate-x-[2px]
                    hover:translate-y-[2px]
                    hover:shadow-[2px_2px_0px_#3b2a1f]

                    transition-all
                  "
                >
                  🔎 Pesquisar
                </button>
              </Link>

              <Link href="/shelf">
                <button
                  className="
                    w-full

                    bg-white
                    border-4
                    border-[#3b2a1f]

                    p-3

                    font-black
                    uppercase
                    text-[#3b2a1f]

                    shadow-[4px_4px_0px_#3b2a1f]

                    hover:translate-x-[2px]
                    hover:translate-y-[2px]
                    hover:shadow-[2px_2px_0px_#3b2a1f]

                    transition-all
                  "
                >
                  📚 Prateleira
                </button>
              </Link>

            </nav>

            {/* Footer */}
            <div className="mt-auto">

              <div
                className="
                  bg-[#58d0e0]
                  border-4
                  border-[#3b2a1f]
                  p-3
                  text-center
                  mb-4
                "
              >
                <p
                  className="
                    text-[#3b2a1f]
                    font-black
                    uppercase
                    text-sm
                  "
                >
                  Level Up! 🚀
                </p>
              </div>

              <button
                className="
                  w-full

                  bg-[#ff6464]
                  border-4
                  border-[#3b2a1f]

                  p-3

                  font-black
                  uppercase
                  text-white

                  shadow-[4px_4px_0px_#3b2a1f]

                  hover:translate-x-[2px]
                  hover:translate-y-[2px]
                  hover:shadow-[2px_2px_0px_#3b2a1f]

                  transition-all
                "
              >
                🚪 Logout
              </button>

            </div>

          </aside>

          {/* Conteúdo principal */}
          <main
            className="
              relative
              z-10
              flex-1
              overflow-y-auto
              p-8
            "
          >
            {children}
          </main>

        </div>

      </body>
    </html>
  );
}