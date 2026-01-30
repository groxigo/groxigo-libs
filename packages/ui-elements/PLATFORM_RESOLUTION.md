# Platform-Specific File Resolution

## How It Works

**Yes, the consuming app just uses `Text` (or any component) normally!**

React Native's Metro bundler automatically resolves platform-specific files at **build/bundle time**, not runtime. You don't need to do anything special.

## Example Usage

In your consuming app (like `ui-demo`), you just import normally:

```typescript
import { Text, Button } from '@groxigo/ui-elements';

export default function MyScreen() {
  return (
    <View>
      <Text variant="h1">Hello World</Text>
      <Button onPress={() => {}}>Click Me</Button>
    </View>
  );
}
```

**That's it!** No platform detection needed in your code.

## How Metro Resolves Files

When Metro bundler processes your import, it follows this resolution order:

### For iOS:
1. Looks for `Text.ios.tsx` → **Uses this**
2. Falls back to `Text.tsx` if not found

### For Android:
1. Looks for `Text.android.tsx` → **Uses this**
2. Falls back to `Text.tsx` if not found

### For Web:
1. Looks for `Text.web.tsx` → **Uses this**
2. Falls back to `Text.tsx` if not found

## File Structure

```
ui-elements/src/elements/Text/
  ├── Text.tsx          # Fallback (used if platform-specific doesn't exist)
  ├── Text.ios.tsx      # iOS-specific implementation
  ├── Text.android.tsx  # Android-specific implementation
  ├── Text.web.tsx      # Web-specific implementation
  ├── Text.types.ts     # Shared types
  ├── Text.styles.ts    # Shared styles
  └── index.ts          # Exports Text component
```

## Resolution Process

### Step 1: Import Statement
```typescript
// In your app
import { Text } from '@groxigo/ui-elements';
```

### Step 2: Metro Looks at index.ts
```typescript
// ui-elements/src/elements/Text/index.ts
export { Text, default } from './Text';
```

### Step 3: Metro Resolves Platform File
When Metro sees `from './Text'`, it automatically looks for:
- `Text.ios.tsx` (on iOS)
- `Text.android.tsx` (on Android)  
- `Text.web.tsx` (on Web)
- `Text.tsx` (fallback)

### Step 4: Bundle Contains Only Relevant Code
- **iOS bundle** only includes `Text.ios.tsx` code
- **Android bundle** only includes `Text.android.tsx` code
- **Web bundle** only includes `Text.web.tsx` code

## How Metro Knows the Platform

Metro determines the platform from:

1. **Build command**: 
   - `expo start --ios` → iOS
   - `expo start --android` → Android
   - `expo start --web` → Web

2. **Platform constant**: Metro uses `Platform.OS` internally during bundling

3. **File extensions**: Metro's resolver checks for `.ios.*`, `.android.*`, `.web.*` extensions

## Example Resolution Flow

### iOS Build:
```
App imports: Text from '@groxigo/ui-elements'
    ↓
index.ts exports: Text from './Text'
    ↓
Metro resolves: Text.ios.tsx (because Platform.OS === 'ios')
    ↓
Bundle includes: Only Text.ios.tsx code
```

### Android Build:
```
App imports: Text from '@groxigo/ui-elements'
    ↓
index.ts exports: Text from './Text'
    ↓
Metro resolves: Text.android.tsx (because Platform.OS === 'android')
    ↓
Bundle includes: Only Text.android.tsx code
```

### Web Build:
```
App imports: Text from '@groxigo/ui-elements'
    ↓
index.ts exports: Text from './Text'
    ↓
Metro resolves: Text.web.tsx (because Platform.OS === 'web')
    ↓
Bundle includes: Only Text.web.tsx code
```

## Important Points

1. **No Runtime Detection**: Platform resolution happens at build time, not runtime
2. **No Conditional Imports**: You don't need `if (Platform.OS === 'ios')` in your app code
3. **Bundle Size**: Each platform bundle only includes code for that platform
4. **Type Safety**: TypeScript understands all platform files, so you get full type checking
5. **Transparent**: The consuming app doesn't need to know about platform-specific files

## Metro Configuration

The Metro bundler (configured in `metro.config.js`) handles this automatically. No special configuration needed for platform resolution - it's built into React Native.

However, for monorepo setups, you need to ensure Metro watches the source files:

```javascript
// metro.config.js
defaultConfig.watchFolders = [
  path.join(libsRoot, 'packages/ui-elements/src'),
  // ... other paths
];
```

## Verification

To verify which file is being used:

1. **Add console.log** in each platform file:
   ```typescript
   // Text.ios.tsx
   console.log('Using iOS Text component');
   
   // Text.android.tsx
   console.log('Using Android Text component');
   
   // Text.web.tsx
   console.log('Using Web Text component');
   ```

2. **Run on each platform** and check the console output

3. **Check bundle contents** (advanced):
   - iOS: Check the `.jsbundle` file
   - Android: Check the `index.android.bundle` file
   - Web: Check the webpack bundle

## Common Questions

### Q: Do I need to import differently for each platform?
**A:** No! Just `import { Text } from '@groxigo/ui-elements'` works everywhere.

### Q: Can I force a specific platform file?
**A:** Not recommended, but you could import directly:
```typescript
import Text from '@groxigo/ui-elements/src/elements/Text/Text.ios';
```
This breaks the automatic resolution and is not recommended.

### Q: What if a platform file doesn't exist?
**A:** Metro falls back to the base `Text.tsx` file automatically.

### Q: Can I have platform-specific logic in the same file?
**A:** Yes, using `Platform.OS`:
```typescript
import { Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';
```
But platform-specific files are cleaner and more maintainable.

## Summary

- ✅ **Consuming app**: Just import `Text` normally
- ✅ **Library**: Provides platform-specific files (`.ios.tsx`, `.android.tsx`, `.web.tsx`)
- ✅ **Metro**: Automatically resolves the right file at build time
- ✅ **Result**: Each platform gets optimized code without any app-level changes

The magic happens in Metro's resolver - you just write normal React Native code!

