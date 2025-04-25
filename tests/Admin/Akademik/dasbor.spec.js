import { test, expect } from '@playwright/test';

test.use({ storageState: 'adminState.json' });

test('Dasbor Akademik', async ({ page }) => {
  // Buka halaman dashboard
  await page.goto('https://esbeta.deanry.my.id/dashboard/');
  await page.waitForLoadState('networkidle'); 


  //Validasi URL 
  await expect(page).toHaveURL('https://esbeta.deanry.my.id/dashboard/')

  //klik pada sidebar tombol Kurikulum
  await page.locator('[href="#kurikulum-main-menu"]').click()

  //klik pada sidebar tombol Akademik
  await page.locator('[href="#akademik-main-menu"]').click()

  //klik pada sidebar tombol Dasbor Akademik
  await page.locator('[href="https://esbeta.deanry.my.id/academic/dashboard"]').click()

  await page.waitForLoadState('networkidle'); 

});

  // // Klik tombol menu 'akademik'
  // await page.getByRole('link', { name: 'akademik' }).click();

  // // Tunggu hingga halaman selesai dimuat
  // await page.waitForLoadState('networkidle');

  // // Pastikan elemen heading yang relevan muncul
  // await expect(page.getByRole('heading', { name: 'Akademik' })).toBeVisible();
  // await expect(page.getByRole('heading', { name: 'Dasbor Akademik' })).toBeVisible();

  // // Verifikasi URL masih mengandung 'dashboard'
  // await expect(page).toHaveURL(/dashboard/);

