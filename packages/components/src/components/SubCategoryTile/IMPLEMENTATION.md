# SubCategoryTile Component - Implementation Details

## Overview

The `SubCategoryTile` component is a smaller, reusable tile component that displays a subcategory with an image/icon and label. It's designed for displaying subcategories in the left navigation panel (18% width) when a user selects a category. The component is built from `@groxigo/ui-elements` primitives (Text, Icon, Image) and provides responsive sizing and layout for mobile and web platforms.

## Component Structure

```
SubCategoryTile/
├── index.ts                      # Public exports
├── SubCategoryTile.tsx           # Mobile implementation (iOS/Android)
├── SubCategoryTile.web.tsx       # Web-specific implementation with responsive layout
├── SubCategoryTile.types.ts      # TypeScript type definitions
├── SubCategoryTile.mobile.test.tsx  # Mobile-specific tests
├── SubCategoryTile.web.test.tsx  # Web-specific tests
├── SubCategoryTile.test.shared.tsx  # Shared test utilities
└── IMPLEMENTATION.md             # This file - component documentation
```

## API / Props

### SubCategoryTileProps

```typescript
interface SubCategoryTileProps {
  /**
   * SubCategory title/label displayed below or beside the image/icon
   */
  title: string;

  /**
   * Image source (takes precedence over icon if both provided)
   */
  image?: ImageSourcePropType;

  /**
   * Icon name (used if image is not provided)
   */
  icon?: IconName;

  /**
   * Callback when tile is pressed
   */
  onPress?: () => void;

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether the tile is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom container style
   */
  style?: ViewStyle;

  /**
   * Custom inner container style
   */
  containerStyle?: ViewStyle;

  /**
   * Accessibility label
   */
  accessibilityLabel?: string;

  /**
   * Test ID for testing
   */
  testID?: string;
}
```

### Key Props

#### Required Props
- **title** (string): The subcategory label displayed below or beside the image/icon

#### Optional Props
- **image** (ImageSourcePropType): Image source for the subcategory. Takes precedence over icon if both are provided
- **icon** (IconName): Icon name from ui-elements. Used if image is not provided
- **onPress** (function): Callback when tile is pressed
- **size** ('sm' | 'md' | 'lg'): Size variant, defaults to 'md'
- **disabled** (boolean): Whether the tile is disabled, defaults to false
- **style** (ViewStyle): Custom container style
- **containerStyle** (ViewStyle): Custom inner container style
- **accessibilityLabel** (string): Accessibility label for screen readers
- **testID** (string): Test ID for testing

## Implementation Details

### Responsive Sizing

The component provides responsive sizing that adapts to the platform:

**Mobile (iOS/Android):**
- sm: 72px width, 40px image/icon
- md: 80px width, 48px image/icon (default)
- lg: 96px width, 56px image/icon

**Web:**
- sm: 72px width, 32px image/icon
- md: 80px width, 40px image/icon (default)
- lg: 96px width, 48px image/icon

### Responsive Layout

The component adapts its layout based on screen size:

**Mobile (iOS/Android):**
- Always uses vertical layout (column direction)
- Image/icon displayed on top
- Text displayed below (max 2 lines)
- Centered alignment

**Web:**
- Vertical layout by default (for mobile-sized screens)
- Horizontal layout on larger screens (≥768px breakpoint)
- Image/icon on left, text on right
- Text can expand and wrap (max 2 lines)
- Uses CSS media queries for responsive behavior

### Image vs Icon

The component supports both images and icons:
- If `image` prop is provided, it displays the image
- If only `icon` prop is provided, it displays the icon in a styled container
- If neither is provided, only the title is displayed

### Platform-Specific Behavior

#### Mobile (iOS/Android)
- Uses React Native `Pressable` for touch interactions
- Uses React Native `Image` component
- Supports haptic feedback (via Pressable)
- Minimum touch target: 44×44px
- Always vertical layout (column direction)

#### Web
- Uses native HTML `div` elements
- Uses HTML `img` element via Image component
- Supports keyboard navigation (Enter/Space keys)
- Hover states and transitions
- Semantic HTML with ARIA attributes
- Responsive layout with CSS media queries
- Dynamic style injection for responsive behavior

## Styling

### Design Tokens Used

- **Spacing**: `tokens.spacing[1]`, `tokens.spacing[2]`
- **Radius**: `tokens.radius.md` for rounded corners
- **Colors**: 
  - Primary: `tokens.colors.alias.shared.primary.default`
  - Text: `tokens.colors.alias.shared.text.primary`
  - Surface: `tokens.colors.alias.shared.surface.secondary`
