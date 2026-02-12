/**
 * Pricing fallback defaults — used ONLY as server-side fallbacks when
 * store-level values are not configured. Real pricing is per-store in the DB
 * (see `StoreSchema.deliveryFee`, `StoreSchema.freeDeliveryMinimum`).
 *
 * WARNING: Never use these for client-side price calculation — pricing is
 * always server-authoritative.
 */

/** Server-side fallback tax rate (8%). Actual rate is per-jurisdiction. */
export const TAX_RATE = 0.08 as const;

/** Server-side fallback delivery fee (USD). Per-store override: `Store.deliveryFee`. */
export const DEFAULT_DELIVERY_FEE = 4.99 as const;

/** Server-side fallback free-delivery threshold (USD). Per-store override: `Store.freeDeliveryMinimum`. */
export const FREE_DELIVERY_THRESHOLD = 50 as const;
