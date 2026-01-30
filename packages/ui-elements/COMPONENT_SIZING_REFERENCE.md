# Component Sizing Reference

This document provides a comprehensive reference for all component sizes in the Groxigo UI Elements library. Use this as a guide for implementing responsive sizing and maintaining consistency across mobile and web platforms.

## Grid System

- **Base Unit**: 4px (for spacing scale)
- **Component Grid**: 8px (for component dimensions)
- **Spacing Scale**: Multiples of 4px (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px)

## Current Component Sizes

### Interactive Elements

#### Button Component
**File**: `src/elements/Button/Button.styles.ts`

| Size | Height | Padding Horizontal | Padding Vertical | Notes |
|------|--------|-------------------|------------------|-------|
| sm | 32px (4 × 8px) | 12px (1.5 × 8px) | 6px | Small buttons |
| md | 40px (5 × 8px) | 16px (2 × 8px) | 8px (1 × 8px) | Default size |
| lg | 48px (6 × 8px) | 24px (3 × 8px) | 12px (1.5 × 8px) | Large buttons |

**Border Radius**: `tokens.radius.md`
**Gap**: 8px (for icon + text spacing)

#### Input Component
**File**: `src/elements/Input/Input.styles.ts`

| Size | Height | Padding Horizontal | Notes |
|------|--------|-------------------|-------|
| sm | 36px | 12px (1.5 × 8px) | Aligned to grid |
| md | 40px (5 × 8px) | 12px (1.5 × 8px) | Default size |
| lg | 48px (6 × 8px) | 16px (2 × 8px) | Large inputs |

**Border Radius**: `tokens.radius.md`
**Gap**: 8px (for icons)

#### SearchBar Component
**File**: `packages/components/src/components/SearchBar/` (uses Input)

Currently uses Input component with `size="md"` by default:
- **Height**: 40px (inherited from Input md)
- **Padding**: 12px horizontal
- **Icon Size**: md (for search icon)

### Selection Components

#### Checkbox Component
**File**: `src/elements/Checkbox/Checkbox.styles.ts`

| Size | Box Size | Icon Size (when checked) | Notes |
|------|----------|--------------------------|-------|
| sm | 16px (2 × 8px) | 12px | Small checkbox |
| md | 20px (2.5 × 8px) | 14px | Default size |
| lg | 24px (3 × 8px) | 16px | Large checkbox |

**Border Width**: 2px
**Border Radius**: `tokens.radius.sm`

#### Radio Component
**File**: `src/elements/Radio/Radio.styles.ts`

| Size | Circle Size | Dot Size | Notes |
|------|-------------|----------|-------|
| sm | 16px (2 × 8px) | 8px | Small radio |
| md | 20px (2.5 × 8px) | 10px | Default size |
| lg | 24px (3 × 8px) | 12px | Large radio |

**Border Width**: 2px

#### Switch Component
**File**: `src/elements/Switch/Switch.styles.ts`

| Size | Width | Height | Thumb Size | Notes |
|------|-------|--------|------------|-------|
| sm | 36px (4.5 × 8px) | 20px (2.5 × 8px) | 16px (2 × 8px) | Small switch |
| md | 44px (5.5 × 8px) | 24px (3 × 8px) | 20px (2.5 × 8px) | Default size |
| lg | 52px (6.5 × 8px) | 28px (3.5 × 8px) | 24px (3 × 8px) | Large switch |

**Track Padding**: 2px
**Border Radius**: Fully rounded (height / 2)

#### Slider Component
**File**: `src/elements/Slider/Slider.styles.ts`

| Size | Track Height | Thumb Size | Notes |
|------|--------------|------------|-------|
| sm | 4px (0.5 × 8px) | 16px (2 × 8px) | Small slider |
| md | 6px (0.75 × 8px) | 20px (2.5 × 8px) | Default size |
| lg | 8px (1 × 8px) | 24px (3 × 8px) | Large slider |

**Thumb Border**: 2px
**Border Radius**: Track and thumb fully rounded

### Display Components

#### Badge Component
**File**: `src/elements/Badge/Badge.styles.ts`

| Size | Height | Padding Horizontal | Padding Vertical | Notes |
|------|--------|-------------------|------------------|-------|
| sm | 20px | 6px | 2px | Small badges |
| md | 24px (3 × 8px) | 8px (1 × 8px) | 4px (0.5 × 8px) | Default size |

**Border Radius**: `tokens.radius.full`
**Font Size**: `tokens.typography.fontSize.sm`

#### Avatar Component
**File**: `src/elements/Avatar/Avatar.styles.ts`

