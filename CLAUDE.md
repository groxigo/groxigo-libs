# Groxigo Libs - Shared Libraries Monorepo

Production-grade design system and component library for iOS, Android, and Web platforms.

**Version:** 1.0.0 (Fresh release - January 2026)

---

## Quick Reference

```bash
bun run build           # Build all packages
bun run test            # Run all tests (Vitest)
bun install             # Install dependencies
```

### Publishing (via GitHub Actions)

```bash
# 1. Create changeset describing your changes
bunx changeset add

# 2. Commit and push to master
git add . && git commit -m "chore: add changeset"
git push origin master

# 3. GitHub creates "Version Packages" PR → Merge it → Published!
```

### Release Commands (for Claude)

When asked to release a new version, follow these steps:

**Patch Release** (bug fixes, small changes):
```bash
cd /Users/pavanikondapalli/projects/groxigo/groxigo-libs

# 1. Build all packages to verify no errors
bun run build

# 2. Create changeset with patch bump for affected packages
bunx changeset add
# Select packages to bump, choose "patch", describe changes

# 3. Apply version bumps
bunx changeset version

# 4. Commit and push
git add .
git commit -m "chore: release patch version"
git push origin master
```

**Minor Release** (new features, non-breaking):
```bash
cd /Users/pavanikondapalli/projects/groxigo/groxigo-libs

# 1. Build all packages
bun run build

# 2. Create changeset with minor bump
bunx changeset add
# Select packages, choose "minor", describe new features

# 3. Apply version bumps
bunx changeset version

# 4. Commit and push
git add .
git commit -m "chore: release minor version"
git push origin master
```

**Major Release** (breaking changes):
```bash
cd /Users/pavanikondapalli/projects/groxigo/groxigo-libs

# 1. Build all packages
bun run build

# 2. Create changeset with major bump
bunx changeset add
# Select packages, choose "major", describe breaking changes

# 3. Apply version bumps
bunx changeset version

# 4. Update CHANGELOG.md with migration guide if needed

# 5. Commit and push
git add .
git commit -m "chore: release major version"
git push origin master
```

**Syncing Dependent Packages:**
When a foundation package changes (tokens, contracts, api-types), dependent packages should also be bumped:

| Changed Package | Also Bump |
|-----------------|-----------|
| `tokens` | ui-core, ui-elements, ui-elements-web, components, components-web |
| `contracts` | ui-elements, ui-elements-web, components, components-web |
| `ui-core` | ui-elements, ui-elements-web |
| `ui-elements` | components |
| `ui-elements-web` | components-web |

### GitHub Workflows

Three workflows in `.github/workflows/`:

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | Push/PR | Runs build and tests |
| `release.yml` | Push to master | Auto-publish via changesets |
| `publish-manual.yml` | Manual dispatch | Emergency/initial publish |

**Automatic Release Flow (`release.yml`):**
```
Push to master
    ↓
[Pending changesets?]
    ├─ YES → Creates "Version Packages" PR → Merge to publish
    └─ NO  → Publishes packages directly (versions already bumped)
```

**Manual Publish (`publish-manual.yml`):**
Use when auto-release fails or for initial releases:
1. Go to **Actions** → **Manual Publish**
2. Click **Run workflow**
3. Type `PUBLISH` to confirm
4. Click green **Run workflow** button

**Check workflow status:**
```
https://github.com/groxigo/groxigo-libs/actions
```

---

## Package Overview

| Package | Purpose | Key Exports |
|---------|---------|-------------|
| **@groxigo/tokens** | Design tokens (colors, spacing, typography, responsive) | `colors`, `spacing`, `typography`, `shadows`, `animation`, `responsive` |
| **@groxigo/contracts** | TypeScript interfaces for cross-platform consistency | `*PropsBase` interfaces for all components |
| **@groxigo/ui-core** | Shared hooks and utilities | `useDeviceType`, `useDeviceResponsiveValue`, `useMediaQuery`, `useBreakpoint` |
| **@groxigo/api-types** | Zod schemas for API validation | Schemas for products, orders, customers, etc. |
| **@groxigo/ui-elements** | React Native primitives (22 components) | `Button`, `Card`, `Modal`, `Input`, `Tabs`, etc. |
| **@groxigo/ui-elements-web** | Web primitives with Tailwind (22 components) | Same API as ui-elements |
| **@groxigo/components** | React Native composites (27 components) | `ProductCard`, `CartItem`, `SearchBar`, `Form`, etc. |
| **@groxigo/components-web** | Web composites (30 components) | Same API as components |

