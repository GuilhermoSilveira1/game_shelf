"use client"

import BackendInitializer from "@/components/BackendInitializer"

export default function WithoutLayout({ children }) {
  return (
    <BackendInitializer>
      {children}
    </BackendInitializer>
  )
}