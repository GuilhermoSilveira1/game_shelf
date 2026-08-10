"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import BackendInitializer from "@/components/BackendInitializer"
import "../globals.css"

export default function WithLayout({ children }) {
  const pathname = usePathname()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  function closeMobileSidebar() {
    setSidebarOpen(false)
  }

  const navigationItems = [
    {
      href: "/search",
      icon: "🔎",
      label: "Pesquisar",
      color: "bg-[#58d0e0]",
    },
    {
      href: "/shelf",
      icon: "📚",
      label: "Prateleira",
      color: "bg-white",
    },
  ]

  return (
    <>
    <html>
      <body>
        <BackendInitializer>
          <div className="min-h-screen bg-[#c8c5dd]">
            {/* Barra mobile */}
            <header
              className="
                fixed
                top-0
                left-0
                right-0
                z-40
                flex
                h-16
                items-center
                justify-between
                bg-[#5a54f2]
                border-b-4
                border-[#3b2a1f]
                px-4
                lg:hidden
              "
            >
              <Link href={"/shelf"}>
              </Link>

              <button
                type="button"
                aria-label={
                  sidebarOpen
                    ? "Fechar menu"
                    : "Abrir menu"
                }
                aria-expanded={sidebarOpen}
                onClick={() =>
                  setSidebarOpen((current) => !current)
                }
                className="
                  bg-[#f4ef45]
                  border-4
                  border-[#3b2a1f]
                  px-3
                  py-2
                  text-xl
                  font-black
                  text-[#3b2a1f]
                  shadow-[3px_3px_0px_#3b2a1f]
                  active:translate-x-1
                  active:translate-y-1
                  active:shadow-none
                "
              >
                {sidebarOpen ? "✕" : "☰"}
              </button>
            </header>

            {/* Fundo do menu mobile */}
            {sidebarOpen && (
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={closeMobileSidebar}
                className="
                  fixed
                  inset-0
                  z-40
                  bg-black/50
                  lg:hidden
                "
              />
            )}

            <div className="flex min-h-screen">
              {/* Sidebar */}
              <aside
                className={`
                  fixed
                  inset-y-0
                  left-0
                  z-50
                  flex
                  flex-col
                  gap-4
                  bg-[#5a54f2]
                  border-r-4
                  border-[#3b2a1f]
                  p-3
                  transition-all
                  duration-200

                  ${
                    sidebarOpen
                      ? "translate-x-0"
                      : "-translate-x-full"
                  }

                  lg:translate-x-0

                  ${
                    sidebarCollapsed
                      ? "lg:w-20"
                      : "w-64 lg:w-56"
                  }
                `}
              >
                {/* Logo */}
                <div
                  className={`
                    bg-[#f4ef45]
                    border-4
                    border-[#3b2a1f]
                    text-center
                    text-[#3b2a1f]
                    overflow-hidden

                    ${
                      sidebarCollapsed
                        ? "p-2"
                        : "p-3"
                    }
                  `}
                >
                  <h1
                    className={`
                      font-black
                      uppercase
                      leading-none

                      ${
                        sidebarCollapsed
                          ? "text-xl"
                          : "text-2xl"
                      }
                    `}
                  >
                    {sidebarCollapsed ? (
                      "GS"
                    ) : (
                      <>
                        GAME
                        <br />
                        SHELF
                      </>
                    )}
                  </h1>

                  {!sidebarCollapsed && (
                    <p className="mt-2 text-xs font-bold uppercase">
                      Sua coleção gamer
                    </p>
                  )}
                </div>

                {/* Recolher no desktop */}
                <button
                  type="button"
                  onClick={() =>
                    setSidebarCollapsed(
                      (current) => !current
                    )
                  }
                  className="
                    hidden
                    lg:block
                    w-full
                    bg-[#f4ef45]
                    border-4
                    border-[#3b2a1f]
                    p-2
                    font-black
                    text-[#3b2a1f]
                    shadow-[3px_3px_0px_#3b2a1f]
                    hover:translate-x-[2px]
                    hover:translate-y-[2px]
                    hover:shadow-[1px_1px_0px_#3b2a1f]
                    transition-all
                  "
                  title={
                    sidebarCollapsed
                      ? "Expandir menu"
                      : "Recolher menu"
                  }
                >
                  {sidebarCollapsed ? "▶" : "◀ Recolher"}
                </button>

                {/* Navegação */}
                <nav className="flex flex-col gap-3">
                  {navigationItems.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      pathname.startsWith(
                        `${item.href}/`
                      )

                    return (
                      <Link href={item.href}>
                        <span className="text-xl">
                          {item.icon}
                        </span>

                        {!sidebarCollapsed && (
                          <span>{item.label}</span>
                        )}
                      </Link>
                    )
                  })}
                </nav>

                {/* Rodapé */}
                <div className="mt-auto flex flex-col gap-3">
                  <Link href={"/logout"}>
                    <span className="text-xl">🚪</span>

                    {!sidebarCollapsed && (
                      <span>Logout</span>
                    )}
                  </Link>
                </div>
              </aside>

              {/* Conteúdo */}
              <main
                className={`
                  relative
                  z-10
                  min-w-0
                  w-full
                  pt-16
                  transition-[margin]
                  duration-200
                  lg:pt-0

                  ${
                    sidebarCollapsed
                      ? "lg:ml-20"
                      : "lg:ml-56"
                  }
                `}
              >
                <div className="min-w-0 w-full">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </BackendInitializer>
      </body>
    </html>
    </>
  )
}