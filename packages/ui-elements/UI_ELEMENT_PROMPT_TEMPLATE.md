# Component Development Prompt Template

Use this template when requesting new component development. Copy and fill in the details:

---

## Component Request

**Component Name:** [e.g., Chip, Avatar, Switch]

**Purpose:** [Brief description of what the component does]

**Variants:** [List of variants, e.g., primary, secondary, outline, ghost]

**Sizes:** [List of sizes, e.g., sm, md, lg]

**Props:**
- `variant?: 'primary' | 'secondary' | ...` - [Description]
- `size?: 'sm' | 'md' | 'lg'` - [Description]
- `section?: 'groceries' | 'recipes' | 'default'` - [Description]
- `disabled?: boolean` - [Description]
- `onPress?: () => void` - [Description]
- `children: React.ReactNode` - [Description]
- [Add more props as needed]

**Platform-Specific Requirements:**
- **iOS:** [Any iOS-specific behavior, e.g., haptic feedback, native animations]
- **Android:** [Any Android-specific behavior, e.g., Material Design ripple, elevation]
- **Web:** [Any web-specific requirements, e.g., accessibility, SEO, semantic HTML]

**Design Token Usage:**
- Colors: [Which color tokens to use, e.g., `tokens.colors.alias.shared.primary`]
- Spacing: [Which spacing values, e.g., `tokens.spacing[2]` for padding]
- Typography: [Which typography tokens, e.g., `tokens.typography.fontSize.base`]
- Radius: [Which radius values, e.g., `tokens.radius.full` for pill shape]
- Shadows: [If needed, e.g., `tokens.shadows.sm`]

**Related Components:**
- [List any components this should be similar to or compose with]

**Accessibility:**
- [Any accessibility requirements, e.g., ARIA labels, keyboard navigation]

**Examples:**
```tsx
// Basic usage
<Chip variant="primary" size="md">Label</Chip>

// With section theming
<Chip variant="secondary" section="groceries">Groceries</Chip>

// Interactive
<Chip variant="outline" onPress={() => {}}>Clickable</Chip>
```

---

## Quick Reference: Component Development Rules

When developing components, follow these rules:

1. **NO React Imports**: Never use `import React from 'react'` in component files
2. **Platform-Specific Files**: Create `.ios.tsx`, `.android.tsx`, `.web.tsx` files
3. **Type Annotations**: Use explicit types: `({ ... }: ComponentProps) => { ... }`
4. **Design Tokens**: Always use tokens from `@groxigo/tokens/react-native`
5. **8px Grid**: Follow 8px grid system for spacing and sizing
6. **Section Theming**: Support groceries, recipes, and default sections
7. **Accessibility**: Add proper ARIA attributes for web
8. **Composition**: Use existing components (Text, Button, etc.) when possible

See `UI_ELEMENT_DEVELOPMENT.md` for detailed guidelines.

