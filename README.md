# LabLens

LabLens is a privacy-preserving, multilingual lab report companion. It performs on-device OCR, unit normalization, and deterministic rules checks to help people review blood test results without providing diagnoses.

## Getting started

```bash
pnpm install
pnpm dev
```

## Scripts

- `pnpm dev` – start the development server
- `pnpm build` – build for production
- `pnpm test` – run Vitest unit suite
- `pnpm test:e2e` – execute Playwright E2E flows
- `pnpm storybook` – launch Storybook for UI components
- `pnpm seed` – seed local demo data into the browser database (mock implementation)
- `pnpm verify` – lint + unit + e2e tests

## Features

- Local-first OCR (Tesseract.js, PDF.js)
- Deterministic YAML-based clinical rules engine
- Unit normalization for common analytes
- Multilingual UI (EN/DE/LT)
- No medical advice; escalations for critical findings
- Strict CSP and PHI scrubbing utilities

## Architecture

See [`docs/architecture.md`](docs/architecture.md).

## Safety

Review [`DISCLAIMER.md`](DISCLAIMER.md) before using.
