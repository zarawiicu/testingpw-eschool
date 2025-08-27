import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Kesiswaan - Absensi", () => {

// Gunakan state login dari guru
test.use({ storageState: 'guruState.json' });

test('Peringkat Poin Alpa', async ({ page }) => {
 await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono533@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('hacked');
  await page.getByRole('button', { name: 'Masuk' }).click();
  await page.locator('#schoolsList div').filter({ hasText: 'SMKN 8 MALANG Jl. Teluk' }).first().click();
  await page.getByRole('button', { name: 'Lanjutkan ke Dashboard' }).click();
  await page.getByRole('link', { name: ' Kesiswaan ' }).click();
  await page.getByRole('link', { name: ' Absensi ' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Peringkat Poin Alpa Siswa' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('link', { name: ' Kurikulum ' }).click();
  await page1.getByRole('button', { name: ' Download Tabel' }).click();
  const downloadPromise = page1.waitForEvent('download');
  await page1.getByRole('link', { name: 'Download sebagai XLSX' }).click();
  const download = await downloadPromise;
  await page1.getByRole('searchbox', { name: 'Search' }).click();
  await page1.getByRole('searchbox', { name: 'Search' }).press('CapsLock');
  await page1.getByRole('searchbox', { name: 'Search' }).fill('B');
  await page1.getByRole('searchbox', { name: 'Search' }).press('CapsLock');
  await page1.getByRole('searchbox', { name: 'Search' }).fill('');
  await page1.getByRole('button', { name: '10' }).click();
  await page1.getByRole('link', { name: '25' }).click();
});
});