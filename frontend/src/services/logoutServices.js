'use server'
import { cookies } from 'next/headers'
 
export default async function hasCookie() {
  const cookieStore = await cookies()
  const hasCookie = cookieStore.has('theme')
  if (hasCookie){
    return true
  }
}

export async function deleteCookie(data) {
  const cookieStore = await cookies()
  cookieStore.delete('name')
}