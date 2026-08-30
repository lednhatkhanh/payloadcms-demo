# CMS Platform Decision — Detailed Slide Plan

**Working title:** One content platform on GCP

**Recommendation:** Keep Payload CMS as the preferred candidate while completing fair Directus due diligence; select exactly one platform after validation

**Audience:** Engineering manager, direct manager, content manager; secondary readers in platform, security, procurement, and migration teams

**Presentation purpose:** Explain the platform recommendation and show how the planned PoC will confirm implementation readiness.

**Research snapshot:** 30 August 2026

**Source document:** [`demo-plan.md`](./demo-plan.md)

**Repository evidence basis:** This repository's Payload CMS + Next.js implementation

---

## 1. Communication job

By the end of the presentation, management should understand why Payload is the preferred candidate for our Next.js/TypeScript/GCP operating model, headless-form needs, and long-term ownership goals, and what the planned PoC will validate before implementation. Its Enterprise AI portfolio and official MCP plugin also make the CMS a productivity platform for writers, translators, editors, developers, and content operations. Directus remains a credible alternative with an equally serious AI platform: Assistant, AI Translations, MCP, environment sync, and strong editorial tooling.

The deck must leave the audience with six conclusions:

1. The current-to-target difference is not merely Drupal versus another product; it is 27 isolated CMS stacks versus one governed content platform.
2. Payload and Directus can both meet the infrastructure baseline. The choice turns on operating model, customization, editorial experience, forms, environment promotion, and long-term cost/risk.
3. Payload is recommended because its content capabilities, engineering alignment, and ownership model reinforce one another. Directus should be shown fairly as the competing candidate, not drawn as a fallback runtime or preselected second choice.
4. Publishing workflow, governed experimentation, and Enterprise AI are current reasons to modernize—not side projects. Payload offers a stronger packaged baseline for multi-step approvals and static headless A/B variants; Directus offers native draft/publish and a credible custom experimentation pattern. Both provide serious AI capability. Exact release and contract availability still require vendor confirmation.
5. Next.js can serve Payload and Drupal routes together during migration—including tracked legacy iframe routes—while one CMS remains authoritative for each route or item and completed Drupal connections are retired wave by wave.
6. The planned PoC has explicit acceptance criteria, vendor evidence, and content-manager testing; this presentation explains that scope rather than requesting approval for it.

---

## 2. Recommended deck format

- **Length:** 25 core slides plus 2 decision-useful appendix slides.
- **Presentation time:** 30–35 minutes; allow 10–15 minutes for questions.
- **Meeting scope:** No live demo. The working product will be demonstrated separately within the team; management sees only decision-relevant evidence captured in advance.
- **Tone:** Calm, evidence-led, technically credible, and candid about implementation effort.
- **Visible-copy rule:** One primary claim per slide. Put details, caveats, and citations in speaker notes or the appendix.
- **PoC framing:** Present the scope, expected evidence, and implementation outcomes in decision-ready language.
- **Comparison framing:** Show capability maturity as well as feature presence. Distinguish native/official, configurable, custom-built, and still-to-validate.

### Evidence labels used throughout

Use these five labels consistently in the deck and speaker notes:

- **Validated internally** — exercised in the separate team demo or covered by a current test; presented as evidence rather than demonstrated live in the management meeting.
- **Implemented in repository** — code exists, but must be validated internally before it is presented as proven.
- **Vendor documented** — supported by current official documentation, but not validated in our environment.
- **Enterprise-plan baseline** — included in the Enterprise capability set ONE plans to procure, but still awaiting the vendor demonstration and written contract confirmation.
- **PoC gate** — important requirement that still needs hands-on validation.

This prevents a common presentation failure: presenting a vendor feature, a repository implementation, and a production-ready capability as if they were the same thing.

For the opening current-to-target section, also distinguish three kinds of statements:

- **Current-estate fact** — what our 27 Drupal instances, Acquia setup, Varnish layer, integrations, and editor workflow do today.
- **Drupal platform behavior** — something supported by current official Drupal documentation.
- **Our conclusion** — the operating or usability consequence we infer from those facts.

Do not turn an implementation difference into a universal claim about Drupal. For example, say “our current implementation has no continuous live preview” rather than “Drupal cannot preview,” and say “PHP is outside our primary engineering stack” rather than “PHP is bad.”

---

## 3. Visual direction

Use a light, restrained visual system aligned with the current product concept rather than a generic “technology vendor” deck.

- Noto Sans throughout.
- Paper-white background, dark ink text, and the canonical `#bd0f72` brand accent.
- Use magenta only for the recommendation, decision gates, and important transitions.
- Use verified screenshots from the repository implementation for product evidence.
- Use six to eight purposeful structural visuals in the core deck, with no repeated card-grid layout:
  1. the simplified current GCP/Acquia context;
  2. a current-versus-target operating-model comparison;
  3. the current-versus-target editor journey;
  4. a qualitative recommendation built around content value, engineering fit, and long-term ownership;
  5. the target GCP architecture;
  6. the workflow/translation state flow;
  7. Drupal coexistence and migration flow;
  8. a current/transition/target TCO waterfall once finance supplies values.
- Use the editable, icon-led GCP-style assets in [`diagrams/`](./diagrams/). The current-state diagram is scoped strictly to CMS delivery: Next.js connects directly to Drupal for legacy content and iframe routes. Apigee belongs to the separate CRM integration and is intentionally omitted, as is the unrelated external API. The target diagram makes Enterprise AI and MCP prominent, states 26 country sites plus one global site and all seven supported languages, and reduces any separate model provider to a small future-extension note. The migration diagram shows dual-source Next.js routing, tracked Drupal iframe routes, and per-wave connection retirement.
- Prefer flat compositions and direct labels over grids of decorative cards.
- Use logistics/port photography only on the title or section transitions. Do not imply operational facts through stock imagery.
- Do not place vendor logos on every comparison slide. The content should feel like our decision, not a co-marketing deck.

### Suggested slide rhythm

1. Establish the current architecture, operating-model problem, and non-negotiable outcomes.
2. Introduce Payload and Directus together before presenting any product-specific recommendation.
3. Keep the content-writer story together: site/language model, preview, publishing workflow, governed experimentation, forms, and Enterprise AI.
4. Keep the technical story together: target architecture, headless delivery, engineering ownership, and environment governance.
5. Present Directus evidence first, then Payload fit, then a qualitative recommendation.
6. De-risk migration and cost before closing with a bounded decision and gates.

---

## 4. Core deck at a glance

|   # | Takeaway title                                                                     | Primary job                                |
| --: | ---------------------------------------------------------------------------------- | ------------------------------------------ |
|   1 | One content platform on GCP                                                        | Establish the decision context             |
|   2 | Today, Next.js already serves a mix of native pages and Drupal content             | Establish the current architecture         |
|   3 | Replace 27 separate CMS stacks with one governed platform                          | Compare cost and operating models          |
|   4 | Improve publishing without weakening engineering control                           | Define non-negotiables                     |
|   5 | Both candidates meet the technical baseline; team fit and operating model decide   | Introduce both candidates fairly           |
|   6 | Example: 26 country sites and one global site can share seven languages            | Clarify the content model                  |
|   7 | Give editors live preview while they write                                         | Compare authoring experiences              |
|   8 | Make approval, translation, and publishing rules visible and enforceable           | Show review/publish/translate design       |
|   9 | Publish with control, then improve with governed A/B testing                       | Compare experimentation models             |
|  10 | Payload leads on headless forms; Directus leads on visual automation               | Compare forms honestly                     |
|  11 | Enterprise AI improves content operations across the organization                  | Compare Enterprise AI value                |
|  12 | One CMS can govern 26 country sites and one global site without 27 runtimes        | Show the GCP target architecture           |
|  13 | Turn repeated headless integration into shared platform capability                 | Compare headless operating models          |
|  14 | Bring CMS customization into our TypeScript engineering model                      | Compare engineering models                 |
|  15 | Promote code, govern content, and prove recovery with the right controls           | Cover environment and recovery controls    |
|  16 | Directus sets a high bar for editorial foundations and AI capability               | Present Directus product strengths         |
|  17 | Directus is a credible enterprise platform                                         | Establish Directus vendor confidence       |
|  18 | Payload aligns with our Next.js, React, TypeScript, and GCP model                  | Explain Payload's stack fit                |
|  19 | Payload combines open-source control with Enterprise support                       | Establish Payload vendor confidence        |
|  20 | Recommend Payload for the strongest fit across content, engineering, and ownership | Explain the recommendation without scoring |
|  21 | Migrate by route and content group while both CMSs remain available                | Present the migration phases               |
|  22 | Next.js can route every page to its current owner during migration                 | Explain controlled coexistence             |
|  23 | Protect content fidelity during cutover; simplify after each route is stable       | Address content-shape feasibility          |
|  24 | Build the business case on retired duplication and total cost                      | Present the cost model                     |
|  25 | The Payload PoC will confirm readiness for implementation                          | Define PoC scope and evidence              |

---

# 5. Slide-by-slide plan

## Slide 1 — One content platform on GCP

**Narrative job:** Establish the strategic question without giving the recommendation before the problem.

**Visible copy:**

> **One content platform on GCP**
>
> A decision framework for replacing 27 Drupal sites with one governed content platform

Small footer: `Decision proposal • 30 August 2026`

**Visual:** Follow the ONE corporate cover pattern: a full magenta field, the official white ONE logo centered in the upper half, and the title centered below it. Keep the subtitle and date small. Do not add photography or comparison content to the cover.

**Talk track:**

- We are choosing an operating model for the next several years, not just comparing feature lists.
- First establish why the current estate has become expensive and difficult for editors and engineers.
- Then define the requirements, compare Payload and Directus, and propose a bounded next step.

**Source notes:** Internal current-state information and this repository. No external claim is necessary on the title slide.

---

## Slide 2 — Today, Next.js already serves a mix of native pages and Drupal content

**Narrative job:** Ground the decision in the current system before discussing products or assigning blame.

**Visible copy:**

> The frontend runtime is already in GCP; content authority and 27 databases remain in Acquia.

Three facts only:

- Website traffic, GKE-hosted Next.js services, monitoring, and third-party integrations already operate primarily in the GCP platform shown in the supplied Unicorn architecture.
- Legacy content and iframe routes cross the GCP/Acquia boundary directly between Next.js and the Drupal estate.
- Twenty-six country instances plus one global instance separate content and databases, while content owners operate outside the main product-engineering boundary.

Scope note: the Apigee API portal connects to CRM as a separate system integration. Drupal does not depend on the unrelated external API, so both API nodes are excluded from this CMS architecture view.

**Visual:** Use [`diagrams/current-platform-context.png`](./diagrams/current-platform-context.png) full-width. It is a management abstraction of the supplied architecture, not a replacement for the engineering diagram.

**Talk track:**

- This topology made country separation explicit, but it also split runtime ownership, content authority, support, credentials, logging, and incidents across two operating models.
- Keep Acquia, Drupal, Varnish, GCP, and the separate Apigee/CRM integration costs distinct until finance validates each value.
- The modernization question is whether content authority should join the existing GCP operating model while preserving country and language controls.

