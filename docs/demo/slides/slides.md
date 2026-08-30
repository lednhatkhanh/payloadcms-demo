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

<div class="cover-subtitle">A decision framework for replacing 27 Drupal sites with one governed content platform</div>

<div class="cover-meta">Decision proposal · 30 August 2026</div>

<!--
We are choosing an operating model for the next several years, not merely comparing feature lists.

The management story is: why change, what both candidates can do, why Payload fits ONE better, and how migration and the planned PoC reduce implementation risk.
-->

---

<div class="eyebrow">Why change · Current architecture</div>

# Today, Next.js already serves a mix of native pages and Drupal content

<img class="diagram-image current-context" src="/diagrams/current-platform-context.png" alt="Current CMS delivery context showing Next.js connecting directly across the GCP and Acquia boundary to Drupal" />

<!--
This is a management abstraction of the supplied architecture. Apigee and the unrelated external API remain outside the CMS delivery view.

The important point is that mixed delivery already exists. Migration can therefore move route ownership gradually rather than wait for one large cutover.
-->

---

<div class="eyebrow">Why change · Operating model</div>

# Replace 27 separate CMS stacks with one governed platform

<div class="operating-model">
  <div class="model-side current-model">
    <div class="model-number">27×</div>
    <h2>Current estate</h2>
    <div class="model-line"><strong>Runtime</strong><span>26 country instances + 1 global instance</span></div>
    <div class="model-line"><strong>Change</strong><span>Repeated patches, releases, and testing</span></div>
    <div class="model-line"><strong>Cost</strong><span>Acquia + Drupal + Varnish + cross-cloud work</span></div>
    <div class="model-line"><strong>Data</strong><span>Reuse and reporting across isolated databases</span></div>
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

<div class="callout soft">The business case comes from retiring repeated platform work across 27 stacks.</div>

<!--
The transition temporarily costs more because both platforms run in parallel. Do not show a saving until finance validates current and target inputs.

[Sources]
- https://www.drupal.org/docs/updating-drupal/updating-drupal-core-via-composer
- https://www.drupal.org/docs/administering-a-drupal-site/configuration-management/managing-your-sites-configuration
-->

---

<div class="eyebrow">Decision frame · Required outcomes</div>

# Improve publishing without weakening engineering control

<div class="columns-6">
  <div class="panel number-panel"><div class="number">01</div><h2>Platform ownership</h2><p>GCP, PostgreSQL, GCS, backup, and restore.</p></div>
  <div class="panel number-panel"><div class="number">02</div><h2>Global publishing</h2><p>26 country sites, one global site, seven languages, and scoped access.</p></div>
  <div class="panel number-panel"><div class="number">03</div><h2>Editorial control</h2><p>Preview, review, approval, scheduling, and translation state.</p></div>
  <div class="panel number-panel"><div class="number">04</div><h2>Structured experience</h2><p>Approved blocks and rich text, not arbitrary styling.</p></div>
  <div class="panel number-panel"><div class="number">05</div><h2>Digital operations</h2><p>Forms, SEO, audit, observability, and environment promotion.</p></div>
  <div class="panel number-panel"><div class="number">06</div><h2>Productivity + transition</h2><p>Enterprise AI, support, and controlled Drupal coexistence.</p></div>
</div>

<div class="callout soft">These six outcomes define the minimum acceptable platform.</div>

---

<div class="eyebrow">Candidate comparison · Meaningful differences</div>

# Both candidates meet the baseline; the operating model decides

<div class="columns-2">
  <div class="panel"><h2>Shared enterprise baseline</h2><p>Self-hosting on GCP, PostgreSQL, GCS, headless APIs, country and language controls, audit history, revisions, and Enterprise AI.</p></div>
  <div class="panel"><h2>Payload advantage</h2><p>React and TypeScript alignment, packaged publishing workflows, static headless A/B testing, official headless forms, and an MIT-licensed core.</p></div>
  <div class="panel"><h2>Directus advantage</h2><p>Packaged Environment Sync, mature Studio automation and Flows, broad data-platform flexibility, and existing internal familiarity.</p></div>
  <div class="panel"><h2>Evidence still required</h2><p>Enterprise feature scope, tenancy isolation, upgrades, support and SLA, commercial terms, and planning-horizon total cost.</p></div>
</div>

<div class="callout">Both are viable. The choice is how much adaptation ONE accepts across content, engineering, and ownership.</div>

<!--
Avoid a feature-count or scorecard debate. Both platforms can satisfy the technical baseline. The decision rests on the combined operating consequences.

[Sources]
- https://payloadcms.com/enterprise
- https://payloadcms.com/enterprise/publishing-workflows
- https://payloadcms.com/enterprise/headless-ab-variant-testing
- https://payloadcms.com/enterprise/enterprise-ai
- https://directus.com/enterprise
- https://directus.com/resources/12.3-release-notes
- https://directus.com/docs/guides/ai
-->

