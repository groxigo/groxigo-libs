import { z } from "zod";
import { PaginationQuerySchema, PaginationResponseSchema } from "./common";

// ============================================================================
// ENUMS
// ============================================================================

/** Order lifecycle statuses. */
export const OrderStatusEnum = z.enum([
  "pending",
  "confirmed",
  "picking",
  "packed",
  "out_for_delivery",
  "delivered",
  "cancelled",
]);

/** Payment processing statuses. */
export const PaymentStatusEnum = z.enum([
  "pending",
  "authorized",
  "captured",
  "failed",
  "refunded",
  "partially_refunded",
]);

/** Per-item fulfillment statuses. */
export const OrderItemStatusEnum = z.enum([
  "pending",
  "picked",
  "substituted",
  "unavailable",
  "refunded",
]);

// ============================================================================
// ORDER ITEM SCHEMAS
// ============================================================================

/** Single line-item within an order. */
export const OrderItemSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  productId: z.string().uuid(),
  productName: z.string().max(255),
  productSku: z.string().max(100),
  productImageUrl: z.string().max(2000).nullable(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().nonnegative(),
  totalPrice: z.number().nonnegative(),
  status: OrderItemStatusEnum,
  substitutedProductId: z.string().uuid().nullable(),
  notes: z.string().max(500).nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).readonly();

// ============================================================================
// ORDER SCHEMAS
// ============================================================================

/** Full order entity as returned by the API. */
export const OrderSchema = z.object({
  id: z.string().uuid(),
  /** Human-readable order number (e.g., "GRX-20260115-001"). */
  orderNumber: z.string().max(50),
  customerId: z.string().uuid(),
  addressId: z.string().uuid().nullable(),
  shippingAddress: z.record(z.unknown()),
  subtotal: z.number().nonnegative(),
  tax: z.number().nonnegative(),
  deliveryFee: z.number().nonnegative(),
  serviceFee: z.number().nonnegative(),
  tip: z.number().nonnegative(),
  discount: z.number().nonnegative(),
  total: z.number().nonnegative(),
  status: OrderStatusEnum,
  paymentStatus: PaymentStatusEnum,
  /** Stripe PaymentIntent ID (pi_...). */
  paymentIntentId: z.string().max(255).nullable(),
  couponId: z.string().uuid().nullable(),
  couponCode: z.string().max(50).nullable(),
  deliverySlotId: z.string().uuid().nullable(),
  /** ISO 8601 datetime */
  deliverySlotStart: z.string().datetime().nullable(),
  /** ISO 8601 datetime */
  deliverySlotEnd: z.string().datetime().nullable(),
  deliveryInstructions: z.string().max(500).nullable(),
  specialInstructions: z.string().max(500).nullable(),
  /** How out-of-stock items should be handled. */
  substitutionPreference: z.enum([
    "allow_similar",
    "allow_any",
    "contact_me",
    "no_substitution",
  ]),
  pickedAt: z.string().datetime().nullable(),
  packedAt: z.string().datetime().nullable(),
  deliveredAt: z.string().datetime().nullable(),
  cancelledAt: z.string().datetime().nullable(),
  cancellationReason: z.string().max(500).nullable(),
  /** Estimated minutes until delivery (from migration 008). */
  etaMinutes: z.number().int().min(0).nullable(),
  /** When the ETA was last updated (ISO 8601). */
  etaUpdatedAt: z.string().datetime().nullable(),
  /** Source of the ETA estimate. */
  etaSource: z.enum(["calculated", "manual", "driver"]).nullable(),
  /** Opaque token for delivery tracking page. */
  trackingToken: z.string().max(500).nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/** Order with nested line-items. */
export const OrderWithItemsSchema = OrderSchema.extend({
  items: z.array(OrderItemSchema),
}).readonly();

/** Lightweight order for list views. */
export const OrderSummarySchema = z.object({
  id: z.string().uuid(),
  orderNumber: z.string().max(50),
  customerId: z.string().uuid(),
  total: z.number().nonnegative(),
  status: OrderStatusEnum,
  paymentStatus: PaymentStatusEnum,
  itemCount: z.number().int().nonnegative(),
  deliverySlotStart: z.string().datetime().nullable(),
  deliverySlotEnd: z.string().datetime().nullable(),
  etaMinutes: z.number().int().min(0).nullable(),
  trackingToken: z.string().max(500).nullable(),
  createdAt: z.string().datetime(),
}).readonly();

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

/** Query params for order list. */
export const OrderQuerySchema = PaginationQuerySchema.extend({
  status: OrderStatusEnum.optional(),
  paymentStatus: PaymentStatusEnum.optional(),
  customerId: z.string().uuid().optional(),
  /** YYYY-MM-DD filter start date */
  fromDate: z.string().date().optional(),
  /** YYYY-MM-DD filter end date */
  toDate: z.string().date().optional(),
});

/** Payload for placing a new order. */
export const CreateOrderSchema = z.object({
  addressId: z.string({ required_error: "Delivery address is required" }).uuid(),
  deliverySlotId: z.string({ required_error: "Delivery slot is required" }).uuid(),
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive("Quantity must be at least 1"),
  })).min(1, "Order must contain at least one item"),
  couponCode: z.string().max(50).optional(),
  tip: z.number().min(0, "Tip cannot be negative").default(0),
  deliveryInstructions: z.string().max(500).optional(),
  specialInstructions: z.string().max(500).optional(),
  substitutionPreference: z.enum([
    "allow_similar",
    "allow_any",
    "contact_me",
    "no_substitution",
  ]).default("allow_similar"),
});

/** Payload for admin order-status update. */
export const UpdateOrderStatusSchema = z.object({
  status: OrderStatusEnum,
  cancellationReason: z.string().max(500).optional(),
});

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

/** Single order response (with items). */
export const OrderResponseSchema = z.object({
  order: OrderWithItemsSchema,
}).readonly();

/** Paginated order list response. */
export const OrderListResponseSchema = z.object({
  orders: z.array(OrderSummarySchema),
  pagination: PaginationResponseSchema.optional(),
}).readonly();

// ============================================================================
// INFERRED TYPES
// ============================================================================

export type OrderStatus = z.infer<typeof OrderStatusEnum>;
export type PaymentStatus = z.infer<typeof PaymentStatusEnum>;
export type OrderItemStatus = z.infer<typeof OrderItemStatusEnum>;

export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type OrderWithItems = z.infer<typeof OrderWithItemsSchema>;
export type OrderSummary = z.infer<typeof OrderSummarySchema>;

export type OrderQuery = z.infer<typeof OrderQuerySchema>;
export type CreateOrder = z.infer<typeof CreateOrderSchema>;
export type UpdateOrderStatus = z.infer<typeof UpdateOrderStatusSchema>;

export type OrderResponse = z.infer<typeof OrderResponseSchema>;
export type OrderListResponse = z.infer<typeof OrderListResponseSchema>;