---

## Architecture

### Dependency Graph

```
tokens, contracts, api-types     ← No internal deps (foundation layer)
         ↓
      ui-core                    ← contracts, tokens
         ↓
   ui-elements / ui-elements-web ← contracts, tokens, ui-core
         ↓
   components / components-web   ← tokens, ui-elements[-web], contracts
```

### Three-Tier Token Architecture

```
Primitives (raw values)     →  Semantic (purpose-based)  →  Component (usage-specific)
colors.blue[500]            →  colors.primary            →  button.background
spacing[4] = 16             →  spacing.md                →  card.padding
```

---

## Key Patterns

### 1. Contract-First Development

All components extend base contracts from `@groxigo/contracts`:

```typescript
// In @groxigo/contracts
export interface ButtonPropsBase {
  variant?: ButtonVariant;
  size?: ButtonSize;
  colorScheme?: ButtonColorScheme;
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress?: (event?: unknown) => void;
  testID?: string;
}

// In @groxigo/ui-elements
import type { ButtonPropsBase } from '@groxigo/contracts';

export interface ButtonProps extends Omit<ButtonPropsBase, 'className'> {
  style?: StyleProp<ViewStyle>;
}

// In @groxigo/ui-elements-web
import type { ButtonPropsBase } from '@groxigo/contracts';

export interface ButtonProps extends ButtonPropsBase {
  className?: string;
}
```

### 2. Ref Forwarding (All Components)

Every component uses `forwardRef` for imperative access:

```typescript
export const Button = forwardRef<View, ButtonProps>(
  ({ children, variant = 'solid', ...props }, ref) => {
    return (
      <Pressable ref={ref} {...props}>
        {children}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';
```

### 3. Form Context System

The Form component provides context to child FormInput components:

```typescript
import { Form, FormInput, useFormContext } from '@groxigo/components';

<Form
  initialValues={{ email: '', password: '' }}
  onSubmit={async (values) => { /* submit */ }}
  validate={(values) => {
    const errors: Record<string, string> = {};
    if (!values.email) errors.email = 'Required';
    return errors;
  }}
>
  <FormInput name="email" label="Email" type="email" />
  <FormInput name="password" label="Password" type="password" />
  <SubmitButton />
</Form>

// Custom components can use the context
function SubmitButton() {
  const { handleSubmit, isSubmitting } = useFormContext();
  return <Button onPress={handleSubmit} isLoading={isSubmitting}>Submit</Button>;
}
```

### 4. Responsive Typography (Enterprise)

All components automatically scale for tablets/large screens:

```typescript
import { useDeviceType } from '@groxigo/ui-core';

function ResponsiveComponent() {
  const { fontSize, spacing, isTablet, deviceType } = useDeviceType();

  return (
    <View style={{ padding: spacing(16) }}>
      <Text style={{ fontSize: fontSize(16) }}>
        Scales from 16px (phone) to 26px (iPad Pro 13")
      </Text>
    </View>
  );
}

// Or use device-aware values
import { useDeviceResponsiveValue } from '@groxigo/ui-core';

const columns = useDeviceResponsiveValue({
  phone: 1,
  tablet: 2,
  desktop: 4,
});
```

**Scale bounds (configurable in `@groxigo/tokens`):**
| Element | Min | Max | Notes |
|---------|-----|-----|-------|
| Body text | 1.0x | 1.6x | Conservative to avoid "zoomed" feel |
| Headings | 1.0x | 1.8x | Headlines can be bolder |
| UI elements | 1.0x | 1.4x | Buttons/inputs stay reasonable |

See [Responsive Typography Guide](.claude/docs/responsive-typography.md) for full documentation.

