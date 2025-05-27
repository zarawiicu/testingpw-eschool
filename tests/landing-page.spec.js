import { test, expect } from '@playwright/test';

test('Navigasi dan Interaksi di esbeta.deanry.my.id', async ({ page }) => {
  // Akses halaman utama
  await page.goto('https://esbeta.deanry.my.id/', { waitUntil: 'networkidle' });

  // Navigasi menu utama
  await page.getByRole('list').getByRole('link', { name: 'Beranda' }).click();
  await page.getByRole('list').getByRole('link', { name: 'Fitur' }).click();
  await page.getByRole('list').getByRole('link', { name: 'Tentang Kami' }).click();
  await page.getByRole('list').getByRole('link', { name: 'Harga' }).click();

  // Ubah bahasa ke Bahasa Indonesia
  await page.getByRole('button', { name: 'Bahasa' }).click();
  await page.getByRole('link', { name: 'Bahasa Indonesia' }).click();

  // Navigasi ke bagian "Tentang Kami"
  await page.goto('https://esbeta.deanry.my.id/#about-us');

  // Interaksi dengan tombol dan popup
  await page.getByRole('button', { name: 'Daftarkan Sekolah Anda' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Lihat Fitur Lainnya' }).click();

  // Formulir kontak
  await page.getByRole('link', { name: 'Hubungi Kami' }).click();
  await page.getByRole('textbox', { name: 'Masukkan Nama Anda' }).fill('Anonim');
  await page.getByRole('textbox', { name: 'Masukkan Email Anda' }).fill('anonim123@gmail.com');
  await page.getByRole('textbox', { name: 'Kirim Pesan Anda' }).fill('Semangat');
  await page.getByRole('button', { name: 'Kirim' }).click();

  // Klik pada elemen informasi & buka popup
  const page1Promise = page.waitForEvent('popup');
  await page.locator('.infoWrapper').first().click();
  const page1 = await page1Promise;

  const page2Promise = page.waitForEvent('popup');
  await page.getByText('eschoolac@gmail.com').click();
  const page2 = await page2Promise;

  const page3Promise = page.waitForEvent('popup');
  await page.getByText('Lokasi Ruko Modern Kav A16-').click();
  const page3 = await page3Promise;

  // Navigasi bagian footer
  await page.getByRole('contentinfo').getByRole('link', { name: 'Beranda' }).click();
  await page.getByRole('contentinfo').getByRole('link', { name: 'Fitur' }).click();
  await page.getByRole('contentinfo').getByRole('link', { name: 'Harga' }).click();
  await page.getByRole('link', { name: 'FAQ' }).click();
  await page.getByRole('contentinfo').getByRole('link', { name: 'Tentang Kami' }).click();
  await page.getByRole('contentinfo').getByRole('link', { name: 'Kontak' }).click();

  // Navigasi ke halaman lain
  await page.getByRole('link', { name: 'Kebijakan Privasi' }).click();
  await page.getByRole('link', { name: 'Syarat & Ketentuan' }).click();
  await page.goto('https://esbeta.deanry.my.id/page/type/terms-conditions');
  await page.getByRole('link', { name: 'Pengembalian Dana' }).click();

  // Akses tombol login dan uji coba
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Start Trial' }).click();
  await page.getByRole('button', { name: 'Uji Coba' }).click();

  // Navigasi ulang menu utama
  await page.getByRole('listitem').filter({ hasText: 'Beranda' }).click();
  await page.getByRole('list').getByRole('link', { name: 'Fitur' }).click();
  await page.getByRole('list').getByRole('link', { name: 'Tentang Kami' }).click();
  await page.getByRole('list').getByRole('link', { name: 'Harga' }).click();
  await page.getByRole('list').getByRole('link', { name: 'Kontak' }).click();

  // Buka link media sosial
  const page4Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Facebook' }).click();
  const page4 = await page4Promise;

  const page5Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Instagram' }).click();
  const page5 = await page5Promise;

  const page6Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'LinkedIn' }).click();
  const page6 = await page6Promise;
});
