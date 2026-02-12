import { describe, it, expect } from "vitest";
import {
  SORT_OPTIONS,
  SortOptionSchema,
  SearchQuerySchema,
  SuggestionsQuerySchema,
  SearchSuggestionSchema,
  SuggestionsResponseSchema,
} from "../schemas/search";

describe("SORT_OPTIONS", () => {
  it("contains all 6 options", () => {
    expect(SORT_OPTIONS).toHaveLength(6);
    expect(SORT_OPTIONS).toContain("relevance");
    expect(SORT_OPTIONS).toContain("price_asc");
    expect(SORT_OPTIONS).toContain("popular");
  });
});

describe("SortOptionSchema", () => {
  it("accepts all valid sort options", () => {
    for (const opt of SORT_OPTIONS) {
      expect(SortOptionSchema.parse(opt)).toBe(opt);
    }
  });

  it("rejects invalid sort option", () => {
    expect(() => SortOptionSchema.parse("rating")).toThrow();
  });
});

describe("SearchQuerySchema", () => {
  it("applies defaults", () => {
    const result = SearchQuerySchema.parse({});
    expect(result.sort).toBe("relevance");
    expect(result.page).toBe(1);
    expect(result.limit).toBe(20);
  });

  it("accepts full query with all filters", () => {
    const query = {
      q: "basmati rice",
      categoryId: "550e8400-e29b-41d4-a716-446655440000",
      brandIds: "550e8400-e29b-41d4-a716-446655440001,550e8400-e29b-41d4-a716-446655440002",
      dietaryTags: "gluten-free,vegan",
      priceMin: 5,
      priceMax: 50,
      onSale: true,
      inStock: true,
      sort: "price_asc",
      page: 2,
      limit: 50,
    };
    const result = SearchQuerySchema.parse(query);
    expect(result.q).toBe("basmati rice");
    expect(result.sort).toBe("price_asc");
    expect(result.page).toBe(2);
  });

  it("coerces string numbers", () => {
    const result = SearchQuerySchema.parse({ page: "3", limit: "10", priceMin: "5.99" });
    expect(result.page).toBe(3);
    expect(result.limit).toBe(10);
    expect(result.priceMin).toBe(5.99);
  });

  it("rejects q exceeding 500 chars", () => {
    expect(() => SearchQuerySchema.parse({ q: "x".repeat(501) })).toThrow();
  });

  it("rejects negative priceMin", () => {
    expect(() => SearchQuerySchema.parse({ priceMin: -1 })).toThrow();
  });

  it("rejects limit > 100", () => {
    expect(() => SearchQuerySchema.parse({ limit: 101 })).toThrow();
  });

  it("rejects page < 1", () => {
    expect(() => SearchQuerySchema.parse({ page: 0 })).toThrow();
  });

  it("rejects non-UUID categoryId", () => {
    expect(() => SearchQuerySchema.parse({ categoryId: "not-a-uuid" })).toThrow();
  });
});

describe("SuggestionsQuerySchema", () => {
  it("accepts valid suggestion query", () => {
    const result = SuggestionsQuerySchema.parse({ q: "bas" });
    expect(result.q).toBe("bas");
    expect(result.limit).toBe(8);
  });

  it("rejects empty q", () => {
    expect(() => SuggestionsQuerySchema.parse({ q: "" })).toThrow();
  });

  it("rejects q exceeding 500 chars", () => {
    expect(() => SuggestionsQuerySchema.parse({ q: "x".repeat(501) })).toThrow();
  });

  it("rejects limit > 20", () => {
    expect(() => SuggestionsQuerySchema.parse({ q: "test", limit: 21 })).toThrow();
  });
});

describe("SearchSuggestionSchema", () => {
  it("accepts full suggestion", () => {
    const suggestion = {
      text: "Basmati Rice",
      type: "product",
      id: "prod-1",
      slug: "basmati-rice",
      imageUrl: "https://example.com/rice.jpg",
    };
    const result = SearchSuggestionSchema.parse(suggestion);
    expect(result.text).toBe("Basmati Rice");
    expect(result.type).toBe("product");
  });

  it("accepts minimal suggestion (text only)", () => {
    const result = SearchSuggestionSchema.parse({ text: "basmati" });
    expect(result.type).toBeUndefined();
    expect(result.id).toBeUndefined();
  });

  it("accepts null imageUrl", () => {
    const result = SearchSuggestionSchema.parse({ text: "test", imageUrl: null });
    expect(result.imageUrl).toBeNull();
  });
});

describe("SuggestionsResponseSchema", () => {
  it("wraps suggestions array", () => {
    const data = {
      suggestions: [
        { text: "Basmati Rice", type: "product" },
        { text: "Brown Rice", type: "product" },
      ],
    };
    expect(SuggestionsResponseSchema.parse(data).suggestions).toHaveLength(2);
  });

  it("accepts empty suggestions", () => {
    expect(SuggestionsResponseSchema.parse({ suggestions: [] }).suggestions).toHaveLength(0);
  });
});
