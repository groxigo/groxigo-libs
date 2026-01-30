# Glass Theme Analysis & Implementation Plan

## Current Token Structure Analysis

### Existing Token Architecture
The token system follows a **three-tier architecture**:

1. **Groxigo Tier (Primitives)** - Raw color values (gray, blue, green, red, yellow)
2. **Alias Tier (Semantic)** - Meaningful names mapped from primitives
   - `shared` - Used across entire app
   - `groceries` - Blue theme section
   - `recipes` - Green theme section
3. **Mapped Tier (Components)** - Component-specific tokens
   - Maps aliases to specific UI components (button, card, badge, etc.)

### Current Token Files
- `colors.ts` - Color tokens (three tiers)
- `spacing.ts` - Spacing scale (4px base unit)
- `typography.ts` - Font families, sizes, weights
- `shadows.ts` - Shadow definitions for elevation
- `radius.ts` - Border radius values
- `opacity.ts` - Opacity scale (0-100%)

## Apple's Glass Theme (Liquid Glass Design)

### Key Characteristics
Based on Apple's macOS 26.1 "Tahoe" Liquid Glass Design:

1. **Semi-transparent surfaces** - Backgrounds with opacity (typically 70-90%)
2. **Backdrop blur** - Frosted glass effect using blur filters
3. **Subtle borders** - Light, semi-transparent borders (white with low opacity)
4. **Soft shadows** - More diffused, lighter shadows than traditional elevation
5. **Reflective quality** - Surfaces that reflect/refract background content

### Design Principles
- **Transparency**: 70-90% opacity for glass surfaces
- **Blur**: 10-40px backdrop blur for depth
- **Borders**: White/light borders at 10-30% opacity
- **Shadows**: Softer, more diffused than standard shadows
- **Colors**: Light, neutral backgrounds (white/gray with opacity)

## Proposed Glass Theme Integration

### 1. New Token File: `blur.ts`
Create blur tokens for backdrop filter effects:

```typescript
export const blur = {
  none: 0,
  sm: 10,    // Subtle blur
  md: 20,    // Medium blur (default for glass)
  lg: 30,    // Strong blur
  xl: 40,    // Maximum blur
} as const;
```

**Platform Considerations:**
- **Web**: Uses CSS `backdrop-filter: blur()`
- **React Native**: Uses `BlurView` from `@react-native-community/blur` or `expo-blur`
- **iOS**: Native `UIVisualEffectView` with blur
- **Android**: Requires `BlurView` library

### 2. Glass Alias Colors (`colors.ts`)
Add glass-specific color aliases:

```typescript
export const aliasGlass = {
  surface: {
    // Glass surfaces with opacity
    primary: 'rgba(255, 255, 255, 0.8)',      // 80% white
    secondary: 'rgba(255, 255, 255, 0.7)',   // 70% white
    tertiary: 'rgba(255, 255, 255, 0.6)',    // 60% white
    dark: 'rgba(0, 0, 0, 0.3)',               // Dark glass variant
  },
  border: {
    // Semi-transparent borders
    light: 'rgba(255, 255, 255, 0.3)',
    default: 'rgba(255, 255, 255, 0.2)',
    subtle: 'rgba(255, 255, 255, 0.1)',
  },
  overlay: {
    // Overlay colors for glass effects
    light: 'rgba(255, 255, 255, 0.5)',
    medium: 'rgba(255, 255, 255, 0.3)',
    dark: 'rgba(0, 0, 0, 0.2)',
  },
} as const;
```

### 3. Glass Shadows (`shadows.ts`)
Add glass-specific shadow variants:

```typescript
export const shadows = {
  // ... existing shadows
  glass: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.08)',
    md: '0 4px 16px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.16)',
  },
} as const;
```

### 4. Glass Component Mappings (`colors.ts`)
Add glass-specific component tokens:

```typescript
export const mappedGlass = {
  card: {
    bg: aliasGlass.surface.primary,
    border: aliasGlass.border.default,
    shadow: shadows.glass.md,
    blur: blur.md,
  },
  button: {
    primary: {
      bg: aliasGlass.surface.primary,
      border: aliasGlass.border.light,
      blur: blur.sm,
    },
  },
  modal: {
    bg: aliasGlass.surface.primary,
    overlay: aliasGlass.overlay.medium,
    blur: blur.lg,
  },
  navbar: {
    bg: aliasGlass.surface.primary,
    border: aliasGlass.border.subtle,
    blur: blur.md,
  },
} as const;
```

## Implementation Steps

### Step 1: Create Blur Tokens
- Create `src/tokens/blur.ts`
- Export blur scale values
- Add to main tokens export

### Step 2: Extend Colors
- Add `aliasGlass` to colors.ts
- Add `mappedGlass` component mappings
- Update colors export structure

### Step 3: Extend Shadows
- Add glass shadow variants to shadows.ts
- Keep existing shadows for backward compatibility

### Step 4: Update Generators
- Update `react-native.ts` generator to include glass tokens
- Update `css.ts` generator for web blur support
- Update `json.ts` generator for Figma

### Step 5: Update Build Process
- Ensure all generators handle new tokens
- Test build output

## Usage Examples

### React Native
```typescript
import { tokens } from '@groxigo/tokens/react-native';
import { BlurView } from 'expo-blur';

// Glass card
const glassCardStyle = {
  backgroundColor: tokens.colors.alias.glass.surface.primary,
  borderWidth: 1,
  borderColor: tokens.colors.alias.glass.border.default,
  borderRadius: tokens.radius.lg,
  // Use BlurView component for blur effect
};

// Glass button
const glassButtonStyle = {
  backgroundColor: tokens.colors.mapped.glass.button.primary.bg,
  borderColor: tokens.colors.mapped.glass.button.primary.border,
  borderRadius: tokens.radius.md,
};
```

### Web (CSS)
```css
.glass-card {
  background-color: var(--alias-glass-surface-primary);
  border: 1px solid var(--alias-glass-border-default);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(var(--blur-md));
  box-shadow: var(--shadow-glass-md);
}
```

## Platform-Specific Considerations

### React Native
- Requires `expo-blur` or `@react-native-community/blur`
- BlurView component wraps content
- Opacity handled via rgba colors

### Web
- Uses CSS `backdrop-filter: blur()`
- Browser support: Modern browsers (Safari, Chrome, Firefox)
- Fallback: Solid background if blur not supported

### iOS
- Native `UIVisualEffectView` support
- Best performance and visual quality

### Android
- Requires `BlurView` library
- Performance considerations for complex views

## Benefits

1. **Consistency**: Glass theme follows same three-tier architecture
2. **Flexibility**: Can be used alongside existing themes
3. **Platform Support**: Works across iOS, Android, Web
4. **Type Safety**: Full TypeScript support
5. **Design System**: Integrates seamlessly with existing tokens

## Next Steps

1. ✅ Analyze current structure (this document)
2. ⏳ Create blur.ts token file
3. ⏳ Add glass alias colors
4. ⏳ Add glass shadows
5. ⏳ Add glass component mappings
6. ⏳ Update generators
7. ⏳ Test build process
8. ⏳ Update documentation

