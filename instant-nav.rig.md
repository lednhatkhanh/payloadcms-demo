# Instant navigation rig

- **BUILD:** `EXPOSE_TESTING_API=1 pnpm --filter @repo/web build`
- **EXPOSE:** `experimental.exposeTestingApiInProductionBuild` is enabled only when `EXPOSE_TESTING_API=1`.
- **RUN:** Start PostgreSQL, migrate and seed, then run `pnpm --filter @repo/web start`.
- **TEST USER:** Public routes require no authentication.
- **DRIFT:** The production rig requires the same root `.env`, seeded PostgreSQL data and CMS media URL as local development.
- **LOOP:** Run `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000 pnpm --filter @repo/web test:e2e` and verify desktop plus mobile projects.

The locked `instant()` tests are in `apps/web/tests/e2e/instant.spec.ts`. Automatic and Partial Prefetching behavior must be measured against `next start`, never `next dev`.
