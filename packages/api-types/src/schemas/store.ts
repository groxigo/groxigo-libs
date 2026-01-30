// ============================================================================
// STORE SCHEMAS
// Multi-location store/warehouse schemas
// ============================================================================

import { z } from "zod";
import { InventoryAdjustmentTypeEnum } from "./inventory";

// ============================================================================
// OPERATING HOURS
// ============================================================================

export const OperatingHoursEntrySchema = z.object({
  open: z.string().regex(/^\d{2}:\d{2}$/, "Must be in HH:MM format"),
  close: z.string().regex(/^\d{2}:\d{2}$/, "Must be in HH:MM format"),
}).nullable();

export const OperatingHoursSchema = z.object({
  mon: OperatingHoursEntrySchema.optional(),
  tue: OperatingHoursEntrySchema.optional(),
  wed: OperatingHoursEntrySchema.optional(),
  thu: OperatingHoursEntrySchema.optional(),
  fri: OperatingHoursEntrySchema.optional(),
  sat: OperatingHoursEntrySchema.optional(),
  sun: OperatingHoursEntrySchema.optional(),
});

export type OperatingHoursEntry = z.infer<typeof OperatingHoursEntrySchema>;
export type OperatingHours = z.infer<typeof OperatingHoursSchema>;

// ============================================================================
// STORE
// ============================================================================

export const StoreSchema = z.object({
  id: z.string().uuid(),
  code: z.string().min(1).max(10),
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),

  // Contact
  phone: z.string().nullable(),
  email: z.string().email().nullable(),

  // Address
  addressLine1: z.string().min(1),
  addressLine2: z.string().nullable(),
  city: z.string().min(1),
  state: z.string().min(1).max(2),
  postalCode: z.string().min(5).max(10),
  country: z.string().default("US"),

  // Geolocation
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),

  // Timezone
  timezone: z.string().default("America/Chicago"),

  // Operating Hours
  operatingHours: OperatingHoursSchema,

  // Delivery Configuration
  deliveryRadiusMiles: z.number().positive(),
  minimumOrderAmount: z.number().min(0),
  deliveryFee: z.number().min(0),
  freeDeliveryMinimum: z.number().positive().nullable(),

  // Status
  isActive: z.boolean(),
  isAcceptingOrders: z.boolean(),
  launchedAt: z.string().datetime().nullable(),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Store = z.infer<typeof StoreSchema>;

// Public store info (no internal details)
export const StorePublicSchema = StoreSchema.pick({
  id: true,
  code: true,
  name: true,
  slug: true,
  city: true,
  state: true,
  operatingHours: true,
  deliveryRadiusMiles: true,
  minimumOrderAmount: true,
  deliveryFee: true,
  freeDeliveryMinimum: true,
  isActive: true,
  isAcceptingOrders: true,
});

export type StorePublic = z.infer<typeof StorePublicSchema>;

// Create store (admin)
export const CreateStoreSchema = StoreSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateStore = z.infer<typeof CreateStoreSchema>;

// Update store (admin)
export const UpdateStoreSchema = CreateStoreSchema.partial();

export type UpdateStore = z.infer<typeof UpdateStoreSchema>;

// ============================================================================
// STORE PRODUCT (per-store availability/pricing overrides)
// ============================================================================

