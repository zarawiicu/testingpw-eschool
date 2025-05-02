import { test, expect } from "@playwright/test";

// Gunakan sesi login yang sudah tersimpan
test.use({ storageState: "adminState.json" });
test.setTimeout(120000); // Biarkan timeout tetap tinggi

test("Create Hari libur", async ({ page }) => {
  // membuka halaman Hari
  await page.goto("https://esbeta.deanry.my.id/holiday");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman pemberitahuan");

  //   mengisi data form

  await page.getByRole("textbox", { name: "Judul" }).fill("Minggu Libur");
  await page
    .getByRole("textbox", { name: "Keterangan" })
    .fill(
      'Bagi umat Kristen, hari Minggu bermakna sebagai hari suci, hari istirahat, dan hari kebangkitan. Umat Kristen mula-mula tetap mengamalkan Sabat pada hari Sabtu sekaligus merayakan "pemecahan roti" pada hari Minggu, yang dilakukan untuk mengenang Kebangkitan Yesus yang terjadi pada "hari pertama minggu itu".'
    );
  console.log("berhasil mengisi data judul & keterangan");
  //   logika date
  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);

  // Format date
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const todayStr = formatDate(today);
  const threeDaysLaterStr = formatDate(threeDaysLater);

  // Mengisi input tanggal di form create
  await page
    .locator('#create-form input[name="start_date"]')
    .evaluate((el, value) => {
      el.value = value;
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }, todayStr);

  await page
    .locator('#create-form input[name="end_date"]')
    .evaluate((el, value) => {
      el.value = value;
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }, threeDaysLaterStr);

  console.log("berhasil mengisi data tanggal");

  //   klik submit

  await page.getByRole("button", { name: "Simpan" }).click();
  await page.waitForLoadState("networkidle");
  console.log("Submit Berhasil");

  await page.waitForTimeout(5000);

  console.log("Tes selesai");
});

test("Edit Hari Libur", async ({ page }) => {
  // membuka halaman Hari
  await page.goto("https://esbeta.deanry.my.id/holiday");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman pemberitahuan");

  //  memilih data tabel
  await page
    .getByRole("row", { name: "Minggu Libur" })
    .locator("#dropdownMenuButton")
    .click();
  console.log("row tabel ditemukan");

  // membuka modal edit
  await page.getByRole("link", { name: "Edit" }).click();
  await page.waitForLoadState("networkidle");
  console.log("membuka edit panel");

  // mengubah isi form
  await page.getByRole('textbox', { name: ''})
});
