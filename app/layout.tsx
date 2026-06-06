import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "IQ Math — ҰБТ математикасынан 100 балл алыңыз",
  description: "Өміртай Жасұланмен бірге ҰБТ математикасына дайындалыңыз. 1200+ оқушы, 94% нәтиже. Онлайн курстар, тесттер, видео сабақтар.",
  keywords: ["ҰБТ математика", "ҰБТ дайындық", "математика курсы", "онлайн курс", "IQ Math", "ҰБТ 2025"],
  authors: [{ name: "Өміртай Жасұлан" }],
  creator: "IQ Math",
  openGraph: {
    title: "IQ Math — ҰБТ математикасынан 100 балл алыңыз",
    description: "Өміртай Жасұланмен бірге ҰБТ математикасына дайындалыңыз. 1200+ оқушы, 94% нәтиже.",
    url: "https://mathpro-kz.vercel.app",
    siteName: "IQ Math",
    locale: "kk_KZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IQ Math — ҰБТ математикасынан 100 балл алыңыз",
    description: "Өміртай Жасұланмен бірге ҰБТ математикасына дайындалыңыз.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kk">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://mathpro-kz.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "IQ Math",
              "description": "ҰБТ математикасына дайындық платформасы",
              "url": "https://mathpro-kz.vercel.app",
              "telephone": "+87075687067",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "KZ"
              },
              "offers": [
                {
                  "@type": "Course",
                  "name": "ҰБТ Толық дайындық",
                  "description": "ҰБТ барлық тақырыптары, нақты емтихан тесттері",
                  "provider": {
                    "@type": "Person",
                    "name": "Өміртай Жасұлан"
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
} 