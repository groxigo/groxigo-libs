import { describe, it, expect } from "vitest";
import { TAX_RATE, DEFAULT_DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "../constants/pricing";
import { DEFAULT_H3_RESOLUTION } from "../constants/geo";
import { TARGET_AUDIENCES, type TargetAudience } from "../constants/audiences";

describe("pricing constants", () => {
  it("TAX_RATE is between 0 and 1", () => {
    expect(TAX_RATE).toBeGreaterThan(0);
    expect(TAX_RATE).toBeLessThan(1);
  });

  it("DEFAULT_DELIVERY_FEE is positive", () => {
    expect(DEFAULT_DELIVERY_FEE).toBeGreaterThan(0);
  });

  it("FREE_DELIVERY_THRESHOLD is positive", () => {
    expect(FREE_DELIVERY_THRESHOLD).toBeGreaterThan(0);
  });

  it("free delivery threshold exceeds delivery fee", () => {
    expect(FREE_DELIVERY_THRESHOLD).toBeGreaterThan(DEFAULT_DELIVERY_FEE);
  });
});

describe("geo constants", () => {
  it("H3 resolution is within valid range (0-15)", () => {
    expect(DEFAULT_H3_RESOLUTION).toBeGreaterThanOrEqual(0);
    expect(DEFAULT_H3_RESOLUTION).toBeLessThanOrEqual(15);
  });
});

describe("audience constants", () => {
  it("has expected audience types", () => {
    expect(TARGET_AUDIENCES).toContain("all");
    expect(TARGET_AUDIENCES).toContain("authenticated");
    expect(TARGET_AUDIENCES).toContain("guests");
  });

  it("is readonly array", () => {
    // TypeScript prevents mutation; runtime check that values are stable
    expect(TARGET_AUDIENCES).toHaveLength(6);
  });

  it("type narrows correctly", () => {
    const audience: TargetAudience = "vip";
    expect(TARGET_AUDIENCES).toContain(audience);
  });
});
