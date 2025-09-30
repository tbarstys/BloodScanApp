import { describe, expect, it } from "vitest";
import { parseAnalytes } from "@/lib/parse/analytes";

const table = {
  rows: [
    ["Hb", "13.2", "g/dL", "12-16"],
    ["Cholesterol", "180", "mg/dL", "<200"]
  ]
};

describe("parseAnalytes", () => {
  it("normalizes synonyms and decimals", () => {
    const records = parseAnalytes(table, { fileName: "test" });
    expect(records[0].analyte).toBe("Hemoglobin");
    expect(records[0].value).toBeCloseTo(13.2);
  });
});
