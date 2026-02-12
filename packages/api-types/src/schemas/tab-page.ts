import { z } from "zod";

// ============================================================================
// TAB PAGE SCHEMAS
// Server-driven UI (SDUI) section and tab-page definitions
// ============================================================================

// ============================================================================
// ENUMS
// ============================================================================

/** Legacy section-type identifier stored in the database. */
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

/** SDUI component key — tells the frontend which renderer to use. */
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

/** Visual layout variant for rendering section items. */
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

/** Base fields shared by all section items. */
export const BaseSectionItemSchema = z.object({
  id: z.string().max(255),
});

/** Category section item. */
export const CategorySectionItemSchema = BaseSectionItemSchema.extend({
  name: z.string().max(255),
  slug: z.string().max(255),
  imageUrl: z.string().max(2000).nullable(),
  /** Number of products in this category. */
  productCount: z.number().int().nonnegative().optional(),
}).readonly();

export type CategorySectionItem = z.infer<typeof CategorySectionItemSchema>;

/** Product section item (also used for deal items). */
export const ProductSectionItemSchema = BaseSectionItemSchema.extend({
  name: z.string().max(255),
  slug: z.string().max(255),
  /** Current selling price in USD. */
  price: z.number().nonnegative(),
  /** Original price before discount (null = no discount). */
  compareAtPrice: z.number().nonnegative().nullable(),
  imageUrl: z.string().max(2000).nullable(),
  /** Unit of measurement (e.g., "oz", "lb", "g"). */
  unit: z.string().max(20),
  /** Display size with unit (e.g., "12 Oz"). */
  unitSize: z.string().max(50).nullable(),
  /** Associated brand. */
  brand: z
    .object({
      id: z.string().max(255),
      name: z.string().max(255),
    })
    .nullable()
    .optional(),
  dietaryTags: z.array(z.string().max(50)).optional(),
  inStock: z.boolean().optional(),
  /** Number of recipes that use this product as an ingredient. */
  recipeCount: z.number().int().nonnegative().optional(),
  // Deal-specific fields
  /** Discounted deal price in USD. */
  dealPrice: z.number().nonnegative().optional(),
  /** Percentage discount (0–100). */
  discountPercent: z.number().min(0).max(100).optional(),
  /** Maximum purchase quantity per customer. */
  quantityLimit: z.number().int().positive().optional(),
  /** Units already sold in this deal. */
  quantitySold: z.number().int().nonnegative().optional(),
}).readonly();

export type ProductSectionItem = z.infer<typeof ProductSectionItemSchema>;

/** Brand section item. */
export const BrandSectionItemSchema = BaseSectionItemSchema.extend({
  name: z.string().max(255),
  slug: z.string().max(255),
  logoUrl: z.string().max(2000).nullable(),
}).readonly();

export type BrandSectionItem = z.infer<typeof BrandSectionItemSchema>;

/** Single slide within a story group. */
export const StorySlideItemSchema = z.object({
  id: z.string().max(255),
  /** Media type for this slide. */
  type: z.enum(["image", "video"]),
  /** URL to the full-resolution media asset. */
  mediaUrl: z.string().max(2000),
  /** Thumbnail for loading state / previews. */
  thumbnailUrl: z.string().max(2000).nullable(),
  /** Display duration in seconds. */
  duration: z.number().positive(),
  /** Deep-link type (e.g., "product", "category", "url"). */
  linkType: z.string().max(50).nullable(),
  /** Deep-link target identifier. */
  linkId: z.string().max(255).nullable(),
  /** Call-to-action label. */
  linkText: z.string().max(100).nullable(),
}).readonly();

/** Story group section item (avatar + slides). */
export const StorySectionItemSchema = BaseSectionItemSchema.extend({
  /** Story group title shown below the avatar. */
  title: z.string().max(255),
  /** Avatar thumbnail URL for the story ring. */
  thumbnailUrl: z.string().max(2000),
  /** Whether the current user has unseen slides. */
  hasUnviewed: z.boolean().optional(),
  /** Ordered slides within this story group. */
  items: z.array(StorySlideItemSchema),
}).readonly();

export type StorySectionItem = z.infer<typeof StorySectionItemSchema>;

/** Banner / hero-image section item. */
export const BannerSectionItemSchema = BaseSectionItemSchema.extend({
  title: z.string().max(255),
  subtitle: z.string().max(500).optional(),
  /** Banner image URL. */
  imageUrl: z.string().max(2000),
  /** CSS background colour (e.g., "#FF5722"). */
  backgroundColor: z.string().max(20).optional(),
  /** CSS foreground / text colour. */
  textColor: z.string().max(20).optional(),
  /** Deep-link type. */
  linkType: z.string().max(50).optional(),
  /** Deep-link target identifier. */
  linkId: z.string().max(255).optional(),
}).readonly();

export type BannerSectionItem = z.infer<typeof BannerSectionItemSchema>;

/** Tag attached to a recipe (dietary, cuisine, etc.). */
export const RecipeTagItemSchema = z.object({
  id: z.string().max(255),
  name: z.string().max(255),
  slug: z.string().max(255),
  /** Tag taxonomy type (e.g., "dietary", "cuisine", "course"). */
  type: z.string().max(50),
  /** Display colour (hex). */
  color: z.string().max(20).nullable(),
}).readonly();

export type RecipeTagItem = z.infer<typeof RecipeTagItemSchema>;

