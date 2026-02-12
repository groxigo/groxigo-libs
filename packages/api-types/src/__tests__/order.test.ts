import { describe, it, expect } from "vitest";
import {
  OrderSchema,
  OrderItemSchema,
  OrderSummarySchema,
  OrderWithItemsSchema,
  CreateOrderSchema,
  UpdateOrderStatusSchema,
  OrderQuerySchema,
  OrderResponseSchema,
  OrderListResponseSchema,
  OrderStatusEnum,
  PaymentStatusEnum,
} from "../schemas/order";

const validOrderItem = {
  id: "550e8400-e29b-41d4-a716-446655440010",
  orderId: "550e8400-e29b-41d4-a716-446655440000",
  productId: "550e8400-e29b-41d4-a716-446655440001",
  productName: "Organic Milk",
  productSku: "MLK-001",
  productImageUrl: null,
  quantity: 2,
  unitPrice: 4.99,
  totalPrice: 9.98,
  status: "pending" as const,
  substitutedProductId: null,
  notes: null,
  createdAt: "2026-01-15T10:30:00Z",
  updatedAt: "2026-01-15T10:30:00Z",
};

const validOrder = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  orderNumber: "GRX-20260115-001",
  customerId: "550e8400-e29b-41d4-a716-446655440002",
  addressId: "550e8400-e29b-41d4-a716-446655440003",
  shippingAddress: { line1: "123 Main St", city: "Houston" },
  subtotal: 29.95,
  tax: 2.40,
  deliveryFee: 4.99,
  serviceFee: 1.99,
  tip: 3.00,
  discount: 0,
  total: 42.33,
  status: "pending" as const,
  paymentStatus: "authorized" as const,
  paymentIntentId: "pi_test123",
  couponId: null,
  couponCode: null,
  deliverySlotId: "550e8400-e29b-41d4-a716-446655440004",
  deliverySlotStart: "2026-01-16T09:00:00Z",
  deliverySlotEnd: "2026-01-16T11:00:00Z",
  deliveryInstructions: null,
  specialInstructions: null,
  substitutionPreference: "allow_similar",
  pickedAt: null,
  packedAt: null,
  deliveredAt: null,
  cancelledAt: null,
  cancellationReason: null,
  etaMinutes: null,
  etaUpdatedAt: null,
  etaSource: null,
  trackingToken: null,
  createdAt: "2026-01-15T10:30:00Z",
  updatedAt: "2026-01-15T10:30:00Z",
};

describe("OrderStatusEnum", () => {
  it("accepts all valid statuses", () => {
    const statuses = ["pending", "confirmed", "picking", "packed", "out_for_delivery", "delivered", "cancelled"];
    for (const s of statuses) {
      expect(OrderStatusEnum.parse(s)).toBe(s);
    }
  });

  it("rejects invalid status", () => {
    expect(() => OrderStatusEnum.parse("shipped")).toThrow();
  });
});

describe("OrderItemSchema", () => {
  it("accepts valid order item", () => {
    expect(OrderItemSchema.parse(validOrderItem)).toEqual(validOrderItem);
  });

  it("requires positive integer quantity", () => {
    expect(() => OrderItemSchema.parse({ ...validOrderItem, quantity: 0 })).toThrow();
    expect(() => OrderItemSchema.parse({ ...validOrderItem, quantity: -1 })).toThrow();
    expect(() => OrderItemSchema.parse({ ...validOrderItem, quantity: 1.5 })).toThrow();
  });

  it("requires non-negative prices", () => {
    expect(() => OrderItemSchema.parse({ ...validOrderItem, unitPrice: -1 })).toThrow();
    expect(() => OrderItemSchema.parse({ ...validOrderItem, totalPrice: -1 })).toThrow();
  });
});

describe("OrderSchema", () => {
  it("accepts valid order with ETA fields", () => {
    const result = OrderSchema.parse(validOrder);
    expect(result.etaMinutes).toBeNull();
    expect(result.trackingToken).toBeNull();
  });

  it("accepts populated ETA fields", () => {
    const withEta = {
      ...validOrder,
      etaMinutes: 25,
      etaUpdatedAt: "2026-01-15T11:00:00Z",
      etaSource: "driver" as const,
      trackingToken: "trk-abc-123",
    };
    const result = OrderSchema.parse(withEta);
    expect(result.etaMinutes).toBe(25);
    expect(result.etaSource).toBe("driver");
    expect(result.trackingToken).toBe("trk-abc-123");
  });

  it("rejects invalid etaSource value", () => {
    expect(() =>
      OrderSchema.parse({ ...validOrder, etaSource: "gps" }),
    ).toThrow();
  });

  it("rejects negative etaMinutes", () => {
    expect(() =>
      OrderSchema.parse({ ...validOrder, etaMinutes: -5 }),
    ).toThrow();
  });
});

describe("OrderSummarySchema", () => {
  it("includes etaMinutes and trackingToken", () => {
    const summary = {
      id: validOrder.id,
      orderNumber: validOrder.orderNumber,
      customerId: validOrder.customerId,
      total: validOrder.total,
      status: "out_for_delivery" as const,
      paymentStatus: "captured" as const,
      itemCount: 3,
      deliverySlotStart: validOrder.deliverySlotStart,
      deliverySlotEnd: validOrder.deliverySlotEnd,
      etaMinutes: 15,
      trackingToken: "trk-xyz",
      createdAt: validOrder.createdAt,
    };
    const result = OrderSummarySchema.parse(summary);
    expect(result.etaMinutes).toBe(15);
    expect(result.trackingToken).toBe("trk-xyz");
  });
});

describe("CreateOrderSchema", () => {
  it("accepts valid create order", () => {
    const data = {
      addressId: "550e8400-e29b-41d4-a716-446655440003",
      deliverySlotId: "550e8400-e29b-41d4-a716-446655440004",
      items: [
        { productId: "550e8400-e29b-41d4-a716-446655440001", quantity: 2 },
      ],
    };
    const result = CreateOrderSchema.parse(data);
    expect(result.tip).toBe(0);
    expect(result.substitutionPreference).toBe("allow_similar");
  });

  it("requires at least one item", () => {
    expect(() =>
      CreateOrderSchema.parse({
        addressId: "550e8400-e29b-41d4-a716-446655440003",
        deliverySlotId: "550e8400-e29b-41d4-a716-446655440004",
        items: [],
      }),
    ).toThrow();
  });

  it("requires positive item quantity", () => {
    expect(() =>
      CreateOrderSchema.parse({
        addressId: "550e8400-e29b-41d4-a716-446655440003",
        deliverySlotId: "550e8400-e29b-41d4-a716-446655440004",
        items: [{ productId: "550e8400-e29b-41d4-a716-446655440001", quantity: 0 }],
      }),
    ).toThrow();
  });
});

describe("OrderQuerySchema", () => {
  it("accepts status and date filters", () => {
    const result = OrderQuerySchema.parse({
      status: "delivered",
      fromDate: "2026-01-01",
      toDate: "2026-01-31",
    });
    expect(result.status).toBe("delivered");
  });
});

describe("OrderListResponseSchema", () => {
  it("accepts list with optional pagination", () => {
    const data = {
      orders: [],
      pagination: { page: 1, limit: 10, hasMore: false },
    };
    expect(OrderListResponseSchema.parse(data).orders).toHaveLength(0);
  });

  it("accepts list without pagination", () => {
    expect(OrderListResponseSchema.parse({ orders: [] }).orders).toHaveLength(0);
  });
});
