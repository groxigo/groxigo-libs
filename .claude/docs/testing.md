# Testing Guide

Complete testing documentation for groxigo-libs packages.

---

## Overview

| Package | Tests | Coverage | Location |
|---------|-------|----------|----------|
| @groxigo/tokens | ✅ | ~95% | `src/__tests__/` |
| @groxigo/ui-core | ✅ | 99%+ | `src/hooks/__tests__/` |
| @groxigo/components | ✅ | ~80% | `src/components/*/__tests__/` |
| @groxigo/contracts | Types only | N/A | No runtime code |
| @groxigo/ui-elements | Partial | - | - |
| @groxigo/ui-elements-web | Partial | - | Stories |
| @groxigo/components-web | Partial | - | Stories |

---

## Running Tests

```bash
# Run all tests
npm run test

# Run tests for specific package
cd packages/ui-core && npm test

# Watch mode
cd packages/ui-core && npm run test:watch

# Coverage report
cd packages/ui-core && npm run test:coverage
```

---

## ui-core Tests (220 tests)

### Test Files

| File | Hook(s) | Tests |
|------|---------|-------|
| `useControllable.test.ts` | useControllable | 17 |
| `useDisclosure.test.ts` | useDisclosure | 19 |
| `useDebounce.test.ts` | useDebounce, useDebouncedCallback | 19 |
| `useThrottle.test.ts` | useThrottle, useThrottledCallback | 17 |
| `useMergeRefs.test.ts` | useMergeRefs, mergeRefs | 17 |
| `useCallbackRef.test.ts` | useCallbackRef, useEventCallback | 16 |
| `useId.test.ts` | useId, useIds, useSSRSafeId | 18 |
| `usePrevious.test.ts` | usePrevious, usePreviousWithInitial | 18 |
| `useLatest.test.ts` | useLatest | 14 |
| `useForceUpdate.test.ts` | useForceUpdate | 13 |
| `useUpdateEffect.test.ts` | useUpdateEffect, useIsFirstRender | 15 |
| `useUnmountEffect.test.ts` | useUnmountEffect, useIsMounted | 16 |
| `useMediaQuery.test.ts` | Breakpoint utilities | 21 |

### Example Test Pattern

```typescript
import { renderHook, act } from '@testing-library/react';
import { useDisclosure } from '../useDisclosure';

describe('useDisclosure', () => {
  it('should initialize with isOpen = false by default', () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);
  });

  it('should open when open() is called', () => {
    const { result } = renderHook(() => useDisclosure());
    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);
  });

  it('should call onOpen callback', () => {
    const onOpen = jest.fn();
    const { result } = renderHook(() => useDisclosure({ onOpen }));
    act(() => {
      result.current.open();
    });
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('should handle controlled mode', () => {
    const onChange = jest.fn();
    const { result, rerender } = renderHook(
      ({ isOpen }) => useDisclosure({ isOpen, onChange }),
      { initialProps: { isOpen: false } }
    );

    act(() => {
      result.current.open();
    });
    expect(onChange).toHaveBeenCalledWith(true);

    // Value doesn't change until prop changes (controlled)
    expect(result.current.isOpen).toBe(false);

    rerender({ isOpen: true });
    expect(result.current.isOpen).toBe(true);
  });
});
```

### Testing Timing (Debounce/Throttle)

```typescript
describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should debounce value updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });
    expect(result.current).toBe('initial'); // Not updated yet

    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(result.current).toBe('initial'); // Still not updated

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe('updated'); // Now updated
  });
});
```

---

## components Tests (204 tests)

### Test Files

| Component | Tests |
|-----------|-------|
| ProductCard | Rendering, price, discount, actions |
| CartItem | Quantity, remove, price display |
| QuantitySelector | Increment, decrement, bounds |
| Rating | Stars, interactive, readonly |
| FilterBar | Selection, multi-select |
| Modal | Open/close, backdrop, escape |
| Form | Submit, validation, reset |
| EmptyState | Rendering, action |
| ErrorState | Retry, message |

### Testing Components with Theme

