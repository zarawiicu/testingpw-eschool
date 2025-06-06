import { test, expect } from '@playwright/test';

test('Login sebagai admin dan simpan sesi', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/');
  
  // Klik tombol Login
  await page.getByRole('button', { name: 'Login' }).click();

  // Isi email
  await page.getByRole('textbox', { name: 'Email' }).fill('adminsmk8malang@gmail.com');
  
  // Isi password
  await page.getByRole('textbox', { name: 'Password' }).fill('hacked');

  // Tekan Enter atau klik tombol Masuk
  await page.getByRole('button', { name: 'Masuk' }).click();

  // Tunggu redirect ke dashboard
  await page.waitForURL('**/dashboard');
  await expect(page).toHaveURL(/.*dashboard/);

  // Simpan session admin
  await page.context().storageState({ path: 'adminState.json' });

  console.log('✅ Session admin berhasil disimpan ke adminState.json');
  
});
