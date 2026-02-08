# Responsive Typography System

Enterprise-grade responsive typography for cross-platform apps (iOS, Android, Web).

---

## Overview

The system uses **hybrid fluid scaling**:
- **Phone** (< 600dp): Fixed 1.0x scale
- **Tablet** (600-1400dp): Fluid interpolation (smooth scaling)
- **Desktop** (> 1400dp): Fixed scale (matches tablet max)

No jarring jumps between breakpoints - typography scales smoothly.

---

## Architecture

```
@groxigo/tokens           ← Configuration (responsive.ts)
       ↓
@groxigo/ui-core          ← Hook (useDeviceType)
       ↓
@groxigo/ui-elements      ← Components (Text, Button)
@groxigo/ui-elements-web  ← Web components (CSS-based)
```

---

## Configuration (`@groxigo/tokens`)

### File: `packages/tokens/src/tokens/responsive.ts`

```typescript
import { responsive } from '@groxigo/tokens';

// Viewport bounds
responsive.viewport = {
  min: 320,         // Smallest phone
  tabletStart: 600, // Where fluid scaling starts
  tabletEnd: 1400,  // Where fluid scaling ends
  max: 1800,        // Desktop threshold
};

// Scale bounds by element type
responsive.scales = {
  font:    { min: 1.0, max: 1.6 },   // Body text
  heading: { min: 1.0, max: 1.8 },   // Headlines (h1-h6)
  caption: { min: 1.0, max: 1.75 },  // Small text (caption, label)
  spacing: { min: 1.0, max: 1.5 },   // Layout spacing
  icon:    { min: 1.0, max: 1.5 },   // Icon sizes
  ui:      { min: 1.0, max: 1.4 },   // Buttons, inputs
};

// Accessibility — per-element-type caps (DESIGN_RULES §34)
responsive.accessibility = {
  respectSystemFontScale: true,  // iOS Dynamic Type / Android font scale
  maxSystemFontScale: {
    body: 2.0,      // Body text — must remain readable
    heading: 1.5,   // Headings — cap to prevent overflow
    label: 1.3,     // Labels (button, badge) — tight containers
  },
  minSystemFontScale: 0.8,
};
```

---

## Hook (`@groxigo/ui-core`)

### File: `packages/ui-core/src/hooks/useDeviceType.ts`

```typescript
import { useDeviceType } from '@groxigo/ui-core';

function MyComponent() {
  const {
    // Device info
    deviceType,        // 'phone' | 'tablet' | 'desktop'
    diagonal,          // Screen diagonal in points
    width, height,     // Screen dimensions
    isTablet,          // true if tablet or larger
    isLargeScreen,     // true if desktop

    // Scale object
    scale: {
      fontScale,       // For body text
      headingScale,    // For headings
      captionScale,    // For small text
      spacingScale,    // For spacing
      iconScale,       // For icons
      uiScale,         // For UI elements
      minTouchTarget,  // Minimum touch target size
    },

    // Helper functions (apply system font scale automatically)
    fontSize,          // (base: number) => scaled size
    headingSize,       // (base: number) => scaled heading
    captionSize,       // (base: number) => scaled caption
    spacing,           // (base: number) => scaled spacing
    iconSize,          // (base: number) => scaled icon
    uiSize,            // (base: number) => scaled UI element

    // System accessibility
    systemFontScale,   // Current system font scale (1.0 default)

    // Raw scale getter
    getScale,          // (type: ScaleType) => number
  } = useDeviceType();

  return (
    <View style={{ padding: spacing(16) }}>
      <Text style={{ fontSize: headingSize(24) }}>Title</Text>
      <Text style={{ fontSize: fontSize(16) }}>Body text</Text>
    </View>
  );
}
```

---

## Device-Aware Responsive Values

For arbitrary values based on device category:

```typescript
import { useDeviceResponsiveValue } from '@groxigo/ui-core';

function ResponsiveGrid() {
  const columns = useDeviceResponsiveValue({
    phone: 1,
    tablet: 2,
    desktop: 4,
  });

  const gap = useDeviceResponsiveValue({
    phone: 8,
    tablet: 16,
    desktop: 24,
  });

  return <Grid columns={columns} gap={gap}>{children}</Grid>;
}
```

---

## Component Integration

### Text Component (`@groxigo/ui-elements`)

