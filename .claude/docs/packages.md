# Package Details

Detailed documentation for each package in the groxigo-libs monorepo.

---

## @groxigo/tokens (v1.0.0)

**Purpose:** Production-grade design tokens with three-tier architecture.

### Token Categories

| Category | Description | Example |
|----------|-------------|---------|
| **colors** | 11 color families × 11 shades + semantic | `colors.primary`, `colors.blue[500]` |
| **spacing** | 8px grid system | `spacing[4]` = 16px |
| **typography** | Font families, sizes, weights, line heights | `typography.fontFamily.sans` |
| **shadows** | Elevation shadows | `shadows.sm`, `shadows.md`, `shadows.lg` |
| **radius** | Border radius values | `radius.md` = 8px |
| **animation** | Duration and easing | `animation.duration.normal` = 200ms |
| **breakpoints** | Responsive breakpoints | `breakpoints.md` = 768px |

### Build Outputs

The tokens build script (`ts-node src/build.ts`) generates:

```
dist/
├── css/
│   ├── tokens.css          # CSS custom properties
│   ├── tokens.min.css      # Minified CSS
│   └── tokens.module.css   # CSS Modules
├── scss/
│   └── _tokens.scss        # SCSS variables + mixins
├── js/
│   └── tokens.js           # CommonJS for React Native
├── json/
│   ├── tokens.json         # Figma Tokens Studio format
│   └── tokens.flat.json    # Flat key-value format
└── types/
    └── index.d.ts          # TypeScript declarations
```

### Usage

```typescript
// Direct import (TypeScript/bundler)
import { colors, spacing, typography } from '@groxigo/tokens';

// Platform-specific
import { webTokens } from '@groxigo/tokens/web';
import { rnTokens } from '@groxigo/tokens/react-native';

// CSS import
import '@groxigo/tokens/css';
```

### Theme Utilities

```typescript
import { createTheme, getThemeColors } from '@groxigo/tokens/theme';
import { checkContrast, getContrastRatio } from '@groxigo/tokens/utils';

// Create custom theme
const myTheme = createTheme({
  primary: '#custom-color',
});

// WCAG contrast validation
const ratio = getContrastRatio('#000000', '#ffffff'); // 21
const passes = checkContrast('#000000', '#ffffff', 'AA'); // true
```

---

## @groxigo/contracts (v1.0.0)

**Purpose:** Platform-agnostic TypeScript interfaces ensuring API consistency.

### Element Contracts (26 interfaces)

Located in `src/elements/`:

| Contract | Key Props |
|----------|-----------|
| `TextPropsBase` | variant, weight, color, align, numberOfLines |
| `ButtonPropsBase` | variant, size, colorScheme, isLoading, isDisabled, onPress |
| `CardPropsBase` | variant ('elevated', 'outline', 'filled', 'unstyled'), pressable |
| `InputPropsBase` | size, variant, isInvalid, isDisabled, leftIcon, rightIcon |
| `ModalPropsBase` | isOpen, onClose, size, trapFocus, closeOnOverlayClick |
| `DrawerPropsBase` | isOpen, placement ('left', 'right', 'top', 'bottom') |
| `TabsPropsBase` | value, onChange, variant, colorScheme |
| `SwitchPropsBase` | checked, onChange, size, colorScheme |
| `CheckboxPropsBase` | checked, onChange, indeterminate |
| `RadioPropsBase` | value, checked, onChange |
| `SelectPropsBase` | value, onChange, options, placeholder |
| `BadgePropsBase` | variant ('solid', 'outline', 'subtle', 'soft'), colorScheme |
| `AvatarPropsBase` | src, name, size, fallback |
| `ToastPropsBase` | status, title, description, duration, isClosable |
| `TooltipPropsBase` | content, placement, openDelay |
| `MenuPropsBase` | isOpen, onClose, trigger |
| `ProgressPropsBase` | value, max, size, colorScheme |
| `SpinnerPropsBase` | size, colorScheme |
| `SkeletonPropsBase` | isLoaded, children |
| `SliderPropsBase` | value, min, max, step, onChange |
| `ImagePropsBase` | src, alt, fallback, onLoad, onError |
| `DividerPropsBase` | orientation, variant |
| `SpacerPropsBase` | size |
| `IconPropsBase` | name, size, color |
| `LinkPropsBase` | href, isExternal |
| `BreadcrumbPropsBase` | separator, items |

### Component Contracts (14 interfaces)

Located in `src/components/`:

