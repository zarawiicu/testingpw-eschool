import { test, expect } from '@playwright/test';

test('Form Lupa Password', async ({ page }) => {
  // Akses halaman utama
  await page.goto('https://esbeta.deanry.my.id/', { waitUntil: 'networkidle' });

  // Klik Lupa Password
  await page.getByRole('link', { name: 'Lupa Password?' }).click();
  await page.waitForTimeout(1000);

  // Masukkan kode sekolah
  await page.getByRole('textbox', { name: 'Enter School Code' }).press('CapsLock');
  await page.waitForTimeout(300);
  await page.getByRole('textbox', { name: 'Enter School Code' }).fill('SCH20248');
  await page.waitForTimeout(800);

  // Masukkan email
  await page.getByRole('textbox', { name: 'Enter Email' }).click();
  await page.waitForTimeout(300);
  await page.getByRole('textbox', { name: 'Enter Email' }).fill('afif@gmail.com');
  await page.waitForTimeout(1000);
  
  // Klik tombol "Reset Password"
  await page.getByRole('button', { name: 'Reset Password' }).click();
});
