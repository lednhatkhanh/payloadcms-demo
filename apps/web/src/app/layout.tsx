import '@repo/ui/styles.css'

import { UiProvider } from '@repo/ui/providers'
import { JetBrains_Mono, Manrope } from 'next/font/google'
import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'

const manrope = Manrope({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-manrope',
})

const jetBrainsMono = JetBrains_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  description:
    'A focused shipping and logistics demonstration with service paths, illustrative locations, and The Dispatch newsroom.',
  metadataBase: new URL('http://localhost:3000'),
  title: { default: 'Shipping & logistics', template: '%s — Shipping & logistics' },
}

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html
      className={`${manrope.variable} ${jetBrainsMono.variable}`}
      data-scroll-behavior="smooth"
      dir="ltr"
      lang="en-US"
    >
      <body>
        <UiProvider>
          <SiteHeader />
          <main>{children}</main>
        </UiProvider>
      </body>
    </html>
  )
}