| Contract | Key Props |
|----------|-----------|
| `ProductCardPropsBase` | id, name, imageUrl, price, originalPrice, onAddToCart, onToggleFavorite |
| `RecipeCardPropsBase` | title, imageUrl, cookTime, servings, difficulty, badge |
| `CartItemPropsBase` | id, name, imageUrl, price, quantity, onQuantityChange, onRemove |
| `SearchBarPropsBase` | value, onChange, onSearch, placeholder, isLoading |
| `CategoryCardPropsBase` | name, imageUrl, productCount, onPress |
| `QuantitySelectorPropsBase` | value, onChange, min, max, step |
| `PriceDisplayPropsBase` | price, originalPrice, currency, size |
| `RatingPropsBase` | value, onChange, max, readonly, size |
| `FilterBarPropsBase` | filters, selected, onChange, multiSelect |
| `EmptyStatePropsBase` | icon, title, description, actionLabel, onAction |
| `ErrorStatePropsBase` | icon, title, message, onRetry, retryLabel |
| `FormFieldPropsBase` | extends InputPropsBase + label, error, helperText |
| `HeaderPropsBase` | title, leftAction, rightActions, sticky |
| `BottomNavPropsBase` | items, activeItem, onChange, variant |

### Animation Contracts

Located in `src/animation/`:

- `LottiePropsBase` - Lottie animation configuration
- `TransitionPropsBase` - Enter/exit transitions

---

## @groxigo/ui-core (v1.0.0)

**Purpose:** Shared React hooks and utilities used by both platforms.

### Hooks (14 total)

| Hook | Purpose | Example |
|------|---------|---------|
| `useControllable` | Controlled/uncontrolled state | Form inputs |
| `useDisclosure` | Open/close state with callbacks | Modals, drawers |
| `useDebounce` | Debounced value | Search input |
| `useDebouncedCallback` | Debounced function | API calls |
| `useThrottle` | Throttled value | Scroll handlers |
| `useThrottledCallback` | Throttled function | Resize handlers |
| `useMergeRefs` | Combine multiple refs | forwardRef + internal ref |
| `useCallbackRef` | Stable callback reference | Event handlers |
| `useId` | Generate unique IDs | Form labels, ARIA |
| `useSSRSafeId` | SSR-compatible ID | Server rendering |
| `usePrevious` | Previous value tracking | Animations |
| `useLatest` | Always-current ref | Callbacks in effects |
| `useForceUpdate` | Force re-render | External state |
| `useUpdateEffect` | Skip first render | Sync effects |
| `useUnmountEffect` | Cleanup on unmount | Subscriptions |
| `useIsMounted` | Mount state ref | Async safety |
| `useMediaQuery` | CSS media query match | Responsive |
| `useBreakpoint` | Current breakpoint | Responsive layout |
| `useResponsiveValue` | Value by breakpoint | Responsive props |

### Usage Examples

```typescript
import {
  useDisclosure,
  useControllable,
  useDebounce,
  useMediaQuery,
  useBreakpoint,
  useResponsiveValue
} from '@groxigo/ui-core';

// Modal state
const { isOpen, open, close, toggle } = useDisclosure({
  onOpen: () => console.log('opened'),
  onClose: () => console.log('closed'),
});

// Controlled/uncontrolled input
const [value, setValue] = useControllable({
  value: props.value,
  defaultValue: '',
  onChange: props.onChange,
});

// Debounced search
const debouncedQuery = useDebounce(searchQuery, 300);

// Responsive
const isMobile = useMediaQuery('(max-width: 768px)');
const { breakpoint, isMd, isLg } = useBreakpoint();
const columns = useResponsiveValue({ base: 1, md: 2, lg: 4 });
```

### Test Coverage

- **220 tests** covering all hooks
- **99%+ code coverage**
- Tests in `src/hooks/__tests__/`

---

## @groxigo/ui-elements (v1.0.0)

**Purpose:** React Native primitive UI components.

### Components (22 total)

| Component | Description | Key Features |
|-----------|-------------|--------------|
| **Text** | Typography | Variants (h1-h6, body, caption), weights |
| **Button** | Pressable button | Variants (solid, outline, ghost, link), loading |
| **Card** | Container | Variants (elevated, outline, filled), pressable |
| **Input** | Text input | Sizes, validation, icons |
| **TextArea** | Multi-line input | Auto-grow, character count |
| **Select** | Dropdown | Searchable, keyboard navigation |
| **Checkbox** | Toggle | Indeterminate state |
| **Radio** | Single select | RadioGroup context |
| **Switch** | Toggle switch | Controlled/uncontrolled |
| **Slider** | Range input | Min/max, step, marks |
| **Modal** | Overlay dialog | Focus trap, sizes, animations |
| **Drawer** | Side panel | Left/right/top/bottom placement |
| **Tabs** | Tab navigation | Variants, badges, icons |
| **Badge** | Status indicator | Variants, colors |
| **Avatar** | User image | Fallback initials, sizes |
| **Icon** | Vector icons | Expo icons integration |
| **Image** | Optimized image | Placeholder, error handling |
| **Spinner** | Loading indicator | Sizes, colors |
| **Progress** | Progress bar | Determinate/indeterminate |
| **Skeleton** | Loading placeholder | Animated shimmer |
| **Toast** | Notifications | Status types, auto-dismiss |
| **Tooltip** | Hover info | Placement, delay |
| **Divider** | Separator | Horizontal/vertical |
| **Spacer** | Flexible space | Size multiplier |

