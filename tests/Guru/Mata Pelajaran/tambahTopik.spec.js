import { test, expect } from '@playwright/test';
test.describe.configure({ mode: 'serial' }); 
test.describe('CRUDS Topik', () => {
test('Tes mata pelajaran - tambah topik', async ({ page }) => {

  // Gunakan sesi login guru yang sudah disimpan
  test.use({ storageState: 'guruState.json' });

  test('Tambah topik dengan file foto', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah Topik' }).click();
  await page.locator('#class-section-id').selectOption('35');
  await page.locator('#subject-id').selectOption('141');
  await page.locator('#topic-lesson-id').selectOption('22');
  await page.getByRole('textbox', { name: 'Nama Topik' }).fill('Passing');
  await page.getByRole('textbox', { name: 'Deskripsi Topik' }).fill('Cara passing dan macamnya');
  await page.getByRole('button', { name: ' Tambah File' }).click();
  await page.locator('#file_type').selectOption('file_upload');
  await page.getByRole('textbox', { name: 'Nama File' }).fill('Passing');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('passing.jpeg');
  await page.getByRole('button', { name: 'Simpan' }).click();
  });

 test('Edit Topik', async ({ page }) => {
   await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
  await page.getByRole('link', { name: 'Tambah Topik' }).click();
  await page.getByRole('row', { name: '1 Passing Baca selengkapnya' }).getByRole('link').nth(1).click();
  await page.getByRole('textbox', { name: 'Nama Pelajaran' }).fill('Passing Atas');
  await page.getByRole('textbox', { name: 'Deskripsi Pelajaran' }).fill('Tutorial passing atas dalam permainan bola voli');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Pratinjau Berkas' }).click();
  const page1 = await page1Promise;
  await page1.locator('body').click();
  await page.getByRole('textbox', { name: 'Nama File' }).fill('Passing Atas');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('passing atas.jpeg');
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Pratinjau Berkas' }).click();
  const page2 = await page2Promise;
  await page.getByRole('button', { name: 'Simpan' }).click();
 });

  test('Tambah topik dengan file pdf', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
    await page.getByRole('link', { name: 'Tambah Topik' }).click();
    await page.locator('#class-section-id').selectOption('13');
    await page.locator('#subject-id').selectOption('189');
    await page.locator('#topic-lesson-id').selectOption('50');
    await page.getByRole('textbox', { name: 'Nama Topik' }).fill('Permainan bola kasti');
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).fill('Pengertian dan teknik awal bermain kasti');
    await page.getByRole('button', { name: ' Tambah File' }).click();
    await page.locator('#file_type').selectOption('file_upload');
    await page.getByRole('textbox', { name: 'Nama File' }).fill('Kasti');
    await page.getByRole('button', { name: 'Choose File' }).click();
    await page.getByRole('button', { name: 'Choose File' }).setInputFiles('Pengertian Permainan Kasti.pdf');
    await page.getByRole('button', { name: 'Simpan' }).click();
  }); 

  test('Tambah topik dengan file video', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
    await page.getByRole('link', { name: 'Tambah Topik' }).click();
    await page.locator('#class-section-id').selectOption('35');
    await page.locator('#subject-id').selectOption('141');
    await page.locator('#topic-lesson-id').selectOption('54');
    await page.getByRole('textbox', { name: 'Nama Topik' }).click();
    await page.getByRole('textbox', { name: 'Nama Topik' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nama Topik' }).fill('P');
    await page.getByRole('textbox', { name: 'Nama Topik' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nama Topik' }).fill('Permainan bola voli');
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).click();
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).fill('P');
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).fill('Penjelasan teknik passing atas dan passing bawah');
    await page.getByRole('button', { name: ' Tambah File' }).click();
    await page.locator('#file_type').selectOption('video_upload');
    await page.getByRole('textbox', { name: 'Nama File' }).click();
    await page.getByRole('textbox', { name: 'Nama File' }).fill('teknik passing voli');
    await page.locator('input[name="file_data\\[0\\]\\[thumbnail\\]"]').click();
    await page.locator('input[name="file_data\\[0\\]\\[thumbnail\\]"]').setInputFiles('passing.jpeg');
    await page.locator('input[name="file_data\\[0\\]\\[file\\]"]').click();
    await page.locator('input[name="file_data\\[0\\]\\[file\\]"]').setInputFiles('Passing bawah, passing atas, & smash pada Permainan Bola Voli - Razaf Zulfikry.mp4');
    await page.getByRole('button', { name: 'Simpan' }).click();
  });
  
  test('Tambah topik dengan link youtube', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
    await page.getByRole('link', { name: 'Tambah Topik' }).click();
    await page.locator('#class-section-id').selectOption('25');
    await page.locator('#subject-id').selectOption('131');
    await page.locator('#topic-lesson-id').selectOption('53');
    await page.getByRole('textbox', { name: 'Nama Topik' }).fill('Permainan bola voli');
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).fill('Teknik passing atas dan bawah');
    await page.getByRole('button', { name: ' Tambah File' }).click();
    await page.locator('#file_type').selectOption('youtube_link');
    await page.getByRole('textbox', { name: 'Nama File' }).fill('Teknik passing');
    await page.getByRole('button', { name: 'Choose File' }).click();
    await page.getByRole('button', { name: 'Choose File' }).setInputFiles('passing.jpeg');
    await page.getByRole('textbox', { name: 'Link' }).click();
    await page.getByRole('textbox', { name: 'Link' }).fill('https://youtu.be/V8sDptPxdV0?si=3L6euO0t3_vUd5Kx');
    await page.getByRole('button', { name: 'Simpan' }).click();
  });

  test('Hapus Topik', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
    await page.getByRole('link', { name: 'Tambah Topik' }).click();
    await page.getByRole('row', { name: '5 oke Baca selengkapnya oke' }).getByRole('link').nth(2).click();
    await page.getByRole('button', { name: 'Ya, hapus' }).click();
  });
  
  //ERROR TEST CASE

  test('Submit form kosong', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
    await page.getByRole('link', { name: 'Tambah Topik' }).click();
    await page.getByRole('button', { name: 'Simpan' }).click();
  });

  test('Hanya isi field kelas', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
    await page.getByRole('link', { name: 'Tambah Topik' }).click();
    await page.locator('#class-section-id').selectOption('12');
    await page.getByRole('button', { name: 'Simpan' }).click();
  });

  test('Hanya isi kelas & mapel', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
    await page.getByRole('link', { name: 'Tambah Topik' }).click();
    await page.locator('#class-section-id').selectOption('12');
    await page.locator('#subject-id').selectOption('189');
    await page.getByRole('button', { name: 'Simpan' }).click();
  });

  test('Hanya isi kelas, mapel, dan pelajaran(Bab)', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
    await page.getByRole('link', { name: 'Tambah Topik' }).click();
    await page.locator('#class-section-id').selectOption('12');
    await page.locator('#subject-id').selectOption('189');
    await page.locator('#topic-lesson-id').selectOption('49');
    await page.getByRole('button', { name: 'Simpan' }).click();
  });

 test('Hanya isi kelas, mapel, pelajaran, dan nama topik', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
    await page.getByRole('link', { name: 'Tambah Topik' }).click();
    await page.locator('#class-section-id').selectOption('12');
    await page.locator('#subject-id').selectOption('189');
    await page.locator('#topic-lesson-id').selectOption('49');
    await page.getByPlaceholder('Nama Topik').fill('Permainan bola kasti');
    await page.getByRole('button', { name: 'Simpan' }).click();
 });

 test('isi semua field, tanpa buka field file dan tanpa upload file', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
    await page.getByRole('link', { name: 'Tambah Topik' }).click();
    await page.locator('#class-section-id').selectOption('12');
    await page.locator('#subject-id').selectOption('189');
    await page.locator('#topic-lesson-id').selectOption('49');
    await page.getByPlaceholder('Nama Topik').fill('Permainan bola kasti');
    await page.getByPlaceholder('Deskripsi Topik').fill('Penjelasan awal terkait permainan kasti');
    await page.getByRole('button', { name: 'Simpan' }).click();
 });

  test('isi semua field, buka field file tapi tanpa upload file', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
    await page.getByRole('link', { name: 'Tambah Topik' }).click();
    await page.locator('#class-section-id').selectOption('12');
    await page.locator('#subject-id').selectOption('189');
    await page.locator('#topic-lesson-id').selectOption('49');
    await page.getByPlaceholder('Nama Topik').fill('Permainan bola kasti');
    await page.getByPlaceholder('Deskripsi Topik').fill('Penjelasan awal terkait permainan kasti');
    await page.getByRole('button', { name: ' Tambah File' }).click();
    await page.locator('#file_type').selectOption('file_upload');
    await page.getByRole('button', { name: 'Simpan' }).click();
 });

  test('Tambah topik dengan file video melebihi batas maks', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
    await page.getByRole('link', { name: 'Tambah Topik' }).click();
    await page.locator('#class-section-id').selectOption('35');
    await page.locator('#subject-id').selectOption('141');
    await page.locator('#topic-lesson-id').selectOption('54');
    await page.getByRole('textbox', { name: 'Nama Topik' }).click();
    await page.getByRole('textbox', { name: 'Nama Topik' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nama Topik' }).fill('P');
    await page.getByRole('textbox', { name: 'Nama Topik' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nama Topik' }).fill('Permainan bola voli');
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).click();
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).fill('P');
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).fill('Penjelasan teknik passing atas dan passing bawah');
    await page.getByRole('button', { name: ' Tambah File' }).click();
    await page.locator('#file_type').selectOption('video_upload');
    await page.getByRole('textbox', { name: 'Nama File' }).click();
    await page.getByRole('textbox', { name: 'Nama File' }).fill('teknik passing voli');
    await page.locator('input[name="file_data\\[0\\]\\[thumbnail\\]"]').click();
    await page.locator('input[name="file_data\\[0\\]\\[thumbnail\\]"]').setInputFiles('passing.jpeg');
    await page.locator('input[name="file_data\\[0\\]\\[file\\]"]').click();
    await page.locator('input[name="file_data\\[0\\]\\[file\\]"]').setInputFiles('BOLA VOLI  _ PASSING BAWAH DAN ATAS _ MATERI PJOK.mp4');
    await page.getByRole('button', { name: 'Simpan' }).click();
  });

  test('Tambah topik - dengan format file yang tidak didukung', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
    await page.getByRole('link', { name: 'Tambah Topik' }).click();
    await page.locator('#class-section-id').selectOption('35');
    await page.locator('#subject-id').selectOption('141');
    await page.locator('#topic-lesson-id').selectOption('42');
    await page.getByRole('textbox', { name: 'Nama Topik' }).click();
    await page.getByRole('textbox', { name: 'Nama Topik' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nama Topik' }).fill('O');
    await page.getByRole('textbox', { name: 'Nama Topik' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nama Topik' }).fill('Olahraga pagi');
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).click();
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).fill('awali harimu dengan berolahraga');
    await page.getByRole('button', { name: ' Tambah File' }).click();
    await page.locator('#file_type').selectOption('file_upload');
    await page.getByRole('textbox', { name: 'Nama File' }).click();
    await page.getByRole('textbox', { name: 'Nama File' }).fill('teknik');
    await page.getByRole('button', { name: 'Choose File' }).click();
    await page.getByRole('button', { name: 'Choose File' }).setInputFiles('Passing bawah, passing atas, & smash pada Permainan Bola Voli - Razaf Zulfikry.mp3');
    await page.getByRole('button', { name: 'Simpan' }).click();
  });
  
  test('Reset form', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
    await page.getByRole('link', { name: 'Tambah Topik' }).click();
    await page.locator('#class-section-id').selectOption('35');
    await page.locator('#subject-id').selectOption('141');
    await page.locator('#topic-lesson-id').selectOption('42');
    await page.getByRole('textbox', { name: 'Nama Topik' }).click();
    await page.getByRole('textbox', { name: 'Nama Topik' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nama Topik' }).fill('O');
    await page.getByRole('textbox', { name: 'Nama Topik' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Nama Topik' }).fill('Olahraga pagi');
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).click();
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).fill('awali harimu dengan berolahraga');
    await page.getByRole('button', { name: ' Tambah File' }).click();
    await page.locator('#file_type').selectOption('file_upload');
    await page.getByRole('textbox', { name: 'Nama File' }).click();
    await page.getByRole('textbox', { name: 'Nama File' }).fill('teknik');
    await page.getByRole('button', { name: 'Choose File' }).click();
    await page.getByRole('button', { name: 'Choose File' }).setInputFiles('Passing bawah, passing atas, & smash pada Permainan Bola Voli - Razaf Zulfikry.mp3');
    await page.getByRole('button', { name: 'Atur' }).click();
  });

  test('Contoh data - untuk tes show', async ({ page }) => {
    //Tambah data dulu buat tau show ... of ... data (Angkanya menyesuaikan banyak data, misal datanya 11 maka opsi shownya bisa 5,10,20)
    await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
    await page.getByRole('link', { name: 'Tambah Topik' }).click();

    await page.locator('#class-section-id').selectOption('25');
    await page.locator('#subject-id').selectOption('131');
    await page.locator('#topic-lesson-id').selectOption('53');
    await page.getByRole('textbox', { name: 'Nama Topik' }).fill('Permainan rounders');
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).fill('pengertian awal terkait permainan rounders');
    await page.getByRole('button', { name: 'Simpan' }).click();
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('button', { name: 'Simpan' }).click();

    await page.locator('#class-section-id').selectOption('34');
    await page.locator('#subject-id').selectOption('141');
    await page.locator('#topic-lesson-id').selectOption('44');
    await page.getByRole('textbox', { name: 'Nama Topik' }).fill('Permainan rounders');
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).click();
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).fill('Pengertian awal terkait runders');
    await page.getByRole('button', { name: 'Simpan' }).click();

    await page.locator('#class-section-id').selectOption('15');
    await page.locator('#subject-id').selectOption('189');
    await page.locator('#class-section-id').selectOption('16');
    await page.locator('#create-form div').filter({ hasText: 'Kelas * Pilih Bagian Kelas XI' }).first().click();
    await page.locator('#subject-id').selectOption('189');
    await page.locator('#topic-lesson-id').selectOption('49');
    await page.getByRole('textbox', { name: 'Nama Topik' }).fill('Olahraga tolak peluru');
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).fill('Pengertian awall tolak peluru');
    await page.getByRole('button', { name: 'Simpan' }).click();

    await page.locator('#class-section-id').selectOption('13');
    await page.locator('#subject-id').selectOption('189');
    await page.locator('#topic-lesson-id').selectOption('50');
    await page.getByRole('textbox', { name: 'Nama Topik' }).fill('Olahraga tolak peluru');
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).fill('Pengertian dan teknik awal tolak peluru');
    await page.getByRole('button', { name: 'Simpan' }).click();

    await page.locator('#class-section-id').selectOption('35');
    await page.locator('#subject-id').selectOption('141');
    await page.locator('#topic-lesson-id').selectOption('46');
    await page.getByRole('textbox', { name: 'Nama Topik' }).fill('Teknik push up');
    await page.getByRole('textbox', { name: 'Deskripsi Topik' }).fill('Teknik push up dengan baik dan benar');
    await page.getByRole('button', { name: 'Simpan' }).click();
  });

  test('Tes filter kelas, mapel, search, auto refresh, order by column, eksport file, dan pagination', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/dashboard', { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: ' Mata Pelajaran ' }).click();
    await page.getByRole('link', { name: 'Tambah Topik' }).click();

    //Filter kelas
    await page.locator('#filter-class-section-id').selectOption('35');
    await page.locator('#filter-class-section-id').selectOption('');

    //Filter mapel
    await page.locator('#filter_lesson_id').selectOption('49');
    await page.locator('#filter_lesson_id').selectOption('');

    //Search
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('tolak peluru');
  await page.getByRole('searchbox', { name: 'Search' }).fill('');

  //auto refresh
  await page.getByRole('button', { name: 'Refresh' }).click();

  //order by column
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.locator('label').filter({ hasText: 'File' }).nth(2).click();
  await page.locator('#toolbar div').first().click();

  //Eksport TXT
  await page.getByRole('button', { name: 'Export' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'TXT' }).click();
  const download = await downloadPromise;


  // pagination dan shpw data
  await page.goto('https://esbeta.deanry.my.id/lesson-topic');
  await page.getByRole('button', { name: '10' }).click();
  await page.getByRole('link', { name: '5' }).click();
  await page.getByRole('link', { name: 'to page 2' }).click();
  await page.getByRole('link', { name: 'to page 3' }).click();
  await page.getByRole('link', { name: 'previous page' }).click();
  await page.getByRole('button', { name: '5' }).click();
  });

});
});