import {
  contentLocaleCookie,
  contentLocaleCookieMaxAge,
  defaultContentLocale,
  isContentLocale,
  type ContentLocale,
} from '@repo/payload-config/locales'
import { NextResponse, type NextRequest } from 'next/server'

function localeForRequest(request: NextRequest): ContentLocale {
  const savedLocale = request.cookies.get(contentLocaleCookie)?.value
  return isContentLocale(savedLocale) ? savedLocale : defaultContentLocale
}

function localeResponse(response: NextResponse, locale: ContentLocale): NextResponse {
  response.cookies.set(contentLocaleCookie, locale, {
    maxAge: contentLocaleCookieMaxAge,
    path: '/',
    sameSite: 'lax',
  })
  return response
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const [, firstSegment, ...remainingSegments] = pathname.split('/')

  if (!isContentLocale(firstSegment)) {
    const destination = request.nextUrl.clone()
    destination.pathname = `/${localeForRequest(request)}${pathname === '/' ? '' : pathname}`
    return localeResponse(NextResponse.redirect(destination), localeForRequest(request))
  }

  const rewrittenUrl = request.nextUrl.clone()
  rewrittenUrl.pathname = `/${remainingSegments.join('/')}`
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-site-locale', firstSegment)

  return localeResponse(
    NextResponse.rewrite(rewrittenUrl, { request: { headers: requestHeaders } }),
    firstSegment,
  )
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|robots.txt|sitemap.xml).*)'],
}
