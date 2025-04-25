import { test, expect } from "@playwright/test";

test.setTimeout(120000); // biar ngak error jangan di ubah

// import data login
test.use({ storageState: "adminState.json" });


test("Dashboard Tes", async ({ page }) => {

  // Membuka Halaman Dashboard
  const openDashboard = async () => {
    console.log("➡️ Membuka dashboard...");
    await page.goto("https://esbeta.deanry.my.id/dashboard", {
      waitUntil: "commit",
      timeout: 60000,
    });
    await page.waitForTimeout(2000); // waktu stabilisasi ringan
    await expect(page).toHaveURL(/.*dashboard/);
    console.log("✅ Dashboard terbuka");
  };

  // melakukan Perulangan
  const testCardNavigation = async (onclickPath, expectedURLPart) => {
    const card = page.locator(`[onclick*="${onclickPath}"]`);

    // fungsi klik card
    console.log(`🟢 Klik card: ${onclickPath}`);
    await card.scrollIntoViewIfNeeded();
    await card.click({ timeout: 60000 });

    // menungguh halaman
    console.log(`🔍 Menunggu redirect ke: ${expectedURLPart}`);
    await page.waitForURL(`**/${expectedURLPart}`, { timeout: 60000 });
    console.log(`✅ Berhasil ke: ${page.url()}`);

    // kembali kedashboard
    const backBtn = page.locator('a[href="/dashboard"], [onclick*="/dashboard"]');
    if (await backBtn.first().isVisible()) {
      console.log("↩️ Klik tombol kembali");
      await backBtn.first().click();
      await page.waitForURL("**/dashboard", { timeout: 60000 });
    } else {
      console.warn("⚠️ Tombol kembali tidak ditemukan, fallback dengan goto");
      await openDashboard();
    }

    await page.waitForTimeout(2000); //stabilitas
  };

  // link 
  await openDashboard();
  await testCardNavigation("/teachers", "teachers");
  await testCardNavigation("/guardian", "guardian");
  await testCardNavigation("/class", "class");
  await testCardNavigation("/stream", "stream"); // opsional

  // End ke dashboard
  await openDashboard();
  console.log("🏁 Semua test selesai di dashboard");
});

// farhan
