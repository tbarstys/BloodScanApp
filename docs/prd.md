# LabLens Product Requirements Document

## Product Overview
LabLens is a privacy-first companion that helps people interpret their laboratory blood test results without
providing medical advice. The application accepts PDF, image, and camera captures or manual entry, performs local
OCR and parsing, normalises values across units, applies deterministic clinical rules, and surfaces plain-language
summaries with safety guardrails.

## Goals
- Deliver a trustworthy, local-first experience for understanding blood work.
- Ensure deterministic, explainable outputs via a YAML-driven rules engine.
- Maintain multilingual access (English, German, Lithuanian) with accessibility and responsive design.

## User Personas
- **Patient researcher** reviewing recent laboratory reports.
- **Clinician collaborator** comparing two result sets to discuss with patients.
- **Caregiver** needing translated summaries for international coordination.

## Core User Flows
1. Import lab data from PDF, image, camera, or manual entry.
2. Perform OCR, table extraction, analyte mapping, and unit normalisation.
3. Run deterministic rules to highlight out-of-range values with contextual advice.
4. Present summaries with disclaimers, multi-language support, and local storage.
5. Compare previous analyses to highlight trends and changes.
6. Export a privacy-safe PDF summary stripped of metadata.
7. Ask structured questions referencing only parsed data and deterministic rules.

## Functional Requirements
- Local OCR via Tesseract.js and pdfjs-dist with optional cloud toggles (off by default).
- Deterministic YAML rules for CBC, CMP, Lipids, Thyroid panels.
- Unit conversions covering glucose, cholesterol, triglycerides, haemoglobin, WBC, platelets.
- Local persistence using IndexedDB/sql.js via Zustand storage.
- Privacy features: PHI redaction, EXIF stripping prompts, consent gating for network use.
- Accessibility: WCAG AA colour contrast, keyboard navigation, skip links, reduced motion support.
- Export pipeline that generates a PDF summary with source citations and disclaimer.
- Security: strict CSP, file size/type validation, sandboxed workers, telemetry opt-in only.

## Non-Goals
- Providing diagnostic, prognostic, or treatment guidance.
- Persistent cloud storage of lab data.
- Real-time clinician messaging.

## Success Metrics
- 95% field extraction accuracy on provided fixtures.
- Deterministic rule outputs validated via snapshot tests.
- Sub-1s render on mid-tier mobile devices for stored analyses.

## Release Plan
1. **MVP**: OCR ingestion, rules engine, unit conversion, UI scaffolding.
2. **Beta**: Trend comparison, export PDF, multi-language translations.
3. **General Availability**: Optional LLM Q&A, telemetry instrumentation, extended rules library.

---

# Acceptance Criteria (Gherkin)

```gherkin
Feature: LabLens deterministic analysis
  Scenario: Importing sample CBC PDF
    Given I upload "cbc_1.pdf"
    When the extraction completes
    Then at least 95% of analyte fields are captured
    And each flagged value shows a reference range and source citation

  Scenario: Importing lipid panel image
    Given I upload "lipids_img.jpg"
    When processing finishes
    Then the system normalises cholesterol units between mg/dL and mmol/L
    And low-confidence entries are marked for manual confirmation

  Scenario: Importing CMP camera photo
    Given I capture a photo named "cmp_photo.jpg"
    When deskew and OCR complete
    Then results appear with a confidence score and redacted PHI

  Scenario: Thyroid panel rules
    Given I upload "thyroid_panel.pdf"
    When rules evaluation runs
    Then the deterministic engine matches stored snapshot expectations

  Scenario: Multi-language UI
    Given I switch the language to German
    Then navigation labels render in German
    And the disclaimer remains visible in the selected language

  Scenario: Trend comparison
    Given at least two analyses exist for Hemoglobin
    When I open the compare view
    Then the sparkline shows directional change arrows

  Scenario: Safety settings
    Given I have not opted into cloud OCR
    When I upload any file
    Then no network requests are made except to local resources

  Scenario: PDF export
    Given an analysis exists
    When I export the summary
    Then the PDF contains the disclaimer, timestamp, and QR link to the privacy policy
    And metadata such as author and location are cleared
```