---

<div class="eyebrow">Candidate comparison · Vendor confidence</div>

# Both vendors are credible; they optimize for different models

<div class="columns-2">
  <div class="panel">
    <span class="pill">Payload</span>
    <h2>Application engineering platform</h2>
    <ul><li>MIT-licensed core and self-hosting</li><li>React, TypeScript, and Next.js alignment</li><li>Enterprise support and global customer references</li><li>Figma backing with continued open-source commitment</li></ul>
  </div>
  <div class="panel">
    <span class="pill">Directus</span>
    <h2>Data and content operations platform</h2>
    <ul><li>Two-decade product history</li><li>Large developer and extension ecosystem</li><li>Formal support and global customer references</li><li>Strong Studio, Flows, and Environment Sync</li></ul>
  </div>
</div>

<div class="difference-strip two-up">
  <div><strong>Credibility is not the deciding factor</strong><span>Both vendors have enterprise products, communities, customers, and formal support paths.</span></div>
  <div><strong>Fit is the deciding factor</strong><span>ONE needs the platform that best supports its publishing model and existing engineering organization.</span></div>
</div>

<div class="callout soft">Vendor-documented capabilities remain subject to demonstration and contract confirmation.</div>

<!--
Community scale and customer references are confidence signals, not proof of security, uptime, or suitability. Apply the same evidence standard to both vendors.

[Sources]
- https://github.com/payloadcms/payload
- https://payloadcms.com/get-started
- https://payloadcms.com/case-studies
- https://www.figma.com/blog/payload-joins-figma/
- https://github.com/directus/directus
- https://directus.com/resources/directus-two-decades
- https://docs.directus.io/getting-started/support
-->

---
class: dense
---

<div class="eyebrow">Vendor decision · Recommendation</div>

# Recommend Payload for the strongest fit across content, engineering, and ownership

<div class="callout soft" style="margin-top: 0"><strong>Both platforms meet the enterprise CMS baseline.</strong> Payload requires less adaptation in the areas that define ONE's long-term operating model.</div>

<div class="columns-3" style="margin-top: 28px">
  <div class="panel"><h2>Better content operations</h2><p>Enterprise publishing workflows, static A/B testing, AI-assisted writing, translation and image generation, plus an official headless Form Builder.</p></div>
  <div class="panel"><h2>One engineering model</h2><p>Next.js, React, and TypeScript align the CMS, Admin extensions, design system, tests, migration logic, and daily development.</p></div>
  <div class="panel"><h2>Long-term control</h2><p>GCP self-hosting, PostgreSQL, GCS, an MIT-licensed core, activity logs, revisions, and Enterprise support keep the platform governable and replaceable.</p></div>
</div>

<div class="difference-strip two-up">
  <div><strong>Directus remains credible</strong><span>It leads in packaged Environment Sync and offers mature Studio automation, Flows, AI, and broad data-platform flexibility.</span></div>
  <div><strong>The deciding difference</strong><span>Payload combines comparable Enterprise authoring capability with a materially stronger fit for how ONE builds and owns digital products.</span></div>
</div>

<div class="callout">Directus is a strong option; Payload is the better long-term fit for ONE.</div>

<!--
This is a reasoned recommendation, not a mathematical ranking. The planned PoC and Enterprise due diligence confirm implementation readiness and exact contract scope.
-->

---

<div class="eyebrow">Content value · Global publishing</div>

# Content teams gain one governed model and a faster daily workflow

<div class="scope-language-summary">
  <div class="scope-summary"><strong>27</strong><span>site scopes</span><p>26 country sites + 1 global site</p></div>
  <div class="language-summary"><strong>7 supported languages</strong><div class="language-chips"><span>English</span><span>Chinese</span><span>Japanese</span><span>Korean</span><span>Spanish</span><span>Portuguese</span><span>French</span></div></div>
</div>

<div class="flow" style="margin-top: 24px">
  <div class="step"><strong>Write</strong><span>Create within approved blocks and fields</span></div>
  <div class="step"><strong>Preview</strong><span>See the actual Next.js experience while editing</span></div>
  <div class="step"><strong>Review + translate</strong><span>Visible status, feedback, and role-based transitions</span></div>
  <div class="step"><strong>Publish</strong><span>Approve, schedule, and publish with accountability</span></div>
</div>

<div class="callout soft">Country defines ownership and access. Language is a separate publishing choice.</div>

<!--
Examples do not prescribe which languages every country publishes. The seven supported languages are English, Chinese, Japanese, Korean, Spanish, Portuguese, and French.

