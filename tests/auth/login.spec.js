import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://esbeta.deanry.my.id/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('adminsmk9malang@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('0341479148');
  await page.getByRole('textbox', { name: 'School Code' }).click();
  await page.getByRole('textbox', { name: 'School Code' }).fill('SCH20248');
  await page.getByRole('textbox', { name: 'School Code' }).press('Enter');
  await page.getByRole('button', { name: 'Masuk' }).click();
  await page.goto('https://esbeta.deanry.my.id/dashboard');
});