/** Recipe category for grouping recipes (e.g., "Breakfast", "Desserts"). */
export const RecipeCategoryItemSchema = z.object({
  id: z.string().max(255),
  name: z.string().max(255),
  slug: z.string().max(255),
}).readonly();

export type RecipeCategoryItem = z.infer<typeof RecipeCategoryItemSchema>;

/** Recipe section item with full detail. */
export const RecipeSectionItemSchema = BaseSectionItemSchema.extend({
  title: z.string().max(255),
  slug: z.string().max(255),
  description: z.string().max(2000).nullable().optional(),
  imageUrl: z.string().max(2000).nullable(),
  thumbnailUrl: z.string().max(2000).nullable().optional(),
  /** Preparation time in minutes. */
  prepTime: z.number().int().nonnegative().optional(),
  /** Cooking time in minutes. */
  cookTime: z.number().int().nonnegative().optional(),
  /** Total time in minutes (prep + cook + rest). */
  totalTime: z.number().int().nonnegative().optional(),
  /** Number of servings. */
  servings: z.number().int().positive().optional(),
  /** Difficulty level (e.g., "easy", "medium", "hard"). */
  difficulty: z.string().max(20).optional(),
  /** Cuisine type (e.g., "Indian", "Pakistani"). */
  cuisine: z.string().max(100).nullable().optional(),
  /** Calories per serving. */
  calories: z.number().nonnegative().nullable().optional(),
  /** Average user rating (0–5). */
  rating: z.number().min(0).max(5).nullable().optional(),
  /** Total number of user ratings. */
  ratingCount: z.number().int().nonnegative().optional(),
  category: RecipeCategoryItemSchema.nullable().optional(),
  tags: z.array(RecipeTagItemSchema).optional(),
}).readonly();

export type RecipeSectionItem = z.infer<typeof RecipeSectionItemSchema>;

/** Recipe category as a section item (for recipe_categories section type). */
export const RecipeCategorySectionItemSchema = BaseSectionItemSchema.extend({
  name: z.string().max(255),
  slug: z.string().max(255),
  description: z.string().max(2000).nullable().optional(),
  imageUrl: z.string().max(2000).nullable(),
  /** Number of recipes in this category. */
  recipeCount: z.number().int().nonnegative().optional(),
}).readonly();

export type RecipeCategorySectionItem = z.infer<typeof RecipeCategorySectionItemSchema>;

/** Recipe tag as a section item (for recipe_tags section type). */
export const RecipeTagSectionItemSchema = BaseSectionItemSchema.extend({
  name: z.string().max(255),
  slug: z.string().max(255),
  /** Tag taxonomy type (e.g., "dietary", "cuisine"). */
  type: z.string().max(50),
  /** Display colour (hex). */
  color: z.string().max(20).nullable(),
  /** Optional icon identifier. */
  icon: z.string().max(100).nullable().optional(),
  /** Image URL for cuisine tags displayed as an image grid. */
  imageUrl: z.string().max(2000).nullable().optional(),
  /** Number of recipes with this tag. */
  recipeCount: z.number().int().nonnegative().optional(),
}).readonly();

export type RecipeTagSectionItem = z.infer<typeof RecipeTagSectionItemSchema>;

/** Union of all section item schemas (one per section type). */
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

/** A single SDUI section containing a typed array of items. */
export const SectionSchema = z.object({
  id: z.string().max(255),
  /** Section heading shown above the items. */
  title: z.string().max(255),
  /** Optional secondary heading. */
  subtitle: z.string().max(500).nullable(),
  /** Optional icon identifier for the section title. */
  icon: z.string().max(100).nullable(),
  /** Legacy section type (DB enum). */
  sectionType: SectionTypeSchema,
  /** SDUI component key — tells frontend which renderer to use. */
  component: SectionComponentSchema.optional(),
  /** Visual layout for rendering the items. */
  displayType: DisplayTypeSchema,
  /** Whether to show a "View all" link. */
  showViewAll: z.boolean(),
  /** Deep-link for the "View all" action. */
  viewAllLink: z.string().max(500).nullable(),
  /** Total available items (for "See all X items" messaging). */
  totalCount: z.number().int().nonnegative().optional(),
  /** Section background colour (CSS value). */
  backgroundColor: z.string().max(20).nullable(),
  /** ISO datetime when a deal ends (deal sections only). */
  endsAt: z.string().max(30).nullable().optional(),
  /** Whether to show a live countdown timer (deal sections only). */
  showCountdown: z.boolean().optional(),
  /** Ordered items within this section. */
  items: z.array(SectionItemSchema),
}).readonly();

export type Section = z.infer<typeof SectionSchema>;

// ============================================================================
// TAB PAGE SCHEMAS
// ============================================================================

/** Navigation tab definition for the home screen. */
export const TabPageSchema = z.object({
  id: z.string().max(255),
  /** URL-safe tab slug (e.g., "home", "deals", "recipes"). */
  slug: z.string().max(255),
  /** Display label for the tab. */
  title: z.string().max(100),
  /** Icon identifier for the tab bar. */
  icon: z.string().max(100),
  /** Whether this is the default/landing tab. */
  isDefault: z.boolean(),
  /** Ordering weight (lower = further left). */
  sortOrder: z.number().int(),
}).readonly();

export type TabPage = z.infer<typeof TabPageSchema>;

/** Response containing a tab and its SDUI sections. */
export const TabSectionsResponseSchema = z.object({
  tab: TabPageSchema,
  sections: z.array(SectionSchema),
}).readonly();

export type TabSectionsResponse = z.infer<typeof TabSectionsResponseSchema>;
