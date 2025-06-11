import { test, expect } from '@playwright/test';
test.use({ storageState: 'adminState.json' });


test('Admin menghapus dan menambahkan kategori nilai ujian offline', async ({ page }) => {
  console.log('🔐 Membuka halaman login...');
  await page.goto('https://esbeta.deanry.my.id/exam/grade');
  await page.waitForTimeout(1000);

  console.log('🗑️ Menghapus kategori nilai ke-4...');
  await page.locator('#remove-grades-4').click();
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Ya, hapus' }).click();
  await page.waitForTimeout(1500);

  console.log('➕ Menambahkan data baru...');
  await page.getByRole('button', { name: 'Tambahkan Data baru' }).click();
  await page.waitForTimeout(1000);

  console.log('🔢 Mengisi range nilai akhir...');
  const endingRangeInput = page.locator('input[name="grade_data\\[4\\]\\[ending_range\\]"]');
  await endingRangeInput.click();
  await endingRangeInput.fill('100');
  await page.waitForTimeout(800);

  console.log('🅰️ Mengisi huruf nilai...');
  const gradeInput = page.locator('input[name="grade_data\\[4\\]\\[grades\\]"]');
  await gradeInput.click();
  await gradeInput.fill('A');
  await page.waitForTimeout(800);

console.log('💾 Menyimpan data...');
await page.getByRole('button', { name: 'Simpan' }).click();
await page.waitForTimeout(2000); // opsional jeda

// console.log('✅ Memastikan nilai berhasil ditambahkan...');
// await expect(page.getByText('A')).toBeVisible({ timeout: 10000 });
// console.log('🎉 Nilai A ditemukan di halaman!');

  console.log('🎉 Semua langkah berhasil dijalankan!');
});
