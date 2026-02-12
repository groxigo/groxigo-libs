// ============================================================================
// STORE SCHEMAS
// Multi-location store/warehouse schemas
// ============================================================================

import { z } from "zod";
import { InventoryAdjustmentTypeEnum } from "./inventory";

// ============================================================================
// OPERATING HOURS
// ============================================================================

/** Single day's opening and closing times (null = closed that day). */
export const OperatingHoursEntrySchema = z.object({
  /** Opening time in HH:MM 24-hour format (e.g., "09:00"). */
  open: z.string().regex(/^\d{2}:\d{2}$/, "Must be in HH:MM format"),
  /** Closing time in HH:MM 24-hour format (e.g., "21:00"). */
  close: z.string().regex(/^\d{2}:\d{2}$/, "Must be in HH:MM format"),
}).nullable();

/** Weekly operating hours keyed by three-letter day abbreviation. */
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

/** Full store/warehouse entity with all operational details. */
export const StoreSchema = z.object({
  id: z.string().uuid(),
  /** Short unique store code (e.g., "DFW-01"). */
  code: z.string().min(1).max(10),
  /** Human-readable store name. */
  name: z.string().min(1).max(100),
  /** URL-safe slug for the store. */
  slug: z.string().min(1).max(100),

  // Contact
  /** Store phone number. */
  phone: z.string().max(20).nullable(),
  /** Store email address. */
  email: z.string().email().max(255).nullable(),

  // Address
  /** Street address line 1. */
  addressLine1: z.string().min(1).max(255),
  /** Street address line 2 (suite, unit, etc.). */
  addressLine2: z.string().max(255).nullable(),
  /** City name. */
  city: z.string().min(1).max(100),
  /** State or province. */
  state: z.string().min(1).max(100),
  /** Postal / ZIP code. */
  postalCode: z.string().min(5).max(10),
  /** ISO country code. */
  country: z.string().max(10).default("US"),

  // Geolocation
  /** Latitude in decimal degrees (−90 to 90). */
  latitude: z.number().min(-90).max(90),
  /** Longitude in decimal degrees (−180 to 180). */
  longitude: z.number().min(-180).max(180),

  // Timezone
  /** IANA timezone identifier (e.g., "America/Chicago"). */
  timezone: z.string().max(50).default("America/Chicago"),

  // Operating Hours
  /** Weekly operating schedule. */
  operatingHours: OperatingHoursSchema,

  // Delivery Configuration
  /** Maximum delivery radius in miles from the store. */
  deliveryRadiusMiles: z.number().positive(),
  /** Minimum order amount in USD to place an order. */
  minimumOrderAmount: z.number().min(0),
  /** Flat delivery fee in USD (0 = free delivery). */
  deliveryFee: z.number().min(0),
  /** Order subtotal in USD above which delivery is free (null = never free). */
  freeDeliveryMinimum: z.number().positive().nullable(),

  // Status
  /** Whether the store is visible to customers. */
  isActive: z.boolean(),
  /** Whether the store is currently accepting new orders. */
  isAcceptingOrders: z.boolean(),
  /** ISO datetime when the store first went live. */
  launchedAt: z.string().datetime().nullable(),

  // Timestamps
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Store = z.infer<typeof StoreSchema>;

/** Public store info visible to customers (no internal details). */
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
}).readonly();

export type StorePublic = z.infer<typeof StorePublicSchema>;

/** Payload for creating a new store (admin). */
export const CreateStoreSchema = StoreSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateStore = z.infer<typeof CreateStoreSchema>;

/** Partial store update (admin). */
export const UpdateStoreSchema = CreateStoreSchema.partial();

export type UpdateStore = z.infer<typeof UpdateStoreSchema>;

// ============================================================================
// STORE PRODUCT (per-store availability/pricing overrides)
// ============================================================================

