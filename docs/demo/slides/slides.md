---
theme: default
title: One content platform on GCP
author: ONE
colorSchema: light
aspectRatio: 16/9
canvasWidth: 1280
transition: fade
download: false
exportFilename: cms-platform-decision
fonts:
  provider: none
layout: cover
class: cover-slide
hideInToc: true
defaults:
  layout: default
  transition: fade
---

<img class="one-logo" src="/one-logo.svg" alt="Ocean Network Express" />

# One content platform on GCP

<div class="cover-subtitle">Why the 27-site Drupal estate no longer scales—and how we choose a successor</div>

<div class="cover-meta">Decision proposal · 30 August 2026</div>

<!--
We are choosing an operating model for the next several years, not merely comparing feature lists.

First: why the current estate has become expensive and difficult. Then: the decision criteria, the two credible candidates, and a bounded next step.
-->

---

<div class="eyebrow">Current architecture</div>

# Today Next.js already mixes native and Drupal delivery across the GCP / Acquia boundary

<img class="diagram-image current-context" src="/diagrams/current-platform-context.png" alt="Current CMS delivery context showing Next.js connecting directly across the GCP and Acquia boundary to Drupal" />

<!--
This is a management abstraction of the supplied Unicorn architecture, not a replacement for the engineering diagram.

The Apigee API portal is a separate CRM integration and is intentionally outside this CMS diagram. Drupal does not depend on the unrelated external API.

Confirm the exact instance count, Acquia environments, Varnish placement, direct Next.js-to-Drupal content and iframe path, and annual cost categories before presenting.
-->

---

<div class="eyebrow">Operating-model difference</div>

# Twenty-seven duplicated stacks versus one governed platform

<div class="operating-model">
  <div class="model-side current-model">
    <div class="model-number">27×</div>
    <h2>Current estate</h2>
    <div class="model-line"><strong>Runtime</strong><span>Country + global CMS instances</span></div>
    <div class="model-line"><strong>Change</strong><span>Repeated patches, releases, and testing</span></div>
    <div class="model-line"><strong>Cost</strong><span>Acquia + Drupal + Varnish + cross-cloud work</span></div>
    <div class="model-line"><strong>Data</strong><span>Reuse and reporting cross isolated databases</span></div>
  </div>
  <div class="model-arrow"><span>centralize governance</span>→</div>
  <div class="model-side target-model">
    <div class="model-number">1</div>
    <h2>Target platform</h2>
    <div class="model-line"><strong>Runtime</strong><span>One logical CMS on GCP</span></div>
    <div class="model-line"><strong>Change</strong><span>Shared deployment and regression controls</span></div>
    <div class="model-line"><strong>Cost</strong><span>GCP + support + engineering</span></div>
    <div class="model-line"><strong>Data</strong><span>Country policy + shared global content</span></div>
  </div>
</div>

<div class="callout soft">The savings hypothesis is reduced duplication—not a claim that the replacement CMS is free.</div>

<!--
The transition temporarily costs more because both platforms run in parallel. Do not show a savings value until finance validates current and target inputs.

[Sources]
- https://www.drupal.org/docs/updating-drupal/updating-drupal-core-via-composer
- https://www.drupal.org/docs/administering-a-drupal-site/configuration-management/managing-your-sites-configuration
-->

---

<div class="eyebrow">Authoring difference</div>

# Today preview interrupts writing; the target keeps preview continuous

<div class="journey-compare">
  <div class="journey-row current-journey"><div class="journey-label">Current</div><div class="journey-track"><span>Write</span><i>→</i><span>Save</span><i>→</i><span>Request preview</span><i>→</i><span>Switch context</span><i>→</i><span>Return</span></div></div>
  <div class="journey-row target-journey"><div class="journey-label">Target</div><div class="journey-track"><span>Write within guardrails</span><i>⇄</i><span>Actual Next.js preview</span><i>→</i><span>Review / translate</span><i>→</i><span>Schedule / publish</span></div></div>
</div>

<div class="difference-strip">
  <div><strong>Continuous preview</strong><span>No separate low-confidence preview action</span></div>
  <div><strong>Role-shaped flow</strong><span>Review, translation, approval, schedule</span></div>
  <div><strong>Governed creation</strong><span>Approved blocks, forms, and human-reviewed Enterprise AI</span></div>
</div>

<div class="callout soft">Content-manager usability is a PoC gate. Engineering fit cannot compensate for poor daily authoring.</div>

<!--
These are differences in our implementation and target workflow, not claims that Drupal cannot be extended.

[Sources]
- Internal editor feedback and current preview workflow
- https://www.drupal.org/project/decoupled_preview
- https://www.drupal.org/project/webform_headless
-->

---

<div class="eyebrow">Engineering difference</div>

# Today CMS customization is a separate PHP stack; the target reuses TypeScript

<div class="stack-compare">
  <div class="stack-column">
    <div class="stack-heading">Current customization</div>
    <div class="stack-item muted-stack">Drupal + PHP modules</div>
    <div class="stack-seam">separate types · UI · tests · telemetry</div>
    <div class="stack-item muted-stack">Acquia operations</div>
  </div>
  <div class="model-vs">versus</div>
  <div class="stack-column">
    <div class="stack-heading">Target customization</div>
    <div class="stack-item primary-stack">CMS schema + hooks + jobs</div>
    <div class="stack-item primary-stack">React Admin + shared design system</div>
    <div class="stack-item primary-stack">TypeScript tests + GCP telemetry</div>
  </div>
