import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Tes Kurikulum - Ujian Online", () => {
// Gunakan sesi login guru yang sudah disimpan
test.use({ storageState: 'guruState.json' });

test('Tambah ujian online', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Ujian', exact: true }).click();
  await page.locator('#class-section-id').selectOption('35');
  await page.locator('#subject-id').selectOption('141');
  await page.getByRole('textbox', { name: 'Judul' }).fill('PAS PJOK 2');
  await page.locator('#key').fill('9456');
  await page.locator('#duration').fill('120');
  await page.locator('[id="start-date\\ timepicker-example"]').fill('2025-06-10T08:00');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Edit ujian online', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Ujian', exact: true }).click();
  await page.getByRole('row', { name: '10 XII TKJ B - ID MULOK PJOK' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.locator('#edit-online-exam-title').fill('UH PJOK 2');
  await page.locator('#edit-form').getByRole('button', { name: 'Simpan' }).click();
});

test('Hapus ujian online', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Ujian', exact: true }).click();
  await page.getByRole('row', { name: '7 XII METRO B - ID MULOK PJOK' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Hapus', exact: true }).click();
  await page.getByRole('button', { name: 'Ya, hapus' }).click();
});

test('Tambah Soal', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Ujian', exact: true }).click();
  await page.getByRole('row', { name: '1 XII RPL D - ID MULOK PJOK' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();
  await page.getByRole('combobox', { name: 'Pilih Bank Soal' }).click();
  await page.getByRole('treeitem', { name: 'SOAL ESAI' }).click(); 
  await page.getByRole('searchbox', { name: 'Search' }).fill('kebugaran jasmani');
  await page.getByRole('searchbox', { name: 'Search' }).fill('');
  await page.getByRole('searchbox', { name: 'Search' }).fill('');
  await page.getByRole('combobox', { name: '× SOAL ESAI' }).locator('span').nth(2).click();
  await page.locator('input[type="search"]').nth(3).fill('atletik');
  await page.locator('#selectAll').check();
  await page.getByRole('button', { name: 'Simpan' }).click();

  //Ubah nilai per soal
  await page.locator('input[name="assign_questions\\[112\\]\\[marks\\]"]').fill('50');
  await page.locator('input[name="assign_questions\\[119\\]\\[marks\\]"]').fill('50');

  //Coba hapus soal yg sudah dipilih
  await page.getByRole('listitem').filter({ hasText: 'Soal #7 Esai Jelaskan fungsi' }).locator('a').click();
  await page.getByRole('button', { name: 'Ya, hapus' }).click();
  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.getByRole('link', { name: ' Kembali' }).click();
});
 
test('Hasil Ujian', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Ujian', exact: true }).click();
  await page.getByRole('row', { name: '3 XII METRO A - ID MULOK PJOK' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Hasil' }).click();

  //Search & toolbar
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('Raf');
  await page.getByRole('searchbox', { name: 'Search' }).fill('');

  await page.locator('.fixed-table-toolbar').click();
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.getByRole('button', { name: 'Export' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'CSV' }).click();
  const download = await downloadPromise;
  await page.getByRole('link', { name: ' Kembali' }).click();
});

test('Koreksi Ujian', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Ujian', exact: true }).click();
  await page.getByRole('row', { name: '3 XII METRO A - ID MULOK PJOK' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Koreksi' }).click();
  await page.locator('.mt-4 > .btn').first().click();
  await page.locator('.correction-box').first().click();
  await page.getByRole('spinbutton').fill('100');
  await page.getByRole('button', { name: 'Simpan Koreksi' }).click();

  await page.locator('div:nth-child(2) > .card-body > .mt-4 > .btn').click();
  await page.getByLabel('Koreksi Jawaban Siswa').getByText('Benar').click();
  await page.getByRole('spinbutton').fill('100');
  await page.getByRole('button', { name: 'Simpan Koreksi' }).click();

  await page.locator('div:nth-child(3) > .card-body > .mt-4 > .btn').click();
  await page.getByRole('dialog', { name: 'Koreksi Jawaban Siswa' }).locator('i').nth(2).click();
  await page.getByRole('spinbutton').fill('100');
  await page.getByRole('button', { name: 'Simpan Koreksi' }).click();

  await page.locator('div:nth-child(4) > .card-body > .mt-4 > .btn').click();
  await page.getByLabel('Koreksi Jawaban Siswa').getByText('Benar').click();
  await page.getByRole('spinbutton').fill('100');
  await page.getByRole('button', { name: 'Simpan Koreksi' }).click();

  await page.locator('div:nth-child(5) > .card-body > .mt-4 > .btn').click();
  await page.getByLabel('Koreksi Jawaban Siswa').getByText('Benar').click();
  await page.getByRole('spinbutton').fill('100');
  await page.getByRole('button', { name: 'Simpan Koreksi' }).click();

  await page.locator('div:nth-child(6) > .card-body > .mt-4 > .btn').click();
  await page.getByLabel('Koreksi Jawaban Siswa').getByText('Benar').click();
  await page.getByRole('spinbutton').fill('80');
  await page.getByRole('button', { name: 'Simpan Koreksi' }).click();

  await page.locator('div:nth-child(7) > .card-body > .mt-4 > .btn').click();
  await page.getByRole('button', { name: 'Simpan Koreksi' }).click();
  await page.getByRole('link', { name: 'Kembali' }).click();
});

test('Status Ujian', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Ujian', exact: true }).click();
  await page.getByRole('row', { name: '3 XII METRO A - ID MULOK PJOK' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Status' }).click();
  await page.getByRole('button', { name: '' }).click();

  //Search siswa
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('Raf');
  await page.getByRole('searchbox', { name: 'Search' }).fill('');
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.locator('label').filter({ hasText: 'No' }).click();
  await page.locator('label').filter({ hasText: 'No' }).click();
  await page.locator('.fixed-table-toolbar').click();
  await page.getByRole('link', { name: 'Kembali' }).click();
});

//ERROR TEST CASE
test('Tambah ujian - form kosong', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Ujian', exact: true }).click();

  //Bahasa
  await page.getByRole('link', { name: '' }).click();
  await page.getByRole('link', { name: 'Bahasa Indonesia' }).click();
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Tambah ujian - hanya isi kelas', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Ujian', exact: true }).click();
  await page.locator('#class-section-id').selectOption('12');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Tambah ujian - hanya isi kelas dan mapel', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Ujian', exact: true }).click();
  await page.locator('#class-section-id').selectOption('12');
  await page.locator('#subject-id').selectOption('189');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Tambah ujian - hanya isi kelas, mapel, dan judul ujian', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Ujian', exact: true }).click();
  await page.locator('#class-section-id').selectOption('12');
  await page.locator('#subject-id').selectOption('189');
  await page.locator('#title').fill('UH PJOK(Final)');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Tambah ujian - hanya isi kelas, mapel, judul, dan kunci ujian', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Ujian', exact: true }).click();
  await page.locator('#class-section-id').selectOption('12');
  await page.locator('#subject-id').selectOption('189');
  await page.locator('#title').fill('UH PJOK(Final)');
  await page.locator('#key').fill('6281');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Tambah ujian - hanya isi kelas, mapel, judul, kunci, dan durasi ujian', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Ujian', exact: true }).click();
  await page.locator('#class-section-id').selectOption('12');
  await page.locator('#subject-id').selectOption('189');
  await page.locator('#title').fill('UH PJOK(Final)');
  await page.locator('#key').fill('6281');
  await page.getByRole('spinbutton', { name: 'duration' }).fill('120');
  await page.getByRole('button', { name: 'Simpan' }).click();
});
  
