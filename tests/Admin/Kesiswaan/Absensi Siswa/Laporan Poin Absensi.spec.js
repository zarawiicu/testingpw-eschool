import { test, expect } from "@playwright/test";
import path from "path";

// Gunakan sesi login yang sudah tersimpan
test.use({ storageState: "adminState.json" });
test.setTimeout(120000); // Biarkan timeout tetap tinggi

test("generate kelas X", async ({ page }) => {
  // membuka halaman galeri
  await page.goto("https://esbeta.deanry.my.id/poin-attendance-recap");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman rekap poin absensi");

  //   memilih tingktan
  await page.locator("#timetable_class_reacap").selectOption("X");
  console.log("berhasil memilih Tingakatan X");

  //   memilih kelas
  await page.locator("#timetable_class_section_reacap").selectOption("Semua");
  console.log("berhasil memilih Semua");

  //   memilih semester
  await page.locator("#semester").selectOption("Semester Genap");
  console.log("berhasil memilih Semester Genap");

  //   Klik Submit
  await page.locator("#generate", { hasText: "Generate" }).click();
  console.log("berhasil Generate kelas X");

  await page.waitForTimeout(2000);
  console.log("tes berhasil");
});


test("generate kelas XI", async ({ page }) => {
  // membuka halaman galeri
  await page.goto("https://esbeta.deanry.my.id/poin-attendance-recap");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman rekap poin absensi");

  //   memilih tingktan
  await page.locator("#timetable_class_reacap").selectOption("XI");
  console.log("berhasil memilih Tingakatan XI");

  //   memilih kelas
  await page.locator("#timetable_class_section_reacap").selectOption("Semua");
  console.log("berhasil memilih Semua");

  //   memilih semester
  await page.locator("#semester").selectOption("Semester Genap");
  console.log("berhasil memilih Semester Genap");

  //   Klik Submit
  await page.locator("#generate", { hasText: "Generate" }).click();
  console.log("berhasil Generate kelas XI");

  await page.waitForTimeout(2000);
  console.log("tes berhasil");
});

test("generate kelas XII", async ({ page }) => {
  // membuka halaman galeri
  await page.goto("https://esbeta.deanry.my.id/poin-attendance-recap");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman rekap poin absensi");

  //   memilih tingktan
  await page.locator("#timetable_class_reacap").selectOption("XII");
  console.log("berhasil memilih Tingakatan XII");

  //   memilih kelas
  await page.locator("#timetable_class_section_reacap").selectOption("Semua");
  console.log("berhasil memilih Semua");

  //   memilih semester
  await page.locator("#semester").selectOption("Semester Genap");
  console.log("berhasil memilih Semester Genap");

  //   Klik Submit
  await page.locator("#generate", { hasText: "Generate" }).click();
  console.log("berhasil Generate kelas XII");

  await page.waitForTimeout(2000);
  console.log("tes berhasil");
});