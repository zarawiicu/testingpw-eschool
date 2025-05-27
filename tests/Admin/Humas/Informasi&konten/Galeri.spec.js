import { test, expect } from "@playwright/test";
import path from "path";

// Gunakan sesi login yang sudah tersimpan
test.use({ storageState: "adminState.json" });
test.setTimeout(120000); // Biarkan timeout tetap tinggi

test("Create data Galeri", async ({ page }) => {
  // membuka halaman galeri
  await page.goto("https://esbeta.deanry.my.id/gallery");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman galeri");

  // mengisi data
  await page
    .getByRole("textbox", { name: "Judul" })
    .fill(
      "SMK Negeri 8 Malang; Juara WICE 2022, Raih Penghargaan Gubernur Jatim"
    );
  await page
    .getByRole("textbox", { name: "Keterangan" })
    .fill(
      "Gubernur Jawa Timur Khofifah Indar Parawansa memberikan penghargaan kepada siswa SMK Negeri 8 Malang di Hotel Grand Mercure Malang, Senin (31/7) lalu. Penghargaan tersebut diberikan kepada Satrio Adji Purwito, siswa peraih Silver Medal (Medali Perak) dalam ajang World Invention Competition and Exhibition (WICE) 2022, IT and Robotics Category di SEGi University, Damansara, Malaysia."
    );

  // mengupload gambar
  console.log("📷 Mengunggah gambar");
  const filePath = path.resolve(process.cwd(), "smk8.jpg");
  await page.setInputFiles('input[type="file"]', filePath);
  await page.setInputFiles('input[type="file"]', filePath);
  await page.waitForLoadState("networkidle");
  console.log("berhasil upload gambar");

  // submit form
  await page.getByRole("button", { name: "Simpan" }).click();
  console.log("Berhasil Submit data");

  await page.waitForTimeout(1000);
  await page.waitForLoadState("networkidle");
  console.log("Tes selesai");
});


test("edit data galeri", async ({ page }) => {
  // 1. Buka halaman galeri
  await page.goto("https://esbeta.deanry.my.id/gallery");
  await page.waitForLoadState("networkidle");
  console.log("✅ Berhasil membuka halaman galeri");

  // 2. Temukan baris data berdasarkan isi teks
  const row = page.locator("tr", {
    hasText:
      "SMK Negeri 8 Malang; Juara WICE 2022, Raih Penghargaan Gubernur Jatim",
  });
  await expect(row).toBeVisible();

  // 3. Klik tombol dropdown pada baris tersebut
  await row.locator("#dropdownMenuButton").click();
  console.log("✅ Row tabel ditemukan dan dropdown dibuka");

  // 4. Klik tombol "Edit"
  await page.getByRole("link", { name: "Edit" }).click();
  await page.waitForLoadState("networkidle");
  console.log("✅ Modal edit dibuka");

  // 5. Tunggu input sebagai tanda modal siap
  try {
    await page.locator("#edit-title").waitFor({ state: "visible" });
    console.log("✅ Form edit tersedia");
  } catch (error) {
    await page.screenshot({ path: "error_edit_modal.png" });
    throw new Error("❌ Gagal menampilkan modal edit: #edit-title tidak ditemukan");
  }

  // 6. Isi form
  await page.locator("#edit-title").fill("Update Judul Galeri");
  await page.locator("#edit-description").fill("Update Keterangan Galeri");
  console.log("✅ Berhasil mengisi form");

  // 7. Klik tombol submit
  await page.locator('#formdata input[type="submit"]').click();
  await page.waitForLoadState("networkidle");
  console.log("✅ Berhasil submit edit");

  // 8. Tunggu sedikit agar perubahan diproses
  await page.waitForTimeout(2000);
  console.log("🎉 Test selesai");
});


test('hapus data galeri', async ({ page }) => {

  // 1. Buka halaman galeri
  await page.goto("https://esbeta.deanry.my.id/gallery");
  await page.waitForLoadState("networkidle");
  console.log("✅ Berhasil membuka halaman galeri");

   await page.getByRole("button", { name: "Refresh" }).click();
  console.log("melakukan refres tabel");

  // 2. Temukan baris data berdasarkan isi teks  
  const row = page.locator("tr", {
    hasText:
      "Update Judul Galeri",
  });

  // 3. Klik tombol dropdown pada baris tersebut
  await row.locator("#dropdownMenuButton").click();
  console.log("✅ Row tabel ditemukan dan dropdown dibuka");

  // 4. Klik tombol "Edit"
  await page.getByRole("link", { name: "Hapus" }).click();
  await page.waitForLoadState("networkidle");
  console.log("✅ klik tombol hapus");

  // klik yes pada modal delete
  await page.getByRole("button", { name: /Yes, delete it|Ya, hapus/ }).click();
  console.log("berhasil menghapus");
  // Jeda 2 detik
  await page.waitForTimeout(2000);
  console.log("tes berhasil");
});
