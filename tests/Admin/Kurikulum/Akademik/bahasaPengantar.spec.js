import { test, expect } from '@playwright/test';
test.use({ storageState: 'adminState.json' });
test('Test Bahasa Pengantar', async ({ page }) =>{

console.log('🔄 Membuka halaman login...');
  await page.goto('https://esbeta.deanry.my.id/mediums');
  await page.waitForTimeout(1500);

  // console.log('📧 Mengisi email...');
  // await page.getByRole('textbox', { name: 'Email' }).click();
  // await page.getByRole('textbox', { name: 'Email' }).type('adminsmk8malang@gmail.com', { delay: 100 });
  // await page.waitForTimeout(1000);

  // console.log('🔑 Mengisi password...');
  // await page.getByRole('textbox', { name: 'Password' }).click();
  // await page.getByRole('textbox', { name: 'Password' }).type('hacked', { delay: 100 });
  // await page.locator('#togglePassword').click();
  // await page.waitForTimeout(1000);

  // console.log('🏫 Mengisi School Code...');
  // await page.getByRole('textbox', { name: 'School Code' }).click();
  // await page.getByRole('textbox', { name: 'School Code' }).type('sch20247', { delay: 100 });
  // await page.waitForTimeout(1000);

  // console.log('🚪 Menekan tombol Masuk...');
  // await page.getByRole('button', { name: 'Masuk' }).click();
  // await page.waitForTimeout(2000);

  // console.log('📚 Masuk ke menu Kurikulum...');
  // await page.getByRole('link', { name: ' Kurikulum ' }).click();
  // await page.waitForTimeout(1000);

  // console.log('🏫 Masuk ke menu Akademik...');
  // await page.getByRole('link', { name: ' Akademik ' }).click();
  // await page.waitForTimeout(1000);

  // console.log('🗣️ Buka menu Bahasa Pengantar...');
  // await page.getByRole('link', { name: 'Bahasa Pengantar' }).click();
  // await page.waitForTimeout(1500);

  console.log('📝 Tambah entri baru...');
  await page.getByRole('textbox', { name: /Nama|Name/ }).click();
  await page.getByRole('textbox', { name: /Nama|Name/ }).type('Test', { delay: 150 });
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /Simpan|Submit/ }).click();
  await page.waitForTimeout(1500);

  console.log('🔍 Mencari entri...');
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).type('Test', { delay: 100 });
  await page.waitForTimeout(1000);

  console.log('✏️ Mengedit entri...');
  await page.getByRole('row', { name: 'Test ' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Nama *' }).click();
  await page.getByRole('textbox', { name: 'Nama *' }).fill('Testyaa');
  await page.locator('#edit-form').getByRole('button', { name: 'Simpan' }).click();
  await page.waitForTimeout(1500);

  console.log('🗑️ Menghapus entri sementara...');
  await page.getByRole('row', { name: 'Testyaa ' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: /Hapus|Delete/, exact: true }).click();
  await page.getByRole('button', { name: /Ya, hapus|Yes, delete it/ }).click();
  await page.waitForTimeout(1000);

  console.log('♻️ Memulihkan entri...');
  await page.getByRole('link', { name: /Dihapus|Trashed/ }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('row', { name: 'Testyaa ' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: /Pulihkan|Restore/ }).click();
  await page.getByRole('button', { name: /Ya, Pulihkan|Yes, Restore it/ }).click();
  await page.waitForTimeout(1500);

  console.log('🚮 Menghapus permanen entri...');
  await page.getByRole('link', { name: /Semua|All/ }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('row', { name: 'Testyaa ' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: /Hapus|Delete/, exact: true }).click();
  await page.getByRole('button', { name: /Ya, hapus|Yes, delete it/ }).click();
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: /Dihapus|Trashed/ }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('row', { name: 'Testyaa ' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: /Hapus Permanen|Delete Permanent/ }).click();
  await page.getByRole('button', { name: /Ya, Hapus Secara Permanen!|Yes, Delete Permanently!/ }).click();

  console.log('✅ Proses selesai!');
});
