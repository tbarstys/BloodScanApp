# Privacy Policy (Developer Preview)

LabLens processes laboratory data locally in the browser by default. Files and extracted values never leave the device unless the user explicitly enables optional cloud OCR or LLM normalization. When enabled, uploads are transmitted only to configured endpoints under customer control.

- **Data Storage**: IndexedDB/sql.js for local persistence. Clearing browser storage removes data.
- **Telemetry**: Disabled by default. When enabled, only anonymized, aggregated event counts are transmitted (no PII/PHI).
- **Camera Access**: Requires explicit user consent each session.
- **Exports**: Generated PDFs contain only scrubbed values and visible disclaimers. Metadata is stripped before download.
- **Compliance**: Designed to align with GDPR and Swiss FADP principles (purpose limitation, data minimization, local processing).
