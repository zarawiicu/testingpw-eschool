import { test, expect } from '@playwright/test';

test.describe.configure({ mode: "serial" }); // Jika ingin test berurutan (opsional)
test.describe("Tes Dokumen KPK Elin", () => {

// Gunakan state login dari guru
test.use({ storageState: 'guruState.json' });

test('CRUD Folder', async ({ page }) => {
  
});

test('CRUD File', async ({ page }) => {
  
});
});