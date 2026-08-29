# Shipping Demo Implementation Plan

## Goal

Turn the existing compact newsroom demo into a shipping and logistics website that demonstrates Payload CMS content management, draft publishing, media, dynamic locations, and an editor-configurable form engine.

The public company site and its newsroom should be distinct in meaning:

- The company receives its own shipping-and-logistics identity.
- **The Dispatch** is the name of the newsroom, not the company name.
- All public copy remains demonstrative. Do not invent customers, operational coverage, performance metrics, sustainability results, or testimonials.
- A company name and mark have not been supplied. Do not invent either; obtain or explicitly delegate them before building the public header, metadata, or legal copy.

## Non-negotiable design and accessibility rules

- `apps/web/PRODUCT.md` owns product truth; `apps/web/DESIGN.md` owns the visual system.
- The `@theme` block in `packages/ui/src/styles.css` is the canonical Tailwind token configuration.
- Application code uses only named Tailwind/theme tokens and shared `@repo/ui` components.
- Agents may add or revise named tokens, component variants, and shared primitives in `packages/ui` when a real reusable need exists.
- Never use arbitrary Tailwind values, raw colors, inline styling, or ad-hoc visual classes in `apps/web`.
- Extend a shared primitive or named variant before introducing a visual value not already represented in the token system.
- Use the established light-only Portside Journal system: Page Paper, Clean Surface, Ink, Muted Ink, Harbor Rose, restrained depth, and calm, buoyant interaction feedback.
- Keep live text off photographs. Pair Unsplash imagery with a tokenized surface or place it in an adjacent media region.
- Meet WCAG AA contrast: 4.5:1 for normal text and 3:1 for large text; verify all foreground/background token pairs used by content, controls, error states, focus states, and image-adjacent UI.
- Respect reduced-motion preferences and retain visible focus indicators.
- Demo imagery may use Unsplash assets with meaningful alt text. Use it as atmosphere, not proof of actual operations.

## Public route map

| Route | Kind | Content source | Purpose |
| --- | --- | --- | --- |
| `/` | Landing page | Payload Homepage global, featured locations, and featured news | Establish the shipping proposition, services, locations, newsroom, and primary enquiry path. |
| `/shipping` | Static page | Static | Overview of the shipping offer. |
| `/shipping/ocean-freight` | Static page | Static | Representative service-detail page. |
| `/shipping/logistics-solutions` | Static page | Static | End-to-end logistics service-detail page. |
| `/about` | Static page | Static | Explain the demo company's approach without unsupported claims. |
| `/locations` | Dynamic list | New Payload `locations` collection | Demonstrate CMS-managed locations, media, and service tags. |
| `/locations/[slug]` | Dynamic detail | New Payload `locations` collection | Demonstrate Payload detail content and related services. |
| `/news` | Dynamic list | Existing Payload `news` collection | The Dispatch newsroom index. |
| `/news/[slug]` | Dynamic detail | Existing Payload `news` collection | Rich-text, media, category, and publish-date story detail. |
| `/contact` | Dynamic form | Payload Form Builder | General customer contact form. |
| `/request-a-quote` | Dynamic form | Payload Form Builder | Quote-request form with shipping-specific questions. |
| `/shipment-enquiry` | Dynamic form | Payload Form Builder | General shipment enquiry; do not present this as real-time tracking. |
| `/thank-you/[form]` | Static confirmation | Form context | Reusable post-submission confirmation route. |
| `/newsletter` | Optional dynamic form | Payload Form Builder | Dedicated subscription page; preserve the footer sign-up as the main quick-entry point. |

## Information architecture

### Visitor journeys

- **Evaluate the offer:** `/` → `/shipping` → a representative service detail → `/request-a-quote`.
- **Find a relevant location:** `/` or `/shipping` → `/locations` → `/locations/[slug]` → the appropriate enquiry route. Location content is illustrative, not proof of live coverage.
- **Read the editorial layer:** `/` or the footer → `/news` → `/news/[slug]`. The Dispatch is visibly distinct from the company site, but remains part of the same public experience.
- **Make contact:** any page may lead to `/contact`, `/request-a-quote`, or `/shipment-enquiry`; the latter is a message form, never real-time tracking.
- **Subscribe:** the footer is the primary newsletter entry. A standalone newsletter page is optional and must not displace the footer flow.

### Content ownership and boundaries

- **Static, code-owned structure:** shipping overview, the two representative service pages, About, route hierarchy, and shared navigation. This is deliberately not a general page-builder demo.
- **CMS-owned, editorial content:** the Homepage global, news, locations, media, form definitions, and form submissions.
- **Homepage curation:** the global owns its proposition, supporting copy, calls to action, newsletter copy, and explicit selections of up to three featured news stories and locations. It does not duplicate every page's content.
- **Service taxonomy:** location service tags use a controlled vocabulary that maps to the two static service detail routes. Do not add a separate CMS services collection in this demo.
- **Company identity:** until a name and mark are supplied, preserve the distinction between the company and The Dispatch without inventing a replacement brand.

### Experience principles

- Company pages are **Persuade** surfaces: establish the demonstrative shipping proposition, orient visitors, and direct them to one clear next step.
- Location and form pages are **Operate** surfaces: favor clear choices, readable details, and dependable feedback over editorial flourish.
- The Dispatch is a **Read** surface: lead with stories, categories, publication context, and comfortable long-form reading.
- Keep the Portside Journal system intact: calm paper-and-ink hierarchy, Harbor Rose as the single signal, imagery adjacent to live text, and restrained interactive lift.

## CMS scope

### Keep and adapt

