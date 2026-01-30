# Responsive Sizing Guidelines

This document provides guidelines for implementing responsive component sizing across mobile and web platforms in the Groxigo UI Elements library.

## Overview

Components adapt their sizes based on the platform to provide optimal user experience:
- **Mobile (375px+)**: Optimized for touch interactions with appropriate touch targets
- **Web (up to 1440px)**: Slightly larger sizes for better mouse/keyboard interaction and visual hierarchy

## Grid System

- **Base Unit**: 4px (for spacing scale)
- **Component Grid**: 8px (for component dimensions)
- **Responsive Strategy**: Adaptive sizing - different base sizes per platform

## Breakpoints

Defined in `@groxigo/tokens/breakpoints`:

| Breakpoint | Width | Usage |
|------------|-------|-------|
| mobile | 375px | Minimum mobile width |
| tablet | 768px | Tablet portrait |
| desktop | 1024px | Desktop/laptop |
| large | 1440px | Maximum content width |

## Component Sizing Reference

### Interactive Elements

#### Button Component
| Size | Mobile | Web | Difference | Notes |
|------|--------|-----|-----------|-------|
| sm | 32px | 36px | +4px | Better clickability on web |
| md | 40px | 44px | +4px | Better clickability on web |
| lg | 48px | 52px | +4px | Better clickability on web |

**Padding**:
- Mobile: sm: 12px, md: 16px, lg: 24px (horizontal)
- Web: sm: 14px, md: 18px, lg: 26px (horizontal)

#### Input Component
| Size | Mobile | Web | Difference | Notes |
|------|--------|-----|-----------|-------|
| sm | 36px | 40px | +4px | Better usability on web |
| md | 40px | 48px | +8px | Better usability on web |
| lg | 48px | 56px | +8px | Better usability on web |

**Padding**:
- Mobile: sm: 12px, md: 12px, lg: 16px (horizontal)
- Web: sm: 14px, md: 14px, lg: 18px (horizontal)

#### SearchBar Component
| Platform | Height | Width | Notes |
|----------|--------|-------|-------|
| Mobile | 40px (md) | Full width | Uses Input md size |
| Web | 48px (lg) | Max 600px, centered | Uses Input lg size |

### Selection Components

#### Checkbox, Radio, Switch, Slider
These components use slightly larger sizes on web (typically +2-4px) for better visibility and interaction.

### Display Components

#### Badge, Avatar, Icon
Display components scale proportionally on web for better visibility:
- Small increments (+2-4px) for badges and icons
- Larger increments (+4-8px) for avatars

### Container Components

#### Card Component
| Padding | Mobile | Web | Difference | Notes |
|---------|--------|-----|-----------|-------|
| sm | 16px | 20px | +4px | More breathing room on web |
| md | 24px | 32px | +8px | More breathing room on web |
| lg | 32px | 40px | +8px | More breathing room on web |

**Max Width**: 1440px (web), Full width (mobile)

#### Container Component
- **Max Width**: 1440px (web), Unlimited (mobile)
- **Min Width**: 375px (both platforms)
- **Padding**: 24px (web), 16px (mobile)
- **Centering**: Auto margins on web, full width on mobile
- **Horizontal Scroll**: Enabled for screens <375px

## Spacing Guidelines

### Container Padding
- **Mobile**: 16px (2 × 8px)
- **Web**: 24px (3 × 8px)

### Component Gap
- **Mobile**: 8px (1 × 8px)
- **Web**: 16px (2 × 8px)

### Section Spacing
- **Mobile**: 24px (3 × 8px)
- **Web**: 32px (4 × 8px)

## Width Constraints

### Mobile
- **Min Width**: 375px (modern mobile standard)
- **Max Width**: Full viewport width
- **Behavior**: Horizontal scroll for screens <375px

### Web
- **Min Width**: 375px
- **Max Width**: 1440px (centered)
- **SearchBar Max Width**: 600px (centered)
- **Card Max Width**: 1440px (responsive padding)

## Implementation

### Using Responsive Utilities

```typescript
import { getButtonHeight, getInputHeight, getContainerPadding } from '@groxigo/ui-elements/utils/responsive';
import { Platform } from 'react-native';

const platform = Platform.OS === 'web' ? 'web' : 'mobile';
const buttonHeight = getButtonHeight('md', platform); // 40px mobile, 44px web
const inputHeight = getInputHeight('md', platform); // 40px mobile, 48px web
const padding = getContainerPadding(platform); // 16px mobile, 24px web
```

### Using Container Component

```typescript
import { Container } from '@groxigo/ui-elements';

<Container maxWidth={1440} minWidth={375} padding={24}>
  <Card padding="md">
    <Text>Content here</Text>
  </Card>
</Container>
```

### Platform Detection

Components automatically detect platform using `Platform.OS`:
- `Platform.OS === 'web'` → Web sizing
- `Platform.OS === 'ios' | 'android'` → Mobile sizing

## Best Practices

1. **Touch Targets**: Maintain minimum 44×44px touch targets on mobile
2. **Click Targets**: Ensure comfortable mouse interaction on web (minimum 40×40px)
3. **Visual Hierarchy**: Use larger sizes on web to establish better visual hierarchy
4. **Consistency**: Maintain 8px grid alignment across all sizes
5. **Accessibility**: Ensure sufficient spacing for readability and interaction

## Testing

When implementing responsive sizing:

1. ✅ Test at 375px width (minimum mobile)
2. ✅ Test horizontal scrolling on <375px screens
3. ✅ Test max-width constraints at 1440px
4. ✅ Verify touch targets on mobile (min 44×44px)
5. ✅ Verify click targets on web (comfortable mouse interaction)
6. ✅ Test SearchBar at various widths (especially 600px max on web)

## Reference

See `COMPONENT_SIZING_REFERENCE.md` for complete component size tables and current implementation details.

