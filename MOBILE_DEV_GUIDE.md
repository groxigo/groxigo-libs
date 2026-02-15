# Mobile Development Guide — ui-elements & components (React Native)

> **Applies to:** `@groxigo/ui-elements` (primitives) and `@groxigo/components` (composites)
> **Consumer:** `groxigo-mobile` (Expo 54, React Native 0.81, Expo Router 6)
> **Last updated:** 2026-02-13

---

## 1. Architecture

### Package dependency chain

```
@groxigo/tokens          Foundation — raw JS values (colors, spacing, typography, radius)
@groxigo/contracts       Foundation — platform-agnostic TypeScript interfaces
@groxigo/icons           Foundation — 1,405 tree-shakable Unicons (dual-platform)
        ↓
@groxigo/ui-core         Hooks — useDeviceType, useResponsiveValue, useDisclosure, etc.
        ↓
@groxigo/ui-elements     Primitives — Button, Text, Input, Badge, Card, Modal, etc. (26)
        ↓
@groxigo/components      Composites — ProductCard, CartItem, SectionHeader, etc. (27+)
        ↓
groxigo-mobile           App — screens, contexts, navigation
```

### Token consumption: two valid paths

| Path | When to use | Example |
|------|-------------|---------|
| **Direct tokens** | In app screens, one-off layouts | `import { tokens } from '@groxigo/tokens/react-native'` |
| **Theme hook** | In library components (ui-elements, components) | `const theme = useTheme()` |

**Rule:** Library components (anything in `groxigo-libs/packages/`) MUST use the theme hook. App code (anything in `groxigo-mobile/`) may use either, but prefer direct tokens for consistency.

---

## 2. File structure

### UI element (primitive)

```
packages/ui-elements/src/elements/Button/
├── Button.tsx           # Component implementation
├── Button.types.ts      # Props interface (optional — can inline in .tsx)
└── index.ts             # Barrel export + contract type re-exports
```

### Composite component

```
packages/components/src/components/ProductCard/
├── ProductCard.tsx       # Component implementation
├── ProductCard.types.ts  # Props interface
└── index.ts              # Barrel export
```

### Barrel export pattern

```typescript
// index.ts
export { Button } from './Button';
export { default } from './Button';
export type { ButtonProps } from './Button';

// Re-export contract types for consumer convenience
export type {
  ButtonVariant,
  ButtonColorScheme,
  ButtonSize,
} from '@groxigo/contracts';
```

---

## 3. Component template

Every component MUST follow this structure:

```typescript
import { forwardRef, useMemo, type ReactNode } from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import type { ButtonPropsBase } from '@groxigo/contracts';
import { useDeviceType } from '@groxigo/ui-core';
import { useTheme } from '../theme';

// ─── Props ──────────────────────────────────────────────
export interface ButtonProps extends ButtonPropsBase {
  style?: ViewStyle;
  // RN-specific props only — contract covers the rest
}

// ─── Component ──────────────────────────────────────────
export const Button = forwardRef<View, ButtonProps>(
  (
    {
      variant = 'solid',
      colorScheme = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      iconOnly = false,
      disabled,
      children,
      testID,
      onPress,
      style,
    },
    ref
  ) => {
    const theme = useTheme();
    const { uiSize, fontSize, spacing } = useDeviceType();

    const config = useMemo(
      () => getSizeConfig(theme, size, uiSize, fontSize),
      [theme, size, uiSize, fontSize]
    );

    const isDisabled = disabled || loading;

    return (
      <Pressable
        ref={ref}
        onPress={isDisabled ? undefined : onPress}
        accessible
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        testID={testID}
        style={({ pressed }) => [
          styles.base,
          { height: config.height, borderRadius: config.borderRadius },
          getVariantStyles(theme, variant, colorScheme, pressed, isDisabled),
          fullWidth && styles.fullWidth,
          style,
        ]}
      >
        {/* content */}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';
export default Button;

// ─── Styles ─────────────────────────────────────────────
const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
});
```