### 5. Backward Compatibility with Deprecated Aliases

When renaming props, we maintain backward compatibility:

```typescript
export interface ProductCardProps extends ProductCardPropsBase {
  /** @deprecated Use `name` instead */
  title?: string;
  /** @deprecated Use `imageUrl` instead */
  image?: ImageSource;
  /** @deprecated Use `onAddToCart` instead */
  onAction?: () => void;
}

// In component implementation
const ProductCard = ({ name, title, imageUrl, image, onAddToCart, onAction, ...props }) => {
  const displayName = name ?? title;  // Prefer new, fall back to deprecated
  const displayImage = imageUrl ?? image?.uri;
  const handleAddToCart = onAddToCart ?? onAction;
  // ...
};
```

---

## Detailed Documentation

- [Responsive Typography](.claude/docs/responsive-typography.md) - **Enterprise responsive scaling system**
- [Package Details](.claude/docs/packages.md) - Deep dive into each package
- [Component Contracts](.claude/docs/contracts.md) - All contract interfaces
- [Testing Guide](.claude/docs/testing.md) - Test setup and patterns
- [Accessibility](.claude/docs/accessibility.md) - A11y implementation details
- [Publishing Guide](.claude/docs/publishing.md) - How to publish packages

---

## Recent Changes (January 2026 - v1.0.0 Release)

### Phase 1: Critical Fixes
- ✅ Fixed tokens package exports and type definitions
- ✅ Added 11 new component contracts
- ✅ Aligned ui-elements props with contracts (Switch, Modal, Tabs, Card, Badge)
- ✅ Added ref forwarding to all 22 ui-elements components
- ✅ Implemented Form context system with useFormContext hook
- ✅ Integrated tokens programmatically into tailwind.config.js

### Phase 2: Quality Improvements
- ✅ Added 220 tests to ui-core (99%+ coverage)
- ✅ Implemented useMediaQuery, useBreakpoint, useResponsiveValue hooks
- ✅ Added accessibility: focus traps, ARIA attributes, keyboard navigation
- ✅ Added 204 tests to components package

### Phase 3: Feature Parity
- ✅ Ported 28 components to components-web
- ✅ Ensured API parity between mobile and web
- ✅ Added 28 Storybook story files

### Phase 4: Enterprise Responsive Typography (January 2026)
- ✅ Added `responsive` config to `@groxigo/tokens` (viewport bounds, scale bounds)
- ✅ Created `useDeviceType` hook with hybrid fluid scaling
- ✅ Created `useDeviceResponsiveValue` hook for device-aware values
- ✅ Added system accessibility integration (iOS Dynamic Type, Android font scale)
- ✅ Updated Text component with variant-specific scaling (heading/body/caption)
- ✅ Updated Button component with UI-specific scaling
- ✅ Documented in `.claude/docs/responsive-typography.md`

---

## File Structure

```
groxigo-libs/
├── packages/
│   ├── api-types/           # Zod schemas for API
│   ├── contracts/           # TypeScript interfaces
│   │   └── src/
│   │       ├── elements/    # Primitive component contracts
│   │       ├── components/  # Composite component contracts
│   │       └── animation/   # Animation contracts
│   ├── tokens/              # Design tokens
│   │   └── src/
│   │       ├── tokens/      # Token definitions
│   │       ├── theme/       # Theme utilities
│   │       ├── generators/  # CSS/SCSS/JSON generators
│   │       └── platforms/   # Platform-specific exports
│   ├── ui-core/             # Shared hooks
│   │   └── src/
│   │       ├── hooks/       # React hooks
│   │       ├── animation/   # Animation utilities
│   │       └── utils/       # Utility functions
│   ├── ui-elements/         # React Native primitives
│   │   └── src/
│   │       ├── elements/    # 22 primitive components
│   │       ├── theme/       # Theme provider & hooks
│   │       └── hooks/       # Responsive hooks
│   ├── ui-elements-web/     # Web primitives
│   │   └── src/
│   │       ├── elements/    # 22 web components
│   │       └── utils/       # cn() utility
│   ├── components/          # React Native composites
│   │   └── src/
│   │       └── components/  # 27 composite components
│   └── components-web/      # Web composites
│       └── src/
│           └── components/  # 30 web components
├── apps/
│   ├── preview/             # Expo preview app
│   └── storybook-web/       # Storybook for web
├── .changeset/              # Changeset config
└── package.json             # Workspace root
```

