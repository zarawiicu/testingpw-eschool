import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Tes Kurikulum - Ujian Offline", () => {
// Gunakan sesi login guru yang sudah disimpan
test.use({ storageState: 'guruState.json' });

test('test jaddwal ujian offline', async ({ page }) => {
  await page.locator('#schoolsList div').filter({ hasText: 'SMKN 8 MALANG Jl. Teluk' }).first().click();
  await page.getByRole('button', { name: 'Lanjutkan ke Dashboard' }).click();
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Offline ' }).click();
  await page.getByRole('link', { name: 'Jadwal', exact: true }).click();

  //filter kelas
  await page.locator('#filter-class-id').selectOption('9');
  await page.locator('#filter-class-id').selectOption('5');

  //filter ujian
  await page.locator('#filter-exam-id').selectOption('5');
  await page.locator('#filter-class-id').selectOption('6');
  await page.locator('#filter-exam-id').selectOption('15');
  await page.locator('#filter-exam-id').selectOption('6');

  //auto refresh
  await page.getByRole('button', { name: 'Refresh' }).click();

  //order by column
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.locator('label').filter({ hasText: 'Jam Selesai' }).click();
  
  //eksport
  await page.getByRole('button', { name: 'Export' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'CSV' }).click();
  const download = await downloadPromise;
});
});