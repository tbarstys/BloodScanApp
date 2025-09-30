# Threat Model (STRIDE)

| Category | Risk | Mitigation |
| --- | --- | --- |
| Spoofing | Fake lab files injected | File type/size validation, checksum logging |
| Tampering | Malicious script in uploads | Strict CSP, sandboxed workers, no inline scripts |
| Repudiation | User denies consent | Explicit consent toggles logged locally, no hidden telemetry |
| Information Disclosure | PHI leakage | Client-side redaction, metadata stripping, default offline mode |
| Denial of Service | Large file uploads | 15 MB limit, early validation |
| Elevation of Privilege | Worker escape | Web worker sandbox, no eval, limited permissions |
