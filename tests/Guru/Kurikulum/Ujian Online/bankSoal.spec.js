import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Tes Kurikulum - Ujian Online", () => {
// Gunakan sesi login guru yang sudah disimpan
test.use({ storageState: 'guruState.json' });

test('test - bank soal', async ({ page }) => {
  await page.getByRole('button', { name: 'Lanjutkan ke Dashboard' }).click();
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();

  // Halaman utama bank soal
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  
  // Search
  await page.getByRole('searchbox', { name: 'Search' }).fill('Mulok');
  await page.getByRole('searchbox', { name: 'Search' }).fill('');
  await page.getByText('MULOK PJOK - Teori').dblclick();

  //Tambah sub bank soal
  await page.getByRole('textbox', { name: 'Tambah Bank Soal' }).fill('Bank soal 7');
  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.goto('http://esbeta.deanry.my.id/bank-soal/41');
  await page.getByText('Bank soal 7').click();

  // Edit nama sub bank soal
  await page.locator('#bankNameText').fill('Bank soal 8');
  await page.getByRole('button', { name: 'Simpan' }).click();

  // Hapus sub bank soal
  await page.getByRole('button', { name: 'Hapus' }).click();
  await page.getByRole('button', { name: 'Ya, hapus' }).click();

  // Tambah sub bank soal - dg form Kosong
  await page.getByRole('button', { name: 'Simpan' }).click();

  //Search sub bank soal
  await page.getByRole('searchbox', { name: 'Search' }).fill('Pilgan');
  await page.getByRole('searchbox', { name: 'Search' }).fill('');
});

test('Tambah soal esai', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();
  await page.getByRole('textbox', { name: 'Nama Soal * Poin Bawaan *' }).fill('Jelaskan pentingnya kerja sama tim dalam permainan sepak bola dan dampaknya terhadap hasil pertandingan!');
  await page.getByLabel('Tipe Soal *').selectOption('essay');
  await page.locator('iframe[title="Editor\\, question"]').contentFrame().getByRole('paragraph').fill('Jelaskan pentingnya kerja sama tim dalam permainan sepak bola dan dampaknya terhadap hasil pertandingan!');
  await page.locator('textarea[name="options\\[0\\]\\[text\\]"]').fill('Kerja sama tim penting karena sepak bola adalah permainan beregu. Tanpa koordinasi dan komunikasi, strategi sulit dijalankan dan bisa menyebabkan kekalahan. Dengan kerja sama, serangan dan pertahanan lebih efektif, peluang menang lebih besar.');
  await page.locator('input[name="options\\[0\\]\\[percentage\\]"]').fill('100');
  await page.locator('textarea[name="options\\[0\\]\\[feedback\\]"]').fill('Benar');
  await page.getByRole('button', { name: 'Hapus' }).nth(1).click();
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
});

test('Tambah soal pilgan', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();
  await page.getByRole('textbox', { name: 'Nama Soal * Poin Bawaan *' }).fill(' Berikut ini adalah cabang olahraga yang dilakukan secara beregu, kecuali...');
  await page.getByLabel('Tipe Pilihan*').selectOption('alphabet_lowercase');
  await page.locator('iframe[title="Editor\\, question"]').contentFrame().locator('html').fill('Berikut ini adalah cabang olahraga yang dilakukan secara beregu, kecuali...');
  await page.locator('iframe[title="Editor\\, options\\[0\\]\\[text\\]"]').contentFrame().getByRole('textbox', { name: 'Editor, options[0][text]' }).fill('Sepak bola');
  await page.locator('input[name="options\\[0\\]\\[percentage\\]"]').fill('0');
  await page.locator('textarea[name="options\\[0\\]\\[feedback\\]"]').fill('Salah');
  await page.locator('iframe[title="Editor\\, options\\[1\\]\\[text\\]"]').contentFrame().getByRole('textbox', { name: 'Editor, options[1][text]' }).fill('Tenis meja');
  await page.locator('input[name="options\\[1\\]\\[percentage\\]"]').fill('0');
  await page.getByRole('button', { name: 'Hapus' }).first().click(); // coba hapus opsi
  await page.locator('textarea[name="options\\[1\\]\\[feedback\\]"]').fill('Salah');
  await page.getByRole('button', { name: 'Tambah' }).click(); // tambah opsi
  await page.locator('iframe[title="Editor\\, options\\[2\\]\\[text\\]"]').contentFrame().getByRole('textbox', { name: 'Editor, options[2][text]' }).fill('Lompat tinggi');
  await page.locator('input[name="options\\[2\\]\\[percentage\\]"]').fill('100');
  await page.locator('textarea[name="options\\[2\\]\\[feedback\\]"]').fill('Benar');
  await page.locator('iframe[title="Editor\\, options\\[3\\]\\[text\\]"]').contentFrame().getByRole('textbox', { name: 'Editor, options[3][text]' }).fill('Voli');
  await page.locator('input[name="options\\[3\\]\\[percentage\\]"]').fill('0');
  await page.locator('textarea[name="options\\[3\\]\\[feedback\\]"]').fill('Salah');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();

});