| Size | Avatar Size | Font Size | Notes |
|------|-------------|-----------|-------|
| sm | 32px (4 × 8px) | 14px (sm) | Small avatar |
| md | 40px (5 × 8px) | 16px (base) | Default size |
| lg | 48px (6 × 8px) | 18px (lg) | Large avatar |
| xl | 64px (8 × 8px) | 20px (xl) | Extra large |

**Border Radius**: `tokens.radius.full`

#### Icon Component
**File**: `src/elements/Icon/Icon.utils.ts`

| Size | Icon Size | Notes |
|------|-----------|-------|
| sm | 16px (2 × 8px) | Small icons |
| md | 24px (3 × 8px) | Default size |
| lg | 32px (4 × 8px) | Large icons |
| xl | 40px (5 × 8px) | Extra large |

Also supports custom numeric sizes.

#### Progress Component
**File**: `src/elements/Progress/Progress.styles.ts`

| Size | Track Height | Notes |
|------|--------------|-------|
| sm | 4px (0.5 × 8px) | Thin progress bar |
| md | 8px (1 × 8px) | Default size |
| lg | 12px (1.5 × 8px) | Thick progress bar |

**Border Radius**: Fully rounded (height / 2)

#### Spinner Component
**File**: `src/elements/Spinner/Spinner.styles.ts`

| Size | Spinner Size | Notes |
|------|--------------|-------|
| sm | 'small' (ActivityIndicator) | Small spinner |
| md | 'small' (ActivityIndicator) | Default size |
| lg | 'large' (ActivityIndicator) | Large spinner |

Uses React Native's `ActivityIndicator` sizes.

#### Divider Component
**File**: `src/elements/Divider/Divider.styles.ts`

| Spacing | Margin | Notes |
|---------|--------|-------|
| sm | 8px (1 × 8px) | Small spacing |
| md | 16px (2 × 8px) | Default spacing |
| lg | 24px (3 × 8px) | Large spacing |

**Line Width**: 1px
**Variants**: solid, dashed

### Container Components

#### Card Component
**File**: `src/elements/Card/Card.styles.ts`

| Padding | Value | Notes |
|---------|-------|-------|
| none | 0px | No padding |
| sm | 16px (2 × 8px) | Small padding |
| md | 24px (3 × 8px) | Default padding |
| lg | 32px (4 × 8px) | Large padding |

**Border Radius**: `tokens.radius.lg`
**Border Width**: 1px (for outlined/default variants)

## Typography Sizes

**File**: `packages/tokens/src/tokens/typography.ts`

| Variant | Font Size | Notes |
|---------|-----------|-------|
| xs | 12px | Extra small text |
| sm | 14px | Small text |
| base | 16px | Default body text |
| lg | 18px | Large text |
| xl | 20px | Extra large |
| 2xl | 24px | Heading size |
| 3xl | 30px | Large heading |
| 4xl | 36px | Extra large heading |

## Spacing Scale

**File**: `packages/tokens/src/tokens/spacing.ts`

| Key | Value | Multiplier | Usage |
|-----|-------|------------|-------|
| 0 | 0px | - | No spacing |
| 1 | 4px | 1 × 4px | Minimal spacing |
| 2 | 8px | 2 × 4px | Small gaps |
| 3 | 12px | 3 × 4px | Medium-small gaps |
| 4 | 16px | 4 × 4px | Default gaps |
| 5 | 20px | 5 × 4px | Medium gaps |
| 6 | 24px | 6 × 4px | Large gaps |
| 8 | 32px | 8 × 4px | Extra large gaps |
| 10 | 40px | 10 × 4px | Section spacing |
| 12 | 48px | 12 × 4px | Large section spacing |
| 16 | 64px | 16 × 4px | Page spacing |
| 20 | 80px | 20 × 4px | Extra large spacing |
| 24 | 96px | 24 × 4px | Maximum spacing |

## Proposed Responsive Sizing (Mobile vs Web)

### Interactive Elements

| Component | Size | Mobile (Current) | Web (Proposed) | Difference | Notes |
|-----------|------|------------------|----------------|-----------|-------|
| Button | sm | 32px | 36px | +4px | Better clickability on web |
| Button | md | 40px | 44px | +4px | Better clickability on web |
| Button | lg | 48px | 52px | +4px | Better clickability on web |
| Input | sm | 36px | 40px | +4px | Better usability on web |
| Input | md | 40px | 48px | +8px | Better usability on web |
| Input | lg | 48px | 56px | +8px | Better usability on web |
| SearchBar | - | 40px (md) | 48px (lg) | +8px | md on mobile, lg on web |