---

## Common Tasks

### Adding a New Component

1. **Add contract** in `packages/contracts/src/components/`:
   ```typescript
   // new-component.ts
   export interface NewComponentPropsBase {
     title: string;
     onAction?: () => void;
     testID?: string;
   }
   ```

2. **Export from contracts** in `src/components/index.ts`

3. **Create RN component** in `packages/components/src/components/NewComponent/`:
   - `NewComponent.tsx`
   - `NewComponent.types.ts` (extends contract)
   - `index.ts`

4. **Create web component** in `packages/components-web/src/components/NewComponent/`:
   - Same structure, use Tailwind

5. **Add Storybook story** for web component

6. **Add tests** for both versions

### Running Tests

```bash
# All packages
bun run test

# Specific package
cd packages/ui-core && bun run test

# With coverage
cd packages/ui-core && bun run test:coverage
```

### Publishing

```bash
# 1. Create changeset
bunx changeset add

# 2. Version packages
bunx changeset version

# 3. Build all
bun run build

# 4. Publish
bunx changeset publish
```

---

## Component Design Best Practices

### Responsive Sizing Pattern

**Always use `useDeviceType` for responsive components:**

```typescript
import { useDeviceType } from '@groxigo/ui-core';

const MyComponent = () => {
  const { fontSize, spacing, uiSize } = useDeviceType();

  return (
    <View style={{ padding: uiSize(8) }}>
      <Text style={{ fontSize: fontSize(12) }}>Scales on tablets</Text>
      <Button style={{ width: uiSize(28), height: uiSize(28) }} />
    </View>
  );
};
```

**Scaling functions:**
| Function | Use For | Example |
|----------|---------|---------|
| `fontSize(n)` | Text sizes | `fontSize(12)` → 12px phone, ~17px tablet |
| `uiSize(n)` | UI elements, padding, dimensions | `uiSize(28)` → 28px phone, ~39px tablet |
| `spacing(n)` | Layout spacing | `spacing(16)` → 16px phone, ~22px tablet |

### FluidGrid Component

A responsive grid that calculates optimal columns based on container width. Use for consistent layouts across products, categories, and any grid content.

```typescript
import { FluidGrid } from '@groxigo/components';

// For products (3 per row on phones)
<FluidGrid minItemWidth={115} maxItemWidth={160} gap={8}>
  {products.map(p => <ProductTile key={p.id} {...p} />)}
</FluidGrid>

// For categories (4 per row on phones)
<FluidGrid minItemWidth={85} maxItemWidth={105} gap={8}>
  {categories.map(c => <ProductTile key={c.id} name={c.title} imageUrl={c.image} />)}
</FluidGrid>
```

**How it works:**
1. Measures container width on layout
2. Calculates max columns that fit at `minItemWidth`
3. Stretches items to fill row (up to `maxItemWidth`)
4. Passes `width` prop to children via `cloneElement`

**Sizing guide:**
| Use Case | minItemWidth | maxItemWidth | Result (iPhone) |
|----------|--------------|--------------|-----------------|
| Products | 115 | 160 | 3 per row |
| Categories | 85 | 105 | 4 per row |
| Compact | 70 | 90 | 5 per row |

### ProductTile Design Decisions (January 2026)

**Structure:**
```
┌─────────────────────┐
│ [Image 1:1 ratio]   │ ← Edge-to-edge, no padding
│   [Badge]     [♡]   │ ← Optional badge top-left, favorite top-right
│          [+]        │ ← ADD button bottom-right of image
├─────────────────────┤
│ Weight (e.g. 12 Oz) │ ← Gray background pill
│ Product Name        │ ← 2 lines max with ellipsis
│ ★★★★★  123         │ ← Rating left, review count right
│ 17% OFF             │ ← Green text, only if discount
│ $4.99 $6.99         │ ← Price + strikethrough original
└─────────────────────┘
```

