# Operations Runbook

## Local Development
- Install dependencies: `pnpm install`
- Start dev server: `pnpm dev`
- Run tests: `pnpm test`
- Launch Storybook: `pnpm storybook`

## Demo Mode
- Execute `pnpm seed` to populate sample fixtures under `fixtures/demo`.
- Visit `/upload` and use demo files to simulate ingestion.

## Deployment
- Deploy to Vercel with the provided configuration.
- Ensure environment variables for optional cloud OCR/LLM endpoints are unset by default.
- Monitor Vercel build logs for lint/test outputs.

## Incident Response
1. Disable optional cloud integrations by toggling the feature flag in Vercel environment variables.
2. Review serverless logs for `/api/telemetry` for anomalies.
3. Rotate API keys and notify privacy officer within 24h per GDPR/FADP.

## Backup & Retention
- No persistent server storage is used; client data remains in-browser.
- Optional telemetry is aggregated and anonymous when enabled; retention is 30 days max.