</div>

<div class="callout">PHP is not the weakness; keeping CMS customization outside our main engineering system is the difference that matters.</div>

<!--
Payload maps most directly to the target. Directus backend extensions use Node/TypeScript, while Studio extensions use Vue. Centralizing in GCP still requires support, upgrades, security, and operations.
-->

---

<div class="eyebrow">Headless difference</div>

# Today headless delivery is assembled across seams; the target makes seams productized

<div class="seam-compare">
  <div class="seam-row"><div class="seam-label">Current</div><div class="seam-flow"><span>Drupal</span><b>JSON:API</b><b>preview / form modules</b><b>cache glue</b><span>Next.js</span></div></div>
  <div class="seam-row"><div class="seam-label">Target</div><div class="seam-flow target-seam"><span>Governed CMS model</span><b>typed content + workflow</b><b>live preview + forms</b><span>Next.js</span></div></div>
</div>

<div class="difference-strip four-up">
  <div><strong>Drafts</strong><span>Application-aware preview reads</span></div>
  <div><strong>Translation</strong><span>Per-locale state and provenance</span></div>
  <div><strong>Preview</strong><span>Actual website components</span></div>
  <div><strong>Forms</strong><span>Schema mapped to governed UI</span></div>
</div>

<div class="callout soft">Drupal core provides JSON:API. The decision is whether to keep owning these seams across 27 instances.</div>

<!--
Do not describe Drupal as incapable of headless delivery. The target still has integration; it concentrates that integration under one product-engineering model.

[Sources]
- https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module
- https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/revisions
- https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/translations
-->

---

<div class="eyebrow">Decision criteria</div>

# The replacement must satisfy editorial and engineering needs at the same time

<div class="columns-6">
  <div class="panel number-panel"><div class="number">01</div><h2>Platform ownership</h2><p>GCP, PostgreSQL, GCS, backup, and restore.</p></div>
  <div class="panel number-panel"><div class="number">02</div><h2>Global publishing</h2><p>Country tenancy, languages, roles, and row-level access.</p></div>
  <div class="panel number-panel"><div class="number">03</div><h2>Editorial control</h2><p>Draft, preview, review, approval, schedule, and translation state.</p></div>
  <div class="panel number-panel"><div class="number">04</div><h2>Structured experience</h2><p>Approved blocks and rich text—not arbitrary styling.</p></div>
  <div class="panel number-panel"><div class="number">05</div><h2>Digital operations</h2><p>Forms, SEO, audit, observability, and environment promotion.</p></div>
  <div class="panel number-panel"><div class="number">06</div><h2>Transition + platform</h2><p>Dual-source coexistence, Enterprise AI, optional Vertex, and support.</p></div>
</div>

<div class="callout soft">Failure in tenancy, workflow, forms, migration, or editor usability is a stop condition.</div>

<!--
Infrastructure is necessary but not differentiating. Forms and migration receive high weight because teams often underestimate them. AI remains valuable but secondary to publishing and migration safety.
-->

---
class: dense
---

<div class="eyebrow">Platform comparison</div>

# Both platforms clear the infrastructure baseline; the operating model separates them

| Decision area              | Payload                                            | Directus                                       |
| -------------------------- | -------------------------------------------------- | ---------------------------------------------- |
| Self-host, PostgreSQL, GCS | Strong                                             | Strong                                         |
| Next.js / TypeScript fit   | **Native-strength fit**                            | Strong API/SDK fit                             |
| Admin extension stack      | **React**                                          | Vue                                            |
| Multi-country model        | Official multi-tenant plugin + code                | Row-level policy or project scoping            |
| Workflow                   | **Enterprise workflows + extensible TypeScript**   | **Permissions + Flows + versioning**           |
| Headless forms             | **Official Form Builder**                          | Collections + frontend + Flows                 |
| Environment promotion      | Code + migrations; reference-data tooling needed   | **v12.3 Environment Sync**                     |
| Audit                      | **Enterprise Activity Logs + revisions**           | **Activity Log + revisions**                   |
| AI editor UX               | **Enterprise AI suite + MCP / React extension**    | **Native Assistant; Enterprise custom LLM**    |
| A/B testing + SSO          | **Enterprise static variants + SAML / OAuth 2.0**  | Enterprise SSO; custom A/B integration pattern |
| Commercial model           | MIT self-hosted core; Enterprise custom quote      | MSCL; Enterprise custom quote                  |

<div class="callout">Directus is a configurable data platform around SQL. Payload is a TypeScript application framework that includes a CMS.</div>

<!--
Our decision favors Payload because the remaining ONE-specific work—preview integration, forms, migration, observability, optional Vertex controls, and policy—fits our stack. Demonstrate Enterprise workflow, AI, and audit before estimating custom work.

[Sources]
- https://payloadcms.com/docs/configuration/overview
- https://payloadcms.com/docs/custom-components/overview
- https://payloadcms.com/enterprise/publishing-workflows
- https://payloadcms.com/enterprise/enterprise-ai
- https://payloadcms.com/enterprise/headless-ab-variant-testing
- https://payloadcms.com/enterprise/single-sign-on-sso
- https://docs.directus.io/getting-started/architecture
- https://docs.directus.io/extensions/introduction
- https://directus.com/resources/12.3-release-notes
- https://directus.com/pricing
-->

---
class: dense
---

<div class="eyebrow">Weighted assessment</div>

# Payload leads narrowly because our highest-weight requirements favor code-first React

