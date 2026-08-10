import "./globals.css"

export const metadata = {
  title: "Game Shelf",
  description: "Organize sua coleção de jogos",
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  )
}