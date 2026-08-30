# CMS Platform Decision - Management Slide Plan

**Working title:** One content platform on GCP

**Recommendation:** Payload CMS is the preferred platform; the planned PoC and Enterprise due diligence will confirm implementation readiness and contract scope.

**Audience:** Engineering manager, direct manager, content manager; secondary readers in platform, security, procurement, and migration teams.

**Presentation purpose:** Explain why the current operating model should change, compare Payload and Directus fairly, state the recommendation early, and show how migration and validation reduce delivery risk.

**Source document:** [`demo-plan.md`](./demo-plan.md)

**Research snapshot:** 30 August 2026

---

## 1. Management communication job

The presentation should leave management with five conclusions:

1. The current problem is 27 separately operated CMS stacks, not simply the Drupal product.
2. Payload and Directus both meet the enterprise technical baseline and are credible vendors.
3. Payload is preferred because its content capabilities, React/TypeScript alignment, and long-term ownership model reinforce one another.
4. Next.js can serve both Payload and Drupal during a controlled migration, with one authoritative owner per route or item and progressive connection retirement.
5. The planned PoC will turn the remaining product, architecture, migration, operational, and commercial assumptions into evidence.

The deck should explain a reasoned recommendation, not a numerical ranking or feature-count contest.

---

## 2. Presentation format

- **Length:** 16 slides total, with no presentation appendices.
- **Presentation time:** 20-25 minutes, followed by questions.
- **Tone:** Clear, calm, candid, and management-oriented.
- **Visible-copy rule:** One primary claim per slide. Keep implementation detail and sources in speaker notes or the supporting plan.
- **Comparison rule:** Introduce both products and their credibility before recommending Payload.
- **PoC framing:** Describe the evidence the planned PoC will produce and how that evidence informs implementation.
- **Business-case framing:** Do not imply that open-source software is free. Use verified current costs, target costs, transition overlap, and vendor quotes across the approved planning horizon.

### Evidence language

Use these labels consistently:

- **Validated internally** - exercised in the repository or team demo.
- **Implemented in repository** - code exists but still needs representative user validation.
- **Vendor documented** - supported by official current documentation.
- **Enterprise-plan baseline** - expected in the Enterprise package but awaiting demonstration and written confirmation.
- **PoC gate** - a requirement that needs hands-on evidence before implementation planning is finalized.

Vendor-documented capability is not the same as validated implementation readiness.

---

## 3. Narrative order

1. Establish the current architecture and repeated operating burden.
2. Define the outcomes that any replacement must meet.
3. Compare Payload and Directus at management altitude.
4. Establish that both vendors are credible.
5. State the Payload recommendation.
6. Show the content-team, AI, architecture, and engineering value supporting that recommendation.
7. Close with controlled migration, business-case inputs, and PoC evidence.

This order avoids naming Payload as the answer before Directus has been compared, while preventing the recommendation from arriving late in the meeting.

---

## 4. Visual direction

- Use Noto Sans, a paper-white background, dark ink text, and the canonical `#bd0f72` accent.
- Reserve magenta callouts for major conclusions and decision transitions rather than using them as decoration everywhere.
- Use full language names in management-visible copy: English, Chinese, Japanese, Korean, Spanish, Portuguese, and French.
- State the estate clearly as 26 country sites plus one global site.
- Keep architecture diagrams icon-led and vendor-neutral.
- Exclude Apigee and the unrelated external API from the CMS architecture.
- Use the existing target and migration diagrams, but let the presenter explain details rather than duplicating every label in visible prose.
- Avoid dense scorecards and comparison tables. Prefer shared baseline, meaningful advantages, and evidence still required.

---

## 5. Deck at a glance