- **Opacity**: `tokens.opacity['50']` for disabled state, `tokens.opacity['80']` for pressed state

### Layout

**Mobile:**
- Vertical layout (column direction)
- Centered alignment
- Gap between image/icon and text
- Text truncation (2 lines max)

**Web:**
- Responsive layout
- Vertical by default (mobile screens)
- Horizontal on larger screens (≥768px)
- Text can be on side (left of image/icon)
- Text truncation (2 lines max)

## Usage Examples

### Basic Usage with Icon

```typescript
import { SubCategoryTile } from '@groxigo/components';

<SubCategoryTile
  title="Organic Fruits"
  icon="apple"
  onPress={() => navigateToSubCategory('organic-fruits')}
/>
```

### With Image

```typescript
<SubCategoryTile
  title="Fresh Vegetables"
  image={{ uri: 'https://example.com/vegetables.jpg' }}
  onPress={() => navigateToSubCategory('fresh-vegetables')}
/>
```

### Different Sizes

```typescript
<SubCategoryTile
  title="Small"
  icon="home"
  size="sm"
/>

<SubCategoryTile
  title="Medium"
  icon="home"
  size="md"
/>

<SubCategoryTile
  title="Large"
  icon="home"
  size="lg"
/>
```

### Disabled State

```typescript
<SubCategoryTile
  title="Coming Soon"
  icon="lock"
  disabled={true}
/>
```

### Vertical List in Side Navigation

```typescript
import { View, ScrollView } from 'react-native';
import { SubCategoryTile } from '@groxigo/components';

const subcategories = [
  { id: '1', title: 'Organic Fruits', icon: 'apple' },
  { id: '2', title: 'Fresh Vegetables', icon: 'carrot' },
  { id: '3', title: 'Dairy Products', icon: 'milk' },
];

<ScrollView style={{ width: '18%' }}>
  {subcategories.map((subcategory) => (
    <SubCategoryTile
      key={subcategory.id}
      title={subcategory.title}
      icon={subcategory.icon}
      onPress={() => handleSubCategoryPress(subcategory.id)}
    />
  ))}
</ScrollView>
```

## Accessibility

### Mobile
- `accessibilityRole="button"` for proper screen reader support
- `accessibilityLabel` prop for custom labels
- `accessibilityState` for disabled state
- Minimum touch target: 44×44px

### Web
- `role="button"` for semantic HTML
- `aria-label` for screen readers
- `aria-disabled` for disabled state
- Keyboard navigation (Enter/Space keys)
- `tabIndex` for keyboard focus

## Dependencies

- `@groxigo/ui-elements`: Text, Icon, Image components
- `@groxigo/tokens`: Design tokens for spacing, colors, radius
- `react-native`: Core React Native components (View, Pressable, Platform)

## Testing

### Test Coverage

- ✅ Unit tests for rendering
- ✅ Platform-specific tests (mobile and web)
- ✅ Accessibility tests
- ✅ Responsive sizing tests
- ✅ Interaction tests (onPress, disabled state)
- ✅ Layout tests (vertical vs horizontal)
- ✅ Keyboard navigation tests (web)

### Test Files

- `SubCategoryTile.mobile.test.tsx` - Mobile-specific tests
- `SubCategoryTile.web.test.tsx` - Web-specific tests
- `SubCategoryTile.test.shared.tsx` - Shared test utilities

## Comparison with CategoryTile

| Feature | CategoryTile | SubCategoryTile |
|---------|-------------|-----------------|
| **Size** | Larger (100px default) | Smaller (80px default) |
| **Use Case** | Home page category selection | Left nav subcategory selection |
| **Layout** | Always vertical | Responsive (vertical/horizontal) |
| **Orientation** | Image/icon on top, text below | Mobile: top/bottom, Web: side-by-side |
| **Width** | Fixed width | Full width on larger screens (web) |

## Recent Changes

### Version 1.0.0 - Initial Implementation
- Created SubCategoryTile component
- Responsive sizing for mobile and web
- Support for both images and icons
- Responsive layout (vertical on mobile, horizontal on larger screens)
- Accessibility features
- Platform-specific optimizations
- Comprehensive test coverage

## Future Enhancements

1. **Active State**: Add visual indicator for selected/active subcategory
2. **Loading State**: Add skeleton/loading state for images
3. **Badge Support**: Add badge for "New" or count indicators
4. **Animation**: Add press animations and transitions
5. **Customizable Layout**: Allow explicit control over layout direction
6. **Section Theming**: Support groceries/recipes section theming (if needed)

---

*Last Updated: [Current Date]*  
*Component Version: 1.0.0*




