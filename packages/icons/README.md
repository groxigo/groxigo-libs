# @groxigo/icons

Tree-shakable Unicons icon components for React Native and Web.

## Installation

```bash
# npm
npm install @groxigo/icons

# bun
bun add @groxigo/icons
```

For React Native projects, install the peer dependency:

```bash
npm install react-native-svg
```

On web, `react-native-svg` is not required. The package uses native `<svg>` elements via the `.web.tsx` module resolution.

## Usage

### React Native

```tsx
import { LineIcons } from '@groxigo/icons';

function App() {
  return <LineIcons.ShoppingCart size={24} color="#333" />;
}
```

### Web

```tsx
import { LineIcons, SolidIcons } from '@groxigo/icons';

function Nav() {
  return (
    <button>
      <SolidIcons.Heart size={20} color="red" className="icon" />
    </button>
  );
}
```

### Direct imports (recommended for tree-shaking)

Import individual icons from the `line` or `solid` sub-paths to ensure your bundler only includes the icons you use:

```tsx
import { ShoppingCart, Search, Heart } from '@groxigo/icons/line';
import { Star } from '@groxigo/icons/solid';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `24` | Width and height in pixels. |
| `color` | `string` | `'currentColor'` (web) / `'#000'` (RN) | Fill color applied to SVG paths. |
| `style` | `any` | `undefined` | Style object passed to the root SVG element. |
| `className` | `string` | `undefined` | CSS class name (web only, ignored on React Native). |
| `accessibilityLabel` | `string` | `undefined` | Accessible label. Renders as `aria-label` on web, `accessibilityLabel` on RN. |
| `testID` | `string` | `undefined` | Test identifier. Renders as `data-testid` on web, `testID` on RN. |

All props are optional. The `IconComponentProps` interface is exported for typing custom wrappers:

```tsx
import type { IconComponentProps } from '@groxigo/icons';
```

## Available Icons

The package includes **1,405 icons total** generated from Iconscout Unicons v4:

- **1,215 line** variants (outline style)
- **190 solid** variants (filled style)

Browse all available icons by namespace:

```tsx
import { LineIcons, SolidIcons } from '@groxigo/icons';

// LineIcons.ShoppingCart, LineIcons.Search, LineIcons.Heart, ...
// SolidIcons.Star, SolidIcons.Heart, SolidIcons.Check, ...
```

Icon names follow PascalCase. The original Unicons kebab-case filenames (e.g. `shopping-cart.svg`) are converted to PascalCase component names (e.g. `ShoppingCart`). Names that start with digits use word equivalents (e.g. `18-plus.svg` becomes `EighteenPlus`).

To regenerate icons from the Unicons source SVGs:

```bash
bun run generate
```

## Tree-Shaking

The package is configured for optimal tree-shaking:

- `"sideEffects": false` in `package.json` tells bundlers every module is safe to eliminate.
- Each icon is a separate `.ts` file that calls `createIcon()` with its path data.
- Barrel files re-export from individual modules, so unused icons are dropped by any ES module-aware bundler (Webpack, Rollup, esbuild, Metro with tree-shaking).

For the smallest bundle, prefer direct sub-path imports:

```tsx
// Only ShoppingCart is included in the bundle
import { ShoppingCart } from '@groxigo/icons/line';
```

## Platform Support

| Platform | Renderer | Peer Dependency |
|----------|----------|-----------------|
| React Native (iOS/Android) | `react-native-svg` (`Svg`, `Path`) | `react-native-svg >= 15.0.0` |
| Web | Native `<svg>` and `<path>` elements | None |

Platform resolution is handled via the `.web.tsx` / `.tsx` file extension convention. Bundlers like Metro (React Native) and Webpack/Vite (web) automatically pick the correct `createIcon` implementation.

### Next.js Setup

Next.js does not resolve `.web.tsx` extensions by default. Add the following to `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile icons package (ships TypeScript source)
  transpilePackages: ['@groxigo/icons'],

  // Resolve .web.tsx before .tsx so the web createIcon is used
  webpack: (config) => {
    const extensions = config.resolve.extensions;
    const webExtensions = ['.web.tsx', '.web.ts', '.web.js'];
    config.resolve.extensions = [
      ...webExtensions,
      ...extensions.filter((ext) => !webExtensions.includes(ext)),
    ];
    return config;
  },
};
```

Without this config, webpack will resolve `create-icon.tsx` (React Native) instead of `create-icon.web.tsx`, causing a `react-native-svg` / `react-native` import error at build time.

### Vite Setup

Vite resolves `.web.tsx` out of the box when configured in `resolve.extensions`:

```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js'],
  },
});
```

## License

MIT
