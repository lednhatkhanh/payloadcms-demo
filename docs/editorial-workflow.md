# Editorial workflow and demo accounts

The public site has three canonical language routes:

- `/en` — English (default)
- `/jp` — Japanese
- `/es` — Spanish

Unprefixed public links redirect to the language most recently selected by the visitor; a first visit defaults to English. English remains the source locale in Payload. Japanese and Spanish are editable through Payload’s locale selector, and empty translations fall back to English until they are completed.

## Editorial flow

1. An editor creates or updates English content.
2. If needed, the editor selects Japanese and/or Spanish in **Translation languages**, then chooses **Request translation**.
3. A translator completes the selected locale tabs and chooses **Submit translations for review**.
4. A reviewer approves the work or requests changes.
5. A publisher chooses **Publish changes** after approval.

The CMS dashboard starts with **My requests**, a role-aware inbox:

- translators receive translation requests;
- reviewers receive items in review;
- editors receive requested changes;
- publishers receive approved items; and
- administrators see every active workflow request.

## Seeded demo accounts

All demo accounts use the password `Abc123@@`. These are local demonstration credentials only.

| Role          | Name              | Email                      |
| ------------- | ----------------- | -------------------------- |
| Administrator | Alex Admin        | `admin@dispatch.demo`      |
| Editor        | Maya Editor       | `editor@dispatch.demo`     |
| Translator    | Jordan Translator | `translator@dispatch.demo` |
| Reviewer      | Rowan Reviewer    | `reviewer@dispatch.demo`   |
| Publisher     | Parker Publisher  | `publisher@dispatch.demo`  |

Run the database migration and then reseed after pulling these changes:

```sh
pnpm db:migrate
pnpm seed
```
