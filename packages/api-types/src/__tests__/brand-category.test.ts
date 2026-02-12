import { describe, it, expect } from "vitest";
import {
  BrandSchema,
  CreateBrandSchema,
  BrandListResponseSchema,
} from "../schemas/brand";
import {
  CategorySchema,
  CategoryWithChildrenSchema,
  CreateCategorySchema,
  CategoryListResponseSchema,
  CategoryTreeResponseSchema,
} from "../schemas/category";

const validBrand = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Amul",
  slug: "amul",
  description: "India's leading dairy brand",
  logoUrl: null,
  websiteUrl: null,
  isActive: true,
  createdAt: "2026-01-15T10:30:00Z",
  updatedAt: "2026-01-15T10:30:00Z",
};

const validCategory = {
  id: "550e8400-e29b-41d4-a716-446655440001",
  name: "Dairy",
  slug: "dairy",
  description: "Milk, cheese, yogurt and more",
  imageUrl: null,
  parentId: null,
  sortOrder: 1,
  isActive: true,
  createdAt: "2026-01-15T10:30:00Z",
  updatedAt: "2026-01-15T10:30:00Z",
};

// ============================================================================
// BRAND
// ============================================================================

describe("BrandSchema", () => {
  it("accepts valid brand", () => {
    expect(BrandSchema.parse(validBrand).name).toBe("Amul");
  });

  it("requires UUID for id", () => {
    expect(() => BrandSchema.parse({ ...validBrand, id: "bad" })).toThrow();
  });
});

describe("CreateBrandSchema", () => {
  it("accepts minimal create data", () => {
    const result = CreateBrandSchema.parse({ name: "NewBrand" });
    expect(result.isActive).toBe(true);
  });

  it("validates URL formats", () => {
    expect(() =>
      CreateBrandSchema.parse({ name: "Brand", logoUrl: "not-a-url" }),
    ).toThrow();
  });
});

describe("BrandListResponseSchema", () => {
  it("accepts list with pagination", () => {
    const data = {
      brands: [validBrand],
      pagination: { page: 1, limit: 20, hasMore: false },
    };
    expect(BrandListResponseSchema.parse(data).brands).toHaveLength(1);
  });

  it("accepts list without pagination (backward compat)", () => {
    expect(BrandListResponseSchema.parse({ brands: [] }).brands).toHaveLength(0);
  });
});

// ============================================================================
// CATEGORY
// ============================================================================

describe("CategorySchema", () => {
  it("accepts valid category", () => {
    expect(CategorySchema.parse(validCategory).name).toBe("Dairy");
  });

  it("accepts null parentId for root categories", () => {
    expect(CategorySchema.parse(validCategory).parentId).toBeNull();
  });
});

describe("CategoryWithChildrenSchema", () => {
  it("accepts nested children", () => {
    const tree = {
      ...validCategory,
      children: [
        {
          ...validCategory,
          id: "550e8400-e29b-41d4-a716-446655440002",
          name: "Milk",
          slug: "milk",
          parentId: validCategory.id,
          children: [],
        },
      ],
      productCount: 42,
    };
    const result = CategoryWithChildrenSchema.parse(tree);
    expect(result.children).toHaveLength(1);
    expect(result.productCount).toBe(42);
  });
});

describe("CreateCategorySchema", () => {
  it("accepts minimal data with defaults", () => {
    const result = CreateCategorySchema.parse({ name: "New Cat" });
    expect(result.sortOrder).toBe(0);
    expect(result.isActive).toBe(true);
  });

  it("validates imageUrl is URL", () => {
    expect(() =>
      CreateCategorySchema.parse({ name: "Cat", imageUrl: "not-url" }),
    ).toThrow();
  });
});

describe("CategoryListResponseSchema", () => {
  it("accepts list with pagination", () => {
    const data = {
      categories: [validCategory],
      pagination: { page: 1, limit: 20, hasMore: false },
    };
    expect(CategoryListResponseSchema.parse(data).categories).toHaveLength(1);
  });

  it("accepts list without pagination (backward compat)", () => {
    expect(CategoryListResponseSchema.parse({ categories: [] }).categories).toHaveLength(0);
  });
});

describe("CategoryTreeResponseSchema", () => {
  it("accepts tree response", () => {
    const data = {
      categories: [{ ...validCategory, children: [], productCount: 10 }],
    };
    expect(CategoryTreeResponseSchema.parse(data).categories).toHaveLength(1);
  });
});
