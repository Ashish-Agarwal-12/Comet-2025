import type { Metadata } from 'next'
import { Syne, Outfit } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CoMeT2025 | Cognizant Leadership Summit',
  description: 'Join us for CoMeT2025 - A premier leadership event charting the course for innovation, alignment, and forward momentum.',
  keywords: ['CoMeT2025', 'Cognizant', 'Leadership', 'Summit', 'Innovation'],
  authors: [{ name: 'Cognizant' }],
  openGraph: {
    title: 'CoMeT2025 | Cognizant Leadership Summit',
    description: 'A premier leadership event charting the course for innovation and forward momentum.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${outfit.variable}`}>
      <body className="font-body text-white antialiased overflow-x-hidden">
        {/* Animated star field background */}
        <div className="star-field" aria-hidden="true">
          <div className="stars-layer stars-small" />
          <div className="stars-layer stars-medium" />
          <div className="stars-layer stars-large" />
        </div>
        
        {/* Aurora mesh gradient overlay */}
        <div className="aurora-overlay" aria-hidden="true" />
        
        {/* Main content */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