**Evidence needed before final deck:** Confirm the exact Drupal instance count, Acquia environments, Varnish placement, direct Next.js-to-Drupal content/iframe path, and annual cost categories with platform and finance owners.

---

## Slide 3 — Replace 27 separate CMS stacks with one governed platform

**Narrative job:** Compare the two operating models and make the cost/operational difference visible without inventing savings.

**Visible copy:**

| Current estate                                         | Target operating model                                    |
| ------------------------------------------------------ | --------------------------------------------------------- |
| 26 country CMS instances plus one global instance      | One logical CMS with country-scoped access and data       |
| Repeated environments, patches, releases, and testing  | Shared runtime, deployment controls, and regression suite |
| Acquia, Drupal, Varnish, and cross-cloud coordination  | GCP runtime, Cloud SQL, GCS, and existing observability   |
| Cross-instance reuse and reporting require integration | Shared global content with explicit country overrides     |

Bottom line:

> The savings hypothesis is reduced duplication—not a claim that the replacement CMS is free.

**Visual:** A dumbbell/fan-in composition: `27 isolated stacks` on the left converge into `one governed platform` on the right. Under it, show five cost lanes—vendor, infrastructure/cache, maintenance, release/testing, and editorial time. Use a TCO waterfall only after verified values exist.

**Talk track:**

- Every shared Drupal change can require Composer/module compatibility checks, database updates, cache rebuilds, regression testing, deployment coordination, and rollback planning across the estate.
- Do not criticize the original decision or imply every instance is broken; the difference is the multiplication factor.
- The target still has GCP, enterprise support, engineering, migration, and operations costs. Transition temporarily costs more because both platforms run in parallel.

**Sources and evidence:**

