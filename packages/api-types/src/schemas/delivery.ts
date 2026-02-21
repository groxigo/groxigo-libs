import { z } from "zod";

// ============================================================================
// DELIVERY SLOT SCHEMAS
// ============================================================================

/** Delivery time-slot entity. */
export const DeliverySlotSchema = z.object({
  id: z.string().uuid(),
  /** YYYY-MM-DD date for this slot. */
  date: z.string().date(),
  /** HH:mm format (e.g., "09:00") */
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Must be in HH:mm format"),
  /** HH:mm format (e.g., "11:00") */
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Must be in HH:mm format"),
  capacity: z.number().int().nonnegative(),
  bookedCount: z.number().int().nonnegative(),
  /** Computed: capacity - bookedCount. */
  availableCount: z.number().int().optional(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).readonly();

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

/** Query params for available delivery slots. */
export const DeliverySlotQuerySchema = z.object({
  /** YYYY-MM-DD start date filter. */
  date: z.string().date().optional(),
  days: z.coerce.number().int().min(1).max(30).default(7),
  onlyAvailable: z.coerce.boolean().default(true),
});

/** Payload for creating a delivery slot (admin). */
export const CreateDeliverySlotSchema = z.object({
  date: z.string().date("Invalid date format (expected YYYY-MM-DD)"),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:mm format"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:mm format"),
  capacity: z.number({ required_error: "Capacity is required" }).int().positive("Capacity must be at least 1"),
  isActive: z.boolean().default(true),
});

/** Partial delivery slot update (admin). */
export const UpdateDeliverySlotSchema = z.object({
  capacity: z.number().int().positive("Capacity must be at least 1").optional(),
  isActive: z.boolean().optional(),
});

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

/** Single delivery slot response. */
export const DeliverySlotResponseSchema = z.object({
  slot: DeliverySlotSchema,
}).readonly();

/** Flat delivery slot list. */
export const DeliverySlotListResponseSchema = z.object({
  slots: z.array(DeliverySlotSchema),
}).readonly();

/** Slots grouped by date (for calendar UI). */
export const DeliverySlotsByDateSchema = z.object({
  date: z.string().date(),
  slots: z.array(DeliverySlotSchema),
}).readonly();

/** Grouped delivery slots response. */
export const DeliverySlotsByDateResponseSchema = z.object({
  dates: z.array(DeliverySlotsByDateSchema),
}).readonly();

// ============================================================================
// INFERRED TYPES
// ============================================================================

export type DeliverySlot = z.infer<typeof DeliverySlotSchema>;
export type DeliverySlotQuery = z.infer<typeof DeliverySlotQuerySchema>;
export type CreateDeliverySlot = z.infer<typeof CreateDeliverySlotSchema>;
export type UpdateDeliverySlot = z.infer<typeof UpdateDeliverySlotSchema>;

export type DeliverySlotResponse = z.infer<typeof DeliverySlotResponseSchema>;
export type DeliverySlotListResponse = z.infer<typeof DeliverySlotListResponseSchema>;
export type DeliverySlotsByDate = z.infer<typeof DeliverySlotsByDateSchema>;
export type DeliverySlotsByDateResponse = z.infer<typeof DeliverySlotsByDateResponseSchema>;
