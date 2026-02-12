import { z } from "zod";

// ============================================================================
// SEARCH SCHEMAS
// Product search and suggestion query definitions
// ============================================================================

// ============================================================================
// CONSTANTS
// ============================================================================

/** Available sort options for product search results. */
export const SORT_OPTIONS = [
  "relevance",
  "price_asc",
  "price_desc",
  "name",
  "newest",
  "popular",
] as const;

/** Sort option enum schema. */
export const SortOptionSchema = z.enum(SORT_OPTIONS);

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

/** Product search query parameters. */
export const SearchQuerySchema = z.object({
  /** Free-text search query. */
  q: z.string().max(500).optional(),
  /** Filter by category UUID. */
  categoryId: z.string().uuid().optional(),
  /** Comma-separated brand UUIDs. */
  brandIds: z.string().max(2000).optional(),
  /** Comma-separated dietary tag slugs. */
  dietaryTags: z.string().max(500).optional(),
  /** Comma-separated tag slugs. */
  tags: z.string().max(500).optional(),
  /** Minimum price filter (USD). */
  priceMin: z.coerce.number().nonnegative().optional(),
  /** Maximum price filter (USD). */
  priceMax: z.coerce.number().nonnegative().optional(),
  /** Filter to products currently on sale. */
  onSale: z.coerce.boolean().optional(),
  /** Filter to in-stock products only. */
  inStock: z.coerce.boolean().optional(),
  /** Sort order for results. */
  sort: SortOptionSchema.default("relevance"),
  /** Page number (1-based). */
  page: z.coerce.number().int().positive().default(1),
  /** Results per page (1–100). */
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/** Autocomplete / typeahead suggestion query. */
export const SuggestionsQuerySchema = z.object({
  /** Search prefix (at least 1 character). */
  q: z.string().min(1, "Search query is required").max(500),
  /** Max number of suggestions (1–20). */
  limit: z.coerce.number().int().min(1).max(20).default(8),
});

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

/** Single search suggestion item. */
export const SearchSuggestionSchema = z.object({
  /** Suggested term or product name. */
  text: z.string().max(500),
  /** Type of suggestion. */
  type: z.enum(["product", "category", "brand", "query"]).optional(),
  /** ID of the referenced entity (if type is product/category/brand). */
  id: z.string().max(255).optional(),
  /** Slug for navigation. */
  slug: z.string().max(255).optional(),
  /** Thumbnail URL for visual suggestions. */
  imageUrl: z.string().max(2000).nullable().optional(),
}).readonly();

/** Search suggestions response. */
export const SuggestionsResponseSchema = z.object({
  suggestions: z.array(SearchSuggestionSchema),
}).readonly();

// ============================================================================
// INFERRED TYPES
// ============================================================================

export type SortOption = z.infer<typeof SortOptionSchema>;
export type SearchQuery = z.infer<typeof SearchQuerySchema>;
export type SuggestionsQuery = z.infer<typeof SuggestionsQuerySchema>;
export type SearchSuggestion = z.infer<typeof SearchSuggestionSchema>;
export type SuggestionsResponse = z.infer<typeof SuggestionsResponseSchema>;