|   # | Takeaway title                                                                     | Management job                                     |
| --: | ---------------------------------------------------------------------------------- | -------------------------------------------------- |
|   1 | One content platform on GCP                                                        | Establish the decision context                     |
|   2 | Today, Next.js already serves a mix of native pages and Drupal content             | Ground the discussion in the current architecture  |
|   3 | Replace 27 separate CMS stacks with one governed platform                          | Explain the operating-model change                 |
|   4 | Improve publishing without weakening engineering control                           | Define the minimum outcomes                        |
|   5 | Both candidates meet the baseline; the operating model decides                     | Compare the products without scoring               |
|   6 | Both vendors are credible; they optimize for different models                      | Establish balanced vendor confidence               |
|   7 | Recommend Payload for the strongest fit across content, engineering, and ownership | State the recommendation early                     |
|   8 | Content teams gain one governed model and a faster daily workflow                  | Explain the daily editorial value                  |
|   9 | Payload packages three capabilities we would otherwise assemble                    | Highlight workflow, forms, and experimentation     |
|  10 | Enterprise AI turns the CMS into a shared productivity platform                    | Explain AI value for content and engineering teams |
|  11 | One governed CMS platform can replace 27 separate CMS stacks                       | Show the target architecture                       |
|  12 | Payload fits the way ONE builds and operates digital products                      | Explain engineering and operational alignment      |
|  13 | Migrate in waves while Next.js serves both CMSs                                    | Show controlled coexistence and retirement         |
|  14 | Quantify the business case from retired duplication and total cost                 | Define the evidence needed for TCO                 |
|  15 | The planned Payload PoC will confirm four implementation gates                     | Close with implementation evidence                 |
|  16 | Thank you for listening                                                            | Invite questions and discussion                    |

---

## 6. Slide guidance

### Slide 1 - One content platform on GCP

Use the ONE cover treatment. Keep the subtitle focused on replacing 27 Drupal sites with one governed content platform.

### Slide 2 - Current architecture

Show that Next.js already combines native GCP delivery with direct Drupal content and iframe routes. The management implication is that gradual route ownership is feasible.

Apigee belongs to a separate CRM integration and is intentionally omitted. Drupal does not depend on the unrelated external API.

### Slide 3 - Operating-model change

Contrast 27 separate CMS stacks with one logical CMS platform. Emphasize repeated change, testing, support, and cross-cloud coordination rather than criticizing Drupal as a product.

The business-case hypothesis is retired duplication.

### Slide 4 - Required outcomes

Group requirements into six outcomes:

1. platform ownership;
2. global publishing;
3. editorial control;
4. structured experience;
5. digital operations;
6. productivity and controlled transition.

### Slide 5 - Meaningful product differences

Use four groups:

- shared enterprise baseline;
- Payload advantages;
- Directus advantages;
- evidence still required.

Do not use weights, scores, or an eleven-row feature matrix.

### Slide 6 - Vendor confidence

Show Payload and Directus side by side. Both have enterprise products, communities, public customer references, and formal support paths.

Payload is positioned as an application-engineering platform. Directus is positioned as a data and content-operations platform. This distinction is about fit, not vendor legitimacy.

### Slide 7 - Recommendation

Use three decision pillars:

- **Better content operations** - packaged workflow, experimentation, AI, and headless forms.
- **One engineering model** - React, TypeScript, Next.js, tests, migration logic, and Admin extensions.
- **Long-term control** - GCP self-hosting, PostgreSQL, GCS, MIT core, audit, revisions, and Enterprise support.

State that Directus remains strong, particularly in Environment Sync and Studio automation.

### Slide 8 - Content-team value

Clarify that site scope and language are independent dimensions:

- 26 country sites plus one global site;
- seven supported languages;
- each site publishes only the languages it needs.

Show the target daily flow as write, preview, review and translate, then publish.

### Slide 9 - Packaged content capabilities

Highlight three current reasons to switch:

- Enterprise publishing workflow;
- official headless Form Builder;
- governed static headless A/B variants.

Directus has strong Studio and Flows, but these three outcomes require more composition and integration.

