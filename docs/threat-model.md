# Threat Model (STRIDE)

- **Spoofing**: enforce strict authentication when optional cloud sync is enabled; CSP and same-origin policies prevent script injection.
- **Tampering**: integrity via deterministic rules; YAML files validated on load.
- **Repudiation**: local logs stored only in-memory; exports include timestamp and hash.
- **Information Disclosure**: PHI scrubber masks identifiers, sandboxed workers reduce leak surface.
- **Denial of Service**: file size limits and worker pool queue guard the UI thread.
- **Elevation of Privilege**: no eval, minimal dependencies, Next.js middleware denies inline scripts.
