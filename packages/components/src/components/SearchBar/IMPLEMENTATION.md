# SearchBar Component - Implementation Details

## Overview

The `SearchBar` component is a composite UI component that provides a search input field with integrated search icon and optional clear button. It's built on top of the `Input` component from `@groxigo/ui-elements` and provides platform-specific optimizations for mobile and web.

## Design Reference

The SearchBar design is inspired by modern quick-commerce applications (reference: Blinkit-style search bar). Key design features:
- **More rounded corners**: Uses `radius.lg` (10px) instead of the default `radius.md` (8px) for a softer, more modern appearance
- Clean, minimal design with prominent search functionality
- Platform-optimized sizing and layout

*Note: Keep the reference image for future feature additions and design iterations.*

## Component Structure

```
SearchBar/
├── index.ts                    # Public exports
├── SearchBar.tsx               # Main mobile implementation (iOS/Android)
├── SearchBar.web.tsx           # Web-specific implementation
├── SearchBar.types.ts          # TypeScript type definitions
├── SearchBar.styles.ts         # Style utilities
├── SearchBar.hooks.ts          # Shared hooks for business logic
├── SearchBar.hooks.test.ts     # Tests for shared hooks
├── SearchBar.mobile.test.tsx   # Mobile-specific tests
├── SearchBar.web.test.tsx      # Web-specific tests
├── SearchBar.test.shared.tsx   # Shared test utilities
├── IMPLEMENTATION.md           # This file - component documentation
├── TEST_STRUCTURE.md           # Testing documentation
└── DUPLICATE_CODE_ANALYSIS.md  # Refactoring analysis
```

## API / Props

### SearchBarProps

The component extends `InputProps` from `@groxigo/ui-elements` (excluding `leftIcon` and `rightIcon` which are handled internally).

```typescript
interface SearchBarProps extends Omit<InputProps, 'leftIcon' | 'rightIcon'> {
  /**
   * Callback when search text changes
   */
  onSearch?: (text: string) => void;
  
  /**
   * Callback when clear button is pressed
   */
  onClear?: () => void;
  
  /**
   * Whether to show clear button when there's text
   * @default true
   */
  showClearButton?: boolean;
  
  /**
   * Additional container style
   */
  containerStyle?: ViewStyle;
}
```

### Key Props

#### Core Props
- **value** (string, optional): Controlled input value
- **onChangeText** (function, optional): Standard input change handler
- **onSearch** (function, optional): Debounced callback when search text changes (only triggers after minSearchLength)
- **onClear** (function, optional): Called when clear button is pressed
- **showClearButton** (boolean, default: true): Toggle clear button visibility
- **placeholder** (string, default: 'Search...'): Input placeholder text
- **containerStyle** (ViewStyle, optional): Additional container styling

#### Search Configuration
- **debounceMs** (number, default: 300): Debounce delay in milliseconds for onSearch callback
- **minSearchLength** (number, default: 3): Minimum characters required before triggering search
- **isLoading** (boolean, default: false): Shows loading indicator instead of clear button

#### Back Button
- **showBackButton** (boolean, default: false): Show back icon on the left
- **onBack** (function, optional): Callback when back button is pressed
- **backIcon** (ReactNode, optional): Custom back icon component

#### Search Results
- **results** (array, default: []): Array of search results to display in dropdown
- **renderResultItem** (function, optional): Custom render function for each result item
- **onResultSelect** (function, optional): Callback when a result item is selected
- **showResults** (boolean, optional): Control dropdown visibility (defaults to true when results exist)
- **maxResults** (number, default: 5): Maximum number of results to display

#### Placeholder Rotation
- **placeholderSuggestions** (string[], default: ['atta', 'tomato', 'onion']): Suggestions to rotate in placeholder
- **placeholderRotationInterval** (number, default: 5000): Interval in milliseconds for rotation

- All other `InputProps` are passed through to the underlying Input component

## Implementation Details

### State Management

The component uses internal state (`searchValue`) when used in uncontrolled mode:
- If `value` prop is provided, component is controlled
- If `value` is undefined, component manages its own state
- Clear button visibility is based on whether there's text in the input

### Event Handlers

1. **handleChangeText**: 
   - Updates internal state (if uncontrolled)
   - Calls `onChangeText` if provided
   - Calls `onSearch` if provided (for convenience)

2. **handleClear**:
   - Clears internal state (if uncontrolled)
   - Calls `onChangeText('')` if provided
   - Calls `onClear` if provided
   - Calls `onSearch('')` if provided

