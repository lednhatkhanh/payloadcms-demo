# CMS decision diagrams

These diagrams are management-level abstractions for the CMS platform decision. They are not replacements for the detailed Unicorn engineering architecture supplied by the team.

## Files

- `current-platform-context.drawio` — current GCP/Acquia CMS boundary, including the existing mix of native Next.js and direct Drupal/iframe delivery. The separate Apigee-to-CRM integration and unrelated external API are intentionally out of scope.
- `target-cms-gcp.drawio` — vendor-neutral target on GCP with Enterprise workflow, AI, MCP, audit/version control, and a generic future model extension only if a confirmed requirement remains unmet.
- `drupal-coexistence-migration.drawio` — temporary dual-source Next.js routing, three migration lanes, and per-wave Drupal connection retirement.
- Matching `.png` files are rendered previews for documents and slides.

## Product-neutral architecture rule

The target and migration diagrams contain exactly one generic `CMS` component. It represents whichever single product is selected after the Payload-versus-Directus evaluation. Do not add a second CMS, vendor logo, “preferred” label, or fallback path to these architecture diagrams.

Payload and Directus logos may be used only in comparison, vendor-confidence, and evidence visuals.

## Visual conventions

- GCP services use Google Cloud-style icons and blue boundaries.
- Solid lines show primary event/data flow or current capability.
- Dashed lines show temporary iframe delivery or optional extension paths.
- Red identifies the current external Drupal/Acquia boundary.
- Green identifies the new authority or completed ownership transition.
- Connectors attach to explicit icon ports and use separate flow corridors to avoid crossing symbols.

The generic CMS icon is maintained in `icons/cms.svg` and embedded into each `.drawio` file for portability.
