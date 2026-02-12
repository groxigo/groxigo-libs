import { describe, it, expect } from "vitest";
import {
  REFUND_REASONS,
  RefundReasonSchema,
  CardBrandSchema,
  PaymentMethodSchema,
  SetupIntentSchema,
  PaymentIntentResultSchema,
  RefundSchema,
  SavePaymentMethodSchema,
  SetDefaultPaymentMethodSchema,
  RefundRequestSchema,
  PaymentMethodListResponseSchema,
} from "../schemas/payment";

const validPaymentMethod = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  providerPaymentMethodId: "pm_1OxABC123def456",
  brand: "visa" as const,
  last4: "4242",
  expMonth: 12,
  expYear: 2028,
  isDefault: true,
  createdAt: "2026-01-15T10:30:00Z",
};

describe("REFUND_REASONS", () => {
  it("contains 3 reasons", () => {
    expect(REFUND_REASONS).toHaveLength(3);
    expect(REFUND_REASONS).toContain("requested_by_customer");
    expect(REFUND_REASONS).toContain("duplicate");
    expect(REFUND_REASONS).toContain("fraudulent");
  });
});

describe("RefundReasonSchema", () => {
  it("accepts all valid reasons", () => {
    for (const r of REFUND_REASONS) {
      expect(RefundReasonSchema.parse(r)).toBe(r);
    }
  });

  it("rejects invalid reason", () => {
    expect(() => RefundReasonSchema.parse("mistake")).toThrow();
  });
});

describe("CardBrandSchema", () => {
  it("accepts all card brands", () => {
    const brands = ["visa", "mastercard", "amex", "discover", "diners", "jcb", "unionpay", "unknown"];
    for (const b of brands) {
      expect(CardBrandSchema.parse(b)).toBe(b);
    }
  });
});

describe("PaymentMethodSchema", () => {
  it("accepts valid payment method", () => {
    const result = PaymentMethodSchema.parse(validPaymentMethod);
    expect(result.brand).toBe("visa");
    expect(result.last4).toBe("4242");
    expect(result.isDefault).toBe(true);
  });

  it("rejects last4 with wrong length", () => {
    expect(() => PaymentMethodSchema.parse({ ...validPaymentMethod, last4: "123" })).toThrow();
    expect(() => PaymentMethodSchema.parse({ ...validPaymentMethod, last4: "12345" })).toThrow();
  });

  it("rejects expMonth > 12", () => {
    expect(() => PaymentMethodSchema.parse({ ...validPaymentMethod, expMonth: 13 })).toThrow();
  });

  it("rejects expMonth < 1", () => {
    expect(() => PaymentMethodSchema.parse({ ...validPaymentMethod, expMonth: 0 })).toThrow();
  });

  it("rejects non-UUID id", () => {
    expect(() => PaymentMethodSchema.parse({ ...validPaymentMethod, id: "not-uuid" })).toThrow();
  });
});

describe("SetupIntentSchema", () => {
  it("accepts valid client secret", () => {
    const result = SetupIntentSchema.parse({ clientSecret: "seti_1OxABC_secret_xyz" });
    expect(result.clientSecret).toBe("seti_1OxABC_secret_xyz");
  });

  it("rejects client secret exceeding 500 chars", () => {
    expect(() => SetupIntentSchema.parse({ clientSecret: "x".repeat(501) })).toThrow();
  });
});

describe("PaymentIntentResultSchema", () => {
  it("accepts succeeded payment", () => {
    const data = {
      paymentIntentId: "pi_1OxABC123",
      status: "succeeded",
      clientSecret: null,
    };
    const result = PaymentIntentResultSchema.parse(data);
    expect(result.status).toBe("succeeded");
  });

  it("accepts requires_action with client secret", () => {
    const data = {
      paymentIntentId: "pi_1OxABC123",
      status: "requires_action",
      clientSecret: "pi_1OxABC_secret_xyz",
    };
    expect(PaymentIntentResultSchema.parse(data).clientSecret).toBe("pi_1OxABC_secret_xyz");
  });

  it("rejects invalid status", () => {
    expect(() => PaymentIntentResultSchema.parse({
      paymentIntentId: "pi_1OxABC",
      status: "expired",
    })).toThrow();
  });
});

