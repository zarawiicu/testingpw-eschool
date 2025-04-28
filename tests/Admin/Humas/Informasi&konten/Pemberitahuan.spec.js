import { test, expect } from "@playwright/test";
import path from "path";

// Gunakan sesi login yang sudah tersimpan
test.use({ storageState: "adminState.json" });
test.setTimeout(120000); // Biarkan timeout tetap tinggi

test("create pemberitahuan", async ({ page }) => {
  // membuka halaman pemberitahuan
  await page.goto("https://esbeta.deanry.my.id/notifications");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman pemberitahuan");

  // mengisi form pengumuman
  await page.getByRole("textbox", { name: "Judul" }).fill("Apakah Anda Tahu?");
  await page
    .getByRole("textbox", { name: "pesan" })
    .fill(
      "Tahu memiliki banyak manfaat bagi kesehatan, terutama karena kandungan protein nabati, serat, isoflavon, dan antioksidan yang tinggi. Manfaat ini meliputi penurunan risiko penyakit jantung, kanker, diabetes, dan peningkatan kesehatan tulang, otak, dan pencernaan"
    );
  console.log("selesai mengisi form");

  // Upload gambar
  console.log("📷 Mengunggah gambar");
  const filePath = path.resolve(process.cwd(), "tahu.jpeg");
  await page.setInputFiles('input[type="file"]', filePath);

  await page.waitForLoadState("networkidle");
  console.log("berhasil upload gambar");

  // klik tombol submit
  await page.getByRole("button", { name: "Simpan" }).click();
  await page.waitForLoadState("networkidle");
  console.log("berhasil menyimpan");
  await page.waitForTimeout(2000)
  console.log("tes selesai");
});

test("hapus pemberitahuan", async ({ page }) => {
  // membuka halaman pemberitahuan
  await page.goto("https://esbeta.deanry.my.id/notifications");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman pemberitahuan");

  //   mecari data row yang sesuai
  await page.getByRole("button", { name: "Refresh" }).click();
  console.log("melakukan refres tabel");
  await page
    .getByRole("row", { name: "Apakah Anda Tahu?" })
    .locator("#dropdownMenuButton")
    .click();
  await page.getByRole("link", { name: "hapus" }).click();
  await page.waitForLoadState("networkidle");
  console.log("menghapus data");
  await page.getByRole("button", { name: /Yes, delete it|Ya, hapus/ }).click();
  console.log("berhasil menghapus");
  console.log("tes berhasil");
//    
});
