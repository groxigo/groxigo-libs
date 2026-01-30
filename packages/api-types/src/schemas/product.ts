import { z } from "zod";
import { PaginationQuerySchema, PaginationResponseSchema } from "./common";

// ============================================================================
// PRODUCT SCHEMAS
// ============================================================================

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  shortDescription: z.string().nullable(),
  sku: z.string(),
  barcode: z.string().nullable(),
  categoryId: z.string().uuid(),
  brandId: z.string().uuid().nullable(),
  price: z.number(),
  compareAtPrice: z.number().nullable(),
  unit: z.string(),
  unitSize: z.string().nullable(),
  dietaryTags: z.array(z.string()),
  stockQuantity: z.number(),
  isActive: z.boolean(),
  isAvailable: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

export const ProductQuerySchema = PaginationQuerySchema.extend({
  categoryId: z.string().uuid().optional(),
  brandId: z.string().uuid().optional(),
  search: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  inStock: z.coerce.boolean().optional(),
  dietaryTags: z.string().optional(), // comma-separated
  sortBy: z.enum(["name", "price", "createdAt"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const CreateProductSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  shortDescription: z.string().max(500).optional(),
  sku: z.string().min(1).max(100),
  barcode: z.string().optional(),
  categoryId: z.string().uuid(),
  brandId: z.string().uuid().optional(),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().optional(),
  unit: z.string().min(1).max(50),
  unitSize: z.string().optional(),
  dietaryTags: z.array(z.string()).optional(),
  stockQuantity: z.number().int().min(0).default(0),
  lowStockThreshold: z.number().int().min(0).default(10),
  isActive: z.boolean().default(true),
});

export const UpdateProductSchema = CreateProductSchema.partial();

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

export const ProductResponseSchema = z.object({
  product: ProductSchema,
});

export const ProductListResponseSchema = z.object({
  products: z.array(ProductSchema),
  pagination: PaginationResponseSchema,
});

// ============================================================================
// INFERRED TYPES
// ============================================================================

export type Product = z.infer<typeof ProductSchema>;
export type ProductQuery = z.infer<typeof ProductQuerySchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;
export type ProductResponse = z.infer<typeof ProductResponseSchema>;
export type ProductListResponse = z.infer<typeof ProductListResponseSchema>;