```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductCard } from '../ProductCard';

// Mock the theme
jest.mock('@groxigo/ui-elements', () => ({
  useTheme: () => ({
    colors: {
      text: '#000000',
      textSecondary: '#666666',
      surface: '#ffffff',
      primary: '#4CAF50',
      error: '#f44336',
      border: '#e0e0e0',
    },
    spacing: {
      1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24,
    },
    radius: { sm: 4, md: 8, lg: 12 },
    typography: {
      fontFamily: { sans: 'System' },
    },
  }),
  Text: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Badge: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  Button: ({ children, onPress, ...props }: any) => (
    <button onClick={onPress} {...props}>{children}</button>
  ),
}));

describe('ProductCard', () => {
  const defaultProps = {
    name: 'Test Product',
    price: 9.99,
    imageUrl: 'https://example.com/image.jpg',
  };

  it('renders product name', () => {
    const { getByText } = render(<ProductCard {...defaultProps} />);
    expect(getByText('Test Product')).toBeTruthy();
  });

  it('calls onAddToCart when button pressed', () => {
    const onAddToCart = jest.fn();
    const { getByRole } = render(
      <ProductCard {...defaultProps} onAddToCart={onAddToCart} />
    );
    fireEvent.press(getByRole('button'));
    expect(onAddToCart).toHaveBeenCalled();
  });
});
```

### Testing Form Context

```typescript
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Form, FormInput, useFormContext } from '../Form';

function SubmitButton() {
  const { handleSubmit, isSubmitting } = useFormContext();
  return (
    <button
      onClick={handleSubmit}
      disabled={isSubmitting}
      data-testid="submit"
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  );
}

describe('Form', () => {
  it('should submit form values', async () => {
    const onSubmit = jest.fn();

    const { getByTestId } = render(
      <Form initialValues={{ email: '' }} onSubmit={onSubmit}>
        <FormInput name="email" testID="email-input" />
        <SubmitButton />
      </Form>
    );

    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.press(getByTestId('submit'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });

  it('should validate on submit', async () => {
    const validate = (values: { email: string }) => {
      const errors: Record<string, string> = {};
      if (!values.email) errors.email = 'Required';
      return errors;
    };

    const { getByTestId, getByText } = render(
      <Form initialValues={{ email: '' }} onSubmit={jest.fn()} validate={validate}>
        <FormInput name="email" testID="email-input" />
        <SubmitButton />
      </Form>
    );

    fireEvent.press(getByTestId('submit'));

    await waitFor(() => {
      expect(getByText('Required')).toBeTruthy();
    });
  });
});
```

---

## Jest Configuration

### ui-core jest.config.js

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### components jest.config.js

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^@groxigo/ui-elements$': '<rootDir>/../ui-elements/src',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      jsx: 'react-jsx',
      jsxImportSource: 'react',
    }],
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.types.ts',
    '!src/**/index.ts',
  ],
};
```

---

## Storybook (Visual Testing)

Web components use Storybook for visual testing.

### Running Storybook

```bash
cd apps/storybook-web
npm run storybook
```

### Story Pattern

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ProductCard } from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    name: 'Fresh Apples',
    price: 4.99,
    imageUrl: 'https://images.unsplash.com/photo-...',
    onAddToCart: action('onAddToCart'),
    onToggleFavorite: action('onToggleFavorite'),
  },
};

export const WithDiscount: Story = {
  args: {
    ...Default.args,
    originalPrice: 6.99,
    badge: '28% OFF',
    badgeColorScheme: 'error',
  },
};

export const OutOfStock: Story = {
  args: {
    ...Default.args,
    outOfStock: true,
  },
};
```

---

## Best Practices

### 1. Test User Behavior, Not Implementation

```typescript
// ❌ Bad - Testing implementation
expect(result.current.internalState).toBe('value');

// ✅ Good - Testing behavior
act(() => result.current.open());
expect(result.current.isOpen).toBe(true);
```

### 2. Mock at Boundaries

```typescript
// Mock external dependencies, not internal logic
jest.mock('@groxigo/ui-elements', () => ({
  useTheme: () => mockTheme,
}));
```

### 3. Test Accessibility

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

it('should have no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 4. Use Testing Library Queries

```typescript
// Prefer accessible queries
getByRole('button', { name: 'Submit' })
getByLabelText('Email')
getByText('Welcome')

// Avoid implementation details
// ❌ getByClassName('btn-primary')
// ❌ container.querySelector('.btn')
```
