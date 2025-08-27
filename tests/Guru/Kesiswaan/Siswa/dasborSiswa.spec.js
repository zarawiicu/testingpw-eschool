import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Kesiswaan - Siswa", () => {

// Gunakan state login dari guru
test.use({ storageState: 'guruState.json' });

test('Dasbor siswa', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kesiswaan ' }).click();
  await page.getByRole('link', { name: ' Siswa ' }).click();
  await page.getByRole('link', { name: 'Dasbor Siswa' }).click();
  await page.locator('form').filter({ hasText: 'Siswa' }).locator('div').nth(3).click();
  await page.getByRole('link', { name: 'Dasbor Siswa' }).click();
  await page.locator('form').filter({ hasText: '801 Aktif' }).locator('div').nth(1).click();
  await page.getByRole('link', { name: 'Dasbor Siswa' }).click();
  await page.locator('form').filter({ hasText: 'Tidak Aktif' }).locator('div').nth(1).click();
  await page.getByRole('link', { name: 'Dasbor Siswa' }).click();
  await page.locator('div > .card-redirect > .d-flex').click();
  await page.getByRole('link', { name: ' Siswa ' }).click();
  await page.getByRole('link', { name: 'Dasbor Siswa' }).click();
  await page.locator('#SvgjsSvg1006').getByText('Tidak Aktif').click();
  await page.locator('#SvgjsSvg1006').getByText('Aktif', { exact: true }).click();
  await page.getByText('Perempuan').click();
  await page.getByText('Laki-laki', { exact: true }).click();
  await page.getByText('XI', { exact: true }).click();
  await page.getByText('XII', { exact: true }).click();
  await page.getByText('TKJ', { exact: true }).click();
  await page.getByText('METRO', { exact: true }).click();
  await page.getByText('RPL', { exact: true }).click();
  await page.getByText('ELIN', { exact: true }).click();
});
});