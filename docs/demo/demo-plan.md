This is the version I would use now: **Payload-first, Directus as a fully considered comparison candidate, and a solo demo that validates Payload before asking the wider team to invest in a full PoC. The final architecture contains one selected CMS, never a primary/fallback pair.**

# ONE New CMS Platform Proposal

## Recommended Direction: Payload CMS

## Comparison Candidate: Directus

**Purpose:** Replace Drupal/Acquia with a modern, self-hosted, extensible CMS platform for the next several years.

**Recommended platform:** Payload CMS
**Comparison candidate:** Directus
**Hosting:** Fully self-hosted on ONE-managed GCP
**Migration model:** Gradual route- and content-group cutover while Next.js serves both Payload and Drupal during a controlled coexistence period
**Immediate next step:** Solo Payload demo → broader team PoC only if the demo passes

---

# 1. Executive Summary

ONE should move toward a fully self-hosted headless CMS architecture built on:

```text
GKE
Cloud SQL PostgreSQL
Google Cloud Storage
Cloudflare
Next.js
Vertex AI
Elasticsearch
Cloud Logging / OpenTelemetry
```

Payload CMS is the recommended platform.

Directus remains a credible candidate, especially because ONE already has some internal Directus experience and Directus provides several strong out-of-the-box editorial features. It is not a standby deployment: procurement and architecture will ultimately select exactly one CMS.

However, Payload aligns better with the architecture ONE wants to own long-term:

- TypeScript-first.
- React-based Admin customization.
- Excellent Next.js integration.
- REST and GraphQL for other frameworks.
- Local API when beneficial.
- PostgreSQL ownership.
- GCS ownership.
- GKE deployment.
- MIT-licensed core.
- Git-first application architecture.
- Strong code-driven permissions and hooks.
- Official Form Builder.
- Official SEO tooling.
- Official multi-tenant plugin.
- Official MCP integration.
- Official AI-agent Skills.
- Enterprise Publishing Workflows with approvals, access control, alerts, notifications, and extensibility.
- Enterprise AI for translation, image generation, writing assistance, and RAG/auto-embedding.
- Enterprise SSO through SAML or OAuth 2.0 identity providers.
- Enterprise static A/B variant delivery designed for Next.js.
- Easy integration with ONE-controlled Vertex AI.
- Strong observability because the CMS runtime is our own application.
- Strong fit for strict ONE design-system governance.
- Straightforward custom Drupal migration pipeline.

ONE expects to procure the Enterprise plan, so Payload Enterprise AI is a **current target capability and entitlement baseline**, not a future phase or a custom feature we expect to build first. ONE has not yet contacted Payload for the enterprise demonstration, so exact adapters, limits, licensing, supported versions, and contract terms still require vendor confirmation. The separate Enterprise Visual Editor remains a distinct roadmap item and is not a launch dependency; Live Preview remains the current preview baseline.

The key recommendation is:

> **Do not spend time building competing Payload and Directus PoCs.**

The architecture evaluation already identifies Payload as the preferred platform.

Instead:

```text
Requirements analysis
        ↓
Payload vs Directus paper comparison
        ↓
Payload selected as preferred candidate
        ↓
SOLO PAYLOAD DEMO
        ↓
Pass?
 ┌──────┴──────┐
 │             │
YES            NO
 │             │
 ▼             ▼
Team PoC     Reopen the
 │           platform decision
 ▼
Production decision
```

The solo demo should validate whether Payload has any hidden blockers before additional team effort is committed.

---

# 2. Strategic Requirements

## 2.1 Infrastructure

The selected CMS must support:

- Full self-hosting.
- GKE.
- Cloud SQL PostgreSQL.
- GCS.
- ONE-owned database.
- ONE-owned asset storage.
- Cloudflare as edge/CDN.
- High availability.
- Backup and point-in-time recovery.
- GCP logging and monitoring.
- No mandatory vendor cloud/data plane.

---

# 3. Engineering Requirements

The CMS should support:

- Heavy customization.
- Prefer code over CMS-specific configuration magic.
- TypeScript.
- React preferred for UI customization.
- Git source control.
- Automated schema migrations.
- DEV → STAGE → PROD promotion.
- Automated testing.
- Upgradeability.
- REST.
- GraphQL.
- Local API as a bonus.
- MCP.
- AI-agent development workflows.
- Vertex AI.
- LaunchDarkly.
- Elasticsearch.
- OpenTelemetry.

---

# 4. Editorial Requirements

Required:

```text
Drafts
Autosave
Version history
Restore
Trash / recycle bin
Scheduled publishing
Approval workflows
Granular permissions
Google SSO
Live preview
SEO
Forms
Multi-language
Independent translation workflow
Multi-site / multi-tenant
Media management
Audit trail
```

Future/optional:

```text
agent-assisted content operations
ONE-specific Vertex AI extensions
```

Payload Enterprise AI translation, writing assistance, image generation, and RAG/auto-embedding are current target-plan capabilities. Their exact contract scope and behavior still require the vendor demonstration; they are not future product assumptions.

---

# 5. Fundamental Design Principle

The new CMS must enforce:

> **Editors own content. Developers own presentation.**

Editors can choose:

```text
Hero variant:
- Corporate
- Image
- Minimal

Alignment:
- Left
- Center
```

Editors must NOT receive:

```text
CSS
Tailwind class
font-size
font-family
arbitrary colors
margin
padding
raw HTML
JavaScript
arbitrary components
```

This prevents content created by humans or AI from looking inconsistent with the ONE website.

---

# 6. High-Level Target Architecture

```text
                             Internet
                                │
                                ▼
                           Cloudflare
                      CDN / WAF / Edge Cache
                                │
                                ▼
                        GCP Load Balancer
                                │
                ┌───────────────┴────────────────┐
                │                                │
                ▼                                ▼
         Next.js Website                         CMS
              GKE                               GKE
                │                                │
                │                  ┌─────────────┼──────────────┐
                │                  │             │              │
                │                  ▼             ▼              ▼
                │             Cloud SQL         GCS          Pub/Sub
                │             PostgreSQL
                │                                                │
                └────────────────────────────────────────────────┤
                                                                 │
                             ┌───────────────────────────────────┼──────────────┐
                             ▼                                   ▼              ▼
                       Elasticsearch                         Vertex AI       Integrations
                                                            Gemini
                                                               │
                                                          Model Armor


Observability:
────────────────────────────────────────────────────────────────────────
OpenTelemetry
Cloud Logging
Cloud Trace
Cloud Monitoring
Error Reporting
Audit Events
```

The architecture is intentionally vendor-neutral. Payload and Directus are compared as candidate implementations of the single `CMS` component; the production design does not include both products and does not include a fallback CMS runtime.

Use these editable GCP-style diagrams in decision material:

- [Current platform context](./diagrams/current-platform-context.drawio) — simplified from the supplied Unicorn architecture and focused only on the GCP/Acquia CMS delivery boundary. Next.js connects directly to Drupal for legacy content and iframe routes. The Apigee API portal belongs to a separate CRM integration, and Drupal has no dependency on the unrelated external API, so neither appears in this CMS diagram.
- [Vendor-neutral target CMS on GCP](./diagrams/target-cms-gcp.drawio) — one generic CMS component, Cloud SQL PostgreSQL, GCS, jobs, identity, and observability. Payload Enterprise AI is part of the selected Enterprise capability now; a ONE-controlled Vertex AI gateway is an optional extension path where enterprise adapters or governance do not meet requirements.
- [Drupal coexistence and migration](./diagrams/drupal-coexistence-migration.drawio) — Next.js temporarily resolves routes across both CMSs, including explicitly tracked Drupal iframe routes. Simple pages cut over route by route; high-change collections can use one-way deltas and reconciliation; each accepted wave removes its Drupal read path and sync connection.

