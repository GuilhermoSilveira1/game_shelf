"use client"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  function logout() {
    try {
      setTimeout(()=>{
        router.push("/login")
      }, 5) 
    } catch (err) {
      alert("Falha no logout")
    }
  }

  return (
    <>
        <h2>Logout realizado com sucesso!</h2>
        <p>Redirecionando para tela de login...</p>
        {logout}
    </>
  )
}