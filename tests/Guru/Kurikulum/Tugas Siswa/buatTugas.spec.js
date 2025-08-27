import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Tes mata pelajaran - tambah bab", () => {

// Gunakan sesi login guru yang sudah disimpan
test.use({ storageState: 'guruState.json' });

test('Tambah tugas  berhasil', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('35');
  await page.locator('#subject-id').selectOption('141');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas Merangkum');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Rangkumlah materi terkait sejara atletik, cabor apa saja yang termasuk atletik, dan jelaskan masing-masing pinnya');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('lari.jpg');
  await page.getByRole('textbox', { name: 'Tenggat Waktu * This field is' }).fill('2025-06-04T00:00');
  await page.getByRole('textbox', { name: 'Tgl Mulai *' }).fill('2025-05-30T08:00');
  await page.getByRole('textbox', { name: 'Tgl Selesai' }).fill('2025-06-06T00:00');
  await page.getByRole('spinbutton', { name: 'Poin *' }).fill('100');
  await page.getByRole('spinbutton', { name: 'Nilai Kelulusan *' }).fill('75');
  await page.locator('#max_file').selectOption('50');
  await page.getByRole('textbox', { name: 'Hari Tambahan untuk' }).fill('3');
  await page.getByRole('button', { name: 'docx' }).click();
  await page.getByRole('button', { name: 'pdf' }).click();
  await page.getByRole('button', { name: 'jpeg' }).click();
  await page.getByRole('button', { name: 'jpg' }).click();
  await page.getByRole('button', { name: 'png' }).click();
  await page.getByRole('button', { name: 'Simpan' }).click();
});

//ERROR TEST CASE

test('Tambah tugas - tanpa isi semua field', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Tambah tugas - hanya isi kelas', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Tambah tugas - hanya isi kelas dan mapel', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Tambah tugas - hanya isi kelas, mapel, dan nama tugas', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas Praktek Lari Estafet');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Tambah tugas - hanya isi kelas, mapel, nama, dan instruksi tugas', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas Praktek Lari Estafet');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Tugas ini dilakukan secara berkelompok, masinng-masing kelompok terdiri dari 4 orang. praktekan dan buat video upload youtube linknya kumpulkan');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Tambah tugas - hanya isi kelas, mapel, nama, instruksi, dan file tugas', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas Praktek Lari Estafet');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Tugas ini dilakukan secara berkelompok, masinng-masing kelompok terdiri dari 4 orang. praktekan dan buat video upload youtube linknya kumpulkan');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('lari.jpg');
  await page.getByRole('button', { name: 'Simpan' }).click();
});
 
