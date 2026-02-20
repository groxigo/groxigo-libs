# @groxigo/contracts

## 1.3.6

### Patch Changes

- Progressive enhancement glass effect across Drawer, Tooltip, Menu, StickyBottomBar, ProductListModal, ProductTile, CategoryChip. 3-tier pattern: semi-transparent base, @supports backdrop-filter blur, prefers-reduced-transparency opaque fallback. New carousel/product contracts. i18n message updates for te, ta, kn, ml, gu.

## 1.3.5

### Patch Changes

- Add onContinueAsGuest and guestLabel props to HeroSection for guest browsing

## 1.3.4

### Patch Changes

- Add imageUrl prop to CategoryChip, add 'use client' to all web elements, mobile cleanup

## 1.3.3

### Patch Changes

- Add display:flex to Carousel slides for even-height tiles; add showCheckbox prop to IngredientRow

## 1.3.1

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

## 1.3.0

### Minor Changes

- Platform-agnostic contracts: removed className from all PropsBase interfaces, renamed onClick to onPress, added 6 new component contracts (carousel, grid, sticky-bottom-bar, floating-cart-button, product-image-carousel, variant-selector), replaced RefObject<any> with RefObject<unknown>, added missing @default JSDoc annotations, and improved lottie style typing. Web implementations updated to add className locally and cast focus refs to HTMLElement.

## 1.2.2

### Patch Changes

- Optimize package sizes: remove src from published files, disable declaration maps, exclude generators from tokens, fix exports to point to dist

## 1.2.1

### Patch Changes

- Add onDelete callback to PaymentMethodCardPropsBase contract

## 1.2.0

### Minor Changes

- Add 6 landing page components (LandingHeader, HeroSection, PillarCard, LandingCuisineCard, StepCard, TrustStat) and 4 new SDUI section types (HeroSection, StepSection, PillarSection, TrustBarSection)

## 1.1.0

### Minor Changes

- Contracts: Simplify element contracts, add Button xs/xl sizes per DESIGN_RULES §5, add 65 composite component contracts.

  ui-elements-web: Production readiness — all 22 components extend contract base interfaces, a11y improvements (Modal aria-labelledby, Tooltip conditional tabIndex, Switch readOnly, TabPanel focus management), removed stale props, added 24 test files (373 tests), added 14 Storybook stories.

## 1.0.1

### Patch Changes

- Replace Tailwind with CSS Modules across all ui-elements-web and components-web components. Fix 7 DESIGN_RULES violations (focus ring, disabled states, semantic tokens, z-index layering). Add 65 composite component contracts and CSS module implementations.

## 1.0.0

### Major Changes

- Initial release of Groxigo Component Contracts
- TypeScript interfaces for all element and composite components
- Cross-platform consistency contracts