<div class="metric-row">
  <div class="metric recommended"><span>Recommended</span><strong>4.76</strong><span>Payload / 5</span></div>
  <div class="metric alternative"><span>Competing candidate</span><strong>4.52</strong><span>Directus / 5</span></div>
</div>

| Criterion                    | Weight | Payload | Directus |
| ---------------------------- | -----: | ------: | -------: |
| GCP ownership + architecture |    15% |     5.0 |      5.0 |
| TypeScript / React fit       |    15% | **5.0** |      4.1 |
| Editorial workflow + preview |    14% |     4.7 |  **4.7** |
| Tenancy + localization       |    12% | **4.6** |      4.4 |
| Headless forms               |    10% | **4.8** |      3.8 |
| Environment promotion        |     9% |     4.3 |  **5.0** |
| Migration + coexistence      |     8% | **4.7** |      4.6 |
| Governance + audit           |     7% |     4.8 |      4.8 |

<div class="footer-note">Assessment—not vendor fact. Scores change when evidence, priorities, or commercial terms change.</div>

<!--
Payload's margin is deliberately narrow. Enterprise workflow, AI, and audit claims must be demonstrated and confirmed in contract scope. Directus can still lead if its native Studio, environment sync, and custom-LLM path prove materially stronger.
-->

---

<div class="eyebrow">Directus strengths</div>

# Directus is the stronger packaged product in several important areas

<div class="columns-4">
  <div class="panel"><h2>Environment Sync</h2><p>Pull, diff, and push schema, settings, roles, policies, permissions, Flows, and dashboards as JSON.</p></div>
  <div class="panel"><h2>Editorial automation</h2><p>Content versions, policy-driven stages, and visual Flows are strong packaged building blocks.</p></div>
  <div class="panel"><h2>Audit</h2><p>Built-in Activity Log plus item revisions and reversion.</p></div>
  <div class="panel"><h2>AI</h2><p>Native Assistant today; Enterprise advertises custom LLM and AI translation options.</p></div>
</div>

<div class="pros-cons" style="margin-top: 34px">
  <div><h2>Why it could win</h2><p>It reduces custom work in areas content teams will notice immediately.</p></div>
  <div><h2>Fit trade-offs</h2><p>Vue for Studio extensions and no equivalent first-party headless Form Builder.</p></div>
</div>

<div class="callout soft">Payload must beat these packaged strengths in the PoC—not dismiss them.</div>

<!--
[Sources]
- https://directus.com/resources/12.3-release-notes
- https://docs.directus.io/reference/system/versions
- https://docs.directus.io/guides/headless-cms/approval-workflows
- https://docs.directus.io/user-guide/settings/activity-log
- https://community.directus.io/t/introducing-directus-ai-assistant-sidebar-now-in-beta/1699
- https://directus.com/pricing
-->

---

<div class="eyebrow">Directus confidence</div>

# Directus has mature enterprise support and a large, proven ecosystem

<div class="flow">
  <div class="step"><strong>Two decades</strong><span>Directus traces its origin to 2004</span></div>
  <div class="step"><strong>Large community</strong><span>~37.7k stars, ~4.9k forks; vendor reports 45M+ downloads</span></div>
  <div class="step"><strong>Formal support</strong><span>Basic and Premium support paths with defined coverage</span></div>
  <div class="step"><strong>Enterprise adoption</strong><span>Club Med, Ripley, Fortuna, Copa Airlines, and other public references</span></div>
</div>

<div class="columns-2" style="margin-top: 34px">
  <div class="panel"><h2>Community channels</h2><p>Forum, Discord live chat, GitHub Issues, and a public roadmap.</p></div>
  <div class="panel"><h2>Commercial reality</h2><p>Source-available under MSCL—not MIT. Assume Enterprise due diligence for our scale and requirements.</p></div>
</div>

<div class="callout">Its trade-offs are stack fit, forms, and licensing—not maturity or lack of support.</div>

<!--
Metrics are dated 30 August 2026 and must be refreshed before presenting. Vendor-reported downloads and deployments are scale signals, not audited reliability evidence.

[Sources]
- https://github.com/directus/directus
- https://directus.com/pricing
- https://docs.directus.io/getting-started/support
- https://directus.com/enterprise
- https://directus.com/resources/directus-two-decades
- https://directus.com/resources/how-directus-helped-a-global-luxury-travel-leader-unify-its-cms-stack
- https://directus.com/resources/ripley-entertainment
- https://directus.com/resources/fortuna-entertainment-group
-->

---

<div class="eyebrow">Why Payload fits</div>

# Payload fits how our team already builds and governs software

<div class="architecture">
  <div class="node primary span-4">Next.js + React + TypeScript</div>
  <div class="node span-4">Shared UI · validation · observability · tests</div>
  <div class="node primary span-4">Payload Admin + APIs + jobs</div>
  <div class="node span-2">PostgreSQL</div><div class="node span-2">GCS on GCP</div>
</div>

<div class="columns-3" style="margin-top: 28px">
  <div class="panel"><h2>Govern through Git</h2><p>Workflow, access policy, migrations, and Admin UI changes are reviewable and testable.</p></div>
  <div class="panel"><h2>Extend the AI experience</h2><p>Use Enterprise AI where it fits; add Vertex controls and observability through React only where needed.</p></div>
  <div class="panel"><h2>Use one engineering model</h2><p>Avoid replacing PHP modules with a different low-code customization silo.</p></div>
</div>

