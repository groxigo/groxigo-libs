# Icon Architecture for Groxigo Design System

## Overview

This document outlines where icons should reside in the Groxigo monorepo architecture and how they should be structured.

## Current Architecture

```
@groxigo/tokens          → Design values (colors, spacing, typography, etc.)
@groxigo/ui-elements     → Primitive building blocks (Text, Button, Card, Badge, Input)
@groxigo/components      → Composite components (ProductCard, SearchBar, etc.)
```

## Recommendation: Icons in `@groxigo/ui-elements`

### ✅ Why `ui-elements`?

1. **Primitive Building Block**: Icons are fundamental UI primitives, just like `Text` and `Button`
2. **Platform-Specific**: Icons need platform-specific implementations (iOS: SF Symbols, Android/Web: Material Icons), matching the pattern of other ui-elements
3. **Reusability**: Icons are used by both `ui-elements` (e.g., Button with icon) and `components` (e.g., ProductCard with icon)
4. **Consistency**: Follows the same architectural pattern as other ui-elements
5. **Dependency Flow**: `ui-elements` depends on `tokens` (for icon colors/sizes), and `components` depends on `ui-elements`

### 📁 Proposed Structure

```
packages/ui-elements/
└── src/
    └── elements/
        ├── Text/
        ├── Button/
        ├── Icon/              ← NEW
        │   ├── Icon.tsx       # Base/fallback implementation
        │   ├── Icon.ios.tsx   # iOS: SF Symbols (expo-symbols)
        │   ├── Icon.android.tsx # Android: Material Icons (@expo/vector-icons)
        │   ├── Icon.web.tsx   # Web: Material Icons or SVG
        │   ├── Icon.types.ts  # TypeScript definitions
        │   ├── Icon.styles.ts # Style generation (if needed)
        │   └── index.ts
        └── ...
```

## Icon Component Design

### Platform-Specific Implementations

**iOS (`Icon.ios.tsx`):**
- Uses `expo-symbols` for native SF Symbols
- Best performance and native look
- Access to all SF Symbols

**Android (`Icon.android.tsx`):**
- Uses `@expo/vector-icons/MaterialIcons` for Material Design icons
- Consistent with Material Design guidelines
- Large icon library

**Web (`Icon.web.tsx`):**
- Uses `@expo/vector-icons/MaterialIcons` or SVG icons
- Can use web-optimized icon libraries if needed
- SEO-friendly (SVG)

### Icon Component API

```typescript
// Icon.types.ts
export interface IconProps {
  name: IconName;              // Icon identifier
  size?: 'sm' | 'md' | 'lg' | number;  // Size (uses tokens or number)
  color?: string;              // Color (uses tokens)
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold'; // iOS SF Symbols weight
  style?: ViewStyle | TextStyle;
}

// Usage
<Icon name="home" size="md" color={tokens.colors.alias.shared.primary.default} />
<Icon name="chevron.right" size={24} />
```

### Icon Name Mapping

Since iOS uses SF Symbols and Android/Web use Material Icons, we need a mapping:

```typescript
// Icon.types.ts
export type IconName = 
  | 'home'
  | 'home.fill'
  | 'chevron.right'
  | 'chevron.left'
  | 'search'
  | 'heart'
  | 'heart.fill'
  | 'cart'
  | 'cart.fill'
  | 'user'
  | 'settings'
  | // ... more icons

// Icon mapping for cross-platform compatibility
const ICON_MAPPING: Record<IconName, {
  ios: string;      // SF Symbol name
  android: string;  // Material Icon name
  web: string;      // Material Icon name or SVG path
}> = {
  'home': {
    ios: 'house',
    android: 'home',
    web: 'home',
  },
  'home.fill': {
    ios: 'house.fill',
    android: 'home',
    web: 'home',
  },
  'chevron.right': {
    ios: 'chevron.right',
    android: 'chevron-right',
    web: 'chevron-right',
  },
  // ... more mappings
};
```

## Integration with Existing Components

### Button with Icon

```typescript
// Button already supports icons via children
<Button variant="primary">
  <Icon name="cart" size="sm" color={tokens.colors.alias.shared.text.inverse} />
  <Text>Add to Cart</Text>
</Button>
```

### Input with Icon

```typescript
// Input already has leftIcon/rightIcon props
<Input
  label="Search"
  placeholder="Search products"
  leftIcon={<Icon name="search" size="md" />}
/>
```

## Alternative: Separate `@groxigo/icons` Package

### When to Consider a Separate Package

Consider a separate `@groxigo/icons` package if:

1. **Large Icon Library**: You have 100+ custom icons
2. **Icon Assets**: You need to bundle SVG files or custom icon fonts
3. **Icon Management**: Icons need separate versioning/release cycle
4. **Tree Shaking**: Need to optimize bundle size by importing only used icons

### Structure (if separate package)

```
packages/
├── tokens/
├── icons/              ← Separate package
│   ├── src/
│   │   ├── Icon.tsx    # Icon component
│   │   ├── assets/     # SVG files or icon fonts
│   │   └── index.ts
│   └── package.json
├── ui-elements/        # Depends on @groxigo/icons
└── components/         # Depends on @groxigo/icons
```

### Dependency Flow (if separate)

```
@groxigo/tokens
    ↓
@groxigo/icons        ← New package
    ↓
@groxigo/ui-elements  ← Depends on icons
    ↓
@groxigo/components   ← Depends on ui-elements (and icons)
```

## Recommendation Summary

### ✅ Recommended: Icons in `ui-elements`

**Pros:**
- Simpler architecture (one less package)
- Icons are primitive building blocks
- Matches existing pattern
- Easier to maintain
- No additional dependency management

**Cons:**
- Slightly larger `ui-elements` package
- Icons bundled with other primitives

### ⚠️ Alternative: Separate `icons` Package

**Pros:**
- Better tree-shaking
- Separate versioning
- Better for large icon libraries
- Can optimize icon assets separately

**Cons:**
- More complex architecture
- Additional dependency to manage
- More packages to maintain

## Implementation Plan

### Phase 1: Basic Icon Component (Recommended Start)

1. Create `Icon` component in `@groxigo/ui-elements`
2. Implement platform-specific variants (`.ios.tsx`, `.android.tsx`, `.web.tsx`)
3. Add icon name mapping for cross-platform compatibility
4. Use design tokens for sizes and colors
5. Export from `ui-elements` index

### Phase 2: Icon Library Expansion

1. Add more icon mappings
2. Create icon name type definitions
3. Add icon size tokens (if needed)
4. Document icon usage

### Phase 3: Optimization (if needed)

1. If icon library grows large, consider separate package
2. Implement tree-shaking optimizations
3. Add custom SVG icon support if needed

## Example Implementation

```typescript
// packages/ui-elements/src/elements/Icon/Icon.ios.tsx
import { SymbolView, SymbolWeight } from 'expo-symbols';
import { tokens } from '@groxigo/tokens/react-native';
import { getIconSize } from './Icon.utils';
import type { IconProps } from './Icon.types';

export const Icon = ({
  name,
  size = 'md',
  color = tokens.colors.alias.shared.text.primary,
  weight = 'regular',
  style,
}: IconProps) => {
  const iconSize = getIconSize(size);
  const symbolName = getSymbolName(name); // Map to SF Symbol name

  return (
    <SymbolView
      name={symbolName}
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      style={[
        {
          width: iconSize,
          height: iconSize,
        },
        style,
      ]}
    />
  );
};
```

## Conclusion

**Start with icons in `@groxigo/ui-elements`** - it's the simplest and most consistent with your current architecture. You can always extract to a separate package later if needed.


