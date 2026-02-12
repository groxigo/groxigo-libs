import { describe, it, expect } from "vitest";
import {
  ProductSchema,
  ProductQuerySchema,
  CreateProductSchema,
  UpdateProductSchema,
  ProductResponseSchema,
  ProductListResponseSchema,
} from "../schemas/product";

const validProduct = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Organic Whole Milk",
  slug: "organic-whole-milk",
  description: "Fresh organic milk",
  shortDescription: null,
  sku: "MLK-001",
  barcode: null,
  categoryId: "660e8400-e29b-41d4-a716-446655440001",
  brandId: null,
  price: 4.99,
  compareAtPrice: null,
  unit: "gal",
  unitSize: "1 Gallon",
  dietaryTags: ["organic", "gluten-free"],
  stockQuantity: 100,
  isActive: true,
  isAvailable: true,
  createdAt: "2026-01-15T10:30:00Z",
  updatedAt: "2026-01-15T10:30:00Z",
};

describe("ProductSchema", () => {
  it("accepts a valid product", () => {
    expect(ProductSchema.parse(validProduct)).toEqual(validProduct);
  });

  it("requires UUID for id", () => {
    expect(() => ProductSchema.parse({ ...validProduct, id: "not-uuid" })).toThrow();
  });

  it("requires non-negative price", () => {
    expect(() => ProductSchema.parse({ ...validProduct, price: -1 })).toThrow();
  });

  it("allows price of 0 (free/inactive products)", () => {
    expect(ProductSchema.parse({ ...validProduct, price: 0 }).price).toBe(0);
  });

  it("requires integer stockQuantity >= 0", () => {
    expect(() => ProductSchema.parse({ ...validProduct, stockQuantity: -1 })).toThrow();
    expect(() => ProductSchema.parse({ ...validProduct, stockQuantity: 1.5 })).toThrow();
    expect(ProductSchema.parse({ ...validProduct, stockQuantity: 0 }).stockQuantity).toBe(0);
  });

  it("rejects empty strings in dietaryTags", () => {
    expect(() => ProductSchema.parse({ ...validProduct, dietaryTags: [""] })).toThrow();
  });

  it("requires datetime format for timestamps", () => {
    expect(() => ProductSchema.parse({ ...validProduct, createdAt: "2026-01-15" })).toThrow();
  });
});

describe("ProductQuerySchema", () => {
  it("inherits pagination defaults", () => {
    const result = ProductQuerySchema.parse({});
    expect(result.page).toBe(1);
    expect(result.limit).toBe(20);
  });

  it("accepts all filter params", () => {
    const result = ProductQuerySchema.parse({
      categoryId: "550e8400-e29b-41d4-a716-446655440000",
      brandId: "660e8400-e29b-41d4-a716-446655440001",
      search: "milk",
      minPrice: "1.00",
      maxPrice: "10.00",
      inStock: "true",
      dietaryTags: "organic,gluten-free",
      sortBy: "price",
      sortOrder: "asc",
    });
    expect(result.minPrice).toBe(1);
    expect(result.maxPrice).toBe(10);
  });

  it("rejects negative minPrice", () => {
    expect(() => ProductQuerySchema.parse({ minPrice: -5 })).toThrow();
  });

  it("rejects negative maxPrice", () => {
    expect(() => ProductQuerySchema.parse({ maxPrice: -10 })).toThrow();
  });

  it("rejects invalid sortBy", () => {
    expect(() => ProductQuerySchema.parse({ sortBy: "invalid" })).toThrow();
  });
});

describe("CreateProductSchema", () => {
  it("accepts valid create payload", () => {
    const data = {
      name: "New Product",
      sku: "NEW-001",
      categoryId: "550e8400-e29b-41d4-a716-446655440000",
      price: 9.99,
      unit: "ea",
    };
    const result = CreateProductSchema.parse(data);
    expect(result.name).toBe("New Product");
    expect(result.stockQuantity).toBe(0); // default
    expect(result.isActive).toBe(true); // default
  });

  it("requires positive price for create", () => {
    expect(() =>
      CreateProductSchema.parse({
        name: "Test",
        sku: "T-001",
        categoryId: "550e8400-e29b-41d4-a716-446655440000",
        price: 0,
        unit: "ea",
      }),
    ).toThrow();
  });

  it("rejects empty name", () => {
    expect(() =>
      CreateProductSchema.parse({
        name: "",
        sku: "T-001",
        categoryId: "550e8400-e29b-41d4-a716-446655440000",
        price: 5,
        unit: "ea",
      }),
    ).toThrow();
  });
});

describe("UpdateProductSchema", () => {
  it("accepts partial updates", () => {
    const result = UpdateProductSchema.parse({ price: 12.99 });
    expect(result).toEqual({ price: 12.99 });
  });

  it("accepts empty object (no-op update)", () => {
    expect(UpdateProductSchema.parse({})).toEqual({});
  });
});

describe("ProductResponseSchema", () => {
  it("wraps product in { product } key", () => {
    const data = { product: validProduct };
    expect(ProductResponseSchema.parse(data).product.id).toBe(validProduct.id);
  });
});

describe("ProductListResponseSchema", () => {
  it("accepts list with pagination", () => {
    const data = {
      products: [validProduct],
      pagination: { page: 1, limit: 20, hasMore: false },
    };
    expect(ProductListResponseSchema.parse(data).products).toHaveLength(1);
  });

  it("accepts empty list", () => {
    const data = {
      products: [],
      pagination: { page: 1, limit: 20, hasMore: false },
    };
    expect(ProductListResponseSchema.parse(data).products).toHaveLength(0);
  });
});