### Slide 10 - Enterprise AI

Focus on three audiences:

- writers and translators;
- editors and content operations;
- developers.

Payload Enterprise documents translation, image generation, writing assistance, permissions, AI retrieval, and MCP. Directus documents Studio Assistant, AI Translations, custom models, and MCP. Both require equivalent demonstration of permissions, audit, tenant isolation, cost control, and human review.

Do not expand the visible scope to customer-facing or employee-facing AI retrieval unless a confirmed business use case is added.

### Slide 11 - Target architecture

Use the vendor-neutral GCP diagram. State that country and language controls remain independent while platform operations and Enterprise capabilities are shared.

Use “27 separate CMS stacks,” not “27 runtimes,” because the target platform may still run multiple replicas.

### Slide 12 - Engineering and operations

Combine the previous headless-delivery, engineering-ownership, and environment-governance slides.

The three management messages are:

- build in one application stack;
- govern change with migrations, reference-data controls, audit, and revisions;
- operate with existing GCP services, telemetry, recovery controls, and support.

Directus leads in packaged Environment Sync. Payload leads in alignment with ONE's broader application engineering model.

### Slide 13 - Controlled migration

Use the migration diagram and three visible messages:

- one authoritative owner per route or item;
- route-level rollback while both CMSs remain available;
- retire each Drupal connection after its wave is accepted.

Speaker notes can explain that pages move route by route, news moves in collection waves, and forms move after end-to-end behavior passes.

### Slide 14 - Business-case evidence

Organize the business case into:

- repeated operating work to retire;
- target and transition costs to count;
- business and delivery value to measure.

Do not show savings, payback, or a percentage until finance validates the inputs. The message is reduced duplication, not free licensing.

### Slide 15 - PoC implementation gates

Group the PoC into four gates:

1. content outcomes;
2. platform operations;
3. migration safety;
4. Enterprise and commercial scope.

If the evidence meets the gates, it informs the implementation plan and quantified TCO. A material gap reopens the platform decision using the Directus evidence already gathered.

### Slide 16 - Thank you and Q&A

Use a simple ONE-branded closing slide with no additional decision content. Show “Thank you for listening” and invite questions and discussion.

---

## 7. Management wording guardrails

- Say “26 country sites plus one global site,” not shorthand locale codes or ambiguous country counts.
- Say “one logical CMS platform,” not “one runtime.”
- Say “Payload offers the clearer headless-forms starting point,” not an unconditional claim that every form requirement is already solved.
- Say “Payload is closer to our target approval model,” while confirming both products in demonstration.
- Use “governed experimentation” in management titles; keep static-delivery mechanics in notes.
- Explain MIT and MSCL through their business consequences rather than assuming managers know the licenses.
- Describe Enterprise features as vendor documented and awaiting exact release and contract confirmation.
- Do not call Payload free or use public Directus Team pricing as the expected Enterprise cost.
- Do not claim a saving before actual contracts, staffing, workloads, transition overlap, and vendor quotes are known.
- Do not describe Drupal as incapable of headless delivery or preview. Describe the cost of the current implementation and repeated integration across the estate.

---

## 8. Evidence to confirm before presentation

- Exact Drupal and Acquia estate count and current operating costs.
- Direct Next.js-to-Drupal content and iframe paths.
- Supported country and language policy.
- Payload Enterprise workflow, A/B testing, AI, Activity Logs, revisions, SSO, support, and commercial scope.
- Directus Enterprise AI, Environment Sync, support, licensing, and commercial scope.
- Single-instance tenant isolation and audit requirements for both candidates.
- Representative complex-form requirements.
- Migration inventory and rollback expectations.
- GCP sizing, backup, restore, observability, and security requirements.
- Vendor quotes and internal delivery and support assumptions.

The detailed capability, migration, risk, and source material remains in [`demo-plan.md`](./demo-plan.md). It should support questions without returning the management deck to its previous length.