test('Tambah soal jawaban singkat', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();
  await page.getByLabel('Tipe Soal *').selectOption('short_answer');
  await page.getByRole('textbox', { name: 'Nama Soal * Poin Bawaan *' }).fill('Apa nama gerakan pemanasan yang dilakukan dengan cara mengayunkan tangan atau kaki?');
  await page.locator('iframe[title="Editor\\, question"]').contentFrame().getByRole('paragraph').fill('Apa nama gerakan pemanasan yang dilakukan dengan cara mengayunkan tangan atau kaki?');
  await page.locator('textarea[name="options\\[0\\]\\[text\\]"]').fill('Pemanasan dinamis');
  await page.locator('input[name="options\\[0\\]\\[percentage\\]"]').fill('100');
  await page.getByRole('button', { name: 'Hapus' }).nth(1).click();
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
});

test('Tambah soal benar salah - dg file foto', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();
  await page.getByLabel('Tipe Soal *').selectOption('true_false');
  await page.getByRole('textbox', { name: 'Nama Soal * Poin Bawaan *' }).fill('Sit-up adalah latihan kebugaran yang bertujuan untuk melatih otot perut.');
  await page.locator('iframe[title="Editor\\, question"]').contentFrame().locator('html').fill('Sit-up adalah latihan kebugaran yang bertujuan untuk melatih otot perut.');
  await page.getByRole('button', { name: 'Unggah' }).click();
  await page.getByRole('button', { name: 'Unggah' }).setInputFiles('sit up.png');
  await page.locator('input[name="options\\[0\\]\\[percentage\\]"]').fill('100');
  await page.locator('textarea[name="options\\[0\\]\\[feedback\\]"]').fill('Benar');
  await page.locator('input[name="options\\[1\\]\\[percentage\\]"]').fill('0');
  await page.locator('textarea[name="options\\[1\\]\\[feedback\\]"]').fill('Salah');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
});
 
 test('Tambah soal numerik', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();
  await page.getByRole('textbox', { name: 'Nama Soal * Poin Bawaan *' }).fill('Berapa jumlah pemain dalam satu tim bola voli?');
  await page.getByLabel('Tipe Soal *').selectOption('numeric');
  await page.locator('iframe[title="Editor\\, question"]').contentFrame().getByRole('html').fill('Berapa jumlah pemain dalam satu tim bola voli?');
  await page.locator('textarea[name="options\\[0\\]\\[text\\]"]').fill('6');
  await page.locator('input[name="options\\[0\\]\\[percentage\\]"]').fill('100');
  await page.locator('textarea[name="options\\[0\\]\\[feedback\\]"]').fill('Benar');
  await page.getByRole('button', { name: 'Hapus' }).nth(1).click();
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
});

  //ERROR TEST CASE

test('Tambah soal - form kosong', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
});

//Tambah soal pilgan
test('Tambah soal - hanya isi nama soal', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();
  await page.getByRole('textbox', { name: 'Nama Soal * Poin Bawaan *' }).fill('Berikut ini adalah bentuk latihan daya tahan otot, kecuali...');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
});

test('Tambah soal - hanya isi nama dan tipe soal', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();
  await page.getByRole('textbox', { name: 'Nama Soal * Poin Bawaan *' }).fill('Berikut ini adalah bentuk latihan daya tahan otot, kecuali...');
  await page.getByLabel('Tipe Soal *').selectOption('multiple_choice');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
});

test('Tambah soal - hanya isi nama, tipe soal, dan tipe pilihan', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();
  await page.getByRole('textbox', { name: 'Nama Soal * Poin Bawaan *' }).fill('Berikut ini adalah bentuk latihan daya tahan otot, kecuali...');
  await page.getByLabel('Tipe Soal *').selectOption('multiple_choice');
  await page.getByLabel('Tipe Pilihan*').selectOption('alphabet_lowercase');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
});

