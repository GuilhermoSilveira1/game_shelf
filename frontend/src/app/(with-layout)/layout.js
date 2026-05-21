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

        <div className="flex h-screen p-6 gap-6">

          {/* Sidebar */}
          <aside
            className="
              w-72
              bg-[#58d0e0]
              border-4
              border-[#3b2a1f]
              shadow-[10px_10px_0px_#3b2a1f]
              flex
              flex-col
              p-6
            "
          >

            {/* Logo */}
            <div
              className="
                bg-[#f57edb]
                border-4
                border-[#3b2a1f]
                p-4
                mb-8
                shadow-[6px_6px_0px_#3b2a1f]
              "
            >
              <h1
                className="
                  text-3xl
                  font-black
                  text-[#3b2a1f]
                  uppercase
                  tracking-wide
                "
              >
                🎮 Game Shelf
              </h1>

              <p className="text-[#3b2a1f] font-bold mt-2 text-sm">
                Sua coleção gamer retrô
              </p>
            </div>

            {/* Navegação */}
            <nav className="flex flex-col gap-4">

              <Link
                href="/search"
                className="
                  bg-[#f4ef45]
                  border-4
                  border-[#3b2a1f]
                  text-[#3b2a1f]
                  font-black
                  uppercase
                  px-4
                  py-3
                  shadow-[6px_6px_0px_#3b2a1f]
                  transition-all
                  duration-150
                  hover:translate-x-[3px]
                  hover:translate-y-[3px]
                  hover:shadow-[3px_3px_0px_#3b2a1f]
                "
              >
                🔎 Pesquisar
              </Link>

              <Link
                href="/shelf"
                className="
                  bg-[#5a54f2]
                  border-4
                  border-[#3b2a1f]
                  text-white
                  font-black
                  uppercase
                  px-4
                  py-3
                  shadow-[6px_6px_0px_#3b2a1f]
                  transition-all
                  duration-150
                  hover:translate-x-[3px]
                  hover:translate-y-[3px]
                  hover:shadow-[3px_3px_0px_#3b2a1f]
                "
              >
                📚 Prateleira
              </Link>

              <Link
                href="/logout"
                className="
                  mt-10
                  bg-[#ff6464]
                  border-4
                  border-[#3b2a1f]
                  text-white
                  font-black
                  uppercase
                  px-4
                  py-3
                  shadow-[6px_6px_0px_#3b2a1f]
                  transition-all
                  duration-150
                  hover:translate-x-[3px]
                  hover:translate-y-[3px]
                  hover:shadow-[3px_3px_0px_#3b2a1f]
                "
              >
                🚪 Logout
              </Link>

            </nav>

            {/* Footer retrô */}
            <div
              className="
                mt-auto
                bg-[#f57edb]
                border-4
                border-[#3b2a1f]
                p-3
                text-[#3b2a1f]
                font-black
                text-center
                shadow-[6px_6px_0px_#3b2a1f]
              "
            >
              LEVEL UP!
            </div>

          </aside>

          {/* Conteúdo principal */}
          <main
            className="
              flex-1
              bg-[#ff77d9]
              border-4
              border-[#3b2a1f]
              shadow-[10px_10px_0px_#3b2a1f]
              overflow-y-auto
              p-8
            "
          >

            {/* Barra estilo janela */}
            <div
              className="
                bg-[#f4ef45]
                border-4
                border-[#3b2a1f]
                px-4
                py-3
                flex
                items-center
                gap-3
                mb-8
              "
            >
              <div className="w-5 h-5 bg-[#58d0e0] border-2 border-[#3b2a1f]" />
              <div className="w-5 h-5 bg-[#ff6464] border-2 border-[#3b2a1f]" />
              <div className="w-5 h-5 bg-[#5a54f2] border-2 border-[#3b2a1f]" />

              <span className="font-black text-[#3b2a1f] uppercase ml-2">
                Game Shelf OS
              </span>
            </div>

            {children}

          </main>

        </div>
      </body>
    </html>
  );
}