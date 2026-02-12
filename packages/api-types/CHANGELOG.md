# @groxigo/api-types

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
