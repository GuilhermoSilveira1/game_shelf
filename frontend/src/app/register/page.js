"use client"
import FormAuth from "@/components/FormAuth"
import { register } from "@/services/authService"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()

  async function handleRegister(data) {
    try {
      const response = await register(data) // { email, username, password }
      alert(`Usuário ${response.username} criado com sucesso!`)
      router.push("/auth")
    } catch {
      alert("Falha ao criar usuário")
    }
  }

  return <FormAuth variant="register" onSubmit={handleRegister} buttonText="Criar conta" />
}