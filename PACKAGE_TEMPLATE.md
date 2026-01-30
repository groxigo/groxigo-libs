# Adding a New Package to Groxigo Libs

This guide shows you how to add a new package to the monorepo.

## Step 1: Create Package Directory

```bash
mkdir packages/my-new-package
cd packages/my-new-package
```

## Step 2: Initialize Package

Create a basic `package.json`:

```json
{
  "name": "@groxigo/my-new-package",
  "version": "1.0.0",
  "description": "Description of your package",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "clean": "rm -rf dist",
    "prepublishOnly": "npm run clean && npm run build"
  },
  "keywords": [
    "groxigo",
    "your-keywords"
  ],
  "author": "Groxigo",
  "license": "MIT",
  "files": [
    "dist",
    "src",
    "README.md"
  ]
}
```

## Step 3: Create Source Structure

```bash
mkdir -p src
touch src/index.ts
```

Add your source files in the `src/` directory.

## Step 4: Add TypeScript Configuration

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Step 5: Add README

Create `README.md` with:
- Package description
- Installation instructions
- Usage examples
- API documentation

## Step 6: Add to Root Scripts (Optional)

If you want a dedicated build script in the root, add to root `package.json`:

```json
{
  "scripts": {
    "build:my-package": "npm run build --workspace=@groxigo/my-package"
  }
}
```

## Step 7: Install Dependencies

From the root directory:

```bash
npm install
```

This will install dependencies and set up workspace links.

## Step 8: Build and Test

```bash
# From root
npm run build:my-package

# Or from package directory
cd packages/my-package
npm run build
```

## Package Structure Template

```
packages/my-package/
├── src/
│   ├── index.ts
│   └── ...
├── dist/              # Generated (gitignored)
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore (optional)
```

## Example: Component Library Package

If you're creating a component library:

```typescript
// src/index.ts
export * from './components/Button';
export * from './components/Card';
// ...

// src/components/Button.tsx
import React from 'react';
import { tokens } from '@groxigo/tokens/react-native';

export const Button = ({ children, ...props }) => {
  return (
    <View style={{ 
      backgroundColor: tokens.colors.alias.groceries.primary.default,
      padding: tokens.spacing[4],
    }}>
      {children}
    </View>
  );
};
```

## Best Practices

1. **Naming**: Use `@groxigo/package-name` format
2. **Dependencies**: Use workspace references for internal packages:
   ```json
   {
     "dependencies": {
       "@groxigo/tokens": "*"
     }
   }
   ```
3. **Build Output**: Put generated files in `dist/`
4. **Types**: Always provide TypeScript definitions
5. **Documentation**: Include comprehensive README
6. **Testing**: Add tests if applicable
7. **Versioning**: Follow semantic versioning

## Common Package Types

### Utility Library
- Pure functions
- No UI dependencies
- Used across platforms

### Component Library
- React/React Native components
- Depends on `@groxigo/tokens`
- Platform-specific implementations

### Hook Library
- Custom React hooks
- Shared logic
- Reusable patterns

### Icon Library
- SVG icons
- Icon components
- Icon font

## Integration Example

To use your new package in other projects:

```bash
# In groxigo-ui/package.json
{
  "dependencies": {
    "@groxigo/my-package": "file:../groxigo-libs/packages/my-package"
  }
}
```

