# Component Contracts

Complete reference for all TypeScript interfaces in `@groxigo/contracts`.

---

## Element Contracts

### Text

```typescript
export type TextVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'subtitle1' | 'subtitle2'
  | 'body1' | 'body2'
  | 'caption' | 'overline'
  | 'label' | 'helper';

export type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export interface TextPropsBase {
  variant?: TextVariant;
  weight?: TextWeight;
  color?: string;
  align?: TextAlign;
  numberOfLines?: number;
  selectable?: boolean;
  children?: React.ReactNode;
  testID?: string;
  className?: string;  // Web only
}
```

### Button

```typescript
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonColorScheme =
  | 'primary' | 'secondary' | 'accent'
  | 'success' | 'warning' | 'error' | 'neutral';

export interface ButtonPropsBase {
  variant?: ButtonVariant;
  size?: ButtonSize;
  colorScheme?: ButtonColorScheme;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;
  fullWidth?: boolean;
  onPress?: (event?: unknown) => void;
  children?: React.ReactNode;
  testID?: string;
  className?: string;
}
```

### Card

```typescript
export type CardVariant = 'elevated' | 'outline' | 'filled' | 'unstyled';
export type CardSize = 'sm' | 'md' | 'lg';

export interface CardPropsBase {
  variant?: CardVariant;
  size?: CardSize;
  pressable?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
  testID?: string;
  className?: string;
}

export interface CardHeaderPropsBase {
  children?: React.ReactNode;
  testID?: string;
}

export interface CardBodyPropsBase {
  children?: React.ReactNode;
  testID?: string;
}

export interface CardFooterPropsBase {
  children?: React.ReactNode;
  testID?: string;
}
```

### Input

```typescript
export type InputSize = 'xs' | 'sm' | 'md' | 'lg';
export type InputVariant = 'outline' | 'filled' | 'flushed' | 'unstyled';

export interface InputPropsBase {
  size?: InputSize;
  variant?: InputVariant;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  helperText?: string;
  errorMessage?: string;
  label?: string;
  testID?: string;
  className?: string;
}
```

### Modal

```typescript
export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalPlacement = 'center' | 'top' | 'bottom';

export interface ModalPropsBase {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  size?: ModalSize;
  placement?: ModalPlacement;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  trapFocus?: boolean;
  blockScroll?: boolean;
  initialFocusRef?: React.RefObject<any>;
  finalFocusRef?: React.RefObject<any>;
  onAnimationComplete?: () => void;
  children?: React.ReactNode;
  testID?: string;
  className?: string;
}

export interface ModalHeaderPropsBase {
  children?: React.ReactNode;
  testID?: string;
}

export interface ModalBodyPropsBase {
  children?: React.ReactNode;
  testID?: string;
}

export interface ModalFooterPropsBase {
  children?: React.ReactNode;
  testID?: string;
}
```

### Drawer

```typescript
export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DrawerPropsBase {
  isOpen: boolean;
  onClose: () => void;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  trapFocus?: boolean;
  blockScroll?: boolean;
  children?: React.ReactNode;
  testID?: string;
  className?: string;
}
```

### Tabs

```typescript
export type TabsVariant = 'line' | 'soft-rounded' | 'solid-rounded' | 'unstyled';
export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsColorScheme =
  | 'primary' | 'secondary' | 'accent'
  | 'success' | 'warning' | 'error' | 'gray';

export interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsPropsBase {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  items?: TabItem[];
  variant?: TabsVariant;
  size?: TabsSize;
  colorScheme?: TabsColorScheme;
  isFitted?: boolean;
  isLazy?: boolean;
  children?: React.ReactNode;
  testID?: string;
  className?: string;
}
```

### Switch

```typescript
export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchColorScheme =
  | 'primary' | 'secondary' | 'accent'
  | 'success' | 'warning' | 'error';

export interface SwitchPropsBase {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: SwitchSize;
  colorScheme?: SwitchColorScheme;
  isDisabled?: boolean;
  label?: string;
  value?: string;  // For form submission
  testID?: string;
  className?: string;
}
```

### Badge

```typescript
export type BadgeVariant = 'solid' | 'outline' | 'subtle' | 'soft';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeColorScheme =
  | 'primary' | 'secondary' | 'accent'
  | 'success' | 'warning' | 'error' | 'neutral';

export interface BadgePropsBase {
  variant?: BadgeVariant;
  size?: BadgeSize;
  colorScheme?: BadgeColorScheme;
  rounded?: boolean;
  children?: React.ReactNode;
  testID?: string;
  className?: string;
}
```

### Select

```typescript
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectPropsBase {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled' | 'flushed';
  isDisabled?: boolean;
  isInvalid?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  testID?: string;
  className?: string;
}
```

### Toast

```typescript
export type ToastStatus = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition =
  | 'top' | 'top-left' | 'top-right'
  | 'bottom' | 'bottom-left' | 'bottom-right';

export interface ToastPropsBase {
  id?: string;
  status?: ToastStatus;
  title?: string;
  description?: string;
  duration?: number | null;  // null for persistent
  isClosable?: boolean;
  position?: ToastPosition;
  onClose?: () => void;
  testID?: string;
  className?: string;
}
```

