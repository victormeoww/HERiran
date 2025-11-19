import type { Metadata } from 'next'
import { Cormorant_Garamond, Crimson_Text, Inter, Vazirmatn } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

const cormorant = Cormorant_Garamond({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
})

const crimson = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-crimson',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-vazirmatn',
})

export const metadata: Metadata = {
  title: 'HER iran | An anonymous voice from inside Iran',
  description: 'An anonymous editorial platform for an Iranian woman to publish articles, essays, and breaking news.',
  openGraph: {
    title: 'HER iran',
    description: 'An anonymous voice from inside Iran',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${crimson.variable} ${inter.variable} ${vazirmatn.variable}`}>
      <body className="bg-cream text-charcoal antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}