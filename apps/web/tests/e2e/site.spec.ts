import { AxeBuilder } from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

for (const route of ['/', '/news']) {
  test(`${route} is accessible`, async ({ page }) => {
    await page.goto(route)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })
}

test('a reader can reach a seeded story', async ({ page }) => {
  await page.goto('/news')
  await page
    .getByRole('link', { name: /Read story/ })
    .first()
    .click()
  await expect(page.getByTestId('story-shell')).toBeVisible()
  await expect(page.getByRole('article')).toBeVisible()
})

test('unknown stories render the editorial 404', async ({ page }) => {
  await page.goto('/news/not-a-real-story')
  await expect(
    page.getByRole('heading', { name: 'That story is not in the edition.' }),
  ).toBeVisible()
})
