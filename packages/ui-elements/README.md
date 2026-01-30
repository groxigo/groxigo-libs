# @groxigo/ui-elements

Primitive UI building blocks for cross-platform React Native applications.

## Overview

This package provides atomic UI elements that serve as the foundation for building composite components. All elements follow the 8px grid system and integrate with the Groxigo design tokens.

## Installation

```bash
npm install @groxigo/ui-elements
```

## Usage

```typescript
import { Button, Card, Text, Input, Badge, Icon } from '@groxigo/ui-elements';
```

### Icon Usage

```typescript
import { Icon } from '@groxigo/ui-elements';
import { tokens } from '@groxigo/tokens/react-native';

// Basic usage
<Icon name="home" size="md" />

// With custom color and size
<Icon 
  name="heart.fill" 
  size={24} 
  color={tokens.colors.alias.shared.primary.default} 
/>

// In a Button
<Button variant="primary">
  <Icon name="cart" size="sm" color={tokens.colors.alias.shared.text.inverse} />
  <Text>Add to Cart</Text>
</Button>
```

## Components

### Foundation Elements

- **Text** - Typography component with token integration
- **Button** - Action button with variants (primary, secondary, danger)
- **Card** - Container component with shadows/borders
- **Badge** - Status indicators and labels
- **Input** - Text input field
- **Icon** - Cross-platform icon component (SF Symbols on iOS, Material Icons on Android/Web)

### Coming Soon

- Avatar, Spinner, Checkbox, Radio, Switch, Slider, Progress, Divider

## 8px Grid System

All elements use spacing that aligns to an 8px grid:

- Button heights: 32px, 40px, 48px
- Padding: 8px, 16px, 24px, 32px
- Gaps: 8px, 16px, 24px
- Icon sizes: 16px, 24px, 32px, 40px

## Design Token Integration

All elements use tokens from `@groxigo/tokens`:

```typescript
import { tokens } from '@groxigo/tokens/react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: tokens.colors.alias.groceries.primary.default,
    padding: tokens.spacing[4], // 16px
    borderRadius: tokens.radius.lg,
  },
});
```

## Cross-Platform Support

Works seamlessly on:
- ✅ iOS
- ✅ Android
- ✅ Web (via react-native-web)

All spacing and sizing is visually consistent across platforms.

## License

MIT

