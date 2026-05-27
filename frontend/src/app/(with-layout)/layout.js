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
          <aside className="w-48 min-h-screen bg-[#c0c0c0] border-r-2 border-black flex flex-col justify-between p-3">
            
            <div>
              {/* Logo */}
              <div className="mb-6">
                <h2 className="text-lg font-bold">🎮 Game Shelf</h2>
                <p className="text-xs text-gray-700">Sua coleção gamer retrô</p>
              </div>

              {/* Navegação */}
              <nav className="flex flex-col gap-2">
                <Link href="/search">
                  <button className="w-full text-left px-2 py-1 border border-black bg-[#e5e5e5] hover:bg-[#d4d4d4]">
                    🔎 Pesquisar
                  </button>
                </Link>

                <Link href="/shelf">
                  <button className="w-full text-left px-2 py-1 border border-black bg-[#e5e5e5] hover:bg-[#d4d4d4]">
                    📚 Prateleira
                  </button>
                </Link>

                <button className="w-full text-left px-2 py-1 border border-black bg-[#e5e5e5] hover:bg-[#d4d4d4]">
                  🚪 Logout
                </button>
              </nav>
            </div>

            {/* Footer */}
            <div className="text-xs text-center mt-6 border-t border-black pt-2">
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