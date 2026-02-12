# @groxigo/api-types

Shared Zod schemas, TypeScript types, and API constants for the Groxigo grocery platform. Used by both the Hono.js API (`groxigo-api`) and frontend clients (`groxigo-web`, `groxigo-mobile`, `groxigo-admin`).

## Installation

```bash
npm install @groxigo/api-types
# or
bun add @groxigo/api-types
```

## Usage

### Schemas & Types

```typescript
import {
  ProductSchema,
  CreateProductSchema,
  OrderSchema,
  CustomerSchema,
  type Product,
  type CreateProduct,
  type Order,
} from "@groxigo/api-types";

// Validate API response
const product = ProductSchema.parse(apiResponse);

// Validate request body
const body = CreateProductSchema.parse(req.body);

// Type-only import
function renderOrder(order: Order) { /* ... */ }
```

### Deep Imports

Import specific domains to reduce bundle size:

```typescript
import { ProductSchema, type Product } from "@groxigo/api-types/schemas/product";
import { OrderStatusEnum } from "@groxigo/api-types/schemas/order";
import { TAX_RATE } from "@groxigo/api-types/constants/pricing";
```

### Constants

```typescript
import {
  TAX_RATE,               // 0.08 (server-side fallback)
  DEFAULT_DELIVERY_FEE,   // 4.99 (server-side fallback)
  FREE_DELIVERY_THRESHOLD,// 50 (server-side fallback)
  SUPPORTED_REGIONS,      // Region objects with currency, locale
  DEFAULT_H3_RESOLUTION,  // 7 (geospatial zone indexing)
} from "@groxigo/api-types";
```

> **Note:** Pricing constants are server-side fallbacks. Actual values are per-store in the database (`Store.deliveryFee`, `Store.freeDeliveryMinimum`).

### Endpoint Constants

```typescript
import { ENDPOINTS } from "@groxigo/api-types";

const url = `${baseUrl}${ENDPOINTS.products.list}`;
// → /api/v1/products
```

### Field Selector

```typescript
import { buildFieldsQuery } from "@groxigo/api-types";

const query = buildFieldsQuery({ id: true, name: true, price: true });
// → "id,name,price" (append to ?fields= query string)
```

### Pagination Helpers

```typescript
import {
  PaginationQuerySchema,
  paginationQuery,
  paginatedListResponse,
} from "@groxigo/api-types";

// Custom pagination defaults
const MyQuery = paginationQuery({ limit: 10, maxLimit: 50 });

// Create a paginated response schema
const BrandListSchema = paginatedListResponse("brands", BrandSchema);
```

### SDUI / Tab Pages

```typescript
import {
  TabSectionsResponseSchema,
  SectionSchema,
  SectionComponentSchema,
  HeroSectionItemSchema,
  StepSectionItemSchema,
  PillarSectionItemSchema,
  TrustStatSectionItemSchema,
  type Section,
  type TabSectionsResponse,
} from "@groxigo/api-types";
```

### Search

```typescript
import {
  SearchQuerySchema,
  SuggestionsQuerySchema,
  SORT_OPTIONS,
  type SearchQuery,
  type SortOption,
} from "@groxigo/api-types/schemas/search";
```

### Promotions & Coupons

```typescript
import {
  ValidateCouponSchema,
  ApplyPromotionSchema,
  CouponErrorCodes,
  CouponErrorMessages,
  PromotionSchema,
  type Promotion,
  type ValidateCouponInput,
} from "@groxigo/api-types/schemas/promotion";
```

### Payments

```typescript
import {
  PaymentMethodSchema,
  SavePaymentMethodSchema,
  RefundRequestSchema,
  SetupIntentSchema,
  PaymentIntentResultSchema,
  type PaymentMethod,
  type RefundReason,
} from "@groxigo/api-types/schemas/payment";
```

### Cart

```typescript
import {
  CartSchema,
  CartItemSchema,
  AddCartItemSchema,
  UpdateCartItemSchema,
  SyncCartSchema,
  MAX_QUANTITY_PER_ITEM,
  type Cart,
  type CartItem,
} from "@groxigo/api-types/schemas/cart";
```

### Checkout

```typescript
import {
  CheckoutSessionSchema,
  CreateCheckoutSessionSchema,
  UpdateCheckoutSessionSchema,
  PlaceOrderSchema,
  ApplyCheckoutPromoSchema,
  PlaceOrderResultSchema,
  SESSION_TTL_SECONDS,
  type CheckoutSession,
  type PlaceOrderResult,
} from "@groxigo/api-types/schemas/checkout";
```

### Reviews

```typescript
import {
  ReviewSchema,
  CreateReviewSchema,
  ListReviewsQuerySchema,
  RatingSummarySchema,
  VoteReviewSchema,
  ModerateReviewSchema,
  type Review,
  type RatingSummary,
} from "@groxigo/api-types/schemas/review";
```

### Re-exported Zod

No need to install `zod` separately:

```typescript
import { z } from "@groxigo/api-types";

const MySchema = z.object({ foo: z.string() });
```

## Schema Domains

| Module | Entities | Key Schemas |
|--------|----------|-------------|
| `product` | Products, queries, filters | `ProductSchema`, `CreateProductSchema`, `ProductQuerySchema` |
| `order` | Orders, items, statuses | `OrderSchema`, `OrderWithItemsSchema`, `CreateOrderSchema` |
| `customer` | Customers, addresses | `CustomerSchema`, `AddressSchema`, `CreateAddressSchema` |
| `category` | Categories (tree + flat) | `CategorySchema`, `CategoryWithChildrenSchema` |
| `brand` | Brands | `BrandSchema`, `CreateBrandSchema` |
| `store` | Multi-location stores | `StoreSchema`, `StoreProductSchema`, `StoreInventorySchema` |
| `inventory` | Stock levels, adjustments | `InventoryItemSchema`, `InventoryAdjustmentSchema` |
| `delivery` | Delivery time slots | `DeliverySlotSchema`, `CreateDeliverySlotSchema` |
| `admin` | Dashboard KPIs, reports | `DashboardStatsSchema`, `RevenueReportSchema` |
| `tab-page` | SDUI sections & tabs | `SectionSchema`, `TabPageSchema`, `TabSectionsResponseSchema` |
| `search` | Product search, suggestions | `SearchQuerySchema`, `SuggestionsQuerySchema`, `SORT_OPTIONS` |
| `promotion` | Coupons, promotions | `PromotionSchema`, `ValidateCouponSchema`, `CouponErrorCodes` |
| `payment` | Stripe payments, refunds | `PaymentMethodSchema`, `RefundRequestSchema`, `SetupIntentSchema` |
| `cart` | Shopping cart CRUD | `CartSchema`, `AddCartItemSchema`, `SyncCartSchema` |
| `checkout` | Checkout sessions, place order | `CheckoutSessionSchema`, `PlaceOrderSchema`, `PlaceOrderResultSchema` |
| `review` | Product reviews, moderation | `ReviewSchema`, `CreateReviewSchema`, `RatingSummarySchema` |
| `common` | Pagination, errors, health | `PaginationQuerySchema`, `ApiErrorSchema` |

## Development

```bash
bun run build          # Build with tsup
bun run test           # Run 375 tests
bun run typecheck      # TypeScript check
```

## License

MIT
