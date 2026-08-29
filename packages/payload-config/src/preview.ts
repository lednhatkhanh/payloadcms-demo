import { createHmac } from 'node:crypto'

import { serverEnvironment } from '@repo/contracts/env'

export const pagePreviewToken = createHmac('sha256', serverEnvironment.PAYLOAD_SECRET)
  .update('dispatch-page-preview')
  .digest('hex')

export function pagePreviewUrl(id: number | string): string {
  const url = new URL('/api/preview', serverEnvironment.NEXT_PUBLIC_WEB_URL)
  url.searchParams.set('id', String(id))
  url.searchParams.set('token', pagePreviewToken)
  return url.toString()
}