- Internal Acquia, Drupal, Varnish, environment, staffing, and incident data—finance/platform validation required.
- [Drupal core update steps](https://www.drupal.org/docs/updating-drupal/updating-drupal-core-via-composer)
- [Drupal configuration management guidance](https://www.drupal.org/docs/administering-a-drupal-site/configuration-management/managing-your-sites-configuration)
- [Drupal multisite considerations](https://www.drupal.org/docs/multisite-drupal/multisite-drupal-considerations)

---

## Slide 4 — Improve publishing without weakening engineering control

**Narrative job:** Define the non-negotiable decision criteria.

**Visible copy:**

Use six grouped requirements, not a long checklist:

1. **Platform ownership** — self-host in GCP; PostgreSQL; GCS; backup and restore.
2. **Global publishing** — country tenancy, languages, role and row-level access.
3. **Editorial control** — drafts, versions, trash, preview, review, approval, scheduling, translation state.
4. **Structured experience** — approved blocks and rich-text features; editors cannot invent styling.
5. **Digital operations** — headless forms, SEO, audit, observability, environment promotion.
6. **AI, transition, and support** — Enterprise AI and MCP, dual-source Drupal coexistence, selective migration, and support we can contract.

Bottom line:

> These six outcomes define the minimum acceptable platform.

**Visual:** Six horizontal bands or a single stacked composition. Do not use checkmarks beside every line.

**Talk track:**

- Infrastructure is necessary but not differentiating; both products can self-host with PostgreSQL and GCS.
- Forms and migration deserve unusually high weight because they are frequently underestimated.
- AI is valuable, but it should not outweigh core publishing and migration safety.

---

## Slide 5 — Both candidates meet the technical baseline; team fit and operating model decide

**Narrative job:** Present the comparison at the right altitude.

**Visible copy:**

| Decision area              | Payload                                                         | Directus                                         |
| -------------------------- | --------------------------------------------------------------- | ------------------------------------------------ |
| Self-host, PostgreSQL, GCS | Strong                                                          | Strong                                           |
| Next.js / TypeScript fit   | **Native-strength fit**                                         | Strong API/SDK fit                               |
| Admin extension stack      | **React**                                                       | Vue                                              |
| Multi-country model        | Official multi-tenant plugin + code                             | Row-level policy or project scoping              |
| Publishing workflow        | **Packaged multi-step approvals, feedback, and notifications**  | Native drafts/versions; custom approval stages   |
| Headless forms             | **Official Form Builder**                                       | Collections + frontend + Flows pattern           |
| Environment promotion      | Code + migrations; reference-data tooling needed                | **v12.3 Environment Sync**                       |
| Audit                      | **Enterprise Activity Logs + revisions/version control**        | **Built-in Activity Log + revisions**            |
| AI productivity            | **Translation, image generation, writing assistant, RAG + MCP** | **Assistant, AI Translations, MCP + custom LLM** |
| A/B testing                | **Enterprise static headless variants managed in the CMS**      | Custom model + feature-flag/analytics service    |
| SSO                        | **Enterprise SAML / OAuth 2.0**                                 | Enterprise capability                            |
| Commercial model           | MIT self-hosted core; Enterprise custom quote                   | Team public price; Enterprise custom quote       |

**Visual:** A clean two-column comparison. Highlight only genuine advantages; do not color all Payload cells as winners.

**Talk track:**

- Directus is closer to a configurable data platform wrapped around SQL.
- Payload is closer to a TypeScript application framework that includes a CMS.
- Our decision favors the latter because the remaining ONE-specific work—preview integration, forms, migration, observability, and policy—fits our stack. The Enterprise tier and official MCP plugin supply strong workflow, AI, and audit baselines, so those features must be demonstrated before estimating custom work.

**Source notes:**

- [Payload configuration model](https://payloadcms.com/docs/configuration/overview)
- [Payload React custom components](https://payloadcms.com/docs/custom-components/overview)
- [Directus architecture](https://docs.directus.io/getting-started/architecture)
- [Directus extension types](https://docs.directus.io/extensions/introduction)
- [Directus v12 draft/publish foundation and approval-workflow status](https://directus.com/resources/v12-built-for-the-whole-team)
- [Directus and PostHog A/B integration workshop](https://directus.com/tv/enter-the-workshop/setting-up-ab-testing-posthog)
- [Directus v12.3 Environment Sync](https://directus.com/resources/12.3-release-notes)

---

## Slide 6 — Example: 26 country sites and one global site can share seven languages

**Narrative job:** Prevent the architecture from reproducing the 27-Drupal mistake in a new form.

**Visible copy:**

Show the operating scope first:

```text
27 site scopes
├── 26 country sites
└── 1 global site

7 supported languages
English · Chinese · Japanese · Korean · Spanish · Portuguese · French
```

Model rules:

- A record is **global** or owned by a **country site**.
- Editors see only permitted countries; global roles can work across them.
- Localized fields and per-language workflow status are independent of country ownership.
- Global content can be reused without copying it 26 times.
- Separate database or instance is reserved for a documented legal/security exception.

**Visual:** This is an example, not a prescribed country-to-language map. Show three simple examples: Global may publish all seven languages; Japan may publish Japanese and English; Korea may publish Korean and English. State that each country selects the languages it needs.

**Talk track:**

- “Japan content” and “Japanese translation” are not the same concept.
- Payload’s official multi-tenant plugin provides tenant assignment, switching, list filtering, and relationship filtering, but we still own the access model and tests.
- Directus can implement row-level tenancy with policies or isolate by project; it is viable, but requires equally serious permission testing.
- Management-facing slides use full language names, not locale codes. Technical configuration may still use standard codes internally.
- The examples illustrate independent controls; they do not require every country to publish every language.

**Source notes:**

- [Payload multi-tenant plugin](https://payloadcms.com/docs/plugins/multi-tenant)
- [Payload localization](https://payloadcms.com/docs/configuration/localization)
- [Directus multi-tenancy approaches](https://docs.directus.io/user-guide/overview/glossary)
- [Directus granular permissions](https://docs.directus.io/user-guide/user-management/permissions)

---

## Slide 7 — Give editors live preview while they write

**Narrative job:** Compare the current and intended content-manager experience directly.

**Visible copy:**

**Current journey**

`write → save → request preview → switch context → inspect → return and repeat`

**Target journey**

`write within guardrails ⇄ see the real Next.js page → submit → review/translate → schedule/publish`

Key differences:

- Continuous preview stays inside the writing flow.
- Role-shaped review, publish, and translation states replace workflow workarounds.
- Global and country content are visible in one governed authoring context.
- Approved blocks and field constraints replace unrestricted page design.
- A governed headless form engine becomes part of the same authoring product.
- AI assistance can later create draft suggestions and translations, with human approval.

**Visual:** A two-lane journey diagram, current above target. Use pauses and context-switch marks in the current lane; use a continuous preview loop in the target lane. Do not use feature cards.

**Talk track:**

- These are differences in our current implementation and desired workflow, not claims that Drupal cannot be extended.
- Drupal has contributed decoupled-preview and headless-Webform modules; adopting and operating extra integration remains part of the comparison.
- The target should make daily publishing faster, clearer, and easier for content teams.

**Source notes:** Internal editor workflow and feedback; [Drupal Decoupled Preview](https://www.drupal.org/project/decoupled_preview); [Drupal Webform Headless](https://www.drupal.org/project/webform_headless).

---

## Slide 8 — Make approval, translation, and publishing rules visible and enforceable

**Narrative job:** Show that review/publish/translate can be customized without giving editors uncontrolled power.

**Visible copy:**

```text
Draft
  ├─► Translation requested ─► Translation submitted ─┐
  └────────────────────────► Review requested ────────┤
                                                       ▼
                                               Changes requested
                                                       │
                                                       └─► In review
                                                               │
                                                               ▼
                                                           Approved
                                                        ┌──────┴──────┐
                                                        ▼             ▼
                                                    Publish       Schedule
```

Role rules:

- Editor creates and requests work.
- Translator changes requested languages.
- Reviewer approves or requests changes.
- Publisher publishes or schedules.
- Administrator manages policy, not routine publishing.

Bottom statement:

> Payload packages the approval capabilities we need; Directus requires more workflow configuration.

**Visual:** A single flow diagram. Keep labels short and use color only on “Approved” and “Publish”.

**Talk track:**

- Payload Enterprise supplies defined multi-step approvals, field-level access control, alerts, notifications, inline feedback, and extensibility. Validate that packaged baseline before estimating ONE-specific extensions.
- The production model should track translation state per locale and mark translations outdated when the source version changes.
- Directus v12 supplies native draft/publish states and content versions. Its May 2026 product update identifies scheduled releases and packaged approval workflows as subsequent work; status fields, policies, and Flows can still compose custom approval stages today.
- The PoC must test invalid transitions and country boundaries through automated authorization tests.

**Repository evidence:**

- `packages/payload-config/src/workflow.ts`
- `packages/payload-config/src/scheduledPublishing.ts`
- `apps/cms/src/components/WorkflowActionButton.tsx`
- `packages/payload-config/src/admin/WorkflowInbox.tsx`
- `packages/payload-config/src/collections/EditorialActivities.ts`

**Source notes:**

- [Payload drafts and scheduled publishing](https://payloadcms.com/docs/versions/drafts)
- [Payload versions and restore](https://payloadcms.com/docs/versions/overview)
- [Payload Enterprise Publishing Workflows](https://payloadcms.com/enterprise/publishing-workflows)
- [Directus v12 native draft/publish and approval-workflow status](https://directus.com/resources/v12-built-for-the-whole-team)
- [Directus content versioning](https://directus.com/docs/guides/content/content-versioning)

---

## Slide 9 — Publish with control, then improve with governed A/B testing

**Narrative job:** Show that the target platform improves content after publication as well as governing how it reaches publication.

**Visible copy:**

Left side, “Payload Enterprise”:

- editors create and organize approved variants inside the CMS;
- Next.js statically delivers variant content from the edge;
- analytics remains pluggable rather than locking ONE to one measurement vendor;
- the claimed performance and delivery behavior must be demonstrated.

Right side, “Directus”:

- experiments and content variants can be modeled as collections and relationships;
- PostHog or another feature-flag/analytics service assigns variants and measures results;
- the frontend and Flows connect the CMS model to that service;
- this is a credible custom integration pattern, not an equivalent packaged A/B feature.

Governance applies to both approaches:

- only approved blocks and variants;
- predefined primary metric and guardrails;
- consent, accessibility, audience, and audit controls;
- explicit stop conditions and rapid rollback.

**Visual:** A balanced two-column comparison with four governance controls underneath. Make the distinction `packaged baseline` versus `custom integration pattern` visible without implying Directus cannot support experimentation.

**Talk track:**

- Payload's advertised feature is directly relevant to our Next.js architecture because variant delivery is static rather than a client-side overlay.
- Treat the performance statements as vendor claims until the demonstration proves behavior in our hosting and analytics model.
- Directus has published a hands-on A/B pattern with PostHog. That is positive feasibility evidence, but it leaves more integration and operational ownership with ONE.
- Editors own variant content; product/analytics owners define metrics and stop rules; developers protect delivery, accessibility, consent, and the design system.

**Source notes:**

- [Payload Enterprise headless A/B variant testing](https://payloadcms.com/enterprise/headless-ab-variant-testing)
- [Directus and PostHog A/B testing workshop](https://directus.com/tv/enter-the-workshop/setting-up-ab-testing-posthog)

---

## Slide 10 — Payload leads on headless forms; Directus leads on visual automation

**Narrative job:** Treat forms as a first-class business capability, not a checkbox.

**Visible copy:**

| Requirement                     | Payload                           | Directus                                |
| ------------------------------- | --------------------------------- | --------------------------------------- |
| Editors define form schema      | **Official Form Builder**         | Model collections or build an extension |
| Next.js uses our components     | **Designed for frontend mapping** | Custom frontend pattern                 |
| Store and manage submissions    | Yes                               | Yes                                     |
| Notifications and workflows     | Built-in emails + custom hooks    | **Flows are strong**                    |
| File upload                     | Supported                         | Supported through files/API             |
| Conditional/multi-step behavior | Requires validation               | Custom implementation/extension         |
| Consent, spam, retention, PII   | Our production controls           | Our production controls                 |

Bottom statement:

> A representative complex form will confirm conditional logic, consent, uploads, notifications, and retention.

**Visual:** A simple flow: `CMS form schema → shared contract → Next.js form → validation → submission → notifications/integrations`.

**Talk track:**

- Payload’s official plugin is the clearest differentiator for this requirement.
- Neither product removes the need for rate limiting, bot protection, consent versioning, data retention, file scanning, and downstream integration.
- Forms should migrate late because Drupal forms often hide business rules and integrations that are not visible in the fields alone.
- The PoC should rebuild one complex real form, not only a contact form.

**Source notes:**

- [Payload Form Builder](https://payloadcms.com/docs/plugins/form-builder)
- [Payload access-control form example](https://payloadcms.com/docs/access-control/overview)
- [Directus form + Next.js pattern](https://docs.directus.io/blog/building-a-form-data-collection-and-email-notification-system-with-directus-and-next-js)
- [Directus security guidance for form submissions](https://docs.directus.io/use-cases/headless-cms/security)

---

## Slide 11 — Enterprise AI improves content operations across the organization

**Narrative job:** Make Enterprise AI a strong, practical reason to modernize the shared CMS while keeping the claims manager-friendly and verifiable.

**Visible copy:**

Show the people and outcomes first:

- **Writers and translators:** draft, rewrite, create imagery, and publish multilingual content faster.
- **Editors and content operations:** apply brand prompts, glossaries, structured-content checks, permissions, and human approval.
- **Developers:** use schema-aware tools and MCP to reduce repetitive content, data-model, and integration work.
- **Customers and employees:** benefit later from permission-aware RAG and semantic discovery over trusted content.

Show both product paths:

**Payload Enterprise**

- Enterprise AI portfolio: translation, image generation, writing assistant, granular permissions, and RAG/auto-embedding.
- Official MCP can scope find, create, update, and delete operations by collection and expose approved prompts, tools, and resources.
- Strong fit with ONE's React/TypeScript extension and governance model.

**Directus Enterprise**

- Built-in Studio Assistant for content, files, schemas, and Flows.
- AI Translations can process multiple languages with a glossary and shared style guide.
- MCP server supports content editors, developers, and external AI clients using existing permissions and audit trails.

Guardrail line:

> Consolidate the platform so AI can be governed once across 26 country sites and one global site. Human approval remains mandatory.

**Visual:** Four audience/outcome tiles above two compact product summaries. Keep any separate model provider out of the main visual; mention it only in speaker notes as a later option for a documented gap.

**Talk track:**

- Both candidates make AI useful now for daily content and development work; this is a reason to switch, not a reason to wait.
- Payload remains the recommendation because its AI and MCP capabilities sit inside the engineering model ONE already uses.
- Directus currently provides the broader packaged Assistant experience and is the benchmark the Payload demonstration must meet.
- Contact both vendors and demonstrate the same writing, translation, imagery, content operations, permissions, tenant isolation, audit, cost control, and human-approval tasks.
- Confirm exact release and contract availability in writing before production commitment.

**Source notes:**

- [Payload MCP plugin and scoped capabilities](https://payloadcms.com/docs/plugins/mcp)
- [Payload Enterprise AI framework](https://payloadcms.com/enterprise/ai-framework)
- [Payload Enterprise AI portfolio](https://payloadcms.com/enterprise/enterprise-ai)
- [Directus AI overview](https://directus.com/docs/guides/ai)
- [Directus AI Assistant tools](https://directus.com/docs/guides/ai/assistant/tools)
- [Directus AI Translations](https://directus.com/docs/guides/ai/translations)
- [Directus MCP server](https://directus.com/docs/guides/ai/mcp)

---

## Slide 12 — One CMS can govern 26 country sites and one global site without 27 runtimes

**Narrative job:** Show the target deployment and the scope of centralization.

**Visible copy:**

Use this architecture, simplified for the slide:

```text
Users
  │
Existing edge / Cloudflare
  │
GCP load balancing
  ├───────────────┐
  ▼               ▼
Next.js          CMS + job worker
GKE              GKE
  │               ├──────────┬───────────┬──────────────────┐
  │               ▼          ▼           ▼                  ▼
  └──────────► Cloud SQL     GCS       Pub/Sub      Enterprise AI
                Postgres       │           │                  │
                               └──── Cloud Logging / Monitoring ────┤
                                                                  ▼
                                                   future model extension only if required

Transition only:
Next.js route resolver ──► CMS routes
                       └─► Drupal adapter / tracked iframe routes
```

Bottom line:

> Country isolation belongs in data, access, and audit policy—not duplicated CMS runtime by default.

**Visual:** Refresh [`diagrams/target-cms-gcp.png`](./diagrams/target-cms-gcp.png) before the next slide export. The architecture must keep one selected CMS, emphasize Enterprise AI and MCP as current scope, state the 27 site scopes and seven languages clearly, and reduce any future model-provider extension to a small dashed note.

**Talk track:**

- One logical platform can still scale horizontally and use separate workers.
- PostgreSQL is authoritative for content; GCS is authoritative for media; search and cache are rebuildable derivatives.
- Use Workload Identity rather than long-lived GCP service-account keys.
- Production backup is not “database only”: media, code/config, keys, and restore procedures are part of recovery.

**Source notes:**

- [Payload production deployment and supported databases/storage](https://payloadcms.com/docs/production/deployment)
- [Payload GCS adapter](https://payloadcms.com/docs/upload/storage-adapters)
- [Directus self-hosted PostgreSQL and GCS configuration](https://docs.directus.io/self-hosted/config-options)
- [GKE Workload Identity Federation](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/workload-identity)
- [Cloud SQL high availability](https://docs.cloud.google.com/sql/docs/postgres/configure-ha)
- [Cloud SQL point-in-time recovery](https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/pitr)
- [Cloud Storage data-protection options](https://docs.cloud.google.com/storage/docs/introduction)

---

## Slide 13 — Turn repeated headless integration into shared platform capability

**Narrative job:** Compare headless operating models precisely and fairly.

**Visible copy:**

Start with the fair statement:

> Drupal core provides JSON:API. The current estate requires additional assembly for the complete editor-to-Next.js experience we want.

| Capability                 | Current Drupal/headless path                                                                           | Target expectation                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| Content API                | Core JSON:API plus estate-specific integration                                                         | First-class typed REST/GraphQL/Local API patterns            |
| Draft/revision consumption | JSON:API resource versions are read-only and officially limited to Node and Media revisions            | Preview and draft reads designed into the application path   |
| Translation lifecycle      | JSON:API documents simple multilingual support with limits on individual translation creation/deletion | Explicit per-locale status, review, provenance, and fallback |
| Preview                    | Contributed module plus custom integration                                                             | Continuous preview against the actual Next.js components     |
| Headless forms             | Webform plus a contributed headless layer                                                              | Editor-defined schema mapped to governed frontend components |

Consequence line:

> The choice is whether to keep owning these seams across 27 instances or move them into one governed platform model.

**Visual:** A before/after dependency flow. Current: `Drupal → JSON:API/modules → preview/form/cache glue → Next.js`. Target: `governed content model ↔ Next.js preview/forms`, with fewer ownership handoffs.

**Talk track:**

- Do not say Drupal has “bad headless support”; core JSON:API is real and capable.
- Validate every current-estate statement against installed versions and modules.
- The target is not “zero integration.” It is fewer, more testable integration seams under one product-engineering model.

**Source notes:**

- [Drupal core JSON:API overview](https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module)
- [Drupal JSON:API revision limitations](https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/revisions)
- [Drupal JSON:API translation limitations](https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/translations)
- [Drupal Decoupled Preview](https://www.drupal.org/project/decoupled_preview)
- [Drupal Webform Headless](https://www.drupal.org/project/webform_headless)

---

## Slide 14 — Bring CMS customization into our TypeScript engineering model

**Narrative job:** Compare how customization is built, tested, deployed, and supported.

**Visible copy:**

| Current customization model                               | Target customization model                              |
| --------------------------------------------------------- | ------------------------------------------------------- |
| Drupal/PHP modules beside Next.js/TypeScript applications | CMS schema, hooks, jobs, and an extensible Admin UI     |
| Separate types, validation, UI, tests, and observability  | Reusable contracts, design system, tests, and telemetry |
| Acquia CMS operations beside GCP product operations       | CMS joins the existing GCP platform baseline            |
| Instance-specific configuration and upgrade surface       | Git-reviewed configuration and database migrations      |

Bottom line:

> PHP is not the weakness; maintaining CMS customization as an exception to our main engineering system is the difference that matters.

**Visual:** A split architecture with a widening seam on the current side and one shared TypeScript spine on the target side. Reuse the GCP/Acquia boundary language from Slide 2.

**Talk track:**

- Payload maps most directly to this target because its configuration and Admin extension model are TypeScript/React.
- Directus remains credible: backend/API extensions use Node/TypeScript, while Studio extensions use Vue.
- Centralizing in GCP removes a vendor/cloud boundary, not the need for enterprise support, upgrades, security, and operations.

**Source notes:** Internal architecture; [Drupal dependency management](https://www.drupal.org/docs/develop/using-composer/manage-dependencies); [Payload custom components](https://payloadcms.com/docs/custom-components/overview); [Directus extension types](https://docs.directus.io/extensions/introduction).

---

## Slide 15 — Promote code, govern content, and prove recovery with the right control for each

**Narrative job:** Clarify environment sync and operational governance.

**Visible copy:**

Use three lanes:

### Schema and configuration

- Versioned changes must be reviewable and repeatable across environments.
- Production drift must be detected instead of becoming hidden configuration.

### Content and reference data

- Editorial content is normally authored in production—not promoted like code.
- Countries, taxonomies, templates, and controlled defaults use versioned fixtures/export-diff-import.
- Production submissions and PII must not be copied to lower environments without sanitization.

### Audit and recovery

- Require activity history, revisions, retention, export, SIEM integration, site scope, and actor/request metadata.
- Cloud SQL HA + PITR; GCS soft delete/versioning/lifecycle; scheduled database-plus-media restore tests.

Bottom statement:

> Platform capability and operating controls together provide reliable promotion, audit, and recovery.

**Visual:** Three horizontal lanes. This is clearer than another architecture diagram.

**Talk track:**

- Directus wins packaged environment promotion today.
- Payload’s code-first model is still strong, but we need explicit tooling for reference-data promotion and drift reporting.
- Payload gets full product-capability credit for Enterprise Activity Logs and revisions/version control. The repository's custom `EditorialActivities` collection is narrower demo evidence and must not be presented as the Enterprise feature.
- Backing up PostgreSQL alone does not restore media or prove recovery.

**Source notes:**

- [Payload migrations](https://payloadcms.com/docs/database/migrations)
- [Payload Enterprise Audit Logs & Version Control](https://payloadcms.com/enterprise)
- [Directus v12.3 Environment Sync](https://directus.com/resources/12.3-release-notes)
- [Directus Activity Log](https://docs.directus.io/user-guide/settings/activity-log)
- [Payload versions](https://payloadcms.com/docs/versions/overview)
- [Cloud SQL PITR](https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/pitr)
- [Cloud Storage object protection](https://docs.cloud.google.com/storage/docs/object-versioning)

---

## Slide 16 — Directus sets a high bar for editorial foundations and AI capability

**Narrative job:** Show Directus’s strengths before advocating Payload.

**Visible copy:**

> Directus is the strongest competing candidate because it reduces custom work in areas our content team will notice.

Four strengths:

- **Environment Sync:** schema, configuration, roles, policies, permissions, flows, dashboards, and settings can move through committed JSON with pull/diff/push.
- **Editorial foundation:** native draft/publish states and content versions are strong; policies and visual Flows can compose custom approval stages.
- **Audit:** a built-in Activity Log records data-changing actions; revisions support item-level history and reversion.
- **AI:** Studio Assistant can work with content, files, schemas, and Flows; AI Translations adds glossaries and style guides; MCP brings the same platform into developer tools; Enterprise adds custom-model options.

Two implementation considerations:

- Custom Studio UI uses Vue, adding a second frontend framework for our team.
- Approval workflows, static A/B testing, and headless forms require more configuration and integration than Payload.

**Visual:** A strong Directus screenshot or a single diagonal composition with “packaged strengths” above and “fit trade-offs” below. Do not make this look like a consolation slide.

**Talk track:**

- Directus v12.3 materially improves its environment story; older comparisons that call environment sync weak are now obsolete.
- Directus currently has the broader packaged in-Studio assistant; Payload's advantage is the combined fit of packaged approvals, static A/B variants, Enterprise AI, RAG, MCP, and the React extension path.
- These advantages establish a strong editorial and content-operations benchmark.

**Source notes:**

- [Directus v12.3 Environment Sync](https://directus.com/resources/12.3-release-notes)
- [Directus v12 native draft/publish and approval-workflow status](https://directus.com/resources/v12-built-for-the-whole-team)
- [Directus content versioning](https://directus.com/docs/guides/content/content-versioning)
- [Directus and PostHog A/B testing workshop](https://directus.com/tv/enter-the-workshop/setting-up-ab-testing-posthog)
- [Directus Activity Log](https://docs.directus.io/user-guide/settings/activity-log)
- [Directus AI overview](https://directus.com/docs/guides/ai)
- [Directus MCP server](https://directus.com/docs/guides/ai/mcp)
- [Directus pricing and Enterprise AI capabilities](https://directus.com/pricing)
- [Directus form + Next.js pattern](https://docs.directus.io/blog/building-a-form-data-collection-and-email-notification-system-with-directus-and-next-js)

---

## Slide 17 — Directus is a credible enterprise platform

**Narrative job:** Establish that Directus is a credible enterprise platform and serious comparison candidate, not a token alternative.

**Visible copy:**

> Directus combines two decades of product history, a large developer ecosystem, formal support tiers, and public enterprise deployments.

Use the same four-part evidence structure as the Payload confidence slide:

1. **Longevity** — Directus traces its origin to 2004 and describes the platform as two decades in the making.
2. **Developer ecosystem** — a large public community across GitHub, Forum, Discord, extensions, and a public roadmap.
3. **Support path** — Basic support provides direct access to the Directus team with defined SLAs; Premium adds 24/7 critical-issue coverage and a dedicated customer support manager. Self-hosting is available on every tier.
4. **Enterprise adoption** — public references include Club Med, Fortuna Entertainment Group, Prusa3D, Ripley Entertainment, Copa Airlines, and other organizations.

Commercial model:

> Directus is source-available under the Monospace Sustainable Core License, not MIT. Core has seat, collection, flow, and retention limits; an organization of our size should assume a commercial Enterprise agreement.

Bottom callout:

> Directus remains credible; differentiation rests on stack fit, forms, workflow, experimentation, and licensing.

**Visual:** Mirror the confidence structure used for Payload: `Longevity → Community → Support → Adoption`. Keep the dated GitHub snapshot visible and show the MSCL/Enterprise note as a footer rather than a warning graphic.

**Talk track:**

- Public community channels include the Directus Forum, Discord live chat, GitHub Issues, and a public roadmap.
- Community support is best-effort. For production, require the exact Basic/Premium response targets, named contacts, escalation coverage, and a private Slack or Microsoft Teams channel in writing.
- Directus advertises dedicated onboarding, SLAs, self-hosting, granular audit/access controls, and SOC 2 Type II status for enterprise buyers; security must still validate the Trust Center and contract scope.
- The vendor-reported download and deployment totals are scale signals, not independently audited reliability measures.
- Customer stories prove specific workloads. Club Med’s consolidation is particularly relevant, but the published design used separate Directus instances for workloads with different structures, permissions, rhythms, and users. That is useful counter-evidence: “centralized governance” does not automatically mean one physical project for every use case.
- Directus’s vendor-published Ripley story describes consolidating a WordPress multisite estate for more than 100 attractions in 10 countries, with multilingual content and granular roles. Its Fortuna story describes one CMS across five countries and three brands. Treat their reported conversion, engagement, and speed metrics as vendor evidence—not forecasts for ONE.
- Directus’s source-available license keeps code visible, but it does not provide Payload’s MIT-level commercial freedom. Model the Enterprise contract and renewal exposure explicitly.

**Source notes:**

- [Directus GitHub repository, community links, license summary, and dated metrics](https://github.com/directus/directus)
- [Directus pricing, tier limits, self-hosting, support, and Enterprise features](https://directus.com/pricing)
- [Directus support tiers](https://docs.directus.io/getting-started/support)
- [Directus Enterprise support, security, and customer references](https://directus.com/enterprise)
- [Directus: two decades of platform history](https://directus.com/resources/directus-two-decades)
- [Copa Airlines customer case study](https://directus.com/case-studies/copa-airlines)
- [Club Med: unifying a fragmented global CMS stack](https://directus.com/resources/how-directus-helped-a-global-luxury-travel-leader-unify-its-cms-stack)
- [Ripley Entertainment customer story](https://directus.com/resources/ripley-entertainment)
- [Fortuna Entertainment Group customer story](https://directus.com/resources/fortuna-entertainment-group)

---

## Slide 18 — Payload aligns with our Next.js, React, TypeScript, and GCP model

**Narrative job:** Explain why Payload is preferred despite Directus’s packaged strengths.

**Visible copy:**

> Collections, fields, access rules, hooks, jobs, endpoints, migrations, and Admin components live in the same TypeScript/React engineering model as our web platform.

Use one simple stack:

```text
Next.js + React + TypeScript
          │
Shared UI, validation, observability, tests
          │
Payload Admin + APIs + jobs
          │
PostgreSQL + GCS on GCP
```

Three implications:

- Start with Enterprise Publishing Workflows and extend only the ONE-specific stages or policy gaps in reviewable, testable TypeScript.
- Manage A/B variants in Payload and use Next.js static delivery; integrate ONE's approved analytics and experiment governance rather than rebuilding variant authoring.
- Treat Enterprise AI translation, writing assistance, image generation, RAG/auto-embedding, and MCP as current target capabilities. Configure and validate them before estimating custom AI work.
- Keep the remaining ONE-specific workflow, experimentation, AI, and integration code in one reviewable TypeScript/React engineering model.

**Visual:** The stack above with one repo screenshot showing TypeScript config or the custom workflow component. No generic code-wall background.

**Talk track:**

- Payload brings CMS work into our established application engineering model.
- That is especially important after the custom Drupal plugin experience.
- The cost of this flexibility is that ONE-specific policy, integration, and comprehensive audit controls may still require custom code. Do not assume we must rebuild Enterprise workflow or AI UI before seeing the vendor demonstration.

**Source notes:**

- [Payload React custom components](https://payloadcms.com/docs/custom-components/overview)
- [Payload migrations](https://payloadcms.com/docs/database/migrations)
- [Payload jobs](https://payloadcms.com/docs/jobs-queue/schedules)
- [Payload access control](https://payloadcms.com/docs/access-control/overview)
- [Payload Enterprise Publishing Workflows](https://payloadcms.com/enterprise/publishing-workflows)
- [Payload Enterprise headless A/B variant testing](https://payloadcms.com/enterprise/headless-ab-variant-testing)
- [Payload MIT/self-host model](https://payloadcms.com/get-started)

---

## Slide 19 — Payload combines open-source control with Enterprise support

**Narrative job:** Reduce management concern that Payload is an unsupported niche project while keeping the evidence in proportion.

**Visible copy:**

> Payload gives us an MIT-licensed escape hatch, a paid support path, and credible signals of continued investment.

Use one horizontal evidence line with four stops:

1. **Control** — MIT-licensed core, source access, self-hosting, and no mandatory runtime SaaS dependency.
2. **Commercial assurance** — ONE's planned Enterprise tier provides publishing workflows, SSO, static A/B testing, AI/RAG, audit/version controls, dedicated engineering, and continued self-hosting.
3. **Community signal** — a large GitHub community with public Discussions, Issues, roadmap, and Discord.
4. **Backing and adoption** — Figma acquired Payload CMS in 2025; Figma committed to continued open-source investment and reported use by several Fortune 100 companies.

Customer proof line:

> Public Payload case studies include Microsoft, ASICS, Blue Origin, Sonos, Mazda, Vodafone, and other global organizations.

Bottom callout:

> Open source and Enterprise support together reduce exit and operating risk.

**Visual:** A single left-to-right confidence line labeled `Control → Support → Community → Backing`, with the GitHub snapshot date visible. Use only a restrained selection of customer wordmarks if brand-use approval is available; otherwise use names as text in speaker notes.

**Talk track:**

- MIT means we can continue running, inspecting, modifying, and migrating the core without a per-instance runtime license. It does not make GCP, engineering, operations, or enterprise features free.
- Payload publicly advertises dedicated engineering support, but does not publicly guarantee the exact SLA or a private chat channel.
- Require a named private Slack or Microsoft Teams channel, P1/P2 response targets, escalation coverage, upgrade assistance, and GCP architecture reviews in the enterprise proposal.
- GitHub stars and forks indicate discoverability and ecosystem interest; they are not evidence of security, uptime, support quality, or suitability for our requirements.
- Figma ownership brings resources and strategic relevance, but also creates roadmap concentration. Confirm the long-term MIT commitment, self-hosting guarantees, and separation of open-source versus paid features in writing.
- Vendor case evidence is directionally useful, not transferable. Mazda New Zealand reports an 85% annual-cost reduction and 3–5× faster time to market in its specific implementation; Microsoft’s AI Tips/Designer case emphasizes code-first extensibility, data ownership, and dedicated support. Do not reuse those metrics as ONE forecasts.
- Benchmark Directus with the same dated community, ownership, support, and customer-evidence method during procurement.

**Source notes:**

- [Payload self-hosting, MIT license, Enterprise support, and Figma FAQ](https://payloadcms.com/get-started)
- [Payload GitHub repository and dated community metrics](https://github.com/payloadcms/payload)
- [Figma announcement: Payload joined the Figma team](https://www.figma.com/blog/payload-joins-figma/)
- [Figma 2025 annual report: Payload CMS acquisition disclosure](https://s206.q4cdn.com/973901332/files/doc_financials/2025/q4/fig-20251231.pdf)
- [Payload announcement and continued open-source/self-hosting commitments](https://payloadcms.com/posts/blog/payload-is-joining-figma)
- [Payload public case-study index](https://payloadcms.com/case-studies)
- [Payload Enterprise overview](https://payloadcms.com/enterprise)
- [Payload Enterprise publishing workflows](https://payloadcms.com/enterprise/publishing-workflows)
- [Payload Enterprise SSO](https://payloadcms.com/enterprise/single-sign-on-sso)
- [Payload Enterprise A/B variant testing](https://payloadcms.com/enterprise/headless-ab-variant-testing)
- [Payload Enterprise AI auto-embedding/RAG framework](https://payloadcms.com/enterprise/ai-framework)
- [Payload Enterprise AI translation, image generation, and writing assistant](https://payloadcms.com/enterprise/enterprise-ai)
- [Payload Enterprise Visual Editor — Coming Soon](https://payloadcms.com/enterprise/visual-editor)
- [Mazda New Zealand case study](https://payloadcms.com/case-studies/mazda)
- [Microsoft case study](https://payloadcms.com/case-studies/microsoft)

---

## Slide 20 — Recommend Payload for the strongest fit across content, engineering, and ownership

**Narrative job:** Explain the recommendation through the few differences that matter to ONE, without false precision.

**Visible copy:**

Lead with:

> **Both platforms meet the enterprise CMS baseline.** Payload requires less adaptation in the areas that define ONE's long-term operating model.

Use three decision pillars:

1. **Better content operations** — Enterprise publishing workflows, static A/B testing, AI-assisted writing, translation and image generation, plus an official headless Form Builder.
2. **One engineering model** — Next.js, React, and TypeScript align the CMS, Admin extensions, design system, tests, migration logic, and day-to-day development.
3. **Long-term control** — GCP self-hosting, PostgreSQL, GCS, an MIT-licensed core, activity logs, revisions, and Enterprise support keep the platform governable and replaceable.

Then make the comparison explicit:

- **Directus remains credible** — it leads in packaged Environment Sync and offers mature Studio automation, Flows, AI, and broad data-platform flexibility.
- **The deciding difference** — Payload combines comparable Enterprise authoring capability with a materially stronger fit for how ONE builds and owns digital products.

Close with:

> Directus is a strong option; Payload is the better long-term fit for ONE.

**Visual:** Three aligned decision pillars followed by one balanced comparison strip. Do not show numbers, weights, rankings, or a feature-count scoreboard.

**Talk track:**

- This is a reasoned recommendation, not a mathematical ranking.
- Both candidates can meet the infrastructure and governance baseline.
- Directus is stronger in some packaged operational capabilities, particularly Environment Sync.
- Payload is recommended because its content-team capabilities, engineering alignment, and ownership model reinforce one another.
- The planned PoC and Enterprise due diligence will confirm implementation readiness and exact contract scope.

---

## Slide 21 — Migrate by route and content group while both CMSs remain available

**Narrative job:** Replace “big migration” anxiety with a controlled sequence.

**Visible copy:**

Use six phases:

1. **Inventory** — 27 sites, content types, languages, Paragraphs, media, redirects, forms, roles, integrations.
2. **Map** — target models, ownership, transformations, URL rules, validation, and archive decisions.
3. **Migrate by lane** — pages route by route, news in repeatable collection waves, and forms one by one.
4. **Serve both** — Next.js resolves each route to Payload, a Drupal adapter, or an explicitly tracked Drupal iframe.
5. **Validate and switch** — use deltas/reconciliation only where content keeps changing; then switch route ownership and monitor rollback.
6. **Retire incrementally** — remove the completed wave's Drupal read path, iframe, delta feed, and reconciliation scope; decommission the remaining estate only after the last wave.

Bottom line:

> Wave-based ownership keeps delivery focused and reduces Drupal dependency after each accepted migration.

**Visual:** A left-to-right path labeled `inventory → migrate by lane → dual-source frontend → validate → switch route ownership → retire connection`, not a Gantt chart.

**Talk track:**

- Static, dynamic, global, local, and existing Drupal pages can move route by route; existing iframe delivery is an acceptable tracked bridge during the transition.
- Global and local news are good candidates for bulk import plus selective deltas while editors continue publishing in Drupal.
- Forms move form by form because they include process, consent, notifications, uploads, and integrations.
- The new content model should serve the future; do not recreate every historical Drupal abstraction.

**Source notes:**

- [Drupal core JSON:API overview](https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module)
- [Drupal JSON:API filtering](https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/filtering)
- [Drupal JSON:API pagination](https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/pagination)
- [Drupal JSON:API revisions and limitations](https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/revisions)
- [Payload REST API](https://payloadcms.com/docs/rest-api/overview)

---

## Slide 22 — Next.js can route every page to its current owner during migration

**Narrative job:** Explain the existing mixed frontend as a deliberate migration capability while preserving one owner for every route or item.

**Visible copy:**

```text
Request
  │
  ▼
Next.js route resolver
  ├── Payload route
  ├── Drupal content adapter
  └── tracked Drupal iframe route

Per accepted wave:
migrate → preview/QA → switch route owner → monitor → remove Drupal connection
```

Non-negotiable rules:

- Next.js may read from both systems, but one CMS owns each route or item.
- Simple pages do not need permanent synchronization; migrate, validate, and switch them directly.
- High-change collections may use one-way Drupal → Payload deltas plus reconciliation until cutover.
- No free editing of the same item in both systems.
- Existing iframe routes are tracked migration bridges, not the target architecture.
- Each accepted wave removes its Drupal adapter, iframe, event feed, and reconciliation scope after the rollback window.

**Visual:** Refresh [`diagrams/drupal-coexistence-migration.png`](./diagrams/drupal-coexistence-migration.png) before the next slide export. Put Next.js route resolution at the center, show Payload and Drupal as temporary read sources, show the existing iframe path explicitly, and end each wave with a visible Drupal-connection retirement step.

**Talk track:**

- The current website already mixes Next.js and Drupal pages; the plan formalizes that behavior instead of pretending coexistence starts from zero.
- Route-level ownership keeps rollback simple: switch the route back during the agreed window without enabling bidirectional editing.
- Use events and reconciliation only for collections that remain active during a longer migration window, not for every simple page.
- The migration register tracks owner, delivery mode, wave, validation state, rollback window, and connection retirement.

**Suggested migration ledger fields:**

`routeGroup`, `routePattern`, `ownershipState`, `deliveryMode`, `migrationWave`, `sourceSystem`, `sourceUUID`, `targetID`, `validationState`, `rollbackUntil`, `connectionRetiredAt`, `error`.

**Source notes:**

- [Drupal JSON:API resources](https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module)
- [Drupal JSON:API includes for relationships](https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/includes)
- [Payload REST CRUD and custom endpoints](https://payloadcms.com/docs/rest-api/overview)

The dual-source route resolver and selective event/reconciliation design are our architecture recommendation; they are not a vendor-provided Drupal migration product.

---

## Slide 23 — Protect content fidelity during cutover; simplify after each route is stable

**Narrative job:** Answer the feasibility question for structured and unstructured Drupal content.

**Visible copy:**

| Drupal source shape              | Initial migration treatment               | Later treatment                                    |
| -------------------------------- | ----------------------------------------- | -------------------------------------------------- |
| Structured Paragraphs/components | Map to approved CMS blocks                | Improve mapping as models evolve                   |
| Simple static pages              | Migrate one by one to structured fields   | Editorial refinement                               |
| Large rich-text bodies           | Preserve in a controlled migration format | Normalize selectively after cutover                |
| Global/country posts             | Map scope, tenant, locale, taxonomy, SEO  | Consolidate duplicate global/local patterns        |
| Forms                            | Inventory fields **and behavior**         | Rebuild and acceptance-test before routing traffic |

Guardrails for legacy rich text:

- Apply a security allowlist and identify unsupported embeds.
- Maintain links, media references, and source traceability.
- Keep all migrated content visually governed by the Next.js design system.

Bottom statement:

> Keep content intact during cutover. Simplify it after the route is stable and the value is clear.

**Visual:** Before/after content examples: one structured Drupal Paragraph mapping to a Payload block, and one rich-text page preserved in a controlled legacy container.

**Talk track:**

- This avoids forcing every historical page through an expensive redesign before the platform can launch.
- Preserved rich text is a migration lane, not a permanent excuse for arbitrary authoring.
- Add a content-quality report for unsupported tags, broken media, missing alt text, malformed links, and locale gaps.

---

## Slide 24 — Build the business case on retired duplication and total cost

**Narrative job:** Present costs professionally without inventing a business case.

**Visible copy:**

Use the formula:

> **Planning-horizon business case** = target platform TCO + transition overlap − retired Acquia/Varnish/Drupal costs

Comparison:

| Cost area              | Payload                                           | Directus                                    |
| ---------------------- | ------------------------------------------------- | ------------------------------------------- |
| Core licensing         | MIT-licensed core; operating costs still apply    | MSCL; enterprise terms apply at our scale   |
| Enterprise capability  | Vendor quote                                      | Vendor quote                                |
| Infrastructure         | GKE + Cloud SQL + GCS + observability             | Broadly similar GCP footprint               |
| Implementation         | Confirm Enterprise scope before sizing extensions | Confirm ONE-specific integration scope      |
| Skills + operating fit | Strong alignment with React and TypeScript        | Vue required for Studio extensions          |
| Exit + renewal         | Low core-license dependency                       | Portable data; contract usage rights matter |

Bottom statement:

> The business case should use vendor quotes and total cost across the approved delivery and operating horizon.

**Visual:** A waterfall placeholder with named cost buckets but no invented values. If finance data is available, replace it with current / transition / target annual run-rate bars.

**Talk track:**

- Open-source licensing does not remove engineering, GCP, migration, support, or operating costs.
- Price Payload's Enterprise capabilities first and estimate only the proven gaps after the demonstration.
- Request an Enterprise quote from Directus; Team pricing is only a public reference point, not our expected cost.
- Directus can be self-hosted on every tier, but self-hosting does not remove its license, feature-limit, support, or renewal considerations.
- Dual-run is a temporary cost that buys rollback safety.
- Align the model to the remaining delivery window and the operating horizon approved for the business case; include exit risk and support exposure.

**Source notes:**

- [Payload self-hosted and Enterprise overview](https://payloadcms.com/get-started)
- [Directus current pricing](https://directus.com/pricing)

**Inputs required before a financial approval deck:**

- Acquia, Varnish, Drupal support, and cross-cloud annual costs.
- GCP cluster/shared-capacity assumptions.
- Cloud SQL size, HA, storage, backup, and egress assumptions.
- GCS asset volume and delivery pattern.
- CMS users, countries, languages, environments, collections, and Flow counts.
- Engineering and content-team effort for migration, forms, workflow, training, and operations.
- Payload and Directus enterprise quotes with support/SLA details.

---

## Slide 25 — The Payload PoC will confirm readiness for implementation

**Narrative job:** Explain how the planned PoC will turn the remaining assumptions into implementation evidence.

**Visible copy:**

> **PoC purpose**
>
> Produce evidence on editorial outcomes, platform operations, migration safety, Enterprise capability, and commercial fit.

The PoC will confirm:

1. Country and language isolation under real roles.
2. Content-manager usability for translation, live preview, trash, and restore.
3. A real dynamic form, including consent, upload, notifications, and retention.
4. GKE + Cloud SQL + GCS deployment, logging, backup, and restore.
5. Dual-source routing, one representative migration wave, rollback, and per-wave Drupal connection retirement.
6. Upgrade safety for custom Admin and workflow code.
7. Enterprise Publishing Workflows and static A/B testing: roles, feedback, notifications, variant delivery, analytics, and rollback.
8. Enterprise AI and MCP demonstration for writers, translators, editors, developers, permissions, audit, and cost control.
9. Enterprise support, SLA, security, and commercial terms.

If a material gap is identified, update the recommendation using the Directus evidence already gathered.

**Visual:** One purpose statement, nine concise acceptance areas, and a two-branch evidence outcome at the bottom: `Criteria met → implementation plan + quantified TCO` / `Material gap identified → update recommendation using Directus evidence`. Both branches still end in one selected CMS.

**Talk track:**

- The PoC should include engineering, content, QA, platform, security, and procurement.
- Define material-gap criteria before starting so the evidence can be assessed consistently.
- The PoC evidence informs implementation planning; production approval remains a separate decision.

**Close with:**

> The PoC converts remaining assumptions into evidence for the implementation plan and business case.

---

# 6. Qualitative decision rationale

Use the following reasoning consistently across the deck, speaker notes, and management discussion:

| Decision lens               | Payload advantage                                                                                                     | Directus strength                                                                      | Why Payload is recommended                                                                          |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Content operations          | Packaged publishing workflows, static A/B testing, official headless forms, and Enterprise AI                         | Mature Studio, Flows, AI Assistant, AI Translations, and MCP                           | Payload covers the priority editorial outcomes while fitting ONE's headless delivery model          |
| Engineering alignment       | React, TypeScript, and Next.js across configuration, Admin extensions, frontend integration, and ONE-specific logic   | Strong APIs and Node/TypeScript extensions; Studio extensions use Vue                  | Payload keeps more of the platform inside ONE's established engineering model                       |
| Platform ownership          | MIT-licensed core, GCP self-hosting, PostgreSQL, GCS, and replaceable components                                      | Self-hosting and database neutrality; commercial usage rights require contract clarity | Payload provides the clearer long-term ownership and exit model                                     |
| Environment and operations  | Code-first migrations, standard GCP controls, activity logs, revisions, and Enterprise support                        | Packaged Environment Sync is a meaningful advantage                                    | Directus leads this area, but not the combined content, engineering, and ownership fit              |
| Migration and future change | Typed hooks and code-first extensibility align with the planned Drupal adapters, route ownership, and gradual cutover | Flexible APIs and automation can also support migration                                | Payload reduces stack switching in the ONE-specific work that remains after the product is selected |

This framework intentionally avoids weighted scores. The decision should be challenged through evidence, contract scope, residual engineering, and operating consequences—not debates about arbitrary decimal values.

---

# 7. Repository evidence map

Use this internal table when producing screenshots, speaker notes, and the final claim ledger. It is preparation material, not a meeting slide or live-demo plan.

| Capability                     | Current evidence                                            | Status for presentation                              |
| ------------------------------ | ----------------------------------------------------------- | ---------------------------------------------------- |
| Separate CMS and web apps      | `README.md`, `apps/cms`, `apps/web`                         | Implemented in repository                            |
| PostgreSQL adapter             | `packages/payload-config/src/payload.config.ts`             | Implemented in repository                            |
| Country tenancy                | `multiTenantPlugin` configuration using Countries           | Implemented; validate internally                     |
| Locales                        | `packages/payload-config/src/locales.ts`; `fallback: false` | Implemented; public routes tested                    |
| Drafts, versions, autosave     | News, Pages, Locations, Homepage configs                    | Implemented; validate internally                     |
| Trash                          | `Pages.ts` has `trash: true`                                | Implemented only for Pages                           |
| Live preview                   | News and Pages `admin.livePreview`                          | Implemented; validate internally                     |
| Review/translate/publish       | `workflow.ts`, `WorkflowActionButton.tsx`                   | Implemented; validate internally; expand PoC tests   |
| Scheduled publishing           | `scheduledPublishing.ts`, Payload jobs config               | Implemented; validate internally                     |
| Workflow inbox/activity        | `WorkflowInbox.tsx`, `EditorialActivities.ts`               | Implemented; validate internally                     |
| Multi-country public filtering | public content/navigation routes                            | Implemented; selected E2E coverage                   |
| Fixed public forms             | `PublicForms.tsx`, protected submission collections         | Implemented; not dynamic Form Builder                |
| SEO                            | Payload SEO plugin, `seo.ts`, crawler E2E test              | Implemented; capture one verified example            |
| Approved page structures       | Pages block configuration                                   | Implemented                                          |
| GCS                            | No GCS adapter dependency/config present                    | Not implemented; PoC gate                            |
| Dynamic Form Builder           | No Form Builder plugin present                              | Not implemented; PoC gate                            |
| Drupal migration/sync          | No migration package/ledger present                         | Not implemented; PoC gate                            |
| Payload Enterprise AI          | Enterprise capability is not implemented in this repository | Current target entitlement; vendor demo pending      |
| Future model extension         | No implementation present                                   | Build only for a confirmed Enterprise capability gap |
| MCP                            | No MCP plugin present                                       | Not implemented; future/PoC gate                     |
| Production SSO                 | No production IdP integration shown                         | Not implemented; PoC gate                            |
| Payload Enterprise audit       | Vendor capability not implemented in this repository        | Current target entitlement; vendor demo pending      |
| ONE audit controls and DR      | Custom editorial activity only; no restore drill            | Retention/export/SIEM and recovery remain PoC gates  |

---

# 8. Migration design outline

Next.js is the temporary composition boundary. It can serve Payload routes, Drupal adapter routes, and explicitly tracked Drupal iframe routes at the same time. Migration changes route ownership in waves; it does not require every content type to be continuously copied into both CMSs.

Use three delivery lanes:

- **Pages:** migrate and switch route ownership one by one or in small route groups.
- **News:** use repeatable global/local collection imports, with deltas and reconciliation only while Drupal remains active.
- **Forms:** rebuild and accept form by form before switching traffic.

## 8.1 Inventory deliverable

Create a machine-readable inventory for all 27 Drupal instances:

- Drupal version and enabled modules.
- Content types, fields, Paragraph types, taxonomies, media types, menus, redirects, and aliases.
- Languages, fallback behavior, translation completeness, and revision settings.
- Node counts by type, country, language, status, and last-updated range.
- File counts, sizes, MIME types, missing files, derivative styles, and external embeds.
- Webforms/forms, validation, conditional logic, emails, CRM/ticket integrations, consent text, retention, exports, and ownership.
- Roles, permissions, approval modules, scheduled publishing, and custom PHP plugins.
- JSON:API readiness, authentication, rate limits, and access to revisions.
- URL, sitemap, canonical, hreflang, redirect, and search-index behavior.
- Data that should be migrated, redesigned, archived, or deleted.

## 8.2 Mapping manifest

Store mapping rules as reviewed code/data, not tribal knowledge:

```yaml
sourceSite: japan
sourceType: node--news
targetCollection: news
ownership: drupal_until_cutover
identity:
  sourceUUID: id
  sourceRevision: meta.revision_id
fields:
  title: attributes.title
  country: constant:JP
  locale: response_language
  body: transform:map_news_body
  heroMedia: transform:import_media
  seo: transform:map_metatags
urls:
  sourceAlias: attributes.path.alias
  redirectPolicy: preserve_or_301
```

Every mapping change increments a `mappingVersion`. Re-running the import with the same source revision and mapping version must be a no-op.

## 8.3 Identity and idempotency

Use a unique target key such as:

```text
(sourceSystem, sourceSite, sourceType, sourceUUID)
```

Never rely on Drupal numeric IDs alone; they can collide across 27 instances. Store the source revision and a canonical content hash. An import updates the existing target when the source revision or mapping version changes; it does not create a duplicate.

## 8.4 Delta events for active collections

Use delta events only when a collection continues changing in Drupal during a migration window, especially global or local news. Simple page-by-page and form-by-form cutovers do not need permanent event infrastructure.

Preferred event contract:

```json
{
  "eventId": "uuid",
  "sourceSystem": "drupal",
  "sourceSite": "jp",
  "entityType": "node",
  "bundle": "news",
  "entityUUID": "uuid",
  "revisionId": "12345",
  "operation": "upsert",
  "changedAt": "2026-08-30T12:00:00Z",
  "locale": "ja"
}
```

The event should identify the changed entity; the worker can retrieve authoritative content through authenticated JSON:API. This keeps payloads small and avoids embedding sensitive content in the event bus.

## 8.5 Reconciliation checks

For each source site/type/locale and migration wave, report:

- source versus target record count;
- newest source revision versus stored revision;
- canonical content-hash mismatch;
- missing/extra relationships;
- missing media and checksum mismatch;
- translation presence and workflow state;
- published/draft/unpublished mismatch;
- URL alias, canonical, redirect, and hreflang mismatch;
- unsupported rich-text elements and embeds;
- failed items by reason and retry count.

Use an explicit watermark with overlap, not “last successful timestamp only.” The overlap permits re-reading records near the boundary and relies on idempotent upsert to remove duplicates.

## 8.6 Cutover runbook per route group or collection wave

1. Declare the route group or collection wave, current owner, delivery mode, and rollback window.
2. Migrate and preview the Payload version; use baseline/delta synchronization only where the source remains active.
3. Validate URLs, SEO, media, permissions, preview, search, and complete form behavior where applicable.
4. Freeze the scoped Drupal source only when a final delta is needed.
5. Switch the Next.js route registry/read path to Payload.
6. Monitor errors, content parity, cache behavior, and editor operations.
7. If rollback is needed, switch route ownership back; do not enable reverse synchronization or dual editing.
8. After acceptance, mark the wave `payload_owned` and remove its Drupal adapter, iframe, delta publishing, reconciliation scope, and credentials.

---

# 9. Form-engine acceptance criteria

The PoC should implement one real, complex form from the existing estate and evaluate both the editor and respondent experience.

## Editor capabilities

- Create and version a form without a code deployment.
- Allowed field palette controlled by engineering.
- Localized label, help, validation, consent, success, and error copy.
- Conditional fields and at least one multi-step path.
- Country/site scoping and reusable global form option.
- Email/integration configuration with permission restrictions.
- Preview using the actual Next.js components.
- Draft/publish or effective-date behavior for form schema.

## Respondent capabilities

- Accessible keyboard and screen-reader behavior.
- Server-side validation identical to client expectations.
- Upload constraints and malware-scanning path.
- Clear success, failure, retry, and duplicate-submission behavior.
- Spam/rate-limit/bot controls.
- Mobile performance and localization.

## Data governance

- Least-privilege public submission endpoint.
- Submissions never exposed by public read APIs.
- Consent text/version stored with the submission.
- Configurable retention and deletion.
- PII redaction in logs and lower environments.
- Export and downstream delivery are audited.
- Failure queue/retry and alerting for CRM or email integrations.

---

# 10. Enterprise due-diligence questions

Ask both vendors the same base questions and record written answers.

## Commercial and support

- Exact self-hosted enterprise pricing for production, staging, development, DR, users, countries, collections, and environments.
- P1/P2 response targets, support hours, escalation path, and named technical contact.
- Availability of a private Slack or Microsoft Teams channel, who staffs it, and whether it is contractual or best-effort.
- Upgrade assistance, architecture reviews, and long-term support policy.
- Security-notification and vulnerability-response commitments.
- Termination, data export, and license consequences after contract end.

## Deployment and scale

- Supported GKE topology and recommended worker separation.
- Cloud SQL/PostgreSQL version support and connection-pooling guidance.
- Official GCS behavior for private assets, signed URLs, transformations, and large uploads.
- Tested scale for documents, versions, assets, users, locales, tenants, and concurrent editors.
- Zero/low-downtime migration guidance and rollback expectations.

## Security and identity

- Google Workspace/Cloud Identity SAML or OIDC integration.
- Group-to-role mapping and automatic deprovisioning.
- Audit scope, retention, immutability, export, and SIEM integration.
- Tenant-isolation reference architecture and test guidance.
- Encryption, secret handling, telemetry controls, and data residency.

## AI

- Live demonstration of the included Enterprise AI capability set using ONE-like roles, tenants, locales, and audit requirements.
- Any future external model path, including service-account/Workload Identity authentication, only where a confirmed requirement is not met by Enterprise configuration.
- Whether prompts/content leave our GCP boundary.
- Model/provider configuration by environment and tenant.
- Tool/action permission enforcement and audit.
- Ability to make AI read-only or draft-only by role.
- Translation provenance, source-version tracking, human approval, and cost controls.

## Product-specific questions for Payload

- Enterprise features versus MIT core and what happens without a renewed contract.
- Exact Enterprise licensing and supported versions for Publishing Workflows, SSO, static A/B testing, AI auto-embedding/RAG, AI translation, image generation, and the writing assistant.
- Live demonstration of multi-step approvals, inline feedback, notifications, locale-aware review, field-level access, and audit evidence using ONE-like roles.
- Supported model providers and adapters, including IAM, regionality, tenant filtering, logging, safety controls, and data-retention terms.
- Which A/B responsibilities Payload supplies versus ONE: variant assignment, static generation, analytics integration, experiment governance, and rollback.
- Visual Editor delivery status, licensing, supported Next.js versions, and the contractual distinction from Live Preview; it is currently marked Coming Soon and is not a launch dependency.
- Written confirmation of the long-term MIT and self-hosting commitment after joining Figma.
- Which legal entity provides support, product commitments, and escalation following the Figma acquisition.
- Governance and roadmap boundaries between Payload, Figma Sites CMS, and future paid features.
- Demonstrate Enterprise Activity Logs plus revisions/version control, including actor/action coverage, tenant isolation, retention, immutability, export, and SIEM integration.
- Recommended multi-locale workflow and maturity of localized status.
- Production guidance for custom Admin components across major upgrades.
- Form Builder support for conditional/multi-step forms and schema versioning.
- References for comparable self-hosted, multi-country, multilingual enterprise deployments.

## Product-specific questions for Directus

- Exact MSCL rights, Core/Team/Enterprise limits, license-key behavior, renewal terms, and consequences after contract termination.
- Whether Basic or Premium support is included for our self-hosted agreement, including actual P1/P2 targets and 24/7 critical coverage.
- Availability of a dedicated support manager and contractual private Slack or Microsoft Teams channel.
- Directus v12.3 Environment Sync rollback and destructive-change controls.
- Exact objects included/excluded from sync, including extensions and reference data.
- Whether Enterprise custom LLM support meets ONE's endpoint, IAM, and regionality requirements.
- AI Assistant maturity, role controls, audit, and beta/stability roadmap.
- Current availability and release plan for packaged multi-step approvals and scheduled releases beyond native draft/publish and versions.
- Recommended A/B architecture, including CMS modeling, feature-flag ownership, analytics, static delivery, experiment governance, and rollback.
- Best-practice single-instance row-level tenancy for 26 countries plus global content.
- Recommended first-party approach for editor-defined public forms.
- References for comparable GCP-hosted, multi-country, multilingual deployments and migrations from a multi-CMS estate.

---

# 11. Risk register for the decision slide and appendix

| Risk                                                | Why it matters                                              | Mitigation / gate                                                                                              |
| --------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Payload Enterprise workflow does not fit ONE policy | Packaged capability may still leave costly gaps             | Require vendor demonstration; time-box only the proven extensions; compare against Directus workflow benchmark |
| Payload editor UX is not accepted                   | Engineering fit cannot compensate for poor daily authoring  | Structured content-manager usability sessions with representative tasks and success thresholds                 |
| Tenant data leakage                                 | Centralization increases blast radius                       | Default-deny access, country-role matrix, automated cross-tenant API/Admin tests, security review              |
| Translation model is too coarse                     | Country and language workflows differ                       | Per-locale status/provenance/outdated model; translator and publisher testing                                  |
| Dynamic forms miss existing Drupal behavior         | Forms hide integrations and compliance logic                | Inventory and rebuild one complex production form during PoC                                                   |
| Rich-text fidelity loss                             | Historic pages contain unsupported markup/embeds            | Preserve sanitized legacy representation, exception report, visual comparison, staged normalization            |
| Selective sync misses or duplicates news updates    | An active collection wave becomes untrustworthy             | Stable UUID/revision keys, idempotent upsert, event IDs, reconciliation with overlap, migration ledger         |
| Bidirectional editing creates conflicts             | Automated conflict resolution is expensive and unsafe       | One owner per route/item; explicit route registry and cutover state; rollback by route switch                  |
| Dual-source routing or iframes become permanent     | Transitional complexity can turn into a second legacy layer | Wave exit criteria require adapter, iframe, sync scope, credentials, and monitoring removal after acceptance   |
| GCS/DB backup is not restorable                     | Backup configuration alone does not prove recovery          | Scheduled restore drills with measured RPO/RTO and media/config recovery                                       |
| Payload upgrades break custom Admin code            | Custom UI increases coupling                                | Pin versions, automated upgrade branch, Admin E2E and visual checks, enterprise support                        |
| Figma ownership changes Payload’s roadmap           | Backing adds resources but concentrates strategic control   | Written MIT/self-host commitment, contract exit terms, monitor roadmap, keep migration/export path             |
| Directus license or tier terms change               | Self-hosting does not eliminate commercial usage rights     | Written MSCL/renewal terms, multi-year price protections, exit test, preserve portable database and media      |
| Directus comparison becomes stale                   | v12.3 and AI features are moving quickly                    | Re-verify official documentation immediately before decision meeting                                           |
| Cost case is overstated                             | “Free core” can hide engineering and operations             | Planning-horizon TCO with actual contracts, FTE assumptions, enterprise quotes, and transition-overlap cost    |

---

# 12. Appendix slide plan

## Appendix A1 — Directus strengths and areas to validate

Strengths: two-decade platform history, substantial GitHub/community adoption, formal Basic/Premium support, public enterprise references, v12.3 Environment Sync, Activity Log, granular policies, content versions, Flows, native AI, database/API neutrality, and existing internal knowledge.

Areas to validate: MSCL enterprise terms, tier and feature scope, renewal and long-term rights, Vue Studio extensions, headless-form implementation, and single-instance tenancy design.

## Appendix A2 — Vendor questions and source register

Use the due-diligence questions from section 10 and the source register below. This appendix provides traceability without overloading the main slides.

Detailed capability matrices, GCP controls, migration-ledger mechanics, content-type wave detail, and cost worksheets remain in this document for working sessions. They are intentionally excluded from the management presentation.

---

# 13. Source register

All non-trivial vendor claims in the eventual deck should have a `[Sources]` block in speaker notes. Re-check links immediately before creating the final deck because Directus v12.3, AI capabilities, GitHub metrics, and the Payload/Figma roadmap can change.

## Payload CMS

- Self-hosting, MIT core, and Enterprise overview: <https://payloadcms.com/get-started>
- GitHub repository, community metrics, Discussions, Issues, and Discord links: <https://github.com/payloadcms/payload>
- MIT license text: <https://github.com/payloadcms/payload/blob/main/LICENSE.md>
- Figma announcement that Payload joined its team: <https://www.figma.com/blog/payload-joins-figma/>
- Figma 2025 annual report and Payload acquisition disclosure: <https://s206.q4cdn.com/973901332/files/doc_financials/2025/q4/fig-20251231.pdf>
- Payload announcement and open-source/self-hosting commitments after joining Figma: <https://payloadcms.com/posts/blog/payload-is-joining-figma>
- Public customer case studies: <https://payloadcms.com/case-studies>
- Enterprise overview and dedicated support: <https://payloadcms.com/enterprise>
- Enterprise A/B variant testing: <https://payloadcms.com/enterprise/headless-ab-variant-testing>
- Enterprise publishing workflows: <https://payloadcms.com/enterprise/publishing-workflows>
- Enterprise AI framework: <https://payloadcms.com/enterprise/ai-framework>
- Enterprise SSO: <https://payloadcms.com/enterprise/single-sign-on-sso>
- Enterprise Visual Editor, explicitly marked Coming Soon: <https://payloadcms.com/enterprise/visual-editor>
- Enterprise AI translation, image generation, writing assistant, and permission controls: <https://payloadcms.com/enterprise/enterprise-ai>
- Mazda New Zealand case study and vendor-published metrics: <https://payloadcms.com/case-studies/mazda>
- Microsoft case study: <https://payloadcms.com/case-studies/microsoft>
- Configuration model: <https://payloadcms.com/docs/configuration/overview>
- PostgreSQL/production deployment: <https://payloadcms.com/docs/production/deployment>
- GCS storage adapter: <https://payloadcms.com/docs/upload/storage-adapters>
- Multi-tenant plugin: <https://payloadcms.com/docs/plugins/multi-tenant>
- Localization and localized status: <https://payloadcms.com/docs/configuration/localization>
- Versions: <https://payloadcms.com/docs/versions/overview>
- Drafts and scheduling: <https://payloadcms.com/docs/versions/drafts>
- Autosave: <https://payloadcms.com/docs/versions/autosave>
- Trash: <https://payloadcms.com/docs/trash/overview>
- Live Preview: <https://payloadcms.com/docs/live-preview>
- Server-side Live Preview: <https://payloadcms.com/docs/live-preview/server>
- Access control: <https://payloadcms.com/docs/access-control/overview>
- Document locking: <https://payloadcms.com/docs/admin/locked-documents>
- Form Builder: <https://payloadcms.com/docs/plugins/form-builder>
- SEO plugin: <https://payloadcms.com/docs/plugins/seo>
- Migrations: <https://payloadcms.com/docs/database/migrations>
- REST API: <https://payloadcms.com/docs/rest-api/overview>
- Jobs and schedules: <https://payloadcms.com/docs/jobs-queue/schedules>
- React custom components: <https://payloadcms.com/docs/custom-components/overview>
- MCP plugin: <https://payloadcms.com/docs/plugins/mcp>

## Directus

- GitHub repository, dated metrics, license summary, Forum, Discord, Issues, and roadmap links: <https://github.com/directus/directus>
- Current pricing, limits, custom LLM, and AI translations: <https://directus.com/pricing>
- Enterprise support, security, self-hosting, and customer references: <https://directus.com/enterprise>
- Basic and Premium support tiers: <https://docs.directus.io/getting-started/support>
- Two decades of platform history: <https://directus.com/resources/directus-two-decades>
- Copa Airlines case study: <https://directus.com/case-studies/copa-airlines>
- Club Med global CMS consolidation story: <https://directus.com/resources/how-directus-helped-a-global-luxury-travel-leader-unify-its-cms-stack>
- Ripley Entertainment customer story: <https://directus.com/resources/ripley-entertainment>
- Fortuna Entertainment Group customer story: <https://directus.com/resources/fortuna-entertainment-group>
- v12.3 Environment Sync: <https://directus.com/resources/12.3-release-notes>
- Environment Sync design: <https://directus.com/resources/building-environment-sync>
- Architecture: <https://docs.directus.io/getting-started/architecture>
- PostgreSQL/GCS self-hosted configuration: <https://docs.directus.io/self-hosted/config-options>
- Extension model: <https://docs.directus.io/extensions/introduction>
- Permissions: <https://docs.directus.io/user-guide/user-management/permissions>
- Multi-tenancy approaches: <https://docs.directus.io/user-guide/overview/glossary>
- v12 native draft/publish and approval-workflow status: <https://directus.com/resources/v12-built-for-the-whole-team>
- Content versioning: <https://directus.com/docs/guides/content/content-versioning>
- Directus and PostHog A/B testing pattern: <https://directus.com/tv/enter-the-workshop/setting-up-ab-testing-posthog>
- Live Preview with Next.js: <https://docs.directus.io/guides/headless-cms/live-preview/nextjs>
- Content translations: <https://docs.directus.io/guides/headless-cms/content-translations>
- Activity Log: <https://docs.directus.io/user-guide/settings/activity-log>
- Archive/soft-delete configuration: <https://docs.directus.io/app/data-model/collections>
- Form + Next.js pattern: <https://docs.directus.io/blog/building-a-form-data-collection-and-email-notification-system-with-directus-and-next-js>
- AI overview, Assistant, AI Translations, and MCP: <https://directus.com/docs/guides/ai>
- Directus MCP server: <https://directus.com/docs/guides/ai/mcp>

## Drupal current estate and migration

- Core JSON:API overview: <https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module>
- Filtering: <https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/filtering>
- Pagination: <https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/pagination>
- Includes/relationships: <https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/includes>
- Revisions and limitations: <https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/revisions>
- Translations and limitations: <https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/translations>
- Composer dependency management: <https://www.drupal.org/docs/develop/using-composer/manage-dependencies>
- Core update process: <https://www.drupal.org/docs/updating-drupal/updating-drupal-core-via-composer>
- Configuration management: <https://www.drupal.org/docs/administering-a-drupal-site/configuration-management/managing-your-sites-configuration>
- Multisite considerations: <https://www.drupal.org/docs/multisite-drupal/multisite-drupal-considerations>
- Decoupled Preview contributed module: <https://www.drupal.org/project/decoupled_preview>
- Webform Headless contributed module: <https://www.drupal.org/project/webform_headless>

## Google Cloud

- Cloud SQL high availability: <https://docs.cloud.google.com/sql/docs/postgres/configure-ha>
- Cloud SQL PITR: <https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/pitr>
- Cloud SQL backup options: <https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/backup-options>
- Cloud Storage protection overview: <https://docs.cloud.google.com/storage/docs/introduction>
- Cloud Storage object versioning: <https://docs.cloud.google.com/storage/docs/object-versioning>
- GKE Workload Identity Federation: <https://docs.cloud.google.com/kubernetes-engine/docs/concepts/workload-identity>
- GKE horizontal autoscaling: <https://docs.cloud.google.com/kubernetes-engine/docs/how-to/horizontal-pod-autoscaling>

---

# 14. Final production checklist for the eventual deck

## Content

- Slides 2–6 establish the current-to-target differences in architecture, cost, operations, authoring, engineering, and headless delivery before any product recommendation.
- The recommendation appears only after the requirements and comparison frame are established.
- Directus has one full product-strength slide and one full enterprise/community-confidence slide.
- Every comparison distinguishes vendor-documented, internally validated, implemented, and custom capability.
- The cost slide contains no invented Acquia, GCP, or enterprise values.
- The recommendation is a PoC, not premature production approval.
- GitHub stars and customer stories are shown as adoption signals, not proof of security, support quality, or architecture fit.
- The Figma statement says Figma acquired Payload and committed to its open-source core; it must not be rewritten as “Figma uses Payload for everything.”
- Directus is described as source-available under MSCL, not MIT or unrestricted open source.
- Migration explicitly forbids uncontrolled bidirectional editing.
- Coexistence shows Next.js reading both CMSs temporarily, including tracked Drupal iframe routes, with one authoritative owner per route/item and explicit connection retirement after each accepted wave.
- Payload Enterprise AI and MCP are presented as current target scope with a pending vendor demonstration; any separate model provider is a later option for a documented gap.
- Rich-text preservation and later normalization are both explained.
- Forms, tenancy, workflow, translation, audit, backup, GCS, and environment sync are all addressed.

## Evidence

- Validate repository claims in the separate team demo before finalizing the management deck.
- Keep the management meeting free of browser handoffs, live-demo timing, and demo-only slides.
- Capture and verify any product screenshots used in the deck in advance.
- Update the repository evidence map if implementation changes.
- Re-check Payload and Directus official pages immediately before finalizing speaker notes.
- Confirm Directus pricing and limits because the current model is recent.
- Refresh both Payload and Directus GitHub stars/forks and retain the snapshot date immediately before presenting.
- Re-check Directus MSCL, tier limits, Enterprise-support terms, and public customer references.
- Re-check Payload/Figma ownership, open-source, self-hosting, and Enterprise-support statements.
- Obtain written enterprise answers; do not infer support SLAs.
- Place a `[Sources]` block in speaker notes for every external non-trivial claim and asset.

## Visual QA

- Use takeaway titles exactly or shorten without changing the claim.
- Keep title text on one line where designed as one line.
- Keep body copy at 16 pt or above; prefer 18–22 pt for the management deck.
- Use at least 35 pt slide titles and 50 pt deck title.
- Inspect every screenshot crop at full slide size.
- Use six to eight purposeful diagrams/charts, and ensure each explains a relationship that prose cannot show as clearly. Do not repeat card-grid layouts.
- Target and migration architecture diagrams show exactly one vendor-neutral `CMS` component. Payload and Directus logos belong only on candidate-comparison slides.
- Verify all connectors, labels, and country/locale examples.
- Do not use repeated card grids or decorative UI chrome.

---

# 15. Final presenter message

Use this as the closing summary, not as a text-heavy slide:

> Payload is not the recommendation because Directus lacks features. Directus is stronger today in packaged environment sync, Studio AI, and parts of the editorial experience. Both products provide serious AI and MCP workflows plus activity logging and revisions/version control at the evaluated enterprise level. Payload is the recommendation because its Enterprise portfolio and official MCP plugin add AI, workflow, and audit to an architecture where the remaining ONE-specific work—preview, governed authoring, forms, migration, observability, and policy—fits our TypeScript, React, Next.js, and GCP operating model naturally and keeps the self-hosted core MIT licensed.
>
> The planned team PoC and Payload Enterprise demonstration will confirm editor usability, tenancy, dynamic forms, dual-source Drupal coexistence, Enterprise AI governance, GCP operations, upgrade safety, and support. The resulting evidence will inform the implementation plan and, if a material gap is identified, update the recommendation using the Directus comparison already completed.
