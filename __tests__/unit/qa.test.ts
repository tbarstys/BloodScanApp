import { describe, expect, it } from "vitest";
import { askSafely } from "@/lib/qa";

describe("askSafely", () => {
  it("rejects treatment questions", async () => {
    const response = await askSafely({ question: "Should I take medication?", data: {} });
    expect(response).toMatch(/cannot provide treatment guidance/i);
  });

  it("cites structured data", async () => {
    const response = await askSafely({ question: "What is my glucose?", data: { glucose: 5.2 } });
    expect(response).toContain("glucose");
    expect(response).toContain("5.2");
  });
});
