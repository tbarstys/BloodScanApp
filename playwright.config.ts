import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '__tests__/e2e',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    viewport: { width: 390, height: 844 }
  },
  webServer: {
    command: 'pnpm dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  }
});