### Theme System

```typescript
import { ThemeProvider, useTheme, useColors } from '@groxigo/ui-elements';

// Wrap app
<ThemeProvider colorScheme="light">
  <App />
</ThemeProvider>

// In components
const { colors, spacing, typography } = useTheme();
const colors = useColors(); // Just colors
```

### Responsive Hooks

```typescript
import { useResponsive, useBreakpoint } from '@groxigo/ui-elements';

const { width, height, isPortrait } = useResponsive();
const { isSm, isMd, isLg } = useBreakpoint();
```

---

## @groxigo/ui-elements-web (v1.0.0)

**Purpose:** Web primitives with Tailwind CSS.

### Same 22 Components as ui-elements

API-compatible with React Native version, using:
- Tailwind CSS for styling
- `cn()` utility for class merging (clsx + tailwind-merge)
- `forwardRef` for all components
- `'use client'` directive for Next.js

### Tailwind Configuration

The package exports a Tailwind config preset:

```javascript
// tailwind.config.js in consuming project
const uiElementsPreset = require('@groxigo/ui-elements-web/tailwind');

module.exports = {
  presets: [uiElementsPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@groxigo/ui-elements-web/**/*.{js,ts,jsx,tsx}',
    './node_modules/@groxigo/components-web/**/*.{js,ts,jsx,tsx}',
  ],
};
```

### Token Integration

The `tailwind.config.js` programmatically imports from `@groxigo/tokens`:

```javascript
const tokens = require('@groxigo/tokens');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.primary,
        // All token colors mapped
      },
      spacing: tokens.spacing,
      fontFamily: {
        sans: [tokens.typography.fontFamily.sansWeb],
      },
      // etc.
    },
  },
};
```

---

## @groxigo/components (v1.0.0)

**Purpose:** React Native composite components for business features.

### Components (27 total)

| Category | Components |
|----------|------------|
| **Product** | ProductCard, RecipeCard, ImageGallery, PriceDisplay |
| **Cart** | CartItem, QuantitySelector, AddToCartButton |
| **Search** | SearchBar, FilterBar, SortSelector |
| **Forms** | Form, FormField (standalone), FormInput (context-aware), DatePicker, TimePicker |
| **Navigation** | Header, BottomNav, Sidebar, TabBar, CategoryNavBar, CategoryTile, SubCategoryTile |
| **Overlays** | Modal (ContentModal), BottomSheet |
| **States** | EmptyState, ErrorState |
| **Lists** | ListItem, ResponsiveGrid |
| **Reviews** | Rating, ReviewCard |

### Form System

```typescript
import { Form, FormInput, useFormContext } from '@groxigo/components';

<Form
  initialValues={{ email: '', password: '' }}
  onSubmit={handleSubmit}
  validate={validateForm}
  validateOnBlur
>
  <FormInput name="email" label="Email" type="email" required />
  <FormInput name="password" label="Password" type="password" required />
  <SubmitButton />
</Form>
```

### Test Coverage

- **204 tests** for critical components
- Tests in `src/components/*/\__tests__/`

---

## @groxigo/components-web (v1.0.0)

**Purpose:** Web composite components matching React Native versions.

### Components (30 total)

All components from @groxigo/components plus:
- FloatingCartButton
- ResponsiveGrid (CSS Grid-based)
- Additional web-specific optimizations

### Storybook

28 story files in `src/components/*/ComponentName.stories.tsx`

Run Storybook:
```bash
cd apps/storybook-web
npm run storybook
```

---

## @groxigo/api-types (v1.0.0)

**Purpose:** Zod schemas for API request/response validation.

### Schema Modules

| Module | Schemas |
|--------|---------|
| `common` | Pagination, sorting, API response wrapper |
| `product` | Product, BaseProduct, ProductVariant |
| `category` | Category, CategoryTree |
| `brand` | Brand |
| `customer` | Customer, Address, PaymentMethod |
| `order` | Order, OrderItem, OrderStatus |
| `delivery` | DeliverySlot, DeliveryZone |
| `inventory` | StockLevel, StockAlert |
| `store` | Store, StoreHours |
| `admin` | AdminUser, Permission |
| `error-codes` | API error code enum |

### Usage

```typescript
import { ProductSchema, OrderSchema } from '@groxigo/api-types';

// Validate API response
const product = ProductSchema.parse(apiResponse);

// Type inference
type Product = z.infer<typeof ProductSchema>;
```
