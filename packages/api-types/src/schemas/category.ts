import { z } from "zod";
import { PaginationResponseSchema } from "./common";

// ============================================================================
// CATEGORY SCHEMAS
// ============================================================================

/** Category entity as returned by the API. */
export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(255),
  slug: z.string().max(255),
  description: z.string().max(2000).nullable(),
  imageUrl: z.string().max(2000).nullable(),
  parentId: z.string().uuid().nullable(),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/** Category with recursive children (for tree navigation). */
export const CategoryWithChildrenSchema: z.ZodType<CategoryWithChildren> = CategorySchema.extend({
  children: z.lazy(() => z.array(CategoryWithChildrenSchema)).optional(),
  productCount: z.number().int().nonnegative().optional(),
});

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

/** Payload for creating a new category (admin). */
export const CreateCategorySchema = z.object({
  name: z.string({ required_error: "Category name is required" }).min(1, "Category name cannot be empty").max(255),
  slug: z.string().min(1).max(255).optional(),
  description: z.string().max(2000).optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
  parentId: z.string().uuid("Invalid parent category ID").optional(),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

/** Partial category update (admin). */
export const UpdateCategorySchema = CreateCategorySchema.partial();

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

/** Single category response wrapper. */
export const CategoryResponseSchema = z.object({
  category: CategorySchema,
}).readonly();

/** Category list with optional pagination. */
export const CategoryListResponseSchema = z.object({
  categories: z.array(CategorySchema),
  pagination: PaginationResponseSchema.optional(),
}).readonly();

/** Category tree response (nested children). */
export const CategoryTreeResponseSchema = z.object({
  categories: z.array(CategoryWithChildrenSchema),
}).readonly();

// ============================================================================
// INFERRED TYPES
// ============================================================================

export type Category = z.infer<typeof CategorySchema>;
export type CategoryWithChildren = z.infer<typeof CategorySchema> & {
  children?: CategoryWithChildren[];
  productCount?: number;
};
export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;
export type CategoryResponse = z.infer<typeof CategoryResponseSchema>;
export type CategoryListResponse = z.infer<typeof CategoryListResponseSchema>;
export type CategoryTreeResponse = z.infer<typeof CategoryTreeResponseSchema>;
