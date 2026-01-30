import { z } from "zod";
import { PaginationResponseSchema } from "./common";

// ============================================================================
// ENUMS
// ============================================================================

export const CustomerStatusEnum = z.enum(["active", "inactive", "deleted"]);
export const LoyaltyTierEnum = z.enum(["standard", "silver", "gold", "platinum"]);
export const SubstitutionPreferenceEnum = z.enum([
  "allow_similar",
  "allow_any",
  "contact_me",
  "no_substitution",
]);

// ============================================================================
// ADDRESS SCHEMAS
// ============================================================================

export const AddressSchema = z.object({
  id: z.string().uuid(),
  customerId: z.string().uuid(),
  label: z.string(),
  recipientName: z.string().nullable(),
  recipientPhone: z.string().nullable(),
  addressLine1: z.string(),
  addressLine2: z.string().nullable(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  deliveryInstructions: z.string().nullable(),
  isDefault: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateAddressSchema = z.object({
  label: z.string().min(1).max(100),
  recipientName: z.string().min(1).max(255).optional(),
  recipientPhone: z.string().optional(),
  addressLine1: z.string().min(1).max(255),
  addressLine2: z.string().max(255).optional(),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  postalCode: z.string().min(1).max(20),
  country: z.string().min(1).max(100).default("USA"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  deliveryInstructions: z.string().max(500).optional(),
  isDefault: z.boolean().default(false),
});

export const UpdateAddressSchema = CreateAddressSchema.partial();

// ============================================================================
// CUSTOMER SCHEMAS
// ============================================================================

export const CustomerSchema = z.object({
  id: z.string().uuid(),
  authProviderId: z.string(),
  authProvider: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  phone: z.string().nullable(),
  phoneVerified: z.boolean(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  displayName: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  dateOfBirth: z.string().nullable(),
  stripeCustomerId: z.string().nullable(),
  dietaryPreferences: z.array(z.string()),
  defaultSubstitutionPreference: SubstitutionPreferenceEnum,
  notificationEmail: z.boolean(),
  notificationSms: z.boolean(),
  notificationPush: z.boolean(),
  marketingOptIn: z.boolean(),
  marketingOptInAt: z.string().datetime().nullable(),
  smsOptIn: z.boolean(),
  smsOptInAt: z.string().datetime().nullable(),
  smsOptInSource: z.string().nullable(),
  doNotSell: z.boolean(),
  doNotSellAt: z.string().datetime().nullable(),
  status: CustomerStatusEnum,
  deletionRequestedAt: z.string().datetime().nullable(),
  scheduledDeletionAt: z.string().datetime().nullable(),
  deletedAt: z.string().datetime().nullable(),
  storeCreditBalance: z.union([z.number(), z.string()]), // Decimal comes as string
  loyaltyPoints: z.number(),
  loyaltyTier: LoyaltyTierEnum,
  referralCode: z.string(),
  referredByCustomerId: z.string().uuid().nullable(),
  lastLoginAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Lightweight customer for lists
export const CustomerSummarySchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  displayName: z.string().nullable(),
  phone: z.string().nullable(),
  status: CustomerStatusEnum,
  loyaltyTier: LoyaltyTierEnum,
  loyaltyPoints: z.number(),
  storeCreditBalance: z.union([z.number(), z.string()]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Customer with relations (for /me endpoint)
export const CustomerWithRelationsSchema = CustomerSchema.extend({
  addresses: z.array(AddressSchema).optional(),
  paymentMethods: z.array(z.object({
    id: z.string().uuid(),
    type: z.string(),
    lastFour: z.string().nullable(),
    expiryMonth: z.number().nullable(),
    expiryYear: z.number().nullable(),
    isDefault: z.boolean(),
  })).optional(),
});

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

export const UpdateCustomerSchema = z.object({
  displayName: z.string().min(1).max(255).optional(),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  phone: z.string().optional(),
  dateOfBirth: z.string().date().optional(),
  dietaryPreferences: z.array(z.string()).optional(),
  defaultSubstitutionPreference: SubstitutionPreferenceEnum.optional(),
  notificationEmail: z.boolean().optional(),
  notificationSms: z.boolean().optional(),
  notificationPush: z.boolean().optional(),
  marketingOptIn: z.boolean().optional(),
  smsOptIn: z.boolean().optional(),
});

export const UpdateConsentSchema = z.object({
  marketingOptIn: z.boolean().optional(),
  smsOptIn: z.boolean().optional(),
  doNotSell: z.boolean().optional(),
});

// ============================================================================
// RESPONSE SCHEMAS
// ============================================================================

export const CustomerResponseSchema = z.object({
  customer: CustomerWithRelationsSchema,
});

export const CustomerListResponseSchema = z.object({
  customers: z.array(CustomerSummarySchema),
  pagination: PaginationResponseSchema.optional(),
});

export const AddressResponseSchema = z.object({
  address: AddressSchema,
});

export const AddressListResponseSchema = z.object({
  addresses: z.array(AddressSchema),
});

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
