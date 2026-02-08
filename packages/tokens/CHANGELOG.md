# @groxigo/tokens

## 1.0.1

### Patch Changes

- [`fc1e44c`](https://github.com/groxigo/groxigo-libs/commit/fc1e44c7304f63b31f14233d84e35f4d392b04cf) Thanks [@groxigo](https://github.com/groxigo)! - Sync tokens with Figma Foundations and DESIGN_RULES compliance:
  - letterSpacing: tight=-0.025, wide=0.025 (DESIGN_RULES section 25)
  - Remove lineHeight.relaxed, add spacing[18]=72, remove spacing[3.5]=14
  - Add opacity[5]=0.05, opacity[15]=0.15
  - Per-element system font scale caps (DESIGN_RULES section 34): body 2.0x, heading 1.5x, label 1.3x

## 1.0.0

### Major Changes

- Initial release of Groxigo Design Tokens
- Three-tier token architecture (Primitives, Semantic, Component)
- Platform outputs: CSS, SCSS, React Native, JSON (Figma)
- Responsive typography configuration
- WCAG contrast validation utilities
- Theming system with preset themes
