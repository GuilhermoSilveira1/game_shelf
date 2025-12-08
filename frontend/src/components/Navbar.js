//Importações
import Link from "next/link";

// Componente Navbar, contendo os links para as outras páginas
export default function Navbar() {
    return(
        <>
            <header>
                <nav>
                    <div>
                        <Link href="/">Home</Link>
                    </div>
                    <div>
                        <Link href="/shelf">Prateleira</Link>
                    </div>
                </nav>
            </header>        
        </>
    )
}