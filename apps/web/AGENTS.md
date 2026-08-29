# Web app rules

- Read `node_modules/next/dist/docs/` before changing Next.js behavior.
- Cache Components and Partial Prefetching are enabled. Keep the shared App Shell static and put URL reads below leaf Suspense boundaries.
- Read Payload only through `src/lib/content.ts`; do not add REST round trips for CMS content.
- App components may not import React Aria, Lucide or add ad hoc visual classes. Extend `@repo/ui` instead.
- Forms use React Aria wrappers, ky, shared Zod contracts and server-side validation.
