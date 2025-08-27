import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Tes Kurikulum - Ujian Online", () => {
// Gunakan sesi login guru yang sudah disimpan
test.use({ storageState: 'guruState.json' });

test('test Dasbor Ujian Online', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Ujian Online ' }).click();
  await page.getByRole('link', { name: 'Dasbor', exact: true }).click();

  //Filter tahun ajaran
  await page.locator('#session_year_filter').selectOption('1');

  //filter kelas
  await page.locator('#class_filter').selectOption('25');
  await page.locator('#class_filter').selectOption('0');

  //filter status
  await page.locator('#status_filter').selectOption('all'); //Semua
  await page.locator('#status_filter').selectOption('active'); //aktif (Sedang berlangsung)
  await page.locator('#status_filter').selectOption('upcoming'); //mendatang
  await page.locator('#status_filter').selectOption('completed'); //Selesai

  //Diagram donat
  await page.locator('#SvgjsPath1518').click();
  await page.locator('#SvgjsSvg1506').getByText('Sedang Berlangsung').click();
  await page.locator('span').filter({ hasText: 'Sedang Berlangsung' }).click();
  await page.locator('#SvgjsSvg1506').getByText('Selesai').click();
  await page.locator('body').press('ControlOrMeta+r');
  await page.getByRole('button', { name: '' }).click();
});
});