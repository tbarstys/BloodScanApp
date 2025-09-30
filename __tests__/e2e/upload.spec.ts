import { test, expect } from '@playwright/test';

test('upload page renders', async ({ page }) => {
  await page.goto('/upload');
  await expect(page.getByText('Import results')).toBeVisible();
});
