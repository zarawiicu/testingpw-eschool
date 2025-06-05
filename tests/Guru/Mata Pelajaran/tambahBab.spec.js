import { test, expect } from '@playwright/test';
test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Tes mata pelajaran - tambah bab", () => {

// Gunakan sesi login guru yang sudah disimpan
test.use({ storageState: 'guruState.json' });

test('Tambah Bab - Dg File Foto', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah bab' }).click();
  await page.locator('#class-section-id').selectOption('35');
  await page.locator('#subject-id').selectOption('141');
  await page.getByRole('textbox', { name: 'Nama Pelajaran' }).fill('Kebugaran Jasmani');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).fill('apa itu kebugaran jasmani, apa pentingnya, dan gimana cara mencapainya');
  await page.getByRole('button', { name: ' Tambah File' }).click();
  await page.locator('#file_type').selectOption('file_upload');
  await page.getByRole('textbox', { name: 'Nama File' }).fill('Kebugaran-jasmani');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('kebugaran jasmani.jpeg');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Tambah Bab - Dg File Dokumen', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah bab' }).click();
  await page.locator('#class-section-id').selectOption('35');
  await page.locator('#subject-id').selectOption('141');
  await page.getByRole('textbox', { name: 'Nama Pelajaran' }).fill('Permainan bola kasti');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).fill('Pendahuluan mengenai bab kasti');
  await page.getByRole('button', { name: ' Tambah File' }).click();
  await page.locator('#file_type').selectOption('file_upload');
  await page.getByRole('textbox', { name: 'Nama File' }).fill('Kasti');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('Pengertian Permainan Kasti.pdf');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('tambah bab - dengan format file video', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah bab' }).click();
  await page.locator('#class-section-id').selectOption('25');
  await page.locator('#subject-id').selectOption('131');
  await page.getByRole('textbox', { name: 'Nama Pelajaran' }).fill('Senam');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).fill('Senam aerobik');
  await page.getByRole('button', { name: ' Tambah File' }).click();
  await page.locator('#file_type').selectOption('video_upload');
  await page.getByRole('textbox', { name: 'Nama File' }).fill('Senam');
  await page.locator('input[name="file_data\\[0\\]\\[thumbnail\\]"]').click();
  await page.locator('input[name="file_data\\[0\\]\\[thumbnail\\]"]').setInputFiles('senam.jpeg');
  await page.locator('input[name="file_data\\[0\\]\\[file\\]"]').click();
  await page.locator('input[name="file_data\\[0\\]\\[file\\]"]').setInputFiles('videoplayback (4).mp4');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('tambah bab - dengan Link Youtube', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah bab' }).click();
  await page.locator('#class-section-id').selectOption('13');
  await page.locator('#subject-id').selectOption('189');
  await page.getByRole('textbox', { name: 'Nama Pelajaran' }).fill('silat');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).fill('teknik dasar silat');
  await page.locator('#file_type').selectOption('youtube_link');
  await page.getByRole('textbox', { name: 'Nama File' }).click();
  await page.getByRole('textbox', { name: 'Nama File' }).fill('teknik-dasar-silat');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('silat.jpeg');
  await page.getByRole('textbox', { name: 'Link' }).click();
  await page.getByRole('textbox', { name: 'Link' }).fill('https://youtu.be/JijFSXO2oFc?si=isTBkFpfRNSbH37e');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('tambah bab - buka field file dan tanpa upload file', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah bab' }).click();
  await page.goto('https://esbeta.deanry.my.id/lesson');
  await page.locator('#class-section-id').selectOption('14');
  await page.locator('#subject-id').selectOption('189');
  await page.getByRole('textbox', { name: 'Nama Pelajaran' }).fill('Kebugaran Jasmani');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).fill('Kebugaran jasmani adalah kemampuan tubuh untuk melakukan aktivitas sehari-hari tanpa merasa lelah');
  await page.getByRole('button', { name: ' Tambah File' }).click();
  await page.locator('#file_type').selectOption('file_upload');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('tambah bab - tanpa buka field file dan tanpa upload file', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah bab' }).click();
  await page.goto('https://esbeta.deanry.my.id/lesson');
  await page.locator('#class-section-id').selectOption('14');
  await page.locator('#subject-id').selectOption('189');
  await page.getByRole('textbox', { name: 'Nama Pelajaran' }).fill('Kebugaran Jasmani');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).fill('Kebugaran jasmani adalah kemampuan tubuh untuk melakukan aktivitas sehari-hari tanpa merasa lelah');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Edit Bab', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.locator('.row').first().click();
  await page.getByRole('row', { name: '2 Kebugaran Jasmani apa itu' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByRole('textbox', { name: 'Nama Pelajaran' }).fill('Kebugaran Jasmani');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Hapus bab', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
   await page.getByRole('row', { name: '1 silat teknik dasar silat XI' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Hapus' }).click();
  await page.getByRole('button', { name: 'Ya, hapus' }).click();
});

//ERROR TEST CASE
test('tambah bab - submit form kosong', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah bab' }).click();
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('tambah bab - dengan format file tidak didukung(M4a)', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah bab' }).click();
  await page.locator('#class-section-id').selectOption('25');
  await page.locator('#subject-id').selectOption('131');
  await page.getByRole('textbox', { name: 'Nama Pelajaran' }).fill('Senam');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).fill('Contoh senam aerobik');
  await page.locator('#file_type').selectOption('video_upload');
  await page.getByRole('textbox', { name: 'Nama File' }).fill('Senam');
  await page.locator('input[name="file_data\\[0\\]\\[thumbnail\\]"]').click();
  await page.locator('input[name="file_data\\[0\\]\\[thumbnail\\]"]').setInputFiles('senam.jpeg');
  await page.locator('input[name="file_data\\[0\\]\\[file\\]"]').click();
  await page.locator('input[name="file_data\\[0\\]\\[file\\]"]').setInputFiles('videoplayback.m4a');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('tambah bab - dengan format file tidak didukung (.exe)', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah bab' }).click();
  await page.locator('#class-section-id').selectOption('13');
  await page.locator('#subject-id').selectOption('189');
  await page.getByRole('textbox', { name: 'Nama Pelajaran' }).fill('Praktek bola basket');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).fill('buat video praktek main basket');
  await page.getByRole('button', { name: ' Tambah File' }).click();
  await page.locator('#file_type').selectOption('file_upload');
  await page.getByRole('textbox', { name: 'Nama File' }).fill('App-rekam');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('ScreenRec_webinstall_all.exe');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('tambah bab - hanya isi fied kelas', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah bab' }).click();
  await page.locator('#class-section-id').selectOption('12');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('tambah bab - hanya isi kelas dan mata pelajaran', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah bab' }).click();
  await page.locator('#class-section-id').selectOption('12');
  await page.locator('#subject-id').selectOption('189');
  await page.getByRole('button', { name: 'Simpan' }).click()
});

test('tambah bab - hanya isi kelas, mata pelajaran, dan nama pelajaran', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah bab' }).click();
  await page.locator('#class-section-id').selectOption('12');
  await page.locator('#subject-id').selectOption('189');
  await page.getByPlaceholder('Nama Pelajaran').fill('Permainan Bola Tangan');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('tambah bab - tanpa file', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah bab' }).click();
  await page.locator('#class-section-id').selectOption('12');
  await page.locator('#subject-id').selectOption('189');
  await page.getByPlaceholder('Nama Pelajaran').fill('Permainan Bola Tangan');
  await page.getByPlaceholder('Deskripsi Pelajaran').fill('Permainan bola basket');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('tambah bab - kosongi field kelas', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah bab' }).click();
  await page.locator('#subject-id').selectOption('189');
  await page.getByPlaceholder('Nama Pelajaran').fill('Permainan bola tangan');
  await page.getByPlaceholder('Deskripsi Pelajaran').fill('Permainan bola voli');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('tombol reset di modal tambah bab', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah bab' }).click();
  await page.locator('#class-section-id').selectOption('13');
  await page.locator('#subject-id').selectOption('189');
  await page.getByPlaceholder('Nama Pelajaran').fill('Permainan bola tangan');
  await page.getByPlaceholder('Deskripsi Pelajaran').click();
  await page.getByPlaceholder('Deskripsi Pelajaran').press('CapsLock');
  await page.getByPlaceholder('Deskripsi Pelajaran').fill('P');
  await page.getByPlaceholder('Deskripsi Pelajaran').press('CapsLock');
  await page.getByPlaceholder('Deskripsi Pelajaran').fill('Permainan bola voli');
  await page.getByRole('button', { name: 'Atur' }).click();
});

test('Tambah Bab - Ukuran file melebihi batas maks', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah bab' }).click();
 await page.locator('#class-section-id').selectOption('13');
  await page.locator('#subject-id').selectOption('189');
  await page.getByPlaceholder('Nama Pelajaran').fill('Permainan Bola Tangan');
  await page.getByPlaceholder('Deskripsi Pelajaran').fill('Permainan Bola basket');
  await page.getByRole('button', { name: ' Tambah File' }).click();
  await page.locator('#file_type').selectOption('file_upload');
  await page.getByRole('textbox', { name: 'Nama File' }).fill('Basket');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.locator('#file_type').selectOption('video_upload');
  await page.locator('input[name="file_data\\[0\\]\\[thumbnail\\]"]').click();
  await page.locator('input[name="file_data\\[0\\]\\[thumbnail\\]"]').setInputFiles('—Pngtree—basketball player throws the ball_15451499.png');
  await page.locator('input[name="file_data\\[0\\]\\[file\\]"]').click();
  await page.locator('input[name="file_data\\[0\\]\\[file\\]"]').setInputFiles('Teknik Dasar Basket, Peraturan Permainan, dan Peran Pemain Basket __ MATERI.mp4');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Filter, Pagination, dan search ', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();

  // Filter kelas
  await page.locator('#filter-class-section-id').selectOption('25');
  await page.locator('#filter-class-section-id').selectOption('12');

  // Filter mata pelajaran
  await page.locator('#filter-subject-id').selectOption('189');

  // Menampilkan semua
  await page.locator('#filter-class-section-id').selectOption('');

  // Search
  await page.getByRole('searchbox', { name: 'Search' }).fill('bola');
  await page.getByRole('searchbox', { name: 'Search' }).fill('');

  //Pagination & sort by
  await page.getByRole('link', { name: '5' }).click();
  await page.getByRole('button', { name: '5' }).click();
  await page.getByRole('link', { name: '10' }).click();
  await page.getByRole('button', { name: '10' }).click();
  await page.goto('https://esbeta.deanry.my.id/lesson');
  await page.getByRole('link', { name: 'next page' }).click();
  await page.getByRole('link', { name: 'to page 1' }).click();

  // auto refresh
  await page.getByRole('button', { name: 'Refresh' }).click();

  // Order by column
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.locator('label').filter({ hasText: 'Kelas' }).nth(2).click();
  await page.getByRole('heading', { name: 'Daftar bab' }).click();
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.locator('label').filter({ hasText: 'Kelas' }).nth(2).click();

  // Eksport file
  await page.getByRole('button', { name: 'Export' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'CSV' }).click();
  const download = await downloadPromise;
});
});