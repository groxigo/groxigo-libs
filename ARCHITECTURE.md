# Monorepo Architecture

## Structure Overview

```
groxigo-libs/
├── packages/                    # All packages live here
│   ├── tokens/                  # Design tokens package
│   │   ├── src/                 # Source files
│   │   ├── dist/                # Generated outputs
│   │   ├── package.json         # Package configuration
│   │   └── README.md            # Package documentation
│   └── [future-packages]/       # Additional packages
├── package.json                 # Root workspace config
├── README.md                    # Root documentation
├── PACKAGE_TEMPLATE.md          # Guide for adding packages
└── .gitignore                   # Root gitignore
```

## Workspace Configuration

The root `package.json` uses npm workspaces to manage all packages:

```json
{
  "workspaces": [
    "packages/*"
  ]
}
```

This enables:
- Single `npm install` for all packages
- Automatic linking between packages
- Unified dependency management
- Shared scripts across packages

## Package Structure

Each package follows a consistent structure:

```
packages/package-name/
├── src/              # Source TypeScript files
├── dist/             # Generated build outputs (gitignored)
├── package.json      # Package manifest
├── tsconfig.json     # TypeScript configuration
└── README.md         # Package documentation
```

## Package Naming Convention

All packages use the `@groxigo/` scope:

- `@groxigo/tokens` - Design tokens
- `@groxigo/components` - (future) Shared components
- `@groxigo/utils` - (future) Utility functions
- `@groxigo/icons` - (future) Icon library

## Internal Dependencies

Packages can depend on each other using workspace references:

```json
{
  "dependencies": {
    "@groxigo/tokens": "*"
  }
}
```

The `*` version means "use the local workspace version".

## Build System

### Root Scripts

- `npm run build` - Build all packages
- `npm run build:tokens` - Build specific package
- `npm run clean` - Clean all build outputs
- `npm run test` - Run tests (if present)
- `npm run lint` - Run linting (if present)

### Package Scripts

Each package can define its own scripts:
- `build` - Build the package
- `clean` - Clean build outputs
- `test` - Run tests
- `lint` - Run linting

## Adding a New Package

See [PACKAGE_TEMPLATE.md](./PACKAGE_TEMPLATE.md) for detailed instructions.

Quick steps:
1. Create directory: `mkdir packages/my-package`
2. Initialize package.json with `@groxigo/my-package` name
3. Add source files in `src/`
4. Run `npm install` from root
5. Build: `npm run build`

## Benefits of Monorepo Structure

✅ **Single Source of Truth** - All shared code in one place
✅ **Easy Dependency Management** - Automatic linking between packages
✅ **Unified Versioning** - Coordinate releases across packages
✅ **Code Sharing** - Share utilities, types, and configurations
✅ **Simplified CI/CD** - Single repository, unified workflows
✅ **Better Developer Experience** - Easy navigation, refactoring, and testing

## Integration with Projects

Projects outside the monorepo can consume packages via:

1. **Workspace** - Add `groxigo-libs/packages/*` to workspace
2. **File Protocol** - `"@groxigo/tokens": "file:../groxigo-libs/packages/tokens"`
3. **npm link** - For development
4. **Published Package** - If packages are published to npm

## Future Packages

Potential packages to add:

- `@groxigo/components` - React Native component library
- `@groxigo/utils` - Utility functions and helpers
- `@groxigo/icons` - Icon components and assets
- `@groxigo/hooks` - Shared React hooks
- `@groxigo/api` - API client and types
- `@groxigo/animations` - Animation utilities
- `@groxigo/forms` - Form components and validation