### Icons

- **Left Icon**: Search icon (`name="search"`, `size="md"`) - always visible
- **Right Icon**: Clear button (`name="x"`, `size="sm"`) - conditionally visible based on `showClearButton` prop and input value

## Platform-Specific Behavior

### Mobile (iOS/Android)

- **Size**: `md` (40px height - 5 × 8px grid)
- **Width**: Full width (100%)
- **Implementation**: Uses React Native `View` and `Pressable` components
- **File**: `SearchBar.tsx`

### Web

- **Size**: `lg` (48px height - 6 × 8px grid)
- **Width**: Max 600px, centered (`margin: 0 auto`)
- **Implementation**: Uses native HTML elements (`div`, `button`) for better accessibility and SEO
- **Accessibility**: Clear button includes `aria-label="Clear search"`
- **File**: `SearchBar.web.tsx`

### Platform Detection

- Mobile implementation uses `Platform.OS === 'web'` check
- React Native automatically loads `.web.tsx` file on web platform
- Styles are conditionally applied based on platform

## Styling

### Container Styles

The container styling is handled by `getSearchBarStyles()` function:

**Mobile:**
```typescript
{
  width: '100%'
}
```

**Web:**
```typescript
{
  width: '100%',
  maxWidth: 600,  // Design constraint (not a spacing token)
  alignSelf: 'center'  // or margin: '0 auto' in web version
}
```

### Border Radius

The SearchBar uses **more rounded corners** than the standard Input component:
- **SearchBar**: `radius.lg` (10px) - for a softer, more modern appearance
- **Standard Input**: `radius.md` (8px) - default for other inputs

This is achieved by overriding the Input's `style` prop with a custom `borderRadius` value.

### Design Decisions

- **Max Width (600px)**: This is a component-specific design constraint, not a standard spacing token. This is acceptable as it's a UX decision for optimal search bar width on web.
- **8px Grid System**: Component follows the 8px grid system:
  - Mobile: 40px = 5 × 8px
  - Web: 48px = 6 × 8px
- **Rounded Corners**: Uses `radius.lg` (10px) for a more modern, approachable appearance, matching current design trends in quick-commerce applications

## Dependencies

- `@groxigo/ui-elements`: Input and Icon components
- `@groxigo/tokens`: Design tokens for spacing and styling
- `react-native`: Core React Native components (View, Pressable, Platform)

## Usage Examples

### Basic Usage (Uncontrolled)

```typescript
import { SearchBar } from '@groxigo/components';

function MyComponent() {
  return (
    <SearchBar
      placeholder="Search products..."
      onSearch={(text) => console.log('Searching for:', text)}
    />
  );
}
```

### Controlled Usage

```typescript
import { SearchBar } from '@groxigo/components';
import { useState } from 'react';

function MyComponent() {
  const [searchText, setSearchText] = useState('');

  return (
    <SearchBar
      value={searchText}
      onChangeText={setSearchText}
      onSearch={(text) => {
        // Perform search operation
        performSearch(text);
      }}
      onClear={() => {
        // Handle clear action
        console.log('Search cleared');
      }}
    />
  );
}
```

### Without Clear Button

```typescript
<SearchBar
  showClearButton={false}
  placeholder="Search..."
  onSearch={handleSearch}
/>
```

### With Custom Styling

```typescript
<SearchBar
  placeholder="Search..."
  containerStyle={{ marginBottom: 16 }}
  onSearch={handleSearch}
/>
```

### With Additional Input Props

```typescript
<SearchBar
  placeholder="Search..."
  autoFocus
  returnKeyType="search"
  onSubmitEditing={() => console.log('Submitted')}
  onSearch={handleSearch}
/>
```

## Current Implementation Notes

### Strengths

✅ Platform-specific optimizations (mobile vs web)  
✅ Flexible controlled/uncontrolled usage  
✅ Follows 8px grid system  
✅ Accessible (web version includes aria-label)  
✅ Type-safe with TypeScript  
✅ Extensible (accepts all InputProps)  
✅ Modern design with more rounded corners (`radius.lg`)  

### Implemented Features ✅

