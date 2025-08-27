import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Kesiswaan - Absensi", () => {

// Gunakan state login dari guru
test.use({ storageState: 'guruState.json' });

test('Surat izin siswa', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('hacked');
  await page.getByRole('button', { name: 'Masuk' }).click();
  await page.locator('#schoolsList div').filter({ hasText: 'SMKN 8 MALANG Jl. Teluk' }).nth(1).click();
  await page.getByRole('button', { name: 'Lanjutkan ke Dashboard' }).click();
  await page.getByRole('link', { name: ' Kesiswaan ' }).click();
  await page.getByRole('link', { name: ' Absensi ' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Surat Izin Siswa' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('link', { name: ' Kurikulum ' }).click();
  await page1.getByRole('link', { name: ' Jadwal Pelajaran' }).click();
  await page1.getByRole('link', { name: ' Kesiswaan ' }).click();
  await page1.getByRole('link', { name: ' Absensi ' }).click();
  const page2Promise = page1.waitForEvent('popup');
  await page1.getByRole('link', { name: 'Surat Izin Siswa' }).click();
  const page2 = await page2Promise;
  await page2.locator('#filter_class_section_id').selectOption('33');
  await page2.getByRole('textbox', { name: 'start date' }).click();
  await page2.getByRole('cell', { name: '1', exact: true }).nth(1).click();
  await page2.getByRole('textbox', { name: 'end date' }).click();
  await page2.getByRole('cell', { name: '17', exact: true }).click();
  await page2.locator('#filter_class_section_id').selectOption('');
  await page2.getByRole('searchbox', { name: 'Search' }).click();
  await page2.getByRole('searchbox', { name: 'Search' }).fill('');
  await page2.getByRole('button', { name: 'Refresh' }).click();
  await page2.getByRole('button', { name: 'Columns' }).click();
  await page2.locator('label').filter({ hasText: 'Tgl' }).nth(2).click();
  await page2.locator('.fixed-table-toolbar').click();
  await page2.locator('.fixed-table-toolbar').click();
  await page2.getByRole('heading', { name: 'Surat Izin Siswa' }).click();
  await page2.getByRole('button', { name: 'Columns' }).click();
  await page2.locator('label').filter({ hasText: 'Tgl' }).nth(2).click();
  await page2.getByRole('button', { name: 'Export' }).click();
  const downloadPromise = page2.waitForEvent('download');
  await page2.getByRole('link', { name: 'PDF' }).click();
  const download = await downloadPromise;
  await page2.getByRole('row', { name: '1 VIRA MELATI ANGGRAENI...' }).locator('#dropdownMenuButton').click();
  await page2.getByRole('row', { name: '11 FISTA NOVALIZA SYAHWAL XII' }).locator('#dropdownMenuButton').click();
  await page2.getByRole('link', { name: 'Lampiran' }).click();
  await page2.getByRole('button', { name: 'Tutup' }).click();
  await page2.getByRole('row', { name: '11 FISTA NOVALIZA SYAHWAL XII' }).locator('#dropdownMenuButton').click();
  await page2.getByRole('link', { name: 'Izinkan' }).click();
  await page2.goto('https://esbeta.deanry.my.id/perizinan');
  await page2.getByRole('link', { name: '' }).click();
  await page2.getByRole('link', { name: 'Bahasa Indonesia' }).click();
  await page2.getByRole('row', { name: '2 DIAH BADRIYAH MAULIDINA XII' }).locator('#dropdownMenuButton').click();
  await page2.getByRole('link', { name: 'Lampiran' }).click();
  await page2.getByRole('button', { name: 'Close' }).click();
  await page2.getByRole('row', { name: '2 DIAH BADRIYAH MAULIDINA XII' }).locator('#dropdownMenuButton').click();
  await page2.getByRole('link', { name: 'Tolak' }).click();
  await page2.goto('https://esbeta.deanry.my.id/perizinan');
  await page2.getByRole('row', { name: '2 DIAH BADRIYAH MAULIDINA XII' }).locator('#dropdownMenuButton').click();
  await page2.getByRole('row', { name: '5 FISTA NOVALIZA SYAHWAL XII' }).locator('#dropdownMenuButton').click();
  await page2.getByText('Surat Izin Siswa Kelas *').click();
  await page2.getByRole('row', { name: '4 AHMAD FU\'AD AZIZ XII RPL B' }).locator('#dropdownMenuButton').click();
  await page2.getByRole('textbox', { name: 'start date' }).click();
  await page2.getByRole('cell', { name: '1', exact: true }).nth(1).click();
  await page2.getByRole('button', { name: '10' }).click();
  await page2.getByRole('link', { name: '5' }).click();
  await page2.getByRole('button', { name: '5' }).click();
  await page2.goto('https://esbeta.deanry.my.id/perizinan');
  await page2.getByRole('button', { name: '10' }).click();
  await page2.getByRole('textbox', { name: 'start date' }).click();
  await page2.getByRole('cell', { name: '1', exact: true }).nth(1).click();
  await page2.getByRole('button', { name: '10' }).click();
  await page2.getByRole('link', { name: '5' }).click();
});
});