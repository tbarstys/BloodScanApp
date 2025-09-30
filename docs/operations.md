# Operations Runbook

## Local Development
- `pnpm install`
- `pnpm dev` for Next.js
- `pnpm storybook` for component workbench
- `pnpm test` for unit tests, `pnpm test:e2e` for Playwright

## Demo Mode
- `pnpm seed` seeds fixtures under `fixtures/demo`.
- Load `/demo` (planned route) to prefill example analyses.

## Incident Response
- Collect browser console logs (no PII stored).
- Review deterministic rule snapshots for regressions.
- Roll back via Vercel preview deployments.

## Data Retention
- Data remains in browser IndexedDB/sql.js. Clearing browser storage wipes data.
- Optional cloud features require explicit consent and must target controlled infrastructure.