1. **Debouncing** ✅ - Added `debounceMs` prop (default: 300ms)
2. **Loading State** ✅ - Added `isLoading` prop with ActivityIndicator
3. **Search Results Dropdown** ✅ - Added `results`, `renderResultItem`, `onResultSelect` props
4. **Back Icon Support** ✅ - Added `showBackButton`, `onBack`, `backIcon` props
5. **Performance Optimizations** ✅ - All handlers use `useCallback` for memoization
6. **Unit Tests** ✅ - Comprehensive test suite created
7. **Documentation** ✅ - JSDoc comments and examples added
8. **Error Handling** ✅ - Edge cases handled (empty results, controlled/uncontrolled modes)

### Potential Future Improvements

1. **Keyboard Handling**: Could add `onSubmit` prop for explicit submit handling
2. **Icon Customization**: Could add `searchIcon` prop for custom search icon
3. **Clear Button Styling**: Could add `clearButtonStyle` prop for customization
4. **Accessibility**: Could add more ARIA attributes (`role="search"`, etc.)
5. **Voice Search**: Add microphone icon for voice search functionality
6. **Recent Searches**: Store and display recent search history
7. **Category Filters**: Add category-based search filters
8. **Click Outside to Close**: Auto-close results dropdown when clicking outside

## File-by-File Breakdown

### SearchBar.tsx (Mobile)
- Main implementation for iOS/Android
- Uses React Native components (View, Pressable, Animated, FlatList)
- Platform detection for conditional styling
- Uses shared hooks from `SearchBar.hooks.ts` for business logic
- Platform-specific: React Native Animated API for fade effects

### SearchBar.web.tsx (Web)
- Web-optimized implementation
- Uses native HTML elements via `createElement`
- Better accessibility with ARIA labels
- CSS-style flattening for web compatibility
- Uses shared hooks from `SearchBar.hooks.ts` for business logic
- Platform-specific: CSS transitions for animations

### SearchBar.hooks.ts
- **Shared business logic** extracted from both platform implementations
- `useSearchBarState`: State management (searchValue, isFocused, placeholder rotation, results)
- `useDebouncedSearch`: Debouncing logic with minimum character validation
- `useSearchBarHandlers`: Event handlers (handleChangeText, handleClear, handleFocus, etc.)
- `validateControlledMode`: Validation utility for controlled/uncontrolled mode
- **Benefits**: ~300 lines of duplicate code removed, single source of truth for business logic

### SearchBar.types.ts
- TypeScript interface definitions
- Extends InputProps appropriately
- Well-documented with JSDoc comments

### SearchBar.styles.ts
- Platform-aware styling utility
- Follows design system constraints
- Clean separation of concerns

### SearchBar.hooks.test.ts
- Comprehensive tests for shared hooks
- Tests state management, debouncing, event handlers, validation
- 21 test cases covering all shared logic

### SearchBar.mobile.test.tsx & SearchBar.web.test.tsx
- Platform-specific test files
- Tests platform-specific rendering and behavior
- Uses appropriate testing libraries (@testing-library/react-native vs @testing-library/react)

### index.ts
- Public API exports
- Re-exports types for convenience

## Integration Points

The component integrates with:
- `@groxigo/ui-elements/Input` - Base input component
- `@groxigo/ui-elements/Icon` - Icon components
- `@groxigo/tokens` - Design tokens for spacing

## Recent Changes

### Version 2.1.0 - Code Refactoring & Shared Hooks

#### Refactoring for Code Reuse
- **Created**: `SearchBar.hooks.ts` - Shared hooks for business logic
- **Extracted**: State management, debouncing, event handlers, validation logic
- **Result**: ~300 lines of duplicate code removed between mobile and web
- **Benefits**: 
  - Single source of truth for business logic
  - Easier maintenance (bug fixes in one place)
  - Better testability (shared logic tested independently)
  - Consistent behavior across platforms

#### Shared Hooks Created
- `useSearchBarState`: Manages all state (searchValue, isFocused, placeholder rotation, results)
- `useDebouncedSearch`: Handles debouncing with minimum character validation
- `useSearchBarHandlers`: All event handlers (change, clear, focus, blur, back, result select)
- `validateControlledMode`: Validates controlled/uncontrolled prop combinations

#### Testing Improvements
- **Created**: `SearchBar.hooks.test.ts` - 21 tests for shared hooks
- **Created**: `SearchBar.mobile.test.tsx` - Mobile-specific tests
- **Created**: `SearchBar.web.test.tsx` - Web-specific tests
- **Created**: `SearchBar.test.shared.tsx` - Shared test utilities
- **Fixed**: Test performance issues (tests now run in <1 second)

### Version 2.0.0 - Major Feature Additions

