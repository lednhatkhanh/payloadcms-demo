# Multi-country demo plan

Build one demo CMS for three countries. A country is a tenant; language stays as the Payload locale selected in the site header.

## Demo model

- Add a `countries` collection with `name`, `code`, `supportedLocales`, and `defaultLocale`.
- Seed three countries. Their supported-language lists can differ.
- Add country memberships to users. A global account can access every country; country accounts can access their assigned country.
- Keep shared pages and landing pages global, with no country field.
- Add a `scope` field to news: `global` or `country`. Country news has a required country relationship; global news appears for every country.
- Use the Payload multi-tenant plugin where it helps with country selection and account memberships. Keep the mixed global/country news query simple and explicit.

## Seed data

Create enough data to make the demo feel populated:

- Three country records, each with two or more supported languages.
- One global admin and one global editorial account.
- For each country: an editor, translator, reviewer, and publisher account.
- Shared homepage and a few shared pages/landing pages in every locale.
- Three published global news stories.
- For each country: two published country stories, one translation-requested draft, and one story in review.
- A couple of locations and several media items for each country.

Use different language combinations and a repeated news slug in two countries so the demo visibly exercises language and country handling.

## CMS work

1. Add the countries collection and user memberships.
2. Add country/global scope to news and country fields to country-specific content.
3. Update the current editorial workflow so country accounts work only on their country's stories; global accounts work everywhere.
4. Keep pages and landing pages global.
5. Add the seed fixtures, then regenerate Payload types and migrations.

## Web work

1. Leave the header language selector as-is.
2. Add an **All countries / country** filter to the news page using a URL parameter.
3. With a country selected, show its news plus global news. Without one, show all news.
4. Preserve the country filter when opening a country news article. Keep global article URLs simple.
5. Continue reading content through the server-only Local API.

## Demo checks

- Each country has visibly different news and local data.
- Global news appears in every country view.
- Changing language changes localized copy without changing the country filter.
- Country accounts see their own content; the global account can work across all three countries.
