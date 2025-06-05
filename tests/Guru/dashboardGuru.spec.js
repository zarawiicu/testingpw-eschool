import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Tes Dashboard", () => {

// Gunakan sesi login guru yang sudah disimpan
test.use({ storageState: 'guruState.json' });

test('Dashboard Guru - Filter dan Lihat Detail Ujian', async ({ page }) => {
  // Akses dashboard guru
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });

  // Filter cuti/izin yang akan datang
  await page.locator('select[name="leave_filter"]').selectOption('Upcoming');

  // Pilih kelas 12
  await page.locator('select[name="class_id"]').selectOption('12');

  // Pilih nama ujian yang ingin ditampilkan
  await page.locator('#exam_reuslt_exam_name').selectOption('Ujian PJOK');

  // Klik untuk melihat detail lebih lanjut
  await page.getByRole('link', { name: 'Baca Selengkapnya' }).click();
});

// ERROR TEST CASE
// Semua sudah berfungsi dengan baik, data juga suah tampil ddengan baik
// Tes Navigasi
test('Dashboard - Tes Navigasi', async ({ page }) => {
  await page.getByRole('link', { name: 'image Agung Cahyono, S.Pd....' }).click();
  await page.getByRole('link', { name: ' Profil' }).click();
  await page.goto('https://esbeta.deanry.my.id/auth/profile');
  await page.getByRole('link', { name: 'image Agung Cahyono, S.Pd....' }).click();
  await page.getByRole('link', { name: ' Ubah Kata Sandi' }).click();
  await page.goto('https://esbeta.deanry.my.id/auth/change-password');
  await page.getByRole('link', { name: 'image Agung Cahyono, S.Pd....' }).click();
  await page.getByRole('link', { name: ' Dasbor' }).click();
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.locator('#exam_reuslt_exam_name').selectOption('UTS');
  await page.getByText('Class: XII RPL - ID 51.61% Pilih tahun ajaran dan ujian untuk melihat hasil').click();
  await page.getByRole('link', { name: 'image Agung Cahyono, S.Pd....' }).click();
  await page.getByRole('link', { name: ' Keluar' }).click();
  await page.goto('https://esbeta.deanry.my.id/');
});

test('Coba akses dashboard tanpa login', async ({ page }) => {
  await page.getByRole('link', { name: 'image Agung Cahyono, S.Pd....' }).click();
  await page.getByRole('link', { name: ' Keluar' }).click();
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono533@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('081230093978');
  await page.getByRole('textbox', { name: 'School Code' }).fill('SCH20248');
  await page.getByRole('button', { name: 'Masuk' }).click();
  await page.goto('https://esbeta.deanry.my.id/dashboard');
});
});