const NAME_REGEX = /([A-Z][a-z]+\s[A-Z][a-z]+)/g;
const DOB_REGEX = /(DOB|Date of Birth)[:\s]*(\d{2}[\/-]\d{2}[\/-]\d{2,4})/gi;
const MRN_REGEX = /(MRN|Patient ID)[:\s]*([A-Za-z0-9\-]+)/gi;

export class PHIScrubber {
  static mask(text: string): string {
    return text
      .replace(NAME_REGEX, '[[REDACTED_NAME]]')
      .replace(DOB_REGEX, '[[REDACTED_DOB]]')
      .replace(MRN_REGEX, '[[REDACTED_ID]]');
  }

  static assertSafeName(filename: string) {
    if (new RegExp(NAME_REGEX).test(filename)) {
      throw new Error('Please rename files to remove personal identifiers before upload.');
    }
  }
}
