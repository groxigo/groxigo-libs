import { describe, it, expect } from "vitest";
import {
  CustomerSchema,
  CustomerSummarySchema,
  AddressSchema,
  CreateAddressSchema,
  UpdateCustomerSchema,
  UpdateConsentSchema,
  CustomerListResponseSchema,
  AddressListResponseSchema,
} from "../schemas/customer";

const validAddress = {
  id: "550e8400-e29b-41d4-a716-446655440020",
  customerId: "550e8400-e29b-41d4-a716-446655440000",
  label: "Home",
  recipientName: "John Doe",
  recipientPhone: null,
  addressLine1: "123 Main St",
  addressLine2: null,
  city: "Houston",
  state: "TX",
  postalCode: "77001",
  country: "USA",
  latitude: 29.7604,
  longitude: -95.3698,
  deliveryInstructions: null,
  isDefault: true,
  createdAt: "2026-01-15T10:30:00Z",
  updatedAt: "2026-01-15T10:30:00Z",
};

const validCustomer = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  authProviderId: "firebase-uid-123",
  authProvider: "firebase",
  email: "john@example.com",
  emailVerified: true,
  phone: "+1234567890",
  phoneVerified: false,
  firstName: "John",
  lastName: "Doe",
  displayName: "John Doe",
  avatarUrl: null,
  dateOfBirth: null,
  stripeCustomerId: "cus_test123",
  dietaryPreferences: ["vegetarian"],
  defaultSubstitutionPreference: "allow_similar" as const,
  notificationEmail: true,
  notificationSms: false,
  notificationPush: true,
  marketingOptIn: true,
  marketingOptInAt: "2026-01-15T10:30:00Z",
  smsOptIn: false,
  smsOptInAt: null,
  smsOptInSource: null,
  doNotSell: false,
  doNotSellAt: null,
  status: "active" as const,
  deletionRequestedAt: null,
  scheduledDeletionAt: null,
  deletedAt: null,
  storeCreditBalance: 25.50,
  loyaltyPoints: 1200,
  loyaltyTier: "gold" as const,
  referralCode: "JOHND123",
  referredByCustomerId: null,
  lastLoginAt: "2026-01-15T10:30:00Z",
  createdAt: "2026-01-15T10:30:00Z",
  updatedAt: "2026-01-15T10:30:00Z",
};

describe("AddressSchema", () => {
  it("accepts valid address", () => {
    expect(AddressSchema.parse(validAddress).id).toBe(validAddress.id);
  });
});

describe("CreateAddressSchema", () => {
  it("accepts valid create data with defaults", () => {
    const result = CreateAddressSchema.parse({
      label: "Work",
      addressLine1: "456 Office Blvd",
      city: "Houston",
      state: "TX",
      postalCode: "77002",
    });
    expect(result.country).toBe("USA");
    expect(result.isDefault).toBe(false);
  });

  it("rejects delivery instructions > 500 chars", () => {
    expect(() =>
      CreateAddressSchema.parse({
        label: "Home",
        addressLine1: "123 Main",
        city: "Houston",
        state: "TX",
        postalCode: "77001",
        deliveryInstructions: "a".repeat(501),
      }),
    ).toThrow();
  });
});

describe("CustomerSchema", () => {
  it("accepts valid customer", () => {
    expect(CustomerSchema.parse(validCustomer).email).toBe("john@example.com");
  });

  it("accepts storeCreditBalance as string (decimal from DB)", () => {
    const result = CustomerSchema.parse({ ...validCustomer, storeCreditBalance: "25.50" });
    expect(result.storeCreditBalance).toBe("25.50");
  });

  it("accepts storeCreditBalance as number", () => {
    const result = CustomerSchema.parse({ ...validCustomer, storeCreditBalance: 25.50 });
    expect(result.storeCreditBalance).toBe(25.50);
  });

  it("rejects invalid email", () => {
    expect(() => CustomerSchema.parse({ ...validCustomer, email: "not-email" })).toThrow();
  });

  it("validates substitution preference enum", () => {
    expect(() =>
      CustomerSchema.parse({ ...validCustomer, defaultSubstitutionPreference: "invalid" }),
    ).toThrow();
  });
});

describe("CustomerSummarySchema", () => {
  it("accepts lightweight customer data", () => {
    const summary = {
      id: validCustomer.id,
      email: validCustomer.email,
      firstName: "John",
      lastName: "Doe",
      displayName: "John Doe",
      phone: "+1234567890",
      status: "active" as const,
      loyaltyTier: "gold" as const,
      loyaltyPoints: 1200,
      storeCreditBalance: 25.50,
      createdAt: validCustomer.createdAt,
      updatedAt: validCustomer.updatedAt,
    };
    expect(CustomerSummarySchema.parse(summary).id).toBe(validCustomer.id);
  });
});

describe("UpdateCustomerSchema", () => {
  it("accepts partial updates", () => {
    const result = UpdateCustomerSchema.parse({ displayName: "Jane" });
    expect(result).toEqual({ displayName: "Jane" });
  });

  it("validates dateOfBirth format (YYYY-MM-DD)", () => {
    expect(UpdateCustomerSchema.parse({ dateOfBirth: "1990-05-15" }).dateOfBirth).toBe("1990-05-15");
    expect(() => UpdateCustomerSchema.parse({ dateOfBirth: "1990-13-32" })).toThrow();
  });
});

describe("UpdateConsentSchema", () => {
  it("accepts consent flags", () => {
    const result = UpdateConsentSchema.parse({ marketingOptIn: false, doNotSell: true });
    expect(result.doNotSell).toBe(true);
  });
});

describe("AddressListResponseSchema", () => {
  it("accepts list with optional pagination", () => {
    const data = {
      addresses: [validAddress],
      pagination: { page: 1, limit: 10, hasMore: false },
    };
    expect(AddressListResponseSchema.parse(data).addresses).toHaveLength(1);
  });

  it("accepts list without pagination", () => {
    expect(AddressListResponseSchema.parse({ addresses: [] }).addresses).toHaveLength(0);
  });
});

describe("CustomerListResponseSchema", () => {
  it("accepts list with optional pagination", () => {
    const data = {
      customers: [],
      pagination: { page: 1, limit: 10, hasMore: false },
    };
    expect(CustomerListResponseSchema.parse(data).customers).toHaveLength(0);
  });
});