**Key design rules:**

1. **Fixed info section height** (`uiSize(135)` for products, `uiSize(55)` for categories)
2. **1:1 image ratio** - `imageSize = tileWidth`
3. **Product name**: 2 lines max with ellipsis, fixed height `fontSize(15) * 2`
4. **Discount text**: Only rendered when discount exists, no placeholder space
5. **Price stays close to content** - no spacer pushing to bottom
6. **Currency**: USD ($) - never use MRP or other formats

**Category Mode (no price):**
When `price` is omitted, ProductTile switches to category mode:
- Shorter info section (55 vs 135)
- Centered name text
- Hides weight, rating, discount, and price row
- Used by CategorySection for consistent styling with product grids

```typescript
// Category mode - just image and name
<ProductTile
  id={category.id}
  name={category.title}
  imageUrl={category.image}
  showAddButton={false}
  showFavorite={false}
  onPress={() => navigate(category.id)}
/>
```

**Size configurations (base values, scale on tablets):**
```typescript
const BASE_SIZE_CONFIG = {
  sm: { width: 80 },   // Compact lists
  md: { width: 130 },  // Default
  lg: { width: 150 },  // Featured
};
```

**Colors:**
- Discount text: `#2E7D32` (green)
- Weight badge background: `#F5F5F5`
- Custom badge uses theme colors (primary, success, warning, error)

### Card Height Consistency Pattern

When cards have optional content (like discount), maintain consistent heights:

```typescript
// ❌ BAD - Cards have different heights
{discount && <Text>{discount}% OFF</Text>}
<Text>${price}</Text>

// ❌ BAD - Empty space between content when no discount
<View style={{ flex: 1 }} /> {/* Spacer */}
<Text>${price}</Text>

// ✅ GOOD - Fixed container height, content flows naturally
<View style={{ height: uiSize(135) }}>
  {/* Content */}
  {discount && <Text>{discount}% OFF</Text>}
  <Text>${price}</Text>
  {/* Empty space falls at bottom naturally */}
</View>
```

### Rating Component

**Responsive star sizes:**
```typescript
const BASE_STAR_SIZES = {
  xs: 10,  // ProductTile
  sm: 14,  // Compact displays
  md: 18,  // Default
  lg: 24,  // Large displays
};
// Applied via: uiSize(BASE_STAR_SIZES[size])
```

**Star gap scales with size:**
- xs: 1px
- sm: 2px
- md/lg: 4px (scaled)

### Section Headers

- Title variant: `h3` (not h4)
- No icons on section titles
- "See all" link on right when `onSeeAll` provided

### API Data Mapping

**Product fields from API:**
```typescript
// API returns:
{ unit: "g", unitSize: "200 Gm", ... }

// Map to ProductTile:
weight={item.unitSize || item.unit}
```

### Viewport Breakpoints

```typescript
// In @groxigo/tokens/src/tokens/responsive.ts
export const viewportBounds = {
  min: 320,
  tabletStart: 1100,  // Diagonal dp - all phones below this
  tabletEnd: 1700,    // iPad Pro 13" diagonal ~1707dp
  max: 1800,
};
```

**Device classification (by screen diagonal in dp):**
- Phone: < 1100dp (includes iPhone 16 Pro Max ~1026dp)
- Tablet: 1100-1700dp (fluid scaling)
- Desktop: > 1800dp (fixed 1.4x scale)

---

## Troubleshooting

### Build Errors

**"Module not found: @groxigo/tokens"**
- Ensure tokens is built: `cd packages/tokens && bun run build`
- Check that package.json exports point to source files for monorepo dev

**Type mismatch when extending contracts**
- Use `Omit<ContractPropsBase, 'className' | 'otherWebOnlyProp'>` in RN
- Ensure variant/size types match exactly or omit and redefine

### Test Failures

**"useTheme must be used within ThemeProvider"**
- Mock the theme in test setup:
  ```typescript
  vi.mock('@groxigo/ui-elements', () => ({
    useTheme: () => ({ colors: {...}, spacing: {...} }),
  }));
  ```
