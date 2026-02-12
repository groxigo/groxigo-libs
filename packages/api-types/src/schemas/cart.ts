import { z } from "zod";

// ============================================================================
// CART SCHEMAS
// Cart item management and sync
// ============================================================================

// ============================================================================
// CONSTANTS
// ============================================================================

/** Maximum quantity per cart line-item. */
export const MAX_QUANTITY_PER_ITEM = 99 as const;

// ============================================================================
// ENTITY SCHEMAS
// ============================================================================

/** Single cart line-item as returned by the API. */
export const CartItemSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  /** Product display name. */
  name: z.string().max(255),
  /** URL-safe slug. */
  slug: z.string().max(255),
  /** Current selling price (USD). */
  price: z.number().nonnegative(),
  /** Original price before discount (null = no discount). */
  compareAtPrice: z.number().nonnegative().nullable().optional(),
  /** Product image URL. */
  imageUrl: z.string().max(2000).nullable(),
  /** Unit of measurement (e.g., "oz", "lb"). */
  unit: z.string().max(20),
  /** Display size (e.g., "12 Oz"). */
  unitSize: z.string().max(50).nullable(),
  /** Quantity in cart. */
  quantity: z.number().int().min(0).max(99),
  /** Whether product is currently in stock. */
  inStock: z.boolean().optional(),
  /** Optional customer notes for this item. */
  notes: z.string().max(500).nullable().optional(),
}).readonly();

/** Cart summary with totals. */
export const CartSchema = z.object({
  id: z.string().uuid(),
  customerId: z.string().uuid().nullable(),
  /** Cart line-items. */
  items: z.array(CartItemSchema),
  /** Number of distinct products. */
  itemCount: z.number().int().nonnegative(),
  /** Sum of (price × quantity) for all items (USD). */
  subtotal: z.number().nonnegative(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).readonly();

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

/** Add an item to the cart. */
export const AddCartItemSchema = z.object({
  /** Product UUID. */
  productId: z.string({ required_error: "Product ID is required" }).uuid(),
  /** Quantity to add (1–99). */
  quantity: z.number().int().min(1, "Quantity must be at least 1").max(99).default(1),
  /** Optional notes for this item. */
  notes: z.string().max(500).optional(),
});

/** Update an existing cart item's quantity. */
export const UpdateCartItemSchema = z.object({
  /** New quantity (0 = remove item). */
  quantity: z.number().int().min(0, "Quantity cannot be negative").max(99),
  /** Optional notes for this item. */
  notes: z.string().max(500).optional(),
});

/** Sync local cart to server (batch upsert). */
export const SyncCartSchema = z.object({
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().min(1).max(99),
  })).min(1, "Cart must contain at least one item").max(100),
});

/** Merge guest cart into authenticated user's cart. */
export const MergeCartSchema = z.object({
  /** Device ID identifying the guest cart. */
  deviceId: z.string().min(1, "Device ID is required").max(255),
});

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

/** Full cart response. */
export const CartResponseSchema = z.object({
  cart: CartSchema,
}).readonly();

// ============================================================================
// INFERRED TYPES
// ============================================================================

export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;
export type AddCartItemInput = z.infer<typeof AddCartItemSchema>;
export type UpdateCartItemInput = z.infer<typeof UpdateCartItemSchema>;
export type SyncCartInput = z.infer<typeof SyncCartSchema>;
export type MergeCartInput = z.infer<typeof MergeCartSchema>;
export type CartResponse = z.infer<typeof CartResponseSchema>;
