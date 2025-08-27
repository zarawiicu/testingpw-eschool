import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Kesiswaan - Absensi", () => {

// Gunakan state login dari guru
test.use({ storageState: 'guruState.json' });

test('Laporan Absensi Kegiatan Khusus', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('hacked');
  await page.getByRole('button', { name: 'Masuk' }).click();
  await page.locator('#schoolsList div').filter({ hasText: 'SMKN 8 MALANG Jl. Teluk' }).nth(1).click();
  await page.getByRole('button', { name: 'Lanjutkan ke Dashboard' }).click();
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kesiswaan ' }).click();
  await page.getByRole('link', { name: ' Absensi ' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Laporan Absensi Kegiatan' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('link', { name: ' Kurikulum ' }).click();
  await page1.getByRole('link', { name: ' Jadwal Pelajaran' }).click();
  await page1.getByRole('link', { name: ' Kesiswaan ' }).click();
  await page1.getByRole('link', { name: ' Absensi ' }).click();
  const page2Promise = page1.waitForEvent('popup');
  await page1.getByRole('link', { name: 'Peringkat Poin Alpa Siswa' }).click();
  const page2 = await page2Promise;
  const page3Promise = page1.waitForEvent('popup');
  await page1.getByRole('link', { name: 'Laporan Absensi Kegiatan' }).click();
  const page3 = await page3Promise;
  await page3.locator('#timetable_class_section').selectOption('25');
  await page3.getByRole('textbox', { name: 'Tgl Mulai' }).click();
  await page3.getByRole('cell', { name: '17', exact: true }).click();
  await page3.getByRole('cell', { name: '17', exact: true }).click();
  await page3.getByRole('heading', { name: 'Laporan Absensi Kegiatan' }).click();
  await page3.getByLabel('Absensi').selectOption('1');
  await page3.getByLabel('Absensi').selectOption('0');
  await page3.getByLabel('Absensi').selectOption('2');
  await page3.getByLabel('Absensi').selectOption('3');
  await page3.getByLabel('Absensi').selectOption('4');
  await page3.getByLabel('Absensi').selectOption('');
  await page3.getByRole('searchbox', { name: 'Search' }).click();
  await page3.getByRole('searchbox', { name: 'Search' }).fill('');
  await page3.getByRole('button', { name: 'Refresh' }).click();
  await page3.getByRole('button', { name: 'Columns' }).click();
  await page3.locator('label').filter({ hasText: 'Tgl' }).nth(2).click();
  await page3.locator('label').filter({ hasText: 'No Urut' }).click();
  await page3.getByRole('heading', { name: 'Laporan Absensi Kegiatan' }).click();
  await page3.getByRole('button', { name: 'Export' }).click();
  const downloadPromise = page3.waitForEvent('download');
  await page3.getByRole('link', { name: 'CSV' }).click();
  const download = await downloadPromise;
  await page3.getByRole('button', { name: '10' }).click();
  await page3.getByRole('link', { name: '20' }).click();
  await page3.getByRole('link', { name: 'to page 2' }).click();
  await page3.getByRole('link', { name: 'previous page' }).click();
  await page3.getByRole('link', { name: 'next page' }).click();
});
});