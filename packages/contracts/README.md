# @groxigo/contracts

Shared TypeScript interfaces that define the API contract every UI component must follow across platforms (React Native and Web).

## Installation

```bash
# npm
npm install @groxigo/contracts

# bun
bun add @groxigo/contracts
```

> **Note:** This package is published to the GitHub Package Registry (`npm.pkg.github.com`).

## Purpose

Groxigo ships the same design system on mobile (React Native) and web (React/CSS Modules). Without a shared contract, prop names, variant values, and callback signatures drift apart over time. `@groxigo/contracts` solves this by providing a single set of `*PropsBase` interfaces that both platform implementations extend. This guarantees:

- **Identical public APIs** -- a `ButtonPropsBase` accepted on mobile is accepted on web.
- **Type-safe variant unions** -- `ButtonVariant`, `CardSize`, etc. are defined once and reused.
- **Consistent testing hooks** -- every contract includes a `testID` field.
- **Server-driven UI support** -- SDUI style props are baked into composite contracts.

## Usage

### Importing element contracts

```typescript
import type { ButtonPropsBase, ButtonVariant, ButtonSize } from '@groxigo/contracts';
// or use the sub-path export
import type { ButtonPropsBase } from '@groxigo/contracts/elements';
```

### Importing component contracts

```typescript
import type { ProductCardPropsBase, ProductCardVariant } from '@groxigo/contracts';
// or
import type { ProductCardPropsBase } from '@groxigo/contracts/components';
```

### Importing animation contracts

```typescript
import type { LottiePropsBase, SpringConfig, AnimatedPropsBase } from '@groxigo/contracts';
// or
import type { SpringConfig } from '@groxigo/contracts/animation';
```

### Importing SDUI types

```typescript
import type { SDUIStyleProps, ColorScheme, CustomColors } from '@groxigo/contracts';
```

### Extending a contract for a platform

```typescript
// React Native -- add platform-specific style prop
import type { ButtonPropsBase } from '@groxigo/contracts';
import type { StyleProp, ViewStyle } from 'react-native';

export interface ButtonProps extends ButtonPropsBase {
  style?: StyleProp<ViewStyle>;
}

// Web -- add platform-specific className prop
import type { ButtonPropsBase } from '@groxigo/contracts';

export interface ButtonProps extends ButtonPropsBase {
  className?: string;
}
```

## Available Contracts

### Element Contracts (25 primitives)

| Contract | Key Types |
|----------|-----------|
| Text | `TextPropsBase`, `TextVariant`, `TextWeight`, `TextAlign`, `TextColorScheme` |
| Button | `ButtonPropsBase`, `ButtonVariant`, `ButtonColorScheme`, `ButtonSize` |
| Badge | `BadgePropsBase`, `BadgeVariant`, `BadgeColorScheme`, `BadgeSize` |
| Input | `InputPropsBase`, `InputVariant`, `InputSize` |
| Card | `CardPropsBase`, `CardHeaderPropsBase`, `CardBodyPropsBase`, `CardFooterPropsBase` |
| Image | `ImagePropsBase`, `ImageResizeMode` |
| Spinner | `SpinnerPropsBase`, `SpinnerSize`, `SpinnerColorScheme` |
| Skeleton | `SkeletonPropsBase`, `SkeletonVariant` |
| Icon | `IconPropsBase`, `IconName`, `IconSize`, `IconColorScheme` |
| Avatar | `AvatarPropsBase`, `AvatarGroupPropsBase`, `AvatarSize`, `AvatarVariant` |
| Checkbox | `CheckboxPropsBase`, `CheckboxGroupPropsBase`, `CheckboxSize` |
| Radio | `RadioPropsBase`, `RadioGroupPropsBase`, `RadioSize` |
| Switch | `SwitchPropsBase`, `SwitchSize`, `SwitchColorScheme` |
| Select | `SelectPropsBase`, `SelectOption`, `SelectSize`, `SelectVariant` |
| Divider | `DividerPropsBase`, `DividerOrientation`, `DividerVariant` |
| Progress | `ProgressPropsBase`, `CircularProgressPropsBase`, `ProgressSize`, `ProgressVariant` |
| Slider | `SliderPropsBase`, `RangeSliderPropsBase`, `SliderSize`, `SliderOrientation` |
| Modal | `ModalPropsBase`, `ModalHeaderPropsBase`, `AlertDialogPropsBase`, `ModalSize` |
| Drawer | `DrawerPropsBase`, `DrawerHeaderPropsBase`, `DrawerPlacement`, `DrawerSize` |
| Tabs | `TabsPropsBase`, `TabListPropsBase`, `TabPanelPropsBase`, `TabItem` |
| Toast | `ToastPropsBase`, `ToastProviderPropsBase`, `ToastStatus`, `ToastPosition` |
| Tooltip | `TooltipPropsBase`, `TooltipPlacement` |
| Menu | `MenuPropsBase`, `MenuItemPropsBase`, `MenuItem`, `MenuPlacement` |
| TextArea | `TextAreaPropsBase`, `TextAreaSize`, `TextAreaVariant`, `TextAreaResize` |
| Link | `LinkPropsBase`, `LinkColorScheme`, `LinkSize` |
| Breadcrumb | `BreadcrumbPropsBase`, `BreadcrumbItemPropsBase`, `BreadcrumbItem` |
| Spacer | `SpacerPropsBase` |

### Component Contracts (64 composites)

