# Repository rules

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

Before writing Next.js code, read the relevant version-matched guide under each app's
`node_modules/next/dist/docs/`. In this monorepo, resolve the installed `next` package from the app
directory. Follow current deprecations and error-page guidance rather than training memory.

This block is managed by Next.js 16.3+ and may be refreshed by `next dev`.

<!-- END:nextjs-agent-rules -->

This is a Node.js 24, pnpm 11, TypeScript 7, React 19, Next.js 16 and Payload 3 monorepo.

## Architecture

- `apps/web` is the public site. It reads Payload only through server-only Local API modules.
- `apps/cms` owns Payload Admin and HTTP APIs.
- Payload config and generated types belong to `packages/payload-config`.
- Shared form contracts belong to `packages/contracts`.
- All application UI must use `packages/ui`.

## Styling

- Never add hardcoded colors, spacing, radii, borders, shadows or typography in application code.
- Never use arbitrary Tailwind values. Add a named token or CVA variant in `packages/ui`.
- Application pages must not use ad hoc `className` values. Compose the shared layout and UI primitives.
- Light theme only. Do not add dark-mode selectors or variants.
- `#bd0f72` is the canonical brand 700 value. Use semantic aliases rather than raw palette utilities.
- Noto Sans is the only text face.

## Interaction and icons

- Use the shared React Aria wrappers. Do not import `react-aria-components` from either app.
- Do not create raw buttons, inputs, textareas or checkboxes when a shared wrapper exists.
- Use React Aria `onPress` semantics for pressable controls.
- Import icons through `@repo/ui/icon`; no raw SVG interface icons, icon fonts or emoji controls.
- Decorative icons are hidden from assistive technology. Icon-only buttons require accessible labels.

## Payload and Next.js

- Payload imports are server-only. Never expose config, secrets, drafts or submission data to client bundles.
- Public Local API reads must set `overrideAccess: false`, `draft: false`, bounded depth and selected fields.
- Cache Components and Partial Prefetching are enabled only in the web app. Keep static UI outside Suspense and push request-time and URL-specific reads down.
- Do not add `dynamic`, `revalidate`, `fetchCache` or legacy PPR flags.
- Use the supported Next.js React Compiler. Oxlint is lint-only; do not add a second compiler transform.

## TypeScript and quality

- ESM and strict TypeScript only. No `any`, enums, namespaces, parameter properties or unchecked assertions.
- Do not introduce or retain APIs marked `@deprecated` by installed type definitions or current
  documentation. Treat deprecation diagnostics as errors, migrate to the supported replacement and
  never hide them with casts or suppression comments.
- Prefer functions and composition over classes and boolean-prop proliferation.
- Never swallow errors or promises.
- Run `pnpm check` before handing off changes. Run both Next builds when PostgreSQL is available.
