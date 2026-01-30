# Groxigo Libraries

Production-grade design system and component library for iOS, Android, and Web.

[![CI](https://github.com/groxigo/groxigo-libs/actions/workflows/ci.yml/badge.svg)](https://github.com/groxigo/groxigo-libs/actions/workflows/ci.yml)

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| [@groxigo/tokens](./packages/tokens) | Design tokens (colors, spacing, typography) | 1.0.0 |
| [@groxigo/contracts](./packages/contracts) | TypeScript interfaces for cross-platform consistency | 1.0.0 |
| [@groxigo/ui-core](./packages/ui-core) | Shared React hooks and utilities | 1.0.0 |
| [@groxigo/api-types](./packages/api-types) | Zod schemas for API validation | 1.0.0 |
| [@groxigo/ui-elements](./packages/ui-elements) | React Native primitives (22 components) | 1.0.0 |
| [@groxigo/ui-elements-web](./packages/ui-elements-web) | Web primitives with Tailwind (22 components) | 1.0.0 |
| [@groxigo/components](./packages/components) | React Native composites (27 components) | 1.0.0 |
| [@groxigo/components-web](./packages/components-web) | Web composites (30 components) | 1.0.0 |

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/groxigo/groxigo-libs.git
cd groxigo-libs

# Install dependencies (requires Bun >= 1.1.0)
bun install

# Build all packages
bun run build

# Run tests (Vitest)
bun run test
```

### Using Packages

Configure `.npmrc` to use GitHub Packages:

```ini
@groxigo:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Install packages:

```bash
# For React Native projects
npm install @groxigo/tokens @groxigo/ui-elements @groxigo/components

# For Web projects (Next.js, React)
npm install @groxigo/tokens @groxigo/ui-elements-web @groxigo/components-web
```

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Applications                              │
│              (groxigo-ui, groxigo-web)                       │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│  @groxigo/components          @groxigo/components-web       │
│  (React Native composites)      (Web composites)                │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│  @groxigo/ui-elements         @groxigo/ui-elements-web      │
│  (React Native primitives)      (Web primitives + Tailwind)     │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│  @groxigo/ui-core     @groxigo/contracts    @groxigo/tokens│
│  (Shared hooks)         (TypeScript interfaces) (Design tokens) │
└─────────────────────────────────────────────────────────────────┘
```

## Development

### Available Scripts

```bash
bun run build        # Build all packages
bun run test         # Run all tests (Vitest)
bun run lint         # Run linting
bun run storybook    # Start Storybook (web components)
bun run preview      # Start Expo preview app
```

### Making Changes

1. **Edit code** in `packages/<package-name>/src/`
2. **Build** to verify: `bun run build`
3. **Test** your changes: `bun run test`
4. **Create changeset**: `bunx changeset add`
5. **Commit and push**

### Adding a New Component

1. **Add contract** in `packages/contracts/src/components/`
2. **Create RN version** in `packages/components/src/components/`
3. **Create web version** in `packages/components-web/src/components/`
4. **Add Storybook story** for web version
5. **Export** from package index files

## Publishing

We use [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

### Release Process

```bash
# 1. Create a changeset describing your changes
bunx changeset add

# 2. Commit and push to master
git add .
git commit -m "feat: add new component"
git push origin master

# 3. GitHub Actions creates a "Version Packages" PR
#    Review it and merge when ready

# 4. Packages are automatically published to GitHub Packages
```

### Linked Packages

These packages always have matching versions:
- `@groxigo/ui-elements` ↔ `@groxigo/ui-elements-web`
- `@groxigo/components` ↔ `@groxigo/components-web`

## Project Structure

```
groxigo-libs/
├── packages/
│   ├── api-types/           # Zod schemas
│   ├── contracts/           # TypeScript interfaces
│   ├── tokens/              # Design tokens
│   ├── ui-core/             # Shared hooks (220 tests)
│   ├── ui-elements/         # React Native primitives
│   ├── ui-elements-web/     # Web primitives
│   ├── components/          # React Native composites (204 tests)
│   └── components-web/      # Web composites
├── apps/
│   ├── preview/             # Expo preview app
│   └── storybook-web/       # Storybook for web
├── .changeset/              # Changeset config
├── .github/workflows/       # CI and Release workflows
└── package.json             # Workspace root
```

## Key Features

### Design Tokens

Three-tier token architecture:
- **Primitives**: Raw values (`blue[500]`, `spacing[4]`)
- **Semantic**: Purpose-based (`primary`, `error`)
- **Component**: Usage-specific (`button.background`)

### Cross-Platform Consistency

All components implement contracts from `@groxigo/contracts`:

```typescript
// Contract (shared)
interface ButtonPropsBase {
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  onPress?: () => void;
}

// React Native implementation
interface ButtonProps extends Omit<ButtonPropsBase, 'className'> {
  style?: StyleProp<ViewStyle>;
}

// Web implementation
interface ButtonProps extends ButtonPropsBase {
  className?: string;
}
```

### Accessibility

- WCAG 2.1 AA compliant
- Focus traps for modals/drawers
- Keyboard navigation
- Screen reader support
- 44×44px touch targets

### Test Coverage

- **ui-core**: 220 tests, 99%+ coverage
- **components**: 204 tests

## Documentation

- [CLAUDE.md](./CLAUDE.md) - Detailed technical documentation
- [Publishing Guide](./.claude/docs/publishing.md) - How to publish packages
- [Testing Guide](./.claude/docs/testing.md) - Testing patterns
- [Accessibility](./.claude/docs/accessibility.md) - A11y implementation
- [Contracts](./.claude/docs/contracts.md) - Interface reference

## Requirements

- Bun >= 1.1.0 (https://bun.sh)

## License

MIT
