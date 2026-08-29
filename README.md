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

## Payload Admin import map

Payload Admin uses a generated import map for its configured components. `pnpm dev` generates it automatically before starting the CMS, so a normal local start needs no extra command.

After changing the Payload Admin configuration or its custom components while the dev server is already running, regenerate the map and restart the CMS:

```bash
pnpm --filter @repo/cms generate:importmap
```

The CMS build already generates both Payload types and the import map before running `next build`.

## Quality checks

```bash
pnpm check
pnpm --filter @repo/cms build
pnpm --filter @repo/web build
```

The full web build and Playwright suite require migrated, seeded PostgreSQL data. The public app uses Cache Components and Partial Prefetching, and its production `instant()` rig is documented in `instant-nav.rig.md`.
