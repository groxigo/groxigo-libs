import { describe, it, expect } from "vitest";
import {
  CouponErrorCodes,
  CouponErrorMessages,
  PromotionTypeSchema,
  DiscountTypeSchema,
  PromotionSchema,
  ValidateCouponSchema,
  ApplyPromotionSchema,
  CreatePromotionSchema,
  UpdatePromotionSchema,
  CouponValidationResultSchema,
  ApplyPromotionResultSchema,
} from "../schemas/promotion";

const validPromotion = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  type: "coupon" as const,
  code: "SAVE20",
  name: "Save 20%",
  description: "Get 20% off your first order",
  discountType: "percentage" as const,
  discountValue: 20,
  minOrderAmount: 25,
  maxDiscountAmount: 50,
  usageLimit: 1000,
  perCustomerLimit: 1,
  usageCount: 150,
  startsAt: "2026-01-01T00:00:00Z",
  endsAt: "2026-12-31T23:59:59Z",
  isActive: true,
  isStackable: false,
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-15T10:30:00Z",
};

describe("CouponErrorCodes", () => {
  it("has all 7 error codes", () => {
    expect(Object.keys(CouponErrorCodes)).toHaveLength(7);
    expect(CouponErrorCodes.INVALID_CODE).toBe("INVALID_CODE");
    expect(CouponErrorCodes.MIN_ORDER_NOT_MET).toBe("MIN_ORDER_NOT_MET");
  });

  it("has matching error messages for all codes", () => {
    for (const code of Object.values(CouponErrorCodes)) {
      expect(CouponErrorMessages[code]).toBeDefined();
      expect(typeof CouponErrorMessages[code]).toBe("string");
    }
  });
});

describe("PromotionTypeSchema", () => {
  it("accepts all promotion types", () => {
    for (const t of ["coupon", "automatic", "flash_sale"]) {
      expect(PromotionTypeSchema.parse(t)).toBe(t);
    }
  });

  it("rejects invalid type", () => {
    expect(() => PromotionTypeSchema.parse("loyalty")).toThrow();
  });
});

describe("DiscountTypeSchema", () => {
  it("accepts all discount types", () => {
    for (const t of ["percentage", "fixed_amount", "free_delivery", "buy_x_get_y"]) {
      expect(DiscountTypeSchema.parse(t)).toBe(t);
    }
  });
});

describe("PromotionSchema", () => {
  it("accepts valid promotion", () => {
    const result = PromotionSchema.parse(validPromotion);
    expect(result.code).toBe("SAVE20");
    expect(result.discountValue).toBe(20);
  });

  it("accepts nullable optional fields", () => {
    const promo = {
      ...validPromotion,
      description: null,
      minOrderAmount: null,
      maxDiscountAmount: null,
      usageLimit: null,
      perCustomerLimit: null,
      endsAt: null,
    };
    const result = PromotionSchema.parse(promo);
    expect(result.description).toBeNull();
    expect(result.endsAt).toBeNull();
  });

  it("rejects code exceeding 50 chars", () => {
    expect(() => PromotionSchema.parse({ ...validPromotion, code: "x".repeat(51) })).toThrow();
  });

  it("rejects discountValue > 10000", () => {
    expect(() => PromotionSchema.parse({ ...validPromotion, discountValue: 10001 })).toThrow();
  });
});

describe("ValidateCouponSchema", () => {
  it("accepts code with optional subtotal", () => {
    const result = ValidateCouponSchema.parse({ code: "SAVE20", subtotal: 50 });
    expect(result.code).toBe("SAVE20");
  });

  it("rejects empty code", () => {
    expect(() => ValidateCouponSchema.parse({ code: "" })).toThrow();
  });

  it("rejects code exceeding 50 chars", () => {
    expect(() => ValidateCouponSchema.parse({ code: "x".repeat(51) })).toThrow();
  });
});