test('Tambah tugas - hanya isi kelas, mapel, nama, instruksi, file, dan tenggat waktu tugas', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas Praktek Lari Estafet');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Tugas ini dilakukan secara berkelompok, masinng-masing kelompok terdiri dari 4 orang. praktekan dan buat video upload youtube linknya kumpulkan');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('lari.jpg');
  await page.getByRole('textbox', { name: 'Tenggat Waktu * This field is' }).fill('2025-06-03T00:00');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Tambah tugas - hanya isi kelas, mapel, nama, instruksi, file, tenggat waktu, dan tgl. mulai tugas', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas Praktek Lari Estafet');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Tugas ini dilakukan secara berkelompok, masinng-masing kelompok terdiri dari 4 orang. praktekan dan buat video upload youtube linknya kumpulkan');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('lari.jpg');
  await page.getByRole('textbox', { name: 'Tenggat Waktu * This field is' }).fill('2025-06-03T00:00');
  await page.getByRole('textbox', { name: 'Tgl Mulai *' }).fill('2025-05-29T08:00');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Tambah tugas - hanya isi kelas, mapel, nama, instruksi, file, tenggat waktu, tgl. mulai, dan tgl. selesai tugas', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas Praktek Lari Estafet');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Tugas ini dilakukan secara berkelompok, masinng-masing kelompok terdiri dari 4 orang. praktekan dan buat video upload youtube linknya kumpulkan');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('lari.jpg');
  await page.getByRole('textbox', { name: 'Tenggat Waktu * This field is' }).fill('2025-06-03T00:00');
  await page.getByRole('textbox', { name: 'Tgl Mulai *' }).fill('2025-05-29T08:00');
  await page.getByRole('textbox', { name: 'Tgl Selesai' }).fill('2025-06-05T00:00');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Tambah tugas - hanya isi kelas, mapel, nama, instruksi, file, tenggat waktu, tgl. mulai, tgl. selesai dan poin tugas', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas Praktek Lari Estafet');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Tugas ini dilakukan secara berkelompok, masinng-masing kelompok terdiri dari 4 orang. praktekan dan buat video upload youtube linknya kumpulkan');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('lari.jpg');
  await page.getByRole('textbox', { name: 'Tenggat Waktu * This field is' }).fill('2025-06-03T00:00');
  await page.getByRole('textbox', { name: 'Tgl Mulai *' }).fill('2025-05-29T08:00');
  await page.getByRole('textbox', { name: 'Tgl Selesai' }).fill('2025-06-05T00:00');
  await page.getByRole('spinbutton', { name: 'Poin *' }).fill('100');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Tambah tugas - hanya isi kelas, mapel, nama, instruksi, file, tenggat waktu, tgl. mulai, tgl. selesai poin, dan kkm tugas', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas Praktek Lari Estafet');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Tugas ini dilakukan secara berkelompok, masinng-masing kelompok terdiri dari 4 orang. praktekan dan buat video upload youtube linknya kumpulkan');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('lari.jpg');
  await page.getByRole('textbox', { name: 'Tenggat Waktu * This field is' }).fill('2025-06-03T00:00');
  await page.getByRole('textbox', { name: 'Tgl Mulai *' }).fill('2025-05-29T08:00');
  await page.getByRole('textbox', { name: 'Tgl Selesai' }).fill('2025-06-05T00:00');
  await page.getByRole('spinbutton', { name: 'Poin *' }).fill('100');
  await page.getByRole('spinbutton', { name: 'Nilai Kelulusan *' }).fill('75');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Tambah tugas - hanya isi kelas, mapel, nama, instruksi, file, tenggat waktu, tgl. mulai, tgl. selesai poin, kkm, dan max file tugas', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas Praktek Lari Estafet');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Tugas ini dilakukan secara berkelompok, masinng-masing kelompok terdiri dari 4 orang. praktekan dan buat video upload youtube linknya kumpulkan');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('lari.jpg');
  await page.getByRole('textbox', { name: 'Tenggat Waktu * This field is' }).fill('2025-06-03T00:00');
  await page.getByRole('textbox', { name: 'Tgl Mulai *' }).fill('2025-05-29T08:00');
  await page.getByRole('textbox', { name: 'Tgl Selesai' }).fill('2025-06-05T00:00');
  await page.getByRole('spinbutton', { name: 'Poin *' }).fill('100');
  await page.getByRole('spinbutton', { name: 'Nilai Kelulusan *' }).fill('75');
  await page.locator('#max_file').selectOption('20');
  await page.getByRole('button', { name: 'Simpan' }).click();
});


