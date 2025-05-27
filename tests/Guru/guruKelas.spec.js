import { test, expect } from '@playwright/test';

// Gunakan state login dari guru
test.use({ storageState: 'guruState.json' });

test('Guru Kelas', async ({ page }) => {
  // Akses dashboard guru
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });

  // Buka halaman Guru Kelas
  await page.getByRole('link', { name: ' Guru Kelas' }).click();

  // Navigasi langsung ke halaman class-section (opsional, tergantung flow kamu)
  await page.goto('https://esbeta.deanry.my.id/class-section');

  // Pencarian awal Dian lalu kosongkan pencarian
  await page.getByRole('searchbox', { name: 'Search' }).fill('Dian');
  await page.getByRole('searchbox', { name: 'Search' }).fill('');

  // Filter kelas ke kelas 11
  await page.locator('#filter_class_id').selectOption('11');

  // Klik data siswa "XII METRO A - Aisyah Billah"
  await page.getByRole('row', {
    name: ' 2 XII METRO A Aisyah Billah'
  }).getByRole('link').click();

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