test('Tambah soal - hanya isi nama, tipe soal, tipe pilihan, dan poin bawaan', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();
  await page.getByRole('textbox', { name: 'Nama Soal * Poin Bawaan *' }).fill('Berikut ini adalah bentuk latihan daya tahan otot, kecuali...');
  await page.getByLabel('Tipe Soal *').selectOption('multiple_choice');
  await page.getByLabel('Tipe Pilihan*').selectOption('alphabet_lowercase');
  await page.locator('input[name="default_point"]').fill('100');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
});

test('Tambah soal - hanya isi nama, tipe soal, tipe ilihan, poin bawaan, dan teks soal', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();
  await page.getByRole('textbox', { name: 'Nama Soal * Poin Bawaan *' }).fill('Berikut ini adalah bentuk latihan daya tahan otot, kecuali...');
  await page.getByLabel('Tipe Soal *').selectOption('multiple_choice');
  await page.getByLabel('Tipe Pilihan*').selectOption('alphabet_lowercase');
  await page.locator('input[name="default_point"]').fill('100');
  await page.locator('iframe[title="Editor\\, question"]').contentFrame().locator('html').fill('Berikut ini adalah bentuk latihan daya tahan otot, kecuali...');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
});

test('Tambah soal - hanya isi nama, tipe soal, tipe ilihan, poin bawaan, teks soal, dan opsi', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();
  await page.getByRole('textbox', { name: 'Nama Soal * Poin Bawaan *' }).fill('Berikut ini adalah bentuk latihan daya tahan otot, kecuali...');
  await page.getByLabel('Tipe Soal *').selectOption('multiple_choice');
  await page.getByLabel('Tipe Pilihan*').selectOption('alphabet_lowercase');
  await page.locator('input[name="default_point"]').fill('100');
  await page.locator('iframe[title="Editor\\, question"]').contentFrame().locator('html').fill('Berikut ini adalah bentuk latihan daya tahan otot, kecuali...');
  await page.locator('iframe[title="Editor\\, options\\[0\\]\\[text\\]"]').contentFrame().getByRole('textbox', { name: 'Editor, options[0][text]' }).fill('Jalan sehat');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
});

test('Tambah soal - hanya isi nama, tipe soal, tipe ilihan, poin bawaan, teks soal, opsi, dan nilai opsi', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();
  await page.getByRole('textbox', { name: 'Nama Soal * Poin Bawaan *' }).fill('Berikut ini adalah bentuk latihan daya tahan otot, kecuali...');
  await page.getByLabel('Tipe Soal *').selectOption('multiple_choice');
  await page.getByLabel('Tipe Pilihan*').selectOption('alphabet_lowercase');
  await page.locator('input[name="default_point"]').fill('100');
  await page.locator('iframe[title="Editor\\, question"]').contentFrame().locator('html').fill('Berikut ini adalah bentuk latihan daya tahan otot, kecuali...');
  await page.locator('iframe[title="Editor\\, options\\[0\\]\\[text\\]"]').contentFrame().getByRole('textbox', { name: 'Editor, options[0][text]' }).fill('Jalan sehat');
  await page.locator('input[name="options\\[0\\]\\[percentage\\]"]').fill('0');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
});

test('Tambah soal - hanya isi nama, tipe soal, tipe ilihan, poin bawaan, teks soal, opsi, nilai opsi, dan feedback', async ({ page }) => {
  //Tanpa isi opsi jawaban kedua
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();
  await page.getByRole('textbox', { name: 'Nama Soal * Poin Bawaan *' }).fill('Berikut ini adalah bentuk latihan daya tahan otot, kecuali...');
  await page.getByLabel('Tipe Soal *').selectOption('multiple_choice');
  await page.getByLabel('Tipe Pilihan*').selectOption('alphabet_lowercase');
  await page.locator('input[name="default_point"]').fill('100');
  await page.locator('iframe[title="Editor\\, question"]').contentFrame().locator('html').fill('Berikut ini adalah bentuk latihan daya tahan otot, kecuali...');
  await page.locator('iframe[title="Editor\\, options\\[0\\]\\[text\\]"]').contentFrame().getByRole('textbox', { name: 'Editor, options[0][text]' }).fill('Jalan sehat');
  await page.locator('input[name="options\\[0\\]\\[percentage\\]"]').fill('0');
  await page.locator('textarea[name="options\\[0\\]\\[feedback\\]"]').fill('Salah');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();

  //Opsi benar
  await page.locator('iframe[title="Editor\\, options\\[1\\]\\[text\\]"]').contentFrame().getByRole('textbox', { name: 'Editor, options[1][text]' }).fill('Jalan santai');
  await page.locator('input[name="options\\[1\\]\\[percentage\\]"]').fill('100');
  await page.locator('textarea[name="options\\[1\\]\\[feedback\\]"]').fill('Benar');

  //tambah opsi
  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.locator('iframe[title="Editor\\, options\\[2\\]\\[text\\]"]').contentFrame().getByRole('textbox', { name: 'Editor, options[2][text]' }).fill('Plank');
  await page.locator('input[name="options\\[2\\]\\[percentage\\]"]').fill('0');
  await page.locator('textarea[name="options\\[2\\]\\[feedback\\]"]').fill('Salah');

  await page.getByRole('button', { name: 'Tambah' }).click();
  await page.locator('iframe[title="Editor\\, options\\[2\\]\\[text\\]"]').contentFrame().getByRole('textbox', { name: 'Editor, options[3][text]' }).fill('Push up');
  await page.locator('input[name="options\\[2\\]\\[percentage\\]"]').fill('0');
  await page.locator('textarea[name="options\\[2\\]\\[feedback\\]"]').fill('Salah');
});
  
