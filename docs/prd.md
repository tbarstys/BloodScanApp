# LabLens Product Requirements (v0.1)

## Vision
LabLens empowers people to understand lab results safely by combining on-device OCR, deterministic rules, and multilingual education. It respects privacy, enforces safety disclaimers, and escalates critical findings to clinician follow-up.

## Target Users
- Individuals reviewing routine labs
- Clinicians providing patients with self-service explanations
- Caregivers tracking trends across visits

## Success Metrics
- 95%+ field capture accuracy on sample fixtures
- 100% deterministic parity across identical inputs (snapshot tests)
- <2 second perceived latency for local OCR on 3-page PDF (target)

## Core Flows
1. **Import** – Accept PDFs (multi-page), JPG/PNG, live camera capture, and manual entries with immediate feedback on file validity.
2. **Extract & Normalize** – Run local OCR, deskew/binarize, parse analyte tables, normalize units, scrub PHI.
3. **Interpret** – Apply YAML-based rules (CBC, CMP, Lipids, Thyroid) to produce plain-language explanations with flag severity.
4. **Report** – Present responsive, accessible UI with range pills, advice callouts, and privacy badges. Enable local save/export (PDF without metadata) and trend comparisons.
5. **Ask Safely** – Optional Q&A referencing structured data only, rejecting treatment queries.

## Non-Negotiables
- Medical safety banner & “Discuss with your clinician” escalation for critical/oncologic inputs.
- Local-first processing; optional cloud features require explicit consent toggles.
- Accessibility (WCAG AA), keyboard navigation, 360–428 px mobile optimization.
- Internationalization (EN/DE/LT) with runtime switcher.
- Strict CSP, PHI scrubbing, file size/type limits, worker sandboxing.

## Future Enhancements
- Additional lab panels via pluggable YAML
- Offline caching of language packs
- Structured export API for clinician portals
