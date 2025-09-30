import { createSecureHeaders } from "./scripts/secure-headers.mjs";

const csp = [
  "default-src 'self'",
  "script-src 'self' 'wasm-unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'"
].join("; ");

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    serverActions: {
      bodySizeLimit: "2mb"
    }
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: createSecureHeaders({ csp })
    }
  ],
  i18n: {
    locales: ["en", "de", "lt"],
    defaultLocale: "en"
  }
};

export default nextConfig;
