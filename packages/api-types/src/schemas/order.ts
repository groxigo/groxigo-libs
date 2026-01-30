import { z } from "zod";
import { PaginationQuerySchema, PaginationResponseSchema } from "./common";

// ============================================================================
// ENUMS
// ============================================================================

export const OrderStatusEnum = z.enum([
  "pending",
  "confirmed",
  "picking",
  "packed",
  "out_for_delivery",
  "delivered",
  "cancelled",
]);

export const PaymentStatusEnum = z.enum([
  "pending",
  "authorized",
  "captured",
  "failed",
  "refunded",
  "partially_refunded",
]);

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

export const OrderItemSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  productId: z.string().uuid(),
  productName: z.string(),
  productSku: z.string(),
  productImageUrl: z.string().nullable(),
  quantity: z.number(),
  unitPrice: z.number(),
  totalPrice: z.number(),
  status: OrderItemStatusEnum,
  substitutedProductId: z.string().uuid().nullable(),
  notes: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// ORDER SCHEMAS
// ============================================================================

export const OrderSchema = z.object({
  id: z.string().uuid(),
  orderNumber: z.string(),
  customerId: z.string().uuid(),
  addressId: z.string().uuid().nullable(),
  shippingAddress: z.record(z.unknown()), // JSON object
  subtotal: z.number(),
  tax: z.number(),
  deliveryFee: z.number(),
  serviceFee: z.number(),
  tip: z.number(),
  discount: z.number(),
  total: z.number(),
  status: OrderStatusEnum,
  paymentStatus: PaymentStatusEnum,
  paymentIntentId: z.string().nullable(),
  couponId: z.string().uuid().nullable(),
  couponCode: z.string().nullable(),
  deliverySlotId: z.string().uuid().nullable(),
  deliverySlotStart: z.string().datetime().nullable(),
  deliverySlotEnd: z.string().datetime().nullable(),
  deliveryInstructions: z.string().nullable(),
  specialInstructions: z.string().nullable(),
  substitutionPreference: z.string(),
  pickedAt: z.string().datetime().nullable(),
  packedAt: z.string().datetime().nullable(),
  deliveredAt: z.string().datetime().nullable(),
  cancelledAt: z.string().datetime().nullable(),
  cancellationReason: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Order with items
export const OrderWithItemsSchema = OrderSchema.extend({
  items: z.array(OrderItemSchema),
});

// Order summary for lists
export const OrderSummarySchema = z.object({
  id: z.string().uuid(),
  orderNumber: z.string(),
  customerId: z.string().uuid(),
  total: z.number(),
  status: OrderStatusEnum,
  paymentStatus: PaymentStatusEnum,
  itemCount: z.number(),
  deliverySlotStart: z.string().datetime().nullable(),
  deliverySlotEnd: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
});

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

export const OrderQuerySchema = PaginationQuerySchema.extend({
  status: OrderStatusEnum.optional(),
  paymentStatus: PaymentStatusEnum.optional(),
  customerId: z.string().uuid().optional(),
  fromDate: z.string().date().optional(),
  toDate: z.string().date().optional(),
});

export const CreateOrderSchema = z.object({
  addressId: z.string().uuid(),
  deliverySlotId: z.string().uuid(),
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
  })).min(1),
  couponCode: z.string().optional(),
  tip: z.number().min(0).default(0),
  deliveryInstructions: z.string().max(500).optional(),
  specialInstructions: z.string().max(500).optional(),
  substitutionPreference: z.enum([
    "allow_similar",
    "allow_any",
    "contact_me",
    "no_substitution",
  ]).default("allow_similar"),
});

export const UpdateOrderStatusSchema = z.object({
  status: OrderStatusEnum,
  cancellationReason: z.string().optional(),
});

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

export const OrderResponseSchema = z.object({
  order: OrderWithItemsSchema,
});

export const OrderListResponseSchema = z.object({
  orders: z.array(OrderSummarySchema),
  pagination: PaginationResponseSchema.optional(),
});

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
