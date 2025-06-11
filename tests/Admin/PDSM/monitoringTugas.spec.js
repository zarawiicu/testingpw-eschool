import { test, expect } from '@playwright/test';
test.use({ storageState: 'adminState.json' });

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

test('Monitoring Tugas', async ({ page }) => {
  console.log('🚀 Membuka halaman login...');
  await page.goto('https://esbeta.deanry.my.id/assignment-monitoring');
  await delay(1000);

  console.log('📂 Memilih status: submitted...');
  await page.getByLabel('Status Pengumpulan').selectOption('submitted');
  await delay(700);

  console.log('📂 Memilih status: not_submitted...');
  await page.getByLabel('Status Pengumpulan').selectOption('not_submitted');
  await delay(700);

  console.log('📂 Reset status filter...');
  await page.getByLabel('Status Pengumpulan').selectOption('');
  await delay(500);

  console.log('🔄 Klik tombol Refresh...');
  await page.getByRole('button', { name: 'Refresh' }).click();
  await delay(1000);

  console.log('🔍 Mencari "agung"...');
  await page.getByRole('searchbox', { name: 'Search' }).fill('agung');
  await delay(1000);

  console.log('👨‍🏫 Membuka menu Agung Cahyono...');
  await page.getByRole('row', { name: 'Agung Cahyono, S.Pd., Gr - 30 ' }).locator('#dropdownMenuButton').click();
  await delay(700);

  console.log('🔍 Klik Detail...');
  await page.getByRole('link', { name: 'Detail' }).click();
  await delay(1200);

  console.log('📚 Memilih mata pelajaran...');
  await page.locator('#modal_subject').selectOption('41');
  await delay(700);

  console.log('🏫 Memilih kelas...');
  await page.locator('#modal_class').selectOption('25');
  await delay(700);

  console.log('📆 Mengisi tanggal mulai...');
  await page.getByRole('textbox', { name: 'Tanggal Mulai' }).fill('2025-01-01');
  await delay(700);

  console.log('📆 Mengisi tanggal selesai...');
  await page.getByRole('textbox', { name: 'Tanggal Selesai' }).fill('2025-06-10');
  await delay(700);

  console.log('🔍 Mencari tugas dengan kata "buat"...');
  await page.locator('#detailModal').getByRole('searchbox', { name: 'Search' }).fill('buat');
  await delay(700);

  console.log('🔄 Refresh data tugas...');
  await page.locator('#detailModal').getByRole('button', { name: 'Refresh' }).click();
  await delay(1000);

  console.log('🔄 Kosongkan pencarian...');
  await page.locator('#detailModal').getByRole('searchbox', { name: 'Search' }).fill('');
  await delay(700);

  console.log('➡️ Pindah ke halaman 2...');
  await page.getByRole('link', { name: 'to page 2' }).click();
  await delay(1000);

  console.log('❌ Menutup detail...');
  await page.getByRole('button', { name: 'Tutup' }).click();
  await delay(700);

  console.log('🔁 Refresh kembali...');
  await page.getByRole('button', { name: 'Refresh' }).click();
  await delay(700);

  console.log('🔍 Kosongkan pencarian utama...');
  await page.getByRole('searchbox', { name: 'Search' }).fill('');
  await delay(700);

  console.log('✅ Selesai!');
});
