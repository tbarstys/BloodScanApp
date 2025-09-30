# LabLens PRD

## Product Summary
LabLens is a mobile-first web application that helps people understand their laboratory test results without sharing data with third parties. The app ingests PDFs, images, live camera captures, or manual entries, performs client-side OCR and deterministic rule analysis, and presents multilingual explanations with explicit medical disclaimers.

## Goals
- Deliver 95%+ field capture on provided sample files.
- Preserve user privacy with local processing and opt-in cloud features.
- Provide clear, non-diagnostic explanations with source citations.
- Support English, German, and Lithuanian interfaces.
- Offer comparison and trend visualizations to highlight changes across time.

## Core User Flows
1. **Import**: Users upload a PDF/image/camera capture or enter values manually.
2. **Extract & Normalize**: OCR parses analytes, values, units, and reference ranges; units are normalized to user preference.
3. **Rules Evaluation**: Deterministic YAML rules produce flags and advice.
4. **Report**: Users review a mobile-friendly report with explanations and citations.
5. **Compare**: Users load prior results to highlight differences and trend arrows.
6. **Ask Safely**: Users ask structured questions; the app responds using parsed data only.
7. **Export**: Users save a scrubbed PDF summary locally.

## Non-Goals
- No diagnostic or treatment recommendations.
- No persistent cloud storage of personal data.

## Success Metrics
- 95%+ extraction accuracy on sample fixtures.
- <2s rendering latency for local OCR results on reference devices.
- 100% adherence to deterministic rule snapshots in CI.

## Release Plan
1. Scaffold app foundation with UI, i18n, and storage.
2. Implement OCR, unit conversion, and rules engine.
3. Add comparison, Q&A, export, and safety guardrails.
4. Finalize tests, Storybook, CI, and deployment configuration.

## Acceptance Criteria
- Handles `cbc_1.pdf`, `lipids_img.jpg`, `cmp_photo.jpg`, `thyroid_panel.pdf` with 95% field capture.
- Supports responsive mobile UI (360–428 px), keyboard navigation, WCAG AA colors.
- Deterministic rules produce identical outputs across runs (snapshot tests).
- Unit conversions cover glucose, cholesterol, triglycerides, hemoglobin, WBC, platelets.
- Explanations include source values/units, disclaimers, and escalation guidance.
- No network calls by default; cloud OCR/LLM toggles gated behind consent.
- CSP headers enforced; file limits and EXIF scrubbing configured.
- Local save and PDF export omit metadata and include disclaimer + privacy badge.

## Gherkin Acceptance Tests
```
Feature: LabLens end-to-end safety
  Scenario: Importing a PDF and generating a report
    Given I open LabLens on mobile viewport
    When I upload "cbc_1.pdf"
    Then I see parsed analytes with source values and units
    And I see the medical disclaimer banner
    And no network requests are sent by default

  Scenario: Switching languages
    Given the app is loaded in English
    When I select Deutsch from the language switcher
    Then navigation labels appear in German

  Scenario: Comparing two results
    Given I have loaded two lipid results
    When I open the compare tab
    Then I see the delta and trend arrow for LDL

  Scenario: Ask Safely rejects treatment questions
    Given parsed data exists
    When I ask "Should I change medication?"
    Then the app tells me to consult my clinician

  Scenario: Exporting a PDF summary
    Given a report is ready
    When I export the summary
    Then the PDF contains the disclaimer and no hidden metadata
```
