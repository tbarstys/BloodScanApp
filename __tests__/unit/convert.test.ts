import { describe, expect, it } from "vitest";
import { convertUnit } from "@/lib/units/convert";

describe("convertUnit", () => {
  it("converts glucose mg/dL to mmol/L", () => {
    expect(convertUnit(90, "mg/dL", "mmol/L", "glucose")).toBeCloseTo(5, 3);
  });

  it("converts hemoglobin g/dL to g/L", () => {
    expect(convertUnit(14, "g/dL", "g/L", "hemoglobin")).toBe(140);
  });
});
