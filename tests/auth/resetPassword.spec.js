import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Coba Reset Password", () => {
  test("Form Lupa Password", async ({ page }) => {
    // Akses halaman utama
    await page.goto("https://esbeta.deanry.my.id/", {
      waitUntil: "networkidle",
    });

    // Klik Lupa Password
    await page.getByRole("link", { name: "Lupa Password?" }).click();
    await page.waitForTimeout(1000);

    // Masukkan kode sekolah
    await page
      .getByRole("textbox", { name: "Enter School Code" })
      .press("CapsLock");
    await page.waitForTimeout(300);
    await page
      .getByRole("textbox", { name: "Enter School Code" })
      .fill("SCH20248");
    await page.waitForTimeout(800);

    // Masukkan email
    await page.getByRole("textbox", { name: "Enter Email" }).click();
    await page.waitForTimeout(300);
    await page
      .getByRole("textbox", { name: "Enter Email" })
      .fill("afif@gmail.com");
    await page.waitForTimeout(1000);

    // Klik tombol "Reset Password"
    await page.getByRole("button", { name: "Reset Password" }).click();
  });

  // TEST CASE ERROR
  test('Reset password - semua fild kosong', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Lupa Password?' }).click();
    await page.getByRole('button', { name: 'Reset Password' }).click();
    const namaValidation = await page
      .locator('input[name="email"]')
      .evaluate((el) => el.validationMessage);
    expect(namaValidation).toContain("Please fill out this field");
  });

  test('Reset Password - Masukkan email invalid', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Lupa Password?' }).click();
    await page.getByRole('button', { name: 'Reset Password' }).click();
    await page.getByRole('textbox', { name: 'Enter Email' }).click();
    await page.getByRole('textbox', { name: 'Enter Email' }).fill('smkn1000malang.com');
    const emailnonvalid = await page
      .locator('input[name="email"]')
      .evaluate((el) => el.validationMessage);
    expect(emailnonvalid).toContain(
      "Please include an '@' in the email address. 'smkn1000malang.com' is missing an '@'."
    );
  });

  test('Reset Password - Isi email & kosongi kode sekolah', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Lupa Password?' }).click();
    await page.getByRole('textbox', { name: 'Enter Email' }).fill('smkn1000malang.com');
    await page.getByRole('button', { name: 'Reset Password' }).click();
    const errorMessage = await page.locator(
      "text=We can't find a user with that email address."
    ); // HARUSNYA PAKAI BAHASA INDONESIA AJA
    await expect(errorMessage).toBeVisible();
  });

  test('Reset Password - Isi kode sekolah & kosongi email', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Lupa Password?' }).click();
    await page.getByRole('textbox', { name: 'Enter School Code' }).fill('SCH20248');
    await page.getByRole('button', { name: 'Reset Password' }).click();
    const namaValidation = await page
      .locator('input[name="email"]')
      .evaluate((el) => el.validationMessage);
    expect(namaValidation).toContain("Please fill out this field");
  });

  test('Reset Password - dengan email yang tidak terdaftar', async ({ page }) => {
    await page.goto('https://esbeta.deanry.my.id/');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Lupa Password?' }).click();
    await page.getByRole('textbox', { name: 'Enter School Code' }).fill('SCH20248');
    await page.getByRole('textbox', { name: 'Enter Email' }).fill('smkn2000mlg@gmail.com');
    await page.getByRole('button', { name: 'Reset Password' }).click();
    const errorMessage = await page.locator(
      "text=We can't find a user with that email address."
    ); // HARUSNYA PAKAI BAHASA INDONESIA AJA
    await expect(errorMessage).toBeVisible();
  });
});
