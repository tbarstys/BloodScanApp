# Security Overview

- **Content Security Policy**: Strict CSP enforced via `next-secure-headers`.
- **Input Validation**: File type and size limits (15 MB, PDF/JPG/PNG) with rejection messaging.
- **Sandboxing**: OCR executed in web workers; no eval usage.
- **Dependency Hygiene**: pnpm lock with `pnpm audit` recommended pre-release.
- **Secrets Management**: Optional cloud features require environment variables stored in Vercel project settings.
- **Incident Handling**: See `docs/operations.md` for response workflow.
