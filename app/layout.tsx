import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import StickyNav from "@/components/sticky-nav"
import SessionManager from "@/components/session-manager"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PLANET9INE",
  description: "Home for art pieces that push the boundaries of creativity",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionManager />
        <StickyNav />
        {children}
      </body>
    </html>
  )
}
