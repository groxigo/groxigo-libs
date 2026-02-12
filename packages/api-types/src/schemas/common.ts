import { z } from "zod";

// ============================================================================
// PAGINATION
// ============================================================================

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/**
 * Factory for pagination query schemas with configurable defaults.
 */
export function paginationQuery(defaults?: { limit?: number; maxLimit?: number }) {
  return z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce
      .number()
      .int()
      .min(1)
      .max(defaults?.maxLimit ?? 50)
      .default(defaults?.limit ?? 10),
  });
}

/** Pagination metadata returned alongside paginated lists. */
export const PaginationResponseSchema = z.object({
  page: z.number().int().nonnegative(),
  limit: z.number().int().positive(),
  total: z.number().int().nonnegative().optional(),
  totalPages: z.number().int().nonnegative().optional(),
  hasMore: z.boolean(),
}).readonly();

/** Cursor-based pagination query parameters. */
export const CursorPaginationQuerySchema = z.object({
  cursor: z.string().max(500).optional(),
  limit: z.coerce.number().min(1).max(100).default(20),
});

/** Cursor-based pagination metadata. */
export const CursorPaginationResponseSchema = z.object({
  nextCursor: z.string().max(500).nullable(),
  hasMore: z.boolean(),
  limit: z.number().int().positive(),
}).readonly();

// ============================================================================
// ERROR
// ============================================================================

/**
 * @deprecated Use `ApiErrorSchema` instead — this schema is too loose for
 * production error handling. Will be removed in v2.0.0.
 */
export const ErrorSchema = z.object({
  error: z.string(),
});

/** Structured API error response with error code and request tracing. */
export const ApiErrorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string().max(50),
    message: z.string().max(1000),
    requestId: z.string().max(255).optional(),
  }),
}).readonly();

// Alias for OpenAPI documentation
export const ErrorResponseSchema = ApiErrorSchema;

// ============================================================================
// GENERIC RESPONSE FACTORIES
// ============================================================================

/**
 * Creates a paginated list response schema wrapping any item schema.
 *
 * @example
 * ```ts
 * const BrandListResponseSchema = paginatedListResponse("brands", BrandSchema);
 * // { brands: Brand[], pagination: PaginationResponse }
 * ```
 */
export function paginatedListResponse<T extends z.ZodTypeAny>(
  key: string,
  itemSchema: T,
) {
  return z.object({
    [key]: z.array(itemSchema),
    pagination: PaginationResponseSchema,
  });
}

// ============================================================================
// TIMESTAMP HELPERS
// ============================================================================

/** ISO 8601 datetime string (e.g., "2026-01-15T10:30:00Z") */
export const datetimeString = () => z.string().datetime();

/** Date-only string in YYYY-MM-DD format (e.g., "2026-01-15") */
export const dateString = () => z.string().date();

/** Common timestamp fields present on most entities */
export const TimestampFieldsSchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// COMMON PARAMS
// ============================================================================

export const IdParamSchema = z.object({
  id: z.string().uuid(),
});

export const SlugParamSchema = z.object({
  slug: z.string().min(1).max(200),
});

// ============================================================================
// HEALTH CHECK
// ============================================================================

/** Health-check endpoint response. */
export const HealthResponseSchema = z.object({
  status: z.literal("healthy"),
}).readonly();

/** Service metadata response (name, version, uptime). */
export const ServiceInfoSchema = z.object({
  status: z.literal("ok"),
  service: z.string().max(100),
  version: z.string().max(50),
  timestamp: z.string().datetime(),
}).readonly();

// ============================================================================
// INFERRED TYPES
// ============================================================================

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;
export type PaginationResponse = z.infer<typeof PaginationResponseSchema>;
export type CursorPaginationQuery = z.infer<typeof CursorPaginationQuerySchema>;
export type CursorPaginationResponse = z.infer<typeof CursorPaginationResponseSchema>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
export type HealthResponse = z.infer<typeof HealthResponseSchema>;
export type ServiceInfo = z.infer<typeof ServiceInfoSchema>;
export type TimestampFields = z.infer<typeof TimestampFieldsSchema>;
