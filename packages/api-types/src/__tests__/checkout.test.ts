import { describe, it, expect } from "vitest";
import {
  SESSION_TTL_SECONDS,
  CheckoutSessionSchema,
  CreateCheckoutSessionSchema,
  UpdateCheckoutSessionSchema,
  PlaceOrderSchema,
  ApplyCheckoutPromoSchema,
  CheckoutSessionResponseSchema,
  PlaceOrderResultSchema,
} from "../schemas/checkout";

const validSession = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  customerId: "550e8400-e29b-41d4-a716-446655440001",
  storeId: "550e8400-e29b-41d4-a716-446655440002",
  addressId: "550e8400-e29b-41d4-a716-446655440003",
  deliverySlotId: "slot-morning-1",
  paymentMethodId: "550e8400-e29b-41d4-a716-446655440004",
  useStoreCredit: false,
  storeCreditAmount: null,
  substitutionPreference: "allow_similar" as const,
  customerNotes: null,
  couponCode: null,
  subtotal: 75.00,
  tax: 6.00,
  deliveryFee: 4.99,
  serviceFee: 1.99,
  discount: 0,
  total: 87.98,
  expiresAt: "2026-01-15T11:00:00Z",
  createdAt: "2026-01-15T10:30:00Z",
  updatedAt: "2026-01-15T10:30:00Z",
};

describe("SESSION_TTL_SECONDS", () => {
  it("is 30 minutes", () => {
    expect(SESSION_TTL_SECONDS).toBe(1800);
  });
});

describe("CheckoutSessionSchema", () => {
  it("accepts valid session", () => {
    const result = CheckoutSessionSchema.parse(validSession);
    expect(result.total).toBe(87.98);
    expect(result.substitutionPreference).toBe("allow_similar");
  });

  it("accepts all nullable fields as null", () => {
    const session = {
      ...validSession,
      storeId: null,
      addressId: null,
      deliverySlotId: null,
      paymentMethodId: null,
      storeCreditAmount: null,
      substitutionPreference: null,
      customerNotes: null,
      couponCode: null,
    };
    expect(CheckoutSessionSchema.parse(session).addressId).toBeNull();
  });

  it("rejects negative total", () => {
    expect(() => CheckoutSessionSchema.parse({ ...validSession, total: -1 })).toThrow();
  });
});

describe("CreateCheckoutSessionSchema", () => {
  it("accepts empty object", () => {
    const result = CreateCheckoutSessionSchema.parse({});
    expect(result.storeId).toBeUndefined();
  });

  it("accepts storeId", () => {
    const result = CreateCheckoutSessionSchema.parse({
      storeId: "550e8400-e29b-41d4-a716-446655440002",
    });
    expect(result.storeId).toBe("550e8400-e29b-41d4-a716-446655440002");
  });

  it("rejects non-UUID storeId", () => {
    expect(() => CreateCheckoutSessionSchema.parse({ storeId: "abc" })).toThrow();
  });
});

describe("UpdateCheckoutSessionSchema", () => {
  it("accepts partial update", () => {
    const result = UpdateCheckoutSessionSchema.parse({
      addressId: "550e8400-e29b-41d4-a716-446655440003",
      substitutionPreference: "contact_me",
    });
    expect(result.substitutionPreference).toBe("contact_me");
  });

  it("accepts customerNotes", () => {
    const result = UpdateCheckoutSessionSchema.parse({
      customerNotes: "Please ring the bell",
    });
    expect(result.customerNotes).toBe("Please ring the bell");
  });

  it("rejects customerNotes > 1000 chars", () => {
    expect(() => UpdateCheckoutSessionSchema.parse({
      customerNotes: "x".repeat(1001),
    })).toThrow();
  });

  it("rejects storeCreditAmount > 10000", () => {
    expect(() => UpdateCheckoutSessionSchema.parse({
      storeCreditAmount: 10001,
    })).toThrow();
  });

  it("accepts empty object", () => {
    expect(Object.keys(UpdateCheckoutSessionSchema.parse({}))).toHaveLength(0);
  });
});

describe("PlaceOrderSchema", () => {
  it("accepts valid place order", () => {
    const result = PlaceOrderSchema.parse({
      acceptTerms: true,
      idempotencyKey: "order-abc-123_456",
    });
    expect(result.idempotencyKey).toBe("order-abc-123_456");
  });

  it("rejects acceptTerms = false", () => {
    expect(() => PlaceOrderSchema.parse({
      acceptTerms: false,
      idempotencyKey: "key-1",
    })).toThrow();
  });

  it("rejects empty idempotencyKey", () => {
    expect(() => PlaceOrderSchema.parse({
      acceptTerms: true,
      idempotencyKey: "",
    })).toThrow();
  });

  it("rejects idempotencyKey with special chars", () => {
    expect(() => PlaceOrderSchema.parse({
      acceptTerms: true,
      idempotencyKey: "key with spaces!",
    })).toThrow();
  });

  it("rejects idempotencyKey > 128 chars", () => {
    expect(() => PlaceOrderSchema.parse({
      acceptTerms: true,
      idempotencyKey: "a".repeat(129),
    })).toThrow();
  });
});

describe("ApplyCheckoutPromoSchema", () => {
  it("accepts valid code", () => {
    expect(ApplyCheckoutPromoSchema.parse({ code: "SAVE20" }).code).toBe("SAVE20");
  });

  it("rejects empty code", () => {
    expect(() => ApplyCheckoutPromoSchema.parse({ code: "" })).toThrow();
  });
});

describe("PlaceOrderResultSchema", () => {
  it("accepts succeeded result", () => {
    const data = {
      orderId: "550e8400-e29b-41d4-a716-446655440010",
      orderNumber: "GRX-20260115-001",
      paymentStatus: "succeeded",
      clientSecret: null,
    };
    const result = PlaceOrderResultSchema.parse(data);
    expect(result.paymentStatus).toBe("succeeded");
  });

  it("accepts requires_action with client secret", () => {
    const data = {
      orderId: "550e8400-e29b-41d4-a716-446655440010",
      orderNumber: "GRX-20260115-002",
      paymentStatus: "requires_action",
      clientSecret: "pi_secret_xyz",
    };
    expect(PlaceOrderResultSchema.parse(data).clientSecret).toBe("pi_secret_xyz");
  });
});

describe("CheckoutSessionResponseSchema", () => {
  it("wraps session", () => {
    expect(CheckoutSessionResponseSchema.parse({ session: validSession }).session.total).toBe(87.98);
  });
});
