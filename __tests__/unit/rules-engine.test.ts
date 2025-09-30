import { describe, expect, it, vi, beforeEach } from "vitest";
import { evaluateRecords } from "@/lib/rules/engine";
import { resetRuleCache } from "@/lib/rules/loader";

vi.mock("@/lib/rules/loader", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/rules/loader")>();
  return {
    ...actual,
    loadRules: () => actual.loadRules()
  };
});

describe("rules engine", () => {
  beforeEach(() => {
    resetRuleCache();
  });

  it("matches snapshot for hemoglobin", () => {
    const results = evaluateRecords([
      {
        id: "1",
        analyte: "Hemoglobin",
        value: 6.8,
        unit: "g/dL"
      }
    ] as any);
    expect(results).toMatchSnapshot();
  });
});
