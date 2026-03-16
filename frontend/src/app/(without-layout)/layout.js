import Link from "next/link";

export const metadata = {
  title: "Game Shelf",
  description: "Organize seus jogos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen bg-gray-100">
        
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
          <h1 className="text-2xl font-bold mb-10">
            🎮 Game Shelf
          </h1>

        </aside>

        {/* Conteúdo principal */}
        <main className="flex-1 p-10">
          {children}
        </main>

      </body>
    </html>
  );
}