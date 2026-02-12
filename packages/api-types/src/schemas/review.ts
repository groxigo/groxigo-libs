import { z } from "zod";
import { PaginationResponseSchema } from "./common";

// ============================================================================
// REVIEW SCHEMAS
// Product reviews, ratings, and moderation
// ============================================================================

// ============================================================================
// ENUMS
// ============================================================================

/** Review sort options. */
export const ReviewSortSchema = z.enum([
  "recent",
  "helpful",
  "rating_high",
  "rating_low",
]);

/** Review moderation statuses. */
export const ReviewStatusSchema = z.enum([
  "pending",
  "approved",
  "rejected",
]);

/** Review vote types. */
export const ReviewVoteTypeSchema = z.enum(["helpful", "report"]);

// ============================================================================
// ENTITY SCHEMAS
// ============================================================================

/** Product review as returned by the API. */
export const ReviewSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  customerId: z.string().uuid(),
  /** Reviewer display name. */
  displayName: z.string().max(255).nullable(),
  /** Star rating (1–5). */
  rating: z.number().int().min(1).max(5),
  /** Review headline. */
  title: z.string().max(255).nullable(),
  /** Review body text. */
  content: z.string().max(5000).nullable(),
  /** Attached image URLs (max 5). */
  imageUrls: z.array(z.string().url().max(2000)).max(5),
  /** Whether this review is from a verified purchase. */
  isVerifiedPurchase: z.boolean(),
  /** Number of "helpful" votes. */
  helpfulCount: z.number().int().nonnegative(),
  /** Moderation status. */
  status: ReviewStatusSchema,
  /** Associated order UUID (for verified purchase). */
  orderId: z.string().uuid().nullable().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).readonly();

/** Aggregated rating summary for a product. */
export const RatingSummarySchema = z.object({
  /** Average rating (1.0–5.0). */
  averageRating: z.number().min(0).max(5),
  /** Total number of reviews. */
  totalReviews: z.number().int().nonnegative(),
  /** Breakdown by star (1–5). */
  distribution: z.object({
    1: z.number().int().nonnegative(),
    2: z.number().int().nonnegative(),
    3: z.number().int().nonnegative(),
    4: z.number().int().nonnegative(),
    5: z.number().int().nonnegative(),
  }),
}).readonly();

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

/** Create a product review. */
export const CreateReviewSchema = z.object({
  /** Star rating (1–5). */
  rating: z.number({ required_error: "Rating is required" }).int().min(1, "Rating must be 1–5").max(5, "Rating must be 1–5"),
  /** Review headline (optional). */
  title: z.string().max(255).optional(),
  /** Review body text (optional). */
  content: z.string().max(5000).optional(),
  /** Attached image URLs (max 5). */
  imageUrls: z.array(z.string().url().max(2000)).max(5).default([]),
  /** Order UUID for verified purchase badge. */
  orderId: z.string().uuid().optional(),
});

/** Update an existing review. */
export const UpdateReviewSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  title: z.string().max(255).optional().nullable(),
  content: z.string().max(5000).optional().nullable(),
  imageUrls: z.array(z.string().url().max(2000)).max(5).optional(),
});

/** Vote on a review (helpful or report). */
export const VoteReviewSchema = z.object({
  voteType: ReviewVoteTypeSchema,
});

/** Admin: moderate a review. */
export const ModerateReviewSchema = z.object({
  status: z.enum(["approved", "rejected"]),
  /** Internal moderation notes. */
  moderationNotes: z.string().max(1000).optional(),
});

/** Query params for listing reviews (customer-facing). */
export const ListReviewsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  /** Sort order. */
  sortBy: ReviewSortSchema.default("recent"),
  /** Filter by star rating. */
  rating: z.coerce.number().int().min(1).max(5).optional(),
});

/** Query params for listing reviews (admin). */
export const AdminListReviewsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  /** Filter by moderation status. */
  status: ReviewStatusSchema.optional(),
  /** Filter by product. */
  productId: z.string().uuid().optional(),
});

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

/** Single review response. */
export const ReviewResponseSchema = z.object({
  review: ReviewSchema,
}).readonly();

/** Paginated review list response. */
export const ReviewListResponseSchema = z.object({
  reviews: z.array(ReviewSchema),
  pagination: PaginationResponseSchema,
  /** Aggregated rating summary for the product. */
  summary: RatingSummarySchema.optional(),
}).readonly();

// ============================================================================
// INFERRED TYPES
// ============================================================================

export type ReviewSort = z.infer<typeof ReviewSortSchema>;
export type ReviewStatus = z.infer<typeof ReviewStatusSchema>;
export type ReviewVoteType = z.infer<typeof ReviewVoteTypeSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type RatingSummary = z.infer<typeof RatingSummarySchema>;
export type CreateReviewInput = z.infer<typeof CreateReviewSchema>;
export type UpdateReviewInput = z.infer<typeof UpdateReviewSchema>;
export type VoteReviewInput = z.infer<typeof VoteReviewSchema>;
export type ModerateReviewInput = z.infer<typeof ModerateReviewSchema>;
export type ListReviewsQuery = z.infer<typeof ListReviewsQuerySchema>;
export type AdminListReviewsQuery = z.infer<typeof AdminListReviewsQuerySchema>;
export type ReviewResponse = z.infer<typeof ReviewResponseSchema>;
export type ReviewListResponse = z.infer<typeof ReviewListResponseSchema>;
