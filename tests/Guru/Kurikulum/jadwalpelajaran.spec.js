import { test, expect } from '@playwright/test';
test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Tes Kurikulum  jadwal pelajaran", () => {
// Gunakan sesi login guru yang sudah disimpan
test.use({ storageState: 'guruState.json' });

test('tampilan jadwal pelajaran', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/dashboard');
  await page.getByRole('link', { name: ' Kurikulum ' }).click();
  await page.getByRole('link', { name: ' Jadwal Pelajaran' }).click();
  await page.goto('https://esbeta.deanry.my.id/timetable/teacher/show/9');
  await page.locator('a').filter({ hasText: ':20 - 09:00MULOK PJOKXI TKJ B' }).dblclick();
  await page.locator('a').filter({ hasText: ':00 - 08:30MULOK PJOKXII TKJ A' }).dblclick();
  await page.locator('a').filter({ hasText: ':15 - 08:40MULOK PJOKXII RPL D' }).click();
  await page.locator('a').filter({ hasText: '09:45 - 11:05MULOK PJOKXII' }).dblclick();
  await page.locator('a').filter({ hasText: '09:45 - 11:05MULOK PJOKXII' }).click();
});
});