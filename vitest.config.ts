import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["__tests__/unit/**/*.test.ts"],
    alias: {
      "@": new URL("./", import.meta.url).pathname
    }
  }
});
