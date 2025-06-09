import { test, expect } from '@playwright/test';

test.use({ storageState: 'adminState.json' });

test('Navigasi Dasbor Akademik', async ({ page }) => {
  console.log('🔐 Login ke dashboard...');
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500); // jeda awal

  // Navigasi ke Dasbor Akademik
  console.log('📚 Navigasi ke Dasbor Akademik...');
  await page.getByRole('link', { name: /kurikulum/i }).click();
  await page.waitForTimeout(1200);
  await page.getByRole('link', { name: /akademik/i }).click();
  await page.waitForTimeout(1200);
  await page.getByRole('link', { name: /dasbor akademik/i }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Klik Card Pertama
  console.log('🟦 Klik card pertama...');
  await page.waitForSelector('.card-redirect > .d-flex', { timeout: 10000 });
  await page.locator('.card-redirect > .d-flex').first().click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Kembali ke Dasbor Akademik
  console.log('🔁 Kembali ke Dasbor Akademik...');
  await page.getByRole('link', { name: /dasbor akademik/i }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Klik Card Kedua
  console.log('🟪 Klik card kedua...');
  await page.waitForSelector('div:nth-child(2) > .card > .card-redirect > .d-flex', { timeout: 10000 });
  await page.locator('div:nth-child(2) > .card > .card-redirect > .d-flex').click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1800);

  // Kembali lagi ke Dasbor Akademik
  console.log('🔁 Kembali ke Dasbor Akademik (lagi)...');
  await page.getByRole('link', { name: /dasbor akademik/i }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Klik Mata Pelajaran (Card ke-3)
  console.log('📘 Klik Mata Pelajaran...');
  await page.locator('div:nth-child(3) > .card > .card-redirect > .d-flex').click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1800);

  // Kembali ke Dasbor Akademik terakhir
  console.log('🔁 Kembali ke Dasbor Akademik (terakhir)...');
  await page.getByRole('link', { name: /dasbor akademik/i }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Klik tombol terakhir
  console.log('🕒 Klik tombol terakhir...');
  await page.getByRole('button', { name: // }).click();
  await page.waitForTimeout(1500);

  console.log('✅ Selesai tanpa error!');
});
