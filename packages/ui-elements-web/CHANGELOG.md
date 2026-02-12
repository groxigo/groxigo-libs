# @groxigo/ui-elements-web

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