The written plan above is the source of truth for diagram refreshes. The rendered assets now show Enterprise AI as current scope, optional Vertex extension, direct Next.js-to-Drupal delivery, dual-source migration routing, tracked iframe routes, and per-wave Drupal connection retirement.

Payload and Directus logos belong on comparison/evidence visuals only. Architecture diagrams use the generic CMS icon so the target design remains valid whichever single platform is selected.

---

# 7. Why Payload Over Directus

The decision is primarily about **extension philosophy**, not feature count.

## Payload

```text
Code
 ↓
CMS configuration
 ↓
database
```

The core configuration lives naturally in TypeScript.

Examples:

```text
Collections
Fields
Hooks
Validation
Access Control
Endpoints
Jobs
Admin components
Plugins
```

are application code.

## Directus

```text
Database
 ↓
Directus
 ↓
Studio / API
```

Directus is extremely strong when the database and generic API layer are the center of the architecture.

Its configuration is increasingly Git-friendly, particularly since Directus v12.3 introduced environment sync via committed JSON.

But Payload still maps more naturally to how ONE wants to engineer this platform.

---

# 8. Core Comparison

| Capability              | Payload                                     | Directus                   | Preferred   |
| ----------------------- | ------------------------------------------- | -------------------------- | ----------- |
| Fully self-hosted       | Excellent                                   | Excellent                  | Tie         |
| PostgreSQL              | Excellent                                   | Excellent                  | Tie         |
| GCS                     | Excellent                                   | Excellent                  | Tie         |
| GKE                     | Excellent                                   | Excellent                  | Tie         |
| TypeScript              | Excellent                                   | Excellent                  | Tie         |
| Admin framework         | **React**                                   | Vue                        | **Payload** |
| Next.js                 | **Exceptional**                             | Excellent                  | **Payload** |
| Other frontends         | Good via APIs                               | **Excellent**              | Directus    |
| Local API               | **Yes**                                     | No equivalent              | **Payload** |
| REST                    | Yes                                         | Excellent                  | Tie         |
| GraphQL                 | Yes                                         | Excellent                  | Tie         |
| Code-first schemas      | **Excellent**                               | Improving                  | **Payload** |
| Environment Sync        | Good                                        | **Excellent**              | Directus    |
| Editorial UX            | **Excellent with Enterprise**               | **Excellent**              | Tie         |
| Collaborative editing   | Limited                                     | **Strong**                 | Directus    |
| Publishing workflow     | **Enterprise feature + extensible code**    | **Permissions + Flows**    | Tie         |
| AI out of box           | **Enterprise AI suite**                     | **Native AI Assistant**    | Tie         |
| A/B variant testing     | **Enterprise feature for Next.js delivery** | Custom/integration pattern | **Payload** |
| Enterprise SSO          | SAML / OAuth 2.0                            | Enterprise SSO             | Tie         |
| Vertex AI customization | **Excellent**                               | Good                       | Payload     |
| Design-system sharing   | **Excellent**                               | Good                       | Payload     |
| Forms                   | **Official plugin**                         | Custom pattern             | **Payload** |
| SEO                     | **Official plugin**                         | Custom                     | Payload     |
| Multi-tenant            | **Official plugin**                         | Custom pattern             | Payload     |
| Observability           | **Excellent**                               | Good                       | Payload     |
| License freedom         | **MIT core**                                | Commercial/MSCL model      | **Payload** |
| Existing ONE experience | New                                         | **Existing**               | Directus    |

---

# 9. Why Payload Customization Is Important

The biggest long-term risk is not:

> “Does the CMS have Feature X?”

The real risk is:

> “What happens when ONE needs Feature X and the vendor never designed it?”

Payload Enterprise now changes the build-versus-buy boundary. Publishing workflows, SSO, A/B variant testing, AI auto-embedding/RAG, and an AI suite for translation, image generation, and writing assistance are advertised enterprise capabilities. Because ONE already expects to procure Enterprise, they should be evaluated as product capabilities first—not automatically budgeted as custom builds.

Where ONE-specific policy remains, Payload can extend the packaged workflow with:

```text
TypeScript hook
+
React Admin component
+
custom endpoint
+
job
+
Pub/Sub event
```

That is close to ordinary application engineering.

Payload's official AI Agent Skill reflects this same architecture and covers collections, fields, hooks, access control, APIs, databases, jobs, localization and plugins.

The PoC and commercial process must therefore separate three categories:

1. **Enterprise product capability** — validate the vendor-delivered workflow, AI, SSO, A/B, audit, and support features.
2. **ONE configuration** — roles, country/locale policy, approval stages, notifications, prompts, and analytics integration.
3. **ONE custom extension** — only gaps such as exact Vertex gateway integration, specialized UI, migration controls, or downstream business rules.

The separate Enterprise Visual Editor is still explicitly marked **Coming Soon**. Payload Live Preview can be used now, but the Visual Editor must not be treated as a committed production dependency until delivery and contract scope are confirmed.

This matters after the Drupal experience because the objective should be:

> **Do not replace Drupal-specific complexity with another CMS-specific complexity layer.**

---

# 10. Directus Still Deserves Respect

Directus is not a weak comparison.

Directus v12 currently offers:

- redesigned Studio;
- native editorial workflows;
- AI translations;
- native MCP improvements;
- strong database APIs;
- strong permissions;
- collaborative editing.

And Directus v12.3 introduced proper Git-oriented Environment Sync:

```text
sync pull
sync diff
sync push
```

with committed JSON representing schema/config changes.

This makes Directus particularly strong for:

```text
generic data platform
database-heavy applications
framework-independent backend
low-code administration
collaborative editors
```

If Payload fails validation, reopen the platform decision using the Directus evidence already gathered. Do not treat Directus as automatically approved, and do not design a dual-CMS steady state.

---

# 11. React Is an Important Payload Advantage

ONE's frontend stack uses React/TypeScript.

Payload Admin also uses React.

Therefore:

```text
ONE Website
   React + TypeScript

ONE Design System
   React + TypeScript

Payload Custom Admin
   React + TypeScript
```

One ecosystem.

Directus custom Studio UI uses Vue.

That would create:

```text
Next.js frontend
→ React

CMS extensions
→ Vue
```

This is not inherently bad.

But heavy customization makes framework alignment increasingly valuable over several years.

---

# 12. Shared ONE Design System

Recommended structure:

```text
packages/
└── design-system/
    │
    ├── tokens/
    │   ├── colors.css
    │   ├── typography.css
    │   ├── spacing.css
    │   └── breakpoints.css
    │
    ├── theme/
    │   └── tailwind.css
    │
    ├── primitives/
    │   ├── Button.tsx
    │   ├── Heading.tsx
    │   ├── Container.tsx
    │   └── Stack.tsx
    │
    └── content/
        ├── Hero.tsx
        ├── CTA.tsx
        ├── CardGrid.tsx
        ├── Accordion.tsx
        └── RichText.tsx
```

Consumed by:

```text
apps/web
apps/cms
```

The website and CMS therefore share:

```text
design tokens
typography
spacing rules
component semantics
```

---

# 13. Live Preview

The CMS should not attempt to simulate the website.

The editor should preview:

```text
Payload Admin
      │
      ▼
actual Next.js application
      │
      ▼
actual ONE design-system component
```

