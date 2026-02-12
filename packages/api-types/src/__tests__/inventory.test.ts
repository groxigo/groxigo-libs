import { describe, it, expect } from "vitest";
import {
  InventoryAdjustmentTypeEnum,
  InventoryItemSchema,
  InventoryLogSchema,
  InventoryQuerySchema,
  InventoryAdjustmentSchema,
  BulkInventoryAdjustmentSchema,
  InventoryResponseSchema,
  InventoryListResponseSchema,
  LowStockResponseSchema,
  InventoryLogListResponseSchema,
} from "../schemas/inventory";

const validItem = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Basmati Rice 5kg",
  sku: "RICE-BAS-5KG",
  stockQuantity: 150,
  lowStockThreshold: 20,
  trackInventory: true,
  isLowStock: false,
};

const validLog = {
  id: "550e8400-e29b-41d4-a716-446655440001",
  productId: "550e8400-e29b-41d4-a716-446655440002",
  previousQuantity: 100,
  newQuantity: 150,
  quantityChange: 50,
  type: "received" as const,
  orderId: null,
  notes: "Restocked from supplier",
  createdBy: "admin@groxigo.com",
  createdAt: "2026-01-15T10:30:00Z",
};

describe("InventoryAdjustmentTypeEnum", () => {
  it("accepts all valid adjustment types", () => {
    const types = ["received", "sold", "adjusted", "expired", "returned", "damaged", "transferred"];
    for (const t of types) {
      expect(InventoryAdjustmentTypeEnum.parse(t)).toBe(t);
    }
  });

  it("rejects invalid type", () => {
    expect(() => InventoryAdjustmentTypeEnum.parse("stolen")).toThrow();
  });
});

describe("InventoryItemSchema", () => {
  it("accepts valid inventory item", () => {
    const result = InventoryItemSchema.parse(validItem);
    expect(result.name).toBe("Basmati Rice 5kg");
    expect(result.stockQuantity).toBe(150);
  });

  it("rejects negative stockQuantity", () => {
    expect(() => InventoryItemSchema.parse({ ...validItem, stockQuantity: -1 })).toThrow();
  });

  it("rejects name exceeding 255 chars", () => {
    expect(() => InventoryItemSchema.parse({ ...validItem, name: "x".repeat(256) })).toThrow();
  });

  it("accepts isLowStock as optional", () => {
    const { isLowStock, ...item } = validItem;
    const result = InventoryItemSchema.parse(item);
    expect(result.isLowStock).toBeUndefined();
  });
});

describe("InventoryLogSchema", () => {
  it("accepts valid log entry", () => {
    const result = InventoryLogSchema.parse(validLog);
    expect(result.quantityChange).toBe(50);
    expect(result.type).toBe("received");
  });

  it("accepts negative quantityChange (sold/damaged)", () => {
    const result = InventoryLogSchema.parse({ ...validLog, quantityChange: -5, type: "sold" });
    expect(result.quantityChange).toBe(-5);
  });

  it("accepts null orderId and notes", () => {
    const result = InventoryLogSchema.parse({ ...validLog, orderId: null, notes: null });
    expect(result.orderId).toBeNull();
    expect(result.notes).toBeNull();
  });

  it("rejects notes exceeding 500 chars", () => {
    expect(() => InventoryLogSchema.parse({ ...validLog, notes: "x".repeat(501) })).toThrow();
  });
});

describe("InventoryQuerySchema", () => {
  it("applies defaults for page and limit", () => {
    const result = InventoryQuerySchema.parse({});
    expect(result.page).toBe(1);
    expect(result.limit).toBe(20);
  });

  it("accepts lowStockOnly filter", () => {
    const result = InventoryQuerySchema.parse({ lowStockOnly: "true" });
    expect(result.lowStockOnly).toBe(true);
  });

  it("accepts search string", () => {
    const result = InventoryQuerySchema.parse({ search: "basmati" });
    expect(result.search).toBe("basmati");
  });

  it("rejects search exceeding 200 chars", () => {
    expect(() => InventoryQuerySchema.parse({ search: "x".repeat(201) })).toThrow();
  });
});

describe("InventoryAdjustmentSchema", () => {
  it("accepts valid adjustment", () => {
    const adj = {
      productId: "550e8400-e29b-41d4-a716-446655440002",
      quantity: 50,
      type: "received",
    };
    const result = InventoryAdjustmentSchema.parse(adj);
    expect(result.quantity).toBe(50);
  });

  it("accepts negative quantity (removal)", () => {
    const adj = {
      productId: "550e8400-e29b-41d4-a716-446655440002",
      quantity: -10,
      type: "damaged",
    };
    expect(InventoryAdjustmentSchema.parse(adj).quantity).toBe(-10);
  });

  it("rejects non-UUID productId", () => {
    expect(() => InventoryAdjustmentSchema.parse({
      productId: "not-a-uuid",
      quantity: 1,
      type: "received",
    })).toThrow();
  });

  it("rejects missing productId with custom error", () => {
    try {
      InventoryAdjustmentSchema.parse({ quantity: 1, type: "received" });
      expect.unreachable("should have thrown");
    } catch (e: unknown) {
      expect(String(e)).toContain("Product ID is required");
    }
  });
});

describe("BulkInventoryAdjustmentSchema", () => {
  it("accepts array of adjustments", () => {
    const bulk = {
      adjustments: [
        { productId: "550e8400-e29b-41d4-a716-446655440002", quantity: 10, type: "received" },
        { productId: "550e8400-e29b-41d4-a716-446655440003", quantity: -2, type: "damaged" },
      ],
    };
    expect(BulkInventoryAdjustmentSchema.parse(bulk).adjustments).toHaveLength(2);
  });

  it("rejects empty adjustments array", () => {
    expect(() => BulkInventoryAdjustmentSchema.parse({ adjustments: [] })).toThrow();
  });

  it("rejects more than 100 adjustments", () => {
    const adj = { productId: "550e8400-e29b-41d4-a716-446655440002", quantity: 1, type: "received" };
    expect(() => BulkInventoryAdjustmentSchema.parse({
      adjustments: Array.from({ length: 101 }, () => adj),
    })).toThrow();
  });
});

describe("Response schemas", () => {
  it("InventoryResponseSchema wraps single item", () => {
    const data = { item: validItem };
    expect(InventoryResponseSchema.parse(data).item.name).toBe("Basmati Rice 5kg");
  });

  it("InventoryListResponseSchema wraps paginated list", () => {
    const data = {
      items: [validItem],
      pagination: { page: 1, limit: 20, total: 1, totalPages: 1, hasMore: false },
    };
    expect(InventoryListResponseSchema.parse(data).items).toHaveLength(1);
  });

  it("LowStockResponseSchema includes count", () => {
    const data = { items: [{ ...validItem, isLowStock: true }], count: 1 };
    expect(LowStockResponseSchema.parse(data).count).toBe(1);
  });

  it("InventoryLogListResponseSchema wraps logs", () => {
    const data = {
      logs: [validLog],
      pagination: { page: 1, limit: 20, hasMore: false },
    };
    expect(InventoryLogListResponseSchema.parse(data).logs).toHaveLength(1);
  });
});
