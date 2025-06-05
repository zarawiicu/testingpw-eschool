import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Tes Guru Kelas", () => {

// Gunakan state login dari guru
test.use({ storageState: 'guruState.json' });

test('Guru Kelas', async ({ page }) => {
  // Akses dashboard guru
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });

  // Buka halaman Guru Kelas
  await page.getByRole('link', { name: ' Guru Kelas' }).click();

  // Pencarian awal Dian lalu kosongkan pencarian
  await page.getByRole('searchbox', { name: 'Search' }).fill('Dian');
  await page.getByRole('searchbox', { name: 'Search' }).fill('');

  // Filter kelas ke kelas 11
  await page.locator('#filter_class_id').selectOption('11');

  // Klik data siswa "XII METRO A - Aisyah Billah"
  await page.getByRole('row', {
    name: ' 2 XII METRO A Aisyah Billah'
  }).getByRole('link').click();

  // Pagination
  await page.getByRole('link', { name: 'to page 2' }).click();
  await page.getByRole('button', { name: '10' }).click();
  await page.getByRole('link', { name: '5', exact: true }).click();
  await page.getByRole('link', { name: 'next page' }).click();
  await page.getByRole('link', { name: 'next page' }).click();
  await page.locator('.content-wrapper').click();
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('');
  await page.getByRole('row', { name: ' 3 XII RPL B Lusi Susanti, S' }).getByRole('link').click();
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('an');
  await page.getByRole('link', { name: 'to page 2' }).click();
  await page.getByRole('link', { name: 'to page 3' }).click();

  // Refresh data
  await page.getByRole('button', { name: 'Refresh' }).click();

  // Reset filter kelas
  await page.locator('#filter_class_id').selectOption('');

  // Atur kolom yang ingin ditampilkan
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.getByText('Guru Mata Pelajaran').click();

  // Ekspor data sebagai CSV
  await page.getByRole('button', { name: 'Export' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'CSV' }).click();
  const download = await downloadPromise;
});

//ERROR TEST CASE
// PADA SAAT KELAS DIAKTIFKAN SEMESTERNYA, KELASNYA LANGSUNG HILANG
test('Kelas yang termauk semester, Hilang!', async ({ page }) => {
  // Akses dashboard guru
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });

  // Buka halaman Guru Kelas
  await page.getByRole('link', { name: ' Guru Kelas' }).click();
  await page.getByRole('row', { name: ' 1 XII ELIN B Andi Firman' }).getByRole('link').click();
  await page.getByRole('link', { name: '' }).click();
  await page.getByRole('row', { name: ' 5 XII TKJ B Agung Cahyono,' }).getByRole('link').click();
  await page.getByRole('link', { name: '' }).click();
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.getByRole('link', { name: 'to page 2' }).click();
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.locator('#filter_class_id').selectOption('5');
  await page.locator('#filter_class_id').selectOption('');
  await page.getByRole('link', { name: ' Guru Kelas' }).click();
  await page.getByRole('row', { name: ' 9 XI ELIN B Wasis Yes' }).getByRole('link').click();
  await page.getByRole('link', { name: '' }).click();
  await page.getByRole('row', { name: ' 2 XII ELIN A Emmalia' }).getByRole('cell').first().click();
});
});
