# Integration Guide

This guide explains how to integrate `@groxigo/tokens` into your projects.

## Local Development Setup

Since `groxigo-libs` is a local package, you have several options for integration:

### Option 1: npm/yarn workspaces (Recommended)

Create a root `package.json` in the `Groxigo` directory:

```json
{
  "name": "groxigo-workspace",
  "private": true,
  "workspaces": [
    "groxigo-libs/packages/*",
    "groxigo-ui",
    "Groxigodesignsystem"
  ]
}
```

Then in each project's `package.json`, add:

```json
{
  "dependencies": {
    "@groxigo/tokens": "*"
  }
}
```

Run `npm install` from the root directory.

### Option 2: File protocol (Simple)

In `groxigo-ui/package.json` and `Groxigodesignsystem/package.json`, add:

```json
{
  "dependencies": {
    "@groxigo/tokens": "file:../groxigo-libs/packages/tokens"
  }
}
```

Then run `npm install` in each project.

### Option 3: npm link (Development)

From `groxigo-libs`:
```bash
npm link
```

From `groxigo-ui` and `Groxigodesignsystem`:
```bash
npm link @groxigo/tokens
```

## Integration Steps

### For groxigo-ui (React Native/Expo)

1. **Install the package** (using one of the methods above)

2. **Update theme file** (`constants/theme.ts`):
   ```typescript
   import { tokens } from '@groxigo/tokens/react-native';
   
   export const Colors = {
     light: {
       text: tokens.colors.alias.shared.text.primary,
       background: tokens.colors.alias.shared.surface.primary,
       tint: tokens.colors.alias.groceries.primary.default,
       // ... use tokens throughout
     },
     // ...
   };
   ```

3. **Use tokens in components**:
   ```typescript
   import { tokens } from '@groxigo/tokens/react-native';
   import { StyleSheet } from 'react-native';
   
   const styles = StyleSheet.create({
     button: {
       backgroundColor: tokens.colors.alias.groceries.primary.default,
       padding: tokens.spacing[4],
       borderRadius: tokens.radius.lg,
     },
   });
   ```

### For Groxigodesignsystem (Web Showcase)

1. **Install the package** (using one of the methods above)

2. **Replace globals.css**:
   Instead of maintaining tokens in `globals.css`, import from the package:
   
   ```css
   /* In your main CSS file */
   @import '@groxigo/tokens/css';
   ```

   Or copy the generated file:
   ```bash
   cp ../groxigo-libs/dist/css/tokens.css ./src/styles/tokens.css
   ```

3. **Update imports** in your components to use the generated CSS variables.

## Migration Path

### Step 1: Build tokens
```bash
cd groxigo-libs
npm run build:tokens
# or to build all packages
npm run build
```

### Step 2: Integrate incrementally
- Start by using tokens in new components
- Gradually migrate existing components
- Keep old styles until migration is complete

### Step 3: Update build processes
- Add token build step to CI/CD
- Ensure tokens are rebuilt when source files change

## Workflow

1. **Make token changes** in `groxigo-libs/src/tokens/*.ts`
2. **Build tokens**: `cd groxigo-libs && npm run build`
3. **Consume updated tokens** in consuming apps
4. **Test** across all platforms (iOS, Android, Web)

## Notes

- The `dist/` folder contains generated files - these should not be edited manually
- Always edit token source files in `src/tokens/`
- Run `npm run build` after making changes to token sources
- Consider adding a watch script for development

