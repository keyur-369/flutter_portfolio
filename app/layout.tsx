import type { Metadata, Viewport } from 'next'
import { Inter, Outfit, JetBrains_Mono, Caveat } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/Providers'
import { AnimatedCursor } from '@/components/ui/AnimatedCursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://keyurmistry.dev'),
  title: {
    default: 'Keyur Mistry — Flutter & Full Stack Developer',
    template: '%s | Keyur Mistry',
  },
  description:
    'Flutter Developer with practical experience developing cross-platform applications using Flutter, Firebase and Supabase. Skilled in REST APIs, scalable architecture, backend integration and UI development.',
  keywords: [
    'Flutter Developer',
    'Mobile App Developer',
    'Dart',
    'Firebase',
    'Supabase',
    'Full Stack Developer',
    'Keyur Mistry',
    'Android Developer',
    'React',
    'Next.js',
  ],
  authors: [{ name: 'Keyur Mistry' }],
  creator: 'Keyur Mistry',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://keyurmistry.dev',
    siteName: 'Keyur Mistry Portfolio',
    title: 'Keyur Mistry — Flutter & Full Stack Developer',
    description:
      'Flutter Developer building beautiful cross-platform applications with Flutter, Firebase & Supabase.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Keyur Mistry Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keyur Mistry — Flutter & Full Stack Developer',
    description:
      'Flutter Developer building beautiful cross-platform applications with Flutter, Firebase & Supabase.',
    images: ['/og-image.png'],
    creator: '@keyurmistry',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#0F0F23',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} ${caveat.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Keyur Mistry',
              jobTitle: 'Flutter Developer',
              description:
                'Flutter Developer with practical experience developing cross-platform applications.',
              url: 'https://keyurmistry.dev',
              sameAs: [
                'https://github.com/keyurmistry',
                'https://linkedin.com/in/keyurmistry',
              ],
            }),
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        {/* Aurora Background */}
        <div className="aurora-bg" aria-hidden="true" />
        {/* Noise Overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        <Providers>
          <AnimatedCursor />
          <ScrollProgress />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'rgba(15,15,35,0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                backdropFilter: 'blur(12px)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