test('Tambah ujian - hanya isi kelas, mapel, judul, kunci, durasi, dan tgl mulai ujian', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Ujian', exact: true }).click();
  await page.locator('#class-section-id').selectOption('12');
  await page.locator('#subject-id').selectOption('189');
  await page.locator('#title').fill('UH PJOK(Final)');
  await page.locator('#key').fill('6281');
  await page.locator('#duration').fill('120');
  await page.fill('[name="start_date"]', '2025-06-10T11:00');
  await page.getByRole('button', { name: 'Simpan' }).click();
});
  
test('Tambah ujian - reset form', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Ujian', exact: true }).click();
  await page.locator('#class-section-id').selectOption('14');
  await page.locator('#subject-id').selectOption('189');
  await page.locator('#title').fill('UH PJOK(Final)');
  await page.locator('#key').fill('5912');
  await page.locator('#duration').fill('120');
  await page.getByRole('textbox', { name: 'This field is required.' }).fill('2025-06-10T14:00');
  await page.getByRole('button', { name: 'Atur' }).click();
});

test('Filter, search, dan pagination', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Ujian', exact: true }).click();

  //filter kelas
  await page.locator('#filter-class-section-id').selectOption('35');

  //filter mapel
  await page.locator('#filter-subject-id').selectOption('141');
  await page.locator('#filter-class-section-id').selectOption('');

  //Search
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('UH');
  await page.getByRole('searchbox', { name: 'Search' }).fill('');

  //refresh
  await page.getByRole('button', { name: 'Refresh' }).click();

  //column
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.getByRole('checkbox', { name: 'Kunci Ujian' }).check();
  await page.getByRole('checkbox', { name: 'Kunci Ujian' }).uncheck();

  //eksport
  await page.getByRole('button', { name: 'Export' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'XML' }).click();
  const download = await downloadPromise;

  //Pagination
  await page.getByRole('row', { name: '1 XI TKJ A - ID MULOK PJOK -' }).locator('#dropdownMenuButton').click();
  await page.getByText('Tahun Ajaran 2024/20252025 Kelas Semua XI TKJ A XI TKJ B XI TKJ C XI TKJ D XI').click();
  await page.getByRole('button', { name: '10' }).click();
  await page.getByRole('link', { name: '20' }).click();
  await page.getByRole('link', { name: 'next page' }).click();
  await page.getByRole('button', { name: '20' }).click();
  await page.getByRole('link', { name: '10' }).click();
  await page.getByRole('link', { name: 'to page 1' }).click();
});

test('Data ujian yg dihapus', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Ujian', exact: true }).click();
  await page.getByRole('link', { name: 'Dihapus' }).click();
  await page.getByRole('row', { name: '1 XII TKJ B - ID MULOK PJOK' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Memulihkan' }).click();
  await page.getByRole('button', { name: 'Ya, Pulihkan' }).click();
  await page.getByRole('row', { name: '6 XII TKJ B - ID MULOK PJOK' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Hapus', exact: true }).click();
  await page.getByRole('button', { name: 'Ya, Hapus Secara Permanen!' }).click();

  // Semua data
  await page.getByRole('link', { name: 'Semua' }).click();
});

});