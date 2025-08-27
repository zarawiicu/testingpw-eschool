import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Humas", () => {

// Gunakan state login dari guru
test.use({ storageState: 'guruState.json' });

test('Hari Libur', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono533@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('hacked');
  await page.getByRole('button', { name: 'Masuk' }).click();
  await page.getByRole('heading', { name: 'SMKN 8 MALANG' }).click();
  await page.getByRole('button', { name: 'Lanjutkan ke Dashboard' }).click();
  await page.getByRole('link', { name: ' Humas ' }).click();
  await page.getByRole('link', { name: ' Informasi & Konten ' }).click();
  await page.getByRole('link', { name: 'Hari Libur' }).click();
  await page.locator('#filter_month').selectOption('5');
  await page.locator('#filter_month').selectOption('6');
  await page.getByRole('textbox', { name: 'Tgl Mulai' }).click();
  await page.getByRole('cell', { name: '1', exact: true }).nth(1).click();
  await page.getByRole('textbox', { name: 'Tgl Selesai' }).click();
  await page.getByRole('cell', { name: '24', exact: true }).click();
  await page.locator('#filter_month').selectOption('0');
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).press('CapsLock');
  await page.getByRole('searchbox', { name: 'Search' }).fill('');
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.locator('span').filter({ hasText: 'Keterangan' }).click();
  await page.locator('.fixed-table-toolbar').click();
  await page.locator('.content-wrapper').click();
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.locator('span').filter({ hasText: 'Keterangan' }).click();
  await page.getByRole('button', { name: 'Export' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'JSON' }).click();
  const download = await downloadPromise;
});
});