| Contract | Key Types |
|----------|-----------|
| ProductCard | `ProductCardPropsBase`, `ProductCardVariant`, `ProductImageVariant`, `ProductCategory` |
| SearchBar | `SearchBarPropsBase`, `SearchBarVariant`, `SearchBarSize` |
| CategoryCard | `CategoryCardPropsBase`, `CategoryCardSize`, `CategoryCardVariant` |
| RecipeCard | `RecipeCardPropsBase`, `RecipeCardDifficulty`, `RecipeTagItem` |
| RecipeSection | `RecipeSectionPropsBase`, `RecipeSectionItem`, `RecipeSectionDisplayType` |
| CartItem | `CartItemPropsBase`, `CartItemSection` |
| QuantitySelector | `QuantitySelectorPropsBase`, `QuantitySelectorSize` |
| PriceDisplay | `PriceDisplayPropsBase`, `PriceDisplaySize` |
| Rating | `RatingPropsBase`, `RatingSize`, `RatingSection` |
| FilterBar | `FilterBarPropsBase`, `FilterOption`, `FilterBarSection` |
| EmptyState | `EmptyStatePropsBase`, `EmptyStateSection` |
| ErrorState | `ErrorStatePropsBase`, `ErrorStateSection` |
| FormField | `FormFieldPropsBase` |
| Header | `HeaderPropsBase`, `HeaderSection` |
| BottomNav | `BottomNavPropsBase`, `BottomNavItem`, `BottomNavVariant` |
| DeliveryBar | `DeliveryBarPropsBase`, `DeliveryAddress`, `DeliverySlot` |
| CategorySection | `CategorySectionPropsBase`, `CategorySectionItem` |
| SectionHeader | `SectionHeaderPropsBase` |
| ProductTile | `ProductTilePropsBase` |
| CuisineCard | `CuisineCardPropsBase`, `CuisineCardSize`, `CuisineCardVariant` |
| Footer | `FooterPropsBase`, `FooterLink`, `FooterSection` |
| ReviewCard | `ReviewCardPropsBase` |
| ProductCarousel | `ProductCarouselPropsBase` |
| RecipeCarousel | `RecipeCarouselPropsBase` |
| CategoryCarousel | `CategoryCarouselPropsBase` |
| ProductListGrid | `ProductListGridPropsBase` |
| RecipeListGrid | `RecipeListGridPropsBase` |
| CategoryListGrid | `CategoryListGridPropsBase` |

### Animation Contracts

| Contract | Key Types |
|----------|-----------|
| Lottie | `LottiePropsBase`, `LottieSource`, `LottieRef`, `LottiePreset`, `AnimatedIconPropsBase` |
| Transition | `AnimatedPropsBase`, `SpringConfig`, `TimingConfig`, `Keyframes`, `StaggerConfig`, `GestureAnimationConfig` |

### SDUI Contracts

| Contract | Key Types |
|----------|-----------|
| SDUI Styling | `SDUIStyleProps`, `ColorScheme`, `CustomColors`, `BackgroundConfig` |

## Contract Pattern

Every contract follows a consistent structure:

### PropsBase interface

All contracts export a `*PropsBase` interface that serves as the canonical prop definition. Platform implementations extend or narrow this interface.

```typescript
export interface ButtonPropsBase {
  variant?: ButtonVariant;        // Union type for visual variants
  colorScheme?: ButtonColorScheme; // Union type for color themes
  size?: ButtonSize;              // Union type for sizing
  disabled?: boolean;
  children?: ReactNode;
  testID?: string;                // Testing hook
  onPress?: (event?: unknown) => void;
}
// Platform implementations add className (web) or style (RN) in their own interfaces.
```

### Variant unions

Visual options are defined as literal union types, not open strings:

```typescript
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link' | 'soft';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

### Standard fields

Every contract includes these fields (where applicable):

| Field | Type | Purpose |
|-------|------|---------|
| `variant` | string union | Visual style |
| `size` | string union | Sizing tier |
| `colorScheme` | string union | Color theme |
| `testID` | `string` | Test automation selector |
| `children` | `ReactNode` | Slot content |
| `onPress` | function | Primary interaction handler |

### SDUIStyleProps

Composite components that support server-driven UI extend `SDUIStyleProps`, which provides `colorScheme`, `customColors`, and `background` fields for runtime theming.

## Contributing

### Adding a new element contract

1. Create `packages/contracts/src/elements/my-element.ts` with the `*PropsBase` interface and any variant/size union types.
2. Re-export the types from `packages/contracts/src/elements/index.ts`.
3. Build: `bun run build` from the package root.
4. Implement the contract in `ui-elements` (React Native) and `ui-elements-web` (Web).

### Adding a new component contract

1. Create `packages/contracts/src/components/my-component.ts`.
2. Re-export from `packages/contracts/src/components/index.ts`.
3. If the component needs SDUI support, extend `SDUIStyleProps`.
4. Implement in `components` and `components-web`.

### Rules

- Every `*PropsBase` must include `testID?: string`. Do NOT add `className` or `style` — those are platform-specific and belong in web/RN implementations.
- Use `onPress` (not `onClick`) for the primary action handler to stay platform-neutral.
- Variant and size types must be exported as named type aliases, not inlined.
- Document each prop with a JSDoc comment and `@default` where applicable.

## Scripts

```bash
bun run build        # Compile TypeScript to dist/
bun run build:watch  # Watch mode
bun run clean        # Remove dist/
```

## License

MIT
