# CategoryNavBar Component

## Overview

`CategoryNavBar` is a specialized navigation bar component designed for category detail screens. It wraps the existing `Header` component and provides a convenient API for displaying:
- Back button (left)
- Category name (center, left-aligned)
- Search icon (right)

The component supports both callback-based navigation and automatic router navigation (expo-router/react-navigation).

## API

### Props

```typescript
interface CategoryNavBarProps {
  // Required
  categoryName: string;

  // Navigation (optional)
  onBack?: () => void;
  onSearchPress?: () => void;

  // Styling
  section?: 'groceries' | 'recipes' | 'default';
  elevated?: boolean; // Default: true
  fixed?: boolean; // Default: false
  backgroundColor?: string; // Supports opaque colors with alpha/rgba
  style?: ViewStyle;

  // Accessibility
  accessibilityLabel?: string;
  testID?: string;
}
```

### Props Details

- **categoryName** (string, required): The category name to display in the navigation bar
- **onBack** (function, optional): Callback when back button is pressed. If not provided and router is available, will use router.back()
- **onSearchPress** (function, optional): Callback when search icon is pressed. If not provided, will try to navigate to search screen
- **section** ('groceries' | 'recipes' | 'default'): Section theming - affects category name color
- **elevated** (boolean): Whether header has shadow/elevation (default: true)
- **fixed** (boolean): Whether header is fixed at the top (default: false)
- **backgroundColor** (string): Background color override (supports opaque colors with alpha/rgba)
- **style** (ViewStyle): Additional container styling
- **accessibilityLabel** (string): Accessibility label for the navigation bar
- **testID** (string): Test ID for testing

## Design Specifications

- **Category name alignment**: Left-aligned starting after back button (standard header pattern)
- **Icon sizes**: 24px for both back arrow and search icon
- **Touch targets**: 44×44px minimum for accessibility
- **Background**: Default white, but allows `backgroundColor` prop override for opaque colors
- **Header height**: Standard mobile header height (~56px)

## Navigation Support

### Callback Navigation

```typescript
<CategoryNavBar
  categoryName="Fruits & Vegetables"
  onBack={() => navigation.goBack()}
  onSearchPress={() => navigateToSearch()}
/>
```

### Router Navigation (Auto)

If `expo-router` or `@react-navigation/native` is installed, the component will automatically use router navigation:

```typescript
// Automatically uses router.back() if onBack not provided
// Automatically navigates to /search if onSearchPress not provided
<CategoryNavBar
  categoryName="Fruits & Vegetables"
  section="groceries"
/>
```

The component will:
1. Try `expo-router` first (uses `router.back()` and `router.push('/search')`)
2. Fall back to `react-navigation` (uses `navigation.goBack()` and `navigation.navigate('Search')`)
3. Show a console warning if neither is available and no callbacks are provided

## Usage Examples

### Basic Usage

```typescript
import { CategoryNavBar } from '@groxigo/components';

<CategoryNavBar
  categoryName="Beans, Brinjals & Okra"
  onBack={() => router.back()}
  onSearchPress={() => router.push('/search')}
/>
```

### With Section Theming

```typescript
<CategoryNavBar
  categoryName="Fresh Vegetables"
  section="groceries" // Category name will be blue
  onBack={handleBack}
/>
```

### Fixed Position with Opaque Background

```typescript
<CategoryNavBar
  categoryName="Category Name"
  fixed={true}
  backgroundColor="rgba(255, 255, 255, 0.95)"
  onBack={handleBack}
/>
```

### Recipes Section

```typescript
<CategoryNavBar
  categoryName="Desserts"
  section="recipes" // Category name will be green
  onBack={handleBack}
/>
```

## Implementation Details

### Component Structure

- Wraps the existing `Header` component
- Builds back button and search icon as React elements
- Passes them to Header via `leftAction` and `rightActions` props
- Handles navigation logic with optional router dependencies

### Back Button

- Uses `Icon` component with `arrow.left` icon
- 24px icon size
- 44×44px touch target
- Pressable with opacity feedback

### Search Icon

- Uses `Icon` component with `search` icon
- 24px icon size
- 44×44px touch target
- Pressable with opacity feedback

### Fixed Positioning

When `fixed={true}`:
- **Mobile**: Uses `position: 'absolute'` with `top: 0, left: 0, right: 0` and `zIndex: 1000`
- **Web**: Uses CSS `position: fixed` with same positioning

### Background Color

- Defaults to white (`tokens.colors.alias.shared.surface.primary`)
- Can be overridden with `backgroundColor` prop
- Supports opaque colors (e.g., `rgba(255, 255, 255, 0.95)`)

## Platform-Specific Behavior

### Mobile

- Uses React Native `Pressable` for touch interactions
- Icon buttons have 44×44px touch targets
- Supports safe area insets (handled by app)

### Web

- Uses native HTML `<button>` elements for better accessibility
- Uses `createElement` for web optimization
- Hover states with opacity transitions
- Semantic HTML via Header component (`<header>` element)

## Accessibility

- Back button has `aria-label="Go back"` (web) and `accessibilityLabel="Go back"` (mobile)
- Search icon has `aria-label="Search"` (web) and `accessibilityLabel="Search"` (mobile)
- Touch targets meet minimum 44×44px requirement
- Keyboard navigation supported (web)

## Related Components

- **Header**: Base header component that CategoryNavBar wraps
- **SearchBar**: Search input component (can be used on search screen)
- **CategoryTile**: Category display component

## Testing

The component can be tested using the `testID` prop:

```typescript
<CategoryNavBar
  categoryName="Test Category"
  testID="category-nav"
/>
```

This creates test IDs:
- `category-nav` - Main navigation bar
- `category-nav-back` - Back button
- `category-nav-search` - Search icon button

## Recent Changes

### Version 1.0.0
- Initial implementation
- Wrapper around Header component
- Support for callback and router navigation
- Fixed positioning support
- Background color override support
- Section theming support



