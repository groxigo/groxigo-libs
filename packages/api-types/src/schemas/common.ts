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

export const PaginationResponseSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number().optional(),
  totalPages: z.number().optional(),
  hasMore: z.boolean(),
});

// Cursor-based pagination
export const CursorPaginationQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export const CursorPaginationResponseSchema = z.object({
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
  limit: z.number(),
});

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

export const ApiErrorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    requestId: z.string().optional(),
  }),
});

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

export const HealthResponseSchema = z.object({
  status: z.literal("healthy"),
});

export const ServiceInfoSchema = z.object({
  status: z.literal("ok"),
  service: z.string(),
  version: z.string(),
  timestamp: z.string().datetime(),
});

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
