"use client"

import BackendInitializer from "@/components/BackendInitializer"
import "../globals.css"

export default function WithLayout({ children }) {

  return (
    <>
    <html>
        <body>
            <BackendInitializer>
                <div className="min-w-0 w-full">
                {children}
                </div>
            </BackendInitializer>
        </body>
    </html>
    </>
  )
}