<div class="callout soft">Payload does not eliminate engineering; it makes CMS engineering look like our normal application engineering.</div>

<!--
[Sources]
- https://payloadcms.com/docs/custom-components/overview
- https://payloadcms.com/docs/database/migrations
- https://payloadcms.com/docs/jobs-queue/schedules
- https://payloadcms.com/docs/access-control/overview
-->

---

<div class="eyebrow">Payload confidence</div>

# Payload combines open-source control with enterprise backing and visible adoption

<div class="flow">
  <div class="step"><strong>Control</strong><span>MIT core, source access, self-hosting, and no mandatory runtime SaaS</span></div>
  <div class="step"><strong>Support</strong><span>Dedicated engineering, workflows, SSO, A/B testing, AI/RAG, audit/version control, and self-hosting</span></div>
  <div class="step"><strong>Community</strong><span>~44.5k stars, ~4.1k forks, GitHub Discussions, Issues, and Discord</span></div>
  <div class="step"><strong>Backing</strong><span>Figma acquired Payload in 2025 and committed to continued open-source investment</span></div>
</div>

<div class="columns-2" style="margin-top: 34px">
  <div class="panel"><h2>Visible enterprise adoption</h2><p>Microsoft, Mazda, ASICS, Blue Origin, Sonos, and others. Mazda reports 85% lower annual cost and 3–5× faster delivery for its workload.</p></div>
  <div class="panel"><h2>Roadmap + contract boundary</h2><p>Visual Editor is marked Coming Soon. Confirm SLA, chat channel, upgrade support, feature licensing, and MIT/self-host guarantees.</p></div>
</div>

<div class="callout">Open source reduces exit risk; Enterprise support reduces operating risk. Evaluate both.</div>

<!--
Community metrics are dated 30 August 2026 and must be refreshed. Stars are adoption signals—not security, uptime, or support evidence. Customer stories prove specific workloads, not blanket certification.

[Sources]
- https://payloadcms.com/get-started
- https://github.com/payloadcms/payload
- https://www.figma.com/blog/payload-joins-figma/
- https://payloadcms.com/posts/blog/payload-is-joining-figma
- https://payloadcms.com/case-studies
- https://payloadcms.com/enterprise
- https://payloadcms.com/enterprise/publishing-workflows
- https://payloadcms.com/enterprise/visual-editor
- https://payloadcms.com/case-studies/mazda
- https://payloadcms.com/case-studies/microsoft
-->

---

<div class="eyebrow">Target architecture</div>

# One logical CMS adds current Enterprise capabilities without duplicating the runtime

<img class="diagram-image target-architecture" src="/diagrams/target-cms-gcp.png" alt="Vendor-neutral target CMS architecture on Google Cloud Platform" />

<div class="callout soft">Country isolation belongs in data, access, and audit policy—not duplicated runtime by default.</div>

<!--
[Sources]
- https://payloadcms.com/docs/production/deployment
- https://payloadcms.com/docs/upload/storage-adapters
- https://docs.directus.io/self-hosted/config-options
- https://docs.cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
- https://docs.cloud.google.com/sql/docs/postgres/configure-ha
- https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/pitr
-->

---

<div class="eyebrow">Content model</div>

# Country tenancy and language localization are separate dimensions

<div class="matrix">
  <div class="header">Content scope</div><div class="header">English</div><div class="header">Japanese</div><div class="header">Korean</div><div class="header">Vietnamese</div>
  <div class="header">Global</div><div class="active">✓</div><div class="active">✓</div><div class="active">✓</div><div class="active">✓</div>
  <div class="header">Japan</div><div class="active">✓</div><div class="active">✓</div><div>—</div><div>—</div>
  <div class="header">Korea</div><div class="active">✓</div><div>—</div><div class="active">✓</div><div>—</div>
  <div class="header">Vietnam</div><div class="active">✓</div><div>—</div><div>—</div><div class="active">✓</div>
</div>

<div class="columns-3" style="margin-top: 28px">
  <div class="panel"><h2>Country ownership</h2><p>A record is global or owned by a country/site; editors see permitted scopes.</p></div>
  <div class="panel"><h2>Locale independence</h2><p>Localized fields and per-locale workflow state are independent of ownership.</p></div>
  <div class="panel"><h2>No default duplication</h2><p>Separate databases are reserved for a documented legal or security exception.</p></div>
</div>

<!--
Japan content and Japanese translation are different concepts. The deck uses countries as tenants and en, ja, ko, and vi as illustrative locales; the demo implementation is unchanged.

[Sources]
- https://payloadcms.com/docs/plugins/multi-tenant
- https://payloadcms.com/docs/configuration/localization
- https://docs.directus.io/user-guide/overview/glossary
- https://docs.directus.io/user-guide/user-management/permissions
-->

---

<div class="eyebrow">Editorial workflow</div>

# Workflow policy becomes testable application behavior

<div class="flow">
  <div class="step"><strong>Draft</strong><span>Editor creates and requests translation or review</span></div>
  <div class="step"><strong>Translation / review</strong><span>Translator changes allowed locales; reviewer assesses content</span></div>
  <div class="step"><strong>Changes or approval</strong><span>Invalid transitions and tenant boundaries are denied</span></div>
  <div class="step"><strong>Publish / schedule</strong><span>Only a publisher can make content public</span></div>
</div>