#### Debouncing & Minimum Character Search
- **Added**: `debounceMs` prop (default: 300ms) for debouncing search calls
- **Added**: `minSearchLength` prop (default: 3) - only triggers search after minimum characters
- **Implementation**: Uses `useCallback` and `setTimeout` for efficient debouncing
- **Impact**: Reduces unnecessary API calls and improves performance

#### Back Icon Support
- **Added**: `showBackButton` prop to display back icon on the left
- **Added**: `onBack` callback for back button press
- **Added**: `backIcon` prop for custom back icon component
- **Implementation**: Replaces or works alongside search icon
- **Use Case**: For dedicated search pages that need navigation back

#### Search Results Dropdown
- **Added**: `results` prop - array of search results to display
- **Added**: `renderResultItem` prop - custom render function for result items
- **Added**: `onResultSelect` callback when a result is selected
- **Added**: `showResults` prop to control dropdown visibility
- **Added**: `maxResults` prop (default: 5) to limit displayed results
- **Implementation**: Positioned dropdown below input with proper styling
- **Features**: Supports any component type (products, recipes, etc.)

#### Clear Results on Backspace
- **Added**: Automatically clears search results when input is cleared
- **Implementation**: Triggers `onSearch('')` when input becomes empty
- **Impact**: Better UX - results disappear when user clears input

#### Performance Optimizations
- **Changed**: All event handlers now use `useCallback` for memoization
- **Impact**: Prevents unnecessary re-renders and improves performance

#### Loading State
- **Added**: `isLoading` prop to show loading indicator
- **Implementation**: Shows ActivityIndicator instead of clear button when loading
- **Use Case**: Display loading state during search API calls

### Version 1.0.1 - Border Radius Update
- **Changed**: Border radius increased from `radius.md` (8px) to `radius.full` (9999px)
- **Reason**: To match modern design trends seen in quick-commerce applications (reference image)
- **Implementation**: Overrides Input's default borderRadius via style prop
- **Impact**: Fully rounded, pill-shaped appearance

## Next Steps for Discussion

1. Review the potential improvements listed above
2. Decide on debouncing strategy
3. Consider loading state requirements
4. Evaluate accessibility enhancements
5. Plan testing strategy
6. Consider performance optimizations
7. **Future features based on reference image**:
   - Voice search button (microphone icon on the right)
   - Search suggestions/autocomplete dropdown
   - Recent searches functionality
   - Category-based search filters

## Usage Examples

### With Debouncing and Minimum Characters

```typescript
<SearchBar
  onSearch={(text) => {
    // Only called after 3+ characters and 300ms debounce
    performSearch(text);
  }}
  debounceMs={300}
  minSearchLength={3}
/>
```

### With Back Button

```typescript
<SearchBar
  showBackButton={true}
  onBack={() => {
    navigation.goBack();
  }}
  placeholderSuggestions={['atta', 'tomato', 'onion']}
/>
```

### With Search Results

```typescript
<SearchBar
  value={searchText}
  onChangeText={setSearchText}
  results={searchResults}
  renderResultItem={(result) => (
    <ProductCard product={result} />
  )}
  onResultSelect={(result) => {
    navigateToProduct(result);
  }}
  maxResults={5}
/>
```

### With Loading State

```typescript
<SearchBar
  value={searchText}
  onChangeText={setSearchText}
  onSearch={handleSearch}
  results={results}
  isLoading={isSearching}
/>
```

### Complete Example

```typescript
const [searchText, setSearchText] = useState('');
const [results, setResults] = useState([]);
const [isSearching, setIsSearching] = useState(false);

const handleSearch = async (text: string) => {
  if (text.length < 3) {
    setResults([]);
    return;
  }
  
  setIsSearching(true);
  try {
    const searchResults = await searchAPI(text);
    setResults(searchResults);
  } finally {
    setIsSearching(false);
  }
};

<SearchBar
  value={searchText}
  onChangeText={setSearchText}
  onSearch={handleSearch}
  results={results}
  isLoading={isSearching}
  renderResultItem={(result) => (
    <View>
      <Text>{result.name}</Text>
      <Text>{result.description}</Text>
    </View>
  )}
  onResultSelect={(result) => {
    navigateToDetail(result);
  }}
  debounceMs={300}
  minSearchLength={3}
  maxResults={5}
/>
```

---

*Last Updated: [Current Date]*  
*Component Version: 2.0.0*  
*Design Reference: Blinkit-style search bar (image saved for reference)*

