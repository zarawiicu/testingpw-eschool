import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Tes Kurikulum - Tugas siswa", () => {
// Gunakan sesi login guru yang sudah disimpan
test.use({ storageState: 'guruState.json' });

test('tes filter, search, auto refresh', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Pengumpulan' }).click();

  //Filter Kelas
  await page.locator('#select2-filter-class-section-id-container').click();
  await page.getByRole('treeitem', { name: 'XI TKJ B ( TKJ ) - ID' }).click();
  await page.getByRole('treeitem', { name: 'XII TKJ B ( TKJ ) - ID' }).click();

  //Filter Mapel
  await page.locator('#select2-filter-subject-id-container').click();
  await page.getByRole('treeitem', { name: 'MULOK PJOK (Theory)' }).click();

  //Search
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByLabel('× XII TKJ B ( TKJ ) - ID').getByText('×').click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('merangkum');
  await page.getByRole('searchbox', { name: 'Search' }).fill('');

  //auto refresh
  await page.getByRole('button', { name: 'Refresh' }).click();

  //order by column
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.locator('span').filter({ hasText: 'Masukan' }).click();
  await page.locator('#toolbar').click();

  // Eksport 
  await page.getByRole('searchbox', { name: 'Search' }).fill('');
  await page.getByRole('button', { name: 'Export' }).click();
  const download1Promise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'CSV' }).click();
  const download1 = await download1Promise;
});

test('Edit Pengumpulan - Diterima', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Pengumpulan' }).click();
  await page.getByRole('row', { name: '1 Rangkumlah bab pola hidup' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.locator('#edit-form').getByText('Diterima').click();
  await page.getByRole('spinbutton', { name: 'Poin' }).click();
  await page.getByRole('spinbutton', { name: 'Poin' }).fill('86');
  await page.getByRole('textbox', { name: 'Masukan' }).click();
  await page.getByRole('textbox', { name: 'Masukan' }).fill('cukup bagus');
  await page.getByRole('button', { name: 'Edit' }).click();
});

test('Edit Pengumpulan - Ditolak', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Pengumpulan' }).click();
  await page.getByRole('row', { name: '1 Buat Artikel tentang pola' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByText('Ditolak').click();
  await page.getByRole('textbox', { name: 'Masukan' }).fill('Bagus, tapi mungkin bisa dikumpulkan dalam bentuk pdf ya nak');
  await page.getByRole('button', { name: 'Edit' }).click();
});

 test('Lihat file docx', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Pengumpulan' }).click();
  await page.getByRole('button', { name: '吝' }).click();
  const page1Promise = page.waitForEvent('popup');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'RANGKUMAN ATLETIK.docx' }).click();
  const page1 = await page1Promise;
  const download = await downloadPromise;
 });

 test('Lihat file pdf', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Pengumpulan' }).click();
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.locator('#fileDropdown9').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'POLA HIDUP SEHAT.pdf' }).click();
  const page1 = await page1Promise;
 });

});