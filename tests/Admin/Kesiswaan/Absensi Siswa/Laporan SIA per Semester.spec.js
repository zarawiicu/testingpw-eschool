import { test, expect } from "@playwright/test";
import path from "path";

// Gunakan sesi login yang sudah tersimpan
test.use({ storageState: "adminState.json" });
test.setTimeout(120000); // Biarkan timeout tetap tinggi

test("Test Generate Tingkat X", async ({ page }) => {
  await page.goto("https://esbeta.deanry.my.id/admin-semester-recap");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman laporan SIA Persemester");

//   Select Kelas X
  await page.locator('#timetable_class_reacap').selectOption('X');
  console.log('Berhasil Select Kelas X');

    //   Klik Submit
  await page.locator("#generate", { hasText: "Generate" }).click();
  console.log("berhasil Generate kelas X");

  await page.waitForTimeout(2000);
  console.log("tes berhasil");

});
test("Test Generate Tingkat XI", async ({ page }) => {
  await page.goto("https://esbeta.deanry.my.id/admin-semester-recap");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman laporan SIA Persemester");

//   Select Kelas X
  await page.locator('#timetable_class_reacap').selectOption('XI');
  console.log('Berhasil Select Kelas XI');

    //   Klik Submit
  await page.locator("#generate", { hasText: "Generate" }).click();
  console.log("berhasil Generate kelas XI");

  await page.waitForTimeout(2000);
  console.log("tes berhasil");

});
test("Test Generate Tingkat XII", async ({ page }) => {
  await page.goto("https://esbeta.deanry.my.id/admin-semester-recap");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman laporan SIA Persemester");

//   Select Kelas X
  await page.locator('#timetable_class_reacap').selectOption('XII');
  console.log('Berhasil Select Kelas XII');

    //   Klik Submit
  await page.locator("#generate", { hasText: "Generate" }).click();
  console.log("berhasil Generate kelas XII");

  await page.waitForTimeout(2000);
  console.log("tes berhasil");
});