---

## 4. Mandatory rules

### 4.1 Contract-first props

Every component extends a `*PropsBase` interface from `@groxigo/contracts`.

```typescript
// Correct
import type { BadgePropsBase } from '@groxigo/contracts';
export interface BadgeProps extends BadgePropsBase {
  style?: ViewStyle;
}

// Wrong — inventing props that diverge from contract
export interface BadgeProps {
  type: 'pill' | 'dot';  // ← not in contract
}
```

If the contract is missing a prop you need, add it to `@groxigo/contracts` first, then consume it in both native and web.

### 4.2 Token usage — NEVER hardcode

```typescript
// Correct
const theme = useTheme();
backgroundColor: theme.colors.primary

// Also correct (in app code)
import { tokens } from '@groxigo/tokens/react-native';
backgroundColor: tokens.colors.semantic.brand.primary.default

// Wrong
backgroundColor: '#2563eb'
backgroundColor: 'rgba(0,0,0,0.5)'
```

**Allowed exceptions:** `0`, `1` (hairline borders), `'100%'`, `'auto'`, `'transparent'`, `'currentColor'`.

### 4.3 Responsive scaling

All sizing that should adapt to tablets MUST use `useDeviceType()` scaling functions.

```typescript
const { fontSize, spacing, uiSize, iconSize } = useDeviceType();

// Text sizes
style={{ fontSize: fontSize(14) }}

// UI element dimensions (buttons, inputs, cards)
style={{ height: uiSize(44), paddingHorizontal: uiSize(16) }}

// Layout spacing (gaps, margins, padding)
style={{ gap: spacing(8), marginBottom: spacing(16) }}

// Icon sizes
<Icon size={iconSize(20)} />
```

**Scale bounds:**

| Function | Phone | Tablet range | Desktop cap |
|----------|-------|-------------|-------------|
| `fontSize(n)` | 1.0x | 1.0x–1.6x | 1.6x |
| `headingSize(n)` | 1.0x | 1.0x–1.8x | 1.8x |
| `uiSize(n)` | 1.0x | 1.0x–1.4x | 1.4x |
| `spacing(n)` | 1.0x | 1.0x–1.4x | 1.4x |
| `iconSize(n)` | 1.0x | 1.0x–1.4x | 1.4x |

**Exception:** Small decorative elements (badges, dividers, hairlines) may use fixed values when scaling looks wrong.

### 4.4 Accessibility

Every interactive element MUST include:

```typescript
// Pressable / Touchable
accessible
accessibilityRole="button"        // or "link", "checkbox", "switch", etc.
accessibilityState={{ disabled }}  // + busy, checked, selected, expanded
accessibilityLabel="Add to cart"   // for icon-only buttons
testID="add-to-cart-btn"           // for test automation

// Touch targets — 44pt minimum
hitSlop={hitSlop}                  // expand touch area if visual size < 44pt

// Form error messages
accessibilityRole="alert"
accessibilityLiveRegion="polite"   // announces to screen readers
```

### 4.5 forwardRef and displayName

```typescript
// Every component
export const Input = forwardRef<TextInput, InputProps>((props, ref) => { ... });
Input.displayName = 'Input';
export default Input;
```

### 4.6 StyleSheet.create — no inline objects

```typescript
// Correct — memoized StyleSheet
const styles = StyleSheet.create({
  container: { flex: 1 },
});

// Correct — dynamic styles via useMemo
const dynamicStyles = useMemo(() =>
  StyleSheet.create({
    box: { height: uiSize(44), backgroundColor: theme.colors.primary },
  }),
  [uiSize, theme.colors.primary]
);

// Wrong — inline object on every render
<View style={{ flex: 1, backgroundColor: theme.colors.primary }} />
```

**When dynamic values are needed**, use style arrays:
```typescript
<View style={[styles.container, { backgroundColor: theme.colors.primary }]} />
```

---

## 5. Variant / Size / ColorScheme pattern

