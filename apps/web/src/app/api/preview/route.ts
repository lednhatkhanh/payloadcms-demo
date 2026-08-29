import { pagePreviewToken } from '@repo/payload-config/preview'
import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

import { getPagePathById } from '@/lib/content'

function previewId(value: string | null): number | undefined {
  if (!value) return undefined
  const id = Number(value)
  return Number.isSafeInteger(id) && id > 0 ? id : undefined
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  if (searchParams.get('token') !== pagePreviewToken) {
    return new Response('Invalid preview token.', { status: 401 })
  }

  const id = previewId(searchParams.get('id'))
  if (!id) return new Response('Invalid page.', { status: 400 })

  const path = await getPagePathById(id)
  if (!path) return new Response('Page not found.', { status: 404 })

  const preview = await draftMode()
  preview.enable()
  const destination = new URL(`/en${path}`, request.url)
  destination.searchParams.set('id', String(id))
  destination.searchParams.set('preview', pagePreviewToken)
  return NextResponse.redirect(destination)
}
