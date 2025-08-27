import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' }); // Jika ingin test berurutan (opsional)
  test.describe('Coba Login', () => {
    test('Login - Benar Semua', async ({ page }) => {
        //Login dengan email dan password
      await page.goto('https://esbeta.deanry.my.id/');
      await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono533@gmail.com');
      await page.getByRole('textbox', { name: 'Password' }).fill('smkn8*()');
      await page.getByRole('button', { name: 'Masuk' }).click();

      // Pilih Sekolah
      await page.locator('#schoolsList i').nth(1).click();
      await page.getByRole('button', { name: 'Lanjutkan ke Dashboard' }).click();

      await page.waitForURL('**/dashboard');
      await expect(page).toHaveURL(/.*dashboard/);
    });

    // ERROR TEST CASE
    test('Login - Email Salah', async ({ page }) => {
      await page.goto('https://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Email' }).fill('agengcahyono533gmail.com');
      await page.getByRole('textbox', { name: 'Password' }).fill('smkn8*()');
      await page.getByRole('button', { name: 'Masuk' }).click();
    });

    test('Login - Password Salah', async ({ page }) => {
      await page.goto('https://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono533@gmail.com');
      await page.getByRole('textbox', { name: 'Password' }).fill('12345');
      await page.getByRole('button', { name: 'Masuk' }).click();
    });

    test('Login - dengan email dan password salah', async ({ page }) => {
      await page.goto('http://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Email' }).fill('agengcahyono533gmail.com');
      await page.getByRole('textbox', { name: 'Password' }).fill('12345');
      await page.getByRole('button', { name: 'Masuk' }).click();
    });

    test('Login - dengan satu email kosong', async ({ page }) => {
      await page.goto('https://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Email' }).fill('');
      await page.getByRole('textbox', { name: 'Password' }).fill('smkn8*()');
      await page.getByRole('button', { name: 'Masuk' }).click();
    });

    test('Login - dengan password kosong', async ({ page }) => {
      await page.goto('https://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono533@gmail.com');
      await page.getByRole('textbox', { name: 'Password' }).fill('');
      await page.getByRole('button', { name: 'Masuk' }).click();
    });


    test('Login - Semua Field kosong', async ({ page }) => {
      await page.goto('http://esbeta.deanry.my.id/login');
      await page.getByRole('button', { name: 'Masuk' }).click();
    });
      
    test('Email tidak valid', async ({ page }) => {
      await page.goto('http://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono533gmail.com');
      await page.getByRole('textbox', { name: 'Password' }).fill('smkn8*()');
      await page.getByRole('button', { name: 'Masuk' }).click();
    });
    
    test('Login - Cek batasan min panjang tiap field inputan', async ({ page }) => {
      // TIDAK TERBATAS
      await page.goto('http://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Email' }).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer non nunc at metus bibendum blandit. Proin ut purus nec sapien egestas aliquam. Sed at tristique risus, nec laoreet orci. Etiam sollicitudin ipsum at purus tincidunt, non porttitor nulla ullamcorper. Donec tincidunt felis vel augue dignissim, id rhoncus risus convallis. Suspendisse potenti. In rutrum libero ac lacus blandit, et luctus nulla ullamcorper. Maecenas non diam sit amet turpis commodo tristique. Praesent id ante ac sem fermentum viverra. Fusce ac tellus vitae libero fermentum feugiat');
      await page.getByRole('textbox', { name: 'Password' }).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer non nunc at metus bibendum blandit. Proin ut purus nec sapien egestas aliquam. Sed at tristique risus, nec laoreet orci. Etiam sollicitudin ipsum at purus tincidunt, non porttitor nulla ullamcorper. Donec tincidunt felis vel augue dignissim, id rhoncus risus convallis. Suspendisse potenti. In rutrum libero ac lacus blandit, et luctus nulla ullamcorper. Maecenas non diam sit amet turpis commodo tristique. Praesent id ante ac sem fermentum viverra. Fusce ac tellus vitae libero fermentum feugiat');
      await page.getByRole('button', { name: 'Masuk' }).click();
    });  

    test('Login - Cek batasan max panjang tiap field inputan', async ({ page }) => {
      // TIDAK TERBATAS
      await page.goto('http://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Email' }).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer non nunc at metus bibendum blandit. Proin ut purus nec sapien egestas aliquam. Sed at tristique risus, nec laoreet orci. Etiam sollicitudin ipsum at purus tincidunt, non porttitor nulla ullamcorper. Donec tincidunt felis vel augue dignissim, id rhoncus risus convallis. Suspendisse potenti. In rutrum libero ac lacus blandit, et luctus nulla ullamcorper. Maecenas non diam sit amet turpis commodo tristique. Praesent id ante ac sem fermentum viverra. Fusce ac tellus vitae libero fermentum feugiat');
      await page.getByRole('textbox', { name: 'Password' }).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer non nunc at metus bibendum blandit. Proin ut purus nec sapien egestas aliquam. Sed at tristique risus, nec laoreet orci. Etiam sollicitudin ipsum at purus tincidunt, non porttitor nulla ullamcorper. Donec tincidunt felis vel augue dignissim, id rhoncus risus convallis. Suspendisse potenti. In rutrum libero ac lacus blandit, et luctus nulla ullamcorper. Maecenas non diam sit amet turpis commodo tristique. Praesent id ante ac sem fermentum viverra. Fusce ac tellus vitae libero fermentum feugiat');
      await page.getByRole('button', { name: 'Masuk' }).click();
    });  
      
    test('Pilih Sekolah - Tidak memilih sekolah', async ({ page }) => {
      //Tidak memilh sekolah
      await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono533@gmail.com');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('smkn8*()');
      await page.getByRole('button', { name: 'Masuk' }).click();

      //Cari nama sekolah
      await page.getByRole('textbox', { name: 'Cari nama sekolah...' }).fill('SMKN 8');
      await page.getByRole('button', { name: 'Lanjutkan ke Dashboard' }).click(); //Tombol disable saat tidak memilih sekolah
    });

    test('Login - CTA', async ({ page }) => {
      await page.goto('http://esbeta.deanry.my.id/login');

      //CTA Lupa Password
      await page.getByRole('link', { name: 'Lupa Password?' }).click();

      //CTA Belum punya akun
      await page.getByRole('link', { name: 'Belum punya akun? Daftar' }).click();
      await page.getByRole('button', { name: 'Close' }).click();

      await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono533@gmail.com');
      await page.getByRole('textbox', { name: 'Password' }).fill('smkn8*()');
      await page.getByRole('button', { name: 'Masuk' }).click();

      //CTA ekolah tidak ada, hubungi admin
      await page.getByRole('link', { name: 'Sekolah tidak ada dalam' }).click();
    });


    test('Login - Show/Hide Password', async ({ page }) => {
      await page.goto('http://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('081230093978');
      await page.locator('#togglePasswordShowHide span').click();
      await page.locator('#togglePasswordShowHide span').click();
    });
    });