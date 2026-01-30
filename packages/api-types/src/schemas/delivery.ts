import { z } from "zod";

// ============================================================================
// DELIVERY SLOT SCHEMAS
// ============================================================================

export const DeliverySlotSchema = z.object({
  id: z.string().uuid(),
  date: z.string().date(),
  startTime: z.string(), // HH:mm format
  endTime: z.string(), // HH:mm format
  capacity: z.number(),
  bookedCount: z.number(),
  availableCount: z.number().optional(), // computed: capacity - bookedCount
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

export const DeliverySlotQuerySchema = z.object({
  date: z.string().date().optional(),
  days: z.coerce.number().min(1).max(30).default(7),
  onlyAvailable: z.coerce.boolean().default(true),
});

export const CreateDeliverySlotSchema = z.object({
  date: z.string().date(),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:mm format"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:mm format"),
  capacity: z.number().int().positive(),
  isActive: z.boolean().default(true),
});

export const UpdateDeliverySlotSchema = z.object({
  capacity: z.number().int().positive().optional(),
  isActive: z.boolean().optional(),
});

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

export const DeliverySlotResponseSchema = z.object({
  slot: DeliverySlotSchema,
});

export const DeliverySlotListResponseSchema = z.object({
  slots: z.array(DeliverySlotSchema),
});

// Grouped by date for UI
export const DeliverySlotsByDateSchema = z.object({
  date: z.string().date(),
  slots: z.array(DeliverySlotSchema),
});

export const DeliverySlotsByDateResponseSchema = z.object({
  dates: z.array(DeliverySlotsByDateSchema),
});

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
