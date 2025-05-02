import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' }); // Jika ingin test berurutan (opsional)
  test.describe('Coba Login', () => {
    test('Login - Benar Semua', async ({ page }) => {
      await page.goto('https://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono533@gmail.com');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('081230093978');
      await page.getByRole('textbox', { name: 'School Code' }).click();
      await page.getByRole('textbox', { name: 'School Code' }).fill('SCH20248');
      await page.getByRole('button', { name: 'Masuk' }).click();
      await page.getByRole('link', { name: 'image Agung Cahyono,' }).click();
      await page.getByRole('link', { name: ' Keluar' }).click();
    });

    // ERROR TEST CASE
    test('Login - Email Salah', async ({ page }) => {
      await page.goto('https://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono533@gmail.com');
      await page.getByRole('textbox', { name: 'Email' }).click();
      await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
      await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
      await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
      await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
      await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
      await page.getByRole('textbox', { name: 'Email' }).press('ArrowLeft');
      await page.getByRole('textbox', { name: 'Email' }).press('ArrowRight');
      await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono50@gmail.com');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('081230093978');
      await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
      await page.getByRole('textbox', { name: 'School Code' }).click();
      await page.getByRole('textbox', { name: 'School Code' }).fill('SCH');
      await page.getByRole('textbox', { name: 'School Code' }).press('CapsLock');
      await page.getByRole('textbox', { name: 'School Code' }).fill('SCH20248');
      await page.getByRole('button', { name: 'Masuk' }).click();
      const errorMessage = await page.locator('text=Email or password is incorrect'); // HARUSNYA PAKAI BAHASA INDONESIA AJA
      await expect(errorMessage).toBeVisible();
    });

    test('Login - Password Salah', async ({ page }) => {
      await page.goto('https://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono533@gmail.com');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
      await page.getByRole('textbox', { name: 'School Code' }).click();
      await page.getByRole('textbox', { name: 'School Code' }).press('CapsLock');
      await page.getByRole('textbox', { name: 'School Code' }).fill('SCH');
      await page.getByRole('textbox', { name: 'School Code' }).press('CapsLock');
      await page.getByRole('textbox', { name: 'School Code' }).fill('SCH20248');
      await page.getByRole('button', { name: 'Masuk' }).click();
      const errorMessage = await page.locator('text=Email or password is incorrect'); // HARUSNYA PAKAI BAHASA INDONESIA AJA
      await expect(errorMessage).toBeVisible();
    });

    test('Login - Kode Sekolah Salah', async ({ page }) => {
      await page.goto('https://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono533@gmail.com');
      await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono533@gmail.com');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('081230093978');
      await page.getByRole('textbox', { name: 'School Code' }).click();
      await page.getByRole('textbox', { name: 'School Code' }).press('CapsLock');
      await page.getByRole('textbox', { name: 'School Code' }).fill('SC');
      await page.getByRole('textbox', { name: 'School Code' }).press('CapsLock');
      await page.getByRole('textbox', { name: 'School Code' }).press('CapsLock');
      await page.getByRole('textbox', { name: 'School Code' }).press('CapsLock');
      await page.getByRole('textbox', { name: 'School Code' }).fill('SC1002');
      await page.getByRole('button', { name: 'Masuk' }).click();
      const errorMessage = await page.locator('text=Invalid School Identifier.'); // HARUSNYA PAKAI BAHASA INDONESIA AJA
      await expect(errorMessage).toBeVisible();
    });

    test('Login - dengan satu email kosong', async ({ page }) => {
      await page.goto('https://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('081230093978');
      await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
      await page.getByRole('textbox', { name: 'School Code' }).click();
      await page.getByRole('textbox', { name: 'School Code' }).fill('SCH20248');
      await page.getByRole('button', { name: 'Masuk' }).click();
      await page.getByRole('textbox', { name: 'Email This field is required.' }).press('ControlOrMeta+V');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('');
      await page.goto('http://esbeta.deanry.my.id/login');
    });

    test('Login - dengan password kosong', async ({ page }) => {
      await page.goto('https://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Email' }).press('ControlOrMeta+V');
      await page.getByRole('textbox', { name: 'School Code' }).click();
      await page.getByRole('textbox', { name: 'School Code' }).press('CapsLock');
      await page.getByRole('textbox', { name: 'School Code' }).press('CapsLock');
      await page.getByRole('textbox', { name: 'School Code' }).fill('SCH');
      await page.getByRole('textbox', { name: 'School Code' }).press('CapsLock');
      await page.getByRole('textbox', { name: 'School Code' }).fill('SCH20248');
      await page.getByRole('button', { name: 'Masuk' }).click();
      await page.getByRole('textbox', { name: 'Password This field is required' }).fill('081230093978');
      await page.getByRole('textbox', { name: 'School Code' }).click();
      await page.goto('http://esbeta.deanry.my.id/login');
    });

    test('Login - dengan kode sekolah kosong', async ({ page }) => {
      await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono533@gmail.com');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('081230093978');
      await page.getByRole('button', { name: 'Masuk' }).click();
      const errorMessage = await page.locator('text=The code field is required.'); // HARUSNYA PAKAI BAHASA INDONESIA AJA
      await expect(errorMessage).toBeVisible();
    });

    test('Login - Semua Field kosong', async ({ page }) => {
      await page.goto('http://esbeta.deanry.my.id/login');
      await page.getByRole('button', { name: 'Masuk' }).click();
      await page.getByRole('textbox', { name: 'Email This field is required.' }).press('ControlOrMeta+V');
      await page.getByRole('textbox', { name: 'Password This field is required' }).fill('081230093978');
      const errorMessage = await page.locator('text=The code field is required.'); // HARUSNYA PAKAI BAHASA INDONESIA AJA
      await expect(errorMessage).toBeVisible();
      await page.goto('http://esbeta.deanry.my.id/login');
    });
    
    test('Login - dengan password dan kode sekolah salah', async ({ page }) => {
      await page.goto('http://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Email' }).fill('agungcahyono533@gmail.com');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
      await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
      await page.getByRole('textbox', { name: 'School Code' }).click();
      await page.getByRole('textbox', { name: 'School Code' }).fill('SC');
      await page.getByRole('textbox', { name: 'School Code' }).press('CapsLock');
      await page.getByRole('textbox', { name: 'School Code' }).fill('SC202503');
      const errorMessage = await page.locator('text=Invalid School Identifier.'); // HARUSNYA PAKAI BAHASA INDONESIA AJA
      await expect(errorMessage).toBeVisible();
    }); 
      
    test('Login - dengan email dan password salah', async ({ page }) => {
      await page.goto('http://esbeta.deanry.my.id/login');
      await page.getByRole('button', { name: 'Masuk' }).click();
      await page.getByRole('textbox', { name: 'Email' }).fill('agungwijaya533@gmail.com');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
      await page.getByRole('textbox', { name: 'School Code' }).click();
      await page.getByRole('textbox', { name: 'School Code' }).press('CapsLock');
      await page.getByRole('textbox', { name: 'School Code' }).fill('SCH');
      await page.getByRole('textbox', { name: 'School Code' }).press('CapsLock');
      await page.getByRole('textbox', { name: 'School Code' }).fill('SCH20248');
      await page.getByRole('button', { name: 'Masuk' }).click();
      const errorMessage = await page.locator('text=Email or password is incorrect'); // HARUSNYA PAKAI BAHASA INDONESIA AJA
      await expect(errorMessage).toBeVisible();
    });
      
    test('Login - dengan email, password, dan kode sekolah salah', async ({ page }) => {
      await page.goto('http://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Email' }).fill('agungaja@gmail.com');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('123456789');
      await page.getByRole('textbox', { name: 'School Code' }).click();
      await page.getByRole('textbox', { name: 'School Code' }).press('CapsLock');
      await page.getByRole('textbox', { name: 'School Code' }).fill('SC');
      await page.getByRole('textbox', { name: 'School Code' }).press('CapsLock');
      await page.getByRole('textbox', { name: 'School Code' }).fill('SC200311');
      await page.getByRole('button', { name: 'Masuk' }).click();
      const errorMessage = await page.locator('text=Invalid School Identifier.'); // HARUSNYA PAKAI BAHASA INDONESIA AJA
      await expect(errorMessage).toBeVisible();
    });
      
    test('Login - Cek batasan panjang tiap field inputan', async ({ page }) => {
      await page.goto('http://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Email' }).click();
      await page.getByRole('textbox', { name: 'Email' }).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.');
      await page.getByRole('textbox', { name: 'School Code' }).click();
      await page.getByRole('textbox', { name: 'School Code' }).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.');
      await page.getByRole('textbox', { name: 'Email' }).click();
      await page.getByRole('textbox', { name: 'Email' }).fill('Lorem ipsum dolor sit amet, cLorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.onsectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.');
      await page.getByRole('textbox', { name: 'Email' }).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum. ');
      await page.getByRole('textbox', { name: 'Email' }).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.2Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.3Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.4Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.5Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.6Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.7Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.8');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('Lorem ipsum dolor sit amet, conse1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.2Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.ctetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.');
      await page.getByRole('textbox', { name: 'Password' }).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.');
      await page.locator('#togglePasswordShowHide span').click();
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('Lorem ipsum dolor sit amet1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.2Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.3Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.4Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.5Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.6Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.7Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.8, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.');
      await page.getByRole('textbox', { name: 'School Code' }).click();
      await page.getByRole('textbox', { name: 'School Code' }).fill('Lorem ipsum dolor sit amet, c1Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.2Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.3Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.4Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.5Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.6Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.7Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.8onsectetur adipiscing elit. Curabitur vitae dolor non neque suscipit scelerisque. Vivamus viverra, neque in aliquam elementum, est metus vehicula urna, ac fermentum mi justo sit amet odio. Integer lobortis, arcu ut dictum.');
    });  
      
    test('Login - cek tombol login apakah disable saat form kosong', async ({ page }) => {
      await page.goto('http://esbeta.deanry.my.id/login');
      await page.getByRole('button', { name: 'Masuk' }).click(); // TIDAK DISABLE SAAT FORM KOSONG
    });

    test('Login - CTA Lupa Password', async ({ page }) => {
      await page.goto('http://esbeta.deanry.my.id/login');
      await page.getByRole('button', { name: 'Masuk' }).click();
      await page.locator('.row').first().click();
      await page.getByRole('link', { name: 'Lupa Password?' }).click();
      await page.goto('http://esbeta.deanry.my.id/login');
    });

    test('Login - Show/Hide Password', async ({ page }) => {
      await page.goto('http://esbeta.deanry.my.id/login');
      await page.getByRole('textbox', { name: 'Password' }).click();
      await page.getByRole('textbox', { name: 'Password' }).fill('081230093978');
      await page.locator('#togglePasswordShowHide span').click();
      await page.locator('#togglePasswordShowHide span').click();
    });
    });