# Security Policy

- Enforced Content Security Policy disallows third-party scripts and inline execution.
- File uploads are limited to 15 MB and validated by MIME type.
- OCR runs inside sandboxed workers to contain untrusted data.
- Personally identifiable strings are scrubbed prior to storage/export.
- Vulnerabilities can be reported by opening a security advisory on GitHub.
