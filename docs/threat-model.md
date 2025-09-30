# Threat Model (STRIDE)

## Spoofing
- Enforce strict CSP and same-origin policies.
- Require user gesture for camera access.

## Tampering
- Client-side validation ensures only supported file types/sizes.
- Checksums planned for persisted data exports.

## Repudiation
- No server-side storage by default; optional telemetry uses anonymized aggregation with consent logs.

## Information Disclosure
- OCR text scrubbed for PHI before rendering or saving.
- Exported PDFs remove metadata and include visible disclaimer.

## Denial of Service
- Limit file size (15 MB) and worker pool concurrency.

## Elevation of Privilege
- No inline scripts; sandboxed workers. Optional cloud features must authenticate via signed tokens.
