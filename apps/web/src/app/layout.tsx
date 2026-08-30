import '@repo/ui/styles.css'

import { UiProvider } from '@repo/ui/providers'
import { contentLocales } from '@repo/payload-config/locales'
import { Noto_Sans } from 'next/font/google'
import type { Metadata } from 'next'

import { SiteHeader } from '@/components/SiteHeader'
import { PreviewBanner } from '@/components/PreviewBanner'
import { getSeoSettings } from '@/lib/content'
import { localeTag } from '@/lib/locale'
import { buildSiteMetadata } from '@/lib/seo'
import { Suspense } from 'react'

const notoSans = Noto_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-noto-sans',
})

const localeTags = Object.fromEntries(contentLocales.map((locale) => [locale, localeTag(locale)]))
const documentLocaleScript = `document.documentElement.lang=(${JSON.stringify(localeTags)})[location.pathname.split('/')[1]]??'${localeTag('en')}'`

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata(await getSeoSettings('en'))
}

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html
      className={notoSans.variable}
      data-scroll-behavior="smooth"
      dir="ltr"
      lang={localeTag('en')}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: documentLocaleScript }} />
      </head>
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
