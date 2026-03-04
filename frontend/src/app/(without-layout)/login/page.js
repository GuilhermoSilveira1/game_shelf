"use client"
import FormAuth from "@/components/FormAuth"
import { login } from "@/services/authService"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  async function handleLogin(data) {
    try {
      await login(data)
      router.push("/shelf")
    } catch (err) {
      alert("Falha no login")
    }
  }

  return (
    <FormAuth
      variant="login"
      onSubmit={handleLogin}
      buttonText="Entrar"
    />
  )
}