### Selection Components

| Component | Size | Mobile (Current) | Web (Proposed) | Difference | Notes |
|-----------|------|------------------|----------------|-----------|-------|
| Checkbox | sm | 16px | 18px | +2px | Slightly larger for web |
| Checkbox | md | 20px | 22px | +2px | Slightly larger for web |
| Checkbox | lg | 24px | 26px | +2px | Slightly larger for web |
| Radio | sm | 16px | 18px | +2px | Slightly larger for web |
| Radio | md | 20px | 22px | +2px | Slightly larger for web |
| Radio | lg | 24px | 26px | +2px | Slightly larger for web |
| Switch | sm | 36×20px | 40×24px | +4×4px | Better interaction on web |
| Switch | md | 44×24px | 48×28px | +4×4px | Better interaction on web |
| Switch | lg | 52×28px | 56×32px | +4×4px | Better interaction on web |
| Slider | sm | 4px track, 16px thumb | 6px track, 18px thumb | +2px each | Better visibility on web |
| Slider | md | 6px track, 20px thumb | 8px track, 24px thumb | +2px each | Better visibility on web |
| Slider | lg | 8px track, 24px thumb | 10px track, 28px thumb | +2px each | Better visibility on web |

### Display Components

| Component | Size | Mobile (Current) | Web (Proposed) | Difference | Notes |
|-----------|------|------------------|----------------|-----------|-------|
| Badge | sm | 20px | 22px | +2px | Slightly larger for web |
| Badge | md | 24px | 26px | +2px | Slightly larger for web |
| Avatar | sm | 32px | 36px | +4px | Better visibility on web |
| Avatar | md | 40px | 44px | +4px | Better visibility on web |
| Avatar | lg | 48px | 52px | +4px | Better visibility on web |
| Avatar | xl | 64px | 72px | +8px | Better visibility on web |
| Icon | sm | 16px | 18px | +2px | Slightly larger for web |
| Icon | md | 24px | 26px | +2px | Slightly larger for web |
| Icon | lg | 32px | 36px | +4px | Better visibility on web |
| Icon | xl | 40px | 44px | +4px | Better visibility on web |
| Progress | sm | 4px | 6px | +2px | Better visibility on web |
| Progress | md | 8px | 10px | +2px | Better visibility on web |
| Progress | lg | 12px | 14px | +2px | Better visibility on web |

### Container Components

| Component | Property | Mobile (Current) | Web (Proposed) | Notes |
|-----------|----------|------------------|----------------|-------|
| Card | Padding sm | 16px | 20px | +4px for breathing room |
| Card | Padding md | 24px | 32px | +8px for breathing room |
| Card | Padding lg | 32px | 40px | +8px for breathing room |
| Card | Max Width | Full width | 1440px | Centered on web |
| SearchBar | Max Width | Full width | 600px | Centered on web |
| Container | Max Width | Full width | 1440px | Centered on web |
| Container | Min Width | 375px | 375px | Horizontal scroll <375px |

## Spacing & Padding Guidelines

### Mobile (375px+)
- **Container Padding**: 16px (2 × 8px)
- **Component Gap**: 8-16px
- **Section Spacing**: 24px (3 × 8px)
- **Touch Target Minimum**: 44×44px (iOS/Android guidelines)

### Web (up to 1440px)
- **Container Padding**: 24-32px (3-4 × 8px)
- **Component Gap**: 16-24px (2-3 × 8px)
- **Section Spacing**: 32-40px (4-5 × 8px)
- **Click Target Minimum**: 40×40px (comfortable mouse interaction)

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

## Border Radius

**File**: `packages/tokens/src/tokens/radius.ts`

| Size | Value | Usage |
|------|-------|-------|
| sm | 4px | Small elements (checkboxes, badges) |
| md | 8px | Default (buttons, inputs) |
| lg | 12px | Large elements (cards) |
| full | 50% | Circular elements (avatars, badges) |

## Notes

1. **8px Grid Alignment**: All component heights and major dimensions align to 8px grid
2. **4px Base Unit**: Spacing scale uses 4px increments for fine-grained control
3. **Touch Targets**: Mobile components maintain minimum 44×44px touch targets
4. **Web Optimization**: Web sizes are slightly larger for better mouse/keyboard interaction
5. **Consistency**: All sizes maintain visual rhythm and consistency within platform

## Implementation Status

- ✅ **Current Sizes**: Documented above (all components)
- ⏳ **Responsive Sizing**: To be implemented
- ⏳ **Breakpoint System**: To be implemented
- ⏳ **Container Constraints**: To be implemented

