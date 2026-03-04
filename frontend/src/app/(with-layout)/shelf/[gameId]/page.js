"use client"
import { useEffect, useState } from "react"
import { getOneFromShelf } from "@/services/shelfService"
import ShelfForm from "@/components/ShelfForm"
import { getToken } from "@/utils/storage"
import { useParams } from "next/navigation"

export default function ShelfDetailsPage() {
  const { gameId } = useParams()
  const token = getToken()
  const [data, setData] = useState(null)

  useEffect(() => {
    async function load() {
      const response = await getOneFromShelf(gameId, token)
      setData(response)
    }
    load()
  }, [gameId])

  if (!data) return <p>Carregando...</p>

  return (
    <ShelfForm data={data} />
  )
}
