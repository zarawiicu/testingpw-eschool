import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
    // Membuka halaman login aplikasi
  await page.goto('https://esbeta.deanry.my.id/login');

  // Mengisi input email
  await page.fill('input[name="email"]', 'adminsmk9malang@gmail.com');
  // Mengisi input password
  await page.fill('input[name="password"]', '0341479148');
  // Mengisi input kode (biasanya kode sekolah)
  await page.fill('input[name="code"]', 'SCH20248');

  await Promise.all([
    // Klik tombol submit
    page.click('button[type="submit"]'),
    page.waitForLoadState('networkidle'), 
  ]);

  // Ambil screenshot setelah login (buat ngecek kalau gagal)
  await page.screenshot({ path: 'after-login.png', fullPage: true });

  // Tunggu elemen yang khas dari dasbor (jangan pakai <h1> kalau nggak pasti ada)
  await page.waitForSelector('nav.sidebar'); // atau sesuaikan dengan elemen lain

  // Validasi judul halaman
  await expect(page).toHaveTitle(/Dasbor/);


  
});