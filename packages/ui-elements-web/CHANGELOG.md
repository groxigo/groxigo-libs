# @groxigo/ui-elements-web

## 1.2.7

### Patch Changes

- Progressive enhancement glass effect across Drawer, Tooltip, Menu, StickyBottomBar, ProductListModal, ProductTile, CategoryChip. 3-tier pattern: semi-transparent base, @supports backdrop-filter blur, prefers-reduced-transparency opaque fallback. New carousel/product contracts. i18n message updates for te, ta, kn, ml, gu.

- Updated dependencies []:
  - @groxigo/contracts@1.3.6

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
  - @groxigo/contracts@1.3.1

## 1.2.4

### Patch Changes

- Replace all primitive color tokens with semantic tokens in Button and Badge CSS. Remove `style` prop from Card component (use `className` instead). Full DESIGN_RULES §24 compliance.

- Updated dependencies []:
  - @groxigo/tokens@1.0.5

## 1.2.3

### Patch Changes

- Platform-agnostic contracts: removed className from all PropsBase interfaces, renamed onClick to onPress, added 6 new component contracts (carousel, grid, sticky-bottom-bar, floating-cart-button, product-image-carousel, variant-selector), replaced RefObject<any> with RefObject<unknown>, added missing @default JSDoc annotations, and improved lottie style typing. Web implementations updated to add className locally and cast focus refs to HTMLElement.

- Updated dependencies []:
  - @groxigo/contracts@1.3.0

## 1.2.2

### Patch Changes

- Optimize package sizes: remove src from published files, disable declaration maps, exclude generators from tokens, fix exports to point to dist

- Updated dependencies []:
  - @groxigo/contracts@1.2.2
  - @groxigo/tokens@1.0.2

## 1.2.1

### Patch Changes

- Add standalone checked prop to Radio for use outside RadioGroup

## 1.2.0

### Minor Changes

- Contracts: Simplify element contracts, add Button xs/xl sizes per DESIGN_RULES §5, add 65 composite component contracts.

  ui-elements-web: Production readiness — all 22 components extend contract base interfaces, a11y improvements (Modal aria-labelledby, Tooltip conditional tabIndex, Switch readOnly, TabPanel focus management), removed stale props, added 24 test files (373 tests), added 14 Storybook stories.

### Patch Changes

- Updated dependencies []:
  - @groxigo/contracts@1.1.0

## 1.1.0

### Minor Changes

- Replace Tailwind with CSS Modules across all ui-elements-web and components-web components. Fix 7 DESIGN_RULES violations (focus ring, disabled states, semantic tokens, z-index layering). Add 65 composite component contracts and CSS module implementations.

### Patch Changes

- Updated dependencies []:
  - @groxigo/contracts@1.0.1

## 1.0.1

### Patch Changes

- [`fc1e44c`](https://github.com/groxigo/groxigo-libs/commit/fc1e44c7304f63b31f14233d84e35f4d392b04cf) Thanks [@groxigo](https://github.com/groxigo)! - Sync tokens with Figma Foundations and DESIGN_RULES compliance:
  - letterSpacing: tight=-0.025, wide=0.025 (DESIGN_RULES section 25)
  - Remove lineHeight.relaxed, add spacing[18]=72, remove spacing[3.5]=14
  - Add opacity[5]=0.05, opacity[15]=0.15
  - Per-element system font scale caps (DESIGN_RULES section 34): body 2.0x, heading 1.5x, label 1.3x
- Updated dependencies [[`fc1e44c`](https://github.com/groxigo/groxigo-libs/commit/fc1e44c7304f63b31f14233d84e35f4d392b04cf)]:
  - @groxigo/tokens@1.0.1
  - @groxigo/ui-core@1.0.1

## 1.0.0

### Major Changes

- Initial release of Groxigo UI Elements for Web
- 22 web components with Tailwind CSS
- API parity with @groxigo/ui-elements
