/**
 * SCSS Generator
 *
 * Generates SCSS variables and mixins for design tokens.
 * Provides better developer experience with Sass features.
 */

import { tokens } from '../tokens';

/**
 * Convert camelCase to kebab-case
 */
function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Generate SCSS variables file
 */
export function generateSCSS(): string {
  const lines: string[] = [];

  lines.push('// ============================================');
  lines.push('// Groxigo Design Tokens - SCSS Variables');
  lines.push('// Auto-generated - Do not edit directly');
  lines.push('// ============================================');
  lines.push('');

  // Font import - use Google Sans Flex to match typography.ts
  lines.push("@import url('https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@300;400;500;600;700&display=swap');");
  lines.push('');

  // ============================================
  // PRIMITIVE COLORS
  // ============================================
  lines.push('// --------------------------------------------');
  lines.push('// PRIMITIVE COLORS');
  lines.push('// --------------------------------------------');
  lines.push('');

  // Color families as maps
  const colorFamilies = ['gray', 'blue', 'green', 'red', 'yellow', 'orange', 'purple', 'cyan', 'pink', 'indigo', 'teal'] as const;

  for (const family of colorFamilies) {
    const shades = tokens.colors.primitives[family];
    lines.push(`$color-${family}: (`);
    for (const [shade, value] of Object.entries(shades)) {
      lines.push(`  '${shade}': ${value},`);
    }
    lines.push(');');
    lines.push('');

    // Also create individual variables
    for (const [shade, value] of Object.entries(shades)) {
      lines.push(`$color-${family}-${shade}: ${value};`);
    }
    lines.push('');
  }

  // Absolute colors
  lines.push('// Absolute colors');
  lines.push(`$color-white: ${tokens.colors.primitives.white};`);
  lines.push(`$color-black: ${tokens.colors.primitives.black};`);
  lines.push(`$color-transparent: transparent;`);
  lines.push('');

  // ============================================
  // SEMANTIC COLORS
  // ============================================
  lines.push('// --------------------------------------------');
  lines.push('// SEMANTIC COLORS');
  lines.push('// --------------------------------------------');
  lines.push('');

  // Surface
  lines.push('// Surface');
  for (const [name, value] of Object.entries(tokens.colors.semantic.surface)) {
    lines.push(`$surface-${toKebabCase(name)}: ${value};`);
  }
  lines.push('');

  // Text
  lines.push('// Text');
  for (const [name, value] of Object.entries(tokens.colors.semantic.text)) {
    lines.push(`$text-${toKebabCase(name)}: ${value};`);
  }
  lines.push('');

  // Border
  lines.push('// Border');
  for (const [name, value] of Object.entries(tokens.colors.semantic.border)) {
    lines.push(`$border-${toKebabCase(name)}: ${value};`);
  }
  lines.push('');

  // Brand
  lines.push('// Brand');
  for (const [type, states] of Object.entries(tokens.colors.semantic.brand)) {
    for (const [state, value] of Object.entries(states as Record<string, string>)) {
      lines.push(`$brand-${type}-${toKebabCase(state)}: ${value};`);
    }
  }
  lines.push('');

  // Status
  lines.push('// Status');
  for (const [status, states] of Object.entries(tokens.colors.semantic.status)) {
    for (const [state, value] of Object.entries(states as Record<string, string>)) {
      lines.push(`$status-${status}-${toKebabCase(state)}: ${value};`);
    }
  }
  lines.push('');

  // ============================================
  // SPACING
  // ============================================
  lines.push('// --------------------------------------------');
  lines.push('// SPACING');
  lines.push('// --------------------------------------------');
  lines.push('');

  lines.push('$spacing: (');
  for (const [key, value] of Object.entries(tokens.spacing)) {
    lines.push(`  '${key}': ${value}px,`);
  }
  lines.push(');');
  lines.push('');

  // Spacing function
  lines.push('@function spacing($key) {');
  lines.push("  @return map-get($spacing, '#{$key}');");
  lines.push('}');
  lines.push('');

  // ============================================
  // TYPOGRAPHY
  // ============================================
  lines.push('// --------------------------------------------');
  lines.push('// TYPOGRAPHY');
  lines.push('// --------------------------------------------');
  lines.push('');

  lines.push(`$font-family-sans: ${tokens.typography.fontFamily.sans};`);
  lines.push(`$font-family-mono: ${tokens.typography.fontFamily.mono};`);
  lines.push('');

  // Font sizes
  lines.push('$font-sizes: (');
  for (const [key, value] of Object.entries(tokens.typography.fontSize)) {
    lines.push(`  '${key}': ${value}px,`);
  }
  lines.push(');');
  lines.push('');

  // Font weights
  lines.push('$font-weights: (');
  for (const [key, value] of Object.entries(tokens.typography.fontWeight)) {
    lines.push(`  '${key}': ${value},`);
  }
  lines.push(');');
  lines.push('');

  // Line heights
  lines.push('$line-heights: (');
  for (const [key, value] of Object.entries(tokens.typography.lineHeight)) {
    lines.push(`  '${key}': ${value},`);
  }
  lines.push(');');
  lines.push('');

  // ============================================
  // RADIUS
  // ============================================
  lines.push('// --------------------------------------------');
  lines.push('// BORDER RADIUS');
  lines.push('// --------------------------------------------');
  lines.push('');

  lines.push('$radius: (');
  for (const [key, value] of Object.entries(tokens.radius)) {
    lines.push(`  '${key}': ${value}px,`);
  }
  lines.push(');');
  lines.push('');

  lines.push('@function radius($key) {');
  lines.push("  @return map-get($radius, '#{$key}');");
  lines.push('}');
  lines.push('');

  // ============================================
  // SHADOWS
  // ============================================
  lines.push('// --------------------------------------------');
  lines.push('// SHADOWS');
  lines.push('// --------------------------------------------');
  lines.push('');

  for (const [key, value] of Object.entries(tokens.shadows)) {
    if (typeof value === 'string') {
      lines.push(`$shadow-${key}: ${value};`);
    } else if (typeof value === 'object') {
      for (const [subKey, subValue] of Object.entries(value)) {
        lines.push(`$shadow-${key}-${subKey}: ${subValue};`);
      }
    }
  }
  lines.push('');

  // ============================================
  // ANIMATION
  // ============================================
  lines.push('// --------------------------------------------');
  lines.push('// ANIMATION');
  lines.push('// --------------------------------------------');
  lines.push('');

  // Durations
  lines.push('$durations: (');
  for (const [key, value] of Object.entries(tokens.animation.duration)) {
    lines.push(`  '${key}': ${value}ms,`);
  }
  lines.push(');');
  lines.push('');

  // Easings
  for (const [key, value] of Object.entries(tokens.animation.easing)) {
    lines.push(`$easing-${toKebabCase(key)}: ${value};`);
  }
  lines.push('');

  // ============================================
  // MIXINS
  // ============================================
  lines.push('// --------------------------------------------');
  lines.push('// MIXINS');
  lines.push('// --------------------------------------------');
  lines.push('');

  // Button mixin
  lines.push('@mixin button-primary {');
  lines.push('  background-color: $brand-primary-default;');
  lines.push('  color: $color-white;');
  lines.push('  border: none;');
  lines.push('  border-radius: radius(md);');
  lines.push('  padding: spacing(2) spacing(4);');
  lines.push('  font-weight: map-get($font-weights, medium);');
  lines.push('  cursor: pointer;');
  lines.push('  transition: background-color map-get($durations, fast) $easing-standard;');
  lines.push('');
  lines.push('  &:hover {');
  lines.push('    background-color: $brand-primary-hover;');
  lines.push('  }');
  lines.push('');
  lines.push('  &:active {');
  lines.push('    background-color: $brand-primary-active;');
  lines.push('  }');
  lines.push('');
  lines.push('  &:disabled {');
  lines.push('    background-color: $surface-disabled;');
  lines.push('    color: $text-disabled;');
  lines.push('    cursor: not-allowed;');
  lines.push('  }');
  lines.push('}');
  lines.push('');

  // Card mixin
  lines.push('@mixin card {');
  lines.push('  background-color: $surface-primary;');
  lines.push('  border: 1px solid $border-subtle;');
  lines.push('  border-radius: radius(lg);');
  lines.push('  padding: spacing(4);');
  lines.push('  box-shadow: $shadow-sm;');
  lines.push('');
  lines.push('  &:hover {');
  lines.push('    border-color: $border-default;');
  lines.push('  }');
  lines.push('}');
  lines.push('');

  // Input mixin
  lines.push('@mixin input {');
  lines.push('  background-color: $surface-primary;');
  lines.push('  border: 1px solid $border-default;');
  lines.push('  border-radius: radius(md);');
  lines.push('  padding: spacing(2) spacing(3);');
  lines.push('  font-size: map-get($font-sizes, base);');
  lines.push('  color: $text-primary;');
  lines.push('  transition: border-color map-get($durations, fast) $easing-standard,');
  lines.push('              box-shadow map-get($durations, fast) $easing-standard;');
  lines.push('');
  lines.push('  &::placeholder {');
  lines.push('    color: $text-tertiary;');
  lines.push('  }');
  lines.push('');
  lines.push('  &:hover {');
  lines.push('    border-color: $border-strong;');
  lines.push('  }');
  lines.push('');
  lines.push('  &:focus {');
  lines.push('    outline: none;');
  lines.push('    border-color: $border-focus;');
  lines.push('    box-shadow: 0 0 0 3px $brand-primary-subtle;');
  lines.push('  }');
  lines.push('');
  lines.push('  &:disabled {');
  lines.push('    background-color: $surface-disabled;');
  lines.push('    border-color: $border-disabled;');
  lines.push('    color: $text-disabled;');
  lines.push('    cursor: not-allowed;');
  lines.push('  }');
  lines.push('}');
  lines.push('');

  // Glass effect mixin
  lines.push('@mixin glass {');
  lines.push(`  background: ${tokens.colors.semantic.glass.surface.light};`);
  lines.push(`  border: 1px solid ${tokens.colors.semantic.glass.border.default};`);
  lines.push('  backdrop-filter: blur(16px);');
  lines.push('  -webkit-backdrop-filter: blur(16px);');
  lines.push('}');
  lines.push('');

  // Dark mode mixin
  lines.push('@mixin dark-mode {');
  lines.push('  @media (prefers-color-scheme: dark) {');
  lines.push('    @content;');
  lines.push('  }');
  lines.push('');
  lines.push('  .dark & {');
  lines.push('    @content;');
  lines.push('  }');
  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

/**
 * Generate CSS Modules compatible output
 */
export function generateCSSModules(): string {
  const lines: string[] = [];

  lines.push('/* Groxigo Design Tokens - CSS Modules */');
  lines.push('/* Auto-generated - Do not edit directly */');
  lines.push('');

  // Export token values as CSS custom properties
  lines.push(':root {');

  // Colors
  const colorFamilies = ['gray', 'blue', 'green', 'red', 'yellow', 'orange', 'purple', 'cyan', 'pink', 'indigo', 'teal'] as const;
  for (const family of colorFamilies) {
    const shades = tokens.colors.primitives[family];
    for (const [shade, value] of Object.entries(shades)) {
      lines.push(`  --color-${family}-${shade}: ${value};`);
    }
  }

  // Spacing
  for (const [key, value] of Object.entries(tokens.spacing)) {
    lines.push(`  --spacing-${key}: ${value}px;`);
  }

  // Radius
  for (const [key, value] of Object.entries(tokens.radius)) {
    lines.push(`  --radius-${key}: ${value}px;`);
  }

  lines.push('}');
  lines.push('');

  // Utility classes
  lines.push('/* Utility Classes */');
  lines.push('');

  // Text colors
  lines.push('.text-primary { color: var(--text-primary); }');
  lines.push('.text-secondary { color: var(--text-secondary); }');
  lines.push('.text-tertiary { color: var(--text-tertiary); }');
  lines.push('.text-disabled { color: var(--text-disabled); }');
  lines.push('');

  // Background colors
  lines.push('.bg-surface-primary { background-color: var(--surface-primary); }');
  lines.push('.bg-surface-secondary { background-color: var(--surface-secondary); }');
  lines.push('.bg-surface-tertiary { background-color: var(--surface-tertiary); }');
  lines.push('');

  // Border radius
  for (const key of Object.keys(tokens.radius)) {
    lines.push(`.rounded-${key} { border-radius: var(--radius-${key}); }`);
  }
  lines.push('');

  return lines.join('\n');
}
