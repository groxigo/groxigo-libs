import { z } from "zod";
import { PaginationResponseSchema } from "./common";

// ============================================================================
// ENUMS
// ============================================================================

/** Customer account status. */
export const CustomerStatusEnum = z.enum(["active", "inactive", "deleted"]);

/** Loyalty program tier. */
export const LoyaltyTierEnum = z.enum(["standard", "silver", "gold", "platinum"]);

/** How the customer wants out-of-stock items handled. */
export const SubstitutionPreferenceEnum = z.enum([
  "allow_similar",
  "allow_any",
  "contact_me",
  "no_substitution",
]);

// ============================================================================
// ADDRESS SCHEMAS
// ============================================================================

/** Customer delivery address entity. */
export const AddressSchema = z.object({
  id: z.string().uuid(),
  customerId: z.string().uuid(),
  label: z.string().max(100),
  recipientName: z.string().max(255).nullable(),
  recipientPhone: z.string().max(20).nullable(),
  addressLine1: z.string().max(255),
  addressLine2: z.string().max(255).nullable(),
  city: z.string().max(100),
  state: z.string().max(100),
  postalCode: z.string().max(20),
  country: z.string().max(100),
  latitude: z.number().min(-90).max(90).nullable(),
  longitude: z.number().min(-180).max(180).nullable(),
  deliveryInstructions: z.string().max(500).nullable(),
  isDefault: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).readonly();

/** Payload for creating a delivery address. */
export const CreateAddressSchema = z.object({
  label: z.string({ required_error: "Address label is required" }).min(1, "Label cannot be empty").max(100),
  recipientName: z.string().min(1).max(255).optional(),
  recipientPhone: z.string().max(20).optional(),
  addressLine1: z.string({ required_error: "Address line 1 is required" }).min(1, "Address cannot be empty").max(255),
  addressLine2: z.string().max(255).optional(),
  city: z.string({ required_error: "City is required" }).min(1, "City cannot be empty").max(100),
  state: z.string({ required_error: "State is required" }).min(1, "State cannot be empty").max(100),
  postalCode: z.string({ required_error: "Postal code is required" }).min(1, "Postal code cannot be empty").max(20),
  country: z.string().min(1).max(100).default("USA"),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  deliveryInstructions: z.string().max(500, "Delivery instructions too long (max 500 chars)").optional(),
  isDefault: z.boolean().default(false),
});

/** Partial address update. */
export const UpdateAddressSchema = CreateAddressSchema.partial();

// ============================================================================
// CUSTOMER SCHEMAS
// ============================================================================

/** Full customer entity. */
export const CustomerSchema = z.object({
  id: z.string().uuid(),
  /** Firebase/auth provider user ID. */
  authProviderId: z.string().max(255),
  authProvider: z.string().max(50),
  email: z.string().email(),
  emailVerified: z.boolean(),
  phone: z.string().max(20).nullable(),
  phoneVerified: z.boolean(),
  firstName: z.string().max(100).nullable(),
  lastName: z.string().max(100).nullable(),
  displayName: z.string().max(255).nullable(),
  avatarUrl: z.string().max(2000).nullable(),
  dateOfBirth: z.string().max(20).nullable(),
  /** Stripe customer ID (cus_...). */
  stripeCustomerId: z.string().max(255).nullable(),
  dietaryPreferences: z.array(z.string().max(50)).max(50),
  defaultSubstitutionPreference: SubstitutionPreferenceEnum,
  notificationEmail: z.boolean(),
  notificationSms: z.boolean(),
  notificationPush: z.boolean(),
  marketingOptIn: z.boolean(),
  marketingOptInAt: z.string().datetime().nullable(),
  smsOptIn: z.boolean(),
  smsOptInAt: z.string().datetime().nullable(),
  smsOptInSource: z.string().max(50).nullable(),
  doNotSell: z.boolean(),
  doNotSellAt: z.string().datetime().nullable(),
  status: CustomerStatusEnum,
  deletionRequestedAt: z.string().datetime().nullable(),
  scheduledDeletionAt: z.string().datetime().nullable(),
  deletedAt: z.string().datetime().nullable(),
  /** Decimal from DB — may come as string or number. */
  storeCreditBalance: z.union([z.number().nonnegative(), z.string().max(20)]),
  loyaltyPoints: z.number().int().nonnegative(),
  loyaltyTier: LoyaltyTierEnum,
  referralCode: z.string().max(20),
  referredByCustomerId: z.string().uuid().nullable(),
  lastLoginAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/** Lightweight customer for admin list views. */
export const CustomerSummarySchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().max(100).nullable(),
  lastName: z.string().max(100).nullable(),
  displayName: z.string().max(255).nullable(),
  phone: z.string().max(20).nullable(),
  status: CustomerStatusEnum,
  loyaltyTier: LoyaltyTierEnum,
  loyaltyPoints: z.number().int().nonnegative(),
  /** Decimal from DB — may come as string or number. */
  storeCreditBalance: z.union([z.number().nonnegative(), z.string().max(20)]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).readonly();

/** Customer with nested addresses and payment methods (for /me). */
export const CustomerWithRelationsSchema = CustomerSchema.extend({
  addresses: z.array(AddressSchema).optional(),
  paymentMethods: z.array(z.object({
    id: z.string().uuid(),
    type: z.string().max(20),
    lastFour: z.string().max(4).nullable(),
    expiryMonth: z.number().int().nullable(),
    expiryYear: z.number().int().nullable(),
    isDefault: z.boolean(),
  })).optional(),
}).readonly();

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

/** Payload for updating customer profile. */
export const UpdateCustomerSchema = z.object({
  displayName: z.string().min(1, "Display name cannot be empty").max(255).optional(),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  /** YYYY-MM-DD date of birth. */
  dateOfBirth: z.string().date("Invalid date format (expected YYYY-MM-DD)").optional(),
  dietaryPreferences: z.array(z.string().max(50)).max(50).optional(),
  defaultSubstitutionPreference: SubstitutionPreferenceEnum.optional(),
  notificationEmail: z.boolean().optional(),
  notificationSms: z.boolean().optional(),
  notificationPush: z.boolean().optional(),
  marketingOptIn: z.boolean().optional(),
  smsOptIn: z.boolean().optional(),
});

/** Payload for updating privacy/marketing consent. */
export const UpdateConsentSchema = z.object({
  marketingOptIn: z.boolean().optional(),
  smsOptIn: z.boolean().optional(),
  doNotSell: z.boolean().optional(),
});

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

/** Single customer response (with relations). */
export const CustomerResponseSchema = z.object({
  customer: CustomerWithRelationsSchema,
}).readonly();

/** Paginated customer list (admin). */
export const CustomerListResponseSchema = z.object({
  customers: z.array(CustomerSummarySchema),
  pagination: PaginationResponseSchema.optional(),
}).readonly();

/** Single address response wrapper. */
export const AddressResponseSchema = z.object({
  address: AddressSchema,
}).readonly();

/** Address list with optional pagination. */
export const AddressListResponseSchema = z.object({
  addresses: z.array(AddressSchema),
  pagination: PaginationResponseSchema.optional(),
}).readonly();

// ============================================================================
// INFERRED TYPES
// ============================================================================

export type CustomerStatus = z.infer<typeof CustomerStatusEnum>;
export type LoyaltyTier = z.infer<typeof LoyaltyTierEnum>;
export type SubstitutionPreference = z.infer<typeof SubstitutionPreferenceEnum>;

export type Address = z.infer<typeof AddressSchema>;
export type CreateAddress = z.infer<typeof CreateAddressSchema>;
export type UpdateAddress = z.infer<typeof UpdateAddressSchema>;

export type Customer = z.infer<typeof CustomerSchema>;
export type CustomerSummary = z.infer<typeof CustomerSummarySchema>;
export type CustomerWithRelations = z.infer<typeof CustomerWithRelationsSchema>;
export type UpdateCustomer = z.infer<typeof UpdateCustomerSchema>;
export type UpdateConsent = z.infer<typeof UpdateConsentSchema>;

export type CustomerResponse = z.infer<typeof CustomerResponseSchema>;
export type CustomerListResponse = z.infer<typeof CustomerListResponseSchema>;
export type AddressResponse = z.infer<typeof AddressResponseSchema>;
export type AddressListResponse = z.infer<typeof AddressListResponseSchema>;
