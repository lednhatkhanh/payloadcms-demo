# CMS app rules

- Follow the installed Payload skill and the bundled `next` documentation.
- Generated Payload route files stay thin and may be regenerated.
- Collections, globals, access control and hooks belong in `packages/payload-config`.
- Keep Admin theming light. Map shared semantic variables; do not replace Payload's built-in controls.
- Do not enable Cache Components or Partial Prefetching in the CMS app.
