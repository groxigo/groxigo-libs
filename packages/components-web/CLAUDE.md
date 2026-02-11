# Components Web — Development Rules

> Shared standards: `../../CLAUDE.md` → "Component TypeScript Standards (All Platforms)"
> Web standards: `../../CLAUDE.md` → "Web Platform Standards"
> Visual rules: `groxigo-designer/rules/DESIGN_RULES.md` (§4 grid, §13 radius, §22 states, §24 colors, §26 spacing)

## Critical Rules
1. **Imports:** `import { forwardRef, type ReactNode } from 'react'` — never `import React`
2. **No React.FC** — use `forwardRef<HTMLElement, Props>` always
3. **CSS Modules only** — no inline `CSSProperties`, no `style` prop in interfaces
4. **Props:** `string` for text-only props (label, title, placeholder), `ReactNode` for containers/slots/icons
5. **Compose from ui-elements** — never duplicate primitives from `@groxigo/ui-elements-web`
6. **Storybook required** — every component needs a `.stories.tsx` file
7. **Contract-first:** All props extend `*PropsBase` from `@groxigo/contracts`
8. **DESIGN_RULES:** Semantic tokens only, 4pt grid spacing, §13 radius per context, §22 state matrix
