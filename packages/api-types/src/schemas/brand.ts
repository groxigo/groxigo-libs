import { z } from "zod";
import { PaginationResponseSchema } from "./common";

// ============================================================================
// BRAND SCHEMAS
// ============================================================================

/** Brand entity as returned by the API. */
export const BrandSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(255),
  slug: z.string().max(255),
  description: z.string().max(2000).nullable(),
  logoUrl: z.string().max(2000).nullable(),
  websiteUrl: z.string().max(2000).nullable(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).readonly();

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

/** Payload for creating a new brand (admin). */
export const CreateBrandSchema = z.object({
  name: z.string({ required_error: "Brand name is required" }).min(1, "Brand name cannot be empty").max(255),
  slug: z.string().min(1).max(255).optional(),
  description: z.string().max(2000).optional(),
  logoUrl: z.string().url("Invalid logo URL").optional(),
  websiteUrl: z.string().url("Invalid website URL").optional(),
  isActive: z.boolean().default(true),
});

/** Partial brand update (admin). */
export const UpdateBrandSchema = CreateBrandSchema.partial();

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

/** Single brand response wrapper. */
export const BrandResponseSchema = z.object({
  brand: BrandSchema,
}).readonly();

/** Brand list with optional pagination. */
export const BrandListResponseSchema = z.object({
  brands: z.array(BrandSchema),
  pagination: PaginationResponseSchema.optional(),
}).readonly();

// ============================================================================
// INFERRED TYPES
// ============================================================================

export type Brand = z.infer<typeof BrandSchema>;
export type CreateBrand = z.infer<typeof CreateBrandSchema>;
export type UpdateBrand = z.infer<typeof UpdateBrandSchema>;
export type BrandResponse = z.infer<typeof BrandResponseSchema>;
export type BrandListResponse = z.infer<typeof BrandListResponseSchema>;
