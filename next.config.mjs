import { createSecureHeaders } from "next-secure-headers";

const cspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'", "'unsafe-eval'", "'wasm-unsafe-eval'", "blob:"],
  styleSrc: ["'self'", "'unsafe-inline'"],
  imgSrc: ["'self'", "data:", "blob:"],
  connectSrc: ["'self'"],
  fontSrc: ["'self'", "data:"],
  objectSrc: ["'none'"],
  frameAncestors: ["'none'"],
  baseUri: ["'self'"],
  formAction: ["'self'"],
  workerSrc: ["'self'", "blob:"],
};

const headers = createSecureHeaders({
  contentSecurityPolicy: {
    directives: cspDirectives,
  },
  referrerPolicy: "no-referrer",
  xssProtection: "1; mode=block",
  frameOptions: "DENY",
  nosniff: "nosniff",
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ya?ml$/i,
      use: 'raw-loader',
    });
    return config;
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers,
    },
  ],
};

export default nextConfig;
