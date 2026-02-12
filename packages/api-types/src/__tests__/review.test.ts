import { describe, it, expect } from "vitest";
import {
  ReviewSortSchema,
  ReviewStatusSchema,
  ReviewVoteTypeSchema,
  ReviewSchema,
  RatingSummarySchema,
  CreateReviewSchema,
  UpdateReviewSchema,
  VoteReviewSchema,
  ModerateReviewSchema,
  ListReviewsQuerySchema,
  AdminListReviewsQuerySchema,
  ReviewResponseSchema,
  ReviewListResponseSchema,
} from "../schemas/review";

const validReview = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  productId: "550e8400-e29b-41d4-a716-446655440001",
  customerId: "550e8400-e29b-41d4-a716-446655440002",
  displayName: "Priya S.",
  rating: 5,
  title: "Best basmati rice!",
  content: "Authentic taste, great quality. Will order again.",
  imageUrls: ["https://example.com/review1.jpg"],
  isVerifiedPurchase: true,
  helpfulCount: 12,
  status: "approved" as const,
  orderId: "550e8400-e29b-41d4-a716-446655440003",
  createdAt: "2026-01-15T10:30:00Z",
  updatedAt: "2026-01-15T10:30:00Z",
};

describe("ReviewSortSchema", () => {
  it("accepts all sort options", () => {
    for (const s of ["recent", "helpful", "rating_high", "rating_low"]) {
      expect(ReviewSortSchema.parse(s)).toBe(s);
    }
  });
});

describe("ReviewStatusSchema", () => {
  it("accepts all statuses", () => {
    for (const s of ["pending", "approved", "rejected"]) {
      expect(ReviewStatusSchema.parse(s)).toBe(s);
    }
  });
});

describe("ReviewSchema", () => {
  it("accepts valid review", () => {
    const result = ReviewSchema.parse(validReview);
    expect(result.rating).toBe(5);
    expect(result.isVerifiedPurchase).toBe(true);
    expect(result.imageUrls).toHaveLength(1);
  });

  it("accepts review with nullable fields", () => {
    const review = { ...validReview, displayName: null, title: null, content: null, orderId: null };
    const result = ReviewSchema.parse(review);
    expect(result.title).toBeNull();
  });

  it("rejects rating > 5", () => {
    expect(() => ReviewSchema.parse({ ...validReview, rating: 6 })).toThrow();
  });

  it("rejects rating < 1", () => {
    expect(() => ReviewSchema.parse({ ...validReview, rating: 0 })).toThrow();
  });

  it("rejects more than 5 image URLs", () => {
    expect(() => ReviewSchema.parse({
      ...validReview,
      imageUrls: Array.from({ length: 6 }, (_, i) => `https://example.com/${i}.jpg`),
    })).toThrow();
  });
});

describe("RatingSummarySchema", () => {
  it("accepts valid summary", () => {
    const data = {
      averageRating: 4.3,
      totalReviews: 156,
      distribution: { 1: 5, 2: 8, 3: 20, 4: 50, 5: 73 },
    };
    const result = RatingSummarySchema.parse(data);
    expect(result.averageRating).toBe(4.3);
    expect(result.distribution[5]).toBe(73);
  });

  it("rejects averageRating > 5", () => {
    expect(() => RatingSummarySchema.parse({
      averageRating: 5.5, totalReviews: 1, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 1 },
    })).toThrow();
  });
});

describe("CreateReviewSchema", () => {
  it("accepts valid review creation", () => {
    const result = CreateReviewSchema.parse({ rating: 4, title: "Good product" });
    expect(result.imageUrls).toEqual([]);
  });

  it("rejects missing rating", () => {
    expect(() => CreateReviewSchema.parse({ title: "No rating" })).toThrow();
  });

  it("rejects rating 0", () => {
    expect(() => CreateReviewSchema.parse({ rating: 0 })).toThrow();
  });

  it("rejects content > 5000 chars", () => {
    expect(() => CreateReviewSchema.parse({ rating: 3, content: "x".repeat(5001) })).toThrow();
  });

  it("rejects more than 5 images", () => {
    expect(() => CreateReviewSchema.parse({
      rating: 3,
      imageUrls: Array.from({ length: 6 }, (_, i) => `https://example.com/${i}.jpg`),
    })).toThrow();
  });
});

