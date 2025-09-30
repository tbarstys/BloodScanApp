import { test, expect } from "@playwright/test";

test.describe("upload flow", () => {
  test("home page renders", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("LabLens")).toBeVisible();
  });
});
