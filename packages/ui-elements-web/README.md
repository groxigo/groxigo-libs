# @groxigo/ui-elements-web

Primitive UI building blocks for web applications -- 22 React components styled with CSS Modules and design tokens from `@groxigo/tokens`. API-compatible with `@groxigo/ui-elements` (React Native) for cross-platform consistency.

## Installation

```bash
# npm
npm install @groxigo/ui-elements-web

# bun
bun add @groxigo/ui-elements-web
```

### Peer Dependencies

| Package     | Version  |
|-------------|----------|
| `react`     | >= 19.0  |
| `react-dom` | >= 19.0  |

## Quick Start

```tsx
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from '@groxigo/ui-elements-web';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Input
        label="Email"
        placeholder="you@example.com"
        variant="outline"
        size="md"
        onChangeText={(value) => console.log(value)}
      />

      <Button
        variant="solid"
        colorScheme="primary"
        size="md"
        onPress={() => setOpen(true)}
      >
        Open Modal
      </Button>

      <Modal isOpen={open} onClose={() => setOpen(false)} size="md">
        <ModalHeader>Confirm Action</ModalHeader>
        <ModalBody>Are you sure you want to proceed?</ModalBody>
        <ModalFooter>
          <Button variant="ghost" onPress={() => setOpen(false)}>Cancel</Button>
          <Button colorScheme="primary" onPress={() => setOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

## Components

### Form Inputs

| Component    | Description                                              |
|--------------|----------------------------------------------------------|
| `Input`      | Text input with label, error, helper text, and addons    |
| `TextArea`   | Multi-line text input                                    |
| `Checkbox`   | Checkbox with label and indeterminate state               |
| `Radio`      | Radio button for single-select groups                    |
| `Select`     | Dropdown select with option groups                       |
| `Switch`     | Toggle switch for boolean values                         |
| `Slider`     | Range slider with min/max and step                       |

### Data Display

| Component | Description                                                 |
|-----------|-------------------------------------------------------------|
| `Text`    | Typography primitive with variant, color scheme, and weight |
| `Avatar`  | User or entity avatar with image, initials, and fallback    |
| `Badge`   | Status indicator or count label                             |
| `Icon`    | Renders SVG icons with size and color props                 |
| `Image`   | Image with loading state, fallback, and aspect ratio        |

### Layout

| Component | Description                               |
|-----------|-------------------------------------------|
| `Card`    | Surface container with padding and shadow  |
| `Divider` | Horizontal or vertical separator line      |
| `Spacer`  | Flexible whitespace utility                |

### Feedback

| Component  | Description                                       |
|------------|---------------------------------------------------|
| `Spinner`  | Loading indicator with size and color variants     |
| `Skeleton` | Placeholder shimmer for content loading states     |
| `Progress` | Determinate or indeterminate progress bar          |
| `Toast`    | Dismissible notification message                   |
| `Tooltip`  | Contextual popup anchored to a trigger element     |

### Navigation

| Component    | Description                              |
|--------------|------------------------------------------|
| `Tabs`       | Tab bar with panels for sectioned content |
| `Breadcrumb` | Breadcrumb trail for hierarchical nav     |

### Overlays

| Component | Description                                        |
|-----------|----------------------------------------------------|
| `Modal`   | Dialog with overlay, focus trap, and portal support |
| `Drawer`  | Slide-in panel from any edge                       |
| `Menu`    | Dropdown menu with items and keyboard navigation   |
| `Link`    | Anchor element styled as a text link               |

## Styling

All components use **CSS Modules** (`.module.css` files) powered by design token CSS custom properties from `@groxigo/tokens`. No Tailwind classes are used at the component level.

```
tokens (CSS custom properties)  -->  CSS Modules  -->  Component
```

- Token values such as colors, spacing, font sizes, and radii are consumed as `var(--grx-*)` custom properties.
- Responsive sizing is handled automatically via `clamp()` expressions in the token CSS variables (fluid scaling from 375px to 1440px viewports).
- Override styles by passing a `className` prop; it is merged using `clsx`.

## Accessibility

Every component follows WAI-ARIA best practices:

- **ARIA attributes** -- `aria-invalid`, `aria-describedby`, `aria-busy`, `aria-modal`, and `aria-label` are applied where appropriate.
- **Keyboard navigation** -- Modal traps focus with Tab/Shift+Tab cycling; Escape closes overlays; buttons respond to Enter and Space.
- **Focus management** -- `focus-visible` outlines for keyboard-only focus indicators. Modal restores focus to the previously active element on close.
- **Semantic HTML** -- native `<button>`, `<input>`, `<label>`, and `<dialog>`-like patterns are used instead of generic `<div>` wrappers.
- **Screen readers** -- loading spinners include `aria-hidden` decorative SVGs with a screen-reader-only "Loading" label; error messages use `role="alert"`.

## Architecture

### Contract-First Design

Every component implements a `*PropsBase` interface from `@groxigo/contracts`, ensuring API parity with the React Native counterpart in `@groxigo/ui-elements`.

```typescript
import type { ButtonPropsBase } from '@groxigo/contracts';

export interface ButtonProps extends ButtonPropsBase {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}
```

### Component Conventions

- **`forwardRef`** -- all 22 components forward refs to their root DOM element.
- **`displayName`** -- every component sets a static `displayName` for DevTools and error messages.
- **`testID`** -- all components accept a `testID` prop rendered as `data-testid`.
- **Defaults** -- sensible defaults for `variant`, `size`, and `colorScheme` so components work out of the box.

### Dependency Graph

```
@groxigo/contracts   (TypeScript interfaces)
@groxigo/tokens      (CSS custom properties)
        |
   @groxigo/ui-core  (shared hooks and utilities)
        |
   @groxigo/ui-elements-web   <-- this package
        |
   @groxigo/components-web    (composite components)
```

## Dependencies

| Package              | Role                                        |
|----------------------|---------------------------------------------|
| `@groxigo/contracts` | Cross-platform prop interfaces               |
| `@groxigo/tokens`    | Design token CSS custom properties           |
| `@groxigo/ui-core`   | Shared hooks (`useMediaQuery`, etc.)         |
| `clsx`               | Conditional class name merging               |

## Scripts

```bash
bun run build        # Compile TypeScript to dist/
bun run build:watch  # Watch mode
bun run clean        # Remove dist/
```

## License

MIT
