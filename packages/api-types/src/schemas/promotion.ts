import { z } from "zod";

// ============================================================================
// PROMOTION / COUPON SCHEMAS
// Coupon validation, promotion application, and admin CRUD
// ============================================================================

// ============================================================================
// CONSTANTS
// ============================================================================

/** Coupon validation error codes returned by the API. */
export const CouponErrorCodes = {
  INVALID_CODE: "INVALID_CODE",
  EXPIRED: "EXPIRED",
  NOT_STARTED: "NOT_STARTED",
  USAGE_LIMIT_REACHED: "USAGE_LIMIT_REACHED",
  ALREADY_USED: "ALREADY_USED",
  MIN_ORDER_NOT_MET: "MIN_ORDER_NOT_MET",
  NOT_ELIGIBLE: "NOT_ELIGIBLE",
} as const;

/** Human-readable messages for each coupon error code. */
export const CouponErrorMessages: Record<string, string> = {
  [CouponErrorCodes.INVALID_CODE]: "This coupon code is invalid",
  [CouponErrorCodes.EXPIRED]: "This coupon has expired",
  [CouponErrorCodes.NOT_STARTED]: "This coupon is not yet active",
  [CouponErrorCodes.USAGE_LIMIT_REACHED]:
    "This coupon has reached its usage limit",
  [CouponErrorCodes.ALREADY_USED]: "You've already used this coupon",
  [CouponErrorCodes.MIN_ORDER_NOT_MET]: "Minimum order amount not met",
  [CouponErrorCodes.NOT_ELIGIBLE]:
    "You're not eligible for this promotion",
};

/** Promotion types. */
export const PromotionTypeSchema = z.enum([
  "coupon",
  "automatic",
  "flash_sale",
]);

/** Discount calculation methods. */
export const DiscountTypeSchema = z.enum([
  "percentage",
  "fixed_amount",
  "free_delivery",
  "buy_x_get_y",
]);

// ============================================================================
// ENTITY SCHEMAS
// ============================================================================

/** Promotion entity as returned by the API. */
export const PromotionSchema = z.object({
  id: z.string().uuid(),
  /** Promotion type. */
  type: PromotionTypeSchema,
  /** Unique coupon code (for type=coupon). */
  code: z.string().max(50),
  /** Display name. */
  name: z.string().max(200),
  /** Optional description shown to customers. */
  description: z.string().max(1000).nullable().optional(),
  /** How the discount is calculated. */
  discountType: DiscountTypeSchema,
  /** Discount value (percentage 0–100, or fixed amount in USD). */
  discountValue: z.number().min(0).max(10000),
  /** Minimum cart subtotal required to apply (USD). */
  minOrderAmount: z.number().min(0).max(100000).nullable().optional(),
  /** Maximum discount cap (USD). */
  maxDiscountAmount: z.number().min(0).max(10000).nullable().optional(),
  /** Total uses allowed across all customers. */
  usageLimit: z.number().int().min(1).max(1000000).nullable().optional(),
  /** Max uses per individual customer. */
  perCustomerLimit: z.number().int().min(1).max(100).nullable().optional(),
  /** Total times this promotion has been used. */
  usageCount: z.number().int().nonnegative().optional(),
  /** ISO datetime when the promotion becomes active. */
  startsAt: z.string().datetime(),
  /** ISO datetime when the promotion expires (null = no expiry). */
  endsAt: z.string().datetime().nullable().optional(),
  /** Whether the promotion is currently active. */
  isActive: z.boolean(),
  /** Whether this can stack with other promotions. */
  isStackable: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).readonly();

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

/** Validate a coupon code (customer-facing). */
export const ValidateCouponSchema = z.object({
  /** Coupon code to validate. */
  code: z.string().min(1, "Coupon code is required").max(50),
  /** Current cart subtotal for minimum-order checks (USD). */
  subtotal: z.number().nonnegative().optional(),
});

/** Apply a promotion to a cart (customer-facing). */
export const ApplyPromotionSchema = z.object({
  /** Promotion UUID to apply. */
  promotionId: z.string({ required_error: "Promotion ID is required" }).uuid(),
  /** Cart subtotal (USD). */
  subtotal: z.number().nonnegative(),
  /** Delivery fee (USD), used for free_delivery promotions. */
  deliveryFee: z.number().nonnegative().default(0),
});

/** Create a new promotion (admin). */
export const CreatePromotionSchema = z.object({
  type: PromotionTypeSchema,
  code: z.string().min(1, "Coupon code is required").max(50),
  name: z.string().min(1, "Promotion name is required").max(200),
  description: z.string().max(1000).optional(),
  discountType: DiscountTypeSchema,
  discountValue: z.number().min(0).max(10000),
  minOrderAmount: z.number().min(0).max(100000).optional(),
  maxDiscountAmount: z.number().min(0).max(10000).optional(),
  usageLimit: z.number().int().min(1).max(1000000).optional(),
  perCustomerLimit: z.number().int().min(1).max(100).optional(),
  /** ISO datetime string. */
  startsAt: z.string().datetime(),
  /** ISO datetime string (optional — no expiry if omitted). */
  endsAt: z.string().datetime().optional(),
  isActive: z.boolean().default(true),
  isStackable: z.boolean().default(false),
}).refine(
  (data) => {
    if (data.discountType === "percentage" && data.discountValue > 100) {
      return false;
    }
    return true;
  },
  { message: "Percentage discount must be between 0 and 100" },
);

/** Update an existing promotion (admin). */
export const UpdatePromotionSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional().nullable(),
  discountValue: z.number().min(0).max(10000).optional(),
  minOrderAmount: z.number().min(0).max(100000).optional().nullable(),
  maxDiscountAmount: z.number().min(0).max(10000).optional().nullable(),
  usageLimit: z.number().int().min(1).max(1000000).optional().nullable(),
  perCustomerLimit: z.number().int().min(1).max(100).optional().nullable(),
  startsAt: z.string().datetime().optional(),
  endsAt: z.string().datetime().optional().nullable(),
  isActive: z.boolean().optional(),
  isStackable: z.boolean().optional(),
});

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

/** Result of validating a coupon code. */
export const CouponValidationResultSchema = z.object({
  valid: z.boolean(),
  /** Promotion details if valid. */
  promotion: PromotionSchema.optional(),
  /** Error code if invalid. */
  errorCode: z.string().max(50).optional(),
  /** Human-readable error message. */
  errorMessage: z.string().max(500).optional(),
}).readonly();

/** Result of applying a promotion to a cart. */
export const ApplyPromotionResultSchema = z.object({
  /** Discount amount in USD. */
  discountAmount: z.number().nonnegative(),
  /** What the discount was applied to. */
  appliedTo: z.enum(["order", "delivery"]),
}).readonly();

// ============================================================================
// INFERRED TYPES
// ============================================================================

export type PromotionType = z.infer<typeof PromotionTypeSchema>;
export type DiscountType = z.infer<typeof DiscountTypeSchema>;
export type Promotion = z.infer<typeof PromotionSchema>;
export type ValidateCouponInput = z.infer<typeof ValidateCouponSchema>;
export type ApplyPromotionInput = z.infer<typeof ApplyPromotionSchema>;
export type CreatePromotionInput = z.infer<typeof CreatePromotionSchema>;
export type UpdatePromotionInput = z.infer<typeof UpdatePromotionSchema>;
export type CouponValidationResult = z.infer<typeof CouponValidationResultSchema>;
export type ApplyPromotionResult = z.infer<typeof ApplyPromotionResultSchema>;
