import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RIYZI WASH | Nettoyage vapeur professionnel',
  description: 'Service de nettoyage à domicile et vapeur haut de gamme. Solutions écologiques pour particuliers et entreprises au Maroc.',
  keywords: 'nettoyage vapeur, lavage auto, nettoyage bureau, nettoyage maison, Casablanca, Mohammedia',
  authors: [{ name: 'RIYZI WASH' }],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'RIYZI WASH | Nettoyage vapeur professionnel',
    description: 'Service de nettoyage à domicile et vapeur haut de gamme',
    url: 'https://riyziwash.ma',
    siteName: 'RIYZI WASH',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RIYZI WASH | Nettoyage vapeur professionnel',
    description: 'Service de nettoyage à domicile et vapeur haut de gamme',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}