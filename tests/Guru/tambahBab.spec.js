import { test, expect } from '@playwright/test';
test.describe.configure({ mode: 'serial' }); // Jika ingin test berurutan (opsional)
test.describe('CRUDS Bab', () => {
test('test', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah bab' }).click();
  await page.locator('#class-section-id').selectOption('35');
  await page.locator('#subject-id').selectOption('141');
  await page.getByRole('textbox', { name: 'Nama Pelajaran' }).click();
  await page.getByRole('textbox', { name: 'Nama Pelajaran' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nama Pelajaran' }).fill('L');
  await page.getByRole('textbox', { name: 'Nama Pelajaran' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nama Pelajaran' }).fill('Lompat');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).click();
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).fill('P');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).fill('Pembelajaran lomppat indah');
  await page.getByRole('button', { name: ' Tambah File' }).click();
  await page.locator('#file_type').selectOption('file_upload');
  await page.getByRole('textbox', { name: 'Nama File' }).click();
  await page.getByRole('textbox', { name: 'Nama File' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nama File' }).fill('L');
  await page.getByRole('textbox', { name: 'Nama File' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Nama File' }).fill('Lompat');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('lompat.jpeg');
  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.getByRole('row', { name: '1 Lompat Pembelajaran lomppat' }).locator('summary').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Lompat' }).click();
  const page1 = await page1Promise;
  await page.getByRole('row', { name: '1 Lompat Pembelajaran lomppat' }).locator('#dropdownMenuButton').click();
  await page.getByRole('cell', { name: 'Pembelajaran lomppat indah' }).click();
  await page.getByRole('button', { name: 'Tutup' }).click();
  await page.getByRole('row', { name: '1 Lompat Pembelajaran lomppat' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).click();
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).fill('Pembelajaran lompat indah');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).press('ArrowLeft');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).fill('Pembelajaran cang olahraga lompat indah');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).press('ArrowRight');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).fill('Pembelajaran cang olahraga lompat ');
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Pratinjau Berkas' }).click();
  const page2 = await page2Promise;
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('lompat2.jpeg');
  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.goto('https://esbeta.deanry.my.id/lesson');
  await page.getByRole('row', { name: '1 Lompat Pembelajaran cang' }).locator('summary').click();
  await page.getByRole('row', { name: '1 Lompat Pembelajaran cang' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Hapus' }).click();
  await page.getByRole('button', { name: 'Ya, hapus' }).click();
  await page.getByLabel('Bagian Kelas').selectOption('12');
  await page.locator('#filter-subject-id').selectOption('189');
  await page.getByLabel('Bagian Kelas').selectOption('');
  await page.locator('body').press('CapsLock');
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('D');
  await page.getByRole('searchbox', { name: 'Search' }).press('CapsLock');
  await page.getByRole('searchbox', { name: 'Search' }).fill('Dasar');
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.locator('label').filter({ hasText: 'Keterangan' }).click();
  await page.getByRole('button', { name: 'Export' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'XML' }).click();
  const download = await downloadPromise;
  await page.goto('https://esbeta.deanry.my.id/lesson');
  await page.getByRole('button', { name: '10' }).click();
  await page.getByRole('link', { name: '5' }).click();
  await page.getByRole('link', { name: 'to page 2' }).click();
  await page.getByRole('link', { name: 'to page 3' }).click();
  await page.getByRole('link', { name: 'next page' }).click();
  await page.getByRole('link', { name: 'previous page' }).click();
});
});