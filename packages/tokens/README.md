# @groxigo/tokens

Production-grade design tokens package with a three-tier architecture for consistent UI across iOS, Android, and Web platforms.

## Features

- **Three-Tier Architecture**: Primitives → Semantic → Components
- **Multi-Platform Support**: React Native, CSS, SCSS, CSS Modules, JSON
- **Dark Mode**: Built-in light/dark theme support
- **Theming System**: Easy rebranding with preset and custom themes
- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Accessibility**: WCAG 2.1 contrast ratio validation utilities
- **Tree-Shakeable**: Modular exports for optimal bundle size
- **Figma Integration**: JSON export compatible with Tokens Studio

## Installation

```bash
npm install @groxigo/tokens
# or
yarn add @groxigo/tokens
# or
pnpm add @groxigo/tokens
```

## Quick Start

### React Native / Expo

```typescript
import { tokens } from '@groxigo/tokens';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: tokens.colors.semantic.brand.primary.default,
    padding: tokens.spacing[4],
    borderRadius: tokens.radius.lg,
  },
  buttonText: {
    color: tokens.colors.components.button.primary.text,
    fontWeight: tokens.typography.fontWeight.semibold,
  },
});
```

### Web (CSS Variables)

```css
@import '@groxigo/tokens/css';

.button {
  background-color: var(--brand-primary-default);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  color: var(--color-white);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --surface-primary: var(--color-gray-900);
    --text-primary: var(--color-gray-50);
  }
}
```

### Web (JavaScript/TypeScript)

```typescript
import { tokens, semantic, components } from '@groxigo/tokens';

const buttonStyle = {
  backgroundColor: components.button.primary.bg,
  color: components.button.primary.text,
  padding: `${tokens.spacing[2]}px ${tokens.spacing[4]}px`,
};
```

### SCSS

```scss
@import '@groxigo/tokens/scss/tokens';

.button {
  background-color: $brand-primary-default;
  padding: spacing(2) spacing(4);
  border-radius: radius(md);

  @include dark-mode {
    background-color: $brand-primary-hover;
  }
}

// Use built-in mixins
.primary-btn {
  @include button-primary;
}

.card {
  @include card;
}
```

## Architecture

The token system follows a three-tier architecture:

```
┌─────────────────────────────────────────────────────┐
│                   PRIMITIVES                         │
│  Raw values: colors, spacing, typography, etc.      │
│  e.g., gray-500: #6b7280, spacing-4: 16             │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│                    SEMANTIC                          │
│  Meaningful tokens mapped from primitives           │
│  e.g., text-primary: gray-900, surface: white       │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│                   COMPONENTS                         │
│  Component-specific tokens from semantic            │
│  e.g., button.primary.bg, card.border              │
└─────────────────────────────────────────────────────┘
```

### Why Three Tiers?

1. **Maintainability**: Change a primitive color, and all semantic/component tokens update
2. **Consistency**: Components use semantic tokens, ensuring visual harmony
3. **Flexibility**: Easily swap themes by changing semantic mappings
4. **Scalability**: Add new components without touching primitives

## Token Categories

### Colors

```typescript
import { tokens } from '@groxigo/tokens';

// Primitives (11 color families, 11 shades each)
tokens.colors.primitives.blue[500]      // #3b82f6
tokens.colors.primitives.gray[900]      // #111827
tokens.colors.primitives.green[600]     // #16a34a

// Semantic
tokens.colors.semantic.surface.primary  // Background colors
tokens.colors.semantic.text.primary     // Text colors
tokens.colors.semantic.brand.primary    // Brand colors
tokens.colors.semantic.status.success   // Status colors

// Components
tokens.colors.components.button.primary.bg
tokens.colors.components.input.borderFocus
tokens.colors.components.card.bg
```

**Available Color Families:**
- `gray`, `blue`, `green`, `red`, `yellow`
- `orange`, `purple`, `cyan`, `pink`, `indigo`, `teal`

### Spacing

```typescript
tokens.spacing[0]   // 0
tokens.spacing[1]   // 4
tokens.spacing[2]   // 8
tokens.spacing[3]   // 12
tokens.spacing[4]   // 16
tokens.spacing[5]   // 20
tokens.spacing[6]   // 24
tokens.spacing[8]   // 32
tokens.spacing[10]  // 40
tokens.spacing[12]  // 48
tokens.spacing[16]  // 64
tokens.spacing[20]  // 80
tokens.spacing[24]  // 96
```

