import { createSecureHeaders } from "./security-headers.mjs";

const nextConfig = {
  experimental: {
    serverActions: true
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: createSecureHeaders()
      }
    ];
  },
  i18n: {
    locales: ["en", "de", "lt"],
    defaultLocale: "en"
  }
};

export default nextConfig;