describe("RefundSchema", () => {
  it("accepts valid refund", () => {
    const data = {
      id: "550e8400-e29b-41d4-a716-446655440001",
      orderId: "550e8400-e29b-41d4-a716-446655440002",
      stripeRefundId: "re_1OxABC123",
      amount: 25.00,
      status: "succeeded",
      reason: "requested_by_customer",
      refundToStoreCredit: false,
      internalNotes: "Customer requested refund for damaged item",
      createdAt: "2026-01-20T14:00:00Z",
    };
    const result = RefundSchema.parse(data);
    expect(result.amount).toBe(25);
    expect(result.reason).toBe("requested_by_customer");
  });

  it("accepts pending refund with null notes", () => {
    const data = {
      id: "550e8400-e29b-41d4-a716-446655440001",
      orderId: "550e8400-e29b-41d4-a716-446655440002",
      stripeRefundId: "re_1OxABC123",
      amount: 10,
      status: "pending",
      reason: "duplicate",
      refundToStoreCredit: false,
      internalNotes: null,
      createdAt: "2026-01-20T14:00:00Z",
    };
    expect(RefundSchema.parse(data).internalNotes).toBeNull();
  });

  it("rejects negative amount", () => {
    expect(() => RefundSchema.parse({
      id: "550e8400-e29b-41d4-a716-446655440001",
      orderId: "550e8400-e29b-41d4-a716-446655440002",
      stripeRefundId: "re_1",
      amount: -5,
      status: "succeeded",
      reason: "fraudulent",
      refundToStoreCredit: false,
      createdAt: "2026-01-20T14:00:00Z",
    })).toThrow();
  });
});

describe("SavePaymentMethodSchema", () => {
  it("accepts valid save request", () => {
    const result = SavePaymentMethodSchema.parse({
      providerPaymentMethodId: "pm_1OxABC123def456",
    });
    expect(result.setAsDefault).toBeUndefined();
  });

  it("accepts setAsDefault flag", () => {
    const result = SavePaymentMethodSchema.parse({
      providerPaymentMethodId: "pm_1OxABC",
      setAsDefault: true,
    });
    expect(result.setAsDefault).toBe(true);
  });

  it("rejects empty providerPaymentMethodId", () => {
    expect(() => SavePaymentMethodSchema.parse({ providerPaymentMethodId: "" })).toThrow();
  });
});

describe("SetDefaultPaymentMethodSchema", () => {
  it("accepts valid UUID", () => {
    const result = SetDefaultPaymentMethodSchema.parse({
      paymentMethodId: "550e8400-e29b-41d4-a716-446655440000",
    });
    expect(result.paymentMethodId).toBe("550e8400-e29b-41d4-a716-446655440000");
  });

  it("rejects non-UUID", () => {
    expect(() => SetDefaultPaymentMethodSchema.parse({ paymentMethodId: "abc" })).toThrow();
  });
});

describe("RefundRequestSchema", () => {
  it("accepts full refund request", () => {
    const data = {
      orderId: "550e8400-e29b-41d4-a716-446655440002",
      reason: "requested_by_customer",
    };
    const result = RefundRequestSchema.parse(data);
    expect(result.amount).toBeUndefined();
  });

  it("accepts partial refund with amount", () => {
    const data = {
      orderId: "550e8400-e29b-41d4-a716-446655440002",
      amount: 15.50,
      reason: "duplicate",
      refundToStoreCredit: true,
      internalNotes: "Partial refund for wrong item",
    };
    const result = RefundRequestSchema.parse(data);
    expect(result.amount).toBe(15.50);
    expect(result.refundToStoreCredit).toBe(true);
  });

  it("rejects non-UUID orderId", () => {
    expect(() => RefundRequestSchema.parse({
      orderId: "not-uuid",
      reason: "fraudulent",
    })).toThrow();
  });

  it("rejects invalid reason", () => {
    expect(() => RefundRequestSchema.parse({
      orderId: "550e8400-e29b-41d4-a716-446655440002",
      reason: "other",
    })).toThrow();
  });

  it("rejects internalNotes exceeding 1000 chars", () => {
    expect(() => RefundRequestSchema.parse({
      orderId: "550e8400-e29b-41d4-a716-446655440002",
      reason: "requested_by_customer",
      internalNotes: "x".repeat(1001),
    })).toThrow();
  });
});

describe("PaymentMethodListResponseSchema", () => {
  it("wraps payment methods array", () => {
    const data = { paymentMethods: [validPaymentMethod] };
    expect(PaymentMethodListResponseSchema.parse(data).paymentMethods).toHaveLength(1);
  });

  it("accepts empty array", () => {
    expect(PaymentMethodListResponseSchema.parse({ paymentMethods: [] }).paymentMethods).toHaveLength(0);
  });
});