Example:

```text
┌──────────────────────────┬──────────────────────────────┐
│ Payload Editor           │ ONE Website Preview          │
│                          │                              │
│ Hero Title               │ REAL HERO                    │
│ [Shipping Solutions]     │                              │
│                          │ Shipping Solutions           │
│ Variant                  │                              │
│ [Corporate ▼]            │ Actual website component     │
└──────────────────────────┴──────────────────────────────┘
```

This guarantees that editor preview and production rendering match.

---

# 14. Rich Text Governance

Articles should not be freeform page builders.

Allow:

```text
Paragraph
H2
H3
Bold
Italic
Link
Bullets
Numbered Lists
Quote
Approved Callout
Approved Image
```

Do not allow:

```text
H1
arbitrary colors
font sizes
raw CSS
raw HTML
custom embeds
```

The public application controls typography.

---

# 15. Payload Authoring Features

Payload supports mature versions/draft behavior including autosave.

The platform should provide:

```text
Draft
Autosave
Versions
Restore
Trash
Publish
Scheduled Publish
```

These should become part of the content-team demo.

---

# 16. Content Workflow

Initial enterprise model:

```text
Draft
   │
   ▼
In Review
   │
   ├──── Changes Requested
   │
   ▼
Approved
   │
   ▼
Ready to Publish
   │
   ├──── Scheduled
   │
   ▼
Published
   │
   ▼
Archived
```

Roles:

```text
Writer
Reviewer
Publisher
Translator
Administrator
```

Do not over-engineer this for the solo demo.

The demo only needs:

```text
Writer
Reviewer
Publisher
Admin
```

---

# 17. Authorization

Payload access rules can remain TypeScript.

This enables:

```text
Access Control
     ↓
Git
     ↓
PR
     ↓
Automated Tests
```

Example:

```text
Vietnam Writer
→ create/edit Vietnam drafts
→ cannot publish

Vietnam Publisher
→ publish approved Vietnam content

Global Admin
→ everything
```

This is preferable to allowing critical authorization policy to become unreviewed CMS configuration.

---

# 18. Google SSO

Production target:

```text
Google Workspace / Corporate IdP
             │
             ▼
            SSO
             │
             ▼
         Payload User
             │
             ▼
      ONE CMS Permissions
```

Groups:

```text
ONE-CMS-WRITER
ONE-CMS-REVIEWER
ONE-CMS-PUBLISHER
ONE-CMS-ADMIN
```

SSO itself does not need to be part of the solo demo.

It should be validated during the broader PoC.

---

# 19. Localization

Required initial locales could be:

```text
English
Vietnamese
Japanese
```

But the production design should support a larger global set.

Do not treat localization as merely:

```text
title.en
title.vi
title.ja
```

ONE needs translation state.

---

# 20. Translation Workflow

Recommended model:

```text
Translation

locale
sourceLocale
sourceVersion
translationStatus
translatedAt
translatedBy
reviewedAt
reviewedBy
```

Statuses:

```text
not_started
machine_translated
human_review
approved
published
outdated
```

Example:

```text
English
Published

Vietnamese
Approved

Japanese
Machine Translated
```

English changes.

System marks:

```text
Vietnamese → OUTDATED
Japanese   → OUTDATED
```

This is more useful than relying entirely on generic localized-field behavior.

---

# 21. Enterprise AI Is Current Scope

Because ONE plans to procure Payload Enterprise, AI translation, image generation, writing assistance, and RAG/auto-embedding are part of the current target platform scope. They are not deferred roadmap ideas and should not be estimated as custom UI before Payload demonstrates the Enterprise product.

The remaining uncertainty is validation, not whether AI belongs in the plan: ONE has not yet contacted Payload for the enterprise demonstration or confirmed the contract. The PoC and procurement process must verify permissions, tenant isolation, audit, model choice, regionality, data handling, cost controls, and human approval.

Use the Enterprise capability first:

```text
Payload Enterprise AI
   │
   ├── translation
   ├── writing assistance
   ├── image generation
   └── RAG / auto-embedding
```

Add a ONE-controlled Vertex path only where the Enterprise product does not meet a specific requirement:

```text
Payload
   │
   ▼
ONE AI Gateway
   │
   ├── Auth
   ├── Permissions
   ├── Prompt Registry
   ├── Audit
   ├── Model Armor
   └── Structured Output Validation
   │
   ▼
Vertex AI
   │
   ▼
Gemini
```

Workflow:

```text
English
   ↓
AI Translate
   ↓
Vietnamese Draft
status = machine_translated
   ↓
Human Review
   ↓
Published
```

Enterprise AI is the baseline capability. Vertex AI is an optional extension for ONE-specific IAM, models, regionality, prompt governance, telemetry, or safety controls—not a prerequisite for saying the platform has AI today.

---

# 22. AI Design Governance

AI follows exactly the same design restrictions as human editors.

Allowed:

```json
{
  "type": "hero",
  "variant": "corporate"
}
```

Not allowed:

```json
{
  "type": "cool-ai-banner",
  "background": "#ff00ff",
  "css": "..."
}
```

Principle:

> **AI may compose approved content structures. AI may not invent design primitives.**

---

# 23. Forms

Payload has an official Form Builder, which is valuable because the CMS can manage field definitions while ONE controls rendering.

Example:

```text
Contact Form

Name
Email
Company
Country
Message
Consent
```

Architecture:

```text
Payload
→ form schema

Next.js
→ actual React form
→ ONE design system
```

This prevents CMS-generated forms from looking different from the rest of the website.

---

# 24. SEO

Recommended schema:

```text
metaTitle
metaDescription
canonical
robots
OpenGraph
Twitter/X
JSON-LD
hreflang
sitemap settings
```

Also maintain:

```text
slug history
redirects
```

Example:

```text
/news/old-name
      ↓
301
      ↓
/news/new-name
```

Payload has official SEO-oriented tooling, reducing custom implementation.

---

# 25. Multi-Tenant / Multi-Site

Payload provides an official multi-tenant plugin supporting tenant relationships, Admin tenant switching, list filtering, relationship filtering and tenant assignment.

Possible ONE model:

```text
Global
Vietnam
Japan
Europe
Campaign Site A
Campaign Site B
```

Each tenant/site may have:

```text
domain
locales
navigation
SEO defaults
editor permissions
publishing team
```

---

# 26. Database Architecture

Target:

```text
Payload
   │
   ▼
Cloud SQL PostgreSQL
```

Payload's migrations are stored as TypeScript files with explicit `up` and `down` logic.

Therefore schema changes can follow:

```text
Developer
   ↓
Git Branch
   ↓
PR
   ↓
Migration
   ↓
DEV
   ↓
STAGE
   ↓
PROD
```

This aligns strongly with Git as the source of truth.

---

# 27. Environment Synchronization

Separate:

### Schema/config synchronization

from:

### Content synchronization.

Payload:

```text
TypeScript config
+
migrations
+
Git
```

handles schema/config.

Reference data such as:

```text
countries
taxonomy
navigation templates
site settings
```

can use an internal utility:

```text
cms seed
cms export
cms diff
cms import
```

This is small enough to build ourselves.

---

# 28. Directus Environment Sync

Directus deserves specific credit here.

Directus v12.3 can now:

```text
sync pull
sync diff
sync push
```

schema/configuration through committed JSON files.

This is probably one of Directus' strongest advantages over Payload today in terms of packaged environment management.

For ONE, however:

```text
Payload code + migrations
```

is acceptable and arguably more aligned with developer-owned configuration.

---

# 29. Storage