describe("ApplyPromotionSchema", () => {
  it("accepts valid apply request", () => {
    const result = ApplyPromotionSchema.parse({
      promotionId: "550e8400-e29b-41d4-a716-446655440000",
      subtotal: 75.00,
    });
    expect(result.deliveryFee).toBe(0);
  });

  it("accepts delivery fee", () => {
    const result = ApplyPromotionSchema.parse({
      promotionId: "550e8400-e29b-41d4-a716-446655440000",
      subtotal: 30,
      deliveryFee: 4.99,
    });
    expect(result.deliveryFee).toBe(4.99);
  });

  it("rejects non-UUID promotionId", () => {
    expect(() => ApplyPromotionSchema.parse({
      promotionId: "not-uuid",
      subtotal: 10,
    })).toThrow();
  });
});

describe("CreatePromotionSchema", () => {
  it("accepts valid creation input", () => {
    const input = {
      type: "coupon",
      code: "WELCOME10",
      name: "Welcome Offer",
      discountType: "percentage",
      discountValue: 10,
      startsAt: "2026-01-01T00:00:00Z",
    };
    const result = CreatePromotionSchema.parse(input);
    expect(result.isActive).toBe(true);
    expect(result.isStackable).toBe(false);
  });

  it("rejects percentage discount > 100", () => {
    const input = {
      type: "coupon",
      code: "BAD",
      name: "Bad Discount",
      discountType: "percentage",
      discountValue: 150,
      startsAt: "2026-01-01T00:00:00Z",
    };
    expect(() => CreatePromotionSchema.parse(input)).toThrow();
  });

  it("allows fixed_amount > 100", () => {
    const input = {
      type: "coupon",
      code: "BIG",
      name: "Big Discount",
      discountType: "fixed_amount",
      discountValue: 500,
      startsAt: "2026-01-01T00:00:00Z",
    };
    expect(CreatePromotionSchema.parse(input).discountValue).toBe(500);
  });

  it("rejects empty code", () => {
    expect(() => CreatePromotionSchema.parse({
      type: "coupon",
      code: "",
      name: "Test",
      discountType: "percentage",
      discountValue: 10,
      startsAt: "2026-01-01T00:00:00Z",
    })).toThrow();
  });
});

describe("UpdatePromotionSchema", () => {
  it("accepts partial update", () => {
    const result = UpdatePromotionSchema.parse({ name: "Updated Name", isActive: false });
    expect(result.name).toBe("Updated Name");
    expect(result.isActive).toBe(false);
  });

  it("accepts empty object (no changes)", () => {
    const result = UpdatePromotionSchema.parse({});
    expect(Object.keys(result)).toHaveLength(0);
  });

  it("accepts nullable fields set to null", () => {
    const result = UpdatePromotionSchema.parse({
      minOrderAmount: null,
      maxDiscountAmount: null,
      endsAt: null,
    });
    expect(result.minOrderAmount).toBeNull();
  });
});

describe("CouponValidationResultSchema", () => {
  it("accepts valid result with promotion", () => {
    const data = { valid: true, promotion: validPromotion };
    const result = CouponValidationResultSchema.parse(data);
    expect(result.valid).toBe(true);
    expect(result.promotion?.code).toBe("SAVE20");
  });

  it("accepts invalid result with error", () => {
    const data = {
      valid: false,
      errorCode: "EXPIRED",
      errorMessage: "This coupon has expired",
    };
    const result = CouponValidationResultSchema.parse(data);
    expect(result.valid).toBe(false);
    expect(result.errorCode).toBe("EXPIRED");
  });
});

describe("ApplyPromotionResultSchema", () => {
  it("accepts order discount", () => {
    const data = { discountAmount: 15.00, appliedTo: "order" };
    expect(ApplyPromotionResultSchema.parse(data).discountAmount).toBe(15);
  });

  it("accepts delivery discount", () => {
    const data = { discountAmount: 4.99, appliedTo: "delivery" };
    expect(ApplyPromotionResultSchema.parse(data).appliedTo).toBe("delivery");
  });

  it("rejects negative discount", () => {
    expect(() => ApplyPromotionResultSchema.parse({
      discountAmount: -5, appliedTo: "order",
    })).toThrow();
  });
});
