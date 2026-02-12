import { z } from "zod";
import { PaginationResponseSchema } from "./common";

// ============================================================================
// BRAND SCHEMAS
// ============================================================================

export const BrandSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  logoUrl: z.string().nullable(),
  websiteUrl: z.string().nullable(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

export const CreateBrandSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  logoUrl: z.string().url().optional(),
  websiteUrl: z.string().url().optional(),
  isActive: z.boolean().default(true),
});

export const UpdateBrandSchema = CreateBrandSchema.partial();

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

export const BrandResponseSchema = z.object({
  brand: BrandSchema,
});

export const BrandListResponseSchema = z.object({
  brands: z.array(BrandSchema),
  pagination: PaginationResponseSchema.optional(),
});

// ============================================================================
// INFERRED TYPES
// ============================================================================

export type Brand = z.infer<typeof BrandSchema>;
export type CreateBrand = z.infer<typeof CreateBrandSchema>;
export type UpdateBrand = z.infer<typeof UpdateBrandSchema>;
export type BrandResponse = z.infer<typeof BrandResponseSchema>;
export type BrandListResponse = z.infer<typeof BrandListResponseSchema>;