test('Buat tugas - dg Pengiriman ulang tapi tidak isi hari tambahan', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas Praktek Lari Estafet');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Tugas ini dilakukan secara berkelompok, masinng-masing kelompok terdiri dari 4 orang. praktekan dan buat video upload youtube linknya kumpulkan');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('lari.jpg');
  await page.getByRole('textbox', { name: 'Tenggat Waktu * This field is' }).fill('2025-06-03T00:00');
  await page.getByRole('textbox', { name: 'Tgl Mulai *' }).fill('2025-05-29T08:00');
  await page.getByRole('textbox', { name: 'Tgl Selesai' }).fill('2025-06-05T00:00');
  await page.getByRole('spinbutton', { name: 'Poin *' }).fill('100');
  await page.getByRole('spinbutton', { name: 'Nilai Kelulusan *' }).fill('75');
  await page.locator('#max_file').selectOption('20');
  await page.getByRole('checkbox', { name: 'Pengiriman Ulang Diizinkan ' }).check();
  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.getByRole('checkbox', { name: 'Pengiriman Ulang Diizinkan ' }).uncheck();
  await page.getByRole('textbox', { name: 'Hari Tambahan untuk' }).fill('3');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Buat tugas - Kirim file lebih dari 2 mb', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas praktek lari estafet');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Bentuklah kelompok yang terdiri dari 4 orang, praktekan lari estafet, reka dan upload youtube, linknya kumpulkan');
  await page.getByRole('textbox', { name: 'Tenggat Waktu *' }).fill('2025-06-02T00:00');
  await page.getByRole('textbox', { name: 'Tgl Mulai *' }).fill('2025-05-28T08:00');
  await page.getByRole('textbox', { name: 'Tgl Selesai' }).fill('2025-06-06T00:00');
  await page.getByRole('spinbutton', { name: 'Poin *' }).fill('100');
  await page.getByRole('spinbutton', { name: 'Nilai Kelulusan *' }).fill('75');
  await page.locator('#max_file').selectOption('50');
  await page.locator('#create-form i').click();
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Buat tugas - Kirim file kurang dari 2 mb', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('31');
  await page.locator('#subject-id').selectOption('181');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas merangkum bab atletik');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Rangkumlah materi atletik dan cabor apa saja yang termasuk atletik jelaskan masing-masing poinnya');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('Passing bawah, passing atas, & smash pada Permainan Bola Voli - Razaf Zulfikry.mp3');
  await page.getByRole('textbox', { name: 'Tenggat Waktu *' }).fill('2025-06-04T00:00');
  await page.getByRole('textbox', { name: 'Tgl Mulai *' }).fill('2025-05-30T08:00');
  await page.getByRole('textbox', { name: 'Tgl Selesai' }).fill('2025-06-06T00:00');
  await page.getByRole('spinbutton', { name: 'Poin *' }).fill('100');
  await page.getByRole('spinbutton', { name: 'Nilai Kelulusan *' }).fill('75');
  await page.locator('#max_file').selectOption('50');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Buat tugas - Tgl Mulai sesudah jatuh tempo dan tgl selesai', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas merangkum bab atletik');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Rangkumlah materi atletik dan cabor apa saja yang termasuk atletik jelaskan masing-masing poinnya');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('Passing bawah, passing atas, & smash pada Permainan Bola Voli - Razaf Zulfikry.mp3');
  await page.getByRole('textbox', { name: 'Tenggat Waktu *' }).fill('2024-06-04T00:00');
  await page.getByRole('textbox', { name: 'Tgl Mulai *' }).fill('2025-06-30T08:00');
  await page.getByRole('textbox', { name: 'Tgl Selesai' }).fill('2025-06-06T00:00');
  await page.getByRole('spinbutton', { name: 'Poin *' }).fill('100');
  await page.getByRole('spinbutton', { name: 'Nilai Kelulusan *' }).fill('75');
  await page.locator('#max_file').selectOption('50');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Buat tugas - Jatuh tempo sebelum tgl mulai dan tgl selesai', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas merangkum bab atletik');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Rangkumlah materi atletik dan cabor apa saja yang termasuk atletik jelaskan masing-masing poinnya');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('Passing bawah, passing atas, & smash pada Permainan Bola Voli - Razaf Zulfikry.mp3');
  await page.getByRole('textbox', { name: 'Tenggat Waktu * This field is' }).fill('2025-05-25T00:00');
  await page.getByRole('textbox', { name: 'Tgl Mulai *' }).fill('2025-05-30T08:00');
  await page.getByRole('textbox', { name: 'Tgl Selesai' }).fill('2025-06-06T00:00');
  await page.getByRole('spinbutton', { name: 'Poin *' }).fill('100');
  await page.getByRole('spinbutton', { name: 'Nilai Kelulusan *' }).fill('75');
  await page.locator('#max_file').selectOption('50');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Buat tugas - Tgl Selesai sebelum Jatuh tempo', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas merangkum bab atletik');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Rangkumlah materi atletik dan cabor apa saja yang termasuk atletik jelaskan masing-masing poinnya');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('Passing bawah, passing atas, & smash pada Permainan Bola Voli - Razaf Zulfikry.mp3');
  await page.getByRole('textbox', { name: 'Tenggat Waktu * This field is' }).fill('2025-06-04T00:00');
  await page.getByRole('textbox', { name: 'Tgl Mulai *' }).fill('2025-05-30T08:00');
  await page.getByRole('textbox', { name: 'Tgl Selesai' }).fill('2025-06-03T00:00');
  await page.getByRole('spinbutton', { name: 'Poin *' }).fill('100');
  await page.getByRole('spinbutton', { name: 'Nilai Kelulusan *' }).fill('75');
  await page.locator('#max_file').selectOption('50');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Buat tugas - Jatuh tempo sama dg tgl selesai', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas merangkum bab atletik');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Rangkumlah materi atletik dan cabor apa saja yang termasuk atletik jelaskan masing-masing poinnya');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('Passing bawah, passing atas, & smash pada Permainan Bola Voli - Razaf Zulfikry.mp3');
  await page.getByRole('textbox', { name: 'Tenggat Waktu * This field is' }).fill('2025-06-06T00:00');
  await page.getByRole('textbox', { name: 'Tgl Mulai *' }).fill('2025-05-30T08:00');
  await page.getByRole('textbox', { name: 'Tgl Selesai' }).fill('2025-06-06T00:00');
  await page.getByRole('spinbutton', { name: 'Poin *' }).fill('100');
  await page.getByRole('spinbutton', { name: 'Nilai Kelulusan *' }).fill('75');
  await page.locator('#max_file').selectOption('50');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Buat tugas - Jatuh tempo sama dg tgl mulai', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas merangkum bab atletik');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Rangkumlah materi atletik dan cabor apa saja yang termasuk atletik jelaskan masing-masing poinnya');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('Passing bawah, passing atas, & smash pada Permainan Bola Voli - Razaf Zulfikry.mp3');
  await page.getByRole('textbox', { name: 'Tenggat Waktu * This field is' }).fill('2025-05-30T00:00');
  await page.getByRole('textbox', { name: 'Tgl Mulai *' }).fill('2025-05-30T08:00');
  await page.getByRole('textbox', { name: 'Tgl Selesai' }).fill('2025-06-06T00:00');
  await page.getByRole('spinbutton', { name: 'Poin *' }).fill('100');
  await page.getByRole('spinbutton', { name: 'Nilai Kelulusan *' }).fill('75');
  await page.locator('#max_file').selectOption('50');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Buat tugas - tgl mulai sama dg tgl selesai', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas merangkum bab atletik');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Rangkumlah materi atletik dan cabor apa saja yang termasuk atletik jelaskan masing-masing poinnya');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('Passing bawah, passing atas, & smash pada Permainan Bola Voli - Razaf Zulfikry.mp3');
  await page.getByRole('textbox', { name: 'Tenggat Waktu * This field is' }).fill('2025-06-04T00:00');
  await page.getByRole('textbox', { name: 'Tgl Mulai *' }).fill('2025-05-30T08:00');
  await page.getByRole('textbox', { name: 'Tgl Selesai' }).fill('2025-05-30T00:00');
  await page.getByRole('spinbutton', { name: 'Poin *' }).fill('100');
  await page.getByRole('spinbutton', { name: 'Nilai Kelulusan *' }).fill('75');
  await page.locator('#max_file').selectOption('50');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Buat tugas - tgl mulai, jatuh tempo, dan tgl selesai sama', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas merangkum bab atletik');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Rangkumlah materi atletik dan cabor apa saja yang termasuk atletik jelaskan masing-masing poinnya');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('Passing bawah, passing atas, & smash pada Permainan Bola Voli - Razaf Zulfikry.mp3');
  await page.getByRole('textbox', { name: 'Tenggat Waktu * This field is' }).fill('2025-05-30T00:00');
  await page.getByRole('textbox', { name: 'Tgl Mulai *' }).fill('2025-05-30T08:00');
  await page.getByRole('textbox', { name: 'Tgl Selesai' }).fill('2025-05-30T00:00');
  await page.getByRole('spinbutton', { name: 'Poin *' }).fill('100');
  await page.getByRole('spinbutton', { name: 'Nilai Kelulusan *' }).fill('75');
  await page.locator('#max_file').selectOption('50');
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Buat tugas - tombol reset', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('20');
  await page.locator('#subject-id').selectOption('99');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas merangkum bab atletik');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Rangkumlah materi atletik dan cabor apa saja yang termasuk atletik jelaskan masing-masing poinnya');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('Passing bawah, passing atas, & smash pada Permainan Bola Voli - Razaf Zulfikry.mp3');
  await page.getByRole('textbox', { name: 'Tenggat Waktu * This field is' }).fill('2025-05-30T00:00');
  await page.getByRole('textbox', { name: 'Tgl Mulai *' }).fill('2025-05-30T08:00');
  await page.getByRole('textbox', { name: 'Tgl Selesai' }).fill('2025-05-30T00:00');
  await page.getByRole('spinbutton', { name: 'Poin *' }).fill('100');
  await page.getByRole('spinbutton', { name: 'Nilai Kelulusan *' }).fill('75');
  await page.locator('#max_file').selectOption('50');
  await page.getByRole('button', { name: 'Atur ulang' }).click();
});
  