<div class="columns-4" style="margin-top: 32px">
  <div class="panel"><h2>Editor</h2><p>Create and request work.</p></div>
  <div class="panel"><h2>Translator</h2><p>Change requested locales.</p></div>
  <div class="panel"><h2>Reviewer</h2><p>Approve or request changes.</p></div>
  <div class="panel"><h2>Publisher</h2><p>Publish or schedule.</p></div>
</div>

<div class="callout soft">Start with Enterprise Publishing Workflows; configure ONE roles and stages; extend only confirmed ONE policy and integration gaps.</div>

<!--
Payload Enterprise advertises multi-step approvals, access control, alerts, notifications, and extensibility. Validate the product first, then separate ONE configuration from custom extensions. Directus can model similar stages with fields, policies, and Flows.

[Sources]
- https://payloadcms.com/docs/versions/drafts
- https://payloadcms.com/docs/versions/overview
- https://payloadcms.com/enterprise/publishing-workflows
- https://docs.directus.io/guides/headless-cms/approval-workflows
- https://docs.directus.io/reference/system/versions
-->

---

<div class="eyebrow">Authoring experience</div>

# Editors get guardrails and real live preview—not arbitrary page design

<div class="pros-cons">
  <div>
    <h2>Editors can choose</h2>
    <ul><li>Approved blocks and variants</li><li>Structured headings, links, media, lists, and callouts</li><li>SEO title, description, image, and page settings</li><li>Content and locale—not raw presentation code</li></ul>
  </div>
  <div>
    <h2>Editors cannot choose</h2>
    <ul><li>Raw CSS or JavaScript</li><li>Arbitrary colors, spacing, or typography</li><li>Unreviewed components</li><li>Raw page HTML as the normal authoring model</li></ul>
  </div>
</div>

<div class="architecture" style="margin-top: 34px">
  <div class="node primary span-2">Payload editor + approved blocks</div><div class="node primary span-2">Actual Next.js page in live preview</div>
</div>

<div class="callout soft">Editors own content. Developers own presentation, accessibility, and design-system integrity.</div>

<!--
Live preview renders the actual public application with draft data; it is not a CMS approximation. Both products support Next.js preview patterns, but Payload lets us reuse React UI and custom quality panels naturally.

[Sources]
- https://payloadcms.com/docs/live-preview
- https://payloadcms.com/docs/live-preview/server
- https://docs.directus.io/guides/headless-cms/live-preview/nextjs
- https://payloadcms.com/docs/plugins/seo
-->

---
class: dense
---

<div class="eyebrow">Headless forms</div>

# Payload has the clearer path to a governed headless form engine

| Requirement                   | Payload                           | Directus                             |
| ----------------------------- | --------------------------------- | ------------------------------------ |
| Editors define schema         | **Official Form Builder**         | Model collections or build extension |
| Next.js uses our components   | **Designed for frontend mapping** | Custom frontend pattern              |
| Store and manage submissions  | Yes                               | Yes                                  |
| Notifications + workflow      | Emails + custom hooks             | **Flows are strong**                 |
| File upload                   | Supported                         | Supported through files/API          |
| Conditional / multi-step      | Validate in PoC                   | Custom implementation                |
| Consent, spam, retention, PII | Our production controls           | Our production controls              |

<div class="flow" style="margin-top: 26px">
  <div class="step"><strong>CMS schema</strong><span>Editor-controlled structure</span></div>
  <div class="step"><strong>Shared contract</strong><span>Typed validation and approved components</span></div>
  <div class="step"><strong>Next.js form</strong><span>Accessible public experience</span></div>
  <div class="step"><strong>Submission</strong><span>Protected storage, notification, and integration</span></div>
</div>

<div class="footer-note">Current repository evidence covers fixed forms. A complex dynamic form remains a mandatory PoC gate.</div>

<!--
Neither product removes the need for bot protection, consent versioning, retention, file scanning, and downstream integration. Rebuild one complex real form in the PoC—not merely a contact form.

[Sources]
- https://payloadcms.com/docs/plugins/form-builder
- https://docs.directus.io/blog/building-a-form-data-collection-and-email-notification-system-with-directus-and-next-js
-->

---

<div class="eyebrow">Enterprise AI now</div>

# Payload Enterprise gives us AI now; Vertex remains an optional extension path

<div class="pros-cons">
  <div>
    <span class="pill">Directus Enterprise path</span>
    <h2 style="margin-top: 14px">Mature native Studio assistant</h2>
    <ul><li>Native AI Assistant in Studio</li><li>OpenAI, Anthropic, and Gemini support listed</li><li>Enterprise custom LLM and AI translations</li><li>Validate exact Vertex endpoint and governance fit</li></ul>
  </div>
  <div>
    <span class="pill magenta">Payload Enterprise path</span>
    <h2 style="margin-top: 14px">Current packaged tools plus a React extension path</h2>
    <ul><li>Writing assistance; advertised translation and image generation</li><li>RAG with configurable chunking and database embeddings</li><li>Official MCP with scoped capabilities</li><li>Extend only missing Vertex controls, prompts, and telemetry</li></ul>
  </div>
</div>

<div class="callout soft">AI may improve drafts. It may not publish, change roles, bypass tenancy, or invent design primitives.</div>

<!--
Directus remains strong in native AI experience; Payload Enterprise AI is already in the selected target plan and must not be described as future or custom-only. Require both vendors to demonstrate the same draft, translation, permissions, tenant-isolation, audit, model-selection, and human-approval tasks. Treat only separately advertised items marked Coming Soon as roadmap evidence.

