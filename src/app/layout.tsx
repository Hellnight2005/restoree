import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AppStateProvider } from '@/components/AppStateProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Réstorée - Luxury Restoration for Bags, Shoes & Accessories',
  description: 'Premium restoration services for luxury bags, shoes, and accessories. Revive your vibe with expert craftsmanship and modern techniques.',
  keywords: 'luxury restoration, bag repair, shoe polishing, leather repair, luxury accessories',
  authors: [{ name: 'Réstorée' }],
  openGraph: {
    title: 'Réstorée - Luxury Restoration Services',
    description: 'Premium restoration services for luxury items',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: '/favicon.png', // This is the path to your favicon file
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppStateProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </AppStateProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
