"use client"
import FormAuth from "@/components/FormAuth"
import { login } from "@/services/authService"
import { saveToken } from "@/utils/storage"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  async function handleLogin(data) {
    try {
      const response = await login(data) // { identifier, password }
      saveToken(response.token)
      router.push("/shelf")
    } catch {
      alert("Falha no login")
    }
  }

  return <FormAuth variant="login" onSubmit={handleLogin} buttonText="Entrar" />
}