---

## Component Contracts

### ProductCard

```typescript
export interface ProductCardPropsBase {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  unit?: string;
  discountPercent?: number;
  badge?: string;
  badgeColorScheme?: BadgeColorScheme;
  isFavorite?: boolean;
  outOfStock?: boolean;
  quantity?: number;
  onPress?: () => void;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
  onQuantityChange?: (quantity: number) => void;
  testID?: string;
  className?: string;
}
```

### RecipeCard

```typescript
export type RecipeDifficulty = 'easy' | 'medium' | 'hard';

export interface RecipeCardPropsBase {
  id?: string;
  title: string;
  imageUrl: string;
  description?: string;
  cookTime?: number;  // in minutes
  prepTime?: number;
  totalTime?: number;
  servings?: number;
  difficulty?: RecipeDifficulty;
  badge?: string;
  badgeColorScheme?: BadgeColorScheme;
  author?: string;
  rating?: number;
  reviewCount?: number;
  onPress?: () => void;
  onAddToCart?: () => void;
  testID?: string;
  className?: string;
}
```

### CartItem

```typescript
export interface CartItemPropsBase {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  quantity: number;
  minQuantity?: number;
  maxQuantity?: number;
  description?: string;
  unit?: string;
  onQuantityChange?: (quantity: number) => void;
  onRemove?: () => void;
  isDisabled?: boolean;
  testID?: string;
  className?: string;
}
```

### QuantitySelector

```typescript
export interface QuantitySelectorPropsBase {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  label?: string;
  testID?: string;
  className?: string;
}
```

### FilterBar

```typescript
export interface FilterOption {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface FilterBarPropsBase {
  filters: FilterOption[];
  selected?: string[];
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
  multiSelect?: boolean;
  showCounts?: boolean;
  testID?: string;
  className?: string;
}
```

### EmptyState

```typescript
export interface EmptyStatePropsBase {
  icon?: string | React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  size?: 'sm' | 'md' | 'lg';
  testID?: string;
  className?: string;
}
```

### ErrorState

```typescript
export interface ErrorStatePropsBase {
  icon?: string | React.ReactNode;
  title?: string;
  message: string;
  errorCode?: string;
  onRetry?: () => void;
  retryLabel?: string;
  isRetrying?: boolean;
  size?: 'sm' | 'md' | 'lg';
  testID?: string;
  className?: string;
}
```

### Header

```typescript
export interface HeaderPropsBase {
  title?: string | React.ReactNode;
  subtitle?: string;
  leftAction?: React.ReactNode;
  rightActions?: React.ReactNode[];
  sticky?: boolean;
  elevated?: boolean;
  transparent?: boolean;
  testID?: string;
  className?: string;
}
```

### BottomNav

```typescript
export interface BottomNavItem {
  id: string;
  label: string;
  icon: string | React.ReactNode;
  activeIcon?: string | React.ReactNode;
  badge?: string | number;
  href?: string;
}

export type BottomNavVariant = 'default' | 'floating';

export interface BottomNavPropsBase {
  items: BottomNavItem[];
  activeItem?: string;
  onChange?: (itemId: string) => void;
  variant?: BottomNavVariant;
  showLabels?: boolean;
  safeAreaInset?: boolean;
  testID?: string;
  className?: string;
}
```

### Rating

```typescript
export interface RatingPropsBase {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  showValue?: boolean;
  count?: number;
  testID?: string;
  className?: string;
}
```

### PriceDisplay

```typescript
export interface PriceDisplayPropsBase {
  price: number;
  originalPrice?: number;
  currency?: string;
  currencyDisplay?: 'symbol' | 'code' | 'name';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCurrency?: boolean;
  testID?: string;
  className?: string;
}
```

### FormField

```typescript
export interface FormFieldPropsBase extends InputPropsBase {
  name: string;
  label?: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
}
```

---

## Extending Contracts

### React Native Pattern

```typescript
import type { ButtonPropsBase } from '@groxigo/contracts';
import type { StyleProp, ViewStyle } from 'react-native';

export interface ButtonProps extends Omit<ButtonPropsBase, 'className'> {
  style?: StyleProp<ViewStyle>;
  // Additional RN-specific props
}
```

### Web Pattern

```typescript
import type { ButtonPropsBase } from '@groxigo/contracts';

export interface ButtonProps extends ButtonPropsBase {
  // className already included in base
  // Additional web-specific props
  type?: 'button' | 'submit' | 'reset';
}
```

### Handling Deprecated Props

```typescript
export interface ProductCardProps extends Omit<ProductCardPropsBase, 'className'> {
  /** @deprecated Use `name` instead */
  title?: string;
  /** @deprecated Use `imageUrl` instead */
  image?: ImageSource;
  style?: StyleProp<ViewStyle>;
}
```
