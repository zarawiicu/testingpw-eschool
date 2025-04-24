import { test, expect } from '@playwright/test';

test('Login guru dan simpan session', async ({ page }) => {
  // Buka halaman login
  await page.goto('https://esbeta.deanry.my.id/');
  await page.waitForLoadState('networkidle');

  // Klik tombol Login
  await page.getByRole('button', { name: 'Login' }).click();

  // Tunggu form login muncul
  await page.waitForSelector('form[id="frmLogin"]');

  // Isi form login
  await page.fill('input[name="email"]', 'agungcahyono533@gmail.com');
  await page.fill('input[name="password"]', '081230093978');
  await page.fill('input[name="code"]', 'SCH20248');

  // Klik tombol Masuk
  await page.click('button[type="submit"]');

  // Pastikan sudah login ke dashboard
  await expect(page).toHaveURL(/.*dashboard/);
  // await page.locator('text=Dashboard').waitFor();

  // Ambil screenshot setelah login sukses (opsional)
  await page.screenshot({ path: 'login-success.png' });

  // ✅ Simpan session saat user masih login
  await page.context().storageState({ path: 'guruState.json' });
  console.log('✅ Session guru berhasil disimpan ke guruState.json');

  // Baru logout
  await page.getByRole('link', { name: 'image Agung Cahyono,' }).click();
  await page.locator('text=keluar').click();
  
});
