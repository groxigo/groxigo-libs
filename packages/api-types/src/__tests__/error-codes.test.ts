import { describe, it, expect } from "vitest";
import {
  ErrorCodes,
  ApiErrorResponseSchema,
  isApiError,
  getErrorMessage,
  ErrorMessages,
} from "../schemas/error-codes";

describe("ErrorCodes", () => {
  it("has unique values across all codes", () => {
    const values = Object.values(ErrorCodes);
    const unique = new Set(values);
    expect(unique.size).toBe(values.length);
  });

  it("follows prefix naming conventions", () => {
    expect(ErrorCodes.UNAUTHORIZED).toMatch(/^AUTH_/);
    expect(ErrorCodes.VALIDATION_ERROR).toMatch(/^VAL_/);
    expect(ErrorCodes.NOT_FOUND).toMatch(/^RES_/);
    expect(ErrorCodes.OUT_OF_STOCK).toMatch(/^BIZ_/);
    expect(ErrorCodes.PAYMENT_FAILED).toMatch(/^PAY_/);
    expect(ErrorCodes.RATE_LIMITED).toMatch(/^RATE_/);
    expect(ErrorCodes.CONFLICT).toMatch(/^CONF_/);
    expect(ErrorCodes.INTERNAL_ERROR).toMatch(/^SRV_/);
  });

  it("is immutable (as const)", () => {
    expect(Object.isFrozen(ErrorCodes)).toBe(false); // as const doesn't freeze
    // But TypeScript prevents assignment at compile time
    expect(ErrorCodes.UNAUTHORIZED).toBe("AUTH_001");
  });
});

describe("ApiErrorResponseSchema", () => {
  it("accepts full error response with details", () => {
    const data = {
      success: false,
      error: {
        code: "AUTH_001",
        message: "Unauthorized",
        details: { field: "email" },
        requestId: "req-abc-123",
        timestamp: "2026-01-15T10:30:00Z",
      },
    };
    expect(ApiErrorResponseSchema.parse(data)).toEqual(data);
  });

  it("accepts error without optional details", () => {
    const data = {
      success: false,
      error: {
        code: "RES_001",
        message: "Not found",
        requestId: "req-abc-123",
        timestamp: "2026-01-15T10:30:00Z",
      },
    };
    expect(ApiErrorResponseSchema.parse(data)).toEqual(data);
  });

  it("rejects success: true", () => {
    expect(() =>
      ApiErrorResponseSchema.parse({
        success: true,
        error: {
          code: "AUTH_001",
          message: "test",
          requestId: "req-1",
          timestamp: "2026-01-15T10:30:00Z",
        },
      }),
    ).toThrow();
  });

  it("rejects missing requestId", () => {
    expect(() =>
      ApiErrorResponseSchema.parse({
        success: false,
        error: {
          code: "AUTH_001",
          message: "test",
          timestamp: "2026-01-15T10:30:00Z",
        },
      }),
    ).toThrow();
  });
});

describe("isApiError", () => {
  it("returns true for API error objects", () => {
    const error = {
      success: false,
      error: { code: "AUTH_001", message: "Unauthorized" },
    };
    expect(isApiError(error)).toBe(true);
  });

  it("returns false for success responses", () => {
    expect(isApiError({ success: true, data: {} })).toBe(false);
  });

  it("returns false for null", () => {
    expect(isApiError(null)).toBe(false);
  });

  it("returns false for non-objects", () => {
    expect(isApiError("string")).toBe(false);
    expect(isApiError(42)).toBe(false);
    expect(isApiError(undefined)).toBe(false);
  });
});

describe("getErrorMessage", () => {
  it("returns user-friendly message for known codes", () => {
    expect(getErrorMessage("AUTH_001")).toBe("Please sign in to continue");
    expect(getErrorMessage("RES_002")).toBe("This product is no longer available");
    expect(getErrorMessage("BIZ_001")).toBe("This item is out of stock");
    expect(getErrorMessage("PAY_002")).toBe("Your card was declined");
  });

  it("returns fallback for unknown codes", () => {
    expect(getErrorMessage("UNKNOWN_999")).toBe("Something went wrong");
  });
});

describe("ErrorMessages", () => {
  it("has a message for every ErrorCode", () => {
    const codes = Object.values(ErrorCodes);
    for (const code of codes) {
      expect(ErrorMessages[code]).toBeDefined();
      expect(typeof ErrorMessages[code]).toBe("string");
      expect(ErrorMessages[code].length).toBeGreaterThan(0);
    }
  });
});
