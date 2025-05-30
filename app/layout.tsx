import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Zeno - Your DeFi Sidekick",
  description: "Orchestrate a hive mind of DeFi Agents to act on Solana",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Electrolize:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
