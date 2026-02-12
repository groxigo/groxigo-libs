import { z } from "zod";

// ============================================================================
// CHECKOUT SCHEMAS
// Checkout session management and order placement
// ============================================================================

// ============================================================================
// CONSTANTS
// ============================================================================

/** Checkout session TTL in seconds (30 minutes). */
export const SESSION_TTL_SECONDS = 1800;

// ============================================================================
// ENTITY SCHEMAS
// ============================================================================

/** Checkout session as returned by the API. */
export const CheckoutSessionSchema = z.object({
  id: z.string().uuid(),
  customerId: z.string().uuid(),
  storeId: z.string().uuid().nullable(),
  /** Selected delivery address UUID. */
  addressId: z.string().uuid().nullable(),
  /** Selected delivery slot UUID. */
  deliverySlotId: z.string().max(255).nullable(),
  /** Selected payment method UUID. */
  paymentMethodId: z.string().uuid().nullable(),
  /** Whether to apply store credit. */
  useStoreCredit: z.boolean(),
  /** Store credit amount to apply (USD). */
  storeCreditAmount: z.number().nonnegative().nullable(),
  /** How out-of-stock items should be handled. */
  substitutionPreference: z.enum([
    "allow_similar",
    "allow_any",
    "contact_me",
    "no_substitution",
  ]).nullable(),
  /** Customer notes for the order. */
  customerNotes: z.string().max(1000).nullable(),
  /** Applied coupon code. */
  couponCode: z.string().max(50).nullable(),
  /** Cart subtotal (USD). */
  subtotal: z.number().nonnegative(),
  /** Tax amount (USD). */
  tax: z.number().nonnegative(),
  /** Delivery fee (USD). */
  deliveryFee: z.number().nonnegative(),
  /** Service fee (USD). */
  serviceFee: z.number().nonnegative(),
  /** Discount amount (USD). */
  discount: z.number().nonnegative(),
  /** Order total (USD). */
  total: z.number().nonnegative(),
  /** ISO datetime when session expires. */
  expiresAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).readonly();

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

/** Create a new checkout session. */
export const CreateCheckoutSessionSchema = z.object({
  /** Target store UUID (auto-detected if omitted). */
  storeId: z.string().uuid().optional(),
});

/** Update an existing checkout session (partial). */
export const UpdateCheckoutSessionSchema = z.object({
  /** Delivery address UUID. */
  addressId: z.string().uuid().optional(),
  /** Delivery slot ID. */
  deliverySlotId: z.string().max(255).optional(),
  /** Payment method UUID. */
  paymentMethodId: z.string().uuid().optional(),
  /** Apply store credit to this order. */
  useStoreCredit: z.boolean().optional(),
  /** Store credit amount in USD (max 2 decimal places). */
  storeCreditAmount: z.number().nonnegative().max(10000).optional(),
  /** Substitution preference for out-of-stock items. */
  substitutionPreference: z.enum([
    "allow_similar",
    "allow_any",
    "contact_me",
    "no_substitution",
  ]).optional(),
  /** Customer notes for the delivery. */
  customerNotes: z.string().max(1000).optional(),
});

/** Place the order from a checkout session. */
export const PlaceOrderSchema = z.object({
  /** Customer must accept terms and conditions. */
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
  /** Client-generated idempotency key to prevent duplicate charges. */
  idempotencyKey: z.string()
    .min(1, "Idempotency key is required")
    .max(128)
    .regex(/^[a-zA-Z0-9_-]+$/, "Idempotency key must only contain alphanumeric characters, hyphens, and underscores"),
});

/** Apply a promo/coupon code to the checkout session. */
export const ApplyCheckoutPromoSchema = z.object({
  /** Coupon code to apply. */
  code: z.string().min(1, "Coupon code is required").max(50),
});

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

/** Checkout session response. */
export const CheckoutSessionResponseSchema = z.object({
  session: CheckoutSessionSchema,
}).readonly();

/** Order placement result. */
export const PlaceOrderResultSchema = z.object({
  /** The created order UUID. */
  orderId: z.string().uuid(),
  /** Human-readable order number. */
  orderNumber: z.string().max(50),
  /** Stripe PaymentIntent status. */
  paymentStatus: z.enum(["succeeded", "processing", "requires_action"]),
  /** Client secret if 3D Secure is required. */
  clientSecret: z.string().max(500).nullable().optional(),
}).readonly();

// ============================================================================
// INFERRED TYPES
// ============================================================================

export type CheckoutSession = z.infer<typeof CheckoutSessionSchema>;
export type CreateCheckoutSessionInput = z.infer<typeof CreateCheckoutSessionSchema>;
export type UpdateCheckoutSessionInput = z.infer<typeof UpdateCheckoutSessionSchema>;
export type PlaceOrderInput = z.infer<typeof PlaceOrderSchema>;
export type ApplyCheckoutPromoInput = z.infer<typeof ApplyCheckoutPromoSchema>;
export type CheckoutSessionResponse = z.infer<typeof CheckoutSessionResponseSchema>;
export type PlaceOrderResult = z.infer<typeof PlaceOrderResultSchema>;
