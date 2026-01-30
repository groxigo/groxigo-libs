# Accessibility Implementation

Complete documentation of accessibility features in groxigo-libs.

---

## Overview

All components follow WCAG 2.1 AA guidelines with support for:
- Screen readers (VoiceOver, TalkBack, NVDA)
- Keyboard navigation
- Focus management
- Color contrast (4.5:1 minimum)
- Touch targets (44×44px minimum)

---

## Focus Management

### Modal Focus Trap

When a modal opens:
1. Focus moves to first focusable element (or `initialFocusRef`)
2. Tab cycles within modal only
3. Escape closes modal
4. Focus returns to trigger (or `finalFocusRef`) on close

```typescript
// ui-elements/Modal/Modal.tsx

function useFocusTrap(isActive: boolean, containerRef: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    firstElement?.focus();
    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);
}
```

### Usage

```tsx
<Modal
  isOpen={isOpen}
  onClose={close}
  trapFocus
  initialFocusRef={emailInputRef}
  finalFocusRef={triggerButtonRef}
>
  <ModalBody>
    <Input ref={emailInputRef} label="Email" />
  </ModalBody>
</Modal>
```

---

## Keyboard Navigation

### Select Component

| Key | Action |
|-----|--------|
| `Space` / `Enter` | Open dropdown, select focused option |
| `ArrowDown` | Move to next option |
| `ArrowUp` | Move to previous option |
| `Home` | Move to first option |
| `End` | Move to last option |
| `Escape` | Close dropdown |
| Type characters | Jump to matching option |

```typescript
// ui-elements/Select/Select.tsx

const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      setFocusedIndex(prev =>
        Math.min(prev + 1, options.length - 1)
      );
      break;
    case 'ArrowUp':
      e.preventDefault();
      setFocusedIndex(prev => Math.max(prev - 1, 0));
      break;
    case 'Home':
      e.preventDefault();
      setFocusedIndex(0);
      break;
    case 'End':
      e.preventDefault();
      setFocusedIndex(options.length - 1);
      break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      if (isOpen) {
        handleSelect(options[focusedIndex]);
      } else {
        setIsOpen(true);
      }
      break;
    case 'Escape':
      setIsOpen(false);
      break;
  }
};
```

### TabBar Component

| Key | Action |
|-----|--------|
| `ArrowRight` | Next tab |
| `ArrowLeft` | Previous tab |
| `Home` | First tab |
| `End` | Last tab |
| `Enter` / `Space` | Select tab |

### Card (Pressable)

```tsx
// ui-elements-web/Card/Card.tsx

<div
  role={pressable ? 'button' : undefined}
  tabIndex={pressable ? 0 : undefined}
  onClick={pressable ? onPress : undefined}
  onKeyDown={pressable ? (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPress?.();
    }
  } : undefined}
  className={cn(
    pressable && 'cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-500'
  )}
>
```

---

## ARIA Attributes

### Modal

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby={titleId}
  aria-describedby={descriptionId}
>
  <h2 id={titleId}>{title}</h2>
  <p id={descriptionId}>{description}</p>
</div>
```

### Select (Combobox Pattern)

```tsx
<div
  role="combobox"
  aria-expanded={isOpen}
  aria-haspopup="listbox"
  aria-controls={listboxId}
  aria-activedescendant={focusedOptionId}
>
  <input aria-autocomplete="list" />
</div>

<ul id={listboxId} role="listbox">
  {options.map(option => (
    <li
      id={`option-${option.value}`}
      role="option"
      aria-selected={option.value === value}
    >
      {option.label}
    </li>
  ))}
</ul>
```

### Button States

```tsx
<button
  aria-disabled={isDisabled || isLoading}
  aria-busy={isLoading}
>
  {isLoading && <Spinner aria-hidden="true" />}
  <span className={isLoading ? 'sr-only' : undefined}>
    {children}
  </span>
  {isLoading && <span className="sr-only">Loading...</span>}
</button>
```

### Toast Announcements

```tsx
<div
  role="alert"
  aria-live="polite"
  aria-atomic="true"
>
  {message}
</div>
```

### Form Errors

```tsx
<Input
  id={inputId}
  aria-invalid={!!error}
  aria-describedby={error ? errorId : helperText ? helperId : undefined}
/>
{error && (
  <span id={errorId} role="alert">
    {error}
  </span>
)}
{helperText && (
  <span id={helperId}>
    {helperText}
  </span>
)}
```

---

## Touch Targets

All interactive elements have minimum 44×44px touch targets.

### Button hitSlop (React Native)

```typescript
// ui-elements/Button/Button.tsx

const getHitSlop = (size: ButtonSize) => {
  const sizeHeights = { xs: 28, sm: 32, md: 40, lg: 48, xl: 56 };
  const height = sizeHeights[size];

  if (height >= 44) return undefined;

  const padding = Math.ceil((44 - height) / 2);
  return { top: padding, bottom: padding, left: padding, right: padding };
};

<Pressable
  hitSlop={getHitSlop(size)}
  accessibilityRole="button"
  accessibilityLabel={accessibilityLabel}
  accessibilityHint={iconOnly ? `Activates ${accessibilityLabel}` : undefined}
>
```

### Checkbox hitSlop

```typescript
// Checkbox sm is 16px, needs hitSlop to reach 44px
const hitSlop = {
  top: 14,
  bottom: 14,
  left: 14,
  right: 14,
};
```

---

## Screen Reader Support

### React Native

```tsx
<Pressable
  accessibilityRole="button"
  accessibilityLabel="Add to cart"
  accessibilityHint="Double tap to add this item to your shopping cart"
  accessibilityState={{
    disabled: isDisabled,
    selected: isSelected,
    checked: isChecked,
  }}
>
```

### Web

```tsx
<button
  aria-label="Add to cart"
  aria-pressed={isActive}
  aria-describedby={hintId}
>
  <span className="sr-only">Add to cart</span>
  <CartIcon aria-hidden="true" />
</button>
```

### Screen Reader Only Text

```css
/* Tailwind utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## Focus Visible

Use `focus-visible` instead of `focus` for keyboard-only focus indicators:

```tsx
<button
  className={cn(
    // Remove default outline
    'outline-none',
    // Keyboard focus indicator
    'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    // No ring on mouse click
  )}
>
```

---

## Color Contrast

All text colors meet WCAG AA contrast requirements:

| Combination | Ratio | Passes |
|-------------|-------|--------|
| text-primary on surface | 12.6:1 | AAA |
| text-secondary on surface | 7.1:1 | AAA |
| text-tertiary on surface | 4.8:1 | AA |
| white on primary | 4.5:1 | AA |
| white on error | 5.2:1 | AAA |

### Contrast Utilities

```typescript
import { checkContrast, getContrastRatio } from '@groxigo/tokens/utils';

// Get contrast ratio
const ratio = getContrastRatio('#000000', '#ffffff'); // 21

// Check WCAG compliance
const passesAA = checkContrast('#333333', '#ffffff', 'AA'); // true
const passesAAA = checkContrast('#333333', '#ffffff', 'AAA'); // true
```

---

## Testing Accessibility

### Automated Testing

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual Testing Checklist

- [ ] Navigate with Tab key only
- [ ] Activate with Enter/Space
- [ ] Escape closes modals/dropdowns
- [ ] Focus visible on all interactive elements
- [ ] Focus trapped in modals
- [ ] Focus returns after modal closes
- [ ] Screen reader announces all content
- [ ] Error messages announced
- [ ] Form labels associated with inputs
- [ ] Touch targets are 44×44px minimum
