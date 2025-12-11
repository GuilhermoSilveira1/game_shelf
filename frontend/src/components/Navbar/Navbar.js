//Importações
import Link from "next/link";

// Componente Navbar, contendo os links para as outras páginas
export default function Navbar() {
    return(
        <header className="w-full bg-gray-800 text-white px-6 py-4">
            <nav className="flex justify-between items-center"> 
                <Link href="/" className="hover:text-gray-300">Ínicio</Link>
                <Link href="/search" className="hover:text-gray-300">Pesquisar</Link>
                <Link href="/profile" className="hover:text-gray-300">Perfil</Link>
                <Link href="/shelf" className="hover:text-gray-300">Prateleira</Link>
                <Link href="/menu" className="hover:text-gray-300">Menu</Link>
            </nav>
        </header>
    )
}