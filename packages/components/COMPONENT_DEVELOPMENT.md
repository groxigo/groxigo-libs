# Composite Component Development Guide

This guide explains how to develop new composite components for `@groxigo/components` following our established patterns and best practices.

## Overview

Composite components are higher-level components built from `@groxigo/ui-elements` primitives. They combine multiple ui-elements to create complete, ready-to-use UI patterns with business logic.

## ⚠️ Critical Rules

**When developing composite components:**

1. ✅ **Build from ui-elements** - Always compose from `@groxigo/ui-elements`, never create new primitives
2. ✅ **Use `@groxigo/tokens`** - Always use design tokens for styling
3. ✅ **Platform-specific files** - Create `.web.tsx` files for web-specific implementations
4. ✅ **Follow 8px grid** - All spacing and sizing follows the 8px grid system
5. ✅ **Responsive sizing** - Implement responsive sizing for mobile and web
6. ❌ **Do NOT duplicate ui-elements** - Don't recreate primitive components

## Table of Contents

1. [Component Structure](#component-structure)
2. [Platform-Specific Components](#platform-specific-components)
3. [TypeScript Patterns](#typescript-patterns)
4. [Composition Patterns](#composition-patterns)
5. [Styling Guidelines](#styling-guidelines)
6. [Design Tokens Integration](#design-tokens-integration)
7. [Responsive Sizing](#responsive-sizing)
8. [Best Practices](#best-practices)
9. [Step-by-Step Example](#step-by-step-example)
10. [Advanced Patterns: Refactoring for Code Reuse](#advanced-patterns-refactoring-for-code-reuse)

## Component Structure

Each composite component should follow this directory structure:

```
components/
  ComponentName/
    ComponentName.tsx          # Base/fallback implementation
    ComponentName.web.tsx     # Web-specific implementation (if needed)
    ComponentName.types.ts    # TypeScript type definitions
    ComponentName.styles.ts   # Style generation functions (if needed)
    index.ts                  # Public exports
```

### File Purposes

- **ComponentName.tsx**: Default implementation using React Native components
- **ComponentName.web.tsx**: Web-optimized implementation with native HTML elements (if needed)
- **ComponentName.types.ts**: All TypeScript interfaces, types, and prop definitions
- **ComponentName.styles.ts**: Style generation functions (optional, if complex styling needed)
- **index.ts**: Exports the component and types for public API

## Platform-Specific Components

### When to Create Web-Specific Files

Create `.web.tsx` files when:
- You need native HTML elements for better SEO/accessibility
- You need web-specific optimizations
- You need different behavior on web vs mobile

**Example:**
```typescript
// SearchBar.web.tsx
import { createElement } from 'react';
import { Input, Icon } from '@groxigo/ui-elements';
import { tokens } from '@groxigo/tokens/web';
import type { SearchBarProps } from './SearchBar.types';

export const SearchBar = ({ ... }: SearchBarProps) => {
  // Web-specific implementation using native HTML
  return createElement('div', { ... }, ...);
};
```

### Web Component Rules

1. **Use `@groxigo/tokens/web`** - Never use `@groxigo/tokens/react-native`
2. **Use native HTML elements** - Use `createElement` with HTML tags
3. **Use `CSSProperties` type** - Import from `react`
4. **Flatten React Native styles** - Convert style objects to CSSProperties

## TypeScript Patterns

### Component Props Interface

```typescript
// ComponentName.types.ts
import { ViewProps } from 'react-native';
import type { InputProps } from '@groxigo/ui-elements';

export interface ComponentNameProps extends Omit<ViewProps, 'style'> {
  // Component-specific props
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  
  // Props passed to composed ui-elements
  inputProps?: Partial<InputProps>;
  
  // Styling
  style?: ViewStyle;
  containerStyle?: ViewStyle;
}
```

### Component Implementation

```typescript
// ComponentName.tsx
import { View } from 'react-native';
import { Input, Button, Text } from '@groxigo/ui-elements';
import { tokens } from '@groxigo/tokens/react-native';
import type { ComponentNameProps } from './ComponentName.types';

export const ComponentName = ({
  label,
  value,
  onChange,
  style,
  ...props
}: ComponentNameProps) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {label && <Text variant="label">{label}</Text>}
      <Input value={value} onChangeText={onChange} />
      <Button variant="primary">Action</Button>
    </View>
  );
};

export default ComponentName;
```

## Composition Patterns

### Pattern 1: Wrapper Component

Wrap a single ui-element with additional functionality:

```typescript
// FormField.tsx - wraps Input
export const FormField = ({ label, required, error, ...inputProps }: FormFieldProps) => {
  const displayLabel = required ? `${label} *` : label;
  const displayVariant = error ? 'error' : 'default';
  
  return (
    <Input
      {...inputProps}
      label={displayLabel}
      variant={displayVariant}
      error={error}
    />
  );
};
```

### Pattern 2: Multi-Element Composition

Combine multiple ui-elements into a complete pattern:

```typescript
// ProductCard.tsx - combines Card, Text, Button, Badge, Image
export const ProductCard = ({ image, title, price, onAction, ...props }: ProductCardProps) => {
  return (
    <Card {...props}>
      {image && <Image source={image} />}
      <Text variant="h4">{title}</Text>
      <Text variant="h3" weight="bold">{price}</Text>
      <Button variant="primary" onPress={onAction}>Add to Cart</Button>
    </Card>
  );
};
```

### Pattern 3: State Management

Add state management and business logic:

```typescript
// SearchBar.tsx - manages search state
export const SearchBar = ({ value, onChangeText, onSearch, ...props }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState(value || '');
  
  const handleChangeText = (text: string) => {
    setSearchValue(text);
    onChangeText?.(text);
    onSearch?.(text);
  };
  
  return (
    <Input
      {...props}
      value={value !== undefined ? value : searchValue}
      onChangeText={handleChangeText}
      leftIcon={<Icon name="search" />}
    />
  );
};
```

## Styling Guidelines

### Using ui-elements Styles

Prefer using styles from composed ui-elements:

```typescript
// Use Input's built-in styles
<Input
  size="md"
  variant="default"
  style={inputStyle} // Additional styles if needed
/>
```

### Custom Styles

Only create custom styles when necessary:

```typescript
// ComponentName.styles.ts
import { StyleSheet } from 'react-native';
import { tokens } from '@groxigo/tokens/react-native';

export const getComponentStyles = () => {
  return StyleSheet.create({
    container: {
      gap: tokens.spacing[4], // 16px gap between elements
    },
  });
};
```

### Responsive Sizing

Use responsive utilities for platform-specific sizing:

```typescript
import { Platform } from 'react-native';
import { getContainerPadding } from '@groxigo/ui-elements/utils/responsive';

const platform = Platform.OS === 'web' ? 'web' : 'mobile';
const padding = getContainerPadding(platform);
```

## Design Tokens Integration

### Always Use Tokens

```typescript
import { tokens } from '@groxigo/tokens/react-native'; // For mobile
import { tokens } from '@groxigo/tokens/web'; // For web

// ✅ CORRECT
<View style={{ padding: tokens.spacing[4] }}>
  <Text style={{ color: tokens.colors.alias.shared.text.primary }}>
    Content
  </Text>
</View>

// ❌ WRONG
<View style={{ padding: 16 }}>
  <Text style={{ color: '#000000' }}>
    Content
  </Text>
</View>
```

### Token Categories

- **Colors**: `tokens.colors.alias.shared`, `tokens.colors.alias.groceries`, `tokens.colors.alias.recipes`
- **Spacing**: `tokens.spacing[0]` through `tokens.spacing[24]` (4px base unit)
- **Typography**: `tokens.typography.fontSize.*`, `tokens.typography.fontWeight.*`
- **Radius**: `tokens.radius.sm`, `tokens.radius.md`, `tokens.radius.lg`
- **Shadows**: `tokens.shadows.sm`, `tokens.shadows.md`, `tokens.shadows.lg`
- **Opacity**: `tokens.opacity['10']`, `tokens.opacity['50']`, etc.

## Responsive Sizing

### Container Sizing

Use the `Container` component for responsive layout:

```typescript
import { Container } from '@groxigo/ui-elements';

<Container maxWidth={tokens.breakpoints.large} minWidth={tokens.breakpoints.mobile}>
  <YourComponent />
</Container>
```

### Component Sizing

Use responsive sizing utilities:

```typescript
import { Platform } from 'react-native';
import { getContainerPadding } from '@groxigo/ui-elements/utils/responsive';

const platform = Platform.OS === 'web' ? 'web' : 'mobile';
const padding = getContainerPadding(platform); // 24px web, 16px mobile
```

### SearchBar Example

```typescript
// SearchBar uses responsive sizing
const isWeb = Platform.OS === 'web';
const inputSize = isWeb ? 'lg' : 'md'; // 48px web, 40px mobile

<Input size={inputSize} ... />
```

## Best Practices

### 1. Composition Over Duplication

**✅ DO:**
```typescript
import { Input, Button } from '@groxigo/ui-elements';

export const FormField = ({ ... }) => {
  return <Input {...props} />;
};
```

**❌ DON'T:**
```typescript
// Don't recreate Input functionality
export const FormField = ({ ... }) => {
  return (
    <View>
      <TextInput ... /> {/* Don't do this */}
    </View>
  );
};
```

### 2. Prop Forwarding

Forward props to composed components:

```typescript
export const ComponentName = ({ 
  inputProps, 
  buttonProps,
  ...containerProps 
}: ComponentNameProps) => {
  return (
    <View {...containerProps}>
      <Input {...inputProps} />
      <Button {...buttonProps} />
    </View>
  );
};
```

### 3. Section Theming

Support section-aware theming:

```typescript
import { useSection } from '@groxigo/ui-elements';

export const ComponentName = ({ section, ...props }: ComponentNameProps) => {
  const contextSection = useSection();
  const activeSection = section || contextSection;
  
  return (
    <Button section={activeSection} {...props} />
  );
};
```

### 4. Error Handling

Provide sensible defaults:

```typescript
export const ComponentName = ({
  value = '',
  onChange = () => {},
  required = false,
  ...props
}: ComponentNameProps) => {
  // Component logic
};
```

### 5. Documentation

Add JSDoc comments:

```typescript
/**
 * ComponentName component
 * Description of what the component does
 * 
 * @example
 * <ComponentName label="Name" value={name} onChange={setName} />
 */
export const ComponentName = ({ ... }: ComponentNameProps) => {
  // ...
};
```

## Step-by-Step Example

Let's create a `DatePicker` component:

### 1. Create Directory Structure

```bash
mkdir -p components/DatePicker
cd components/DatePicker
touch DatePicker.tsx DatePicker.web.tsx DatePicker.types.ts index.ts
```

### 2. Define Types (`DatePicker.types.ts`)

```typescript
import { ViewProps } from 'react-native';

export interface DatePickerProps extends Omit<ViewProps, 'style'> {
  value?: Date;
  onChange?: (date: Date) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
  style?: ViewStyle;
}
```

### 3. Create Base Implementation (`DatePicker.tsx`)

```typescript
import { View, Platform } from 'react-native';
import { Input, Text } from '@groxigo/ui-elements';
import { tokens } from '@groxigo/tokens/react-native';
import type { DatePickerProps } from './DatePicker.types';

/**
 * DatePicker component
 * Date selection input with platform-specific pickers
 */
export const DatePicker = ({
  value,
  onChange,
  label,
  placeholder = 'Select date',
  error,
  disabled,
  style,
  ...props
}: DatePickerProps) => {
  const formatDate = (date: Date | undefined): string => {
    if (!date) return '';
    return date.toLocaleDateString();
  };

  const handlePress = () => {
    if (disabled) return;
    // Platform-specific date picker logic
    if (Platform.OS === 'ios') {
      // iOS date picker
    } else if (Platform.OS === 'android') {
      // Android date picker
    }
  };

  return (
    <View style={style} {...props}>
      <Input
        label={label}
        value={formatDate(value)}
        placeholder={placeholder}
        error={error}
        editable={false}
        onPress={handlePress}
        rightIcon={<Icon name="calendar" size="md" />}
      />
    </View>
  );
};

export default DatePicker;
```

### 4. Create Web Implementation (`DatePicker.web.tsx`)

```typescript
import { createElement } from 'react';
import { Input, Text } from '@groxigo/ui-elements';
import { tokens } from '@groxigo/tokens/web';
import type { DatePickerProps } from './DatePicker.types';
import type { CSSProperties } from 'react';

/**
 * Web-specific DatePicker implementation
 * Uses native HTML date input
 */
export const DatePicker = ({
  value,
  onChange,
  label,
  placeholder = 'Select date',
  error,
  disabled,
  style,
  ...props
}: DatePickerProps) => {
  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && e.target.value) {
      onChange(new Date(e.target.value));
    }
  };

  return createElement(
    'div',
    { style: style as CSSProperties, ...props },
    createElement(Input, {
      type: 'date',
      label,
      value: formatDateForInput(value),
      onChange: handleChange,
      error,
      disabled,
    })
  );
};

export default DatePicker;
```

### 5. Create Index File (`index.ts`)

```typescript
export { DatePicker, default } from './DatePicker';
export type { DatePickerProps } from './DatePicker.types';
```

### 6. Export from Main Index

Add to `src/index.ts`:

```typescript
export * from './components/DatePicker';
```

## Testing Checklist

Before considering a component complete:

- [ ] Component composes from ui-elements (doesn't duplicate functionality)
- [ ] TypeScript types properly defined
- [ ] Uses design tokens for all styling
- [ ] Responsive sizing implemented (if applicable)
- [ ] Section theming supported (if applicable)
- [ ] Platform-specific optimizations (web file if needed)
- [ ] Component exported from index.ts
- [ ] Added to main package exports
- [ ] **Tests created**:
  - [ ] Shared hooks tests (if hooks exist)
  - [ ] Mobile-specific tests
  - [ ] Web-specific tests
  - [ ] Test coverage >80% (recommended)
- [ ] Tested on iOS, Android, and Web
- [ ] Documentation added (JSDoc comments)

## Common Patterns

### Handling Form State

```typescript
export const FormComponent = ({ value, onChange, ...props }: FormComponentProps) => {
  const [internalValue, setInternalValue] = useState(value || '');
  
  const handleChange = (newValue: string) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  };
  
  return <Input value={value ?? internalValue} onChangeText={handleChange} />;
};
```

### Conditional Rendering

```typescript
export const Component = ({ showBadge, badgeText, ...props }: ComponentProps) => {
  return (
    <View>
      {showBadge && badgeText && (
        <Badge variant="primary">{badgeText}</Badge>
      )}
    </View>
  );
};
```

### Event Handling

```typescript
export const Component = ({ onPress, onLongPress, ...props }: ComponentProps) => {
  const handlePress = () => {
    // Additional logic
    onPress?.();
  };
  
  return (
    <Pressable onPress={handlePress} onLongPress={onLongPress}>
      {/* Content */}
    </Pressable>
  );
};
```

## Troubleshooting

### Component Not Rendering

**Problem:** Component doesn't appear

**Solution:**
- Check that component is exported from `index.ts`
- Verify component is added to main `src/index.ts`
- Clear Metro cache: `npx expo start --clear`

### Type Errors

**Problem:** TypeScript errors about missing props

**Solution:**
- Ensure all props are defined in `.types.ts`
- Check that composed ui-elements props are properly typed
- Use `Partial<>` for optional nested props

### Styling Issues

**Problem:** Styles not applying correctly

**Solution:**
- Verify design tokens are imported correctly
- Check platform-specific token imports (web vs react-native)
- Ensure responsive sizing utilities are used correctly

## Advanced Patterns: Refactoring for Code Reuse

When you have platform-specific implementations (`.tsx` and `.web.tsx`), you may find significant code duplication. This section documents how to identify and extract shared logic into reusable hooks.

> **Real-World Example**: The SearchBar component successfully refactored ~300 lines of duplicate code into shared hooks. See [SearchBar Implementation](./src/components/SearchBar/IMPLEMENTATION.md) and [SearchBar Duplicate Code Analysis](./src/components/SearchBar/DUPLICATE_CODE_ANALYSIS.md) for the complete case study.

### When to Refactor

Consider refactoring when you notice:
- **Significant duplication** (>50% of code is identical between platforms)
- **Business logic** that's identical across platforms
- **State management** that's the same on both platforms
- **Event handlers** with identical logic
- **Validation logic** that's platform-agnostic

### Step 1: Identify Duplicate Code

**What to look for:**
- Identical state management logic (useState, useRef, etc.)
- Duplicate event handlers (onChange, onPress, etc.)
- Same business logic calculations (computed values, filters, etc.)
- Repeated validation logic (form validation, prop validation, etc.)

**Example duplicate patterns:**
- State management: `const [value, setValue] = useState(...)` appears in both files
- Event handlers: `handleChange`, `handleSubmit` with identical logic
- Computed values: `const isValid = ...` calculated the same way
- Validation: Same prop validation or form validation logic

#### Step 2: Create Shared Hooks File

Create `ComponentName.hooks.ts` to extract shared logic:

```typescript
// ComponentName.hooks.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import type { ComponentNameProps } from './ComponentName.types';

/**
 * Shared state management hook
 * Extracts all state logic that's identical across platforms
 */
export function useComponentNameState({
  value,
  options,
  // ... other props
}: UseComponentNameStateProps): UseComponentNameStateReturn {
  // All shared state logic here
  const [internalValue, setInternalValue] = useState(value || '');
  const [isActive, setIsActive] = useState(false);
  // ... rest of state logic
  
  // Shared computed values
  const isValid = /* validation logic */;
  const displayValue = /* computed value */;
  
  return {
    internalValue,
    setInternalValue,
    isActive,
    setIsActive,
    isValid,
    displayValue,
    // ... other computed values
  };
}

/**
 * Shared business logic hook
 * Example: Debouncing, filtering, formatting, etc.
 */
export function useComponentNameLogic({
  onAction,
  delay,
  // ... other props
}: UseComponentNameLogicProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const debouncedAction = useCallback((value: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      onAction?.(value);
    }, delay);
  }, [onAction, delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { debouncedAction, timerRef };
}

/**
 * Shared event handlers hook
 */
export function useComponentNameHandlers({
  value,
  internalValue,
  setInternalValue,
  onChange,
  onSubmit,
  // ... other props
  timerRef,
}: UseComponentNameHandlersProps) {
  const handleChange = useCallback((newValue: string) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  }, [onChange, setInternalValue]);

  const handleSubmit = useCallback(() => {
    // Clear any pending timers
    if (timerRef?.current) {
      clearTimeout(timerRef.current);
    }
    onSubmit?.();
  }, [onSubmit, timerRef]);

  return {
    handleChange,
    handleSubmit,
    // ... other handlers
  };
}
```

#### Step 3: Refactor Platform Implementations

**Mobile Implementation (`ComponentName.tsx`):**

```typescript
import { useEffect, useRef } from 'react';
import { View, Pressable, Animated } from 'react-native';
import { Input, Button } from '@groxigo/ui-elements';
import { tokens } from '@groxigo/tokens/react-native';
import {
  useComponentNameState,
  useComponentNameLogic,
  useComponentNameHandlers,
  validateComponentProps,
} from './ComponentName.hooks';

export const ComponentName = ({ ...props }: ComponentNameProps) => {
  const isWeb = Platform.OS === 'web';
  const animatedValue = useRef(new Animated.Value(1)).current;

  // Validate props (if needed)
  validateComponentProps(props);

  // Use shared hooks
  const {
    internalValue,
    setInternalValue,
    isActive,
    setIsActive,
    isValid,
    displayValue,
  } = useComponentNameState({
    value: props.value,
    options: props.options,
    // ... other props
  });

  const { debouncedAction, timerRef } = useComponentNameLogic({
    onAction: props.onAction,
    delay: props.delay,
  });

  const {
    handleChange,
    handleSubmit,
  } = useComponentNameHandlers({
    value: props.value,
    internalValue,
    setInternalValue,
    onChange: props.onChange,
    onSubmit: props.onSubmit,
    timerRef,
  });

  // Platform-specific animation logic (React Native Animated API)
  useEffect(() => {
    // Mobile-specific animations
    Animated.timing(animatedValue, {
      toValue: isActive ? 1 : 0.8,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  // Platform-specific rendering (React Native components)
  return (
    <View>
      <Animated.View style={{ opacity: animatedValue }}>
        <Input
          value={props.value !== undefined ? props.value : internalValue}
          onChangeText={handleChange}
          // ... other props
        />
      </Animated.View>
    </View>
  );
};
```

**Web Implementation (`ComponentName.web.tsx`):**

```typescript
import { useState, useEffect, createElement } from 'react';
import { Input, Button } from '@groxigo/ui-elements';
import { tokens } from '@groxigo/tokens/web';
import {
  useComponentNameState,
  useComponentNameLogic,
  useComponentNameHandlers,
  validateComponentProps,
} from './ComponentName.hooks';

export const ComponentName = ({ ...props }: ComponentNameProps) => {
  const [opacity, setOpacity] = useState(1);

  // Same shared hooks as mobile
  const { ... } = useComponentNameState({ ... });
  const { ... } = useComponentNameLogic({ ... });
  const { ... } = useComponentNameHandlers({ ... });

  // Platform-specific animation logic (CSS transitions)
  useEffect(() => {
    // Web-specific animations using CSS
    setOpacity(0.8);
    setTimeout(() => {
      setOpacity(1);
    }, 200);
  }, [isActive]);

  // Platform-specific rendering (HTML elements)
  return createElement('div', {
    style: { opacity, transition: 'opacity 0.2s' },
  }, /* ... */);
};
```

#### Step 4: Benefits of This Approach

1. **Code Reduction**: Typically removes 50-70% of duplicate code
2. **Single Source of Truth**: Business logic centralized in hooks
3. **Easier Maintenance**: Bug fixes and improvements in one place
4. **Better Testability**: Shared logic can be tested independently
5. **Type Safety**: Shared types ensure consistency across platforms
6. **Faster Development**: New features only need to be added once

#### Step 5: What Stays Platform-Specific

**Keep separate:**
- Rendering logic (React Native components vs HTML elements)
- Animation APIs (Animated API vs CSS transitions)
- Style systems (StyleSheet vs CSSProperties)
- Type differences (NodeJS.Timeout vs number for refs)

**Extract to hooks:**
- State management
- Business logic
- Event handlers
- Validation logic
- Computed values

### Testing Shared Hooks

Create `ComponentName.hooks.test.ts` to test shared logic:

```typescript
import { renderHook, act } from '@testing-library/react';
import {
  useComponentNameState,
  useComponentNameLogic,
  useComponentNameHandlers,
} from './ComponentName.hooks';

describe('useComponentNameState', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers(); // Important: clear all timers
    jest.useRealTimers();
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useComponentNameState(defaultProps));
    expect(result.current.internalValue).toBe('');
    expect(result.current.isActive).toBe(false);
  });

  it('updates state correctly', () => {
    const { result } = renderHook(() => useComponentNameState(defaultProps));
    
    act(() => {
      result.current.setInternalValue('test');
    });

    expect(result.current.internalValue).toBe('test');
  });
});

describe('useComponentNameLogic', () => {
  it('debounces actions correctly', () => {
    const onAction = jest.fn();
    const { result } = renderHook(() =>
      useComponentNameLogic({ onAction, delay: 300 })
    );

    act(() => {
      result.current.debouncedAction('test');
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(onAction).toHaveBeenCalledWith('test');
  });
});
```

**Important Testing Tips:**
- Use `jest.clearAllTimers()` instead of `jest.runOnlyPendingTimers()` to avoid hanging tests
- Remove unnecessary `await` with fake timers (they're synchronous)
- Wrap timer advances in `act()` for React state updates
- Test shared logic independently from platform-specific rendering

### Platform-Specific Testing

When you have platform-specific implementations, create separate test files for each platform:

#### Test File Structure

```
ComponentName/
├── ComponentName.hooks.test.ts      # Tests for shared hooks
├── ComponentName.mobile.test.tsx    # Mobile/React Native tests
├── ComponentName.web.test.tsx       # Web-specific tests
└── ComponentName.test.shared.tsx     # Shared test utilities (optional)
```

#### Test File Purposes

**1. `ComponentName.hooks.test.ts`**
- Tests shared business logic hooks
- Platform-agnostic tests
- Uses `@testing-library/react` with `renderHook`

**2. `ComponentName.mobile.test.tsx`**
- Tests React Native implementation
- Uses `@testing-library/react-native`
- Tests platform-specific features:
  - React Native Animated API
  - React Native components (View, Pressable, FlatList, etc.)
  - Mobile-specific sizing and styling
  - Platform-specific behavior

**3. `ComponentName.web.test.tsx`**
- Tests web implementation
- Uses `@testing-library/react`
- Tests platform-specific features:
  - HTML elements (input, div, button, etc.)
  - CSS transitions and animations
  - Web-specific sizing and styling
  - DOM APIs and window events

**4. `ComponentName.test.shared.tsx` (Optional)**
- Shared test utilities and constants
- Mock data and helpers
- Common test case definitions

#### Running Tests

```bash
# Run all component tests
npm test ComponentName

# Run only mobile tests
npm test ComponentName.mobile

# Run only web tests
npm test ComponentName.web

# Run only shared hooks tests
npm test ComponentName.hooks

# Run with coverage
npm run test:coverage ComponentName
```

#### Benefits of Separate Test Files

1. **Platform-Specific Testing**: Each platform tested with appropriate testing libraries
2. **Clear Separation**: Easy to identify which tests apply to which platform
3. **Maintainability**: Changes to one platform don't affect the other's tests
4. **Accurate Mocks**: Platform-specific mocks (React Native vs DOM)
5. **Better Coverage**: Can test platform-specific features independently
6. **Faster Tests**: Can run platform-specific tests in parallel

#### Shared Test Cases

Common functionality that works the same on both platforms should be tested in both files:
- Business logic (if not in hooks)
- Event handlers (if not in hooks)
- Validation logic
- State management (if not in hooks)

These can be:
- Tested in both files (for platform-specific rendering verification)
- Extracted to shared test utilities
- Tested in hooks tests (if extracted to hooks)

#### Example Test Structure

```typescript
// ComponentName.test.shared.tsx
export const defaultProps = {
  // Shared test props
};

export const mockData = {
  // Shared mock data
};

// ComponentName.mobile.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { ComponentName } from './ComponentName';
import { defaultProps } from './ComponentName.test.shared';

describe('ComponentName (Mobile)', () => {
  it('renders with React Native components', () => {
    const { getByTestId } = render(<ComponentName {...defaultProps} />);
    // Test mobile-specific rendering
  });
});

// ComponentName.web.test.tsx
import { render, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName.web';
import { defaultProps } from './ComponentName.test.shared';

describe('ComponentName (Web)', () => {
  it('renders with HTML elements', () => {
    const { getByTestId } = render(<ComponentName {...defaultProps} />);
    // Test web-specific rendering
  });
});
```

> **Real-World Example**: See [SearchBar Test Structure](./src/components/SearchBar/TEST_STRUCTURE.md) for a complete example of platform-specific testing.

### Refactoring Checklist

When refactoring duplicate code:

- [ ] Identify duplicate logic between platform files
- [ ] Create `ComponentName.hooks.ts` for shared logic
- [ ] Extract state management to shared hooks
- [ ] Extract event handlers to shared hooks
- [ ] Extract business logic to shared hooks
- [ ] Keep platform-specific rendering separate
- [ ] Update both platform implementations to use hooks
- [ ] Create tests for shared hooks
- [ ] Verify both platforms work correctly
- [ ] Update documentation

## Additional Resources

- [UI Elements Development Guide](../ui-elements/UI_ELEMENT_DEVELOPMENT.md)
- [Responsive Sizing Guidelines](../ui-elements/RESPONSIVE_SIZING.md)
- [Design Tokens Documentation](../tokens/README.md)

**Refactoring Examples:**
- [SearchBar Implementation](./src/components/SearchBar/IMPLEMENTATION.md) - Complete component documentation
- [SearchBar Duplicate Code Analysis](./src/components/SearchBar/DUPLICATE_CODE_ANALYSIS.md) - Refactoring case study
- [SearchBar Test Structure](./src/components/SearchBar/TEST_STRUCTURE.md) - Testing patterns

---

**Remember:** Composite components should always build from `@groxigo/ui-elements` primitives. Never duplicate primitive functionality - compose it!

