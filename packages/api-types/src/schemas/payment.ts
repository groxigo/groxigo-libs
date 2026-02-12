import { z } from "zod";

// ============================================================================
// PAYMENT SCHEMAS
// Stripe payment methods, refunds, and setup intents
// ============================================================================

// ============================================================================
// CONSTANTS
// ============================================================================

/** Valid refund reasons accepted by Stripe. */
export const REFUND_REASONS = [
  "requested_by_customer",
  "duplicate",
  "fraudulent",
] as const;

/** Refund reason enum schema. */
export const RefundReasonSchema = z.enum(REFUND_REASONS);

/** Supported card brands. */
export const CardBrandSchema = z.enum([
  "visa",
  "mastercard",
  "amex",
  "discover",
  "diners",
  "jcb",
  "unionpay",
  "unknown",
]);

// ============================================================================
// ENTITY SCHEMAS
// ============================================================================

/** Saved payment method (card) as returned by the API. */
export const PaymentMethodSchema = z.object({
  id: z.string().uuid(),
  /** Stripe payment method ID (pm_...). */
  providerPaymentMethodId: z.string().max(255),
  /** Card brand (visa, mastercard, etc.). */
  brand: CardBrandSchema,
  /** Last 4 digits of the card number. */
  last4: z.string().length(4),
  /** Card expiry month (1–12). */
  expMonth: z.number().int().min(1).max(12),
  /** Card expiry year (4 digits). */
  expYear: z.number().int().min(2000).max(2100),
  /** Whether this is the customer's default payment method. */
  isDefault: z.boolean(),
  createdAt: z.string().datetime(),
}).readonly();

/** Stripe SetupIntent for securely collecting card details. */
export const SetupIntentSchema = z.object({
  /** Stripe SetupIntent client secret for confirming on the frontend. */
  clientSecret: z.string().max(500),
}).readonly();

/** Payment intent status returned after placing an order. */
export const PaymentIntentResultSchema = z.object({
  /** Stripe PaymentIntent ID (pi_...). */
  paymentIntentId: z.string().max(255),
  /** Payment status. */
  status: z.enum([
    "succeeded",
    "processing",
    "requires_action",
    "requires_payment_method",
    "canceled",
  ]),
  /** Client secret if additional action is required (3D Secure). */
  clientSecret: z.string().max(500).nullable().optional(),
}).readonly();

/** Refund entity as returned by the API. */
export const RefundSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  /** Stripe refund ID (re_...). */
  stripeRefundId: z.string().max(255),
  /** Refund amount in USD. */
  amount: z.number().nonnegative(),
  /** Refund status from Stripe. */
  status: z.enum(["pending", "succeeded", "failed", "canceled"]),
  reason: RefundReasonSchema,
  /** Whether the refund was issued as store credit. */
  refundToStoreCredit: z.boolean(),
  /** Internal admin notes. */
  internalNotes: z.string().max(1000).nullable().optional(),
  createdAt: z.string().datetime(),
}).readonly();

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

/** Save a new payment method from Stripe. */
export const SavePaymentMethodSchema = z.object({
  /** Stripe payment method ID (pm_...) from Stripe.js/Elements. */
  providerPaymentMethodId: z.string().min(1, "Payment method ID is required").max(255),
  /** Set as the customer's default payment method. */
  setAsDefault: z.boolean().optional(),
});

/** Set a saved payment method as default. */
export const SetDefaultPaymentMethodSchema = z.object({
  /** UUID of the saved payment method. */
  paymentMethodId: z.string({ required_error: "Payment method ID is required" }).uuid(),
});

/** Issue a refund for an order (admin). */
export const RefundRequestSchema = z.object({
  /** Order UUID to refund. */
  orderId: z.string({ required_error: "Order ID is required" }).uuid(),
  /** Partial refund amount in USD (omit for full refund). */
  amount: z.number().nonnegative().optional(),
  /** Refund reason (required by Stripe). */
  reason: RefundReasonSchema,
  /** Issue as store credit instead of card refund. */
  refundToStoreCredit: z.boolean().optional(),
  /** Internal notes for audit trail. */
  internalNotes: z.string().max(1000).optional(),
});

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

/** List of saved payment methods. */
export const PaymentMethodListResponseSchema = z.object({
  paymentMethods: z.array(PaymentMethodSchema),
}).readonly();

// ============================================================================
// INFERRED TYPES
// ============================================================================

export type RefundReason = z.infer<typeof RefundReasonSchema>;
export type CardBrand = z.infer<typeof CardBrandSchema>;
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;
export type SetupIntent = z.infer<typeof SetupIntentSchema>;
export type PaymentIntentResult = z.infer<typeof PaymentIntentResultSchema>;
export type Refund = z.infer<typeof RefundSchema>;
export type SavePaymentMethodInput = z.infer<typeof SavePaymentMethodSchema>;
export type SetDefaultPaymentMethodInput = z.infer<typeof SetDefaultPaymentMethodSchema>;
export type RefundRequestInput = z.infer<typeof RefundRequestSchema>;
export type PaymentMethodListResponse = z.infer<typeof PaymentMethodListResponseSchema>;