### Typography

```typescript
// Font families
tokens.typography.fontFamily.sans  // 'Inter', system-ui, sans-serif
tokens.typography.fontFamily.mono  // 'JetBrains Mono', monospace

// Font sizes
tokens.typography.fontSize.xs      // 12
tokens.typography.fontSize.sm      // 14
tokens.typography.fontSize.base    // 16
tokens.typography.fontSize.lg      // 18
tokens.typography.fontSize.xl      // 20
tokens.typography.fontSize['2xl']  // 24
tokens.typography.fontSize['3xl']  // 30
tokens.typography.fontSize['4xl']  // 36

// Font weights
tokens.typography.fontWeight.light     // 300
tokens.typography.fontWeight.normal    // 400
tokens.typography.fontWeight.medium    // 500
tokens.typography.fontWeight.semibold  // 600
tokens.typography.fontWeight.bold      // 700

// Line heights
tokens.typography.lineHeight.tight     // 1.25
tokens.typography.lineHeight.normal    // 1.5
```

### Border Radius

```typescript
tokens.radius.none  // 0
tokens.radius.sm    // 4
tokens.radius.md    // 6
tokens.radius.lg    // 8
tokens.radius.xl    // 12
tokens.radius['2xl'] // 16
tokens.radius['3xl'] // 24
tokens.radius.full  // 9999
```

### Shadows

```typescript
tokens.shadows.none
tokens.shadows.sm   // Small shadow
tokens.shadows.md   // Medium shadow
tokens.shadows.lg   // Large shadow
tokens.shadows.xl   // Extra large shadow
```

### Animation

```typescript
// Durations (in ms)
tokens.animation.duration.instant  // 0
tokens.animation.duration.fast     // 150
tokens.animation.duration.normal   // 300
tokens.animation.duration.slow     // 500
tokens.animation.duration.slower   // 700

// Easing functions
tokens.animation.easing.linear
tokens.animation.easing.easeIn
tokens.animation.easing.easeOut
tokens.animation.easing.easeInOut
tokens.animation.easing.spring
```

## Theming

### Using Preset Themes

```typescript
import { presetThemes, getThemeColors } from '@groxigo/tokens/theme';

// Available presets: blue, green, purple, orange, teal, indigo
const { light, dark } = presetThemes.purple;

// Get colors for current mode
const colors = getThemeColors({ brand: { primary: 'green' } }, isDarkMode);
```

### Creating Custom Themes

```typescript
import { createTheme } from '@groxigo/tokens/theme';

const myTheme = createTheme({
  name: 'my-brand',
  brand: {
    primary: 'teal',
    secondary: 'purple',
    accent: 'orange',
  },
});

// Access light/dark variants
const lightColors = myTheme.light;
const darkColors = myTheme.dark;
```

### Custom Color Families

```typescript
import { createTheme } from '@groxigo/tokens/theme';

const customTheme = createTheme({
  name: 'custom',
  brand: {
    primary: 'customBlue',
    secondary: 'purple',
    accent: 'cyan',
  },
  customColors: {
    customBlue: {
      50: '#e6f4ff',
      100: '#bae0ff',
      200: '#91caff',
      300: '#69b1ff',
      400: '#4096ff',
      500: '#1677ff',
      600: '#0958d9',
      700: '#003eb3',
      800: '#002c8c',
      900: '#001d66',
      950: '#000f33',
    },
  },
});
```

## Dark Mode

### CSS

```css
/* Auto dark mode via media query */
@media (prefers-color-scheme: dark) {
  :root {
    --surface-primary: var(--color-gray-900);
    --text-primary: var(--color-gray-50);
  }
}

/* Manual dark mode via class */
.dark {
  --surface-primary: var(--color-gray-900);
  --text-primary: var(--color-gray-50);
}
```

### React Native

```typescript
import { tokens } from '@groxigo/tokens';
import { useColorScheme } from 'react-native';

function useThemedColors() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return isDark
    ? tokens.colors.semanticDark
    : tokens.colors.semantic;
}
```

### JavaScript

```typescript
import { getThemeColors } from '@groxigo/tokens/theme';

const colors = getThemeColors({}, isDarkMode);
const bgColor = colors.semantic.surface.primary;
```

## Accessibility

### Contrast Validation

