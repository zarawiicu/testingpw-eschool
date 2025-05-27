import { test, expect } from '@playwright/test';

test.use({ storageState: 'adminState.json' });

test.setTimeout(120000); // Tambah timeout global jadi 2 menit per test

test('Navigasi Dasbor Akademik', async ({ page }) => {
  // Login
  console.log('🔐 Login ke dashboard...');
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  
  // await page.getByRole('textbox', { name: 'Email' }).fill('adminsmk9malang@gmail.com');
  // await page.getByRole('textbox', { name: 'Password' }).fill('0341479148');
  // await page.locator('#togglePasswordShowHide span').click();
  // await page.getByRole('textbox', { name: 'School Code' }).fill('SCH20248');
  // await page.getByRole('button', { name: 'Masuk' }).click();
  // await page.waitForLoadState('networkidle', { timeout: 60000 });
  // await page.waitForTimeout(2000);

  // Akses Dasbor Akademik dari menu
  console.log('📚 Navigasi ke Dasbor Akademik...');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: ' Akademik ' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Dasbor Akademik' }).click();
  await page.waitForLoadState('networkidle', { timeout: 60000 });
  await page.waitForTimeout(2000);

  // Klik card pertama
  console.log('🟦 Klik card pertama...');
  await page.waitForSelector('.card-redirect > .d-flex', { timeout: 10000 });
  await page.locator('.card-redirect > .d-flex').first().click();
  await page.waitForLoadState('networkidle', { timeout: 60000 });
  await page.waitForTimeout(2000);

  // Kembali ke dasbor
  console.log('🔁 Kembali ke Dasbor Akademik...');
  // await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: 'Dasbor Akademik' }).click();
  await page.waitForLoadState('networkidle', { timeout: 60000 });
  await page.waitForTimeout(2000);

  // Klik card kedua
  console.log('🟪 Klik card kedua...');
  await page.waitForSelector('div:nth-child(2) > .card > .card-redirect > .d-flex', { timeout: 10000 });
  await page.locator('div:nth-child(2) > .card > .card-redirect > .d-flex').click();
  await page.waitForLoadState('networkidle', { timeout: 60000 });
  await page.waitForTimeout(1000);

  // Kembali ke dasbor lagi
  console.log('🔁 Kembali ke Dasbor Akademik (lagi)...');
  await page.getByRole('link', { name: 'Dasbor Akademik' }).click();
  await page.waitForLoadState('networkidle', { timeout: 60000 });
  await page.waitForTimeout(2000);

  // Klik mata pelajaran
  console.log('📘 Klik Mata Pelajaran 53...');
  await page.locator('div:nth-child(3) > .card > .card-redirect > .d-flex').click();
  await page.waitForLoadState('networkidle', { timeout: 60000 });
  await page.waitForTimeout(1000);

  // Kembali ke dasbor sekali lagi
  console.log('🔁 Kembali ke Dasbor Akademik (terakhir)...');
  await page.getByRole('link', { name: 'Dasbor Akademik' }).click();
  await page.waitForLoadState('networkidle', { timeout: 60000 });
  await page.waitForTimeout(2000);

  // Klik tombol terakhir
  console.log('🕒 Klik tombol terakhir...');
  await page.getByRole('button', { name: '' }).click();

  console.log('✅ Selesai tanpa error!');
});