[Sources]
- https://payloadcms.com/docs/plugins/multi-tenant
- https://payloadcms.com/docs/configuration/localization
- https://payloadcms.com/docs/live-preview/overview
- https://payloadcms.com/enterprise/publishing-workflows
-->

---

<div class="eyebrow">Content value · Packaged capabilities</div>

# Payload packages three capabilities we would otherwise assemble

<div class="columns-3">
  <div class="panel"><h2>Publishing workflow</h2><p>Multi-step approvals, field-level access, notifications, and inline feedback provide the closest documented fit for ONE's target workflow.</p></div>
  <div class="panel"><h2>Headless forms</h2><p>The official Form Builder maps editor-defined schemas to accessible Next.js components and typed submission controls.</p></div>
  <div class="panel"><h2>Governed experimentation</h2><p>Editors manage approved variants in the CMS while Next.js delivers them statically with ONE's selected analytics.</p></div>
</div>

<div class="difference-strip two-up">
  <div><strong>Payload starting point</strong><span>Packaged workflow, official headless forms, and static headless variants reduce integration work.</span></div>
  <div><strong>Directus starting point</strong><span>Strong Studio and Flows; approval stages, headless forms, and experimentation require more composition.</span></div>
</div>

<div class="callout soft">Both require demonstration; Payload is closer to the content operating model ONE wants.</div>

<!--
The PoC should use a real workflow and complex form. Confirm conditional logic, consent, uploads, notifications, retention, analytics, and rollback.

[Sources]
- https://payloadcms.com/enterprise/publishing-workflows
- https://payloadcms.com/docs/plugins/form-builder
- https://payloadcms.com/enterprise/headless-ab-variant-testing
- https://directus.com/resources/v12-built-for-the-whole-team
- https://directus.com/tv/enter-the-workshop/setting-up-ab-testing-posthog
-->

---

<div class="eyebrow">Content value · Enterprise AI</div>

# Enterprise AI turns the CMS into a shared productivity platform

<div class="columns-3">
  <div class="panel"><h2>Writers + translators</h2><p>Drafting, rewriting, image generation, and multilingual publishing with human review.</p></div>
  <div class="panel"><h2>Editors + content operations</h2><p>Brand prompts, glossaries, structured-content checks, permissions, and reusable governance.</p></div>
  <div class="panel"><h2>Developers</h2><p>Approved tools can work with CMS schemas and content through permission-scoped MCP connections.</p></div>
</div>

<div class="ai-platforms">
  <div><span class="pill">Payload Enterprise</span><p>Translation, image generation, writing assistant, permissions, AI content retrieval, and MCP for approved tools.</p></div>
  <div><span class="pill">Directus Enterprise</span><p>Studio Assistant, multi-language translation, custom models, and MCP for editors and developers.</p></div>
</div>

<div class="callout soft">Consolidation lets ONE govern AI once across all country and global content operations.</div>

<!--
Both candidates provide credible AI. Require the same writing, translation, permissions, tenant isolation, audit, cost control, and human approval demonstrations.

[Sources]
- https://payloadcms.com/enterprise/enterprise-ai
- https://payloadcms.com/enterprise/ai-framework
- https://payloadcms.com/docs/plugins/mcp
- https://directus.com/docs/guides/ai
- https://directus.com/docs/guides/ai/translations
- https://directus.com/docs/guides/ai/mcp
-->

---

<div class="eyebrow">Platform model · Target architecture</div>

# One governed CMS platform can replace 27 separate CMS stacks

<img class="diagram-image target-architecture" src="/diagrams/target-cms-gcp.png" alt="Vendor-neutral target CMS architecture on Google Cloud Platform" />

<div class="callout soft">Country and language controls remain independent while the platform, operations, and Enterprise capabilities are shared.</div>

<!--
The diagram is vendor-neutral. Payload and Directus are compared against the same GCP target. A separate model provider is a later option only for a confirmed gap.

[Sources]
- https://payloadcms.com/docs/production/deployment
- https://payloadcms.com/docs/upload/storage-adapters
- https://docs.directus.io/self-hosted/config-options
- https://docs.cloud.google.com/sql/docs/postgres/configure-ha
-->

---

<div class="eyebrow">Platform model · Engineering and operations</div>

# Payload fits the way ONE builds and operates digital products

<div class="columns-3">
  <div class="panel"><h2>Build in one stack</h2><p>CMS schemas, hooks, jobs, Admin extensions, frontend integration, and tests remain React and TypeScript work.</p></div>
  <div class="panel"><h2>Govern change</h2><p>Versioned migrations, controlled reference data, activity logs, revisions, and tenant-aware policy keep changes reviewable.</p></div>
  <div class="panel"><h2>Operate on GCP</h2><p>Cloud SQL, GCS, logging, monitoring, backup, restore, security controls, and support fit the existing platform model.</p></div>
