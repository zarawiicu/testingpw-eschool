import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Kesiswaan - Siswa", () => {

// Gunakan state login dari guru
test.use({ storageState: 'guruState.json' });

test('Siswa', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kesiswaan ' }).click();
  await page.getByRole('link', { name: ' Siswa ' }).click();
  await page.getByRole('link', { name: 'Siswa', exact: true }).click();
  await page.locator('#filter_class_section_id').selectOption('30');
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('');
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.locator('label').filter({ hasText: 'NIPD' }).click();
  await page.locator('.content-wrapper').click();
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.locator('label').filter({ hasText: 'NIPD' }).click();
  await page.getByRole('button', { name: 'Export' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'MS-Word' }).click();
  const download = await downloadPromise;
  await page.getByRole('button', { name: '10' }).click();
  await page.getByRole('link', { name: '20', exact: true }).click();
  await page.getByRole('link', { name: 'to page 2' }).click();
  await page.getByRole('link', { name: 'to page 3' }).click();
  await page.getByRole('link', { name: 'next page' }).click();
  await page.getByRole('link', { name: 'next page' }).click();
  await page.getByRole('link', { name: 'to page 41' }).click();
  await page.getByRole('link', { name: 'previous page' }).click();
  await page.getByRole('link', { name: 'previous page' }).click();
});
});