describe("UpdateReviewSchema", () => {
  it("accepts partial update", () => {
    const result = UpdateReviewSchema.parse({ rating: 3 });
    expect(result.rating).toBe(3);
  });

  it("accepts nullable fields set to null", () => {
    const result = UpdateReviewSchema.parse({ title: null, content: null });
    expect(result.title).toBeNull();
  });

  it("accepts empty object", () => {
    expect(Object.keys(UpdateReviewSchema.parse({}))).toHaveLength(0);
  });
});

describe("VoteReviewSchema", () => {
  it("accepts helpful vote", () => {
    expect(VoteReviewSchema.parse({ voteType: "helpful" }).voteType).toBe("helpful");
  });

  it("accepts report vote", () => {
    expect(VoteReviewSchema.parse({ voteType: "report" }).voteType).toBe("report");
  });

  it("rejects invalid vote type", () => {
    expect(() => VoteReviewSchema.parse({ voteType: "like" })).toThrow();
  });
});

describe("ModerateReviewSchema", () => {
  it("accepts approval", () => {
    const result = ModerateReviewSchema.parse({ status: "approved" });
    expect(result.status).toBe("approved");
  });

  it("accepts rejection with notes", () => {
    const result = ModerateReviewSchema.parse({
      status: "rejected",
      moderationNotes: "Contains inappropriate content",
    });
    expect(result.moderationNotes).toBe("Contains inappropriate content");
  });

  it("rejects notes > 1000 chars", () => {
    expect(() => ModerateReviewSchema.parse({
      status: "approved",
      moderationNotes: "x".repeat(1001),
    })).toThrow();
  });
});

describe("ListReviewsQuerySchema", () => {
  it("applies defaults", () => {
    const result = ListReviewsQuerySchema.parse({});
    expect(result.page).toBe(1);
    expect(result.limit).toBe(10);
    expect(result.sortBy).toBe("recent");
  });

  it("accepts rating filter", () => {
    const result = ListReviewsQuerySchema.parse({ rating: "5" });
    expect(result.rating).toBe(5);
  });

  it("rejects limit > 50", () => {
    expect(() => ListReviewsQuerySchema.parse({ limit: 51 })).toThrow();
  });
});

describe("AdminListReviewsQuerySchema", () => {
  it("accepts status filter", () => {
    const result = AdminListReviewsQuerySchema.parse({ status: "pending" });
    expect(result.status).toBe("pending");
    expect(result.limit).toBe(20);
  });

  it("accepts productId filter", () => {
    const result = AdminListReviewsQuerySchema.parse({
      productId: "550e8400-e29b-41d4-a716-446655440001",
    });
    expect(result.productId).toBe("550e8400-e29b-41d4-a716-446655440001");
  });
});

describe("ReviewResponseSchema", () => {
  it("wraps review", () => {
    expect(ReviewResponseSchema.parse({ review: validReview }).review.rating).toBe(5);
  });
});

describe("ReviewListResponseSchema", () => {
  it("wraps reviews with pagination", () => {
    const data = {
      reviews: [validReview],
      pagination: { page: 1, limit: 10, total: 1, totalPages: 1, hasMore: false },
    };
    expect(ReviewListResponseSchema.parse(data).reviews).toHaveLength(1);
  });

  it("accepts optional summary", () => {
    const data = {
      reviews: [],
      pagination: { page: 1, limit: 10, hasMore: false },
      summary: {
        averageRating: 4.5,
        totalReviews: 100,
        distribution: { 1: 2, 2: 5, 3: 10, 4: 33, 5: 50 },
      },
    };
    expect(ReviewListResponseSchema.parse(data).summary?.averageRating).toBe(4.5);
  });
});