</div>

<div class="architecture" style="margin-top: 30px">
  <div class="node primary span-4">Next.js + React + TypeScript</div>
  <div class="node span-2">Payload Admin + APIs + jobs</div><div class="node span-2">Shared UI + tests + telemetry</div>
  <div class="node span-2">PostgreSQL</div><div class="node span-2">GCS on GCP</div>
</div>

<div class="callout soft">Directus leads in packaged Environment Sync; Payload leads in one application engineering model.</div>

<!--
Payload still needs a reference-data promotion approach and upgrade testing. Database backup alone does not restore media or prove recovery.

[Sources]
- https://payloadcms.com/docs/custom-components/overview
- https://payloadcms.com/docs/database/migrations
- https://payloadcms.com/docs/jobs-queue/overview
- https://directus.com/resources/12.3-release-notes
-->

---

<div class="eyebrow">Transition · Controlled migration</div>

# Migrate in waves while Next.js serves both CMSs

<img class="diagram-image migration-architecture" src="/diagrams/drupal-coexistence-migration.png" alt="Next.js dual-source routing with Payload, Drupal adapters, tracked iframes, and per-wave connection retirement" />

<div class="callout soft">One owner per route or item · route-level rollback · retire each Drupal connection after its wave is accepted</div>

<!--
Pages move route by route, news moves in repeatable collection waves, and forms move after end-to-end behavior passes. Existing iframe routes can remain a temporary bridge. Selective deltas and reconciliation are only needed for content that continues changing during coexistence.

[Sources]
- https://www.drupal.org/docs/core-modules-and-themes/core-modules/jsonapi-module
- https://payloadcms.com/docs/rest-api/overview
-->

---

<div class="eyebrow">Business case · Total cost</div>

# Quantify the business case from retired duplication and total cost

<div class="columns-3">
  <div class="panel number-panel"><div class="number">Retire</div><h2>Repeated operating work</h2><p>Acquia, Drupal, Varnish, cross-cloud coordination, repeated releases, and duplicated support across 27 stacks.</p></div>
  <div class="panel number-panel"><div class="number">Count</div><h2>Target and transition cost</h2><p>Vendor terms, GCP, implementation, migration, dual-run overlap, support, security, and ongoing engineering.</p></div>
  <div class="panel number-panel"><div class="number">Measure</div><h2>Business and delivery value</h2><p>Publishing cycle time, release effort, incident ownership, reuse, migration progress, and operating cost.</p></div>
</div>

<div class="difference-strip two-up">
  <div><strong>Inputs required</strong><span>Current contracts and staffing, workload data, migration effort, vendor quotes, and support terms.</span></div>
  <div><strong>Decision output</strong><span>Verified total cost and value across the approved delivery and operating horizon.</span></div>
</div>

<div class="callout">The case is reduced duplication, not an assumption that the replacement CMS is free.</div>

<!--
Do not show a saving or payback period until finance validates the inputs. Payload's MIT core reduces license dependency but does not remove infrastructure, engineering, operations, or Enterprise costs.
-->

---

<div class="eyebrow">PoC scope · Implementation evidence</div>

# The planned Payload PoC will confirm four implementation gates

<div class="columns-4">
  <div class="panel number-panel"><div class="number">01</div><h2>Content outcomes</h2><p>Country and language isolation, preview, workflow, forms, experimentation, AI, trash, and restore.</p></div>
  <div class="panel number-panel"><div class="number">02</div><h2>Platform operations</h2><p>GKE, Cloud SQL, GCS, logging, backup, restore, security, and upgrade safety.</p></div>
  <div class="panel number-panel"><div class="number">03</div><h2>Migration safety</h2><p>Dual-source routing, iframe tracking, representative content waves, rollback, and connection retirement.</p></div>
  <div class="panel number-panel"><div class="number">04</div><h2>Enterprise + commercial</h2><p>Feature scope, permissions, audit, SLA, escalation, support, security, and contract terms.</p></div>
</div>

<div class="architecture" style="margin-top: 34px">
  <div class="node primary span-2">Evidence meets the gates → implementation plan + quantified TCO</div>
  <div class="node span-2">Material gap → revisit the decision using the Directus evidence</div>
</div>

<div class="callout">The PoC converts remaining assumptions into implementation evidence.</div>

<!--
Include content, engineering, QA, platform, security, and procurement in the PoC evidence review.
-->

---
layout: center
class: closing-slide
---

<img class="closing-logo" src="/one-logo.svg" alt="Ocean Network Express" />

# Thank you for listening

<div class="closing-subtitle">Questions and discussion</div>

<div class="closing-context">ONE content platform decision</div>
