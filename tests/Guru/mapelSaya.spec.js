import { test, expect } from '@playwright/test';

// Gunakan state login dari guru
test.use({ storageState: 'guruState.json' });
const BASE_URL = 'https://esbeta.deanry.my.id';

// Biar langsung buka mapel saya
async function goToMyLesson(page) {
  // Akses dashboard guru
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  console.log('✅Buka halaman pertama..')

  await page.goto(`${BASE_URL}/mylesson`, { waitUntil: 'networkidle' });
  console.log('🚀Halaman berhasil dibuka..')
  await page.locator('.row').first().waitFor();
  await page.locator('.row').first().click();
  await page.getByRole('link', { name: ' Mapel saya' }).click();
  await page.locator('div:nth-child(2) > .card > .card-body > .btn').click();
}

test('Mapel Saya, Tambah Tugas', async ({ page }) => {
  await goToMyLesson(page);

  // Tunggu tombol "Tambah Penugasan" siap
  await page.getByRole('button', { name: 'Tambah Penugasan' }).waitFor();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();

  // Isi form Tambah Penugasan
  const dialog = page.getByRole('dialog', { name: 'Tambah Penugasan' });
  await dialog.getByLabel('Kelas Kelompok Belajar *').selectOption('35');
  await expect(dialog.getByLabel('Kelas Kelompok Belajar *')).toHaveValue('35');
  await dialog.getByLabel('Mata Pelajaran *').selectOption('141');
  await expect(dialog.getByLabel('Mata Pelajaran *')).toHaveValue('141');

  await dialog.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Teori - Lari Renang');
  await page.waitForTimeout(500);
  await dialog.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Buat artikel tentang renang, bisa sejaranya, perlombaannya, terserah');
  await page.waitForTimeout(500);

  await dialog.getByRole('textbox', { name: 'Jatuh tempo *' }).fill('2025-05-01T21:00');
  await page.waitForTimeout(500);
  await dialog.getByRole('textbox', { name: 'Mulai*' }).fill('2025-04-28T08:00');
  await page.waitForTimeout(500);
  await dialog.getByRole('textbox', { name: 'Akhir*' }).fill('2025-05-12T12:00');
  await page.waitForTimeout(500);

  await dialog.getByRole('spinbutton', { name: 'Poin' }).fill('100');
  await page.waitForTimeout(500);
  await dialog.getByRole('spinbutton', { name: 'Nilai Kelulusan' }).fill('75');
  await page.waitForTimeout(500);

  // Checklist file type
  const fileTypes = ['docx', 'jpeg', 'jpg', 'pdf', 'png'];
  for (const type of fileTypes) {
    await dialog.getByRole('checkbox', { name: type }).check();
    await page.waitForTimeout(500);
  }

  await dialog.getByLabel('Ukuran Maksimum File').selectOption('50');
  await expect(dialog.getByLabel('Ukuran Maksimum File')).toHaveValue('50');
  await dialog.getByText('Pengiriman Ulang Diizinkan').click();
  await dialog.getByRole('textbox', { name: 'Hari Tambahan untuk' }).fill('2');
  await page.waitForTimeout(500);

  // Simpan Penugasan
  await page.getByRole('button', { name: 'Simpan' }).click();
  await expect(page.getByRole('dialog', { name: 'Tambah Penugasan' })).toBeHidden({ timeout: 10000 });
  console.log('✅Test Selesai, Yeay!..')
});

test('Mapel Saya, Edit Tugas', async ({ page }) => {
  await goToMyLesson(page);
  
  // Edit Tugas
  const editButton = await page.getByRole('link', { name: 'Edit' });
  await editButton.waitFor();
  await editButton.click();

  const dialog = page.getByRole('dialog', { name: 'Edit Penugasan' });
  await dialog.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Teori - Renang (Part 4)');
  await page.getByRole('button', { name: 'Simpan' }).click();
  await expect(page.getByRole('dialog', { name: 'Edit Penugasan' })).toBeHidden({ timeout: 10000 });
  console.log('✅Test Selesai, Yeay!..')
});

test('Mapel Saya, Hapus data dari halaman 2', async ({ page }) => {
  await goToMyLesson(page);

  // Tunggu elemen pertama muncul
  await page.locator('.row').first().waitFor();
  await page.locator('.row').first().click();

  await page.getByRole('link', { name: ' Mapel saya' }).click();
  await page.locator('div:nth-child(2) > .card > .card-body > .btn').click();

  // Navigasi halaman & Hapus Tugas
  await page.getByRole('link', { name: 'to page 2' }).click();
  await page.getByRole('cell', { name: '' }).nth(3).click();
  await page.getByRole('link', { name: 'Hapus' }).click();
  await page.getByRole('button', { name: 'Yes, delete it' }).click();
  console.log('✅Test Selesai, Yeay!..')
});

test('Mapel saya, Pagiination, Search, Refresh, Columns dan Export Data', async ({ page }) => {
  await goToMyLesson(page);

  // Tunggu elemen pertama muncul
  await page.locator('.row').first().waitFor();
  await page.locator('.row').first().click();

  await page.getByRole('link', { name: ' Mapel saya' }).click();
  await page.locator('div:nth-child(2) > .card > .card-body > .btn').click();

  await page.getByRole('button', { name: '5' }).click();
  await page.getByRole('link', { name: '10' }).click();
  await page.getByRole('link', { name: 'to page 1' }).click();

  // Search
  await page.getByRole('searchbox', { name: 'Search' }).fill('mandiri');

  // Beberapa aksi lainnya
  await page.getByRole('button', { name: 'Hide/Show pagination' }).click();
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.locator('label:nth-child(5)').click();
  await page.getByText('File', { exact: true }).click();

  // Export CSV
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export' }).click();
  await page.getByRole('link', { name: 'CSV' }).click();
  const download = await downloadPromise;
  await download.saveAs('exported.csv'); // Opsi penyimpanan file
  console.log('✅Test Selesai, Yeay!..')
});