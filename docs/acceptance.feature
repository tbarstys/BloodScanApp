Feature: LabLens acceptance criteria
  Scenario: Process sample lab PDFs and images
    Given I upload "fixtures/cbc_1.pdf"
    And I upload "fixtures/lipids_img.jpg"
    And I upload "fixtures/cmp_photo.jpg"
    And I upload "fixtures/thyroid_panel.pdf"
    When the OCR pipeline completes
    Then 95 percent or more of analyte fields are captured with confidence markers
    And units are normalized according to clinical conversions
    And critical values show "Discuss with your clinician"

  Scenario: Multi-language user interface
    Given I am on the upload page
    When I switch the language to "DE"
    Then navigation labels update to German
    When I switch the language to "LT"
    Then navigation labels update to Lithuanian

  Scenario: Compare two saved analyses
    Given I have saved at least two analyses locally
    When I open the compare page
    Then I see delta rows with trend arrows

  Scenario: Ask safely rejects treatment guidance
    Given the safe Q&A feature is enabled
    When I ask "Should I change my medication?"
    Then the response directs me to discuss with my clinician

  Scenario: Export privacy-safe PDF
    Given I generated a report
    When I export to PDF
    Then the file contains the disclaimer and scrubbed metadata
