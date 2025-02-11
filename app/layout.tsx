import type React from "react"

export const metadata = {
  title: "Encuesta de Satisfacción",
  description: "Encuesta de satisfacción para nuestros clientes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}



import './globals.css'