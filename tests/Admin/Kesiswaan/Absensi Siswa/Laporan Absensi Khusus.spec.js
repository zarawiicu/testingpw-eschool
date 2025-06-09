import { test, expect } from "@playwright/test";
import path from "path";

// Gunakan sesi login yang sudah tersimpan
test.use({ storageState: "adminState.json" });
test.setTimeout(120000);

test("tes generate laporan absensi khusus", async ({ page }) => {
  await page.goto("https://esbeta.deanry.my.id/attendance/view-attendance");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman laporan absensi khusus");

  //   select kelas
  await page
    .locator("#timetable_class_section")
    .selectOption({ label: "XII TKJ B" });
  console.log("berhasil pilih kelas XII TKJ B");

  // Isi tanggal awal
  const inputTanggal = page.locator("#start_date");
  await inputTanggal.fill("01-05-2025");
  await page.locator("body").click();
  console.log("✅ Berhasil memasukkan tanggal 01-05-2025");

  //   pilih status absensi
  await page.locator("#attendance_type").selectOption("Semua");
  console.log("berhasil pilih absensi semua");

  await page.waitForLoadState("networkidle");

  // Cari nama siswa di search bar
  const searchInput = page.getByPlaceholder("Search").nth(0);
  await searchInput.click();
  await searchInput.fill("YUSUF PANGESTU");
  console.log("✅ Berhasil mencari nama siswa");

  // Tambahkan jeda kecil untuk memastikan semuanya selesai
  await page.waitForTimeout(2000);
  console.log("🎉 Test selesai");
});
