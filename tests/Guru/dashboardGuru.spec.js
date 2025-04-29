import { test, expect } from '@playwright/test';

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
