// Aqui eu posso colocar todos os componentes que eu quiser que apareça
// em várias páginas
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "Game Shelf",
  description: "A sua prateleira de jogos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <Navbar />
      <body>
        {children}
      </body>
    </html>
  );
}
