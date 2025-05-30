import { test, expect } from '@playwright/test';
test.use({ storageState: 'adminState.json' });


test('CRUD Bahasa Pengantar', async ({ page }) => {
  console.log('🚀 Membuka halaman login...');
  await page.goto('https://esbeta.deanry.my.id/mediums');
  await page.waitForLoadState('networkidle');

  // console.log('✍️ Mengisi form login...');
  // await page.getByRole('textbox', { name: 'Email' }).fill('adminsmk9malang@gmail.com');
  // await page.getByRole('textbox', { name: 'Password' }).fill('0341479148');
  // await page.getByRole('textbox', { name: 'School Code' }).fill('SCH20248');
  // await page.getByRole('button', { name: 'Masuk' }).click();
  // await page.waitForLoadState('networkidle');
  // await page.waitForTimeout(1000);

  // console.log('📚 Masuk ke menu Akademik...');
  // await page.getByRole('link', { name: ' Kurikulum ' }).click();
  // await page.waitForLoadState('networkidle');
  // await page.getByRole('link', { name: ' Akademik ' }).click();
  // await page.waitForLoadState('networkidle');
  // await page.getByRole('link', { name: 'Bahasa Pengantar' }).click();
  // await page.waitForTimeout(1000);

  console.log('🔄 Refresh data Bahasa Pengantar...');
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.waitForTimeout(1000);

  console.log('➕ Menambahkan Bahasa Pengantar baru...');
  await page.getByRole('textbox', { name: /Nama|Name/ }).fill('JPN');
  await page.getByRole('button', { name: /Simpan|Submit/ }).click();
  await page.waitForTimeout(1000);

  console.log('🔍 Tes fitur Search...');
  await page.getByRole('searchbox', { name: 'Search' }).fill('JPN');

  console.log('🗑️ Menghapus sementara Bahasa Pengantar...');
  await page.getByRole('row', { name: 'JPN ' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: /Hapus|Delete/, exact: true }).click();
  await page.getByRole('button', { name: /Yes, delete it|Ya, hapus/ }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  console.log('♻️ Memulihkan Bahasa Pengantar...');
  await page.getByRole('link', { name: /Dihapus|Trashed/ }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('row', { name: 'JPN ' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: /Pulihkan|Restore/, exact: true }).click();
  await page.getByRole('button', { name: /Ya, Pulihkan|Yes, Restore it/ }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  console.log('🛠️ Mengedit Bahasa Pengantar...');
  await page.getByRole('link', { name: /Semua|All/ }).click();
  await page.waitForLoadState('networkidle');
  await page.getByRole('row', { name: 'JPN ' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByRole('textbox', { name: /Nama|Name/ }).fill('JPN');
  await page.getByRole('dialog', { value: /Simpan|Save/ }).locator('input[type="submit"]').click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  console.log('🔄 Mengembalikan nama Bahasa Pengantar ke semula...');
  await page.getByRole('row', { name: 'JPN' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: /Hapus|Delete/, exact: true }).click();
  await page.getByRole('button', { name: /Yes, delete it|Ya, hapus/ }).click();
  await page.waitForLoadState('networkidle');

  console.log('🧹 Menghapus Bahasa Pengantar secara permanen...');
  await page.getByRole('link', { name: /Dihapus|Trashed/ }).click();
  await page.getByRole('row', { name: 'JPN' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: /Hapus Permanen|Delete Permanent/ }).click();
  await page.getByRole('button', { name: /Ya, Hapus Secara Permanen!|Yes, Delete Permanently!/ }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  console.log('🔁 Kembali ke Dasbor Akademik...');
  await page.getByRole('link', { name: /Semua|All/ }).click();
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.waitForLoadState('networkidle');

  console.log('✅ Selesai tanpa error!');
});
