import { describe, it, expect } from "vitest";
import {
  MAX_QUANTITY_PER_ITEM,
  CartItemSchema,
  CartSchema,
  AddCartItemSchema,
  UpdateCartItemSchema,
  SyncCartSchema,
  MergeCartSchema,
  CartResponseSchema,
} from "../schemas/cart";

const validCartItem = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  productId: "550e8400-e29b-41d4-a716-446655440001",
  name: "Basmati Rice 5kg",
  slug: "basmati-rice-5kg",
  price: 12.99,
  compareAtPrice: 15.99,
  imageUrl: "https://example.com/rice.jpg",
  unit: "kg",
  unitSize: "5 kg",
  quantity: 2,
  inStock: true,
  notes: null,
};

describe("MAX_QUANTITY_PER_ITEM", () => {
  it("is 99", () => {
    expect(MAX_QUANTITY_PER_ITEM).toBe(99);
  });
});

describe("CartItemSchema", () => {
  it("accepts valid cart item", () => {
    const result = CartItemSchema.parse(validCartItem);
    expect(result.name).toBe("Basmati Rice 5kg");
    expect(result.quantity).toBe(2);
  });

  it("accepts zero quantity (removed item)", () => {
    expect(CartItemSchema.parse({ ...validCartItem, quantity: 0 }).quantity).toBe(0);
  });

  it("rejects quantity > 99", () => {
    expect(() => CartItemSchema.parse({ ...validCartItem, quantity: 100 })).toThrow();
  });

  it("rejects name exceeding 255 chars", () => {
    expect(() => CartItemSchema.parse({ ...validCartItem, name: "x".repeat(256) })).toThrow();
  });
});

describe("CartSchema", () => {
  it("accepts valid cart", () => {
    const cart = {
      id: "550e8400-e29b-41d4-a716-446655440010",
      customerId: "550e8400-e29b-41d4-a716-446655440020",
      items: [validCartItem],
      itemCount: 1,
      subtotal: 25.98,
      createdAt: "2026-01-15T10:00:00Z",
      updatedAt: "2026-01-15T10:30:00Z",
    };
    const result = CartSchema.parse(cart);
    expect(result.items).toHaveLength(1);
    expect(result.subtotal).toBe(25.98);
  });

  it("accepts null customerId (guest cart)", () => {
    const cart = {
      id: "550e8400-e29b-41d4-a716-446655440010",
      customerId: null,
      items: [],
      itemCount: 0,
      subtotal: 0,
      createdAt: "2026-01-15T10:00:00Z",
      updatedAt: "2026-01-15T10:00:00Z",
    };
    expect(CartSchema.parse(cart).customerId).toBeNull();
  });
});

describe("AddCartItemSchema", () => {
  it("accepts valid add with defaults", () => {
    const result = AddCartItemSchema.parse({
      productId: "550e8400-e29b-41d4-a716-446655440001",
    });
    expect(result.quantity).toBe(1);
  });

  it("accepts quantity up to 99", () => {
    const result = AddCartItemSchema.parse({
      productId: "550e8400-e29b-41d4-a716-446655440001",
      quantity: 99,
    });
    expect(result.quantity).toBe(99);
  });

  it("rejects quantity < 1", () => {
    expect(() => AddCartItemSchema.parse({
      productId: "550e8400-e29b-41d4-a716-446655440001",
      quantity: 0,
    })).toThrow();
  });

  it("rejects non-UUID productId", () => {
    expect(() => AddCartItemSchema.parse({ productId: "abc" })).toThrow();
  });
});

describe("UpdateCartItemSchema", () => {
  it("accepts zero quantity (remove)", () => {
    expect(UpdateCartItemSchema.parse({ quantity: 0 }).quantity).toBe(0);
  });

  it("rejects negative quantity", () => {
    expect(() => UpdateCartItemSchema.parse({ quantity: -1 })).toThrow();
  });

  it("rejects quantity > 99", () => {
    expect(() => UpdateCartItemSchema.parse({ quantity: 100 })).toThrow();
  });
});

describe("SyncCartSchema", () => {
  it("accepts valid sync payload", () => {
    const result = SyncCartSchema.parse({
      items: [
        { productId: "550e8400-e29b-41d4-a716-446655440001", quantity: 2 },
        { productId: "550e8400-e29b-41d4-a716-446655440002", quantity: 1 },
      ],
    });
    expect(result.items).toHaveLength(2);
  });

  it("rejects empty items array", () => {
    expect(() => SyncCartSchema.parse({ items: [] })).toThrow();
  });

  it("rejects more than 100 items", () => {
    const item = { productId: "550e8400-e29b-41d4-a716-446655440001", quantity: 1 };
    expect(() => SyncCartSchema.parse({
      items: Array.from({ length: 101 }, () => item),
    })).toThrow();
  });
});

describe("MergeCartSchema", () => {
  it("accepts valid device ID", () => {
    expect(MergeCartSchema.parse({ deviceId: "abc-123" }).deviceId).toBe("abc-123");
  });

  it("rejects empty device ID", () => {
    expect(() => MergeCartSchema.parse({ deviceId: "" })).toThrow();
  });
});

describe("CartResponseSchema", () => {
  it("wraps cart", () => {
    const data = {
      cart: {
        id: "550e8400-e29b-41d4-a716-446655440010",
        customerId: null,
        items: [],
        itemCount: 0,
        subtotal: 0,
        createdAt: "2026-01-15T10:00:00Z",
        updatedAt: "2026-01-15T10:00:00Z",
      },
    };
    expect(CartResponseSchema.parse(data).cart.itemCount).toBe(0);
  });
});
