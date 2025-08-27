import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Tes Dokumen KPK TKJ", () => {
// Gunakan sesi login guru yang sudah disimpan
test.use({ storageState: 'guruState.json' });

test('Berhasil Unggah File', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' KPK TKJ ' }).click();
  await page.getByRole('link', { name: ' Dokumen KPK TKJ' }).click();
  await page.getByRole('link', { name: ' TKJ' }).click();
  await page.getByRole('textbox', { name: 'Nama Nama' }).fill('Telekomunikasi Jaringan');
  await page.getByRole('textbox', { name: 'Tanggal File * Tanggal File *' }).fill('2025-06-23');
  await page.getByRole('button', { name: 'Upload File Upload File' }).click();
  await page.getByRole('button', { name: 'Upload File Upload File' }).setInputFiles('asj.jpg');
  await page.getByRole('textbox', { name: 'Deskripsi Deskripsi' }).fill('Pembelajaran telekomunikasi jaringan dengan  kurikulum baru');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

// ERROR TEST CASE
test('Unggah File - Submit form kosong', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' KPK TKJ ' }).click();
  await page.getByRole('link', { name: ' Dokumen KPK TKJ' }).click();
  await page.getByRole('link', { name: ' TKJ' }).click();
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Unggah File - Hanya isi nama', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' KPK TKJ ' }).click();
  await page.getByRole('link', { name: ' Dokumen KPK TKJ' }).click();
  await page.getByRole('link', { name: ' TKJ' }).click();
  await page.getByRole('textbox', { name: 'Nama Nama' }).fill('ASJ ');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Unggah File - Hanya isi nama dan tanggal file', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' KPK TKJ ' }).click();
  await page.getByRole('link', { name: ' Dokumen KPK TKJ' }).click();
  await page.getByRole('link', { name: ' TKJ' }).click();
  await page.getByRole('textbox', { name: 'Nama Nama' }).fill('ASJ ');

  //Jika field tanggal kosong
  await page.getByRole('textbox', { name: 'Tanggal File * Tanggal File *' }).fill('');
  await page.getByRole('button', { name: 'Simpan' }).click();

  await page.getByRole('textbox', { name: 'Tanggal File * Tanggal File *' }).fill('2025-06-23');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Unggah File - Hanya isi nama, tanggal file, dan upload file', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' KPK TKJ ' }).click();
  await page.getByRole('link', { name: ' Dokumen KPK TKJ' }).click();
  await page.getByRole('link', { name: ' TKJ' }).click();
  await page.getByRole('textbox', { name: 'Nama Nama' }).fill('ASJ ');
  await page.getByRole('textbox', { name: 'Tanggal File * Tanggal File *' }).fill('2025-06-23');
  await page.getByRole('button', { name: 'Upload File Upload File' }).click();
  await page.getByRole('button', { name: 'Upload File Upload File' }).setInputFiles('asj.jpg');
  await page.getByRole('button', { name: 'Simpan' }).click();
});
  
test('Unggah File - Hanya isi nama, tanggal file, upload file, dan deskripsi', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' KPK TKJ ' }).click();
  await page.getByRole('link', { name: ' Dokumen KPK TKJ' }).click();
  await page.getByRole('link', { name: ' TKJ' }).click();
  await page.getByRole('textbox', { name: 'Nama Nama' }).fill('ASJ ');
  await page.getByRole('textbox', { name: 'Tanggal File * Tanggal File *' }).fill('2025-06-23');
  await page.getByRole('button', { name: 'Upload File Upload File' }).click();
  await page.getByRole('button', { name: 'Upload File Upload File' }).setInputFiles('asj.jpg');
  await page.getByRole('textbox', { name: 'Deskripsi Deskripsi' }).fill('Pembelajaran ASJ dengan kurikulum baru');
  await page.getByRole('button', { name: 'Simpan' }).click();
});
  
test('Tes tombol aksi', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Dasbor' }).click();
  await page.getByRole('link', { name: ' KPK TKJ ' }).click();
  await page.getByRole('link', { name: ' Dokumen KPK TKJ' }).click();
  await page.getByRole('link', { name: ' TKJ' }).click();

  // Lihat File
  await page.getByRole('row', { name: '1 ASJ 2025 23-06-2025 23-06-' }).locator('#dropdownMenuButton').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Lihat' }).click();
  const page1 = await page1Promise;

  //Unduh File
  await page.getByRole('row', { name: '1 ASJ 2025 23-06-2025 23-06-' }).locator('#dropdownMenuButton').click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Unduh' }).click();
  const download = await downloadPromise;
});

test('Tes toolbar', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');

  //Search
  await page.getByRole('searchbox', { name: 'Search' }).fill('Tele');
  await page.getByRole('searchbox', { name: 'Search' }).fill('');

  //Auto refresh
  await page.getByRole('button', { name: 'Refresh' }).click();

  //Order by column
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.locator('label').filter({ hasText: 'Deskripsi' }).nth(1).click();
  
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.locator('label').filter({ hasText: 'Deskripsi' }).nth(1).click();

  //Eksport CSV
  await page.getByRole('button', { name: 'Export' }).click();
  const download1Promise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'CSV' }).click();
  const download1 = await download1Promise;
});
});