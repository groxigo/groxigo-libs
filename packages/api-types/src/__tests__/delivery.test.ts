import { describe, it, expect } from "vitest";
import {
  DeliverySlotSchema,
  DeliverySlotQuerySchema,
  CreateDeliverySlotSchema,
  DeliverySlotsByDateResponseSchema,
} from "../schemas/delivery";

const validSlot = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  date: "2026-01-16",
  startTime: "09:00",
  endTime: "11:00",
  capacity: 20,
  bookedCount: 5,
  isActive: true,
  createdAt: "2026-01-15T10:30:00Z",
  updatedAt: "2026-01-15T10:30:00Z",
};

describe("DeliverySlotSchema", () => {
  it("accepts valid slot", () => {
    expect(DeliverySlotSchema.parse(validSlot).id).toBe(validSlot.id);
  });

  it("accepts optional availableCount", () => {
    const result = DeliverySlotSchema.parse({ ...validSlot, availableCount: 15 });
    expect(result.availableCount).toBe(15);
  });

  it("validates date format (YYYY-MM-DD)", () => {
    expect(() => DeliverySlotSchema.parse({ ...validSlot, date: "Jan 16 2026" })).toThrow();
  });
});

describe("DeliverySlotQuerySchema", () => {
  it("applies defaults", () => {
    const result = DeliverySlotQuerySchema.parse({});
    expect(result.days).toBe(7);
    expect(result.onlyAvailable).toBe(true);
  });

  it("rejects days > 30", () => {
    expect(() => DeliverySlotQuerySchema.parse({ days: 31 })).toThrow();
  });
});

describe("CreateDeliverySlotSchema", () => {
  it("validates time format HH:mm", () => {
    const data = {
      date: "2026-01-16",
      startTime: "09:00",
      endTime: "11:00",
      capacity: 20,
    };
    expect(CreateDeliverySlotSchema.parse(data).startTime).toBe("09:00");
  });

  it("rejects invalid time format", () => {
    expect(() =>
      CreateDeliverySlotSchema.parse({
        date: "2026-01-16",
        startTime: "9am",
        endTime: "11am",
        capacity: 20,
      }),
    ).toThrow();
  });

  it("requires positive capacity", () => {
    expect(() =>
      CreateDeliverySlotSchema.parse({
        date: "2026-01-16",
        startTime: "09:00",
        endTime: "11:00",
        capacity: 0,
      }),
    ).toThrow();
  });
});

describe("DeliverySlotsByDateResponseSchema", () => {
  it("accepts grouped response", () => {
    const data = {
      dates: [
        { date: "2026-01-16", slots: [validSlot] },
        { date: "2026-01-17", slots: [] },
      ],
    };
    expect(DeliverySlotsByDateResponseSchema.parse(data).dates).toHaveLength(2);
  });
});
