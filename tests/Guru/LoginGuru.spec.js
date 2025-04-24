import { test, expect } from '@playwright/test';


test('Login Test', async ({ page }) => {
  // Membuka halaman login
  await page.goto('https://esbeta.deanry.my.id/');
  // Menunggu halaman dimuat sepenuhnya
    await page.waitForLoadState('networkidle');
    // Klik Tombol Login
    await page.getByRole('button', { name: 'Login' }).click();
    // mencari form login
    await page.waitForSelector('form[id="frmLogin"]');
    // mengisi form login
    await page.fill('input[name="email"]', 'agungcahyono533@gmail.com');
    await page.fill('input[name="password"]', '081230093978');
    await page.fill('input[name="code"]', 'SCH20248');
    // klik submit button
    await page.click('button[type="submit"]');

    // menunggu halaman dimuat sepenuhnya
    await page.waitForLoadState('networkidle');
    // mengecek apakah login berhasil
    await expect(page).toHaveURL(/.*dashboard/);

    // mengecek apakah ada elemen yang menandakan login berhasil
    // Misalnya, memeriksa apakah ada elemen dengan teks tertentu yang hanya muncul setelah login
    const welcomeMessage = await page.locator('text=Dashboard');


    // Optionally, you can take a screenshot of the page after login for verification
    await page.screenshot({ path: 'login-success.png' });

    // buka menu user
    await page.getByRole('link', { name: 'image Agung Cahyono,' }).click();
    // logout 
    await page.locator('text=keluar').click();
    // Wait for the page to load after logout
    await page.waitForLoadState('networkidle');
    // Check if the logout was successful by verifying the URL or a specific element on the page
    // For example, check if the URL contains "/login"
});