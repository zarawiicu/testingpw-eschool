import { test, expect } from "@playwright/test";
import path from "path";

// Gunakan sesi login yang sudah tersimpan
test.use({ storageState: "adminState.json" });
test.setTimeout(120000);

test("test render semua angkatan", async ({ page }) => {
  await page.goto("https://esbeta.deanry.my.id/attendance-rank");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman Peringkat Poin Alpa");

  //   klik filter semua angkatan
  await page.locator("button[onclick=\"filterClass('all')\"]").click();
  console.log("berhasil klik tombol semua tingkatan");

  //   download file
  // Klik tombol dropdown-nya
  await page.locator("button.dropdown-toggle.btn-outline-theme").click();
  // Klik PDF
  await page.locator(".dropdown-menu.show >> text=PDF").click();
  console.log('berhasil download pdf')

  // klik "XLSX"
  await page.locator("button.dropdown-toggle.btn-outline-theme").click();
  await page.locator(".dropdown-menu.show >> text=XLSX").click();
  console.log('berhasil download xlsx')

  await page.waitForTimeout(2000);
  console.log("tes berhasil");
});

test("test render Kelas X", async ({ page }) => {
  await page.goto("https://esbeta.deanry.my.id/attendance-rank");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman Peringkat Poin Alpa");

  //   klik filter semua angkatan
  await page.locator("button[onclick=\"filterClass('X')\"]").click();
  console.log("berhasil klik tombol semua tingkatan");

  //   download file
  // Klik tombol dropdown-nya
  await page.locator("button.dropdown-toggle.btn-outline-theme").click();
  // Klik PDF
  await page.locator(".dropdown-menu.show >> text=PDF").click();
  console.log('berhasil download pdf')

  // klik "XLSX"
  await page.locator("button.dropdown-toggle.btn-outline-theme").click();
  await page.locator(".dropdown-menu.show >> text=XLSX").click();
  console.log('berhasil download xlsx')

  await page.waitForTimeout(2000);
  console.log("tes berhasil");
});

test("test render Kelas XI", async ({ page }) => {
  await page.goto("https://esbeta.deanry.my.id/attendance-rank");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman Peringkat Poin Alpa");

  //   klik filter semua angkatan
  await page.locator("button[onclick=\"filterClass('XI')\"]").click();
  console.log("berhasil klik tombol semua tingkatan");

  //   download file
  // Klik tombol dropdown-nya
  await page.locator("button.dropdown-toggle.btn-outline-theme").click();
  // Klik PDF
  await page.locator(".dropdown-menu.show >> text=PDF").click();
  console.log('berhasil download pdf')

  // klik "XLSX"
  await page.locator("button.dropdown-toggle.btn-outline-theme").click();
  await page.locator(".dropdown-menu.show >> text=XLSX").click();
  console.log('berhasil download xlsx')

  await page.waitForTimeout(2000);
  console.log("tes berhasil");
});

test("test render Kelas XII", async ({ page }) => {
  await page.goto("https://esbeta.deanry.my.id/attendance-rank");
  await page.waitForLoadState("networkidle");
  console.log("berhasil membuka halaman Peringkat Poin Alpa");

  //   klik filter semua angkatan
  await page.locator("button[onclick=\"filterClass('XII')\"]").click();
  console.log("berhasil klik tombol semua tingkatan");

  //   download file
  // Klik tombol dropdown-nya
  await page.locator("button.dropdown-toggle.btn-outline-theme").click();
  // Klik PDF
  await page.locator(".dropdown-menu.show >> text=PDF").click();
  console.log('berhasil download pdf')

  // klik "XLSX"
  await page.locator("button.dropdown-toggle.btn-outline-theme").click();
  await page.locator(".dropdown-menu.show >> text=XLSX").click();
  console.log('berhasil download xlsx')

  await page.waitForTimeout(2000);
  console.log("tes berhasil");
});