Most components support the trio: `variant`, `size`, `colorScheme`.

### Size config pattern

```typescript
function getSizeConfig(
  theme: Theme,
  size: ButtonSize,
  uiSize: (n: number) => number,
  fontSize: (n: number) => number
) {
  const { spacing, typography, radius } = theme;

  const configs: Record<ButtonSize, SizeConfig> = {
    xs: {
      height: uiSize(spacing[7]),          // 28px base
      paddingH: uiSize(spacing[2.5]),      // 10px base
      fontSize: fontSize(typography.fontSize.xs),
      borderRadius: radius.sm,
      iconSize: 14,
      gap: spacing[1],
    },
    sm: { /* ... */ },
    md: { /* ... */ },
    lg: { /* ... */ },
    xl: { /* ... */ },
  };

  return configs[size];
}
```

### Variant styles pattern

```typescript
function getVariantStyles(
  theme: Theme,
  variant: ButtonVariant,
  colorScheme: ButtonColorScheme,
  pressed: boolean,
  disabled: boolean
): ViewStyle {
  const colors = getColorSchemeValues(theme, colorScheme);

  if (disabled) {
    return {
      backgroundColor: theme.colors.neutral.muted,
      borderColor: 'transparent',
    };
  }

  switch (variant) {
    case 'solid':
      return {
        backgroundColor: pressed ? colors.active : colors.default,
      };
    case 'outline':
      return {
        backgroundColor: pressed ? colors.subtle : 'transparent',
        borderWidth: 1,
        borderColor: colors.default,
      };
    case 'ghost':
      return {
        backgroundColor: pressed ? colors.subtle : 'transparent',
      };
    // ...
  }
}
```

---

## 6. Web parity checklist

When updating a native component, verify parity with its web counterpart:

| Check | Native | Web |
|-------|--------|-----|
| Same contract props | `extends ButtonPropsBase` | `extends ButtonPropsBase` |
| Same variants | `'solid' \| 'outline' \| 'ghost' \| 'soft' \| 'link'` | Same |
| Same sizes | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Same |
| Same color schemes | `'primary' \| 'secondary' \| ...` | Same |
| Same default values | `variant = 'solid'`, `size = 'md'` | Same |
| Loading state | ActivityIndicator + loadingText | SVG spinner + loadingText |
| Disabled state | `accessibilityState={{ disabled }}` | `aria-disabled` |
| Icon slots | `leftIcon`, `rightIcon` | Same |
| displayName | `Button.displayName = 'Button'` | Same |

**Platform-specific differences (acceptable):**

| Aspect | Native | Web |
|--------|--------|-----|
| Styling | `StyleSheet.create()` + theme | CSS Modules + CSS vars |
| Responsive | `useDeviceType()` hooks | `clamp()` in CSS |
| Prop for custom styling | `style?: ViewStyle` | `className?: string` |
| Event handler alias | — | `onClick` (alias for `onPress`) |
| HTML attributes | — | `type`, `id`, `name` |
| Press state | `Pressable` `pressed` | `:hover`, `:active` CSS |

---

## 7. When to create a library component vs. keep inline

### Move to `@groxigo/ui-elements` (primitives)

- Used across 3+ screens
- Pure UI with no business logic
- Has variants/sizes/states (button, input, badge, card)
- Needs accessibility built-in
- Examples: Button, Input, Text, Badge, Card, Avatar, Spinner

### Move to `@groxigo/components` (composites)

- Built from multiple ui-elements
- Has domain-specific structure (product card, cart item)
- Used across 2+ screens with same layout
- Has a contract in `@groxigo/contracts/components/`
- Examples: ProductCard, CartItem, SectionHeader, AddressCard, OrderCard

### Keep in `groxigo-mobile` (app-local)

- One-off screen layouts
- Tightly coupled to a specific route/context
- Uses app-level state (Zustand stores, React context)
- Wired to API hooks (useOrders, useCheckout)
- Examples: CheckoutPage layout, StoryViewer, CollapsibleHeader

