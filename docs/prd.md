# LabLens Product Requirements Document

## Vision
Give people a trustworthy, privacy-preserving way to understand laboratory blood test reports without providing medical advice.

## Objectives
- Local-first ingestion for PDFs, images, and live capture with >95% field accuracy on provided samples.
- Deterministic unit normalization and rules-based explanations in EN/DE/LT.
- Safe, friendly interface that highlights abnormal trends and promotes clinician follow-up.

## Key User Flows
1. **Upload / Import**: Drag & drop PDF/image, capture via camera, or open manual entry. OCR runs locally, extracting tables with confidence indicators.
2. **Analyze**: Parsed analytes mapped to canonical keys, normalized units, evaluated against YAML rules. Explanations cite source values and units.
3. **Compare**: Select two saved analyses to view deltas and sparkline trend arrows.
4. **Ask Safely**: Structured Q&A referencing parsed data only; rejects treatment requests.
5. **Export**: Generate metadata-scrubbed PDF summary with disclaimer and QR link to privacy policy.

## Requirements
- Responsive mobile-first UI with accessible navigation, skip links, keyboard support, and WCAG AA contrast.
- Multi-language toggle (EN/DE/LT) affecting UI labels and rule messages.
- Local persistence via IndexedDB/sql.js with ability to clear history.
- Deterministic rules engine (YAML → JSON) covering CBC, CMP, Lipids, Thyroid panels.
- Settings toggles for cloud OCR, LLM normalization, and anonymous telemetry (off by default).
- Strict CSP, PHI scrubbing, file type/size validation, EXIF sanitization.
- Export PDF contains timestamp, disclaimer, and cites source values; no hidden metadata.

# Acceptance Criteria (Gherkin)

```gherkin
Feature: LabLens blood test interpretation safety
  Scenario: Uploading sample CBC PDF
    Given I open the Upload page
    When I upload "cbc_1.pdf"
    Then I should see extracted analytes with confidence scores
    And the capture rate should be at least 95 percent of expected fields

  Scenario: Importing lipid photo
    Given I capture "lipids_img.jpg"
    When OCR completes
    Then LDL and HDL values should match fixtures within tolerance
    And units are normalized to mg/dL or mmol/L based on preference

  Scenario: Comparing analyses
    Given I have two saved analyses
    When I open the Compare tab
    Then I see delta percentages and trend arrows for matching analytes

  Scenario: Safe Q&A guardrails
    Given Ask Safely is enabled
    When I ask for treatment advice
    Then the system declines and recommends discussing with a clinician

  Scenario: Privacy-safe export
    Given I view an analysis
    When I export a PDF summary
    Then the file contains the disclaimer and no personal identifiers
    And metadata is stripped from the export
```
