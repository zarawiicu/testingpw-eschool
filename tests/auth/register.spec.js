import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Coba Register", () => {
  test("Register / Form Uji Coba / Daftar Sekolah", async ({ page }) => {
    // Akses halaman utama
    await page.goto("https://esbeta.deanry.my.id/", {
      waitUntil: "networkidle",
    });

    // Klik tombol "Uji Coba"
    await page.getByRole("button", { name: "Uji Coba" }).click();
    await page.waitForTimeout(1000);

    // Isi data sekolah
    await page.getByRole("textbox", { name: "Nama *" }).fill("SMKN 120 Malang");
    await page.waitForTimeout(500);
    await page
      .getByRole("textbox", { name: "Masukkan Email Sekolah Anda" })
      .fill("smkn120malang@gmail.com");
    await page.waitForTimeout(500);
    await page.getByRole("textbox", { name: "No Hp *" }).fill("087699315678");
    await page.waitForTimeout(500);
    await page.getByRole("textbox", { name: "Alamat *" }).fill("Malang");
    await page.waitForTimeout(500);
    await page.getByRole("textbox", { name: "Slogan *" }).fill("SMK Bisa");
    await page.waitForTimeout(1000);

    // Isi data admin (perwakilan sekolah)
    await page
      .getByRole("textbox", { name: "Masukkan Nama Depan Anda" })
      .fill("Aurel");
    await page.waitForTimeout(500);
    await page.getByRole("textbox", { name: "Nama Belakang *" }).fill("Ayu");
    await page.waitForTimeout(500);
    await page
      .getByRole("textbox", { name: "Email *" })
      .fill("aurel@gmail.com");
    await page.waitForTimeout(500);
    await page.getByRole("textbox", { name: "Kontak *" }).fill("086613562233");
    await page.waitForTimeout(1000);

    // Kirim form
    await page.getByRole("button", { name: "Simpan" }).click();
  });

  // ERROR TEST CASE
  test("Register - dengan form kosong semua", async ({ page }) => {
    await page.goto("https://esbeta.deanry.my.id/", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Daftarkan Sekolah Anda" }).click();
    await page.getByRole("button", { name: "Close" }).click();
    await page.getByRole("button", { name: "Daftarkan Sekolah Anda" }).click();
    await page.getByRole("button", { name: "Simpan" }).click();
    const namaValidation = await page
      .locator('input[name="school_name"]')
      .evaluate((el) => el.validationMessage);
    expect(namaValidation).toContain("Please fill out this field");
  });

  test("Register - hanya mengisi nama", async ({ page }) => {
    await page.goto("https://esbeta.deanry.my.id/", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Daftarkan Sekolah Anda" }).click();
    await page.getByRole("textbox", { name: "Nama *" }).fill("SMKN 300 Malang");
    await page.getByRole("button", { name: "Simpan" }).click();
    const emailsValidation = await page
      .locator('input[name="school_support_email"]')
      .evaluate((el) => el.validationMessage);
    expect(emailsValidation).toContain("Please fill out this field");
  });

  test("Register - hanya isi nama dan email", async ({ page }) => {
    await page.goto("https://esbeta.deanry.my.id/", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Daftarkan Sekolah Anda" }).click();
    await page.getByRole("textbox", { name: "Nama *" }).fill("SMKN 300 Malang");
    await page
      .getByRole("textbox", { name: "Masukkan Email Sekolah Anda" })
      .fill("smkn300malang@gmail.com");
    await page.getByRole("button", { name: "Simpan" }).click();
    const nohpValidation = await page
      .locator('input[name="school_support_phone"]')
      .evaluate((el) => el.validationMessage);
    expect(nohpValidation).toContain("Please fill out this field");
  });

  test("Register - hanya isi nama,email, dan no hp", async ({ page }) => {
    await page.goto("https://esbeta.deanry.my.id/", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Daftarkan Sekolah Anda" }).click();
    await page.getByRole("textbox", { name: "Nama *" }).fill("SMKN 300 Malang");
    await page
      .getByRole("textbox", { name: "Masukkan Email Sekolah Anda" })
      .fill("smkn300malang@gmail.com");
    await page.getByRole("textbox", { name: "No Hp *" }).fill("087754321234");
    await page.getByRole("button", { name: "Simpan" }).click();
    const alamatValidation = await page
      .locator('input[name="school_address"]')
      .evaluate((el) => el.validationMessage);
    expect(alamatValidation).toContain("Please fill out this field");
  });

  test("Register - hanya isi nama,email, no hp, dan alamat", async ({
    page,
  }) => {
    await page.goto("https://esbeta.deanry.my.id/", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Daftarkan Sekolah Anda" }).click();
    await page.getByRole("textbox", { name: "Nama *" }).fill("SMKN 300 Malang");
    await page
      .getByRole("textbox", { name: "Masukkan Email Sekolah Anda" })
      .fill("smkn300malang@gmail.com");
    await page.getByRole("textbox", { name: "No Hp *" }).fill("087754321234");
    await page.getByRole("textbox", { name: "Alamat *" }).fill("Jl terikat");
    await page.getByRole("button", { name: "Simpan" }).click();
    const sloganValidation = await page
      .locator('input[name="school_tagline"]')
      .evaluate((el) => el.validationMessage);
    expect(sloganValidation).toContain("Please fill out this field");
  });

  test("Register - hanya isi nama,email, no hp, alamat, dan slogan", async ({
    page,
  }) => {
    await page.goto("https://esbeta.deanry.my.id/", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Daftarkan Sekolah Anda" }).click();
    await page.getByRole("textbox", { name: "Nama *" }).fill("SMKN 300 Malang");
    await page
      .getByRole("textbox", { name: "Masukkan Email Sekolah Anda" })
      .fill("smkn300malang@gmail.com");
    await page.getByRole("textbox", { name: "No Hp *" }).fill("087754321234");
    await page.getByRole("textbox", { name: "Alamat *" }).fill("Jl terikat");
    await page.getByRole("textbox", { name: "Slogan *" }).fill("300 bisaa");
    await page.getByRole("button", { name: "Simpan" }).click();
    const namdepValidation = await page
      .locator('input[name="admin_first_name"]')
      .evaluate((el) => el.validationMessage);
    expect(namdepValidation).toContain("Please fill out this field");
  });

  test("Register - hanya isi nama,email, no hp, alamat, slogan, dan nama depan", async ({
    page,
  }) => {
    await page.goto("https://esbeta.deanry.my.id/", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Daftarkan Sekolah Anda" }).click();
    await page.getByRole("textbox", { name: "Nama *" }).fill("SMKN 300 Malang");
    await page
      .getByRole("textbox", { name: "Masukkan Email Sekolah Anda" })
      .fill("smkn300malang@gmail.com");
    await page.getByRole("textbox", { name: "No Hp *" }).fill("087754321234");
    await page.getByRole("textbox", { name: "Alamat *" }).fill("Jl terikat");
    await page.getByRole("textbox", { name: "Slogan *" }).fill("300 bisaa");
    await page
      .getByRole("textbox", { name: "Masukkan Nama Depan Anda" })
      .fill("Adit");
    await page.getByRole("button", { name: "Simpan" }).click();
    const nambelValidation = await page
      .locator('input[name="admin_last_name"]')
      .evaluate((el) => el.validationMessage);
    expect(nambelValidation).toContain("Please fill out this field");
  });

  test("Register - hanya isi nama,email, no hp, alamat, slogan, nama depan, dan nama belakang", async ({
    page,
  }) => {
    await page.goto("https://esbeta.deanry.my.id/", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Daftarkan Sekolah Anda" }).click();
    await page.getByRole("textbox", { name: "Nama *" }).fill("SMKN 300 Malang");
    await page
      .getByRole("textbox", { name: "Masukkan Email Sekolah Anda" })
      .fill("smkn300malang@gmail.com");
    await page.getByRole("textbox", { name: "No Hp *" }).fill("087754321234");
    await page.getByRole("textbox", { name: "Alamat *" }).fill("Jl terikat");
    await page.getByRole("textbox", { name: "Slogan *" }).fill("300 bisaa");
    await page
      .getByRole("textbox", { name: "Masukkan Nama Depan Anda" })
      .fill("Adit");
    await page
      .getByRole("textbox", { name: "Nama Belakang *" })
      .fill("Ramadani");
    await page.getByRole("button", { name: "Simpan" }).click();
    const emailaValidation = await page
      .locator('input[name="admin_email"]')
      .evaluate((el) => el.validationMessage);
    expect(emailaValidation).toContain("Please fill out this field");
  });

  test("Register - hanya isi nama,email, no hp, alamat, slogan, nama depan, nama belakang, dan email", async ({
    page,
  }) => {
    await page.goto("https://esbeta.deanry.my.id/", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Daftarkan Sekolah Anda" }).click();
    await page.getByRole("textbox", { name: "Nama *" }).fill("SMKN 300 Malang");
    await page
      .getByRole("textbox", { name: "Masukkan Email Sekolah Anda" })
      .fill("smkn300malang@gmail.com");
    await page.getByRole("textbox", { name: "No Hp *" }).fill("087754321234");
    await page.getByRole("textbox", { name: "Alamat *" }).fill("Jl terikat");
    await page.getByRole("textbox", { name: "Slogan *" }).fill("300 bisaa");
    await page
      .getByRole("textbox", { name: "Masukkan Nama Depan Anda" })
      .fill("Adit");
    await page
      .getByRole("textbox", { name: "Nama Belakang *" })
      .fill("Ramadani");
    await page.getByRole("textbox", { name: "Email *" }).fill("adit@gmail.com");
    await page.getByRole("button", { name: "Simpan" }).click();
    const kontakValidation = await page
      .locator('input[name="admin_contact"]')
      .evaluate((el) => el.validationMessage);
    expect(kontakValidation).toContain("Please fill out this field");
  });

  test("Register - Email sekolah Tidak Valid", async ({ page }) => {
    await page.goto("https://esbeta.deanry.my.id/", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Daftarkan Sekolah Anda" }).click();
    await page.getByRole("textbox", { name: "Nama *" }).fill("SMKN 300 Malang");
    await page
      .getByRole("textbox", { name: "Masukkan Email Sekolah Anda" })
      .fill("smkn300malanggmail.com");
    await page.getByRole("textbox", { name: "No Hp *" }).fill("087754321234");
    await page.getByRole("textbox", { name: "Alamat *" }).fill("Jl terikat");
    await page.getByRole("textbox", { name: "Slogan *" }).fill("300 bisaa");
    await page
      .getByRole("textbox", { name: "Masukkan Nama Depan Anda" })
      .fill("Adit");
    await page
      .getByRole("textbox", { name: "Nama Belakang *" })
      .fill("Ramadani");
    await page.getByRole("textbox", { name: "Email *" }).fill("adit@gmail.com");
    await page.getByRole("textbox", { name: "Kontak *" }).fill("087799123421");
    await page.getByRole("button", { name: "Simpan" }).click();
    const emailnonvalid = await page
      .locator('input[name="school_support_email"]')
      .evaluate((el) => el.validationMessage);
    expect(emailnonvalid).toContain(
      "Please include an '@' in the email address"
    );
  });

  test("Register - dengan email yang sudah terdaftar", async ({ page }) => {
    await page.goto("https://esbeta.deanry.my.id/", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Daftarkan Sekolah Anda" }).click();
    await page.getByRole("textbox", { name: "Nama *" }).fill("SMKN 300 Malang");
    await page
      .getByRole("textbox", { name: "Masukkan Email Sekolah Anda" })
      .fill("smkn300malanggmail.com");
    await page.getByRole("textbox", { name: "No Hp *" }).fill("087754321234");
    await page.getByRole("textbox", { name: "Alamat *" }).fill("Jl terikat");
    await page.getByRole("textbox", { name: "Slogan *" }).fill("300 bisaa");
    await page
      .getByRole("textbox", { name: "Masukkan Nama Depan Anda" })
      .fill("Adit");
    await page
      .getByRole("textbox", { name: "Nama Belakang *" })
      .fill("Ramadani");
    await page.getByRole("textbox", { name: "Email *" }).fill("adit@gmail.com");
    await page.getByRole("textbox", { name: "Kontak *" }).fill("087799123421");
    await page.getByRole("button", { name: "Simpan" }).click();
    const errorMessage = await page.locator(
      "text=School or User email already exists"
    ); // HARUSNYA PAKAI BAHASA INDONESIA AJA
    await expect(errorMessage).toBeVisible();
  });

  test("Register - Tes tiap cta yg mmengarah ke register & tombol close", async ({
    page,
  }) => {
    await page.goto("https://esbeta.deanry.my.id/", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Uji Coba" }).click();
    await page.getByRole("dialog", { name: "Formulir Pendaftaran" }).click();
    await page
      .getByLabel("Formulir Pendaftaran")
      .locator("div")
      .filter({ hasText: "Formulir Pendaftaran" })
      .nth(3)
      .click();
    await page
      .getByLabel("Formulir Pendaftaran")
      .locator("div")
      .filter({ hasText: "Formulir Pendaftaran" })
      .nth(3)
      .click();
    await page.getByRole("button", { name: "Daftarkan Sekolah Anda" }).click();
    await page
      .getByLabel("Formulir Pendaftaran")
      .locator("div")
      .filter({ hasText: "Formulir Pendaftaran" })
      .nth(3)
      .click();
    await page.getByRole("button", { name: "Close" }).click();
    await page.getByRole("button", { name: "Login" }).click();
    await page
      .locator("#frmLogin div")
      .filter({ hasText: "Belum punya akun? Daftar" })
      .click();
    await page.getByRole("button", { name: "Close" }).click(); // SUDAH BERFUNGSI DENGAN BAIK
  });

  test("Register - tes bahasa", async ({ page }) => {
    await page.goto("https://esbeta.deanry.my.id/", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Bahasa" }).click();
    await page.getByRole("link", { name: "English" }).click();
    await page
      .getByText(
        "Beranda Fitur Tentang Kami Harga Kontak Bahasa English Bahasa Indonesia Login"
      )
      .first()
      .click();
    await page.getByRole("button", { name: "Bahasa" }).click();
    await page.getByRole("link", { name: "Bahasa Indonesia" }).click();
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("link", { name: "Belum punya akun? Daftar" }).click(); //SUDAH BERFUNGSII DENGAN BAIK
  });

  // TEST TIPE DATA INPUTAN DAN BATAS INPUTAN TIAP FIELD

  test("Register - coba inputkan huruf di field no hp & kontak", async ({
    page,
  }) => {
    await page.goto("https://esbeta.deanry.my.id/", {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Uji Coba" }).click();
    await page.getByRole("textbox", { name: "No Hp *" }).click();
    await page.getByRole("textbox", { name: "No Hp *" }).fill("i");
    await page.getByRole("textbox", { name: "Kontak *" }).click();
    await page.getByRole("textbox", { name: "Kontak *" }).fill("d");
    await page.getByRole("textbox", { name: "No Hp *" }).click();
    await page.getByRole("textbox", { name: "No Hp *" }).fill("08S"); // HANYA MENERIMA NUMBER
    await page.getByRole("textbox", { name: "Kontak *" }).fill("0812");
  });

  test("Register - Tes batas MIN input tiap field", async ({ page }) => {
    await page.goto("https://esbeta.deanry.my.id/", {
      waitUntil: "networkidle",
    });
    await page.getByRole("textbox", { name: "Nama *" }).fill("SMK");
    await page.getByRole("button", { name: "Simpan" }).click();
    await page
      .getByRole("textbox", { name: "Masukkan Email Sekolah Anda" })
      .fill("smk@gmail");
    await page.getByRole("button", { name: "Simpan" }).click();
    await page.getByRole("textbox", { name: "No Hp *" }).fill("08");
    await page.getByRole("button", { name: "Simpan" }).click();
    await page.getByRole("textbox", { name: "Alamat *" }).fill("Mal");
    await page.getByRole("button", { name: "Simpan" }).click();
    await page.getByRole("textbox", { name: "Slogan *" }).fill("bis");
    await page.getByRole("button", { name: "Simpan" }).click();
    await page
      .getByRole("textbox", { name: "Masukkan Nama Depan Anda" })
      .fill("sa");
    await page.getByRole("button", { name: "Simpan" }).click();
    await page.getByRole("textbox", { name: "Nama Belakang *" }).fill("ya");
    await page.getByRole("button", { name: "Simpan" }).click();
    await page.getByRole("textbox", { name: "Email *" }).fill("saya@gmail");
    await page.getByRole("button", { name: "Simpan" }).click();
    await page.getByRole("textbox", { name: "Kontak *" }).fill("08");
    await page.getByRole("button", { name: "Simpan" }).click(); // TIDAK ADA BATASAN MIN DATA YG DIINPUT
  });

  test("Register - Tes batas MAX input tiap field", async ({ page }) => {
    await page.goto("https://esbeta.deanry.my.id/", {
      waitUntil: "networkidle",
    });

    // Masukkan input panjang >255
    await page
      .getByRole("textbox", { name: "Nama *" })
      .fill(
        "Wz9NqRr4gCFAx0M7LtEUBod3v1Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e2Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e3YIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e"
      );
    await page
      .getByRole("textbox", { name: "Alamat *" })
      .fill(
        "Wz9NqRr4gCFAx0M7LtEUBod3v1Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e2Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e3YIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e"
      );
    await page
      .getByRole("textbox", { name: "Slogan *" })
      .fill(
        "Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e1Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e2Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e3Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e4vWz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e5"
      );
    await page
      .getByRole("textbox", { name: "Masukkan Nama Depan Anda" })
      .fill(
        "Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e1Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e2Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e3Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e4Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e5"
      );
    await page
      .getByRole("textbox", { name: "Nama Belakang *" })
      .fill(
        "Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e1Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e2Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e3Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e4Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e5"
      );
    await page
      .getByRole("textbox", { name: "Kontak *" })
      .fill("5809136247890512");
    await page
      .getByRole("textbox", { name: "No Hp *" })
      .fill("5809136247890512");
    await page
      .getByRole("textbox", { name: "Masukkan Email Sekolah Anda" })
      .fill("user@gmail");
    await page.getByRole("button", { name: "Simpan" }).click();
    const errName = await page.locator(
      "text=The school name must not be~greater than 255 characters."
    ); // HARUSNYA PAKAI BAHASA INDONESIA AJA
    await expect(errName).toBeVisible();

    // Perbaiki nama jadi = 255
    await page
      .getByRole("textbox", { name: "Nama *" })
      .press("ControlOrMeta+a");
    await page
      .getByRole("textbox", { name: "Nama *" })
      .fill(
        "Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e"
      );
    await page.getByRole("button", { name: "Simpan" }).click();
    const errTag = await page.locator(
      "text=The school tagline must not be~greater than 255 characters."
    ); // HARUSNYA PAKAI BAHASA INDONESIA AJA
    await expect(errTag).toBeVisible();

    // Perbaiki Slogan jadi = 255
    await page
      .getByRole("textbox", { name: "Slogan *" })
      .press("ControlOrMeta+a");
    await page
      .getByRole("textbox", { name: "Slogan *" })
      .fill(
        "Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e"
      );
    await page.getByRole("button", { name: "Simpan" }).click();
    const errfirst = await page.locator(
      "text=The admin first name must not be~greater than 255 characters."
    ); // HARUSNYA PAKAI BAHASA INDONESIA AJA
    await expect(errfirst).toBeVisible();

    // Perbaiki Nama Depan Admin = 255
    await page
      .getByRole("textbox", { name: "Masukkan Nama Depan Anda" })
      .press("ControlOrMeta+a");
    await page
      .getByRole("textbox", { name: "Masukkan Nama Depan Anda" })
      .fill(
        "Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e"
      );
    await page.getByRole("button", { name: "Simpan" }).click();
    const errlast = await page.locator(
      "text=The admin last name must not be~greater than 255 characters."
    ); // HARUSNYA PAKAI BAHASA INDONESIA AJA
    await expect(errlast).toBeVisible();

    // Perbaiki Nama Belakang Admin = 255
    await page
      .getByRole("textbox", { name: "Nama Belakang *" })
      .press("ControlOrMeta+a");
    await page
      .getByRole("textbox", { name: "Nama Belakang *" })
      .fill(
        "Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e"
      );
    await page.getByRole("button", { name: "Simpan" }).click();
    const err = await page.locator(
      "text=Error Occured."
    ); // HARUSNYA PAKAI BAHASA INDONESIA AJA
    await expect(err).toBeVisible();

    //Coba isi field email dgn karakter random >255
    await page
      .getByRole("textbox", { name: "Masukkan Email Sekolah Anda" })
      .press("ControlOrMeta+a");
    await page
      .getByRole("textbox", { name: "Masukkan Email Sekolah Anda" })
      .fill(
        "Wz9NqRr4gCFAx0M7LtEUBod3vYIHXnPK5jb2wZJe1VpGsQkfuyDhT6mlNiXAc83zMVOrSKd9yLWgqxFJ4tEPvaRCmB27hTY0NUbAn1iZQwsXGk9e"
      );
    await page.getByRole("button", { name: "Simpan" }).click();
    const erremail = await page
      .locator('input[name="school_support_email"]')
      .evaluate((el) => el.validationMessage);
    expect(erremail).toContain("Please enter an email address");
  });
});
