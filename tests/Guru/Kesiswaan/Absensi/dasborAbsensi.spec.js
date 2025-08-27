import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Kesiswaan - Absensi", () => {

// Gunakan state login dari guru
test.use({ storageState: 'guruState.json' });

test('Dasbor Absensi', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page3.getByRole('link', { name: ' Kesiswaan ' }).click();
  await page3.getByRole('link', { name: ' Absensi ' }).click();
  const page4Promise = page3.waitForEvent('popup');
  await page3.getByRole('link', { name: 'Dasbor Absensi' }).click();
  const page4 = await page4Promise;
  await page4.locator('form').filter({ hasText: 'Absensi Siswa' }).locator('div').nth(1).click();
  await page4.getByLabel('Absensi').selectOption('3');
  await page4.goto('https://esbeta.deanry.my.id/attendance/dashboard');
  await page4.getByRole('heading', { name: 'Surat Izin Siswa' }).click();
  await page4.goto('https://esbeta.deanry.my.id/attendance/dashboard');
  await page4.getByRole('link', { name: 'to page 2' }).click();
  await page4.getByRole('link', { name: 'to page 5' }).click();
  await page4.getByRole('link', { name: 'next page' }).click();
  await page4.getByRole('link', { name: 'next page' }).click();
  await page4.getByRole('link', { name: 'previous page' }).click();
  await page4.getByRole('link', { name: 'previous page' }).click();
  await page4.getByRole('button', { name: '5' }).click();
  await page4.getByRole('link', { name: '10' }).click();
  await page4.getByRole('link', { name: 'to page 1' }).click();
  await page4.getByRole('link', { name: 'to page 2' }).click();
});
});