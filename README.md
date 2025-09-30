# LabLens

LabLens is a local-first companion for understanding laboratory test results. It ingests PDFs, images, or manual entries, performs OCR and deterministic rule evaluation, and renders multilingual, safety-focused explanations.

## Getting Started

```bash
pnpm install
pnpm dev
```

Visit `http://localhost:3000` to view the mobile-first interface.

### Scripts

- `pnpm dev` – start Next.js development server
- `pnpm build` – create a production build
- `pnpm test` – run Vitest unit and snapshot suites
- `pnpm test:e2e` – execute Playwright end-to-end tests
- `pnpm storybook` – launch Storybook component explorer
- `pnpm lint` – run ESLint
- `pnpm format` – format with Prettier
- `pnpm seed` – generate sample local data
- `pnpm verify` – run lint + unit + e2e checks

## Features
- OCR via Tesseract.js and PDF.js with preprocessing
- Deterministic YAML rule engine with snapshot tests
- Multilingual UI (EN/DE/LT) via next-i18next
- Unit normalization for clinical analytes
- Local privacy guardrails, PHI scrubbing, strict CSP
- Optional “Ask Safely” Q&A with hard safety filters

## Development Notes
- Storybook stories live in `stories/`
- Deterministic rules under `rules/`
- Fixtures for tests under `fixtures/`
- Architecture diagram: `docs/architecture.md`

## Deployment
Use the included GitHub Actions workflow and Vercel configuration. Provide environment variables as per `.env.example`.