export const StoreProductSchema = z.object({
  id: z.string().uuid(),
  storeId: z.string().uuid(),
  productId: z.string().uuid(),

  // Overrides (null = use product default)
  isAvailable: z.boolean().nullable(),
  price: z.number().positive().nullable(),
  compareAtPrice: z.number().positive().nullable(),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type StoreProduct = z.infer<typeof StoreProductSchema>;

export const UpdateStoreProductSchema = z.object({
  isAvailable: z.boolean().nullable().optional(),
  price: z.number().positive().nullable().optional(),
  compareAtPrice: z.number().positive().nullable().optional(),
});

export type UpdateStoreProduct = z.infer<typeof UpdateStoreProductSchema>;

// ============================================================================
// STORE INVENTORY
// ============================================================================

export const StoreInventorySchema = z.object({
  id: z.string().uuid(),
  storeId: z.string().uuid(),
  productId: z.string().uuid(),

  // Stock levels
  quantity: z.number().int().min(0),
  lowStockThreshold: z.number().int().min(0),
  reservedQuantity: z.number().int().min(0),

  // Reorder info
  reorderPoint: z.number().int().min(0).nullable(),
  reorderQuantity: z.number().int().min(0).nullable(),

  // Last count
  lastCountedAt: z.string().datetime().nullable(),
  lastCountedBy: z.string().nullable(),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type StoreInventory = z.infer<typeof StoreInventorySchema>;

// For inventory list with product info
export const StoreInventoryWithProductSchema = StoreInventorySchema.extend({
  product: z.object({
    id: z.string().uuid(),
    name: z.string(),
    sku: z.string(),
    imageUrl: z.string().nullable(),
  }),
  isLowStock: z.boolean(),
  availableQuantity: z.number().int(), // quantity - reservedQuantity
});

export type StoreInventoryWithProduct = z.infer<typeof StoreInventoryWithProductSchema>;

// ============================================================================
// STORE DELIVERY SLOTS
// ============================================================================

export const StoreDeliverySlotSchema = z.object({
  id: z.string().uuid(),
  storeId: z.string().uuid(),

  date: z.string(), // YYYY-MM-DD
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Must be in HH:MM format"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Must be in HH:MM format"),

  capacity: z.number().int().positive(),
  bookedCount: z.number().int().min(0),

  isPremium: z.boolean(),
  premiumFee: z.number().min(0),

  isActive: z.boolean(),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type StoreDeliverySlot = z.infer<typeof StoreDeliverySlotSchema>;

// For customer-facing slot display
export const AvailableSlotSchema = StoreDeliverySlotSchema.pick({
  id: true,
  date: true,
  startTime: true,
  endTime: true,
  isPremium: true,
  premiumFee: true,
}).extend({
  availableCapacity: z.number().int().min(0),
  displayLabel: z.string(), // e.g., "9:00 AM - 11:00 AM"
});

export type AvailableSlot = z.infer<typeof AvailableSlotSchema>;

export const CreateStoreDeliverySlotSchema = StoreDeliverySlotSchema.omit({
  id: true,
  bookedCount: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateStoreDeliverySlot = z.infer<typeof CreateStoreDeliverySlotSchema>;

// ============================================================================
// SERVICEABILITY CHECK
// ============================================================================

export const CheckServiceabilityRequestSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export type CheckServiceabilityRequest = z.infer<typeof CheckServiceabilityRequestSchema>;

export const ServiceabilityResultSchema = z.object({
  serviceable: z.boolean(),
  store: StorePublicSchema.optional(),
  distance: z.number().optional(), // miles from store
  message: z.string().optional(),
  nearestStore: z.object({
    name: z.string(),
    distance: z.number(),
  }).optional(),
});

export type ServiceabilityResult = z.infer<typeof ServiceabilityResultSchema>;

// ============================================================================
// STORE INVENTORY ADJUSTMENT
// ============================================================================

export const StoreInventoryAdjustRequestSchema = z.object({
  storeId: z.string().uuid(),
  productId: z.string().uuid(),
  adjustment: z.number().int(), // positive or negative
  type: InventoryAdjustmentTypeEnum,
  reason: z.string().optional(),
  referenceType: z.string().optional(),
  referenceId: z.string().optional(),
});

export type StoreInventoryAdjustRequest = z.infer<typeof StoreInventoryAdjustRequestSchema>;

export const StoreBulkInventoryAdjustRequestSchema = z.object({
  storeId: z.string().uuid(),
  adjustments: z.array(z.object({
    productId: z.string().uuid(),
    adjustment: z.number().int(),
    type: InventoryAdjustmentTypeEnum,
    reason: z.string().optional(),
  })),
});

export type StoreBulkInventoryAdjustRequest = z.infer<typeof StoreBulkInventoryAdjustRequestSchema>;
