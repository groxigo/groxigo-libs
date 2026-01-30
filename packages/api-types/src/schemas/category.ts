import { z } from "zod";

// ============================================================================
// CATEGORY SCHEMAS
// ============================================================================

export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  parentId: z.string().uuid().nullable(),
  sortOrder: z.number(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Category with children (for tree structure)
export const CategoryWithChildrenSchema: z.ZodType<CategoryWithChildren> = CategorySchema.extend({
  children: z.lazy(() => z.array(CategoryWithChildrenSchema)).optional(),
  productCount: z.number().optional(),
});

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

export const CreateCategorySchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  parentId: z.string().uuid().optional(),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const UpdateCategorySchema = CreateCategorySchema.partial();

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

export const CategoryResponseSchema = z.object({
  category: CategorySchema,
});

export const CategoryListResponseSchema = z.object({
  categories: z.array(CategorySchema),
});

export const CategoryTreeResponseSchema = z.object({
  categories: z.array(CategoryWithChildrenSchema),
});

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
