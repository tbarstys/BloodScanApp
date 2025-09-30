import { test, expect } from '@playwright/test';

test.describe('LabLens smoke', () => {
  test('home page loads disclaimer', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('LabLens is not a medical device')).toBeVisible();
  });
});
