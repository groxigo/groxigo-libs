import { z } from "zod";

// ============================================================================
// TAB PAGE SCHEMAS
// ============================================================================

// Section type enum
export const SectionTypeSchema = z.enum([
  "stories",
  "banner",
  "deal_section",
  "collection",
  "categories",
  "products",
  "brands",
  "recipes",
  "recipe_categories",
  "recipe_tags",
]);

export type SectionType = z.infer<typeof SectionTypeSchema>;

// SDUI Component type enum - specifies which enterprise component to use
export const SectionComponentSchema = z.enum([
  "ProductSection",
  "CategorySection",
  "BrandSection",
  "BannerSection",
  "StorySection",
  "DealSection",
  "RecipeSection",
  "RecipeCategorySection",
  "RecipeTagSection",
]);

export type SectionComponent = z.infer<typeof SectionComponentSchema>;

// Display type enum
export const DisplayTypeSchema = z.enum([
  "horizontal_scroll",
  "grid_2x2",
  "grid_3x3",
  "carousel",
  "banner_full",
  "list",
]);

export type DisplayType = z.infer<typeof DisplayTypeSchema>;

// ============================================================================
// SECTION ITEM SCHEMAS
// ============================================================================

// Base section item
export const BaseSectionItemSchema = z.object({
  id: z.string(),
});

// Category section item
export const CategorySectionItemSchema = BaseSectionItemSchema.extend({
  name: z.string(),
  slug: z.string(),
  imageUrl: z.string().nullable(),
  productCount: z.number().optional(),
});

export type CategorySectionItem = z.infer<typeof CategorySectionItemSchema>;

// Product section item
export const ProductSectionItemSchema = BaseSectionItemSchema.extend({
  name: z.string(),
  slug: z.string(),
  price: z.number(),
  compareAtPrice: z.number().nullable(),
  imageUrl: z.string().nullable(),
  unit: z.string(),
  unitSize: z.string().nullable(),
  brand: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable()
    .optional(),
  dietaryTags: z.array(z.string()).optional(),
  inStock: z.boolean().optional(),
  // Recipe count - number of recipes using this product as ingredient
  recipeCount: z.number().optional(),
  // Deal-specific fields
  dealPrice: z.number().optional(),
  discountPercent: z.number().optional(),
  quantityLimit: z.number().optional(),
  quantitySold: z.number().optional(),
});

export type ProductSectionItem = z.infer<typeof ProductSectionItemSchema>;

// Brand section item
export const BrandSectionItemSchema = BaseSectionItemSchema.extend({
  name: z.string(),
  slug: z.string(),
  logoUrl: z.string().nullable(),
});

export type BrandSectionItem = z.infer<typeof BrandSectionItemSchema>;

// Story slide item
export const StorySlideItemSchema = z.object({
  id: z.string(),
  type: z.enum(["image", "video"]),
  mediaUrl: z.string(),
  thumbnailUrl: z.string().nullable(),
  duration: z.number(),
  linkType: z.string().nullable(),
  linkId: z.string().nullable(),
  linkText: z.string().nullable(),
});

// Story section item
export const StorySectionItemSchema = BaseSectionItemSchema.extend({
  title: z.string(),
  thumbnailUrl: z.string(),
  hasUnviewed: z.boolean().optional(),
  items: z.array(StorySlideItemSchema),
});

export type StorySectionItem = z.infer<typeof StorySectionItemSchema>;

// Banner section item
export const BannerSectionItemSchema = BaseSectionItemSchema.extend({
  title: z.string(),
  subtitle: z.string().optional(),
  imageUrl: z.string(),
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
  linkType: z.string().optional(),
  linkId: z.string().optional(),
});

export type BannerSectionItem = z.infer<typeof BannerSectionItemSchema>;

// Recipe tag item (used within RecipeSectionItem)
export const RecipeTagItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  type: z.string(),
  color: z.string().nullable(),
});

export type RecipeTagItem = z.infer<typeof RecipeTagItemSchema>;

// Recipe category item (used within RecipeSectionItem)
export const RecipeCategoryItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export type RecipeCategoryItem = z.infer<typeof RecipeCategoryItemSchema>;

// Recipe section item (for recipes section type)
export const RecipeSectionItemSchema = BaseSectionItemSchema.extend({
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  imageUrl: z.string().nullable(),
  thumbnailUrl: z.string().nullable().optional(),
  prepTime: z.number().optional(),
  cookTime: z.number().optional(),
  totalTime: z.number().optional(),
  servings: z.number().optional(),
  difficulty: z.string().optional(),
  cuisine: z.string().nullable().optional(),
  calories: z.number().nullable().optional(),
  rating: z.number().nullable().optional(),
  ratingCount: z.number().optional(),
  category: RecipeCategoryItemSchema.nullable().optional(),
  tags: z.array(RecipeTagItemSchema).optional(),
});

export type RecipeSectionItem = z.infer<typeof RecipeSectionItemSchema>;

// Recipe category section item (for recipe_categories section type)
export const RecipeCategorySectionItemSchema = BaseSectionItemSchema.extend({
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  imageUrl: z.string().nullable(),
  recipeCount: z.number().optional(),
});

export type RecipeCategorySectionItem = z.infer<typeof RecipeCategorySectionItemSchema>;

// Recipe tag section item (for recipe_tags section type)
export const RecipeTagSectionItemSchema = BaseSectionItemSchema.extend({
  name: z.string(),
  slug: z.string(),
  type: z.string(),
  color: z.string().nullable(),
  icon: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(), // For cuisine tags that show as image grid
  recipeCount: z.number().optional(),
});

export type RecipeTagSectionItem = z.infer<typeof RecipeTagSectionItemSchema>;

// Union of all section items
export const SectionItemSchema = z.union([
  CategorySectionItemSchema,
  ProductSectionItemSchema,
  BrandSectionItemSchema,
  StorySectionItemSchema,
  BannerSectionItemSchema,
  RecipeSectionItemSchema,
  RecipeCategorySectionItemSchema,
  RecipeTagSectionItemSchema,
]);

export type SectionItem = z.infer<typeof SectionItemSchema>;

// ============================================================================
// SECTION SCHEMA
// ============================================================================

export const SectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().nullable(),
  icon: z.string().nullable(),
  sectionType: SectionTypeSchema,
  // SDUI component to render - tells frontend which component to use
  component: SectionComponentSchema.optional(),
  displayType: DisplayTypeSchema,
  showViewAll: z.boolean(),
  viewAllLink: z.string().nullable(),
  // Total count of items available (for "See all X items" button)
  totalCount: z.number().optional(),
  backgroundColor: z.string().nullable(),
  // Deal section specific
  endsAt: z.string().nullable().optional(),
  showCountdown: z.boolean().optional(),
  // Items array
  items: z.array(SectionItemSchema),
});

export type Section = z.infer<typeof SectionSchema>;

// ============================================================================
// TAB PAGE SCHEMAS
// ============================================================================

export const TabPageSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  icon: z.string(),
  isDefault: z.boolean(),
  sortOrder: z.number(),
});

export type TabPage = z.infer<typeof TabPageSchema>;

// Tab sections response
export const TabSectionsResponseSchema = z.object({
  tab: TabPageSchema,
  sections: z.array(SectionSchema),
});

export type TabSectionsResponse = z.infer<typeof TabSectionsResponseSchema>;
