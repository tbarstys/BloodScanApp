import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "__tests__/e2e",
  webServer: {
    command: "pnpm dev",
    port: 3000,
    reuseExistingServer: true,
    timeout: 120000
  },
  use: {
    baseURL: "http://127.0.0.1:3000",
    viewport: { width: 390, height: 844 }
  }
});