- `Homepage` global: adapt existing fields and add only the landing-page content genuinely needed: proposition, supporting copy, enquiry and newsletter calls to action, and bounded featured-news and featured-location relationships.
- `News` collection: preserve drafts, media, categories, rich text, slugs, publish date, and featured state; revise seed content for shipping/logistics context and retain The Dispatch as its public identity.
- `Media` collection: retain responsive editorial image sizes and meaningful alt text.
- Existing contact and newsletter collections: make one explicit Phase 1 decision—migrate them into the form engine or retain them only for a documented compatibility need. Do not leave two public submission paths accepting the same purpose indefinitely.

### Add

- Payload Form Builder plugin, configured to permit only the field types needed for the three demo forms.
- A draft-enabled `locations` collection with:
  - name and slug;
  - city and country;
  - service tags;
  - contact details;
  - optional lead image;
  - editorial description.
- Seed entries sufficient to demonstrate cards, detail pages, no-image fallbacks, varied service tags, and draft/published states. Use clearly demonstrative content and never imply actual offices, contacts, or operational coverage.

### Editorial lifecycle and public-read rules

- Homepage, News, and Locations use Payload drafts; the public site reads published content only.
- Homepage feature relationships are curated editorial choices, not automatic feeds.
- News and location listing/detail reads are bounded, selected, server-only Local API queries with public access rules enforced.
- Media without a lead image must render a purposeful fallback; media alt text is mandatory and must describe the image rather than assert business proof.
- Form definitions are editor-configurable; form submissions are private admin data and must never be publicly readable.

### Form definitions

- `contact`: name, email, organisation, message, consent.
- `request-a-quote`: contact details, shipping mode, origin, destination, shipment scale/timeline, message, consent.
- `shipment-enquiry`: contact details, enquiry category, reference field, message, consent.

Configure only the field types required by these definitions: text, email, textarea, select, and checkbox. The footer newsletter entry may use the form engine only when the Phase 1 collection decision makes that the chosen source of truth.

The public renderer maps form-engine fields to existing shared React Aria wrappers. It must support labels, descriptions, required state, field-level errors, pending submission, duplicate-submission protection, recoverable failure, and confirmation. It must also preserve keyboard order, focus placement after validation or submission, and an equivalent mobile flow.

## Delivery phases

### Phase 1 — CMS foundation

1. Add the supported Payload Form Builder dependency and configuration.
2. Add the `locations` collection, access rules, generated types, migration, and seed data.
3. Adapt Homepage and News seed content to the shipping-and-logistics story.
4. Run generation, migration checks, and `pnpm check`.

### Phase 2 — Shared system readiness

1. Audit `packages/ui` for the few patterns that will recur across the new pages.
2. Add only reusable named primitives or variants, such as service cards, location cards, media panels, and form-page shells, after repeated use is established.
3. Add theme tokens only at `packages/ui/src/styles.css` and only when semantic reuse justifies them.
4. Keep all app routes composition-only.

### Phase 3 — Landing and static shipping pages

1. Implement `/` from the Homepage global, with shipping proposition, service entry points, featured locations, news, enquiry CTAs, and newsletter entry.
2. Implement the reusable service-page composition.
3. Create `/shipping`, `/shipping/ocean-freight`, `/shipping/logistics-solutions`, and `/about` using that system.
4. Use selected Unsplash imagery with accessible alt text and responsive `next/image` handling.

### Phase 4 — Dynamic locations and newsroom

1. Implement `/locations` and `/locations/[slug]` with bounded, server-only Local API reads.
2. Refresh `/news` and `/news/[slug]` to position The Dispatch as the shipping-company newsroom.
3. Handle empty lists, missing media, long titles, invalid slugs, and publishing states.

### Phase 5 — Form experience

1. Build one Payload Form Builder field renderer using shared React Aria wrappers.
2. Implement the three configured form routes and reusable confirmation route.
3. Verify keyboard flow, inline validation, focus placement, pending states, errors, and success paths on mobile and desktop.

### Phase 6 — Extract, verify, and document

1. Extract only patterns that recur at least three times into `packages/ui`.
2. Run visual checks at desktop and mobile sizes; review forms and dynamic content in a running app.
3. Run `pnpm check`; run both Next builds when PostgreSQL is available.
4. Audit contrast, theming, responsiveness, reduced motion, and keyboard behavior.
5. Refresh `apps/web/DESIGN.md` and its Impeccable sidecar from the implemented system.

## Impeccable workflow

Run the design work in this order:

1. `/impeccable shape` for the whole site plan and CMS information architecture.
2. `/impeccable shape /` before composing the landing page.
3. `/impeccable shape shipping-services` before building the service-page template.
4. `/impeccable shape locations` before building the location list/detail experience.
5. `/impeccable shape newsroom` before refreshing the newsroom surfaces.
6. `/impeccable shape shipping-forms` before building the form-engine renderer and public form routes.
7. `/impeccable extract apps/web/src packages/ui/src` after repeated patterns are visible in code.
8. `/impeccable harden apps/web`, then `/impeccable audit apps/web`, then `/impeccable polish apps/web`.
9. `/impeccable document` after implementation settles, explicitly requesting a refresh of `apps/web/DESIGN.md` and `apps/web/.impeccable/design.json`.

## Definition of done

- Every listed core route works with realistic demo data.
- Homepage, news, locations, and forms visibly demonstrate managed Payload content.
- Forms are editor-configurable in Payload and render with shared accessible UI components.
- No app UI uses arbitrary values or bypasses the shared token system.
- Contrast, focus, validation, motion, responsive behavior, empty states, and not-found states have been checked.
- `pnpm check` passes; both Next builds pass when the database is available.
