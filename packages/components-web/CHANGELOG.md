# @groxigo/components-web

## 1.2.12

### Patch Changes

- fix: require icons>=1.0.3 to ensure HeartFilled is available

## 1.2.11

### Patch Changes

- Add imageUrl prop to CategoryChip, add 'use client' to all web elements, mobile cleanup

- Updated dependencies []:
  - @groxigo/contracts@1.3.4

## 1.2.10

### Patch Changes

- Add display:flex to Carousel slides for even-height tiles; add showCheckbox prop to IngredientRow

- Updated dependencies []:
  - @groxigo/contracts@1.3.3

## 1.2.5

### Patch Changes

- Visual QA fixes: compact forms (sm inputs/buttons), spacing fixes, and component polish

  - **Select**: Fix text clipping by removing vertical padding, added box-sizing: border-box
  - **AuthCard**: Capital G brand name, compact sm inputs/buttons, tighter padding
  - **AddressForm**: Use Input built-in label prop, sm sizing, wider max-width
  - **DeliverySlotPicker**: Responsive date chips (flex instead of fixed 56px)
  - **VariantSelector**: Stacked label+price layout, disabled support, built-in label
  - **PointsCard**: Fix progress bar color collision on brand-primary background
  - **BillDetails**: Gap between label and amount, label wraps for long text
  - **CartItem**: Added horizontal padding
  - **AccordionSection**: Added horizontal padding to header and content
  - **AccountMenuItem**: Added horizontal padding
  - **PreferencesCard**: Min-height and overflow fixes for clipped text
  - **OnboardingStep**: Removed (mobile-only component)
  - **PriceDisplay**: Removed IndianRupees story
  - **CSS audit**: 68/68 files DESIGN_RULES compliant (token vars, no hardcoded values)
  - **TypeScript audit**: 73/73 files compliant (no React. namespace usage)

- Updated dependencies []:
  - @groxigo/ui-elements-web@1.2.5
  - @groxigo/contracts@1.3.1

## 1.2.4

### Patch Changes

- Platform-agnostic contracts: removed className from all PropsBase interfaces, renamed onClick to onPress, added 6 new component contracts (carousel, grid, sticky-bottom-bar, floating-cart-button, product-image-carousel, variant-selector), replaced RefObject<any> with RefObject<unknown>, added missing @default JSDoc annotations, and improved lottie style typing. Web implementations updated to add className locally and cast focus refs to HTMLElement.

- Updated dependencies []:
  - @groxigo/contracts@1.3.0
  - @groxigo/ui-elements-web@1.2.3

## 1.2.2

### Patch Changes

- Optimize package sizes: remove src from published files, disable declaration maps, exclude generators from tokens, fix exports to point to dist

- Updated dependencies []:
  - @groxigo/icons@1.0.1
  - @groxigo/contracts@1.2.2
  - @groxigo/tokens@1.0.2
  - @groxigo/ui-elements-web@1.2.2

## 1.2.1

### Patch Changes

- ProductTile: inline quantity stepper overlay on image when item is in cart
  PaymentMethodCard: add delete button with onDelete callback
  AuthCard: auto-check email on mount when initialEmail is provided
  AddressCard: wire standalone checked prop to Radio
  DeliverySlotPicker: fix padding, overflow, and selected slot text color
  StoryAvatar: allow 2-line names, larger avatar on desktop (1200px+)

## 1.2.0

### Minor Changes

- Add 6 landing page components (LandingHeader, HeroSection, PillarCard, LandingCuisineCard, StepCard, TrustStat) and 4 new SDUI section types (HeroSection, StepSection, PillarSection, TrustBarSection)

### Patch Changes

- Updated dependencies []:
  - @groxigo/contracts@1.2.0

## 1.1.0

### Minor Changes

- Replace Tailwind with CSS Modules across all ui-elements-web and components-web components. Fix 7 DESIGN_RULES violations (focus ring, disabled states, semantic tokens, z-index layering). Add 65 composite component contracts and CSS module implementations.

### Patch Changes

- Updated dependencies []:
  - @groxigo/ui-elements-web@1.1.0
  - @groxigo/contracts@1.0.1

## 1.0.3

### Patch Changes

- [`fc1e44c`](https://github.com/groxigo/groxigo-libs/commit/fc1e44c7304f63b31f14233d84e35f4d392b04cf) Thanks [@groxigo](https://github.com/groxigo)! - Sync tokens with Figma Foundations and DESIGN_RULES compliance:
  - letterSpacing: tight=-0.025, wide=0.025 (DESIGN_RULES section 25)
  - Remove lineHeight.relaxed, add spacing[18]=72, remove spacing[3.5]=14
  - Add opacity[5]=0.05, opacity[15]=0.15
  - Per-element system font scale caps (DESIGN_RULES section 34): body 2.0x, heading 1.5x, label 1.3x
- Updated dependencies [[`fc1e44c`](https://github.com/groxigo/groxigo-libs/commit/fc1e44c7304f63b31f14233d84e35f4d392b04cf)]:
  - @groxigo/tokens@1.0.1
  - @groxigo/ui-elements-web@1.0.1

## 1.0.0

### Major Changes

- Initial release of Groxigo Components for Web
- 30 web composite components
- API parity with @groxigo/components
- Storybook stories included
