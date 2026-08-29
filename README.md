# Payload Newsroom

A Turborepo containing a standalone Payload CMS app and a separate Next.js public site that consumes Payload through the Local API.

## Requirements

- Node.js 24.20+
- pnpm 11.24+
- Docker with Compose

## Start locally

```bash
cp .env.example .env
pnpm install
pnpm db:up
pnpm db:migrate
pnpm seed
pnpm dev
```

- Web: http://localhost:3000
- Payload Admin: http://localhost:3001/admin

The first visit to Payload Admin creates the initial administrator account.

## Quality checks

```bash
pnpm check
pnpm --filter @repo/cms build
pnpm --filter @repo/web build
```

The full web build and Playwright suite require migrated, seeded PostgreSQL data. The public app uses Cache Components and Partial Prefetching, and its production `instant()` rig is documented in `instant-nav.rig.md`.
