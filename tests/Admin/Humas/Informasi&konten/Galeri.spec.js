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