[Sources]
- https://community.directus.io/t/introducing-directus-ai-assistant-sidebar-now-in-beta/1699
- https://directus.com/pricing
- https://payloadcms.com/docs/plugins/mcp
- https://payloadcms.com/docs/custom-components/overview
- https://payloadcms.com/enterprise/ai-framework
- https://payloadcms.com/enterprise/enterprise-ai
-->

---

<div class="eyebrow">Environment governance</div>

# Git promotion, audit, and recovery need different controls

<div class="lane"><h2>Schema + configuration</h2><div><strong>Payload:</strong> TypeScript + migrations + Git. &nbsp; <strong>Directus:</strong> v12.3 JSON Environment Sync with pull/diff/push.</div></div>
<div class="lane"><h2>Content + reference data</h2><div>Editorial content stays in production. Countries, taxonomies, templates, and controlled defaults use versioned export/diff/import. PII is sanitized before lower environments.</div></div>
<div class="lane"><h2>Audit + recovery</h2><div><strong>Payload Enterprise:</strong> Activity Logs + revisions/version control. <strong>Directus:</strong> Activity Log + revisions. Validate retention, immutability, export, SIEM, tenant scope, and restore drills.</div></div>

<div class="callout soft">Directus wins packaged environment promotion. Payload needs explicit reference-data promotion and drift reporting.</div>

<!--
Payload gets full product-capability credit for Enterprise Activity Logs and revisions/version control. The repository's custom Editorial Activities collection is narrower demo evidence. Database backup alone does not restore media or prove recovery.

[Sources]
- https://payloadcms.com/docs/database/migrations
- https://payloadcms.com/enterprise
- https://directus.com/resources/12.3-release-notes
- https://docs.directus.io/user-guide/settings/activity-log
- https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/pitr
- https://docs.cloud.google.com/storage/docs/object-versioning
-->

---

<div class="eyebrow">Migration strategy</div>

# Next.js can serve both CMSs while route ownership moves to Payload

<div class="flow">
  <div class="step"><strong>1 · Inventory</strong><span>Routes, current owner, iframe delivery, models, forms, and dependencies</span></div>
  <div class="step"><strong>2 · Pages</strong><span>Global static/dynamic, local, and Drupal pages move route by route</span></div>
  <div class="step"><strong>3 · News</strong><span>Global/local collection waves; deltas only while Drupal stays active</span></div>
  <div class="step"><strong>4 · Forms</strong><span>Rebuild and accept behavior form by form</span></div>
</div>

<div class="flow" style="margin-top: 24px">
  <div class="step"><strong>5 · Switch</strong><span>Validate, change the route owner, monitor, and retain a route-level rollback</span></div>
  <div class="step"><strong>6 · Retire</strong><span>Remove the accepted wave's adapter, iframe, sync scope, and credentials</span></div>
</div>

<div class="callout">Migrate → validate → switch route ownership → monitor → retire the Drupal connection.</div>

<!--
The frontend can read both CMSs temporarily, but each route or item has one authoritative owner. Static and dynamic pages move route by route, news uses repeatable collection waves, and forms move only after end-to-end behavior passes.

[Sources]
- https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module
- https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/filtering
- https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/pagination
- https://payloadcms.com/docs/rest-api/overview
-->

---

<div class="eyebrow">Safe coexistence</div>

# During coexistence, Next.js routes to Payload, Drupal adapters, or tracked iframes

<img class="diagram-image migration-architecture" src="/diagrams/drupal-coexistence-migration.png" alt="Next.js dual-source routing with Payload, Drupal adapters, tracked iframes, and per-wave connection retirement" />

<div class="callout soft">One owner per route/item · tracked iframe bridge · selective deltas · per-wave connection retirement</div>

<!--
Use event plus reconciliation only for active collections that need it, especially news. Simple page and form cutovers do not need permanent sync infrastructure. This route-resolver design is our architecture inference, not a vendor-provided Drupal migration product.

[Sources]
- https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module
- https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module/includes
- https://payloadcms.com/docs/rest-api/overview
-->

---
class: dense
---

<div class="eyebrow">Content-shape feasibility</div>

# Preserve legacy rich text first; normalize it after risk is removed

| Drupal source          | Initial treatment                         | Later treatment                            |
| ---------------------- | ----------------------------------------- | ------------------------------------------ |
| Structured Paragraphs  | Map to approved CMS blocks                | Improve mappings as models evolve          |
| Simple static pages    | Migrate individually to structured fields | Editorial refinement                       |
| Large rich-text bodies | Restricted `legacyBody` representation    | Normalize selectively after cutover        |
| Global / country posts | Map tenant, locale, taxonomy, and SEO     | Consolidate duplicate patterns             |
| Forms                  | Inventory fields **and behavior**         | Rebuild and acceptance-test before traffic |

<div class="columns-3" style="margin-top: 26px">
  <div class="panel"><h2>Sanitize</h2><p>Explicit allowlist; no scripts; flag unsupported embeds.</p></div>
  <div class="panel"><h2>Rewrite</h2><p>Internal links and media references; preserve source HTML for traceability.</p></div>
  <div class="panel"><h2>Govern</h2><p>Legacy rendering still uses the Next.js design system.</p></div>
</div>

<div class="callout soft">Preserve fidelity first. Normalize based on value—not during the highest-risk cutover step.</div>

<!--
Preserved rich text is a migration lane, not a permanent excuse for arbitrary authoring. Add reports for unsupported tags, broken media, missing alt text, malformed links, and locale gaps.
-->

