import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IQ Math — ҰБТ математика дайындығы",
  description: "Өміртай Жасұланмен ҰБТ математикасынан 100 балл алыңыз",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kk">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 
