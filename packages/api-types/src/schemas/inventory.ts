import { z } from "zod";
import { PaginationQuerySchema, PaginationResponseSchema } from "./common";

// ============================================================================
// ENUMS
// ============================================================================

/** Inventory adjustment types for audit trail. */
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

/** Inventory item (product stock summary). */
export const InventoryItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string().max(255),
  sku: z.string().max(100),
  stockQuantity: z.number().int().nonnegative(),
  lowStockThreshold: z.number().int().nonnegative(),
  trackInventory: z.boolean(),
  /** Computed: stockQuantity <= lowStockThreshold. */
  isLowStock: z.boolean().optional(),
}).readonly();

/** Single inventory adjustment log entry. */
export const InventoryLogSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  previousQuantity: z.number().int(),
  newQuantity: z.number().int(),
  quantityChange: z.number().int(),
  type: InventoryAdjustmentTypeEnum,
  orderId: z.string().uuid().nullable(),
  notes: z.string().max(500).nullable(),
  createdBy: z.string().max(255).nullable(),
  createdAt: z.string().datetime(),
}).readonly();

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

/** Query params for inventory list (admin). */
export const InventoryQuerySchema = PaginationQuerySchema.extend({
  lowStockOnly: z.coerce.boolean().optional(),
  search: z.string().max(200).optional(),
});

/** Single inventory adjustment request. */
export const InventoryAdjustmentSchema = z.object({
  productId: z.string({ required_error: "Product ID is required" }).uuid(),
  /** Positive to add stock, negative to subtract. */
  quantity: z.number().int("Quantity must be a whole number"),
  type: InventoryAdjustmentTypeEnum,
  notes: z.string().max(500).optional(),
  createdBy: z.string().max(255).optional(),
});

/** Batch inventory adjustment (up to 100 items). */
export const BulkInventoryAdjustmentSchema = z.object({
  adjustments: z.array(InventoryAdjustmentSchema).min(1, "At least one adjustment is required").max(100),
});

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

/** Single inventory item response. */
export const InventoryResponseSchema = z.object({
  item: InventoryItemSchema,
}).readonly();

/** Paginated inventory list response. */
export const InventoryListResponseSchema = z.object({
  items: z.array(InventoryItemSchema),
  pagination: PaginationResponseSchema,
}).readonly();

/** Low-stock alert response. */
export const LowStockResponseSchema = z.object({
  items: z.array(InventoryItemSchema),
  count: z.number().int().nonnegative(),
}).readonly();

/** Paginated inventory log response. */
export const InventoryLogListResponseSchema = z.object({
  logs: z.array(InventoryLogSchema),
  pagination: PaginationResponseSchema,
}).readonly();

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
