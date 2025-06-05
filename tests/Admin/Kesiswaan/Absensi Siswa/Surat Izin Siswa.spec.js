import { test, expect } from "@playwright/test";
import path from "path";

// Gunakan sesi login yang sudah tersimpan
test.use({ storageState: "adminState.json" });
test.setTimeout(120000);

test("Render dan proses surat izin siswa", async ({ page }) => {
  // Navigasi ke halaman perizinan
  await page.goto("https://esbeta.deanry.my.id/perizinan");
  await page.waitForLoadState("networkidle");
  console.log("✅ Berhasil membuka halaman perizinan");

  // Pilih semua kelas
  const filterKelas = page.locator("#filter_class_section_id");
  await filterKelas.selectOption("Semua");
  console.log("✅ Berhasil memilih semua kelas");

  // Isi tanggal awal
  const inputTanggal = page.locator("#start_date");
  await inputTanggal.fill("01-05-2025");
  await page.locator('body').click();
  console.log("✅ Berhasil memasukkan tanggal");

  // Cari nama siswa di search bar
  const searchInput = page.getByPlaceholder("Search").nth(0);
  await searchInput.click();
  await searchInput.fill("YUSUF PANGESTU");
  console.log("✅ Berhasil mencari nama siswa");

  // Tunggu hasil pencarian muncul
  await page.waitForTimeout(2000);

  // Temukan baris tabel dengan nama siswa
  const siswaRow = page.locator("tr", { hasText: "YUSUF PANGESTU" });
  await siswaRow.waitFor();

  // Klik dropdown pada baris siswa
  await siswaRow.locator("#dropdownMenuButton").click();
  console.log("✅ Baris siswa ditemukan dan dropdown diklik");

  // Klik tombol "Izinkan"
  await page.getByRole("link", { name: "Izinkan" }).click();
  await page.waitForLoadState("networkidle");
  console.log("✅ Berhasil mengizinkan surat");

  // Tambahkan jeda kecil untuk memastikan semuanya selesai
  await page.waitForTimeout(2000);
  console.log("🎉 Test selesai tanpa error");
});
