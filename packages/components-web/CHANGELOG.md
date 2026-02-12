# @groxigo/components-web

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