---
class: dense
---

<div class="eyebrow">Cost model</div>

# Savings come from retiring duplicated platforms—not from a “free CMS” claim

<div class="callout soft" style="margin-top: 0">3-year TCO = vendor + GCP + build/migration + run/support + dual-run − retired Acquia/Varnish/Drupal cost</div>

| Cost area           | Payload                               | Directus                                    |
| ------------------- | ------------------------------------- | ------------------------------------------- |
| Self-hosted core    | MIT; $0 software license              | MSCL; Core tier has limits                  |
| Enterprise          | Custom quote                          | Custom quote                                |
| Public price anchor | No public Enterprise price            | Team $499/month annually; Enterprise custom |
| Infrastructure      | GKE + Cloud SQL + GCS + observability | Broadly similar GCP footprint               |
| Custom engineering  | Validate Enterprise before estimating extensions | Validate custom LLM and ONE-specific gaps   |
| Stack + training    | Lower React/TypeScript mismatch       | Vue for Studio extensions                   |
| Exit risk           | Low core-license dependency           | Portable data; contract usage rights matter |

<div class="callout">Do not call Payload “free” or use Directus Team pricing as our expected Enterprise cost.</div>

<!--
The likely saving is retirement of duplicated Drupal/Acquia/Varnish operating units and cross-cloud complexity. Validate with actual contracts, workload data, staffing assumptions, and three-/five-year vendor quotes.

[Sources]
- https://payloadcms.com/get-started
- https://directus.com/pricing
-->

---

<div class="eyebrow">Decision</div>

# Approve a gated Payload PoC, then make one platform decision

<div class="callout soft" style="margin-top: 0"><strong>Decision requested:</strong> approve a time-boxed Payload team PoC on GCP and parallel Enterprise due diligence.</div>

<ol class="decision-gates">
  <li>Country and locale isolation under real roles.</li>
  <li>Content-manager workflow, translation, live preview, trash, and restore.</li>
  <li>A complex dynamic form with consent, upload, notifications, and retention.</li>
  <li>GKE + Cloud SQL + GCS, logging, backup, and restore.</li>
  <li>Dual-source Next.js routing, tracked iframe routes, lane-based migration, and per-wave connection retirement.</li>
  <li>Upgrade safety for custom Admin and workflow code.</li>
  <li>Payload Enterprise AI demonstrated against ONE roles, locales, audit, and governance; optional Vertex only for confirmed gaps.</li>
  <li>Enterprise support, SLA, security, chat channel, and commercial terms.</li>
</ol>

<div class="architecture" style="margin-top: 22px">
  <div class="node primary span-2">Critical gates pass → implementation plan + quantified TCO</div>
  <div class="node span-2">Fundamental gate fails → reopen selection using the Directus evidence</div>
</div>

<div class="callout">Replace 27 CMS stacks with one governed content platform—not one difficult ecosystem with another.</div>

<!--
Define “fundamental fail” before starting so sunk cost does not move the goalposts. Include engineering, content, QA, platform, security, and procurement in the PoC.
-->

---
class: appendix dense
---

# Scoring method and sensitivity

<div class="appendix-label">Appendix</div>

| Score | Meaning                                                                |
| ----: | ---------------------------------------------------------------------- |
|   5.0 | Strong official capability or unusually natural fit; low residual risk |
|   4.0 | Meets the requirement with normal configuration or modest custom work  |
|   3.0 | Feasible, but meaningful custom work or operational controls remain    |
|   2.0 | Major gaps or high implementation and maintenance risk                 |
|   1.0 | Does not credibly meet the requirement                                 |

<div class="columns-2" style="margin-top: 32px">
  <div class="panel"><h2>What favors Payload</h2><p>TypeScript/React fit, headless forms, tenancy model, migration extensibility, and MIT exit path.</p></div>
  <div class="panel"><h2>What favors Directus</h2><p>Native Studio AI, environment sync, and lower initial integration effort.</p></div>
</div>

<div class="callout soft">The recommendation is sensitive by design. Debate weights explicitly instead of debating brands.</div>

---
class: appendix dense
---

# Full capability maturity matrix

<div class="appendix-label">Appendix</div>

| Capability                 | Payload                  | Directus                   | PoC focus              |
| -------------------------- | ------------------------ | -------------------------- | ---------------------- |
| GCP / PostgreSQL / GCS     | Official + configurable  | Native/configurable        | Deployment and restore |
| Tenancy / localization     | Official plugin + code   | Policy/project model       | Isolation tests        |
| Draft / versions / preview | Native                   | Native/configurable        | Editor usability       |
| Workflow / translation     | Enterprise + TypeScript  | Policies + Flows           | Demonstrate + test     |
| Forms                      | Official plugin          | Custom collection pattern  | Complex real form      |
| Audit                      | Enterprise Activity Logs + revisions | Activity Log + revisions | Retention / export / SIEM |
| Environment promotion      | Code + migrations        | Environment Sync           | Drift and rollback     |
| AI                         | Enterprise suite + MCP   | Native Assistant           | Demonstrate; optional Vertex gaps |
| Enterprise support         | Available; custom quote  | Formal tiers; custom quote | SLA and escalation     |

<div class="footer-note">Legend in evaluation plan: native/core, official tool, configurable pattern, custom build, or validate in PoC.</div>

---
class: appendix
---

# Directus strengths and watch-outs

<div class="appendix-label">Appendix</div>