---

## 8. Migrating inline Pressables to library Button

### Before (anti-pattern)

```typescript
// Scattered across 65 files in groxigo-mobile
<Pressable
  style={styles.addButton}
  onPress={handleAddToCart}
>
  <Icon name="plus" size="sm" color={tokens.colors.semantic.surface.primary} />
</Pressable>

// Custom styles somewhere below
const styles = StyleSheet.create({
  addButton: {
    width: 32, height: 32,
    borderRadius: 16,
    backgroundColor: tokens.colors.semantic.brand.primary.default,
    alignItems: 'center', justifyContent: 'center',
  },
});
```

### After (correct)

```typescript
import { Button } from '@groxigo/ui-elements';
import { Plus } from '@groxigo/icons/line';

<Button
  variant="solid"
  colorScheme="primary"
  size="sm"
  iconOnly
  leftIcon={<Plus size={16} color="currentColor" />}
  onPress={handleAddToCart}
  accessibilityLabel="Add to cart"
  testID="add-to-cart"
/>
```

**Benefits:** Consistent sizing, built-in press state, hitSlop for touch targets, accessibility baked in, responsive scaling on tablets.

---

## 9. Handling colors that don't exist in tokens

If you need a color not in `@groxigo/tokens` (e.g., recipe category gradients), do NOT hardcode hex values. Instead:

### Step 1: Add to tokens

```typescript
// packages/tokens/src/tokens/colors.ts
export const semantic = {
  // ... existing ...
  category: {
    cuisine: primitives.orange[500],
    dietary: primitives.green[500],
    style: primitives.purple[500],
    occasion: primitives.blue[500],
    dish: primitives.pink[500],
  },
};
```

### Step 2: Use from tokens

```typescript
import { tokens } from '@groxigo/tokens/react-native';

const TYPE_COLORS = {
  cuisine: tokens.colors.semantic.category.cuisine,
  dietary: tokens.colors.semantic.category.dietary,
  // ...
};
```

### Step 3: Bump tokens version

Follow the changeset flow in `CLAUDE.md` to publish the update.

---

## 10. Theme provider setup

The app root must wrap everything in `ThemeProvider`:

```typescript
// groxigo-mobile/app/_layout.tsx
import { ThemeProvider, lightTheme, darkTheme } from '@groxigo/ui-elements';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
      <Stack />
    </ThemeProvider>
  );
}
```

**Theme objects** (`lightTheme`, `darkTheme`) import directly from `@groxigo/tokens` — they stay in sync automatically when tokens are updated.

---

## 11. Import rules

```typescript
// Correct
import { forwardRef, useState, useMemo, useCallback, type ReactNode } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { ButtonPropsBase } from '@groxigo/contracts';
import { useDeviceType } from '@groxigo/ui-core';
import { tokens } from '@groxigo/tokens/react-native';
import { ShoppingCart } from '@groxigo/icons/line';

// Wrong
import React from 'react';                    // unnecessary default import
import React, { useState } from 'react';      // imports unused default
import * as React from 'react';               // barrel import
```

### Type-only imports

```typescript
// Use `type` keyword for interfaces/types
import type { ViewStyle, TextStyle } from 'react-native';
import type { ButtonPropsBase, ButtonVariant } from '@groxigo/contracts';
```

---

## 12. Testing patterns

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider, lightTheme } from '@groxigo/ui-elements';
import { Button } from './Button';

function renderWithTheme(ui: ReactNode) {
  return render(
    <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
  );
}

