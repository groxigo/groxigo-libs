# UI Elements Web — Development Rules

> Full standards: see `../../CLAUDE.md` → "Web Component TypeScript Standards"

## Critical Rules
1. **Imports:** `import { forwardRef, type ReactNode } from 'react'` — never `import React`
2. **No React.FC** — use `forwardRef<HTMLElement, Props>` always
3. **CSS Modules only** — no inline `CSSProperties`, no `style` prop in interfaces
4. **Props:** `string` for text-only props (label, title, placeholder), `ReactNode` for containers/slots/icons
5. **forwardRef + displayName** required on every component
6. **Contract-first:** All props extend `*PropsBase` from `@groxigo/contracts`
7. **Tokens:** Import from `@groxigo/tokens/web` — never `/react-native`
