# LabLens

Local-first blood test companion built with Next.js 14, Tailwind, and a deterministic rules engine.

## Getting Started

```bash
pnpm install
pnpm dev
```

## Scripts
- `pnpm dev` – start development server.
- `pnpm build` – production build.
- `pnpm test` – run Vitest unit tests.
- `pnpm test:e2e` – run Playwright end-to-end tests.
- `pnpm storybook` – launch Storybook.
- `pnpm seed` – prepare demo fixtures.
- `pnpm verify` – lint and test suite.

## Features
- OCR for PDFs and images via Tesseract.js.
- Deterministic YAML rules for CBC, CMP, Lipids, and Thyroid panels.
- Multilingual UI (EN/DE/LT) with responsive, accessible design.
- Local persistence with opt-in cloud/LLM integrations.
- Privacy guardrails, metadata scrubbing, and exportable summaries.

## Deployment
Deploy on Vercel. The repository includes CI workflows and `vercel.json` for headers. Optional cloud services
should remain disabled unless the user opts in via settings.

## License
Proprietary – internal evaluation only.
