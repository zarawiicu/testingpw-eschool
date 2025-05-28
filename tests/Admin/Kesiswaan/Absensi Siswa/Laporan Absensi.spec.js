import { test, expect } from "@playwright/test";
import path from "path";

// Gunakan sesi login yang sudah tersimpan
test.use({ storageState: "adminState.json" });
test.setTimeout(120000);

test("generate kelas X", async ({ page }) => {
  // membuka halaman galeri
  await page.goto("https://esbeta.deanry.my.id/recap-attendance");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman rekap poin absensi");

  //   memilih tingktan
  await page.locator("#timetable_class_reacap").selectOption("X");
  console.log("berhasil memilih Tingakatan X");

  //   memilih kelas
  await page.locator("#timetable_class_section_reacap").selectOption("Semua");
  console.log("berhasil memilih Semua");

  //   memilih semester
  await page.locator("#month").selectOption("Mei");
  console.log("berhasil memilih bulan mei");

  //   Klik Submit
  await page.locator("#generateButton", { hasText: "Generate" }).click();
  console.log("berhasil Generate kelas X");

  await page.waitForTimeout(2000);
  console.log("tes berhasil");
});

// tes kelas XI
test("generate kelas XI", async ({ page }) => {
  // membuka halaman galeri
  await page.goto("https://esbeta.deanry.my.id/recap-attendance");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman rekap poin absensi");

  //   memilih tingktan
  await page.locator("#timetable_class_reacap").selectOption("XI");
  console.log("berhasil memilih Tingakatan XI");

  //   memilih kelas
  await page
    .locator("#timetable_class_section_reacap")
    .selectOption("XI TKJ C");
  console.log("berhasil memilih kelas XI TKJ C");

  //   memilih semester
  await page.locator("#month").selectOption("Maret");
  console.log("berhasil memilih bulan maret");

  //   Klik Submit
  await page.locator("#generateButton", { hasText: "Generate" }).click();
  console.log("berhasil Generate kelas XI");

  await page.waitForTimeout(2000);
  console.log("tes berhasil");
});

// tes kelas XII
test("generate kelas XII", async ({ page }) => {
  // membuka halaman galeri
  await page.goto("https://esbeta.deanry.my.id/recap-attendance");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman rekap poin absensi");

  //   memilih tingktan
  await page.locator("#timetable_class_reacap").selectOption("XII");
  console.log("berhasil memilih Tingakatan XII");

  //   memilih kelas
  await page
    .locator("#timetable_class_section_reacap")
    .selectOption("XII RPL B");
  console.log("berhasil memilih kelas XII RPL B");

  //   memilih semester
  await page.locator("#month").selectOption("Maret");
  console.log("berhasil memilih bulan maret");

  //   Klik Submit
  await page.locator("#generateButton", { hasText: "Generate" }).click();
  console.log("berhasil Generate kelas XII");

  await page.waitForTimeout(2000);
  console.log("tes berhasil");
});

test("input dan hapus nilai absensi", async ({ page }) => {
  // Buka halaman rekap absensi
  await page.goto("https://esbeta.deanry.my.id/recap-attendance");
  await page.waitForLoadState("networkidle");
  console.log("✅ Berhasil membuka halaman rekap absensi");

  // Pilih tingkatan, kelas, dan bulan
  await page.locator("#timetable_class_reacap").selectOption("X");
  await page.locator("#timetable_class_section_reacap").selectOption("X ELIN A");
  await page.locator("#month").selectOption("Mei");
  console.log("✅ Berhasil memilih tingkatan, kelas, dan bulan");

  // Klik tombol generate
  await page.locator("#generateButton", { hasText: "Generate" }).click();
  console.log("✅ Berhasil klik tombol Generate");

  // Klik kolom input nilai di kolom ke-33
  const kolomNilai = page.locator("td:nth-child(33) > .clickable > div").first();
  await kolomNilai.click();
  console.log("✅ Kolom nilai diklik");
  
  // Isi nilai absen "S8"
  const inputNilai = page.locator("td:nth-child(33) input[type='text']").first();
  await inputNilai.waitFor({ state: "visible" });
  await inputNilai.fill("S8");
  await inputNilai.press("Enter");
  console.log("✅ Nilai 'S8' berhasil diinput");

  // Tunggu notifikasi toast success muncul
  await page.locator(".jq-toast-single.jq-icon-success").waitFor({ state: "visible" });
  console.log("✅ Toast success muncul setelah input");

    await page.waitForTimeout(10000);
  // Hapus nilai yang sudah diinput
  await kolomNilai.click();
  await inputNilai.waitFor({ state: "visible" });
  await inputNilai.fill("");
  await inputNilai.press("Enter");
  console.log("✅ Nilai berhasil dihapus");

  // Tunggu toast success lagi
  await page.locator(".jq-toast-single.jq-icon-success").waitFor({ state: "visible" });
  console.log("✅ Toast success muncul setelah penghapusan nilai");

  // Delay akhir (opsional)
  await page.waitForTimeout(2000);
  console.log("✅ Test selesai");
});