test('Tes validasi - Tambah soal esai', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();

  await page.getByLabel('Tipe Soal *').selectOption('essay');
  await page.getByRole('textbox', { name: 'Nama Soal * Poin Bawaan *' }).fill('Jelaskan manfaat olahraga secara teratur terhadap kesehatan mental dan fisik!');

  // Tanpa jawaban
  await page.locator('iframe[title="Editor\\, question"]').contentFrame().locator('html').fill('Jelaskan manfaat olahraga secara teratur terhadap kesehatan mental dan fisik!');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
  await page.locator('textarea[name="options\\[0\\]\\[text\\]"]').fill('Olahraga teratur dapat meningkatkan kebugaran jasmani, memperkuat otot dan jantung, serta membantu mengurangi stres dan kecemasan. Selain itu, olahraga meningkatkan hormon endorfin yang membuat suasana hati lebih baik.');
  await page.locator('input[name="options\\[0\\]\\[percentage\\]"]').fill('100');
  await page.locator('textarea[name="options\\[0\\]\\[feedback\\]"]').fill('Benar');
  await page.getByRole('button', { name: 'Hapus' }).nth(1).click();

  //coba tanpa umpan balik
  await page.getByRole('textbox', { name: 'Umpan Balik' }).fill('');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
  //isi umpan balik kembali
  await page.getByRole('textbox', { name: 'Umpan Balik' }).press('ControlOrMeta+z');
  
  //tanpa nilai
  await page.getByPlaceholder('Persentase Nilai').fill('');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
  //ngembalikan nilai
  await page.getByPlaceholder('Persentase Nilai').press('ControlOrMeta+z');
});

test('Tes validasi - Tambah soal jawaban singkat', async ({ page }) => {
 await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();

  await page.getByLabel('Tipe Soal *').selectOption('short_answer');
  await page.getByRole('textbox', { name: 'Nama Soal * Poin Bawaan *' }).fill('Jelaskan manfaat olahraga secara teratur terhadap kesehatan mental dan fisik!');

  // Tanpa jawaban
  await page.locator('iframe[title="Editor\\, question"]').contentFrame().locator('html').fill('Jelaskan manfaat olahraga secara teratur terhadap kesehatan mental dan fisik!');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
  await page.locator('textarea[name="options\\[0\\]\\[text\\]"]').fill('Olahraga teratur dapat meningkatkan kebugaran jasmani, memperkuat otot dan jantung, serta membantu mengurangi stres dan kecemasan. Selain itu, olahraga meningkatkan hormon endorfin yang membuat suasana hati lebih baik.');
  await page.locator('input[name="options\\[0\\]\\[percentage\\]"]').fill('100');
  await page.locator('textarea[name="options\\[0\\]\\[feedback\\]"]').fill('Benar');
  await page.getByRole('button', { name: 'Hapus' }).nth(1).click();
});

test('Tes validasi - Tambah soal benar/salah', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();

  await page.getByLabel('Tipe Soal *').selectOption('true_false');
  await page.getByRole('textbox', { name: 'Nama Soal * Poin Bawaan *' }).fill('Jelaskan manfaat olahraga secara teratur terhadap kesehatan mental dan fisik!');

  // Tanpa jawaban
  await page.locator('iframe[title="Editor\\, question"]').contentFrame().locator('html').fill('Jelaskan manfaat olahraga secara teratur terhadap kesehatan mental dan fisik!');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
  await page.locator('input[name="options\\[0\\]\\[percentage\\]"]').fill('');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
  await page.locator('input[name="options\\[0\\]\\[percentage\\]"]').fill('100');
  await page.locator('textarea[name="options\\[0\\]\\[feedback\\]"]').fill('');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
  await page.locator('textarea[name="options\\[0\\]\\[feedback\\]"]').fill('Benar');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
});

