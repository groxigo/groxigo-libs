# Component Development Guide

This guide explains how to develop new UI components for `@groxigo/ui-elements` following our established patterns and best practices.

## ⚠️ Critical Web Component Rules

**When developing `.web.tsx` components, you MUST follow these rules:**

1. ✅ **Use `@groxigo/tokens/web`** - Never use `@groxigo/tokens/react-native`
2. ✅ **Use native HTML elements** - Use `createElement` with HTML tags (button, div, h1, p, etc.)
3. ✅ **Use `CSSProperties` type** - Import from `react`, not `react-native`
4. ✅ **Flatten React Native styles** - Convert style objects/arrays to CSSProperties
5. ❌ **Do NOT use React Native components** - No `Pressable`, `View`, `Text` from `react-native`
6. ❌ **Do NOT use `StyleSheet.create()`** - Use plain CSSProperties objects instead

**Example:**
```typescript
// ✅ CORRECT for web
import { createElement } from 'react';
import { tokens } from '@groxigo/tokens/web';
import type { CSSProperties } from 'react';

// ❌ WRONG for web
import { Pressable, View } from 'react-native';
import { tokens } from '@groxigo/tokens/react-native';
```

## Table of Contents

1. [Component Structure](#component-structure)
2. [Platform-Specific Components](#platform-specific-components)
3. [TypeScript Patterns](#typescript-patterns)
4. [Styling Guidelines](#styling-guidelines)
5. [Design Tokens Integration](#design-tokens-integration)
6. [Responsive Sizing](#responsive-sizing)
7. [Best Practices](#best-practices)
8. [Step-by-Step Example](#step-by-step-example)

## Component Structure

Each component should follow this directory structure:

```
elements/
  ComponentName/
    ComponentName.tsx          # Base/fallback implementation
    ComponentName.ios.tsx      # iOS-specific implementation
    ComponentName.android.tsx    # Android-specific implementation
    ComponentName.web.tsx       # Web-specific implementation
    ComponentName.types.ts      # TypeScript type definitions
    ComponentName.styles.ts     # Style generation functions
    index.ts                   # Public exports
```

### File Purposes

- **ComponentName.tsx**: Default implementation used as fallback when platform-specific files don't exist
- **ComponentName.ios.tsx**: iOS-optimized implementation with iOS-specific features
- **ComponentName.android.tsx**: Android-optimized implementation with Material Design patterns
- **ComponentName.web.tsx**: Web-optimized implementation with accessibility and SEO considerations
- **ComponentName.types.ts**: All TypeScript interfaces, types, and prop definitions
- **ComponentName.styles.ts**: Style generation functions using design tokens
- **index.ts**: Exports the component and types for public API

## Platform-Specific Components

### Why Platform-Specific?

React Native automatically resolves platform-specific files:
- On iOS → uses `.ios.tsx` files
- On Android → uses `.android.tsx` files
- On Web → uses `.web.tsx` files
- Fallback → uses base `.tsx` files

This allows us to:
- Optimize for each platform's native behavior
- Avoid React version conflicts (no direct React imports needed)
- Provide platform-specific UX patterns

### Critical Rule: No React Imports

**DO NOT** import React directly in component files:

```typescript
// ❌ WRONG - Don't do this
import React from 'react';
export const Button: React.FC<ButtonProps> = ({ ... }) => { ... }
```

**DO** use React Native components directly:

```typescript
// ✅ CORRECT - Use React Native directly
import { Pressable, View, Text } from 'react-native';
export const Button = ({ ... }: ButtonProps) => { ... }
```

### Platform-Specific Patterns

#### iOS Components

```typescript
import { Pressable, View } from 'react-native';
import { getComponentStyles } from './Component.styles';
import type { ComponentProps } from './Component.types';

/**
 * iOS-specific Component implementation
 * Optimized for iOS native behavior and haptic feedback
 */
export const Component = ({
  variant = 'default',
  ...props
}: ComponentProps) => {
  const styles = getComponentStyles(variant);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.component,
        pressed && !disabled && { opacity: 0.8 },
        style,
      ]}
      onPress={handlePress}
      {...props}
    >
      {/* Component content */}
    </Pressable>
  );
};

export default Component;
```

**iOS Considerations:**
- Use `Pressable` for better iOS haptic feedback
- Leverage `pressed` state for visual feedback
- Consider iOS-specific typography optimizations
- Use native iOS design patterns (e.g., blur effects, native animations)

#### Android Components

```typescript
import { Pressable, View } from 'react-native';
import { getComponentStyles } from './Component.styles';
import type { ComponentProps } from './Component.types';

/**
 * Android-specific Component implementation
 * Uses Material Design patterns and ripple effects
 */
export const Component = ({
  variant = 'default',
  ...props
}: ComponentProps) => {
  const styles = getComponentStyles(variant);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.component,
        pressed && !disabled && { opacity: 0.7 },
        style,
      ]}
      android_ripple={{
        color: 'rgba(255, 255, 255, 0.3)',
        borderless: false,
      }}
      {...props}
    >
      {/* Component content */}
    </Pressable>
  );
};

export default Component;
```

**Android Considerations:**
- Use `android_ripple` prop for Material Design ripple effects
- Consider Android-specific typography (includeFontPadding: false)
- Use Material Design elevation and shadows
- Follow Android accessibility guidelines

#### Web Components

**CRITICAL: Web components must use native HTML elements and web tokens, NOT React Native components.**

```typescript
import { createElement } from 'react';
import { tokens } from '@groxigo/tokens/web';
import type { ComponentProps } from './Component.types';
import type { CSSProperties } from 'react';

/**
 * Web-specific Component implementation
 * Uses native HTML elements for better SEO, accessibility, and performance
 */
// ✅ ALWAYS import the shared flattenStyle utility at the top
import { flattenStyle } from '../../utils/styleHelpers.web';

export const Component = ({
  variant = 'default',
  style,
  ...props
}: ComponentProps) => {
  // The shared flattenStyle utility filters out React Native-specific props
  // (shadow props, TextInput props, etc.)
  
  // Get CSS styles from web tokens
  const getWebStyles = (): CSSProperties => {
    const baseStyle: CSSProperties = {
      // Use web tokens, not react-native tokens
      color: tokens.colors.alias.shared.text.primary,
      // Web-specific optimizations
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
    };

    // Flatten and merge styles properly (filters out shadow props automatically)
    const flattenedStyle = flattenStyle(style);
    
    return {
      ...baseStyle,
      ...flattenedStyle,
    };
  };

  const styles = getWebStyles();

  // ❌ NEVER spread all props directly to DOM elements
  // React Native props like keyboardType, secureTextEntry, shadowColor, etc.
  // will cause React warnings and errors
  
  // ✅ Filter out React Native-specific props or explicitly pass only web-compatible props
  return createElement(
    'button', // or 'div', 'span', etc. - use semantic HTML
    {
      style: styles,
      role: 'button',
      'aria-disabled': disabled,
      'aria-label': props.accessibilityLabel,
      onClick: props.onPress, // Convert onPress to onClick
      // Only pass web-compatible props explicitly
      id: props.id,
      className: props.className,
      // Do NOT spread ...props here!
    },
    children
  );
};

export default Component;
```

**Web Component Rules:**
1. **Always use `@groxigo/tokens/web`** - Never use `@groxigo/tokens/react-native` in web components
2. **Use native HTML elements** - Use `createElement` with native HTML tags (button, div, span, h1, p, etc.)
3. **Do NOT use React Native components** - No `Pressable`, `View`, `Text` from `react-native` in web components
4. **Use shared `flattenStyle` utility** - Always import from `../../utils/styleHelpers.web` to filter React Native-specific props
5. **Filter React Native props** - Never spread `...props` directly to DOM elements; filter out React Native-specific props
6. **Use CSSProperties type** - Import from `react`, not `react-native`
7. **Add semantic HTML** - Use appropriate HTML elements (button, h1-h4, p, small, label, etc.)
8. **Add accessibility attributes** - Include `role`, `aria-*` attributes for better accessibility
9. **Web-specific CSS** - Add web-specific properties (cursor, userSelect, WebkitFontSmoothing, etc.)
10. **Convert React Native props** - Convert React Native props to web equivalents (e.g., `keyboardType` → `type`, `secureTextEntry` → `type="password"`)

**Example: Text Component Web Implementation**
```typescript
import { createElement } from 'react';
import { tokens } from '@groxigo/tokens/web';
import type { TextProps } from './Text.types';
import type { CSSProperties } from 'react';

export const Text = ({ variant = 'body', ...props }: TextProps) => {
  // Map variants to semantic HTML elements
  const getWebComponent = (): 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small' | 'label' => {
    switch (variant) {
      case 'h1': return 'h1';
      case 'h2': return 'h2';
      case 'h3': return 'h3';
      case 'h4': return 'h4';
      case 'caption': return 'small';
      case 'label': return 'label';
      default: return 'p';
    }
  };

  const Component = getWebComponent();
  const styles = getWebStyles(); // Returns CSSProperties

  return createElement(Component, { style: styles, ...props }, children);
};
```

## TypeScript Patterns

### Component Props Interface

```typescript
// ComponentName.types.ts
import { ViewProps, ViewStyle, TextStyle } from 'react-native';

export type ComponentVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ComponentSize = 'sm' | 'md' | 'lg';

export interface ComponentProps extends Omit<ViewProps, 'style'> {
  variant?: ComponentVariant;
  size?: ComponentSize;
  section?: 'groceries' | 'recipes' | 'default';
  disabled?: boolean;
  style?: ViewStyle;
  children: React.ReactNode;
}
```

### Component Implementation

```typescript
// ComponentName.ios.tsx (or .android.tsx, .web.tsx)
import { View } from 'react-native';
import { getComponentStyles } from './Component.styles';
import type { ComponentProps } from './Component.types';

export const Component = ({
  variant = 'default',
  size = 'md',
  section = 'default',
  disabled = false,
  children,
  style,
  ...props
}: ComponentProps) => {
  const styles = getComponentStyles(variant, size, section);

  return (
    <View style={[styles.component, style]} {...props}>
      {children}
    </View>
  );
};

export default Component;
```

**Key Points:**
- Use explicit type annotations: `({ ... }: ComponentProps) => { ... }`
- **DO NOT** use `React.FC<Props>` - it's not needed and causes React version conflicts
- Extend React Native prop types (e.g., `ViewProps`, `TextProps`) for base props
- Use `Omit<>` to exclude conflicting props when extending

## Styling Guidelines

### Style Generation Functions

```typescript
// ComponentName.styles.ts
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { tokens } from '@groxigo/tokens/react-native';
import type { ComponentVariant, ComponentSize, ComponentSection } from './Component.types';

// Size constants following 8px grid system
const COMPONENT_HEIGHTS: Record<ComponentSize, number> = {
  sm: 32,  // 4 × 8px
  md: 40,  // 5 × 8px
  lg: 48,  // 6 × 8px
};

export const getComponentStyles = (
  variant: ComponentVariant = 'primary',
  size: ComponentSize = 'md',
  section: ComponentSection = 'default'
): {
  component: ViewStyle;
  text: TextStyle;
} => {
  // Get section-specific colors
  const getSectionColors = () => {
    if (section === 'groceries') {
      return tokens.colors.alias.groceries;
    }
    if (section === 'recipes') {
      return tokens.colors.alias.recipes;
    }
    return tokens.colors.alias.shared;
  };

  const sectionColors = getSectionColors();

  const variantStyles: Record<ComponentVariant, ViewStyle> = {
    primary: {
      backgroundColor: sectionColors.primary.default,
    },
    secondary: {
      backgroundColor: sectionColors.secondary.default,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: sectionColors.primary.default,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
  };

  return StyleSheet.create({
    component: {
      height: COMPONENT_HEIGHTS[size],
      borderRadius: tokens.radius.md,
      ...variantStyles[variant],
    },
    text: {
      fontSize: tokens.typography.fontSize.base,
      color: tokens.colors.alias.shared.text.primary,
    },
  });
};
```

**Styling Best Practices:**
- **iOS/Android**: Always use design tokens from `@groxigo/tokens/react-native`
- **Web**: Always use design tokens from `@groxigo/tokens/web` (NOT react-native)
- Follow the 8px grid system for spacing and sizing
- Use `StyleSheet.create()` for iOS/Android (React Native)
- Use plain CSSProperties objects for Web (native HTML)
- Support section-specific theming (groceries, recipes, default)
- Make styles responsive to variant, size, and section props
- **Implement responsive sizing** for platform-specific optimizations
- Use responsive utilities from `utils/responsive` for consistent sizing
- Add `platform` parameter to style functions for responsive behavior

## Design Tokens Integration

### Importing Tokens

**Platform-Specific Token Imports:**

```typescript
// For iOS and Android components
import { tokens } from '@groxigo/tokens/react-native';

// For Web components (CRITICAL: Use web, not react-native)
import { tokens } from '@groxigo/tokens/web';
```

**Important:** Web components MUST use `@groxigo/tokens/web` to avoid React Native style conflicts and ensure proper CSS property conversion.

### Available Token Categories

- **Colors**: `tokens.colors.alias.shared`, `tokens.colors.alias.groceries`, `tokens.colors.alias.recipes`, `tokens.colors.alias.glass`
- **Spacing**: `tokens.spacing[0]` through `tokens.spacing[16]` (8px grid)
- **Typography**: `tokens.typography.fontSize`, `tokens.typography.fontWeight`, `tokens.typography.fontFamily`
- **Radius**: `tokens.radius.sm`, `tokens.radius.md`, `tokens.radius.lg`, `tokens.radius.full`
- **Shadows**: `tokens.shadows.sm`, `tokens.shadows.md`, `tokens.shadows.lg`, `tokens.shadows.glassSm`, etc.
- **Opacity**: `tokens.opacity.*`
- **Blur**: `tokens.blur.sm`, `tokens.blur.md`, `tokens.blur.lg`, `tokens.blur.xl`

### Using Tokens in Components

```typescript
const styles = StyleSheet.create({
  container: {
    padding: tokens.spacing[4],        // 32px (4 × 8px)
    borderRadius: tokens.radius.lg,     // Large border radius
    backgroundColor: tokens.colors.alias.shared.surface.primary,
    shadowColor: tokens.colors.groxigo.gray[900], // Use token colors, not '#000'
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: tokens.opacity['10'], // Use opacity tokens, not 0.1
    shadowRadius: 8,
    elevation: 3, // Android shadow
  },
  text: {
    fontSize: tokens.typography.fontSize.base,
    fontWeight: tokens.typography.fontWeight.medium,
    color: tokens.colors.alias.shared.text.primary,
  },
});
```

### ⚠️ Critical: Always Use Tokens, Never Hardcode Values

**ALWAYS use design tokens instead of hardcoded values.** This ensures consistency, maintainability, and proper theming across the design system.

#### ❌ Common Hardcoded Values to Avoid

**Opacity Values:**
```typescript
// ❌ WRONG - Hardcoded opacity
opacity: 0.5,
opacity: 0.7,
opacity: 0.8,
shadowOpacity: 0.1,

// ✅ CORRECT - Use opacity tokens
opacity: tokens.opacity['50'],
opacity: tokens.opacity['70'],
opacity: tokens.opacity['80'],
shadowOpacity: tokens.opacity['10'],
```

**Spacing Values:**
```typescript
// ❌ WRONG - Hardcoded spacing
marginRight: 4,
padding: '4px',
gap: '8px',

// ✅ CORRECT - Use spacing tokens
marginRight: tokens.spacing[1],  // 4px
padding: `${tokens.spacing[1]}px`,  // 4px
gap: `${tokens.spacing[2]}px`,  // 8px
```

**Color Values:**
```typescript
// ❌ WRONG - Hardcoded colors
backgroundColor: '#000',
color: 'rgba(255, 255, 255, 0.3)',
shadowColor: '#000000',
rippleColor: 'rgba(0, 0, 0, 0.1)',

// ✅ CORRECT - Use color tokens
backgroundColor: tokens.colors.groxigo.gray[900],
color: tokens.colors.alias.glass.overlay.medium,  // rgba(255, 255, 255, 0.3)
shadowColor: tokens.colors.groxigo.gray[900],
rippleColor: tokens.colors.alias.glass.overlay.dark,  // rgba(0, 0, 0, 0.2)
```

**Border Width:**
```typescript
// ❌ WRONG - Hardcoded border width (if not standard)
borderWidth: 2,

// ✅ CORRECT - Standard 1px is acceptable, but consider tokens if you have them
borderWidth: 1,  // Standard, acceptable
// Or use a token if border width tokens exist
```

#### ✅ Token Usage Examples

**Button Component:**
```typescript
// Button.styles.ts
export const getButtonStyles = (variant, size, section) => {
  return StyleSheet.create({
    button: {
      height: BUTTON_HEIGHTS[size],  // Component-specific constants are OK
      paddingHorizontal: tokens.spacing[2],  // Use tokens for spacing
      borderRadius: tokens.radius.md,  // Use tokens for radius
      backgroundColor: sectionColors.primary,  // Use section colors
    },
    disabled: {
      opacity: tokens.opacity['50'],  // ✅ Use opacity token
    },
  });
};

// Button.ios.tsx
<Pressable
  style={({ pressed }) => [
    styles.button,
    pressed && !isDisabled && { opacity: tokens.opacity['80'] },  // ✅ Use opacity token
  ]}
/>
```

**Card Component:**
```typescript
// Card.styles.ts
elevated: {
  backgroundColor: tokens.colors.alias.shared.surface.primary,
  shadowColor: tokens.colors.groxigo.gray[900],  // ✅ Use token color
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: tokens.opacity['10'],  // ✅ Use opacity token
  shadowRadius: 4,
  elevation: 3,
},
```

**Android Ripple Effect:**
```typescript
// Button.android.tsx
android_ripple={{
  // ✅ Use glass overlay tokens for ripple colors
  color: variant === 'primary' || variant === 'secondary' || variant === 'danger'
    ? tokens.colors.alias.glass.overlay.medium  // rgba(255, 255, 255, 0.3)
    : tokens.colors.alias.glass.overlay.dark,   // rgba(0, 0, 0, 0.2)
  borderless: false,
}}
```

**Web Components:**
```typescript
// Component.web.tsx
import { tokens } from '@groxigo/tokens/web';  // ✅ Use web tokens

const styles = {
  container: {
    padding: `${tokens.spacing[4]}px`,  // ✅ Use spacing tokens
    borderRadius: `${tokens.radius.lg}px`,  // ✅ Use radius tokens
    backgroundColor: tokens.colors.alias.shared.surface.primary,  // ✅ Use color tokens
    opacity: tokens.opacity['50'],  // ✅ Use opacity tokens
  },
};
```

#### 📋 Token Checklist

Before committing code, verify:
- [ ] All opacity values use `tokens.opacity['XX']`
- [ ] All spacing values use `tokens.spacing[X]`
- [ ] All colors use `tokens.colors.*` (no hex codes or rgba strings)
- [ ] All border radius values use `tokens.radius.*`
- [ ] All font sizes use `tokens.typography.fontSize.*`
- [ ] All font weights use `tokens.typography.fontWeight.*`
- [ ] Shadow colors use token colors (not `'#000'`)
- [ ] Shadow opacity uses `tokens.opacity.*`

#### 🎯 Benefits of Using Tokens

1. **Consistency**: All components use the same design values
2. **Maintainability**: Change tokens once, update everywhere
3. **Theming**: Easy to switch between themes (groceries, recipes, glass)
4. **Type Safety**: TypeScript autocomplete for all token values
5. **Design System Alignment**: Components automatically follow design system updates

#### ⚠️ Exceptions

**Acceptable Hardcoded Values:**

1. **Standard Values:**
   - Standard `borderWidth: 1` (universal standard)
   - CSS transition durations like `'0.2s'` (could be tokenized later if needed)
   - Material Design elevation values (e.g., `elevation: 3`)

2. **Component-Specific Dimensions:**
   - Component heights (e.g., `BUTTON_HEIGHTS: { sm: 32, md: 40, lg: 48 }`) that follow the 8px grid
   - These represent component sizes, not spacing between elements
   - Document with token references where applicable

3. **Responsive Sizing Adjustments:**
   - Padding values that use tokens as base with small adjustments (e.g., `tokens.spacing[3] + 2`)
   - These are necessary for responsive sizing that doesn't align perfectly with the 4px spacing scale
   - **Always document** why the adjustment is needed and reference the base token

4. **Design Constraints:**
   - Component-specific width constraints (e.g., `SEARCHBAR_MAX_WIDTH = 600`)
   - These are design decisions, not spacing values
   - Acceptable as constants with clear documentation

5. **Platform-Specific Values:**
   - Values that don't have token equivalents (e.g., shadow offset, shadow radius)
   - Use tokens where possible (e.g., `shadowOffset: { height: tokens.spacing[1] / 2 }`)

**Documentation Requirements for Hardcoded Values:**

When using hardcoded values, always:
1. **Add comments** explaining why tokens aren't used
2. **Reference tokens** in comments where applicable
3. **Follow grid system** (8px for dimensions, 4px for spacing)
4. **Use tokens as base** when possible (e.g., `tokens.spacing[X] + adjustment`)

**Example of Well-Documented Hardcoded Values:**
```typescript
// Web responsive sizing - Slightly larger for better clickability
// Note: These are component-specific dimensions following 8px grid
// Some values (14px, 18px, 26px) don't align with spacing tokens
// but are necessary for responsive sizing adjustments
const BUTTON_HEIGHTS: Record<ButtonSize, number> = {
  sm: 36,  // 4.5 × 8px (+4px from mobile) - tokens.spacing[8] + 4
  md: 44,  // 5.5 × 8px (+4px from mobile) - tokens.spacing[10] + 4
  lg: 52,  // 6.5 × 8px (+4px from mobile) - tokens.spacing[12] + 4
};

// Web responsive padding - Use tokens where possible
const BUTTON_PADDING_HORIZONTAL: Record<ButtonSize, number> = {
  sm: tokens.spacing[3] + 2,  // 14px (tokens.spacing[3] = 12px + 2px)
  md: tokens.spacing[4] + 2,  // 18px (tokens.spacing[4] = 16px + 2px)
  lg: tokens.spacing[6] + 2,  // 26px (tokens.spacing[6] = 24px + 2px)
};
```

**When in doubt, use a token!**

## Responsive Sizing

### Overview

Components should adapt their sizes based on the platform to provide optimal user experience:
- **Mobile (375px+)**: Optimized for touch interactions with appropriate touch targets
- **Web (up to 1440px)**: Slightly larger sizes for better mouse/keyboard interaction and visual hierarchy

### Grid System

- **Base Unit**: 4px (for spacing scale)
- **Component Grid**: 8px (for component dimensions)
- **Responsive Strategy**: Adaptive sizing - different base sizes per platform

### Breakpoints

Use breakpoints from `@groxigo/tokens/breakpoints`:

```typescript
import { tokens } from '@groxigo/tokens/react-native';

// Available breakpoints
tokens.breakpoints.mobile    // 375px
tokens.breakpoints.tablet    // 768px
tokens.breakpoints.desktop   // 1024px
tokens.breakpoints.large     // 1440px
```

### Responsive Utilities

Use responsive sizing utilities from `@groxigo/ui-elements/utils/responsive`:

```typescript
import { 
  getButtonHeight, 
  getInputHeight, 
  getPaddingHorizontal,
  getPaddingVertical,
  getContainerPadding,
  getComponentGap,
  getSectionSpacing
} from '../../utils/responsive';
import { Platform } from 'react-native';

// Detect platform
const platform = Platform.OS === 'web' ? 'web' : 'mobile';

// Get responsive sizes
const buttonHeight = getButtonHeight('md', platform); // 40px mobile, 44px web
const inputHeight = getInputHeight('md', platform);   // 40px mobile, 48px web
const padding = getContainerPadding(platform);        // 16px mobile, 24px web
```

### Implementing Responsive Sizing

#### 1. Update Style Functions

Add a `platform` parameter to your style functions:

```typescript
// Component.styles.ts
import { Platform } from 'react-native';
import { getButtonHeight, getPaddingHorizontal } from '../../utils/responsive';

export const getComponentStyles = (
  variant: ComponentVariant = 'default',
  size: ComponentSize = 'md',
  section: ComponentSection = 'default',
  platform?: 'mobile' | 'web'
) => {
  // Auto-detect platform if not provided
  const detectedPlatform = platform || (Platform.OS === 'web' ? 'web' : 'mobile');
  
  // Use responsive utilities
  const height = getButtonHeight(size, detectedPlatform);
  const paddingHorizontal = getPaddingHorizontal(size, detectedPlatform);
  
  return StyleSheet.create({
    component: {
      height,
      paddingHorizontal,
      // ... other styles
    },
  });
};
```

#### 2. Update Component Files

Pass the platform parameter from component files:

```typescript
// Component.tsx (base/mobile)
import { Platform } from 'react-native';

export const Component = ({ ... }: ComponentProps) => {
  const platform = Platform.OS === 'web' ? 'web' : 'mobile';
  const styles = getComponentStyles(variant, size, section, platform);
  // ...
};

// Component.web.tsx
export const Component = ({ ... }: ComponentProps) => {
  const styles = getComponentStyles(variant, size, section, 'web');
  // ...
};
```

#### 3. Web-Specific Styles

For web components, use responsive sizing in `.styles.web.ts`:

```typescript
// Component.styles.web.ts
import { tokens } from '@groxigo/tokens/web';

// Web responsive sizing - Slightly larger for better usability
// Note: These are component-specific dimensions following 8px grid
const COMPONENT_HEIGHTS: Record<ComponentSize, number> = {
  sm: 36,  // 4.5 × 8px (+4px from mobile)
  md: 44,  // 5.5 × 8px (+4px from mobile)
  lg: 52,  // 6.5 × 8px (+4px from mobile)
};

// Web responsive padding - Use tokens where possible
const COMPONENT_PADDING: Record<ComponentSize, number> = {
  sm: tokens.spacing[3] + 2,  // 14px (tokens.spacing[3] = 12px + 2px)
  md: tokens.spacing[4] + 2,  // 18px (tokens.spacing[4] = 16px + 2px)
  lg: tokens.spacing[6] + 2,  // 26px (tokens.spacing[6] = 24px + 2px)
};
```

### Responsive Sizing Patterns

#### Interactive Elements (Buttons, Inputs)

- **Mobile**: Use base sizes (32/40/48px for buttons, 36/40/48px for inputs)
- **Web**: Increase by 4-8px for better clickability/usability
- **Padding**: Use tokens as base, add small adjustments for responsive sizing

#### Container Components (Cards, Containers)

- **Mobile**: Use standard padding (16/24/32px)
- **Web**: Increase padding by 4-8px for better breathing room
- **Max Width**: Use `tokens.breakpoints.large` (1440px) for web

#### Display Components (Badges, Avatars, Icons)

- **Mobile**: Base sizes
- **Web**: Small increments (+2-4px) for better visibility
- **Consistent**: Some display components remain consistent across platforms

### Container Component

Use the `Container` component for responsive layout:

```typescript
import { Container } from '@groxigo/ui-elements';

<Container maxWidth={tokens.breakpoints.large} minWidth={tokens.breakpoints.mobile}>
  <Card padding="md">
    <Text>Content here</Text>
  </Card>
</Container>
```

**Container Features:**
- Max width: 1440px (web), unlimited (mobile)
- Min width: 375px (both platforms)
- Responsive padding: 24px (web), 16px (mobile)
- Auto-centering on web
- Horizontal scroll for screens <375px

### Responsive Sizing Checklist

When implementing responsive sizing:

- [ ] Use responsive utilities from `utils/responsive`
- [ ] Add `platform` parameter to style functions
- [ ] Pass platform from component files
- [ ] Use tokens for spacing values
- [ ] Document any hardcoded values that don't align with tokens
- [ ] Test on mobile (375px) and web (up to 1440px)
- [ ] Verify touch targets on mobile (min 44×44px)
- [ ] Verify click targets on web (comfortable mouse interaction)

### Common Responsive Patterns

#### Pattern 1: Component Heights

```typescript
// Use responsive utilities
const height = getButtonHeight(size, platform);
// Mobile: 32/40/48px, Web: 36/44/52px
```

#### Pattern 2: Padding Values

```typescript
// Use tokens with small adjustments for responsive sizing
const paddingHorizontal = platform === 'web'
  ? tokens.spacing[3] + 2  // 14px (12px + 2px)
  : tokens.spacing[3];     // 12px
```

#### Pattern 3: Container Constraints

```typescript
// Use breakpoint tokens
const maxWidth = platform === 'web' 
  ? tokens.breakpoints.large  // 1440px
  : undefined;                // Full width on mobile

const padding = platform === 'web'
  ? tokens.spacing[6]  // 24px
  : tokens.spacing[4]; // 16px
```

### Documentation Requirements

When using hardcoded values for responsive sizing:

1. **Document why**: Explain why the value doesn't align with tokens
2. **Use tokens as base**: Start with tokens and add adjustments
3. **Add comments**: Include token references in comments
4. **Follow grid**: Ensure values align with 8px grid system

**Example:**
```typescript
// Web responsive padding - Slightly larger
// Note: Some padding values use spacing tokens where possible
const BUTTON_PADDING_HORIZONTAL: Record<ButtonSize, number> = {
  sm: tokens.spacing[3] + 2,  // 14px (tokens.spacing[3] = 12px + 2px)
  md: tokens.spacing[4] + 2,  // 18px (tokens.spacing[4] = 16px + 2px)
  lg: tokens.spacing[6] + 2,  // 26px (tokens.spacing[6] = 24px + 2px)
};
```

### Reference Documents

- **`RESPONSIVE_SIZING.md`**: Complete responsive sizing guidelines
- **`COMPONENT_SIZING_REFERENCE.md`**: Detailed component size tables
- **`utils/responsive.ts`**: Responsive sizing utility functions

## Best Practices

### 1. Component Composition

- Keep components small and focused
- Compose complex components from simpler ones
- Use the `Text` component from `@groxigo/ui-elements` for all text rendering
- Reuse existing components rather than duplicating functionality

### 2. Accessibility

- Add `accessibilityLabel` props where appropriate
- Use semantic HTML elements on web (via Text component variants)
- Ensure proper contrast ratios using design tokens
- Support screen readers with proper ARIA attributes (web)

### 3. Performance

- **iOS/Android**: Use `StyleSheet.create()` for all styles
- **Web**: Use plain CSSProperties objects (no StyleSheet needed)
- Memoize expensive computations if needed
- Avoid inline style objects in render
- Use `useMemo` or `useCallback` only when necessary (hooks are fine, just don't import React)

### 4. Section Theming

Components should support section-based theming:

```typescript
import { useSection } from '../../hooks/useSection';

export const Component = ({ section, ...props }: ComponentProps) => {
  const contextSection = useSection();
  const activeSection = section || contextSection; // Use prop or context
  
  const styles = getComponentStyles(variant, size, activeSection);
  // ...
};
```

### 5. Responsive Sizing

Always implement responsive sizing for new components:

```typescript
import { Platform } from 'react-native';
import { getButtonHeight, getPaddingHorizontal } from '../../utils/responsive';

export const Component = ({ size = 'md', ...props }: ComponentProps) => {
  const platform = Platform.OS === 'web' ? 'web' : 'mobile';
  const styles = getComponentStyles(variant, size, section, platform);
  // ...
};
```

**Key Points:**
- Use responsive utilities from `utils/responsive`
- Add `platform` parameter to style functions
- Test on both mobile (375px) and web (up to 1440px)
- Maintain 8px grid alignment
- Use tokens for spacing values

### 6. Error Handling

- Provide sensible defaults for all optional props
- Validate prop combinations when necessary
- Use TypeScript to catch errors at compile time

### 7. Documentation

- Add JSDoc comments explaining component purpose
- Document platform-specific behavior
- Include usage examples in comments
- Note any accessibility considerations

## Step-by-Step Example

Let's create a new `Chip` component following all the patterns:

### 1. Create Directory Structure

```bash
mkdir -p elements/Chip
cd elements/Chip
touch Chip.types.ts Chip.styles.ts Chip.tsx Chip.ios.tsx Chip.android.tsx Chip.web.tsx index.ts
```

### 2. Define Types (`Chip.types.ts`)

```typescript
import { ViewProps, ViewStyle, TextStyle } from 'react-native';

export type ChipVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ChipSize = 'sm' | 'md';

export interface ChipProps extends Omit<ViewProps, 'style'> {
  variant?: ChipVariant;
  size?: ChipSize;
  section?: 'groceries' | 'recipes' | 'default';
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}
```

### 3. Create Styles (`Chip.styles.ts`)

```typescript
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { tokens } from '@groxigo/tokens/react-native';
import type { ChipVariant, ChipSize, ChipSection } from './Chip.types';

const CHIP_HEIGHTS: Record<ChipSize, number> = {
  sm: 24,
  md: 32,
};

export const getChipStyles = (
  variant: ChipVariant = 'primary',
  size: ChipSize = 'md',
  section: ChipSection = 'default',
  selected = false
): {
  chip: ViewStyle;
  text: TextStyle;
} => {
  const getSectionColors = () => {
    if (section === 'groceries') {
      return tokens.colors.alias.groceries;
    }
    if (section === 'recipes') {
      return tokens.colors.alias.recipes;
    }
    return tokens.colors.alias.shared;
  };

  const sectionColors = getSectionColors();

  const variantStyles: Record<ChipVariant, ViewStyle> = {
    primary: {
      backgroundColor: selected 
        ? sectionColors.primary.default 
        : sectionColors.primary.subtle,
    },
    secondary: {
      backgroundColor: sectionColors.secondary.default,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: sectionColors.primary.default,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
  };

  return StyleSheet.create({
    chip: {
      height: CHIP_HEIGHTS[size],
      paddingHorizontal: tokens.spacing[2],
      borderRadius: tokens.radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      ...variantStyles[variant],
    },
    text: {
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.medium,
      color: variant === 'outline' || variant === 'ghost'
        ? sectionColors.primary.default
        : tokens.colors.alias.shared.text.inverse,
    },
  });
};
```

### 4. Create Platform-Specific Implementations

**Chip.ios.tsx:**
```typescript
import { Pressable } from 'react-native';
import { getChipStyles } from './Chip.styles';
import { Text } from '../Text';
import { useSection } from '../../hooks/useSection';
import type { ChipProps } from './Chip.types';

/**
 * iOS-specific Chip implementation
 */
export const Chip = ({
  variant = 'primary',
  size = 'md',
  section,
  selected = false,
  onPress,
  children,
  style,
  textStyle,
  ...props
}: ChipProps) => {
  const contextSection = useSection();
  const activeSection = section || contextSection;
  const styles = getChipStyles(variant, size, activeSection, selected);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.chip,
        pressed && { opacity: 0.8 },
        style,
      ]}
      onPress={onPress}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text
          variant="caption"
          weight="medium"
          style={[styles.text, textStyle]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

export default Chip;
```

**Chip.android.tsx:** (similar but with `android_ripple`)

**Chip.web.tsx:**
```typescript
import { createElement } from 'react';
import { tokens } from '@groxigo/tokens/web';
import { Text } from '../Text';
import { useSection } from '../../hooks/useSection';
import type { ChipProps } from './Chip.types';
import type { CSSProperties } from 'react';

/**
 * Web-specific Chip implementation
 * Uses native HTML button element for better accessibility
 */
export const Chip = ({
  variant = 'primary',
  size = 'md',
  section,
  selected = false,
  onPress,
  children,
  style,
  textStyle,
  ...props
}: ChipProps) => {
  const contextSection = useSection();
  const activeSection = section || contextSection;

  // Convert React Native style to CSS properties
  const flattenStyle = (style: any): CSSProperties => {
    if (!style) return {};
    if (Array.isArray(style)) {
      return Object.assign({}, ...style.map(flattenStyle));
    }
    if (typeof style === 'object') {
      const cssStyle: CSSProperties = {};
      for (const key in style) {
        if (style.hasOwnProperty(key)) {
          cssStyle[key as keyof CSSProperties] = style[key];
        }
      }
      return cssStyle;
    }
    return {};
  };

  // Get CSS styles from web tokens
  const getWebStyles = (): CSSProperties => {
    const sectionColors = activeSection === 'groceries'
      ? tokens.colors.alias.groceries
      : activeSection === 'recipes'
      ? tokens.colors.alias.recipes
      : tokens.colors.alias.shared;

    const baseStyle: CSSProperties = {
      padding: `${tokens.spacing[1]}px ${tokens.spacing[2]}px`,
      borderRadius: tokens.radius.full,
      border: 'none',
      cursor: onPress ? 'pointer' : 'default',
      userSelect: 'none',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    };

    const variantStyles: Record<string, CSSProperties> = {
      primary: {
        backgroundColor: sectionColors.primary.default,
        color: tokens.colors.alias.shared.text.inverse,
      },
      secondary: {
        backgroundColor: sectionColors.secondary.default,
        color: tokens.colors.alias.shared.text.inverse,
      },
      outline: {
        backgroundColor: 'transparent',
        border: `1px solid ${sectionColors.primary.default}`,
        color: sectionColors.primary.default,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: sectionColors.primary.default,
      },
    };

    const flattenedStyle = flattenStyle(style);

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...flattenedStyle,
    };
  };

  const styles = getWebStyles();

  return createElement(
    'button',
    {
      style: styles,
      onClick: onPress,
      role: 'button',
      'aria-pressed': selected,
      ...props,
    },
    typeof children === 'string' ? (
      createElement(Text, {
        variant: 'caption',
        weight: 'medium',
        style: textStyle,
      }, children)
    ) : (
      children
    )
  );
};

export default Chip;
```

**Chip.tsx:** (fallback implementation - can use React Native components)

### 5. Create Index File (`index.ts`)

```typescript
export { Chip } from './Chip';
export type { ChipProps, ChipVariant, ChipSize } from './Chip.types';
export default Chip;
```

### 6. Export from Main Index

Add to `src/index.ts`:

```typescript
export * from './elements/Chip';
```

## Common Patterns

### Handling Children

```typescript
// If component accepts string or ReactNode
{typeof children === 'string' ? (
  <Text variant="body" style={styles.text}>
    {children}
  </Text>
) : (
  children
)}
```

### Conditional Styling

```typescript
<Pressable
  style={({ pressed }) => [
    styles.component,
    disabled && styles.disabled,
    pressed && !disabled && { opacity: 0.8 },
    style,
  ]}
>
```

### Section Theming

```typescript
const contextSection = useSection();
const activeSection = section || contextSection;
const styles = getComponentStyles(variant, size, activeSection);
```

## Testing Checklist

Before considering a component complete:

- [ ] All platform-specific files created (ios, android, web, base)
- [ ] No React imports (only React Native imports)
- [ ] TypeScript types properly defined
- [ ] Styles use design tokens (with documented exceptions)
- [ ] Responsive sizing implemented (platform parameter in styles)
- [ ] Section theming supported
- [ ] Accessibility attributes added (web)
- [ ] Platform-specific optimizations implemented
- [ ] Component exported from index.ts
- [ ] Added to main package exports
- [ ] Tested on iOS, Android, and Web
- [ ] Tested at mobile width (375px) and web width (up to 1440px)
- [ ] Touch targets verified on mobile (min 44×44px)
- [ ] Click targets verified on web (comfortable mouse interaction)

## Troubleshooting

### React Version Conflicts

**Problem:** `Cannot read property 'useMemoCache' of null`

**Solution:** 
- Ensure no `import React from 'react'` in component files
- Use only React Native imports
- Check Metro config resolves React correctly

### Type Errors

**Problem:** TypeScript errors about implicit `any` types

**Solution:**
- Use explicit type annotations: `({ ... }: ComponentProps) => { ... }`
- Don't use `React.FC<Props>` - use direct function components

### Platform-Specific File Not Loading

**Problem:** Platform-specific implementation not being used

**Solution:**
- Ensure file naming is correct: `Component.ios.tsx`, `Component.android.tsx`, `Component.web.tsx`
- Clear Metro cache: `npx expo start --clear`
- Check Metro config includes source files in watchFolders

### Web Component Warnings: Shadow Props Deprecation

**Problem:** `"shadow*" style props are deprecated. Use "boxShadow".`

**Solution:**
- **Always use the shared `flattenStyle` utility** from `../../utils/styleHelpers.web`
- Never create local `flattenStyle` functions that don't filter shadow props
- The shared utility automatically filters out: `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`, `elevation`
- Use `tokens.shadows.md` (or other shadow tokens) for `boxShadow` instead of React Native shadow props

**Example Fix:**
```typescript
// ❌ WRONG - Local flattenStyle doesn't filter shadow props
const flattenStyle = (style: any): CSSProperties => {
  const cssStyle: CSSProperties = {};
  for (const key in style) {
    cssStyle[key as keyof CSSProperties] = style[key]; // Includes shadow props!
  }
  return cssStyle;
};

// ✅ CORRECT - Use shared utility
import { flattenStyle } from '../../utils/styleHelpers.web';
// Automatically filters shadow props and other React Native-specific props
```

### Web Component Errors: React Native Props on DOM Elements

**Problem:** `React does not recognize the '%s' prop on a DOM element` (e.g., `secureTextEntry`, `keyboardType`, `numberOfLines`)

**Solution:**
- **Never spread `...props` directly to DOM elements** in web components
- Filter out React Native-specific props before passing to DOM elements
- Convert React Native props to web equivalents:
  - `secureTextEntry` → `type="password"`
  - `keyboardType="email-address"` → `type="email"`
  - `keyboardType="phone-pad"` → `type="tel"`
  - `keyboardType="number-pad"` → `type="number"`
  - `onPress` → `onClick`
- Use the `filterReactNativeProps` utility from `styleHelpers.web.ts` if needed

**Example Fix:**
```typescript
// ❌ WRONG - Spreading all props includes React Native-specific props
return createElement('input', {
  type: 'text',
  ...props, // Includes secureTextEntry, keyboardType, etc. - causes errors!
});

// ✅ CORRECT - Explicitly pass only web-compatible props
return createElement('input', {
  type: props.secureTextEntry ? 'password' : 
        props.keyboardType === 'email-address' ? 'email' :
        props.keyboardType === 'phone-pad' ? 'tel' : 'text',
  value: props.value,
  onChange: (e) => props.onChangeText?.(e.target.value),
  onFocus: props.onFocus,
  onBlur: props.onBlur,
  disabled: props.editable === false,
  maxLength: props.maxLength,
  id: props.id,
  name: props.name,
  'aria-label': props.accessibilityLabel,
  // Do NOT include: keyboardType, numberOfLines, returnKeyType, textContentType, multiline
});
```

### Common React Native Props to Filter

When creating web components, these React Native props should **never** be passed to DOM elements:

**Shadow Props (use `boxShadow` from tokens instead):**
- `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`, `elevation`

**TextInput Props:**
- `keyboardType` → Convert to HTML `type` attribute
- `secureTextEntry` → Convert to `type="password"`
- `numberOfLines` → Not applicable for input (only textarea)
- `returnKeyType` → Not applicable for web
- `textContentType` → iOS-specific, not applicable for web
- `multiline` → Not applicable for input
- `editable` → Use `disabled` attribute instead
- `placeholderTextColor` → Use CSS `::placeholder` pseudo-element
- `onChangeText` → Convert to `onChange` handler
- `autoCapitalize`, `autoCorrect`, `autoComplete` → Use HTML attributes (some are valid)

**Other React Native Props:**
- `overlayColor`, `tintColor` → Not applicable for web

**Always use the shared `flattenStyle` utility** which automatically filters these props.

## Additional Resources

- [React Native Platform-Specific Code](https://reactnative.dev/docs/platform-specific-code)
- [Design Tokens Documentation](../tokens/README.md)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Native Styling](https://reactnative.dev/docs/style)

---

**Remember:** The key to avoiding React version conflicts is to **never import React directly** in component files. Use React Native components exclusively, and let React Native handle the React dependency internally.

