import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Tes Dokumen Kurikulum", () => {

// Gunakan state login dari guru
test.use({ storageState: 'guruState.json' });

test('CRUD Folder', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Dokumen Kurikulum' }).click();

  // Submit form kosong
  await page.getByRole('link', { name: 'Kelola Folder' }).click();
  await page.getByRole('button', { name: 'Simpan' }).click();

  // Tambah folder baru
  await page.getByRole('textbox', { name: 'Nama' }).fill('Kurikulum 5');
  await page.getByRole('button', { name: 'Simpan' }).click();

  // Reset form tambah folder
  await page.getByRole('link', { name: 'Kelola Folder' }).click();
  await page.getByRole('textbox', { name: 'Nama' }).fill('Daftar guru baru');
  await page.getByRole('button', { name: 'Atur ulang' }).click();
  
  // Edit folder
  await page.getByRole('row', { name: 'Kurikulum 5' }).getByRole('button').first().click();
  await page.getByRole('textbox', { name: 'Nama Folder' }).fill('Daftar guru baru');
  await page.locator('#editFolderForm').getByRole('button', { name: 'Simpan' }).click();


  // Hapus folder
  await page.getByRole('link', { name: 'Kelola Folder' }).click();
  await page.getByRole('row', { name: 'Kurikulum 5' }).locator('form').getByRole('button').click();
  await page.getByRole('button', { name: 'Hapus' }).click();
});

test('Refresh, search, order by column, dan Ekspor', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Dokumen Kurikulum' }).click();
  await page.getByRole('link', { name: ' Kurikulum 1' }).click();
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('');
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.getByText('Di Upload Pada').click();
  await page.locator('span').filter({ hasText: 'Di Upload Pada' }).click();
  await page.getByRole('button', { name: 'Export' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'CSV' }).click();
  const download = await downloadPromise;
});

//Unggah file ERROR
//ERROR TEST CASE SAMA POSITIF CASENYA BELUM
});