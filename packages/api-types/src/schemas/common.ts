import { z } from "zod";

// ============================================================================
// PAGINATION
// ============================================================================

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export const PaginationResponseSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

// ============================================================================
// ERROR
// ============================================================================

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
// COMMON PARAMS
// ============================================================================

export const IdParamSchema = z.object({
  id: z.string().uuid(),
});

export const SlugParamSchema = z.object({
  slug: z.string(),
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
export type ApiError = z.infer<typeof ApiErrorSchema>;
export type HealthResponse = z.infer<typeof HealthResponseSchema>;
export type ServiceInfo = z.infer<typeof ServiceInfoSchema>;
