import { test, expect } from '@playwright/test';

test.use({ storageState: 'adminState.json' });

test('Full CRUD Test Kelompok Belajar', async ({ page }) => {
  console.log('🔄 Membuka halaman Kelompok Belajar...');
  await page.goto('https://esbeta.deanry.my.id/section');
  await page.waitForTimeout(1800);

  // ❗ Login manual tidak dibutuhkan karena storage digunakan

  console.log('➕ Menambahkan kelompok baru "Test"...');
  await page.getByRole('textbox', { name: /Nama|Name/ }).click();
  await page.waitForTimeout(800);
  await page.getByRole('textbox', { name: /Nama|Name/ }).type('Test', { delay: 200 });
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: /Simpan|Submit/ }).click();
  await page.waitForTimeout(1800);

  console.log('🔍 Mencari kelompok "Test"...');
  await page.getByRole('searchbox', { name: /Search/ }).click();
  await page.waitForTimeout(500);
  await page.getByRole('searchbox', { name: /Search/ }).type('Test', { delay: 150 });
  await page.waitForTimeout(1200);

  console.log('✏️ Mengedit nama kelompok menjadi "TestLoh"...');
  await page.getByRole('row', { name: 'Test ' }).locator('#dropdownMenuButton').click();
  await page.waitForTimeout(800);
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.waitForTimeout(1000);
  await page.locator('#edit_name').fill('TestLoh');
  await page.waitForTimeout(800);
  await page.locator('#edit-form').getByRole('button', { name: /Simpan|Submit/ }).click();
  await page.waitForTimeout(1500);

  // console.log('❌ Menutup modal Edit...');
  // await page.getByRole('row', { name: 'TestLoh ' }).locator('#dropdownMenuButton').click();
  // await page.waitForTimeout(800);
  // await page.getByRole('link', { name: 'Edit' }).click();
  // await page.waitForTimeout(800);
  // await page.getByRole('button', { name: /Tutup|Close/ }).click();
  // await page.waitForTimeout(1200);

  console.log('🗑️ Menghapus kelompok (soft delete)...');
  await page.getByRole('row', { name: 'TestLoh ' }).locator('#dropdownMenuButton').click();
  await page.waitForTimeout(600);
  await page.getByRole('link', { name: /Hapus|Delete/, exact: true }).click();
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /Ya, hapus|Yes, delete it/ }).click();
  await page.waitForTimeout(1800);
  await page.getByRole('link', { name: /Dihapus|Trashed/ }).click();
  await page.waitForTimeout(1200);

  console.log('♻️ Memulihkan kelompok...');
  await page.getByRole('row', { name: 'TestLoh ' }).locator('#dropdownMenuButton').click();
  await page.waitForTimeout(800);
  await page.getByRole('link', { name: /Pulihkan|Restore/ }).click();
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /Ya, Pulihkan|Yes, Restore it/ }).click();
  await page.waitForTimeout(1600);
  await page.getByRole('link', { name: /Semua|All/ }).click();
  await page.waitForTimeout(1200);

  console.log('🗑️ Hapus lagi dan batal...');
  await page.getByRole('row', { name: 'TestLoh ' }).locator('#dropdownMenuButton').click();
  await page.waitForTimeout(800);
  await page.getByRole('link', { name: /Hapus|Delete/, exact: true }).click();
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /Batal|Cancel/ }).click();
  await page.waitForTimeout(1000);

  console.log('🗑️ Hapus lagi dan konfirmasi...');
  await page.getByRole('row', { name: 'TestLoh ' }).locator('#dropdownMenuButton').click();
  await page.waitForTimeout(800);
  await page.getByRole('link', { name: /Hapus|Delete/, exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: /Ya, hapus|Yes, delete it/ }).click();
  await page.waitForTimeout(1800);

  console.log('🗃️ Masuk ke tab Dihapus...');
  await page.getByRole('link', { name: /Dihapus|Trashed/ }).click();
  await page.waitForTimeout(1200);

  console.log('🚫 Batal hapus permanen...');
  await page.getByRole('row', { name: 'TestLoh ' }).locator('#dropdownMenuButton').click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: /Hapus Permanen|Delete Permanent/ }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: /Batal|Cancel/ }).click();
  await page.waitForTimeout(1000);

  console.log('🔥 Hapus permanen...');
  await page.getByRole('row', { name: 'TestLoh ' }).locator('#dropdownMenuButton').click();
  await page.waitForTimeout(800);
  await page.getByRole('link', { name: /Hapus Permanen|Delete Permanent/ }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: /Ya, Hapus Secara Permanen!|Yes, Delete Permanently!/ }).click();
  await page.waitForTimeout(2000);

  console.log('✅ Kembali ke daftar semua...');
  await page.getByRole('link', { name: /Semua|All/ }).click();
  await page.waitForTimeout(1000);

  console.log('🎉 Proses selesai!');
});
