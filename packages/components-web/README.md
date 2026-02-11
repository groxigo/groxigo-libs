# @groxigo/components-web

Composite UI components for the Groxigo web platform -- built on `@groxigo/ui-elements-web` with CSS Modules and design tokens.

## Installation

```bash
npm install @groxigo/components-web
# or
bun add @groxigo/components-web
```

### Peer Dependencies

```json
{
  "react": ">=19.0.0",
  "react-dom": ">=19.0.0"
}
```

## Quick Start

```tsx
import { ProductTile, Header, CartItem } from '@groxigo/components-web';

function App() {
  return (
    <>
      <Header logo="/logo.svg" onMenuToggle={() => {}} />
      <ProductTile
        id="p1"
        name="Basmati Rice"
        imageUrl="/images/rice.jpg"
        price={12.99}
        weight="5 Lb"
        onAddToCart={() => {}}
      />
      <CartItem
        id="c1"
        name="Basmati Rice"
        imageUrl="/images/rice.jpg"
        price={12.99}
        quantity={2}
        onQuantityChange={() => {}}
      />
    </>
  );
}
```

## Components

65 composite components organized by category:

### Layout

| Component | Description |
|-----------|-------------|
| `Header` | App header with logo, search, and navigation |
| `Footer` | Site footer with links and info |
| `StickyBottomBar` | Fixed bottom action bar |
| `FloatingCartButton` | Floating cart access button |

### Product

| Component | Description |
|-----------|-------------|
| `ProductTile` | Product card with image, price, rating, and add-to-cart |
| `ProductImageCarousel` | Swipeable product image gallery |
| `VariantSelector` | Size/weight/flavor variant picker |
| `PriceDisplay` | Formatted price with discount and strikethrough |
| `QuantityStepper` | Increment/decrement quantity control |
| `AccordionSection` | Collapsible content section for product details |

### Browse

| Component | Description |
|-----------|-------------|
| `CategoryCard` | Category display card with image and title |
| `CategoryChip` | Compact category filter chip |
| `CategorySidebar` | Vertical category navigation sidebar |
| `BannerCard` | Promotional banner with image and CTA |
| `BrandCard` | Brand logo card |
| `StoryAvatar` | Circular story-style avatar |

### Carousels

| Component | Description |
|-----------|-------------|
| `ProductCarousel` | Horizontal scrolling product list |
| `RecipeCarousel` | Horizontal scrolling recipe list |
| `CategoryCarousel` | Horizontal scrolling category list |

### Grids

| Component | Description |
|-----------|-------------|
| `ProductListGrid` | Responsive product grid layout |
| `RecipeListGrid` | Responsive recipe grid layout |
| `CategoryListGrid` | Responsive category grid layout |

### Recipe

| Component | Description |
|-----------|-------------|
| `RecipeCard` | Recipe preview with image, time, and difficulty |
| `RecipeTagChip` | Tag chip for recipe attributes |
| `CuisineCard` | Cuisine type card (Indian, Pakistani, etc.) |
| `MealTypeCard` | Meal type card (breakfast, lunch, dinner) |
| `RecipeHero` | Full-width recipe hero banner |
| `IngredientRow` | Single ingredient with quantity and unit |
| `InstructionStep` | Numbered cooking instruction step |

### Cart and Checkout

| Component | Description |
|-----------|-------------|
| `CartItem` | Cart line item with quantity controls |
| `BillDetails` | Order summary with subtotal, tax, and total |
| `TipSelector` | Driver tip amount selector |
| `CheckoutStepper` | Multi-step checkout progress indicator |
| `DeliverySlotPicker` | Date and time slot selector |
| `AddressCard` | Saved address display card |
| `PaymentMethodCard` | Saved payment method display card |
| `DeliveryTag` | Delivery speed tag (express, standard) |
| `DeliveryInfoCard` | Delivery details and tracking info |

### Search and Filter

| Component | Description |
|-----------|-------------|
| `SearchBar` | Search input with suggestions |
| `FilterBar` | Active filter chips with clear option |
| `SectionHeader` | Section title with optional "See all" link |
| `DietaryPreferenceChip` | Dietary filter chip (vegan, halal, etc.) |

### Account

| Component | Description |
|-----------|-------------|
| `ProfileHeader` | User profile header with avatar and name |
| `AccountMenuItem` | Account menu navigation item |
| `AccountCard` | Account info summary card |
| `OrderCard` | Order history item card |
| `AuthCard` | Login/signup authentication card |

### Notifications and Settings

| Component | Description |
|-----------|-------------|
| `NotificationsCard` | Notification preferences card |
| `PreferencesCard` | User preferences settings card |
| `ContactCard` | Contact/support info card |

### Reviews

| Component | Description |
|-----------|-------------|
| `ReviewCard` | Customer review with rating and text |
| `DriverCard` | Delivery driver info and rating card |

### Rewards

| Component | Description |
|-----------|-------------|
| `PointsCard` | Loyalty points balance card |
| `ReferralCard` | Referral program card with share link |
| `BadgeCard` | Achievement badge display card |
| `ChallengeCard` | Gamification challenge card |
| `OnboardingStep` | Onboarding wizard step |

### Info

| Component | Description |
|-----------|-------------|
| `NutritionTable` | Nutrition facts table |
| `PolicyCard` | Policy information card (returns, privacy, etc.) |

### Gamification

| Component | Description |
|-----------|-------------|
| `SpinWheel` | Spin-to-win reward wheel |

### Navigation

| Component | Description |
|-----------|-------------|
| `HorizontalNav` | Horizontal navigation bar |
| `NavSidebar` | Vertical navigation sidebar |
| `PaginationBar` | Page navigation with prev/next controls |

### Forms

| Component | Description |
|-----------|-------------|
| `AddressForm` | Address input form with validation |

### Modals

| Component | Description |
|-----------|-------------|
| `ProductListModal` | Modal overlay displaying a product list |

## Styling

Components use **CSS Modules** with design tokens from `@groxigo/tokens`. Key characteristics:

- **Design tokens** -- all colors, spacing, radii, and typography reference semantic tokens via CSS custom properties.
- **Fluid tokens** -- font sizes, spacing, and radii scale fluidly between 375px and 1440px viewports using `clamp()`.
- **Container queries** -- layout components (Header, Footer, ProductListModal) use `@container` queries for responsive adaptation.
- **No Tailwind dependency** -- all styling is self-contained in CSS Modules.

## Architecture

```
@groxigo/tokens          Design tokens (colors, spacing, typography, responsive)
@groxigo/contracts       TypeScript prop interfaces (*PropsBase)
        |
@groxigo/ui-elements-web   22 primitive components (Button, Card, Input, etc.)
        |
@groxigo/components-web    65 composite components (this package)
```

Every component follows the **contract-first** pattern: prop interfaces extend `*PropsBase` from `@groxigo/contracts`, ensuring API parity with the React Native counterpart (`@groxigo/components`).

All components use `forwardRef` for imperative access and include `testID` props for testing.

## Dependencies

| Package | Purpose |
|---------|---------|
| `@groxigo/tokens` | Design tokens and CSS custom properties |
| `@groxigo/contracts` | Shared TypeScript interfaces |
| `@groxigo/icons` | SVG icon components |
| `@groxigo/ui-elements-web` | Primitive UI building blocks |
| `clsx` | Conditional class name utility |
| `lottie-react` | Lottie animation rendering |

## License

MIT