test('Buat tugas - nilai kelulusan lebih dari poin maks', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();
  await page.getByRole('button', { name: 'Tambah Penugasan' }).click();
  await page.getByLabel('Kelas *').selectOption('25');
  await page.locator('#subject-id').selectOption('131');
  await page.getByRole('textbox', { name: 'Nama Tugas *' }).fill('Tugas Merangkum');
  await page.getByRole('textbox', { name: 'Instruksi Penugasan' }).fill('Rangkumlah bab atletik dan jelaskan cabangnya apa aja');
  await page.getByRole('textbox', { name: 'Tenggat Waktu *' }).fill('2025-06-01T10:00');
  await page.getByRole('textbox', { name: 'Tgl Mulai *' }).fill('2025-05-30T08:00');
  await page.getByRole('textbox', { name: 'Tgl Selesai' }).fill('2025-06-05T00:00');
  await page.getByRole('spinbutton', { name: 'Poin *' }).fill('80');
  await page.getByRole('spinbutton', { name: 'Nilai Kelulusan *' }).fill('85');
  await page.locator('#max_file').selectOption('10');
  await page.getByRole('button', { name: 'Simpan' }).click();
  
  // Kembali benar
  await page.getByRole('spinbutton', { name: 'Poin *' }).fill('100');
  await page.getByRole('button', { name: 'docx' }).click();
  await page.getByRole('button', { name: 'jpeg' }).click();
  await page.getByRole('button', { name: 'jpg' }).click();
  await page.getByRole('button', { name: 'pdf' }).click();
  await page.getByRole('button', { name: 'png' }).click();
  await page.getByRole('button', { name: 'Simpan' }).click();
});

