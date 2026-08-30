import { createHmac } from 'node:crypto'

import { serverEnvironment } from '@repo/contracts/env'

export const publicCacheTags = ['countries', 'news'] as const

export type PublicCacheTag = (typeof publicCacheTags)[number]

export const cacheInvalidationToken = createHmac('sha256', serverEnvironment.PAYLOAD_SECRET)
  .update('dispatch-cache-invalidation')
  .digest('hex')

export function isPublicCacheTag(value: unknown): value is PublicCacheTag {
  return value === 'countries' || value === 'news'
}

export async function revalidatePublicContent(tags: readonly PublicCacheTag[]): Promise<void> {
  const url = new URL('/api/revalidate', serverEnvironment.NEXT_PUBLIC_WEB_URL)
  const response = await fetch(url, {
    body: JSON.stringify({ tags }),
    headers: {
      authorization: `Bearer ${cacheInvalidationToken}`,
      'content-type': 'application/json',
    },
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error(`Public cache revalidation failed with status ${response.status}.`)
  }
}