```typescript
import {
  analyzeContrast,
  passesAA,
  getOptimalTextColor
} from '@groxigo/tokens/utils';

// Check contrast ratio
const result = analyzeContrast('#ffffff', '#3b82f6');
console.log(result.ratio);       // 4.47
console.log(result.level);       // 'AA Large'
console.log(result.passesAA);    // true (for large text)

// Simple pass/fail check
if (passesAA('#ffffff', '#3b82f6')) {
  // Meets WCAG AA requirements
}

// Get optimal text color for any background
const textColor = getOptimalTextColor('#3b82f6'); // Returns white or black
```

### Validate Color Pairs

```typescript
import { validateColorPairs } from '@groxigo/tokens/utils';

const pairs = [
  { foreground: '#ffffff', background: '#3b82f6', name: 'Button' },
  { foreground: '#111827', background: '#f3f4f6', name: 'Card' },
];

const results = validateColorPairs(pairs);
// Returns validation results for each pair
```

## Runtime Validation

```typescript
import { validateTokens, assertValidTokens } from '@groxigo/tokens/utils';

// Validate tokens with detailed results
const result = validateTokens(tokens);
if (!result.valid) {
  console.error('Token errors:', result.errors);
}
if (result.warnings.length > 0) {
  console.warn('Token warnings:', result.warnings);
}

// Throw on invalid tokens
assertValidTokens(tokens); // Throws if invalid
```

## Modular Imports (Tree-Shaking)

For optimal bundle size, import only what you need:

```typescript
// Import specific categories
import { colors } from '@groxigo/tokens/colors';
import { spacing } from '@groxigo/tokens/spacing';
import { typography } from '@groxigo/tokens/typography';
import { animation } from '@groxigo/tokens/animation';

// Import utilities
import { analyzeContrast } from '@groxigo/tokens/utils';

// Import theming
import { createTheme, presetThemes } from '@groxigo/tokens/theme';
```

## Output Formats

The build generates multiple formats:

| File | Format | Use Case |
|------|--------|----------|
| `dist/css/tokens.css` | CSS Variables | Web applications |
| `dist/css/tokens.min.css` | Minified CSS | Production web |
| `dist/css/tokens.module.css` | CSS Modules | React/Vue with CSS Modules |
| `dist/scss/_tokens.scss` | SCSS | Sass-based projects |
| `dist/js/tokens.js` | JavaScript | React Native, Node.js |
| `dist/json/tokens.json` | JSON | Figma Tokens Studio |
| `dist/json/tokens.flat.json` | Flat JSON | Simple integrations |
| `dist/types/index.d.ts` | TypeScript | Type definitions |

## Development

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run build:watch
```

### Test

```bash
npm test
npm run test:coverage
```

### Preview

```bash
npm run preview
```

Opens the visual token preview in your browser.

## TypeScript

Full TypeScript support with comprehensive type definitions:

```typescript
import type {
  DesignTokens,
  ColorTokens,
  SemanticColors,
  ComponentColors,
  ThemeConfig,
  ThemeColors,
} from '@groxigo/tokens';

// Type-safe token access
const config: ThemeConfig = {
  name: 'my-theme',
  mode: 'light',
  brand: {
    primary: 'blue',
    secondary: 'purple',
    accent: 'cyan',
  },
};
```

## Migration Guide

### From Old Structure

If migrating from the old groceries/recipes naming:

```typescript
// Old
tokens.colors.alias.groceries.primary
tokens.colors.mapped.groceries.button

// New
tokens.colors.semantic.brand.primary
tokens.colors.components.button.primary
```

## API Reference

### Main Exports

| Export | Description |
|--------|-------------|
| `tokens` | Complete tokens object |
| `colors` | Color tokens only |
| `spacing` | Spacing scale |
| `typography` | Typography tokens |
| `shadows` | Shadow definitions |
| `radius` | Border radius scale |
| `animation` | Animation tokens |

### Theme Exports

| Export | Description |
|--------|-------------|
| `createTheme()` | Create custom theme |
| `getThemeColors()` | Get colors for mode |
| `presetThemes` | Built-in theme presets |
| `defaultThemeConfig` | Default configuration |

### Utility Exports

| Export | Description |
|--------|-------------|
| `validateTokens()` | Validate token structure |
| `analyzeContrast()` | Check WCAG contrast |
| `passesAA()` | Check AA compliance |
| `getOptimalTextColor()` | Get readable text color |

## Browser Support

- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

## License

MIT