/** Per-store product availability and pricing override. */
export const StoreProductSchema = z.object({
  id: z.string().uuid(),
  storeId: z.string().uuid(),
  productId: z.string().uuid(),

  /** Store-level availability override (null = use product default). */
  isAvailable: z.boolean().nullable(),
  /** Store-specific price in USD (null = use product default). */
  price: z.number().positive().nullable(),
  /** Store-specific compare-at / was-price in USD (null = use product default). */
  compareAtPrice: z.number().positive().nullable(),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).readonly();

export type StoreProduct = z.infer<typeof StoreProductSchema>;

/** Payload for updating per-store product overrides. */
export const UpdateStoreProductSchema = z.object({
  isAvailable: z.boolean().nullable().optional(),
  price: z.number().positive().nullable().optional(),
  compareAtPrice: z.number().positive().nullable().optional(),
});

export type UpdateStoreProduct = z.infer<typeof UpdateStoreProductSchema>;

// ============================================================================
// STORE INVENTORY
// ============================================================================

/** Per-store inventory record for a single product. */
export const StoreInventorySchema = z.object({
  id: z.string().uuid(),
  storeId: z.string().uuid(),
  productId: z.string().uuid(),

  /** Total units in stock at this store. */
  quantity: z.number().int().min(0),
  /** Threshold below which the product is flagged as low-stock. */
  lowStockThreshold: z.number().int().min(0),
  /** Units reserved for in-progress orders (not yet fulfilled). */
  reservedQuantity: z.number().int().min(0),

  /** Inventory level at which a reorder should be triggered. */
  reorderPoint: z.number().int().min(0).nullable(),
  /** Default quantity to reorder when reorder point is reached. */
  reorderQuantity: z.number().int().min(0).nullable(),

  /** ISO datetime of the last physical inventory count. */
  lastCountedAt: z.string().datetime().nullable(),
  /** Staff member who performed the last physical count. */
  lastCountedBy: z.string().max(255).nullable(),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type StoreInventory = z.infer<typeof StoreInventorySchema>;

/** Store inventory enriched with product details for list views. */
export const StoreInventoryWithProductSchema = StoreInventorySchema.extend({
  product: z.object({
    id: z.string().uuid(),
    name: z.string().max(255),
    sku: z.string().max(100),
    imageUrl: z.string().max(2000).nullable(),
  }),
  /** Whether quantity ≤ lowStockThreshold. */
  isLowStock: z.boolean(),
  /** Computed: quantity − reservedQuantity. */
  availableQuantity: z.number().int(),
}).readonly();

export type StoreInventoryWithProduct = z.infer<typeof StoreInventoryWithProductSchema>;

// ============================================================================
// STORE DELIVERY SLOTS
// ============================================================================

/** Store-specific delivery time slot. */
export const StoreDeliverySlotSchema = z.object({
  id: z.string().uuid(),
  storeId: z.string().uuid(),

  /** Delivery date in YYYY-MM-DD format. */
  date: z.string().max(10),
  /** Slot start time in HH:MM format (e.g., "09:00"). */
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Must be in HH:MM format"),
  /** Slot end time in HH:MM format (e.g., "11:00"). */
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Must be in HH:MM format"),

  /** Maximum orders for this slot. */
  capacity: z.number().int().positive(),
  /** Orders already booked into this slot. */
  bookedCount: z.number().int().min(0),

  /** Whether this is a premium (express) slot. */
  isPremium: z.boolean(),
  /** Additional fee for premium delivery in USD. */
  premiumFee: z.number().min(0),

  /** Whether the slot is enabled. */
  isActive: z.boolean(),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type StoreDeliverySlot = z.infer<typeof StoreDeliverySlotSchema>;

/** Customer-facing delivery slot with availability info. */
export const AvailableSlotSchema = StoreDeliverySlotSchema.pick({
  id: true,
  date: true,
  startTime: true,
  endTime: true,
  isPremium: true,
  premiumFee: true,
}).extend({
  /** Remaining capacity (capacity − bookedCount). */
  availableCapacity: z.number().int().min(0),
  /** Human-readable time range (e.g., "9:00 AM – 11:00 AM"). */
  displayLabel: z.string().max(100),
}).readonly();

export type AvailableSlot = z.infer<typeof AvailableSlotSchema>;

/** Payload for creating a store delivery slot (admin). */
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

/** Request body for checking delivery serviceability at a location. */
export const CheckServiceabilityRequestSchema = z.object({
  /** Customer latitude in decimal degrees (−90 to 90). */
  latitude: z.number().min(-90).max(90),
  /** Customer longitude in decimal degrees (−180 to 180). */
  longitude: z.number().min(-180).max(180),
});

export type CheckServiceabilityRequest = z.infer<typeof CheckServiceabilityRequestSchema>;

/** Serviceability check result with optional nearest-store fallback. */
export const ServiceabilityResultSchema = z.object({
  /** Whether any store can deliver to the given coordinates. */
  serviceable: z.boolean(),
  /** The store that would fulfil the order (present when serviceable = true). */
  store: StorePublicSchema.optional(),
  /** Distance in miles from the serviceable store. */
  distance: z.number().optional(),
  /** Human-readable status message. */
  message: z.string().max(500).optional(),
  /** Nearest store when not serviceable (for "expand soon" messaging). */
  nearestStore: z.object({
    name: z.string().max(100),
    /** Distance in miles. */
    distance: z.number().nonnegative(),
  }).optional(),
}).readonly();

export type ServiceabilityResult = z.infer<typeof ServiceabilityResultSchema>;

// ============================================================================
// STORE INVENTORY ADJUSTMENT
// ============================================================================

/** Single inventory adjustment request for a specific store. */
export const StoreInventoryAdjustRequestSchema = z.object({
  storeId: z.string({ required_error: "Store ID is required" }).uuid(),
  productId: z.string({ required_error: "Product ID is required" }).uuid(),
  /** Positive to add stock, negative to subtract. */
  adjustment: z.number().int(),
  type: InventoryAdjustmentTypeEnum,
  /** Human-readable reason for the adjustment. */
  reason: z.string().max(500).optional(),
  /** Related entity type (e.g., "order", "return"). */
  referenceType: z.string().max(50).optional(),
  /** Related entity ID. */
  referenceId: z.string().max(255).optional(),
});

export type StoreInventoryAdjustRequest = z.infer<typeof StoreInventoryAdjustRequestSchema>;

/** Batch inventory adjustment for a single store (up to 100 items). */
export const StoreBulkInventoryAdjustRequestSchema = z.object({
  storeId: z.string({ required_error: "Store ID is required" }).uuid(),
  adjustments: z.array(z.object({
    productId: z.string().uuid(),
    adjustment: z.number().int(),
    type: InventoryAdjustmentTypeEnum,
    reason: z.string().max(500).optional(),
  })).min(1, "At least one adjustment is required").max(100),
});

export type StoreBulkInventoryAdjustRequest = z.infer<typeof StoreBulkInventoryAdjustRequestSchema>;
