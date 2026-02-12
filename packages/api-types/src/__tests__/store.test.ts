import { describe, it, expect } from "vitest";
import {
  StoreSchema,
  StorePublicSchema,
  CreateStoreSchema,
  OperatingHoursSchema,
  CheckServiceabilityRequestSchema,
  ServiceabilityResultSchema,
} from "../schemas/store";

const validStore = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  code: "HOU-01",
  name: "Houston Central",
  slug: "houston-central",
  phone: "+18001234567",
  email: "store@groxigo.com",
  addressLine1: "100 Main St",
  addressLine2: null,
  city: "Houston",
  state: "TX",
  postalCode: "77001",
  country: "US",
  latitude: 29.7604,
  longitude: -95.3698,
  timezone: "America/Chicago",
  operatingHours: {
    mon: { open: "08:00", close: "22:00" },
    tue: { open: "08:00", close: "22:00" },
    wed: { open: "08:00", close: "22:00" },
    thu: { open: "08:00", close: "22:00" },
    fri: { open: "08:00", close: "23:00" },
    sat: { open: "09:00", close: "23:00" },
    sun: { open: "10:00", close: "20:00" },
  },
  deliveryRadiusMiles: 15,
  minimumOrderAmount: 25,
  deliveryFee: 4.99,
  freeDeliveryMinimum: 50,
  isActive: true,
  isAcceptingOrders: true,
  launchedAt: "2026-01-01T00:00:00Z",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-15T10:30:00Z",
};

describe("StoreSchema", () => {
  it("accepts valid store", () => {
    expect(StoreSchema.parse(validStore).name).toBe("Houston Central");
  });

  it("accepts international state names (up to 100 chars)", () => {
    const result = StoreSchema.parse({ ...validStore, state: "Maharashtra" });
    expect(result.state).toBe("Maharashtra");
  });

  it("rejects state > 100 chars", () => {
    expect(() => StoreSchema.parse({ ...validStore, state: "a".repeat(101) })).toThrow();
  });

  it("validates latitude range", () => {
    expect(() => StoreSchema.parse({ ...validStore, latitude: 91 })).toThrow();
    expect(() => StoreSchema.parse({ ...validStore, latitude: -91 })).toThrow();
  });

  it("validates longitude range", () => {
    expect(() => StoreSchema.parse({ ...validStore, longitude: 181 })).toThrow();
    expect(() => StoreSchema.parse({ ...validStore, longitude: -181 })).toThrow();
  });

  it("requires positive deliveryRadiusMiles", () => {
    expect(() => StoreSchema.parse({ ...validStore, deliveryRadiusMiles: 0 })).toThrow();
    expect(() => StoreSchema.parse({ ...validStore, deliveryRadiusMiles: -5 })).toThrow();
  });
});

describe("OperatingHoursSchema", () => {
  it("accepts null for closed days", () => {
    const result = OperatingHoursSchema.parse({ mon: null, sun: null });
    expect(result.mon).toBeNull();
  });

  it("validates time format", () => {
    expect(() =>
      OperatingHoursSchema.parse({ mon: { open: "8am", close: "10pm" } }),
    ).toThrow();
  });
});

describe("StorePublicSchema", () => {
  it("picks only public fields", () => {
    const pub = StorePublicSchema.parse(validStore);
    expect(pub.name).toBe("Houston Central");
    expect((pub as Record<string, unknown>).email).toBeUndefined();
    expect((pub as Record<string, unknown>).phone).toBeUndefined();
  });
});

describe("CreateStoreSchema", () => {
  it("omits id and timestamps", () => {
    const { id, createdAt, updatedAt, ...createData } = validStore;
    expect(CreateStoreSchema.parse(createData).name).toBe("Houston Central");
  });
});

describe("CheckServiceabilityRequestSchema", () => {
  it("accepts valid coordinates", () => {
    const data = { latitude: 29.7604, longitude: -95.3698 };
    expect(CheckServiceabilityRequestSchema.parse(data)).toEqual(data);
  });

  it("rejects out-of-range latitude", () => {
    expect(() =>
      CheckServiceabilityRequestSchema.parse({ latitude: 100, longitude: 0 }),
    ).toThrow();
  });
});

describe("ServiceabilityResultSchema", () => {
  it("accepts serviceable result", () => {
    const data = { serviceable: true, distance: 3.5 };
    expect(ServiceabilityResultSchema.parse(data).serviceable).toBe(true);
  });

  it("accepts non-serviceable with nearest store", () => {
    const data = {
      serviceable: false,
      message: "Outside delivery area",
      nearestStore: { name: "Houston Central", distance: 25 },
    };
    expect(ServiceabilityResultSchema.parse(data).serviceable).toBe(false);
  });
});
