import { test, expect } from "@playwright/test";
import path from "path";

// Gunakan sesi login yang sudah tersimpan
test.use({ storageState: "adminState.json" });
test.setTimeout(120000); // Biarkan timeout tetap tinggi

test("Buat Pengumuman Baru", async ({ page }) => {
  // Navigasi ke halaman pengumuman
  await page.goto("https://esbeta.deanry.my.id/announcement");
  await page.waitForLoadState("networkidle");
  console.log("✅ Berhasil membuka halaman Pengumuman");

  // Data pengumuman
  const judul = "Sholatlah Jumat";
  const deskripsi = `Allah Maha Besar, Allah Maha Besar
Aku menyaksikan bahwa tiada Tuhan selain Allah
Aku menyaksikan bahwa nabi Muhammad itu adalah utusan Allah
Marilah Sholat
Marilah menuju kepada kejayaan
Allah Maha Besar, Allah Maha Besar
Tiada Tuhan selain Allah`;

  // Isi form pengumuman
  console.log("📝 Mengisi form pengumuman");
  await page.getByRole("textbox", { name: "Judul" }).fill("Sholatlah Jumat");
  await page.getByRole("textbox", { name: "Keterangan" }).fill(deskripsi);

  // Upload gambar
  console.log("📷 Mengunggah gambar");
  const filePath = path.resolve(process.cwd(), "sholat.jpg");
  await page.setInputFiles("#uploadInput", filePath);

  // Klik tombol "Unggah" (kalau memang perlu untuk proses upload)
  // await page.getByRole("button", { name: "Unggah" }).click();

  // Pilih kelas
  console.log("🏷️ Memilih kelas");
  await page.getByRole("combobox").click();
  await page.getByRole("treeitem", { name: "XII RPL D" }).click();

  // Simpan pengumuman
  console.log("💾 Menyimpan pengumuman");
  await page.getByRole("button", { name: "Simpan" }).click();

  // Verifikasi apakah pengumuman muncul di daftar
  console.log("🔍 Verifikasi pengumuman di daftar");
  const row = page.getByRole("row", { name: new RegExp(judul, "i") });
  await expect(row).toBeVisible();

  // Klik dropdown jika diperlukan
  await row.locator("#dropdownMenuButton").click();
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);
  console.log("✅ Test selesai");
});

test("edit pengumuman", async ({ page }) => {
  // membuka halaman pengumuman
  await page.goto("https://esbeta.deanry.my.id/announcement");
  await page.waitForLoadState("networkidle");
  console.log("Berhasil Membuka Halaman");

  //  mencari data yang diedit
  await page.getByRole("button", { name: "Refresh" }).click();
  console.log("melakukan refres tabel");
  await page
    .getByRole("row", { name: "1 Sholatlah Jumat" })
    .locator("#dropdownMenuButton")
    .click();
  await page.getByRole("link", { name: "Edit" }).click();
  await page.waitForLoadState("networkidle");
  console.log("membuka edit panel");

  // mengubah isi
  await page
    .getByRole("dialog", { name: "Edit Pengumuman" })
    .getByPlaceholder("Judul")
    .click();
  await page
    .getByRole("dialog", { name: "Edit Pengumuman" })
    .getByPlaceholder("Judul")
    .fill("Sholatlah Jumat, Update");
  console.log("mengubah judul");

  await page
    .getByRole("dialog", { name: "Edit Pengumuman" })
    .getByPlaceholder("Keterangan")
    .click();
  await page
    .getByRole("dialog", { name: "Edit Pengumuman" })
    .getByPlaceholder("Keterangan")
    .fill(
      "Kaum Muslimin jama’ah masjid Al-Ikhlash yang di rohmati Allah SWT\n\nMohon maaf atas terganggunya dzikir dan ibadah  hadirin sekalian , sehubungan akan dibacakannya beberapa pengumuman sebagai berikut :\n\n \n\n Waktu sholat jum’at di masjid Al-Ikhlash Sindangsari pada hari  ini : Jum’at  tanggal ……………………………143.., bertepatan dengan  tgl ……………..  201.. jatuh pada pukul ……        .WIB\n\n \n\nYang akan bertindak sebagai Imam dan Khotib adalah ……………………….,  sedangkan Bilal dan Mu’adzin akan dikumandangkan oleh ………………\n\n \n\n Penerimaan kotak amal pada hari jum’at yang lalu adalah sebesar Rp. …………………….., kami atas nama Pengurus DKM Al-Ikhlash menghaturkan terima kasih atas kepercayaan yang telah diberikan jama’ah dengan ucapan jazakallohu khoiron katsiro\n\n \n\nKepada para jama’ah dipersilahkan untuk merapatkan barisan dan mengisi shof di depannya  yang masih kosong  terlebih dahulu agar dapat memberikan kemudahan kepada jama’ah yang  baru datang\n\n \n\nYang terakhir , Kepada  bapak – bapak yang berada di lantai atas dimohon bantuannya untuk menertibkan  anak-anak dan remaja, agar dapat menjaga ketertiban dan tidak membuat keributan ketika khotib sedang berkhutbah ,sehingga ibadah sholat jum’at kita dapat  terjaga kekhusyuannya\n\n \n\nDemikian beberapa informasi dan himbauan yang dapat kami sampaikan.  Atas perhatian dan kerjasamanya diucapkan terimakasih"
    );
  console.log("mengubah isi pengumuman");

  // klik submit
  await page
    .getByRole("dialog", { name: "Edit Pengumuman" })
    .locator('input[type="submit"]')
    .click();
  await page.waitForLoadState("networkidle");
  console.log("berhasil mengirim");
  await page.waitForTimeout(2000);
  console.log("tes selesai");
});

test("Hapus Pengumuman", async ({ page }) => {
  

  // buka halaman
  await page.goto("https://esbeta.deanry.my.id/announcement");
  await page.waitForLoadState("networkidle");
  console.log("Berhasil Membuka Halaman");

  // melakukan akis delete
  await page.getByRole("button", { name: "Refresh" }).click();
  console.log("melakukan refres tabel");
  await page
    .getByRole("row", { name: "1 Sholatlah Jumat, Update" })
    .locator("#dropdownMenuButton")
    .click();
  await page.getByRole("link", { name: "Hapus" }).click();
  await page.waitForLoadState("networkidle");

  // klik yes pada modal delete
  await page.getByRole("button", { name: /Yes, delete it|Ya, hapus/ }).click();
  console.log("berhasil menghapus");
  // Jeda 2 detik
  await page.waitForTimeout(2000);
  console.log("tes berhasil");
});
