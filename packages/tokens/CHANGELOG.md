# @groxigo/tokens

## 1.1.2

### Patch Changes

- Align foundation package conventions: engine >=18, typescript ~5.9.2 (tilde), access: public in publishConfig, tsconfig.build.json for i18n

## 1.1.0

### Minor Changes

- Production readiness release for @groxigo/tokens

  **New tokens:**

  - Layout tokens (§27): page/content/narrow max-widths, sidebar width, screen margins, grid gutters
  - Chart colors (§36): categorical (10), sequential (9), diverging (5), neutral
  - Container query breakpoints (§27): compact (480px), expanded (768px)
  - Toast dismiss durations (§10/§30): 4000ms default, 6000ms warning

  **New CSS variables (65+):**

  - Z-index scale (§9): `--z-index-dropdown` through `--z-index-toast` (12 vars)
  - Layout: `--layout-page-max-width`, `--layout-sidebar-width`, screen margins, grid gutters
  - Navigation: `--nav-header-height`, `--nav-tab-bar-height`
  - Touch targets: `--touch-target-ios` (44px), `--touch-target-android` (48px)
  - Opacity: `--opacity-0` through `--opacity-100` (13 vars)
  - Border widths: `--border-width-none` through `--border-width-heavy`
  - Focus rings: width, offset, and color vars with dark mode overrides
  - Icon sizes: `--icon-size-xs` through `--icon-size-4xl`
  - Icon strokes: `--icon-stroke-thin` through `--icon-stroke-bold`

  **DESIGN_RULES compliance fixes:**

  - D1: `--button-secondary-bg-active` CSS/JS value mismatch (§22)
  - D2: Toggle off state now uses border + white fill per §22 state matrix
  - D3: 480px container breakpoint added (§27)
  - D4: Toast durations tokenized (§10/§30)
  - D5: Chart color palette added (§36)
  - Shadow tokens aligned to single-shadow format (§23)
  - Safe area token renamed to fallback with §34 warning

  **Build improvements:**

  - Derived types from source objects (types can never drift from tokens)
  - Excluded generators from tsc build (build-time only, not shipped)
  - Removed dead root barrel re-exports
  - Added `"type": "module"` to package.json
  - Replaced `Record<string, any>` with proper type narrowing in validation
  - dist size reduced 20% (816K → 652K), 29% fewer files (76 → 54)

## 1.0.5

### Patch Changes

- Add --status-{success|warning|error|info}-active CSS variables for light and dark modes. Adds `active` property to StatusStateTokens type.

## 1.0.2

### Patch Changes

- Optimize package sizes: remove src from published files, disable declaration maps, exclude generators from tokens, fix exports to point to dist

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
