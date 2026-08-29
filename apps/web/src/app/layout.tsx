import '@repo/ui/styles.css'

import { UiProvider } from '@repo/ui/providers'
import { Noto_Sans } from 'next/font/google'
import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'

const notoSans = Noto_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-noto-sans',
})

export const metadata: Metadata = {
  description: 'A considered record of the products, people, and ideas shaping what comes next.',
  metadataBase: new URL('http://localhost:3000'),
  title: { default: 'The Dispatch', template: '%s — The Dispatch' },
}

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html className={notoSans.variable} dir="ltr" lang="en-US">
      <body>
        <UiProvider>
          <SiteHeader />
          <main>{children}</main>
        </UiProvider>
      </body>
    </html>
  )
}