Target:

```text
Payload
   │
   ▼
GCS
```

Use separate buckets or prefixes for:

```text
public assets
private assets
migration staging
```

Production controls:

```text
IAM
object versioning
retention
lifecycle
malware scanning
signed URLs
```

---

# 30. Search

Keep Elasticsearch initially.

Do NOT combine:

```text
Drupal → Payload migration
```

with:

```text
Elasticsearch → completely new search platform
```

unless there is a strong reason.

Target:

```text
Payload Publish
       │
       ▼
     Pub/Sub
       │
       ▼
Search Indexer
       │
       ▼
Elasticsearch
```

If Elasticsearch is temporarily down:

```text
publishing succeeds
indexing retries
```

---

# 31. Enterprise RAG and Optional Extensions

Payload Enterprise AI auto-embedding and RAG are in the current target scope. Validate the vendor-delivered indexing, chunking, permissions, storage, refresh, deletion, and retrieval behavior before designing a parallel custom pipeline.

If ONE later needs a separate search or model boundary, use the same published-content events to feed an optional external path:

```text
Payload
  │
  │ content.published
  ▼
Pub/Sub
  │
  ├──────────────────┐
  ▼                  ▼
Elasticsearch      RAG Pipeline
                      │
                      ├── chunk
                      ├── metadata
                      └── embedding
                              │
                              ▼
                         Vertex AI
```

Possible extension stores:

```text
Elasticsearch
Vertex AI Search
Vertex AI Vector Search
pgvector
```

Do not make the CMS dependent on one.

---

# 32. Cache Architecture

Simplify aggressively.

Target:

```text
User
 ↓
Cloudflare
 ↓
Next.js
 ↓
Payload
```

Useful cache layers:

```text
Cloudflare edge cache
Next.js application cache / PPR
```

Do not automatically introduce:

```text
Varnish
Redis cache
Google CDN
another reverse proxy
```

unless measurements justify them.

---

# 33. Cache Invalidation

On publish:

```text
Payload
  │
  ▼
Pub/Sub
  │
  ├───────────────┐
  ▼               ▼
Next.js         Cloudflare
revalidate      cache purge
```

Possible tags:

```text
article:123
articles
page:456
navigation:en
locale:en
site:global
```

---

# 34. Feature Flags

Keep LaunchDarkly.

CMS:

```text
"What content exists?"
```

LaunchDarkly:

```text
"Who should see functionality?"
```

Do not turn Payload into a feature-flag platform.

---

# 35. Observability

Observability is a first-class requirement.

Build:

```text
packages/
└── observability/
    ├── logger.ts
    ├── tracing.ts
    ├── metrics.ts
    └── audit.ts
```

Structured event example:

```json
{
  "severity": "ERROR",
  "service": "cms",
  "environment": "prod",
  "requestId": "...",
  "traceId": "...",
  "userId": "...",
  "collection": "articles",
  "documentId": "123",
  "operation": "publish",
  "gitSha": "..."
}
```

Production:

```text
OpenTelemetry
      │
      ├── Cloud Logging
      ├── Cloud Trace
      └── Cloud Monitoring
```

---

# 36. Why Payload Helps Debugging

Payload is our application.

Therefore we can trace:

```text
Payload request
     │
     ├── authorization
     ├── validation
     ├── Cloud SQL
     ├── GCS
     ├── Pub/Sub
     ├── Elasticsearch
     └── Vertex
```

A support request:

> “Article 123 failed to publish.”

should become:

```text
documentId=123
```

in Cloud Logging.

No hunting through unrelated CMS logs and caching infrastructure.

---

# 37. Audit Trail

Payload Enterprise includes Activity Logs plus revisions/version control. Treat that as the current product baseline, subject to the vendor demonstration and contract confirmation—not as custom functionality ONE must build from scratch.

The repository's custom `EditorialActivities` collection is narrower demo evidence. It does not replace validation of the Enterprise Activity Log or ONE's production requirements for append-only retention, immutability, export, SIEM integration, tenant scope, and actor/request metadata.

Audit logging answers:

```text
Who changed what?
```

Operational logging answers:

```text
Why did it fail?
```

Required audit events:

```text
LOGIN
CONTENT_CREATED
CONTENT_UPDATED
CONTENT_REVIEWED
CONTENT_APPROVED
CONTENT_PUBLISHED
CONTENT_DELETED
ROLE_CHANGED
AI_TRANSLATION_REQUESTED
MCP_WRITE
```

Keep audit retention separate from normal application logs.

---

# 38. Backup / Restore

Authoritative systems:

```text
Cloud SQL
GCS
Git
```

Cloud SQL:

```text
HA
PITR
automated backups
restore testing
```

GCS:

```text
object versioning
retention
lifecycle
```

Git:

```text
schema
migrations
access rules
components
integrations
infrastructure
```

Derived systems:

```text
Elasticsearch
RAG vectors
cache
```

must always be rebuildable.

---

# 39. Drupal and Payload Coexistence Is a Must-Have

The migration should be gradual, and the existing frontend already proves that a mixed estate is possible: some routes are Next.js pages while some legacy Drupal pages are embedded through iframes.

Not:

```text
Drupal
  ↓
Big migration weekend
  ↓
Hope everything works
```

During migration, Next.js becomes the controlled route resolver for both sources:

```text
Request
  │
  ▼
Next.js route ownership
  ├── Payload content / components
  ├── Drupal content adapter
  └── tracked Drupal iframe route
```

This dual-source frontend is temporary but intentional. Route ownership is explicit, so a page or content item is never freely editable in both CMSs. As each migration wave is accepted, Next.js switches that route group to Payload and the corresponding Drupal adapter, iframe, delta feed, and reconciliation job are removed.

---

# 40. Use the Lightest Safe Migration Method

Not every content group needs continuous synchronization.

For simple pages and existing iframe routes:

```text
copy / transform
      ↓
preview and QA
      ↓
switch route ownership
      ↓
monitor, then remove Drupal connection
```

For high-change collections such as global and local news, use a baseline import plus one-way deltas and reconciliation while Drupal remains authoritative:

```text
Scheduled Job
    │
    ▼
Drupal JSON:API
    │
    ▼
changed since watermark
    │
    ▼
compare hash/revision
    │
    ▼
repair differences
```

Therefore the rule is:

```text
page-oriented content → direct route cutover
high-change collections → baseline + delta + reconciliation
forms → form-by-form rebuild and acceptance
```

This avoids building a universal sync platform for content that can be migrated safely one page at a time.

---

# 41. Migration Lanes

Keep the plan understandable by grouping the estate into three lanes:

1. **Pages** — global static pages, global dynamic pages, local pages, and existing Drupal global/local pages move route by route. Existing iframe delivery can remain as a tracked bridge until each route is rebuilt and accepted.
2. **News** — global and local news move as repeatable collection migrations, using bulk import plus deltas where editors continue publishing during coexistence.
3. **Forms** — Drupal forms move form by form because behavior, consent, validation, notifications, uploads, and integrations must be accepted end to end before traffic switches.

Inventory and dependencies determine the order inside each lane. The management story should remain simply: pages first where low risk, repeatable news waves next, and forms only when their complete behavior is proven.

---

# 42. Source of Truth and Frontend Routing Rule

Next.js may read from both CMSs during coexistence, but every route or content item has exactly one authoritative CMS at a time.

Example:

```text
/about-us
→ Payload

/local/legacy-service
→ Drupal iframe

Global news
→ Drupal until the collection wave cuts over
```

Never:

```text
News Article 123
→ freely editable in BOTH
```

