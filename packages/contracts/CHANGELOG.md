# @groxigo/contracts

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