<div class="pros-cons">
  <div>
    <h2>Strengths</h2>
    <ul><li>Two-decade product history</li><li>Large GitHub and community adoption</li><li>Formal Basic and Premium support</li><li>Environment Sync, Activity Log, granular policies</li><li>Content versions, Flows, and native AI</li><li>Database and API neutrality</li></ul>
  </div>
  <div>
    <h2>Watch-outs</h2>
    <ul><li>MSCL rather than MIT</li><li>Tier and feature limits</li><li>Enterprise renewal exposure</li><li>Vue Studio extensions</li><li>No equivalent first-party headless Form Builder</li><li>Exact Vertex and tenancy design require validation</li></ul>
  </div>
</div>

<div class="callout soft">Directus is a serious competing candidate and procurement benchmark—not a standby runtime.</div>

---
class: appendix
---

# Target GCP control plane

<div class="appendix-label">Appendix</div>

<div class="columns-3">
  <div class="panel"><h2>Identity and network</h2><ul><li>Workload Identity</li><li>Private Cloud SQL connectivity</li><li>Secrets and least privilege</li></ul></div>
  <div class="panel"><h2>Data protection</h2><ul><li>Cloud SQL HA + PITR</li><li>GCS object protection</li><li>Backups plus restore drills</li></ul></div>
  <div class="panel"><h2>Operations</h2><ul><li>Autoscaling</li><li>Logging and monitoring</li><li>Dead-letter queues and replay</li></ul></div>
</div>

<div class="architecture" style="margin-top: 38px">
  <div class="node primary span-2">Next.js workload</div><div class="node primary span-2">CMS + jobs workload</div>
  <div class="node">Cloud SQL</div><div class="node">GCS</div><div class="node">Pub/Sub</div><div class="node">Optional Vertex gateway</div>
  <div class="node span-4">Unified identity · observability · backup · recovery · policy</div>
</div>

---
class: appendix dense
---

# Migration metadata and reconciliation

<div class="appendix-label">Appendix</div>

| Control              | Purpose                                                      |
| -------------------- | ------------------------------------------------------------ |
| Stable identity      | `sourceSite + sourceType + sourceUUID` prevents duplicates   |
| Revision + timestamp | Orders source changes and supports overlap windows           |
| Mapping version      | Makes transformations reproducible and upgradable            |
| Content hash         | Detects drift without relying only on timestamps             |
| Route ownership      | Records `drupal`, `drupal_iframe`, `payload`, or `retired`   |
| Delivery mode        | Makes adapter, iframe, and Payload routes explicit            |
| Migration ledger     | Records attempts, success, target ID, and errors             |
| Reconciliation       | Repairs missed events and validates counts and relationships |

<div class="callout soft">Use ledger/reconciliation for active collection waves; retire each adapter, iframe, and sync scope after acceptance.</div>

---
class: appendix
---

# Content-type migration waves

<div class="appendix-label">Appendix</div>

<div class="columns-3">
  <div class="panel"><h2>Pages</h2><p>Global static and dynamic pages, local pages, and legacy Drupal pages move route by route. Existing iframe delivery can remain as a tracked bridge.</p></div>
  <div class="panel"><h2>News</h2><p>Global and local news move through repeatable collection waves, with selective deltas and reconciliation until cutover.</p></div>
  <div class="panel"><h2>Forms</h2><p>Drupal local forms move form by form after validation, consent, notifications, uploads, and integrations pass.</p></div>
</div>

<div class="callout">Every lane repeats: migrate → validate → switch route ownership → monitor → retire the Drupal connection.</div>

---
class: appendix
---

# TCO worksheet inputs

<div class="appendix-label">Appendix</div>

<div class="columns-3">
  <div class="panel"><h2>Current state</h2><ul><li>Acquia and support</li><li>Varnish and observability</li><li>27 environment footprints</li><li>Patch, release, and incident effort</li></ul></div>
  <div class="panel"><h2>Transition</h2><ul><li>Dual-source routing and selective reconciliation</li><li>Dual-run infrastructure</li><li>Content validation and training</li><li>Iframe, form, and integration retirement</li></ul></div>
  <div class="panel"><h2>Target state</h2><ul><li>Enterprise CMS support</li><li>GKE, Cloud SQL, and GCS</li><li>Platform operations</li><li>Upgrade and custom-code ownership</li></ul></div>
</div>

<div class="callout soft">Model both three- and five-year views. Include exit risk, not just year-one implementation cost.</div>

---
class: appendix dense
---

# Vendor due diligence and source register

<div class="appendix-label">Appendix</div>

<div class="columns-2">
  <div class="panel"><h2>Contract questions</h2><ul><li>Exact P1/P2 SLA and 24/7 coverage</li><li>Named private Slack or Teams channel</li><li>Upgrade and architecture assistance</li><li>SSO, audit, and security scope</li><li>Price protections and termination rights</li><li>Self-host and license guarantees</li></ul></div>
  <div class="panel"><h2>Claims to refresh</h2><ul><li>GitHub stars and forks</li><li>Directus pricing and MSCL limits</li><li>Directus AI and custom LLM scope</li><li>Payload Enterprise AI, Activity Logs, revisions, and SLA</li><li>Figma ownership and MIT commitment</li><li>Public customer references</li></ul></div>
</div>

<div class="callout soft">Community channels are useful. Production support, escalation, and commercial protection must be contractual.</div>

<!--
The full source register is maintained in ../demo-slide-plan.md and should be re-checked immediately before the decision meeting.
-->
