import { test, expect } from '@playwright/test';

test('home redirects to upload', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveURL(/upload/);
});
