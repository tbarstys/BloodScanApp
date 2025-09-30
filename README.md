# LabLens

LabLens is a local-first companion for interpreting laboratory reports. It ingests PDFs, images, live camera captures, and manual entries to extract analytes, normalize units, and apply deterministic medical safety rules. Outputs are strictly non-diagnostic and encourage clinician conversations.

## Getting Started

```bash
pnpm install
pnpm dev
```

Visit `http://localhost:3000`.

### Scripts
- `pnpm dev` – Next.js development server
- `pnpm build` – Build for production
- `pnpm test` – Vitest unit tests
- `pnpm test:e2e` – Playwright end-to-end tests
- `pnpm storybook` – Storybook component explorer
- `pnpm lint` – ESLint
- `pnpm format` – Prettier check
- `pnpm seed` – Create demo fixtures
- `pnpm verify` – Run lint + unit + e2e suites

## Features
- Client-side OCR with Tesseract.js and PDF.js adapters
- Deterministic YAML-driven rules for CBC, CMP, Lipids, Thyroid
- Unit normalization between SI and US conventional units
- Multilingual UI (EN/DE/LT) via next-i18next
- Accessibility-focused, mobile-first interface using Tailwind + shadcn/ui
- Optional LLM enhancement layer (off by default)
- Privacy guardrails, PHI scrubbing, and strict CSP

## Deployment
- Configure environment variables via `.env.example`
- Deploy to Vercel using the included configuration and GitHub Actions workflow
