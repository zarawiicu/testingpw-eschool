import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Kesiswaan - Absensi", () => {

// Gunakan state login dari guru
test.use({ storageState: 'guruState.json' });

test('Absensi kegiatan Khusus', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono533@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('hacked');
  await page.getByRole('button', { name: 'Masuk' }).click();
  await page.locator('#schoolsList div').filter({ hasText: 'SMKN 8 MALANG Jl. Teluk' }).first().click();
  await page.getByRole('button', { name: 'Lanjutkan ke Dashboard' }).click();
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kesiswaan ' }).click();
  await page.getByRole('link', { name: ' Absensi ' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Absensi Kegiatan Khusus', exact: true }).click();
  const page1 = await page1Promise;
  await page1.getByRole('link', { name: ' Kurikulum ' }).click();
  await page1.getByRole('link', { name: ' Jadwal Pelajaran' }).click();
  await page1.getByRole('link', { name: ' Kesiswaan ' }).click();
  await page1.getByRole('link', { name: ' Absensi ' }).click();
  const page2Promise = page1.waitForEvent('popup');
  await page1.getByRole('link', { name: 'Absensi Kegiatan Khusus', exact: true }).click();
  const page2 = await page2Promise;
  await page2.getByLabel('Kelas').selectOption('25');
  await page2.getByRole('textbox', { name: 'Tgl' }).click();
  await page2.getByRole('cell', { name: '17' }).nth(2).click();
  await page2.getByRole('searchbox', { name: 'Search' }).click();
  await page2.getByRole('searchbox', { name: 'Search' }).fill('');
  await page2.locator('#formdata div').filter({ hasText: 'Hadir Sakit Izin Alpa Simpan' }).locator('label').first().click();
  await page2.locator('#formdata div').filter({ hasText: 'Hadir Sakit Izin Alpa Simpan' }).locator('label').nth(1).click();
  await page2.locator('#formdata div').filter({ hasText: 'Hadir Sakit Izin Alpa Simpan' }).locator('label').nth(2).click();
  await page2.locator('#formdata div').filter({ hasText: 'Hadir Sakit Izin Alpa Simpan' }).locator('label').nth(3).click();
  await page2.locator('#formdata div').filter({ hasText: 'Hadir Sakit Izin Alpa Simpan' }).locator('label').first().click();
  await page2.getByRole('row', { name: '6 2024/202571288 10 FRANSISCO' }).locator('div').nth(4).click();
  await page2.getByRole('row', { name: '3 2024/202571285 7 DAFFA\'' }).locator('label').nth(1).click();
  await page2.getByRole('row', { name: '9 2024/202571291 13 KHOIRUL' }).locator('label').nth(1).click();
  await page2.getByRole('button', { name: 'Simpan' }).click();
  await page2.getByLabel('Kelas').selectOption('25');
  await page2.getByRole('button', { name: 'Columns' }).click();
  await page2.locator('label').filter({ hasText: 'No Urut' }).click();
  await page2.locator('#formdata div').filter({ hasText: 'Kelas Pilih Kelas XII TKJ B Tgl Mengirimkan pemberitahuan kepada wali jika' }).nth(2).click();
  await page2.getByRole('button', { name: 'Export' }).click();
  const downloadPromise = page2.waitForEvent('download');
  await page2.getByRole('link', { name: 'JSON' }).click();
  const download = await downloadPromise;
  await page2.getByRole('button', { name: 'Columns' }).click();
  await page2.locator('label').filter({ hasText: 'No Urut' }).click();
  await page2.locator('#formdata div').filter({ hasText: 'Kelas Pilih Kelas XII TKJ B Tgl Mengirimkan pemberitahuan kepada wali jika' }).nth(2).click();
  await page2.getByRole('checkbox', { name: 'Checkbox for following text' }).check();
  await page2.getByRole('button', { name: 'Simpan' }).click();
});
});