Automatically uses appropriate scale based on variant:

```typescript
// Headings → headingScale (max 1.8x)
<Text variant="h1">Large Heading</Text>

// Body → fontScale (max 1.6x)
<Text variant="body">Regular text</Text>

// Captions → captionScale (max 1.75x)
<Text variant="caption">Small text</Text>

// Disable responsive scaling
<Text variant="body" responsive={false}>Fixed size</Text>
```

### Button Component (`@groxigo/ui-elements`)

Uses `uiScale` (max 1.4x) to prevent oversized buttons:

```typescript
<Button size="md">Click Me</Button>
// Height, padding, font size all scale with uiScale
```

---

## Fluid Scaling Formula

For tablet range (600-1400dp), scale is interpolated:

```
t = (diagonal - 600) / (1400 - 600)
scale = minScale + (maxScale - minScale) × t
```

**Example for body text on iPad Pro 13" (diagonal ~1400dp):**
```
t = (1400 - 600) / 800 = 1.0
fontScale = 1.0 + (1.6 - 1.0) × 1.0 = 1.6
```

So 16px body text becomes 26px (16 × 1.6).

---

## Scale Summary by Device

| Diagonal | Device | Font | Heading | Caption | UI |
|----------|--------|------|---------|---------|-----|
| 400dp | iPhone | 1.0x | 1.0x | 1.0x | 1.0x |
| 600dp | Tablet start | 1.0x | 1.0x | 1.0x | 1.0x |
| 1000dp | iPad Air | 1.3x | 1.4x | 1.38x | 1.2x |
| 1400dp | iPad Pro 13" | 1.6x | 1.8x | 1.75x | 1.4x |
| 1800dp | Desktop | 1.6x | 1.8x | 1.75x | 1.4x |

---

## Web Implementation

For web (`@groxigo/ui-elements-web`), use CSS-based responsive scaling:

```css
/* CSS clamp() for fluid typography */
.text-body {
  font-size: clamp(1rem, 0.5rem + 1.5vw, 1.6rem);
}

.text-heading {
  font-size: clamp(1.5rem, 1rem + 2vw, 2.7rem);
}
```

Or use Tailwind responsive classes:

```typescript
<p className="text-base md:text-lg lg:text-xl xl:text-2xl">
  Responsive text
</p>
```

---

## System Accessibility

The system respects iOS Dynamic Type and Android font scale settings:

```typescript
const { systemFontScale } = useDeviceType();
// Returns 1.0-1.5 based on user's accessibility settings

// fontSize() helper automatically applies system scale
const size = fontSize(16); // Includes both device and system scaling
```

---

## Customizing Bounds

To change scale bounds, edit `packages/tokens/src/tokens/responsive.ts`:

```typescript
export const scaleBounds = {
  font: {
    min: 1.0,
    max: 1.8,  // Increase for larger tablets
  },
  // ...
};
```

After changing, rebuild tokens: `npm run build -w @groxigo/tokens`

---

## Static Utilities

For non-hook contexts:

```typescript
import {
  getDeviceTypeFromDimensions,
  calculateFluidScale,
} from '@groxigo/ui-core';

// Get device type from dimensions
const deviceType = getDeviceTypeFromDimensions(1024, 768);
// Returns: 'tablet'

// Calculate scale for specific dimensions
const scale = calculateFluidScale(1024, 768, 'font');
// Returns: ~1.3
```

---

## Troubleshooting

### "useDeviceType requires @groxigo/tokens"

Ensure tokens is built and ui-core has it as a dependency:
```bash
npm run build -w @groxigo/tokens
npm run build -w @groxigo/ui-core
```

### Text looks too large/small

1. Check `responsive` prop on Text component
2. Verify device diagonal calculation
3. Adjust scale bounds in tokens if needed

### Scale jumps at boundaries

Ensure desktop fixed scales match tablet max scales in `responsive.ts`.

---

## Migration Guide

### From Fixed Breakpoints

Before:
```typescript
const scale = isTablet ? 1.5 : 1;
```

After:
```typescript
const { scale } = useDeviceType();
// scale.fontScale is fluid, not stepped
```

### From Custom Responsive Logic

Before:
```typescript
const fontSize = width > 768 ? 24 : 16;
```

After:
```typescript
const { headingSize } = useDeviceType();
const size = headingSize(24); // Auto-scales based on device
```
