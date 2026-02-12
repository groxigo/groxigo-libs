import { z } from "zod";
import { PaginationQuerySchema, PaginationResponseSchema } from "./common";

// ============================================================================
// PRODUCT SCHEMAS
// ============================================================================

/** Product entity as returned by the API. */
export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(255),
  slug: z.string().max(255),
  description: z.string().max(5000).nullable(),
  shortDescription: z.string().max(500).nullable(),
  sku: z.string().max(100),
  barcode: z.string().max(50).nullable(),
  categoryId: z.string().uuid(),
  brandId: z.string().uuid().nullable(),
  price: z.number().nonnegative(),
  compareAtPrice: z.number().nonnegative().nullable(),
  unit: z.string().max(50),
  unitSize: z.string().max(50).nullable(),
  dietaryTags: z.array(z.string().min(1)),
  stockQuantity: z.number().int().min(0),
  isActive: z.boolean(),
  isAvailable: z.boolean(),
  /** ISO 8601 datetime (e.g., "2026-01-15T10:30:00Z") */
  createdAt: z.string().datetime(),
  /** ISO 8601 datetime (e.g., "2026-01-15T10:30:00Z") */
  updatedAt: z.string().datetime(),
}).readonly();

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

/** Query params for product list / search. */
export const ProductQuerySchema = PaginationQuerySchema.extend({
  categoryId: z.string().uuid().optional(),
  brandId: z.string().uuid().optional(),
  search: z.string().max(200).optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  inStock: z.coerce.boolean().optional(),
  /** Comma-separated dietary tags (e.g., "organic,gluten-free") */
  dietaryTags: z.string().max(500).optional(),
  sortBy: z.enum(["name", "price", "createdAt"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

/** Payload for creating a new product (admin). */
export const CreateProductSchema = z.object({
  name: z.string({ required_error: "Product name is required" }).min(1, "Product name cannot be empty").max(255),
  slug: z.string().min(1).max(255).optional(),
  description: z.string().max(5000).optional(),
  shortDescription: z.string().max(500).optional(),
  sku: z.string({ required_error: "SKU is required" }).min(1, "SKU cannot be empty").max(100),
  barcode: z.string().max(50).optional(),
  categoryId: z.string({ required_error: "Category is required" }).uuid("Invalid category ID"),
  brandId: z.string().uuid("Invalid brand ID").optional(),
  price: z.number({ required_error: "Price is required" }).positive("Price must be greater than zero"),
  compareAtPrice: z.number().positive("Compare-at price must be greater than zero").optional(),
  unit: z.string({ required_error: "Unit is required" }).min(1, "Unit cannot be empty").max(50),
  unitSize: z.string().max(50).optional(),
  dietaryTags: z.array(z.string().min(1)).optional(),
  stockQuantity: z.number().int("Stock must be a whole number").min(0, "Stock cannot be negative").default(0),
  lowStockThreshold: z.number().int().min(0).default(10),
  isActive: z.boolean().default(true),
});

/** Partial product update (admin). */
export const UpdateProductSchema = CreateProductSchema.partial();

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

/** Single product response wrapper. */
export const ProductResponseSchema = z.object({
  product: ProductSchema,
}).readonly();

/** Paginated product list response. */
export const ProductListResponseSchema = z.object({
  products: z.array(ProductSchema),
  pagination: PaginationResponseSchema,
}).readonly();

// ============================================================================
// INFERRED TYPES
// ============================================================================

export type Product = z.infer<typeof ProductSchema>;
export type ProductQuery = z.infer<typeof ProductQuerySchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;
export type ProductResponse = z.infer<typeof ProductResponseSchema>;
export type ProductListResponse = z.infer<typeof ProductListResponseSchema>;
