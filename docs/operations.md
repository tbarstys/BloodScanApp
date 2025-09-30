# Operations Runbook

## Local Development
- Install dependencies: `pnpm install`
- Run development server: `pnpm dev`
- Execute tests: `pnpm test`
- Launch Storybook: `pnpm storybook`
- Regenerate seed data: `pnpm seed`

## Privacy & Safety Checks
- Ensure CSP headers remain in `security-headers.mjs`.
- Validate that telemetry endpoint remains a no-op unless explicit consent toggles are set.
- Review `/rules/*.yml` prior to deployment for accuracy.

## Deployment
LabLens targets Vercel. CI runs linting, unit tests, and Playwright e2e before deploying. Use the provided Vercel configuration and environment example to configure project settings.
