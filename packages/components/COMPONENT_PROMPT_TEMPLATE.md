# Component Development Prompt Template

Use this template when requesting new composite component development. Fill in the details below and provide it to the development team.

> **📖 How to Use**: See [HOW_TO_USE_PROMPT_TEMPLATE.md](./HOW_TO_USE_PROMPT_TEMPLATE.md) for a detailed guide on filling out this template with examples.

> **Note**: This template follows the patterns documented in [COMPONENT_DEVELOPMENT.md](./COMPONENT_DEVELOPMENT.md). For refactoring existing components with duplicate code, see the "Advanced Patterns: Refactoring for Code Reuse" section.

## Component Information

**Component Name:** [e.g., DatePicker, TimePicker, Select, etc.]

**Package:** `@groxigo/components`

**Priority:** [High / Medium / Low]

**Target Phase:** [Phase 3 / Phase 4 / etc.]

## Component Description

**Purpose:**
[Describe what the component does and why it's needed]

**Use Cases:**
- [Use case 1]
- [Use case 2]
- [Use case 3]

## Functional Requirements

### Core Features
- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3

### Props/API
```typescript
interface ComponentNameProps {
  // Required props
  value?: string;
  onChange?: (value: string) => void;
  
  // Optional props
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  
  // Styling
  style?: ViewStyle;
  containerStyle?: ViewStyle;
}
```

### Behavior
- [Behavior description 1]
- [Behavior description 2]
- [Behavior description 3]

## Design Requirements

### Visual Design
[Describe the visual appearance, layout, and styling]

### Sizes/Variants
- **Sizes:** [sm, md, lg / or specific dimensions]
- **Variants:** [primary, secondary, etc. / or specific variants]

### Responsive Behavior
- **Mobile:** [How it should behave on mobile]
- **Web:** [How it should behave on web]

### Section Theming
- [ ] Should support groceries/recipes section theming
- [ ] Should use default theme only

## Composition Requirements

### ui-elements to Use
- [ ] Text
- [ ] Button
- [ ] Card
- [ ] Input
- [ ] Badge
- [ ] Avatar
- [ ] Icon
- [ ] [Other ui-elements]

### Additional Dependencies
- [List any additional dependencies needed]

## Platform-Specific Requirements

### iOS
- [iOS-specific requirements or behaviors]

### Android
- [Android-specific requirements or behaviors]

### Web
- [Web-specific requirements or behaviors]
- [ ] Needs native HTML implementation
- [ ] Needs SEO/accessibility considerations

### Code Reuse Considerations
- [ ] **Identify duplicate code** between `.tsx` and `.web.tsx` implementations
- [ ] **Create shared hooks** (`ComponentName.hooks.ts`) if significant duplication exists (>50%)
- [ ] **Extract to hooks**:
  - [ ] State management logic
  - [ ] Business logic (debouncing, filtering, etc.)
  - [ ] Event handlers
  - [ ] Validation logic
- [ ] **Keep platform-specific**:
  - [ ] Rendering logic (React Native vs HTML)
  - [ ] Animation APIs (Animated API vs CSS)
  - [ ] Style systems (StyleSheet vs CSSProperties)

## Examples

### Basic Usage
```typescript
import { ComponentName } from '@groxigo/components';

<ComponentName
  label="Label"
  value={value}
  onChange={setValue}
/>
```

### Advanced Usage
```typescript
<ComponentName
  label="Label"
  value={value}
  onChange={setValue}
  error="Error message"
  disabled={false}
  section="groceries"
/>
```

## Edge Cases

- [Edge case 1 and how to handle it]
- [Edge case 2 and how to handle it]
- [Edge case 3 and how to handle it]

## Accessibility Requirements

- [ ] Keyboard navigation support
- [ ] Screen reader support
- [ ] Focus management
- [ ] ARIA attributes (web)
- [ ] Minimum touch target size (44×44px mobile)

## Testing Requirements

- [ ] Unit tests
- [ ] Integration tests
- [ ] Visual regression tests
- [ ] Cross-platform testing (iOS, Android, Web)
- [ ] Responsive testing (375px mobile, up to 1440px web)
- [ ] **Shared hooks tests** (if hooks are created for duplicate code)
- [ ] **Platform-specific tests**:
  - [ ] Mobile tests (`ComponentName.mobile.test.tsx`)
  - [ ] Web tests (`ComponentName.web.test.tsx`)
- [ ] Test coverage >80% (recommended)

## Documentation Requirements

- [ ] JSDoc comments
- [ ] Usage examples
- [ ] Props documentation
- [ ] Platform-specific notes
- [ ] Accessibility notes
- [ ] **IMPLEMENTATION.md** file with:
  - [ ] Component overview and structure
  - [ ] API/props documentation
  - [ ] Implementation details
  - [ ] Platform-specific behavior
  - [ ] Refactoring notes (if hooks were created)
  - [ ] Usage examples
  - [ ] Recent changes/changelog

## Related Components

**Similar Components:**
- [Component 1] - [How it differs]
- [Component 2] - [How it differs]

**Dependencies:**
- [Component/package that this depends on]

## Additional Notes

[Any additional information, constraints, or considerations]

---

## Implementation Checklist

After development, verify:

- [ ] Component follows COMPONENT_DEVELOPMENT.md guidelines
- [ ] All props properly typed in `.types.ts`
- [ ] Base implementation in `.tsx`
- [ ] Web implementation in `.web.tsx` (if needed)
- [ ] **Shared hooks created** (`ComponentName.hooks.ts`) if duplicate code exists
- [ ] **Refactored duplicate code** between mobile and web implementations
- [ ] Uses design tokens (no hardcoded values)
- [ ] Responsive sizing implemented
- [ ] Section theming supported (if applicable)
- [ ] Exported from `index.ts`
- [ ] Added to main package exports
- [ ] **Tests created**:
  - [ ] Shared hooks tests (if hooks exist)
  - [ ] Mobile-specific tests
  - [ ] Web-specific tests
  - [ ] Test coverage >80%
- [ ] Tested on all platforms
- [ ] Documentation complete (JSDoc + IMPLEMENTATION.md)
- [ ] Added to demo app

---

## Example: DatePicker Component Request

**Component Name:** DatePicker

**Package:** `@groxigo/components`

**Priority:** High

**Target Phase:** Phase 3

## Component Description

**Purpose:**
A date selection component that allows users to pick a date from a calendar. Should work seamlessly across iOS, Android, and Web platforms.

**Use Cases:**
- Selecting delivery dates for groceries
- Choosing recipe creation dates
- Filtering by date ranges

## Functional Requirements

### Core Features
- [x] Date selection via native platform pickers
- [x] Date formatting and display
- [x] Minimum/maximum date constraints
- [x] Error state support
- [x] Disabled state support

### Props/API
```typescript
interface DatePickerProps {
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

### Behavior
- Opens native date picker on mobile platforms
- Uses HTML date input on web
- Formats date according to locale
- Validates date against min/max constraints

## Design Requirements

### Visual Design
- Uses Input component for display
- Calendar icon on the right
- Error state shows red border and error message
- Disabled state shows grayed out appearance

### Sizes/Variants
- **Sizes:** Inherits from Input (sm, md, lg)
- **Variants:** default, error (inherited from Input)

### Responsive Behavior
- **Mobile:** Native date picker modal
- **Web:** HTML date input with calendar popup

### Section Theming
- [x] Should support groceries/recipes section theming (via Input)

## Composition Requirements

### ui-elements to Use
- [x] Input (for display and styling)
- [x] Icon (calendar icon)
- [x] Text (for error messages, if needed)

### Additional Dependencies
- None (uses native platform date pickers)

## Platform-Specific Requirements

### iOS
- Use iOS native date picker (DatePickerIOS or similar)

### Android
- Use Android native date picker

### Web
- [x] Needs native HTML implementation
- [x] Needs SEO/accessibility considerations
- Use HTML5 `<input type="date">`

## Examples

### Basic Usage
```typescript
import { DatePicker } from '@groxigo/components';

<DatePicker
  label="Select Date"
  value={selectedDate}
  onChange={setSelectedDate}
/>
```

### Advanced Usage
```typescript
<DatePicker
  label="Delivery Date"
  value={deliveryDate}
  onChange={setDeliveryDate}
  minimumDate={new Date()}
  maximumDate={maxDate}
  error={errors.deliveryDate}
  section="groceries"
/>
```

## Edge Cases

- Empty value: Show placeholder
- Invalid date: Show error state
- Date outside min/max: Prevent selection or show error
- Timezone handling: Use local timezone

## Accessibility Requirements

- [x] Keyboard navigation support (web)
- [x] Screen reader support
- [x] Focus management
- [x] ARIA attributes (web)
- [x] Minimum touch target size (44×44px mobile)

## Testing Requirements

- [x] Unit tests
- [x] Integration tests
- [x] Cross-platform testing (iOS, Android, Web)
- [x] Responsive testing (375px mobile, up to 1440px web)

## Documentation Requirements

- [x] JSDoc comments
- [x] Usage examples
- [x] Props documentation
- [x] Platform-specific notes
- [x] Accessibility notes

## Related Components

**Similar Components:**
- Input - DatePicker uses Input for display
- TimePicker (future) - Similar pattern for time selection

**Dependencies:**
- @groxigo/ui-elements (Input, Icon, Text)

## Additional Notes

- Should handle date formatting consistently across platforms
- Consider adding date range picker variant in future
- May need locale support for date formatting

