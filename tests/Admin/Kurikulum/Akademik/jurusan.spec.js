import { test, expect } from '@playwright/test';

test.use({ storageState: 'adminState.json' });

test('Test Jurusan', async ({ page }) => {
  console.log('🔄 Membuka halaman utama...');
  await page.goto('https://esbeta.deanry.my.id/stream');
  await page.waitForTimeout(1800);

  console.log('➕ Menambahkan jurusan baru "Test"...');
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: /Nama|Name/ }).click();
  await page.waitForTimeout(800);
  await page.getByRole('textbox', { name: /Nama|Name/ }).type('Test', { delay: 200 });
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: /Simpan|Submit/ }).click();
  await page.waitForTimeout(1800);

  console.log('🔍 Melakukan pencarian jurusan "Test"...');
  await page.waitForTimeout(1000);
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('searchbox', { name: 'Search' }).type('Test', { delay: 150 });
  await page.waitForTimeout(1200);

  console.log('✏️ Mengedit jurusan "Test" menjadi "TestLoh"...');
  await page.getByRole('row', { name: 'Test ' }).locator('#dropdownMenuButton').click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.waitForTimeout(1000);
  await page.locator('#edit_name').fill('TestLoh');
  await page.waitForTimeout(800);
  await page.locator('#edit-form').getByRole('button', { name: 'Simpan' }).click();
  await page.waitForTimeout(1500);

  console.log('❌ Menutup modal edit...');
  await page.getByRole('row', { name: 'TestLoh ' }).locator('#dropdownMenuButton').click();
  await page.waitForTimeout(800);
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /Tutup|Close/ }).click();
  await page.waitForTimeout(1200);

  console.log('🗑️ Menghapus jurusan "TestLoh"...');
  await page.getByRole('row', { name: 'TestLoh ' }).locator('#dropdownMenuButton').click();
  await page.waitForTimeout(600);
  await page.getByRole('link', { name: /Hapus|Delete/, exact: true }).click();
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /Ya, hapus|Yes, delete it/ }).click();
  await page.waitForTimeout(1800);

  console.log('♻️ Memulihkan jurusan "TestLoh"...');
  await page.getByRole('link', { name: /Dihapus|Trashed/ }).click();
  await page.waitForTimeout(1200);
  await page.getByRole('row', { name: 'TestLoh ' }).locator('#dropdownMenuButton').click();
  await page.waitForTimeout(800);
  await page.getByRole('link', { name: /Pulihkan|Restore/ }).click();
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /Ya, Pulihkan|Yes, Restore it/ }).click();
  await page.waitForTimeout(1600);

  console.log('🗑️ Menghapus lagi dan membatalkannya...');
  await page.getByRole('link', { name: /Semua|All/ }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('row', { name: 'TestLoh ' }).locator('#dropdownMenuButton').click();
  await page.waitForTimeout(800);
  await page.getByRole('link', { name: /Hapus|Delete/, exact: true }).click();
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /Batal|Cancel/ }).click();
  await page.waitForTimeout(1000);

  console.log('🗑️ Menghapus jurusan lagi dan mengonfirmasi...');
  await page.getByRole('row', { name: 'TestLoh ' }).locator('#dropdownMenuButton').click();
  await page.waitForTimeout(800);
  await page.getByRole('link', { name: /Hapus|Delete/, exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: /Ya, hapus|Yes, delete it/ }).click();
  await page.waitForTimeout(1800);

  console.log('🗃️ Masuk ke tab "Dihapus"...');
  await page.getByRole('link', { name: /Dihapus|Trashed/ }).click();
  await page.waitForTimeout(1200);

  console.log('🚫 Membatalkan penghapusan permanen...');
  await page.getByRole('row', { name: 'TestLoh ' }).locator('#dropdownMenuButton').click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: /Hapus Permanen|Delete Permanent/ }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: /Batal|Cancel/ }).click();
  await page.waitForTimeout(1000);

  console.log('❌ Menghapus permanen jurusan "TestLoh"...');
  await page.getByRole('row', { name: 'TestLoh ' }).locator('#dropdownMenuButton').click();
  await page.waitForTimeout(800);
  await page.getByRole('link', { name: /Hapus Permanen|Delete Permanent/ }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: /Ya, hapus|Yes, delete/ }).click();
  await page.waitForTimeout(2000);

  console.log('✅ Kembali ke daftar semua jurusan...');
  await page.getByRole('link', { name: /Semua|All/ }).click();
  await page.waitForTimeout(1000);

  console.log('🎉 Semua proses selesai!');
});
