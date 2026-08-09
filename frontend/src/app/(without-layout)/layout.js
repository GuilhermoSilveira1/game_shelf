"use client"

import BackendInitializer from "@/components/BackendInitializer"
import "../globals.css"

export default function WithoutLayout({ children }) {

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