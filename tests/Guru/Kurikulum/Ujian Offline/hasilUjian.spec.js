import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Tes Kurikulum - Ujian Offline", () => {
// Gunakan sesi login guru yang sudah disimpan
test.use({ storageState: 'guruState.json' });

test('test hasil ujian', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Offline ' }).click();
  await page.getByRole('link', { name: 'Hasil Ujian', exact: true }).click();
  await page.locator('#filter_session_year_id').selectOption('1');
  await page.getByLabel('Ujian').selectOption('2');
  await page.locator('#filter_class_section_id').click();
  await page.locator('#filter_class_section_id').selectOption('32');
  await page.locator('#filter_class_section_id').selectOption('33');
  await page.locator('#filter_class_section_id').selectOption('34');
  await page.locator('#filter_class_section_id').selectOption('35');

  //Filter urutkan berdasarkan
  await page.locator('#sort_by').selectOption('obtained_marks'); //Nilai yang diperoleh
  await page.locator('#sort_by').selectOption('roll_no'); // Nomor urut

  // Filter naik/turun
  await page.locator('#order_by').selectOption('desc'); //Menurun
  await page.locator('#order_by').selectOption('asc'); //Naik
  await page.locator('#order_by').selectOption('desc');
  
  // Pagination
  await page.getByRole('link', { name: 'to page 2' }).click();
  await page.getByRole('link', { name: 'to page 3' }).click();
  await page.getByRole('link', { name: 'previous page' }).click();
  await page.getByRole('link', { name: 'next page' }).click();
  await page.getByRole('button', { name: '10' }).click();
  await page.getByRole('link', { name: '20' }).click();
  
  // Search
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('fiko');
  await page.getByRole('searchbox', { name: 'Search' }).fill('');

  // auto refresh
  await page.getByRole('button', { name: 'Refresh' }).click();

  //Order by column
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.getByRole('checkbox', { name: 'Nilai Total' }).uncheck();
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.getByRole('checkbox', { name: 'Nilai Total' }).check();

  // Eksport
  await page.getByRole('button', { name: 'Export' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'JSON' }).click();
  const download = await downloadPromise;
});
});