That creates conflict-resolution complexity.

The route-ownership registry should record `drupal`, `drupal_iframe`, `payload`, or `retired`, plus the migration wave and rollback window. A frontend capable of reading both systems does not imply blended ownership or bidirectional editing.

---

# 43. Migration Metadata

Store:

```text
legacySystem
legacyDrupalUUID
legacyRevision
legacyUpdatedAt
migrationVersion
migrationHash
sourceOwnership
deliveryMode
routeGroup
cutoverAt
```

This makes migration operations idempotent and debuggable.

---

# 44. Migration Ledger

Create:

```text
migration_records
```

Fields:

```text
sourceUUID
sourceType
sourceRevision
targetCollection
targetID
status
lastAttempt
lastSuccess
error
contentHash
```

States:

```text
pending
synced
failed
skipped
cutover
connection_retired
```

---

# 45. Migration Phases

## Phase 0 — Inventory

Inventory:

```text
nodes
paragraphs
taxonomies
media
forms
translations
redirects
users
roles
custom modules
Elasticsearch mappings
current Next.js route ownership
Drupal adapters and iframe routes
```

Classify:

```text
migrate
redesign
archive
delete
```

---

## Phase 1 — Target Content Model

Design Payload for the future architecture.

Do not reproduce every historic Drupal abstraction.

---

## Phase 2 — Migrate by Lane

```text
Pages  → route-by-route copy, rebuild, preview, and QA
News   → bulk import plus selective deltas and reconciliation
Forms  → form-by-form rebuild and end-to-end acceptance
```

---

## Phase 3 — Dual-Source Frontend

Next.js serves Payload routes and Drupal routes at the same time. Existing Drupal iframe routes remain explicitly registered and observable.

Drupal remains authoritative only for the route groups and collections that have not yet cut over. Payload preview URLs are available for migrated candidates before traffic changes.

---

## Phase 4 — Validate Each Wave

Compare:

```text
record counts
content hashes
translations
media
relationships
URLs
SEO
route behavior
iframe replacement parity
form behavior and integrations
```

---

## Phase 5 — Cut Over Route Groups

Example:

```text
low-risk pages
      ↓
repeatable global/local news waves
      ↓
remaining dynamic and legacy pages
      ↓
forms after full acceptance
```

For each accepted wave, switch the Next.js route registry to Payload, monitor the rollback window, then remove that wave's Drupal adapter, iframe, event feed, and reconciliation scope.

---

## Phase 6 — Retire Connections Incrementally

Payload becomes authoritative wave by wave.

Drupal remains available temporarily for routes not yet migrated and for the agreed rollback/history period. There is no need to wait for the final site-wide cutover before retiring completed connections.

---

## Phase 7 — Decommission

Remove:

```text
Drupal
Acquia
Varnish
legacy Drupal modules
legacy sync pipeline
```

---

# 46. Payload Agent Skills

Payload now maintains an official Agent Skills repository.

Installation:

```bash
npx skills add payloadcms/skills
```

Current official Skills include:

### `payload`

Guidance covering:

```text
collections
fields
hooks
access control
queries
REST
GraphQL
Local API
database adapters
jobs
localization
plugins
```

### `cms-migration`

Guidance for:

```text
source data analysis
field mapping
relationship mapping
collection design
migration strategy
rich-text decisions
```

These are useful for ONE's developer-agent workflow.

They should be treated as engineering productivity tools, not core CMS requirements.

---

# 47. MCP

Payload's MCP integration provides another useful development/automation surface.

Production agents should be explicitly restricted.

For example:

```text
READ       ✓
SEARCH     ✓
CREATE     ✓
UPDATE     ✓
PUBLISH    ✕
DELETE     ✕
ROLE WRITE ✕
```

MCP never bypasses normal application authorization.

---

# 48. Cost

Cost must include:

```text
Vendor
+
GCP
+
Engineering
+
Migration
+
Maintenance
+
Upgrades
+
Operations
+
Exit Cost
```

---

# 49. Payload Cost Position

Payload core remains MIT.

That gives ONE an unusually strong long-term position:

```text
Self-host core
→ no mandatory license cost

Enterprise features/support
→ optional commercial contract
```

Potential recurring infrastructure cost:

```text
GKE
Cloud SQL
GCS
Cloudflare
Vertex
Elasticsearch
```

These are technologies ONE already operates or intends to use.

---

# 50. Directus Cost Position

Directus Core has limited free usage, while Team and Enterprise plans carry commercial pricing.

The current public Team plan is `$499/month` annually, while Enterprise is custom priced and includes features such as custom SSO/LLM/AI translations depending on contract.

For an organization like ONE:

> Assume Directus Enterprise rather than the free tier.

---

# 51. Financial Interpretation

Payload's potential advantage:

```text
lower mandatory license dependency
lower exit risk
reuse existing engineering stack
```

Directus' potential advantage:

```text
less custom editorial engineering
existing team knowledge
more turnkey collaboration
```

Therefore finance should eventually compare:

```text
3-year TCO
5-year TCO
```

after enterprise quotes are obtained.

---

# 52. Enterprise Support

Payload Enterprise should be evaluated for:

```text
P1 response time
24/7 support
named engineer
Slack/Teams channel
architecture review
upgrade help
security response
LTS policy
GKE support
Cloud SQL support
GCS support
DEV/STAGE licensing
DR licensing
```

Do not assume undocumented SLA numbers.

Get them contractually.

---

## 52.1 Payload Enterprise and Customer Evidence

