# SearchBar Test Structure

## Overview

The SearchBar component has platform-specific implementations:
- **Mobile**: `SearchBar.tsx` - React Native implementation
- **Web**: `SearchBar.web.tsx` - Web-specific implementation using HTML elements

## Test Files

### 1. `SearchBar.test.shared.tsx`
- **Purpose**: Shared utilities, constants, and common test helpers
- **Contains**: 
  - `defaultProps` - Default test props
  - `mockResults` - Mock search results
  - Common test case definitions

### 2. `SearchBar.mobile.test.tsx`
- **Purpose**: Tests for mobile/React Native implementation
- **Testing Library**: `@testing-library/react-native`
- **Platform-Specific Tests**:
  - React Native Animated API usage
  - Mobile sizing (md, 40px height)
  - React Native components (View, Pressable, FlatList)
  - Mobile-specific padding and styling

### 3. `SearchBar.web.test.tsx`
- **Purpose**: Tests for web implementation
- **Testing Library**: `@testing-library/react`
- **Platform-Specific Tests**:
  - HTML elements (input, div, button)
  - CSS transitions for animations
  - Web sizing (lg, 48px height, reduced to 40px)
  - Web-specific padding (increased left padding)
  - DOM APIs and window events

## Running Tests

```bash
# Run all SearchBar tests
npm test SearchBar

# Run only mobile tests
npm test SearchBar.mobile

# Run only web tests
npm test SearchBar.web

# Run with coverage
npm run test:coverage SearchBar
```

## Benefits of Separate Test Files

1. **Platform-Specific Testing**: Each platform can be tested with appropriate testing libraries
2. **Clear Separation**: Easy to identify which tests apply to which platform
3. **Maintainability**: Changes to one platform don't affect the other's tests
4. **Accurate Mocks**: Platform-specific mocks (React Native vs DOM)
5. **Better Coverage**: Can test platform-specific features independently

## Shared Test Cases

Common functionality that works the same on both platforms:
- Placeholder rotation
- Debouncing
- Minimum search length
- Clear functionality
- Back button
- Search results
- Loading state

These can be tested in both files or extracted to shared test utilities.

