import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Tes Kurikulum - Ujian Offline", () => {
// Gunakan sesi login guru yang sudah disimpan
test.use({ storageState: 'guruState.json' });

test('test', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Offline ' }).click();
  await page.getByRole('link', { name: 'Unggah Hasil Ujian' }).click();

  await page.locator('#exam-class-section-id').selectOption('12'); //Pilih kelas
  await page.locator('#exam-id').selectOption('5'); //Pilih ujan
  await page.locator('#class_subject_id').selectOption('189'); //Pilih mapel
  await page.getByRole('button', { name: 'Cari' }).click();

  //input nilai per siswa
  await page.locator('input[name="exam_marks\\[1\\]\\[obtained_marks\\]"]').fill('80');
  await page.locator('input[name="exam_marks\\[2\\]\\[obtained_marks\\]"]').fill('78');
  await page.locator('input[name="exam_marks\\[3\\]\\[obtained_marks\\]"]').fill('75');
  await page.locator('input[name="exam_marks\\[4\\]\\[obtained_marks\\]"]').fill('82');
  await page.locator('input[name="exam_marks\\[5\\]\\[obtained_marks\\]"]').fill('88');
  await page.locator('input[name="exam_marks\\[6\\]\\[obtained_marks\\]"]').fill('75');
  await page.locator('input[name="exam_marks\\[7\\]\\[obtained_marks\\]"]').fill('0');
  await page.locator('input[name="exam_marks\\[6\\]\\[obtained_marks\\]"]').fill('75');
  await page.locator('input[name="exam_marks\\[8\\]\\[obtained_marks\\]"]').fill('76');
  await page.locator('input[name="exam_marks\\[9\\]\\[obtained_marks\\]"]').fill('77');
  await page.locator('input[name="exam_marks\\[10\\]\\[obtained_marks\\]"]').fill('80');
  await page.locator('input[name="exam_marks\\[11\\]\\[obtained_marks\\]"]').fill('81');
  await page.locator('input[name="exam_marks\\[12\\]\\[obtained_marks\\]"]').fill('75');
  await page.locator('input[name="exam_marks\\[13\\]\\[obtained_marks\\]"]').fill('77');
  await page.locator('input[name="exam_marks\\[14\\]\\[obtained_marks\\]"]').fill('73');
  await page.locator('input[name="exam_marks\\[15\\]\\[obtained_marks\\]"]').fill('78');
  await page.locator('input[name="exam_marks\\[16\\]\\[obtained_marks\\]"]').fill('83');
  await page.locator('input[name="exam_marks\\[17\\]\\[obtained_marks\\]"]').fill('81');
  await page.locator('input[name="exam_marks\\[18\\]\\[obtained_marks\\]"]').fill('80');
  await page.locator('input[name="exam_marks\\[19\\]\\[obtained_marks\\]"]').fill('72');
  await page.locator('input[name="exam_marks\\[20\\]\\[obtained_marks\\]"]').fill('75');
  await page.locator('input[name="exam_marks\\[21\\]\\[obtained_marks\\]"]').fill('83');
  await page.locator('input[name="exam_marks\\[22\\]\\[obtained_marks\\]"]').fill('80');
  await page.locator('input[name="exam_marks\\[23\\]\\[obtained_marks\\]"]').fill('82');
  await page.locator('input[name="exam_marks\\[24\\]\\[obtained_marks\\]"]').fill('76');
  await page.locator('input[name="exam_marks\\[25\\]\\[obtained_marks\\]"]').fill('73');
  await page.locator('input[name="exam_marks\\[26\\]\\[obtained_marks\\]"]').fill('80');
  await page.locator('input[name="exam_marks\\[27\\]\\[obtained_marks\\]"]').fill('77');
  await page.locator('input[name="exam_marks\\[28\\]\\[obtained_marks\\]"]').fill('60');
  await page.locator('input[name="exam_marks\\[29\\]\\[obtained_marks\\]"]').fill('90');
  await page.locator('input[name="exam_marks\\[30\\]\\[obtained_marks\\]"]').fill('76');
  await page.locator('input[name="exam_marks\\[31\\]\\[obtained_marks\\]"]').fill('82');
  await page.locator('input[name="exam_marks\\[32\\]\\[obtained_marks\\]"]').fill('77');
  await page.getByRole('button', { name: 'Simpan' }).click();

  await page.locator('#formdata div').filter({ hasText: 'Kelas -- Pilih Kelas -- XI' }).first().click();
  await page.locator('#exam-class-section-id').selectOption('12');
  await page.locator('#exam-id').selectOption('5');
  await page.locator('#class_subject_id').selectOption('189');
  await page.getByRole('button', { name: 'Cari' }).click();

  // Search
  await page.getByRole('searchbox', { name: 'Search' }).fill('BIM');
  await page.getByRole('searchbox', { name: 'Search' }).press('CapsLock');

  // Coba input niai >100 (Error Tesr Case)
  await page.getByRole('spinbutton').fill('889');
  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('');

  // Auto refresh
  await page.getByRole('button', { name: 'Refresh' }).click();

  // Order by column
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.locator('label').filter({ hasText: 'Nilai Total' }).click();
  await page.getByRole('checkbox', { name: 'Nilai Total' }).check();

  // Eksport
  await page.getByRole('button', { name: 'Export' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'TXT' }).click();
  const download = await downloadPromise;
});

// Error Test case Cari

test('Form cari - Cari tanpa pilih kelas, ujian, dan mapel', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/exams/upload-marks');

  // Cari hanya pilih kelas
  await page.locator('#exam-class-section-id').selectOption('12');
  await page.getByRole('button', { name: 'Cari' }).click();

  // Cari hanya pilih kelas dan ujian
  await page.locator('#exam-class-section-id').selectOption('12');
  await page.locator('#exam-id').selectOption('5');
  await page.getByRole('button', { name: 'Cari' }).click();

  // Cari dengan pilih kelas, ujian, dan mapel
  await page.locator('#exam-class-section-id').selectOption('12');
  await page.locator('#exam-id').selectOption('5');
  await page.locator('#class_subject_id').selectOption('189');
  await page.getByRole('button', { name: 'Cari' }).click();
});
});