test('Tes validasi - Tambah soal numerik', async ({ page }) => {
  await page.goto('http://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('link', { name: 'Tambah Soal' }).click();

  await page.getByLabel('Tipe Soal *').selectOption('numeric');
  await page.getByRole('textbox', { name: 'Nama Soal * Poin Bawaan *' }).fill('Berapa ukuran panjang lapangan bulu tangkis untuk tunggal putra dalam satuan meter?');

  // Tanpa jawaban
  await page.locator('iframe[title="Editor\\, question"]').contentFrame().locator('html').fill('Berapa ukuran panjang lapangan bulu tangkis untuk tunggal putra dalam satuan meter?');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
  await page.locator('textarea[name="options\\[0\\]\\[text\\]"]').fill('13.4');
  await page.locator('input[name="options\\[0\\]\\[percentage\\]"]').fill('100');
  await page.locator('textarea[name="options\\[0\\]\\[feedback\\]"]').fill('Benar');
  await page.getByRole('button', { name: 'Hapus' }).nth(1).click();
});

test('Pagination, auto refresh, dan order by column ', async ({ page }) => {
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.locator('label').filter({ hasText: 'Versi' }).click();
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.locator('label').filter({ hasText: 'Versi' }).click();
  await page.getByRole('button', { name: '10' }).click();
  await page.getByRole('link', { name: '20' }).click();
  await page.getByRole('button', { name: '20' }).click();
  await page.getByRole('link', { name: '5' }).click();
  await page.getByRole('link', { name: 'next page' }).click();
  await page.getByRole('link', { name: 'to page 3' }).click();
  await page.getByRole('link', { name: 'previous page' }).click();
});

test('Edit soal', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/online-exam-question');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('row', { name: 'v1 Benar Salah Pendinginan' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByRole('button', { name: 'Unggah' }).click();
  await page.getByRole('button', { name: 'Unggah' }).setInputFiles('pndinginan.jpeg');
  await page.getByRole('button', { name: 'Simpan Soal' }).click();
});

test('Pratinjau soal', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/online-exam-question');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  //PRATINJAU
  await page.getByRole('link', { name: 'SOAL ESAI' }).click();
  await page.getByRole('row', { name: 'v1 Esai Sebutkan teknik dasar' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Pratinjau' }).click();
  await page.getByRole('button', { name: 'Close' }).click();

  await page.getByRole('row', { name: 'v1 Pilihan Ganda Berikut ini' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Pratinjau' }).click();
  await page.getByRole('button', { name: 'Lihat Jawaban' }).click();
  await page.getByRole('button', { name: 'Reset' }).click();
  await page.getByRole('button', { name: 'Selesai' }).click();
  await page.getByRole('button', { name: 'Close' }).click();

  await page.getByRole('row', { name: 'v1 Esai Jelaskan pentingnya' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Pratinjau' }).click();
  await page.getByRole('button', { name: 'Lihat Jawaban' }).click();
  await page.getByRole('button', { name: 'Reset' }).click();
  await page.getByRole('button', { name: 'Close' }).click();

  await page.getByRole('row', { name: 'v1 Numerik Berapa ukuran' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Pratinjau' }).click();
  await page.getByRole('button', { name: 'Lihat Jawaban' }).click();
  await page.getByRole('button', { name: 'Reset' }).click();
  await page.getByRole('button', { name: 'Selesai' }).click();
  await page.getByRole('dialog', { name: 'Pratinjau Bank Soal' }).click();
  await page.getByRole('button', { name: 'Close' }).click();

  await page.getByRole('row', { name: 'v2 Benar Salah Jelaskan' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Pratinjau' }).click();
  await page.getByRole('button', { name: 'Lihat Jawaban' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
});
  
test('Hapus soal', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/online-exam-question');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Bank Soal' }).click();
  await page.getByText('MULOK PJOK - Teori').click();
  await page.getByText('SOAL ESAI').click();
  await page.getByRole('row', { name: 'v2 Benar Salah Pendinginan -' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Hapus' }).click();
  await page.getByRole('button', { name: 'Ya' }).click();
});
});