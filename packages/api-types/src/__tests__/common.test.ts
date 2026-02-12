import { describe, it, expect } from "vitest";
import {
  PaginationQuerySchema,
  PaginationResponseSchema,
  CursorPaginationQuerySchema,
  CursorPaginationResponseSchema,
  ApiErrorSchema,
  ErrorSchema,
  IdParamSchema,
  SlugParamSchema,
  HealthResponseSchema,
  ServiceInfoSchema,
  TimestampFieldsSchema,
  paginationQuery,
  paginatedListResponse,
} from "../schemas/common";
import { z } from "zod";

// ============================================================================
// PAGINATION
// ============================================================================

describe("PaginationQuerySchema", () => {
  it("accepts valid pagination params", () => {
    const result = PaginationQuerySchema.parse({ page: 2, limit: 50 });
    expect(result).toEqual({ page: 2, limit: 50 });
  });

  it("applies defaults when omitted", () => {
    const result = PaginationQuerySchema.parse({});
    expect(result).toEqual({ page: 1, limit: 20 });
  });

  it("coerces string values from query params", () => {
    const result = PaginationQuerySchema.parse({ page: "3", limit: "25" });
    expect(result).toEqual({ page: 3, limit: 25 });
  });

  it("rejects page < 1", () => {
    expect(() => PaginationQuerySchema.parse({ page: 0 })).toThrow();
  });

  it("rejects limit > 100", () => {
    expect(() => PaginationQuerySchema.parse({ limit: 200 })).toThrow();
  });

  it("rejects non-integer page", () => {
    expect(() => PaginationQuerySchema.parse({ page: 1.5 })).toThrow();
  });
});

describe("PaginationResponseSchema", () => {
  it("accepts full pagination response", () => {
    const data = { page: 1, limit: 20, total: 100, totalPages: 5, hasMore: true };
    expect(PaginationResponseSchema.parse(data)).toEqual(data);
  });

  it("accepts response without optional total fields", () => {
    const data = { page: 1, limit: 20, hasMore: false };
    expect(PaginationResponseSchema.parse(data)).toEqual(data);
  });
});

describe("CursorPaginationQuerySchema", () => {
  it("accepts cursor string", () => {
    const result = CursorPaginationQuerySchema.parse({ cursor: "abc123", limit: 10 });
    expect(result.cursor).toBe("abc123");
  });

  it("applies default limit", () => {
    const result = CursorPaginationQuerySchema.parse({});
    expect(result.limit).toBe(20);
  });
});

describe("CursorPaginationResponseSchema", () => {
  it("accepts valid cursor response", () => {
    const data = { nextCursor: "next-abc", hasMore: true, limit: 20 };
    expect(CursorPaginationResponseSchema.parse(data)).toEqual(data);
  });

  it("accepts null nextCursor at end of list", () => {
    const data = { nextCursor: null, hasMore: false, limit: 20 };
    expect(CursorPaginationResponseSchema.parse(data)).toEqual(data);
  });
});

describe("paginationQuery factory", () => {
  it("applies custom defaults", () => {
    const schema = paginationQuery({ limit: 5, maxLimit: 25 });
    const result = schema.parse({});
    expect(result).toEqual({ page: 1, limit: 5 });
  });

  it("enforces custom maxLimit", () => {
    const schema = paginationQuery({ maxLimit: 25 });
    expect(() => schema.parse({ limit: 30 })).toThrow();
  });
});

// ============================================================================
// ERROR
// ============================================================================

describe("ApiErrorSchema", () => {
  it("accepts valid API error", () => {
    const data = {
      success: false,
      error: { code: "AUTH_001", message: "Unauthorized", requestId: "req-123" },
    };
    expect(ApiErrorSchema.parse(data)).toEqual(data);
  });

  it("accepts error without requestId", () => {
    const data = {
      success: false,
      error: { code: "RES_001", message: "Not found" },
    };
    expect(ApiErrorSchema.parse(data)).toEqual(data);
  });

  it("rejects success: true", () => {
    const data = {
      success: true,
      error: { code: "AUTH_001", message: "Unauthorized" },
    };
    expect(() => ApiErrorSchema.parse(data)).toThrow();
  });
});

describe("ErrorSchema (deprecated)", () => {
  it("still works but is intentionally loose", () => {
    expect(ErrorSchema.parse({ error: "something" })).toEqual({ error: "something" });
  });
});

// ============================================================================
// PARAMS
// ============================================================================

describe("IdParamSchema", () => {
  it("accepts valid UUID", () => {
    const id = "550e8400-e29b-41d4-a716-446655440000";
    expect(IdParamSchema.parse({ id })).toEqual({ id });
  });

  it("rejects non-UUID string", () => {
    expect(() => IdParamSchema.parse({ id: "not-a-uuid" })).toThrow();
  });
});

describe("SlugParamSchema", () => {
  it("accepts valid slug", () => {
    expect(SlugParamSchema.parse({ slug: "organic-milk" })).toEqual({ slug: "organic-milk" });
  });

  it("rejects empty slug", () => {
    expect(() => SlugParamSchema.parse({ slug: "" })).toThrow();
  });

  it("rejects slug exceeding 200 chars", () => {
    expect(() => SlugParamSchema.parse({ slug: "a".repeat(201) })).toThrow();
  });
});

// ============================================================================
// HEALTH CHECK
// ============================================================================

describe("HealthResponseSchema", () => {
  it("accepts healthy status", () => {
    expect(HealthResponseSchema.parse({ status: "healthy" })).toEqual({ status: "healthy" });
  });

  it("rejects non-healthy status", () => {
    expect(() => HealthResponseSchema.parse({ status: "unhealthy" })).toThrow();
  });
});

describe("ServiceInfoSchema", () => {
  it("accepts valid service info", () => {
    const data = {
      status: "ok",
      service: "groxigo-api",
      version: "1.0.0",
      timestamp: "2026-01-15T10:30:00Z",
    };
    expect(ServiceInfoSchema.parse(data)).toEqual(data);
  });
});

// ============================================================================
// RESPONSE FACTORIES
// ============================================================================

describe("paginatedListResponse factory", () => {
  it("creates a paginated list schema", () => {
    const ItemSchema = z.object({ id: z.string(), name: z.string() });
    const ListSchema = paginatedListResponse("items", ItemSchema);

    const data = {
      items: [{ id: "1", name: "Test" }],
      pagination: { page: 1, limit: 10, hasMore: false },
    };
    expect(ListSchema.parse(data)).toEqual(data);
  });

  it("rejects missing pagination", () => {
    const ItemSchema = z.object({ id: z.string() });
    const ListSchema = paginatedListResponse("items", ItemSchema);
    expect(() => ListSchema.parse({ items: [] })).toThrow();
  });
});

// ============================================================================
// TIMESTAMP HELPERS
// ============================================================================

describe("TimestampFieldsSchema", () => {
  it("accepts valid ISO datetime strings", () => {
    const data = {
      createdAt: "2026-01-15T10:30:00Z",
      updatedAt: "2026-01-15T11:00:00Z",
    };
    expect(TimestampFieldsSchema.parse(data)).toEqual(data);
  });

  it("rejects non-datetime string", () => {
    expect(() =>
      TimestampFieldsSchema.parse({ createdAt: "not-a-date", updatedAt: "2026-01-15T10:30:00Z" }),
    ).toThrow();
  });
});
