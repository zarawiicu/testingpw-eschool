import { test, expect } from '@playwright/test';

test.use({ storageState: 'adminState.json' });

test('Navigasi Dasbor Guru', async ({ page }) => {
  console.log('🔐 Masuk ke dashboard...');
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);

  // Navigasi ke Dasbor Guru
  console.log('📚 Navigasi ke Dasbor Guru...');
  await page.getByRole('link', { name: /kurikulum/i }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: /guru/i }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: /dasbor guru/i }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Klik kartu guru pertama
  console.log('🟦 Klik kartu guru pertama...');
  await page.waitForSelector('.card-redirect > .d-flex', { timeout: 10000 });
  await page.locator('.card-redirect > .d-flex').first().click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1800);

  // Kembali ke Dasbor Guru
  console.log('🔁 Kembali ke Dasbor Guru...');
//   await page.getByRole('link', { name: /kurikulum/i }).click();
//   await page.waitForTimeout(800);
  await page.getByRole('link', { name: /dasbor guru/i }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);

  // Filter Aktif
  console.log('✅ Filter guru Aktif...');
  await page.locator('form').filter({ hasText: /aktif/i }).locator('div').first().click();
  await page.waitForTimeout(1500);

  // Kembali ke Dasbor Guru
  await page.getByRole('link', { name: /kurikulum/i }).click();
  await page.waitForTimeout(800);
  await page.getByRole('link', { name: /dasbor guru/i }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);

  // Filter Tidak Aktif
  console.log('❌ Filter guru Tidak Aktif...');
  await page.locator('form').filter({ hasText: /tidak aktif/i }).locator('div').first().click();
  await page.waitForTimeout(1500);

  // Kembali ke Dasbor Guru
  await page.getByRole('link', { name: /kurikulum/i }).click();
  await page.waitForTimeout(800);
  await page.getByRole('link', { name: /dasbor guru/i }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);

  // Klik chart Aktif
  console.log('📊 Klik chart Aktif...');
  await page.locator('#SvgjsSvg1001').getByText('Aktif', { exact: true }).click();
  await page.waitForTimeout(1000);

  // Klik chart Tidak Aktif
  console.log('📊 Klik chart Tidak Aktif...');
  await page.locator('#SvgjsSvg1001').getByText('Tidak Aktif').click();
  await page.waitForTimeout(1000);

  // Klik filter gender laki-laki
  console.log('👨 Klik filter Laki-laki...');
  await page.getByText('Laki-laki').click();
  await page.waitForTimeout(1000);

  // Klik filter gender perempuan
  console.log('👩 Klik filter Perempuan...');
  await page.getByText('Perempuan', { exact: true }).click();
  await page.waitForTimeout(1000);

  // Klik tombol refresh
  console.log('🔄 Klik tombol refresh...');
  await page.getByRole('button', { name: // }).click();
  await page.waitForTimeout(1500);

  console.log('✅ Semua navigasi Dasbor Guru selesai tanpa error!');
});
