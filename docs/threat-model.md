# Threat Model (STRIDE)

| Vector | Mitigation |
| --- | --- |
| Spoofing | Strict CSP, sessionless design, no external authentication. |
| Tampering | Client-only data storage; no server persistence. Husky enforces lint/tests pre-commit. |
| Repudiation | Local logs only; export PDFs stamped with timestamp and disclaimer. |
| Information Disclosure | PHI scrubber, EXIF stripping plan, 15 MB limit, optional consent before cloud features. |
| Denial of Service | File size and type validation, worker pool prevents UI blocking. |
| Elevation of Privilege | Web workers sandbox OCR, telemetry endpoint returns 204 only. |