[Payload Enterprise](https://payloadcms.com/enterprise) includes dedicated engineering support, publishing workflows, SSO, A/B variant testing, enterprise AI capabilities, audit/version controls, roadmap influence, and continued self-hosting in ONE's current target plan. AI is therefore treated as an Enterprise capability we have selected, not a hypothetical future add-on. ONE has not yet contacted Payload for the enterprise demonstration, so exact adapters, limits, licensing, self-host rights, SLA, and supported versions still need written confirmation.

Important status distinctions:

- [Publishing Workflows](https://payloadcms.com/enterprise/publishing-workflows) describes multi-step approvals, access control, alerts, notifications, and extensibility.
- [Single Sign-On](https://payloadcms.com/enterprise/single-sign-on-sso) describes SAML/OAuth 2.0 integration with providers including Google, Azure, and Okta.
- [Headless A/B Variant Testing](https://payloadcms.com/enterprise/headless-ab-variant-testing) describes variant delivery with Next.js; the performance outcomes on the page are vendor claims, not ONE forecasts.
- [Enterprise AI Framework](https://payloadcms.com/enterprise/ai-framework) describes RAG, automatic embeddings, vector indexes in the database, and configurable chunking.
- [Enterprise AI](https://payloadcms.com/enterprise/enterprise-ai) provides the current planning baseline for AI translation, AI image generation, an AI writing assistant, and granular permission/access control. These are Enterprise capabilities to configure and validate—not custom-only features and not a future phase.
- [Visual Editor](https://payloadcms.com/enterprise/visual-editor) is explicitly marked **Coming Soon**. Payload Live Preview exists today, but this separate Enterprise feature is roadmap evidence only.

Decision implication:

> Payload still fits our code-first extension model, but Enterprise AI is already in the target scope and may materially reduce the amount of AI UI we need to build. Contact Payload for the demonstration, validate the included behavior, and estimate custom engineering only for confirmed gaps or optional Vertex integration.

The [Payload case-study index](https://payloadcms.com/case-studies) provides useful adoption signals. Two especially relevant examples are:

- [Mazda New Zealand](https://payloadcms.com/case-studies/mazda), where the vendor reports 85% annual-cost reduction and 3–5× faster time to market, alongside stronger design-system/Figma alignment.
- [Microsoft](https://payloadcms.com/case-studies/microsoft), where the published AI Tips/Designer workload emphasizes code-first extensibility, data ownership, self-hosting, and dedicated support.

These results are vendor-published workload evidence, not independently verified benchmarks and not transferable estimates for ONE.

## 52.2 Directus Enterprise and Customer Evidence

[Directus Enterprise](https://directus.com/enterprise) describes self-hosted/on-premises/cloud/air-gapped deployment, field-level policies, activity/audit controls, enterprise onboarding, SLAs, and AI actions governed by platform permissions and audit. Security must validate the applicable Trust Center evidence and contract scope.

Relevant customer examples:

- [Club Med](https://directus.com/resources/how-directus-helped-a-global-luxury-travel-leader-unify-its-cms-stack) describes a global organization replacing fragmented CMS solutions. The published design deliberately used separate Directus instances for use cases with different data structures, permissions, rhythms, and users. This is a useful warning against assuming that governance centralization always requires one physical project.
- [Ripley Entertainment](https://directus.com/resources/ripley-entertainment) describes consolidating a WordPress multisite estate for more than 100 attractions in 10 countries, with multilingual content and granular roles. The reported conversion and engagement improvements are vendor claims.
- [Fortuna Entertainment Group](https://directus.com/resources/fortuna-entertainment-group) describes one CMS serving web and mobile across five countries and three brands. The reported 70% faster content creation/deployment is vendor-published.

These references strengthen Directus as a serious candidate. They do not create a Directus fallback architecture or remove the need to validate ONE-specific tenancy, GCP, workflow, forms, Vertex AI, and migration requirements.

---

# 53. When Directus Could Win the Final Selection

Directus should be compared again if Payload fails one of these critical gates:

```text
Editor UX unacceptable
Translation workflow excessively custom
Payload upgrade too painful
Enterprise support insufficient
GKE/Cloud SQL architecture problematic
Performance unacceptable
Custom Admin code proves fragile
```

Otherwise there is little reason to spend engineering time maintaining two PoCs.

---

# 54. Figma Ownership

Payload joined Figma in 2025.

This should be treated as **strategic confidence/upside**, not a reason by itself to choose Payload.

The potentially valuable implications for ONE are:

```text
continued investment
design-system focus
editor UX investment
closer design → code → content workflows
```

The important architectural protection remains:

```text
Payload remains self-hostable
+
Payload core remains open-source
+
ONE owns data
+
ONE owns infrastructure
```

---

# 55. Payload 4.0

Payload 4.0 should be placed in a separate roadmap section.

Do not base the production decision on it.

Current announced areas include:

```text
Admin redesign
stronger design-system architecture
semantic styling tokens
better theming
better Tailwind compatibility
MCP improvements
Payload Skills
hierarchies
DAM improvements
framework adapters
early TanStack support
```

Payload explicitly says these remain active work, with some still being explored.

---

# 56. Why Payload 4.0 Is Still Relevant

Payload 4.0 directly targets several areas that matter to ONE:

### Admin UX

Better editor experience.

### Tailwind/theming

Easier alignment with ONE's design system.

### MCP

Better agent integration.

### Framework adapters

Reduced long-term Next.js coupling.

### DAM

Better asset-management experience.

But these are:

> **roadmap upside**

not:

> **current PoC acceptance criteria.**

---

# 57. Upgrade Strategy

Upgradeability is a must-have.

Payload now maintains explicit major-version migration guides, including a 3.x → 4.x path in its current documentation tree.

Policy:

```text
Security patch
→ ASAP

Patch
→ frequently

Minor
→ regular cadence

Major
→ planned migration
```

---

# 58. Automated Upgrade Test

Every CMS upgrade runs:

```text
typecheck
lint
unit tests
integration tests
database migration tests
RBAC tests
Playwright CMS tests
frontend E2E
visual regression
localization tests
Drupal migration regression
```

This is how ONE prevents:

```text
"we customized so much we cannot upgrade anymore"
```

from happening again.

---

# 59. Initial Weighted Evaluation

This weighting intentionally reflects ONE's priorities.

Scores are out of 5.

| Criterion                        | Weight | Payload | Directus |
| -------------------------------- | -----: | ------: | -------: |
| Self-hosting / ownership         |    12% | **5.0** |      5.0 |
| Code-first customization         |    13% | **5.0** |      4.1 |
| React / engineering alignment    |     9% | **5.0** |      3.8 |
| Design governance                |     9% | **5.0** |      4.3 |
| Cost / licensing / exit risk     |     8% | **4.9** |      3.7 |
| GCP integration                  |     8% | **5.0** |      5.0 |
| Git / deployment model           |     7% | **4.8** |      4.8 |
| Editorial capabilities           |     7% |     4.3 |  **4.8** |
| Localization / translation       |     5% |     4.4 |  **4.7** |
| Security / authorization / audit |     5% |     4.9 |      4.9 |
| Forms / SEO                      |     4% | **4.9** |      4.1 |
| AI / MCP / agents                |     4% |     4.9 |      4.9 |
| Drupal migration                 |     4% | **4.9** |      4.8 |
| Enterprise/support               |     3% |     4.5 |  **4.7** |
| Existing ONE familiarity         |     2% |     3.0 |  **5.0** |

### Approximate weighted result

```text
Payload   ≈ 4.83 / 5
Directus  ≈ 4.50 / 5
```

---

# 60. Why Payload Wins This Score

Payload does not win because it has more CMS features.

Directus currently beats Payload in several areas.

Payload wins because ONE places unusually high importance on:

```text
Code customization
React
TypeScript
Design-system governance
Self-hosting
MIT licensing
GCP ownership
Observability
Git
```

Those are precisely Payload's strongest areas.

---

# Part II — Solo Payload Demo Plan

# 61. Purpose of the Solo Demo

The demo is **not yet the full PoC**.

Its purpose is:

> **Validate that Payload works the way we expect before asking other developers, QA, BA and content users to invest time.**

It should answer:

```text
Can we self-host it?
Can CMS and frontend be separated?
Can we heavily customize it?
Can we strictly control design?
Can we migrate Drupal content?
Can we debug it properly?
Can we upgrade it safely?
```

Do not attempt to implement every enterprise feature.

---

# 62. Solo Demo Scope

Build:

```text
ONE Payload Demo

apps/
├── cms
└── web

packages/
├── design-system
├── content-model
├── observability
└── migration
```

Infrastructure:

```text
Docker Compose
└── PostgreSQL
```

No GKE yet.

No Cloud SQL yet.

No production SSO yet.

No full AI suite.

---

# 63. Demo Architecture

```text
                 localhost

        ┌─────────────────────┐
        │     Next.js Web     │
        │   localhost:3000    │
        └─────────┬───────────┘
                  │
              REST/API
                  │
        ┌─────────▼───────────┐
        │      Payload CMS    │
        │ localhost:3001      │
        │ /admin              │
        └─────────┬───────────┘
                  │
                  ▼
            PostgreSQL
```

Using REST for the demo intentionally proves:

```text
frontend != CMS runtime
```

Local API can be demonstrated separately as an optimization.

---

# 64. Demo Content Model

Only build:

```text
Article
Landing Page
Media
Form
Site
Translations
Users
```

Do not build the full future content model.

---

# 65. Demo Article

Fields:

```text
title
slug
excerpt
heroImage
body
category
SEO
status
translations
```

Demonstrate:

```text
draft
autosave
version
publish
restore
trash
```

---

# 66. Demo Landing Page

Blocks:

```text
Hero
TextImage
CardGrid
CTA
Accordion
```

Allowed Hero settings:

```text
variant:
corporate
image
minimal

alignment:
left
center
```

No arbitrary design fields.

---

# 67. Demo Design System

Create:

```text
packages/design-system
```

with:

```text
tokens.css
typography.css

Button.tsx
Heading.tsx
Hero.tsx
CardGrid.tsx
CTA.tsx
RichText.tsx
```

Import tokens/components into the public site.

Use the same tokens/custom UI inside Payload Admin.

---

# 68. Demo Strict CSS Test

Show the manager:

> Editor wants a pink hero with 97px padding.

There is simply no UI to configure it.

Payload only accepts:

```text
corporate
image
minimal
```

This provides a very simple visual demonstration of governance.

---

# 69. Demo Rich Text

Configure Lexical with only:

```text
Paragraph
H2
H3
Bold
Italic
Link
Lists
Quote
```

No:

```text
color
font
font-size
H1
raw HTML
CSS
```

Show that the website controls rendering.

---

# 70. Demo Live Preview

This is worth implementing.

Editor changes:

```text
Hero:
Corporate
→ Image
```

Actual Next.js preview updates.

This visually proves:

```text
CMS content
+
ONE code
=
actual website
```

---

# 71. Demo Custom Admin Component

Build one custom React component.

Recommended:

```text
ONE Content Quality
────────────────────────

✓ Title
✓ Hero Image
⚠ Missing Meta Description
✓ Alt Text

English      Published
Vietnamese   Outdated
Japanese     Draft
```

This validates:

> Payload customization feels like normal React.

---

# 72. Demo Authorization

Create:

```text
Writer
Publisher
Admin
```

Test:

```text
Writer:
edit draft
cannot publish

Publisher:
publish

Admin:
everything
```

Write access rules in TypeScript.

Write at least one automated authorization test.

---

# 73. Demo Localization

Locales:

```text
en
vi
ja
```

Show:

```text
English
Published

Vietnamese
Review

Japanese
Draft
```

Update English.

Mark:

```text
Vietnamese
Outdated
```

This proves the translation model.

---

# 74. Demo AI Translation

Payload Enterprise AI is already part of the target platform plan. It does not need to be reimplemented in the solo repository demo before ONE has contacted Payload and seen the enterprise demonstration.

A local proof remains optional and only useful if time remains.

Button:

```text
[Translate → Vietnamese]
```

can initially even use a mocked response.

If using real AI:

```text
Payload
 ↓
simple local AI endpoint
 ↓
Vertex Gemini
```

Do not build:

```text
AI assistant
RAG
agent editor
full SEO AI
```

yet.

This solo-demo exclusion is not a product-gap claim. The separate enterprise evaluation should demonstrate the included AI translation, writing assistant, image generation, and RAG/embedding capabilities against ONE roles, locales, audit, and optional Vertex-extension requirements.

---

# 75. Demo Form

Create:

```text
Contact Form

Name
Email
Country
Message
Consent
```

Payload controls schema.

Next.js renders:

```text
@one/design-system
```

Submission returns to Payload/PostgreSQL.

---

# 76. Demo Multi-Site

Sites:

```text
Global
Vietnam
Japan
```

Associate content with tenant/site.

At minimum demonstrate:

```text
Vietnam content
Japan content
```

being separated.

Advanced permissions can wait for the full PoC.

---

# 77. Demo SEO

Implement:

```text
meta title
meta description
canonical
OpenGraph image
robots
```

Optional:

```text
slug history → redirect
```

---

# 78. Demo Structured Logging

Build:

```text
packages/observability
```

Logger output:

```json
{
  "severity": "INFO",
  "event": "content.updated",
  "documentId": "123",
  "userId": "..."
}
```

And failure:

```json
{
  "severity": "ERROR",
  "event": "content.publish_failed",
  "documentId": "123",
  "requestId": "..."
}
```

Locally this goes to stdout.

Production destination later:

```text
Cloud Logging
```

---

# 79. Demo Audit Event

On publication:

```text
audit_events
```

record:

```text
user
action
collection
document
timestamp
```

Example:

```text
Klaus
PUBLISH
articles
article-123
14:32
```

No sophisticated audit UI needed yet.

---

# 80. Demo Drupal Migration

This is mandatory.

Do not use the real production Drupal yet if access is complicated.

Take representative JSON/API payloads.

Sample:

```text
10 articles
3 languages
images
taxonomy
redirects
```

Build:

```text
packages/migration
```

Pipeline:

```text
Drupal JSON
    │
    ▼
Transform
    │
    ▼
Payload REST / Local API
```

---

# 81. Demo Migration Mapping

Track:

```text
legacyDrupalUUID
legacyRevision
migrationHash
```

so running the migration twice results in:

```text
UPDATE existing item
```

instead of duplicate creation.

This proves idempotency.

---

# 82. Demo Realtime Drupal Sync

If practical, add a tiny Drupal hook.

On Drupal update:

```text
Drupal
 ↓
HTTP webhook
 ↓
local migration endpoint
 ↓
Payload
```

For solo demo purposes, Pub/Sub is optional.

You can simulate it locally.

Full architecture later:

```text
Drupal
 ↓
Pub/Sub
 ↓
Worker
 ↓
Payload
```

---

# 83. Demo Reconciliation

Build a command:

```text
pnpm migration:reconcile
```

It:

```text
reads Drupal changed records
compares revision/hash
upserts missing changes
```

Demonstrate:

1. Disable webhook.
2. Update Drupal.
3. Payload becomes stale.
4. Run reconciliation.
5. Payload is repaired.

This is an excellent migration demo.

---

# 84. Demo Search Integration

Do not configure real Elasticsearch unless convenient.

Show an abstraction:

```text
content.published
 ↓
SearchIndexer
```

with either:

```text
mock
```

or existing test Elasticsearch.

The important architecture:

```text
publish != search transaction
```

Search failure must not block publishing.

---

# 85. Demo Cache Invalidation

Again, local/mock is enough.

On publish:

```text
content.published
      │
      ├── revalidate frontend
      └── cache purge event
```

No need to deploy Cloudflare API integration yet.

Just prove the event architecture.

---

# 86. Demo MCP

Install:

```bash
npx skills add payloadcms/skills
```

Configure Payload MCP if it remains quick.

Demonstrate an agent:

```text
read Article 123
create draft Article
update draft Article
```

Do not give it unrestricted production permissions.

---

# 87. Demo Payload Skills

Use the official `payload` Skill while writing the demo.

Also test the `cms-migration` Skill against your Drupal sample.

The migration Skill explicitly guides source analysis, schema mapping, relationships and import strategy.

This can become one of the engineering-manager demo points:

> The vendor is actively providing agent instructions for correct Payload development.

---

# 88. Demo Upgrade Test

This is mandatory even for the solo demo.

After completing custom functionality:

```text
Payload current stable
       ↓
next stable patch/minor
```

Run:

```text
pnpm typecheck
pnpm lint
pnpm test
pnpm test:e2e
```

Verify:

```text
Custom Admin works
Design system works
Migration works
Permissions work
Preview works
```

If this small demo is already painful to upgrade:

> Stop and investigate before proceeding.

---

# 89. What NOT to Build in Solo Demo

Explicitly exclude:

```text
❌ GKE deployment
❌ Terraform
❌ Cloud SQL HA
❌ full GCS infrastructure
❌ Google SSO
❌ complete workflow engine
❌ every locale
❌ full Drupal migration
❌ Elasticsearch production integration
❌ Cloudflare production purge
❌ RAG
❌ AI Assistant
❌ Model Armor
❌ full OpenTelemetry
❌ enterprise SLA validation
❌ full disaster recovery
```

Those belong in the team PoC or implementation phase.

The solo demo uses the repository implementation and does not require an Enterprise license. Procurement due diligence must separately demonstrate the advertised Enterprise workflow, AI, SSO, A/B testing, audit/support, and Visual Editor roadmap before the team estimates production custom work.

---

# 90. Solo Demo Success Criteria

Payload passes if:

### Architecture

```text
✓ Fully local/self-hosted
✓ CMS and web separated
✓ PostgreSQL owned locally
✓ API boundary clean
```

### Development

```text
✓ React customization feels normal
✓ TypeScript types are useful
✓ Access rules are testable
✓ Git controls schema changes
```

### Design

```text
✓ Editor cannot create arbitrary styling
✓ Shared ONE tokens work
✓ Live preview matches production renderer
```

### Editorial

```text
✓ Draft/autosave/version workflow usable
✓ Article editing comfortable
✓ Translation workflow achievable
✓ Forms workable
```

### Migration

```text
✓ Drupal JSON can be transformed
✓ Updates are idempotent
✓ Realtime sync concept works
✓ Reconciliation repairs missed events
```

### Operations

```text
✓ Structured logs straightforward
✓ Errors traceable
✓ Upgrade succeeds cleanly
```

---

# 91. Solo Demo Failure Criteria

Stop or reconsider Payload if:

```text
Admin customization requires undocumented hacks
```

or:

```text
Shared design-system integration becomes fragile
```

or:

```text
Translation lifecycle is extremely complicated
```

or:

```text
Payload upgrade breaks substantial custom functionality
```

or:

```text
Separating web and CMS produces unreasonable complexity
```

or:

```text
Drupal migration is unexpectedly difficult due to Payload APIs
```

If one of those appears fundamental rather than fixable:

> Reopen the platform decision and evaluate Directus against the failed gate.

---

# 92. After the Solo Demo

If successful, expand to the actual team PoC.

Team involvement:

```text
Developers
QA
BA
Content Writers
Platform/Cloud
Security
```

The broader PoC adds:

```text
GKE
Cloud SQL
GCS
Google SSO
Cloud Logging/Trace
actual Elasticsearch
Cloudflare purge
Payload Enterprise AI demonstration
optional Vertex AI extension proof
real Drupal staging
performance testing
security testing
editor usability testing
enterprise support validation
```

---

# 93. Suggested Team PoC Architecture

```text
                        Cloudflare
                            │
                            ▼
                      GCP Load Balancer
                            │
                  ┌─────────┴─────────┐
                  ▼                   ▼
               Website              CMS
                 GKE                GKE
                  │                   │
                  │       ┌───────────┼──────────┐
                  ▼       ▼           ▼          ▼
             Cloud SQL    GCS      Pub/Sub    Vertex
                                       │
                              ┌────────┴──────────┐
                              ▼                   ▼
                        Elasticsearch        Integrations
```

Plus real Drupal coexistence.

---

# 94. Roadmap Upside — Payload 4

This belongs at the end of the report, not at the center.

Payload 4.0 currently targets:

```text
Admin redesign
better design system
semantic styling tokens
better Tailwind support
better theming
improved MCP
Payload Skills
hierarchies
better DAM
framework adapters
early TanStack support
```

The most interesting ones for ONE are:

```text
Admin UX
Tailwind theming
design-system architecture
MCP
framework independence
DAM
```

But:

> **Payload must pass the demo using stable capabilities today.**

Payload 4 is upside.

---

# 95. Final Weighted Evaluation

| Criterion                        | Weight | Payload | Directus |
| -------------------------------- | -----: | ------: | -------: |
| Self-hosting / ownership         |    12% | **5.0** |      5.0 |
| Code-first customization         |    13% | **5.0** |      4.1 |
| React / engineering alignment    |     9% | **5.0** |      3.8 |
| Design governance                |     9% | **5.0** |      4.3 |
| Cost / licensing / exit risk     |     8% | **4.9** |      3.7 |
| GCP integration                  |     8% | **5.0** |      5.0 |
| Git / deployment model           |     7% | **4.8** |      4.8 |
| Editorial capabilities           |     7% |     4.3 |  **4.8** |
| Localization / translation       |     5% |     4.4 |  **4.7** |
| Security / authorization / audit |     5% |     4.9 |      4.9 |
| Forms / SEO                      |     4% | **4.9** |      4.1 |
| AI / MCP / agents                |     4% |     4.9 |      4.9 |
| Drupal migration                 |     4% | **4.9** |      4.8 |
| Enterprise / support             |     3% |     4.5 |  **4.7** |
| Existing ONE familiarity         |     2% |     3.0 |  **5.0** |

Approximate result:

```text
Payload
≈ 4.83 / 5

Directus
≈ 4.50 / 5
```

---

# 96. Recommended Decision

The recommendation is therefore:

# Proceed with Payload

Directus remains documented as the competing candidate. The outcome is one selected platform.

Do not build two PoCs.

Instead:

```text
Payload architecture evaluation
          ↓
Solo demo
          ↓
Architecture validated
          ↓
Team PoC
          ↓
Enterprise contract / security review
          ↓
Production implementation
```

---

# 97. Final Management Message

### Engineering

> Payload allows ONE to build the CMS as normal TypeScript/React software, with schemas, access rules, integrations and custom UI managed through the same engineering practices as the rest of the platform.

### Content

> Payload provides modern drafting, preview, versioning and structured authoring while ensuring editors cannot accidentally violate the ONE design system.

### Finance

> Payload keeps the core platform self-hosted and MIT licensed, reuses ONE's existing GCP/Cloudflare/Elasticsearch/Vertex infrastructure, and limits mandatory vendor dependency.

### Migration

> Drupal does not need to be replaced through a high-risk big-bang release. Next.js can serve both CMSs during coexistence—including tracked legacy iframe routes—while pages, news, and forms cut over in controlled waves and each completed Drupal connection is retired.

### Long-Term

> The architecture uses Payload Enterprise AI now while keeping a ONE-controlled Vertex path optional. Database, storage, search, caching, observability, frontend routing, and external AI extensions remain replaceable, reducing the chance that the next CMS becomes another difficult-to-exit infrastructure dependency.

---

# Final Recommendation

> **Select Payload CMS as the preferred CMS platform and immediately build a focused solo demo to validate the highest-risk assumptions.**

> **If that demo proves self-hosting, React customization, strict design governance, Drupal coexistence and selective migration, translation workflows, observability and upgradeability, proceed to a broader team PoC rather than spending time implementing a competing Directus PoC.**

> **If Payload exposes a fundamental blocker, reopen the single-platform decision using the documented Directus evidence. Do not deploy or present Directus as a fallback runtime.**

The architectural goal is ultimately larger than simply replacing Drupal:

> **ONE should own a content platform built from replaceable, observable, developer-controlled components—not another CMS ecosystem that becomes difficult to customize, debug, upgrade or leave.**

For your solo demo, I would prioritize the work in this exact order: **separate CMS/web → design-system restrictions → custom React Admin component → live preview → draft/version flow → Drupal import/sync/reconciliation → localization → observability → forms → MCP/Skills → upgrade test**. Everything after that can wait for the team PoC.
