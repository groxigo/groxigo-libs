# UI Elements (React Native) — Development Rules

> Shared standards: `../../CLAUDE.md` → "Component TypeScript Standards (All Platforms)"
> Mobile standards: `../../CLAUDE.md` → "Mobile Platform Standards"
> Visual rules: `groxigo-designer/rules/DESIGN_RULES.md` (§4 grid, §13 radius, §22 states, §24 colors, §26 spacing)

## Critical Rules
1. **Imports:** `import { forwardRef, type ReactNode } from 'react'` — never `import React`
2. **No React.FC** — use explicit props typing
3. **StyleSheet only** — `StyleSheet.create()`, never inline style objects
4. **Props:** `string` for text-only props, `ReactNode` for containers/slots/icons
5. **Types in separate file:** `Foo.types.ts` for prop interfaces
6. **Contract-first:** All props extend `*PropsBase` from `@groxigo/contracts`
7. **Tokens:** Import from `@groxigo/tokens` (JS values) — never `/web`
8. **Responsive:** Use `useDeviceType()` for `fontSize()`, `uiSize()`, `spacing()`
9. **DESIGN_RULES:** Semantic theme tokens only, 4pt grid, §13 radius per context, §22 state matrix