test('Buat tugas - edit, detail, dan hapus tugas', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();

  // Edit
  await page.getByRole('row', { name: '3 Tugas Merangkum XII METRO B' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByRole('spinbutton', { name: 'Poin' }).click();
  await page.getByRole('spinbutton', { name: 'Poin' }).fill('100');
  await page.getByRole('button', { name: 'Simpan' }).click();
  await page.getByRole('link', { name: 'to page 2' }).click();

  // Hapus
  await page.getByRole('row', { name: '4 Tugas mengirim file XII TKJ' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Hapus' }).click();
  await page.getByRole('button', { name: 'Yes, delete it' }).click();
  await page.getByRole('link', { name: 'to page 1' }).click();

  // Detail
  await page.getByRole('row', { name: '3 Tugas Merangkum XII METRO B' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Detail' }).click();
  await page.getByRole('button', { name: ' Edit' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('row', { name: '3 Tugas Merangkum XII METRO B' }).locator('#dropdownMenuButton').click();
  await page.getByRole('link', { name: 'Detail' }).click();
  await page.getByRole('button', { name: 'Tutup' }).click();
});

test('Buat tugas - filter, search,dan toolbar', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Tugas Siswa ' }).click();
  await page.getByRole('link', { name: 'Buat Tugas' }).click();

  // Filter kelas
  await page.locator('#filter-class-section-id').selectOption('35');
  await page.locator('#filter-class-section-id').selectOption('');

  //Filter tahun ajaran
  await page.getByLabel('Tahun Ajaran').selectOption('3');
  await page.getByLabel('Tahun Ajaran').selectOption('1');

  //Search
  await page.getByRole('searchbox', { name: 'Search' }).fill('estafet');
  await page.getByRole('searchbox', { name: 'Search' }).fill('');

  // Hide/show pagination
  await page.getByRole('button', { name: 'Hide/Show pagination' }).click();
  await page.getByRole('button', { name: 'Hide/Show pagination' }).click();

  // auto refresh
  await page.getByRole('button', { name: 'Refresh' }).click();

  // Order by column
  await page.getByRole('button', { name: 'Columns' }).click();
  
  // Eksport
  await page.getByRole('button', { name: 'Export' }).click();
  await page.getByRole('button', { name: 'Export' }).press('AudioVolumeMute');
  await page.getByRole('button', { name: 'Export' }).press('AudioVolumeMute');
  await page.getByRole('button', { name: 'Columns' }).click();
  await page.locator('label:nth-child(5)').click();
  await page.getByRole('button', { name: 'Export' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'CSV' }).click();
  const download = await downloadPromise;
  await page.getByRole('button', { name: '5' }).click();
  await page.getByRole('link', { name: '10' }).click();
  await page.getByRole('button', { name: '10' }).click();
  await page.getByRole('link', { name: '20' }).click();
  await page.getByRole('button', { name: '20' }).click();
  await page.getByRole('link', { name: '50' }).click();
  await page.getByRole('button', { name: '50' }).click();
  await page.getByRole('link', { name: '5', exact: true }).click();
  await page.getByRole('link', { name: 'to page 3' }).click();
  await page.getByRole('link', { name: 'previous page' }).click();
  await page.getByRole('link', { name: 'next page' }).click();
  await page.getByRole('link', { name: 'next page' }).click();
});
});