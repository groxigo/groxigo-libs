import { z } from "zod";
import { PaginationQuerySchema, PaginationResponseSchema } from "./common";

// ============================================================================
// ENUMS
// ============================================================================

export const InventoryAdjustmentTypeEnum = z.enum([
  "received",
  "sold",
  "adjusted",
  "expired",
  "returned",
  "damaged",
  "transferred",
]);

// ============================================================================
// INVENTORY SCHEMAS
// ============================================================================

export const InventoryItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  sku: z.string(),
  stockQuantity: z.number(),
  lowStockThreshold: z.number(),
  trackInventory: z.boolean(),
  isLowStock: z.boolean().optional(), // computed
});

export const InventoryLogSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  previousQuantity: z.number(),
  newQuantity: z.number(),
  quantityChange: z.number(),
  type: InventoryAdjustmentTypeEnum,
  orderId: z.string().uuid().nullable(),
  notes: z.string().nullable(),
  createdBy: z.string().nullable(),
  createdAt: z.string().datetime(),
});

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

export const InventoryQuerySchema = PaginationQuerySchema.extend({
  lowStockOnly: z.coerce.boolean().optional(),
  search: z.string().optional(),
});

export const InventoryAdjustmentSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int(), // positive = add, negative = subtract
  type: InventoryAdjustmentTypeEnum,
  notes: z.string().max(500).optional(),
  createdBy: z.string().optional(),
});

export const BulkInventoryAdjustmentSchema = z.object({
  adjustments: z.array(InventoryAdjustmentSchema).min(1).max(100),
});

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

export const InventoryResponseSchema = z.object({
  item: InventoryItemSchema,
});

export const InventoryListResponseSchema = z.object({
  items: z.array(InventoryItemSchema),
  pagination: PaginationResponseSchema,
});

export const LowStockResponseSchema = z.object({
  items: z.array(InventoryItemSchema),
  count: z.number(),
});

export const InventoryLogListResponseSchema = z.object({
  logs: z.array(InventoryLogSchema),
  pagination: PaginationResponseSchema,
});

// ============================================================================
// INFERRED TYPES
// ============================================================================

export type InventoryAdjustmentType = z.infer<typeof InventoryAdjustmentTypeEnum>;

export type InventoryItem = z.infer<typeof InventoryItemSchema>;
export type InventoryLog = z.infer<typeof InventoryLogSchema>;

export type InventoryQuery = z.infer<typeof InventoryQuerySchema>;
export type InventoryAdjustment = z.infer<typeof InventoryAdjustmentSchema>;
export type BulkInventoryAdjustment = z.infer<typeof BulkInventoryAdjustmentSchema>;

export type InventoryResponse = z.infer<typeof InventoryResponseSchema>;
export type InventoryListResponse = z.infer<typeof InventoryListResponseSchema>;
export type LowStockResponse = z.infer<typeof LowStockResponseSchema>;
export type InventoryLogListResponse = z.infer<typeof InventoryLogListResponseSchema>;
