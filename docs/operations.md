# Operations Runbook

## Development
- `pnpm dev` launches Next.js with hot reload.
- `pnpm storybook` renders component library.

## Testing
- `pnpm test` for unit/snapshot coverage.
- `pnpm test:e2e` executes Playwright scenarios (headless by default).

## Deployment
- Deploy to Vercel. Ensure environment variable `LABLENS_ALLOW_CLOUD` is unset by default.
- After deploy, run smoke test: upload sample fixture, verify flags and export PDF summary.

## Incident response
- Disable optional cloud connectors via feature flags.
- Invalidate cached rules by redeploying `/rules` bundle.
- Communicate updates through release notes in README.
