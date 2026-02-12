# @groxigo/api-types

## 1.6.1

### Patch Changes

- Add .max() bounds to all unbounded arrays (CreateOrder.items, dietaryTags, dietaryPreferences, SDUI section items, story slides, recipe tags). Replace z.record(z.unknown()) on shippingAddress with bounded Record<string,string>. Fix field-selector field names to match actual schemas. Fix README buildFieldsQuery example.

## 1.6.0

### Minor Changes

- Production hardening: add cart, checkout, review schemas; fix bare z.string()/z.number() constraints with .max()/.nonnegative() bounds; add lat/lng range validation; fix README inaccuracies (endpoint casing, field selector API); 375 tests across 20 files

## 1.5.0

### Minor Changes

- Add search, promotion, and payment schemas; fix tab-page deep import; add inventory and admin test suites (302 total tests).

  New schema modules:

  - `search`: SearchQuerySchema, SuggestionsQuerySchema, SORT_OPTIONS, SearchSuggestionSchema
  - `promotion`: PromotionSchema, ValidateCouponSchema, ApplyPromotionSchema, CreatePromotionSchema, CouponErrorCodes
  - `payment`: PaymentMethodSchema, SavePaymentMethodSchema, RefundRequestSchema, SetupIntentSchema, PaymentIntentResultSchema

  Fixes:

  - Add `schemas/tab-page` entry to tsup.config.ts (enables deep imports)
  - Add test files for inventory.ts (25 tests) and admin.ts (18 tests)

## 1.4.0

### Minor Changes

- Add missing SDUI landing page schemas: HeroSectionItem, StepSectionItem, PillarSectionItem, TrustStatSectionItem; add hero/steps/pillars/trust_bar section types, HeroSection/StepSection/PillarSection/TrustBarSection components, full_width/inline display types.

## 1.3.0

### Minor Changes

- Enterprise hardening: JSDoc on all schemas, .readonly() on response/entity schemas, .max() length constraints on all string fields, custom Zod error messages on create/update schemas, README.md with usage docs.

## 1.2.0

### Minor Changes

- Enterprise production hardening for @groxigo/api-types

  - Freeze constants with `as const`, add JSDoc marking pricing as server-side fallbacks
  - Deprecate loose `ErrorSchema` in favor of `ApiErrorSchema`
  - Add generic `paginatedListResponse()` factory, `TimestampFieldsSchema`, datetime helpers
  - Add ETA tracking fields to OrderSchema/OrderSummarySchema (etaMinutes, etaSource, trackingToken)
  - Add optional pagination to Brand/Category/Address list response schemas
  - Tighten product validations: nonnegative price, integer stockQuantity, non-empty dietaryTags
  - Tighten order item validations: positive integer quantity, nonnegative prices
  - Widen store state field from max(2) to max(100) for international support
  - Remove unnecessary eslint-disable comment from field-selector
  - Add comprehensive test suite: 171 tests across 12 files

## 1.1.0

### Minor Changes

- Add constants module (pricing, geo, audiences) and paginationQuery() factory to common schemas

## 1.0.0

### Major Changes

- Initial release of Groxigo API Types
- Zod schemas for products, orders, customers, categories, etc.
- TypeScript type inference from schemas
