# @groxigo/sdui

Server-Driven UI utilities for Groxigo applications.

## Overview

This package provides tools for rendering UI components from server-defined JSON, enabling:
- Dynamic UI without app updates
- A/B testing
- Personalization
- Feature flags
- Seasonal themes (with Lottie support)

## Installation

```bash
npm install @groxigo/sdui
```

## Quick Start

### 1. Create a Component Registry

```tsx
import { createRegistry } from '@groxigo/sdui';
import { ProductCard, CartItem, EmptyState } from '@groxigo/components';

const registry = createRegistry()
  .register('ProductCard', ProductCard, {
    actionProps: ['onPress', 'onAddToCart', 'onToggleFavorite'],
  })
  .register('CartItem', CartItem, {
    actionProps: ['onQuantityChange', 'onRemove'],
  })
  .register('EmptyState', EmptyState, {
    actionProps: ['onAction'],
  })
  .build();
```

### 2. Set Up the Provider

```tsx
import { SDUIProvider } from '@groxigo/sdui';

function App() {
  return (
    <SDUIProvider
      registry={registry}
      actionHandlers={{
        navigate: (screen, params) => router.push(screen, params),
        goBack: () => router.back(),
        addToCart: (productId, qty) => cartStore.add(productId, qty),
        toggleFavorite: (productId) => favoritesStore.toggle(productId),
        showToast: (message, status) => toast.show(message, status),
      }}
    >
      <YourApp />
    </SDUIProvider>
  );
}
```

### 3. Render Server Data

```tsx
import { SDUIRenderer, useSDUI } from '@groxigo/sdui';

function HomeScreen() {
  const { data } = useQuery('/api/v1/home');
  const { registry, handleAction } = useSDUI();

  return (
    <FlatList
      data={data.sections}
      renderItem={({ item }) => (
        <SDUIRenderer
          data={item}
          registry={registry}
          onAction={handleAction}
        />
      )}
    />
  );
}
```

## Server Response Format

### Component

```json
{
  "type": "ProductCard",
  "props": {
    "id": "apple-123",
    "name": "Organic Apples",
    "price": 4.99,
    "imageUrl": "https://cdn.example.com/apple.jpg",
    "colorScheme": "highlight"
  },
  "actions": {
    "onPress": {
      "type": "NAVIGATE",
      "screen": "ProductDetail",
      "params": { "id": "apple-123" }
    },
    "onAddToCart": {
      "type": "ADD_TO_CART",
      "productId": "apple-123",
      "quantity": 1
    }
  }
}
```

### Section

```json
{
  "id": "featured-products",
  "title": "Featured",
  "type": "product-grid",
  "components": [
    { "type": "ProductCard", "props": {...} },
    { "type": "ProductCard", "props": {...} }
  ],
  "seeAllAction": {
    "type": "NAVIGATE",
    "screen": "ProductList",
    "params": { "filter": "featured" }
  }
}
```

## Action Types

| Action | Description | Payload |
|--------|-------------|---------|
| `NAVIGATE` | Navigate to screen | `screen`, `params` |
| `GO_BACK` | Go back | - |
| `OPEN_URL` | Open URL | `url`, `external` |
| `ADD_TO_CART` | Add product to cart | `productId`, `quantity` |
| `UPDATE_CART_QUANTITY` | Update cart quantity | `productId`, `quantity` |
| `REMOVE_FROM_CART` | Remove from cart | `productId` |
| `TOGGLE_FAVORITE` | Toggle favorite | `productId` |
| `SHOW_TOAST` | Show toast message | `message`, `status` |
| `SHOW_MODAL` | Show modal | `modalId`, `props` |
| `CLOSE_MODAL` | Close modal | `modalId` |
| `SHARE` | Share content | `title`, `message`, `url` |
| `TRACK_EVENT` | Analytics event | `event`, `properties` |
| `REFRESH` | Refresh section | `sectionId` |
| `SEQUENCE` | Run multiple actions | `actions[]` |
| `API_CALL` | Make API call | `endpoint`, `method`, `body` |

## Color Schemes

Components support preset color schemes for easy theming:

```json
{
  "type": "ProductCard",
  "props": {
    "colorScheme": "sale",
    "name": "Holiday Special"
  }
}
```

Available schemes:
- `default` - Standard theme colors
- `primary` - Primary brand color
- `highlight` - Gold/featured highlight
- `sale` - Red sale styling
- `new` - Green new product
- `featured` - Purple featured
- `holiday` - Red/green holiday theme
- `custom` - Use with `customColors`

### Custom Colors

```json
{
  "type": "ProductCard",
  "props": {
    "colorScheme": "custom",
    "customColors": {
      "background": "#FFF5E6",
      "accent": "#FF9500",
      "border": "#FFD700"
    }
  }
}
```

## Lottie Backgrounds

Components can have animated Lottie backgrounds:

```json
{
  "type": "BottomNav",
  "props": {
    "items": [...],
    "backgroundConfig": {
      "type": "lottie",
      "lottieSource": "https://cdn.example.com/snowfall.json",
      "lottieLoop": true,
      "lottieSpeed": 0.5
    }
  }
}
```

## Hooks

### useActionHandler

Handle SDUI actions manually:

```tsx
import { useActionHandler } from '@groxigo/sdui';

const { handleAction, mapActionsToProps } = useActionHandler({
  navigate: (screen) => router.push(screen),
  addToCart: (id, qty) => cart.add(id, qty),
});

// Handle single action
handleAction({ type: 'ADD_TO_CART', productId: '123' });

// Convert actions object to callback props
const props = mapActionsToProps(serverData.actions);
```

### useColorScheme

Resolve color schemes to actual colors:

```tsx
import { useColorScheme } from '@groxigo/sdui';

const colors = useColorScheme({
  theme: themeColors,
  colorScheme: 'sale',
  customColors: { accent: '#FF0000' },
});

// colors.background, colors.text, colors.accent, etc.
```

## TypeScript

All types are exported:

```tsx
import type {
  SDUIAction,
  SDUIComponent,
  SDUISection,
  ColorScheme,
  CustomColors,
  ComponentRegistry,
} from '@groxigo/sdui';
```
