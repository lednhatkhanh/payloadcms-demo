import '@repo/ui/styles.css'

import { UiProvider } from '@repo/ui/providers'
import { Noto_Sans } from 'next/font/google'
import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { PreviewBanner } from '@/components/PreviewBanner'
import { Suspense } from 'react'

const notoSans = Noto_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-noto-sans',
})

export const metadata: Metadata = {
  description:
    'A focused shipping and logistics demonstration with service paths, illustrative locations, and The Dispatch newsroom.',
  metadataBase: new URL('http://localhost:3000'),
  title: { default: 'Shipping & logistics', template: '%s — Shipping & logistics' },
}

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html className={notoSans.variable} data-scroll-behavior="smooth" dir="ltr" lang="en-US">
      <body>
        <UiProvider>
          <SiteHeader />
          <Suspense fallback={null}>
            <PreviewBanner />
          </Suspense>
          <main>{children}</main>
        </UiProvider>
      </body>
    </html>
  )
}
