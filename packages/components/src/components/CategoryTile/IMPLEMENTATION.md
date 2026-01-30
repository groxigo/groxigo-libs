# CategoryTile Component - Implementation Details

## Overview

The `CategoryTile` component is a reusable tile component that displays a category with an image/icon and label. It's designed for displaying categories on the home page, allowing users to select different categories. The component is built from `@groxigo/ui-elements` primitives (Text, Icon, Image) and provides responsive sizing for mobile and web platforms.

## Component Structure

```
CategoryTile/
├── index.ts              # Public exports
├── CategoryTile.tsx      # Mobile implementation (iOS/Android)
├── CategoryTile.web.tsx # Web-specific implementation
├── CategoryTile.types.ts # TypeScript type definitions
└── IMPLEMENTATION.md     # This file - component documentation
```

## API / Props

### CategoryTileProps

```typescript
interface CategoryTileProps {
  /**
   * Category title/label displayed below the image/icon
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
   * Custom container style
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
- **title** (string): The category label displayed below the image/icon

#### Optional Props
- **image** (ImageSourcePropType): Image source for the category. Takes precedence over icon if both are provided
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
- sm: 64px width, 40px image/icon
- md: 80px width, 56px image/icon (default)
- lg: 96px width, 72px image/icon

**Web:**
- sm: 80px width, 48px image/icon
- md: 100px width, 64px image/icon (default)
- lg: 120px width, 80px image/icon

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

#### Web
- Uses native HTML `div` elements
- Uses HTML `img` element via Image component
- Supports keyboard navigation (Enter/Space keys)
- Hover states and transitions
- Semantic HTML with ARIA attributes

## Styling

### Design Tokens Used

- **Spacing**: `tokens.spacing[2]`, `tokens.spacing[3]`, `tokens.spacing[4]`
- **Radius**: `tokens.radius.md` for rounded corners
- **Colors**: 
  - Primary: `tokens.colors.alias.shared.primary.default`
  - Text: `tokens.colors.alias.shared.text.primary`
  - Surface: `tokens.colors.alias.shared.surface.secondary`
- **Opacity**: `tokens.opacity['50']` for disabled state, `tokens.opacity['80']` for pressed state

### Layout

- Vertical layout (column direction)
- Centered alignment
- Gap between image/icon and text
- Text truncation (2 lines max)

## Usage Examples

### Basic Usage with Icon

```typescript
import { CategoryTile } from '@groxigo/components';

<CategoryTile
  title="Fruits"
  icon="apple"
  onPress={() => navigateToCategory('fruits')}
/>
```

### With Image

```typescript
<CategoryTile
  title="Vegetables"
  image={{ uri: 'https://example.com/vegetables.jpg' }}
  onPress={() => navigateToCategory('vegetables')}
/>
```

### Different Sizes

```typescript
<CategoryTile
  title="Small"
  icon="home"
  size="sm"
/>

<CategoryTile
  title="Medium"
  icon="home"
  size="md"
/>

<CategoryTile
  title="Large"
  icon="home"
  size="lg"
/>
```

### Disabled State

```typescript
<CategoryTile
  title="Coming Soon"
  icon="lock"
  disabled={true}
/>
```

### Grid Layout Example

```typescript
import { View } from 'react-native';
import { CategoryTile } from '@groxigo/components';

const categories = [
  { id: '1', title: 'Fruits', icon: 'apple' },
  { id: '2', title: 'Vegetables', icon: 'carrot' },
  { id: '3', title: 'Dairy', icon: 'milk' },
  { id: '4', title: 'Bakery', icon: 'bread' },
];

<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
  {categories.map((category) => (
    <CategoryTile
      key={category.id}
      title={category.title}
      icon={category.icon}
      onPress={() => handleCategoryPress(category.id)}
    />
  ))}
</View>
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

- [ ] Unit tests for rendering
- [ ] Platform-specific tests (mobile and web)
- [ ] Accessibility tests
- [ ] Responsive sizing tests
- [ ] Interaction tests (onPress, disabled state)

### Test Files

- `CategoryTile.mobile.test.tsx` - Mobile-specific tests
- `CategoryTile.web.test.tsx` - Web-specific tests

## Recent Changes

### Version 1.0.0 - Initial Implementation
- Created CategoryTile component
- Responsive sizing for mobile and web
- Support for both images and icons
- Accessibility features
- Platform-specific optimizations

## Future Enhancements

1. **Loading State**: Add skeleton/loading state for images
2. **Badge Support**: Add badge for "New" or count indicators
3. **Animation**: Add press animations and transitions
4. **Section Theming**: Support groceries/recipes section theming
5. **Image Placeholder**: Add placeholder image when image fails to load

---

*Last Updated: [Current Date]*  
*Component Version: 1.0.0*

