import { z } from "zod";

// ============================================================================
// ERROR CODES
// Shared error codes used by both backend (for throwing) and frontend (for handling)
// ============================================================================

export const ErrorCodes = {
  // Authentication (1xxx)
  UNAUTHORIZED: "AUTH_001",
  TOKEN_EXPIRED: "AUTH_002",
  INVALID_TOKEN: "AUTH_003",
  INSUFFICIENT_PERMISSIONS: "AUTH_004",

  // Validation (2xxx)
  VALIDATION_ERROR: "VAL_001",
  INVALID_INPUT: "VAL_002",
  MISSING_REQUIRED_FIELD: "VAL_003",
  INVALID_FORMAT: "VAL_004",

  // Resources (3xxx)
  NOT_FOUND: "RES_001",
  PRODUCT_NOT_FOUND: "RES_002",
  ORDER_NOT_FOUND: "RES_003",
  USER_NOT_FOUND: "RES_004",
  CART_NOT_FOUND: "RES_005",
  ADDRESS_NOT_FOUND: "RES_006",
  CATEGORY_NOT_FOUND: "RES_007",
  BRAND_NOT_FOUND: "RES_008",
  DELIVERY_SLOT_NOT_FOUND: "RES_009",

  // Business Logic (4xxx)
  OUT_OF_STOCK: "BIZ_001",
  INSUFFICIENT_QUANTITY: "BIZ_002",
  ORDER_ALREADY_CANCELLED: "BIZ_003",
  INVALID_ORDER_STATUS: "BIZ_004",
  COUPON_EXPIRED: "BIZ_005",
  COUPON_NOT_APPLICABLE: "BIZ_006",
  MINIMUM_ORDER_NOT_MET: "BIZ_007",
  DELIVERY_UNAVAILABLE: "BIZ_008",
  SLOT_FULLY_BOOKED: "BIZ_009",

  // Payment (5xxx)
  PAYMENT_FAILED: "PAY_001",
  CARD_DECLINED: "PAY_002",
  INVALID_PAYMENT_METHOD: "PAY_003",
  REFUND_FAILED: "PAY_004",

  // Rate Limiting (6xxx)
  RATE_LIMITED: "RATE_001",
  TOO_MANY_REQUESTS: "RATE_002",

  // Conflict (7xxx)
  CONFLICT: "CONF_001",
  DUPLICATE_ENTRY: "CONF_002",

  // Server (9xxx)
  INTERNAL_ERROR: "SRV_001",
  SERVICE_UNAVAILABLE: "SRV_002",
  DATABASE_ERROR: "SRV_003",
  EXTERNAL_SERVICE_ERROR: "SRV_004",
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

// ============================================================================
// API ERROR RESPONSE SCHEMA
// Standard error response format from the API
// ============================================================================

export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
    requestId: z.string(),
    timestamp: z.string().datetime(),
  }),
});

export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

// ============================================================================
// HELPER: Check if response is an error
// ============================================================================

export function isApiError(response: unknown): response is ApiErrorResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    response.success === false &&
    "error" in response
  );
}

// ============================================================================
// HELPER: Get user-friendly message for error code
// ============================================================================

export const ErrorMessages: Record<ErrorCode, string> = {
  // Auth
  [ErrorCodes.UNAUTHORIZED]: "Please sign in to continue",
  [ErrorCodes.TOKEN_EXPIRED]: "Your session has expired. Please sign in again",
  [ErrorCodes.INVALID_TOKEN]: "Invalid authentication. Please sign in again",
  [ErrorCodes.INSUFFICIENT_PERMISSIONS]: "You don't have permission to do this",

  // Validation
  [ErrorCodes.VALIDATION_ERROR]: "Please check your input and try again",
  [ErrorCodes.INVALID_INPUT]: "Invalid input provided",
  [ErrorCodes.MISSING_REQUIRED_FIELD]: "Please fill in all required fields",
  [ErrorCodes.INVALID_FORMAT]: "Invalid format",

  // Resources
  [ErrorCodes.NOT_FOUND]: "The requested item was not found",
  [ErrorCodes.PRODUCT_NOT_FOUND]: "This product is no longer available",
  [ErrorCodes.ORDER_NOT_FOUND]: "Order not found",
  [ErrorCodes.USER_NOT_FOUND]: "User not found",
  [ErrorCodes.CART_NOT_FOUND]: "Your cart is empty",
  [ErrorCodes.ADDRESS_NOT_FOUND]: "Address not found",
  [ErrorCodes.CATEGORY_NOT_FOUND]: "Category not found",
  [ErrorCodes.BRAND_NOT_FOUND]: "Brand not found",
  [ErrorCodes.DELIVERY_SLOT_NOT_FOUND]: "Delivery slot not found",

  // Business
  [ErrorCodes.OUT_OF_STOCK]: "This item is out of stock",
  [ErrorCodes.INSUFFICIENT_QUANTITY]: "Not enough items in stock",
  [ErrorCodes.ORDER_ALREADY_CANCELLED]: "This order has already been cancelled",
  [ErrorCodes.INVALID_ORDER_STATUS]: "Cannot perform this action on the order",
  [ErrorCodes.COUPON_EXPIRED]: "This coupon has expired",
  [ErrorCodes.COUPON_NOT_APPLICABLE]: "This coupon cannot be applied to your order",
  [ErrorCodes.MINIMUM_ORDER_NOT_MET]: "Your order doesn't meet the minimum amount",
  [ErrorCodes.DELIVERY_UNAVAILABLE]: "Delivery is not available for this address",
  [ErrorCodes.SLOT_FULLY_BOOKED]: "This delivery slot is fully booked",

  // Payment
  [ErrorCodes.PAYMENT_FAILED]: "Payment failed. Please try again",
  [ErrorCodes.CARD_DECLINED]: "Your card was declined",
  [ErrorCodes.INVALID_PAYMENT_METHOD]: "Invalid payment method",
  [ErrorCodes.REFUND_FAILED]: "Refund could not be processed",

  // Rate limiting
  [ErrorCodes.RATE_LIMITED]: "Too many requests. Please wait a moment",
  [ErrorCodes.TOO_MANY_REQUESTS]: "Too many requests. Please wait a moment",

  // Conflict
  [ErrorCodes.CONFLICT]: "This action conflicts with existing data",
  [ErrorCodes.DUPLICATE_ENTRY]: "This item already exists",

  // Server
  [ErrorCodes.INTERNAL_ERROR]: "Something went wrong. Please try again",
  [ErrorCodes.SERVICE_UNAVAILABLE]: "Service temporarily unavailable",
  [ErrorCodes.DATABASE_ERROR]: "Something went wrong. Please try again",
  [ErrorCodes.EXTERNAL_SERVICE_ERROR]: "A service is temporarily unavailable",
};

export function getErrorMessage(code: string): string {
  return ErrorMessages[code as ErrorCode] || "Something went wrong";
}