describe('Button', () => {
  it('calls onPress when pressed', () => {
    const onPress = vi.fn();
    const { getByTestId } = renderWithTheme(
      <Button testID="btn" onPress={onPress}>Click</Button>
    );
    fireEvent.press(getByTestId('btn'));
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('does not call onPress when disabled', () => {
    const onPress = vi.fn();
    const { getByTestId } = renderWithTheme(
      <Button testID="btn" onPress={onPress} disabled>Click</Button>
    );
    fireEvent.press(getByTestId('btn'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
```

---

## 13. Publishing checklist

When updating `@groxigo/ui-elements` or `@groxigo/components`:

1. Build: `cd groxigo-libs && bun run build`
2. Test: `bun run test`
3. Create changeset: `bunx changeset add` (select affected packages)
4. Version: `bunx changeset version`
5. Commit + push
6. Publish: `gh workflow run "Manual Publish" --repo groxigo/groxigo-libs --field confirm=PUBLISH`

**Cascade rule:** When `tokens` changes, bump `ui-core`, `ui-elements`, `ui-elements-web`, `components`, `components-web`. When `contracts` changes, bump `ui-elements`, `ui-elements-web`, `components`, `components-web`.

---

## 14. Component inventory — current vs target

### ui-elements (primitives) — 26 in package, 3 used by mobile app

| Component | In package | Used by mobile | Target state |
|-----------|-----------|---------------|-------------|
| **Text** | v1.0.1 | 64 files | Update to match web v1.2.6 |
| **Icon** | v1.0.1 | 54 files | Update to match web v1.2.6 |
| **Image** | v1.0.1 | 27 files | Update to match web v1.2.6 |
| **Button** | v1.0.1 | 0 files | Update + adopt in mobile |
| **Input** | v1.0.1 | 0 files | Update + adopt in mobile |
| **Badge** | v1.0.1 | 0 files | Update + adopt in mobile |
| **Card** | v1.0.1 | 0 files | Update + adopt in mobile |
| **Avatar** | v1.0.1 | 0 files | Update + adopt in mobile |
| **Checkbox** | v1.0.1 | 0 files | Update + adopt in mobile |
| **Radio** | v1.0.1 | 0 files | Update + adopt in mobile |
| **Switch** | v1.0.1 | 0 files | Update + adopt in mobile |
| **Select** | v1.0.1 | 0 files | Update + adopt in mobile |
| **Spinner** | v1.0.1 | 0 files | Update + adopt in mobile |
| **Progress** | v1.0.1 | 0 files | Update |
| **Skeleton** | v1.0.1 | 0 files | Update |
| **Toast** | v1.0.1 | 0 files | Update |
| **Modal** | v1.0.1 | 0 files | Update + adopt |
| **Drawer** | v1.0.1 | 0 files | Update |
| **Tabs** | v1.0.1 | 0 files | Update + adopt |
| **Menu** | v1.0.1 | 0 files | Update |
| **Tooltip** | v1.0.1 | 0 files | Update |
| **Link** | v1.0.1 | 0 files | Update |
| **Divider** | v1.0.1 | 0 files | Update + adopt |
| **Spacer** | v1.0.1 | 0 files | Update |
| **Slider** | v1.0.1 | 0 files | Update |
| **Breadcrumb** | v1.0.1 | 0 files | Low priority (mobile rarely needs) |
| **StarRating** | Missing | — | Add (web has it) |

### components (composites) — 27 in package

| Component | In package | Used by mobile | Notes |
|-----------|-----------|---------------|-------|
| **ProductCard** | Yes | Via own version | Reconcile with library |
| **CartItem** | Yes | Via own version | Reconcile with library |
| **SectionHeader** | Yes | Yes | Keep |
| **QuantitySelector** | Yes | Via own version | Adopt library version |
| **Rating** | Yes | Yes | Keep |
| **PriceDisplay** | Yes | Via own version | Reconcile |
| **SearchBar** | Yes | Via own version | Reconcile |
| **BottomNav** | Yes | Yes | Keep |
| **Header** | Yes | Via own version | Reconcile |
| **FloatingCartButton** | Yes | Yes | Keep |

---

## 15. Priority order for updates

### Phase 1: Foundation (do first)
1. Align `@groxigo/tokens` — add missing semantic colors (recipe, category, overlay)
2. Update theme files in `ui-elements` — ensure lightTheme/darkTheme match latest tokens
3. Verify `useDeviceType` scaling functions work with current token values

### Phase 2: High-impact primitives
4. Update `Button` — most impactful, replaces raw Pressables across 50+ files
5. Update `Input` — forms, search, auth screens
6. Update `Badge` — product cards, status indicators
7. Update `Card` — container for most composites
8. Add `StarRating` — web has it, mobile needs it

### Phase 3: Form elements
9. Update `Checkbox`, `Radio`, `Switch` — settings/preferences screens
10. Update `Select` — address, delivery slot pickers
11. Update `Slider` — price range filters

### Phase 4: Feedback & overlays
12. Update `Modal`, `Toast`, `Spinner` — loading/error/success states
13. Update `Tabs`, `Divider` — navigation, layout

### Phase 5: Mobile app adoption
14. Replace inline Pressables with `Button` across groxigo-mobile
15. Replace inline quantity controls with `QuantitySelector`
16. Replace hardcoded colors with token references
17. Reconcile app-local components with library versions

---

## 16. Anti-patterns to avoid

```typescript
// 1. Raw Pressable for buttons
// BAD
<Pressable style={styles.btn} onPress={onPress}>
  <Text style={styles.btnText}>Submit</Text>
</Pressable>
// GOOD
<Button variant="solid" onPress={onPress}>Submit</Button>

// 2. Hardcoded hex colors
// BAD
backgroundColor: '#FF6B35'
// GOOD
backgroundColor: tokens.colors.semantic.category.cuisine

// 3. Platform.select for styling
// BAD
...Platform.select({ web: { cursor: 'pointer' } })
// GOOD — handled inside the component, not by consumers

// 4. Missing accessibility
// BAD
<Pressable onPress={toggle}><Icon name="heart" /></Pressable>
// GOOD
<Pressable onPress={toggle} accessible accessibilityRole="button"
  accessibilityLabel={isFav ? 'Remove from favorites' : 'Add to favorites'}>
  <Icon name={isFav ? 'heart-fill' : 'heart'} />
</Pressable>

// 5. Inline style objects
// BAD
<View style={{ padding: 16, backgroundColor: theme.colors.surface }}>
// GOOD
<View style={[styles.container, { backgroundColor: theme.colors.surface }]}>

// 6. Importing React default
// BAD
import React from 'react';
// GOOD
import { forwardRef, useState } from 'react';

// 7. Missing displayName
// BAD
export const Foo = forwardRef<View, FooProps>((props, ref) => { ... });
// GOOD
export const Foo = forwardRef<View, FooProps>((props, ref) => { ... });
Foo.displayName = 'Foo';

// 8. Skipping responsive scaling
// BAD
style={{ fontSize: 16 }}
// GOOD
style={{ fontSize: fontSize(16) }}

// 9. Duplicating cart logic
// BAD — building quantity buttons inline
<Pressable onPress={() => updateQty(id, qty - 1)}><Icon name="minus" /></Pressable>
// GOOD
<QuantitySelector value={qty} onChange={(n) => updateQty(id, n)} min={1} />
```

---

## 17. Quick reference: DESIGN_RULES sections

These sections from `groxigo-designer/rules/DESIGN_RULES.md` govern component styling:

| Section | Rule |
|---------|------|
| **\S3** | Fluid scaling — which tokens use scaling vs. stay fixed |
| **\S4** | 4pt grid — all values multiples of 4 (exception: 1px, 2px) |
| **\S5** | Size pairing — icon/component/typography must align |
| **\S13** | Border radius — pill (full), card (lg=10), modal (2xl=20), badge (xs=4) |
| **\S22** | Component state matrix — default, hover, active, focus, disabled, loading |
| **\S24** | Color usage — semantic tokens only, never primitives in components |
| **\S26** | Spacing hierarchy — component (8-16), section (24-32), hero (48) |

**Authority:** DESIGN_RULES is the ultimate source of truth. When token values conflict with DESIGN_RULES, fix the tokens.
