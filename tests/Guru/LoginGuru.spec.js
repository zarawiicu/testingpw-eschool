import { test, expect } from '@playwright/test';

test('tes - Login Guru', async ({ page }) => {
  //Login dengan email dan password
  await page.goto('https://esbeta.deanry.my.id/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono533@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('smkn8*()');
  await page.getByRole('button', { name: 'Masuk' }).click();

  // Pilih Sekolah
  await page.locator('#schoolsList i').nth(1).click();
  await page.getByRole('button', { name: 'Lanjutkan ke Dashboard' }).click();

  await page.waitForURL('**/dashboard');
  await expect(page).toHaveURL(/.*dashboard/);

  // Simpan ke GuruState.json
  await page.context().storageState({ path: 'guruState.json' });
  console.log('✅ Session guru berhasil disimpan ke guruState.json');
});