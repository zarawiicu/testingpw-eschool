import { test, expect } from '@playwright/test';

test('Form Uji Coba / Daftar Sekolah', async ({ page }) => {
  // Akses halaman utama
  await page.goto('https://esbeta.deanry.my.id/', { waitUntil: 'networkidle' });

  // Klik tombol "Uji Coba"
  await page.getByRole('button', { name: 'Uji Coba' }).click();
  await page.waitForTimeout(1000);

  // Isi data sekolah
  await page.getByRole('textbox', { name: 'Nama *' }).fill('SMKN 11 Malang');
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'Masukkan Email Sekolah Anda' }).fill('smkn11malang@gmail.com');
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'No Hp *' }).fill('087699315678');
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'Alamat *' }).fill('Malang');
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'Slogan *' }).fill('SMK Bisa');
  await page.waitForTimeout(1000);

  // Isi data admin (perwakilan sekolah)
  await page.getByRole('textbox', { name: 'Masukkan Nama Depan Anda' }).fill('Aurel');
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'Nama Belakang *' }).fill('Ayu');
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'Email *' }).fill('aurel@gmail.com');
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'Kontak *' }).fill('086613562233');
  await page.waitForTimeout(1000);

  // Kirim form
  await page.getByRole('button', { name: 'Simpan' }).click();
});
