/**
 * CSS Generator
 *
 * Generates CSS custom properties (variables) from token source files.
 * Follows the three-tier architecture: Primitives → Semantic → Components
 *
 * Uses CSS clamp() for fluid responsive scaling between 375px and 1440px
 * viewports, replacing the old media-query breakpoint system.
 */

import { tokens } from '../tokens';
import { fluidConfig } from '../tokens/responsive';

/**
 * Generate CSS variables for primitive colors
 */
function generatePrimitives(): string {
  const lines: string[] = [];
  const primitives = tokens.colors.primitives;

  lines.push('  /* ============================================');
  lines.push('     TIER 1: PRIMITIVES - Foundation Colors');
  lines.push('     ============================================ */');
  lines.push('');

  // Absolute colors
  lines.push('  /* Absolute */');
  lines.push(`  --color-white: ${primitives.white};`);
  lines.push(`  --color-black: ${primitives.black};`);
  lines.push(`  --color-transparent: ${primitives.transparent};`);
  lines.push('');

  // Color families
  const colorFamilies = ['gray', 'blue', 'green', 'red', 'yellow', 'orange', 'purple', 'cyan', 'pink', 'indigo', 'teal'] as const;

  for (const family of colorFamilies) {
    const colorFamily = primitives[family];
    if (!colorFamily) continue;

    const label = family.charAt(0).toUpperCase() + family.slice(1);
    lines.push(`  /* ${label} */`);

    for (const [shade, value] of Object.entries(colorFamily)) {
      lines.push(`  --color-${family}-${shade}: ${value};`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Generate CSS variables for semantic tokens (light mode)
 */
function generateSemantic(): string {
  const lines: string[] = [];
  const semantic = tokens.colors.semantic;

  lines.push('  /* ============================================');
  lines.push('     TIER 2: SEMANTIC - Meaningful Names');
  lines.push('     ============================================ */');
  lines.push('');

  // Surface
  lines.push('  /* Surfaces */');
  lines.push(`  --surface-primary: ${semantic.surface.primary};`);
  lines.push(`  --surface-secondary: var(--color-gray-50);`);
  lines.push(`  --surface-tertiary: var(--color-gray-100);`);
  lines.push(`  --surface-elevated: ${semantic.surface.elevated};`);
  lines.push(`  --surface-sunken: var(--color-gray-100);`);
  lines.push(`  --surface-disabled: var(--color-gray-100);`);
  lines.push('');

  // Text
  lines.push('  /* Text */');
  lines.push(`  --text-primary: var(--color-gray-900);`);
  lines.push(`  --text-secondary: var(--color-gray-600);`);
  lines.push(`  --text-tertiary: var(--color-gray-500);`);
  lines.push(`  --text-disabled: var(--color-gray-400);`);
  lines.push(`  --text-inverse: var(--color-white);`);
  lines.push(`  --text-link: var(--color-blue-600);`);
  lines.push(`  --text-link-hover: var(--color-blue-700);`);
  lines.push('');

  // Border
  lines.push('  /* Borders */');
  lines.push(`  --border-subtle: var(--color-gray-200);`);
  lines.push(`  --border-default: var(--color-gray-300);`);
  lines.push(`  --border-strong: var(--color-gray-400);`);
  lines.push(`  --border-focus: var(--color-blue-500);`);
  lines.push(`  --border-disabled: var(--color-gray-200);`);
  lines.push('');

  // Brand
  lines.push('  /* Brand - Primary */');
  lines.push(`  --brand-primary: var(--color-blue-600);`);
  lines.push(`  --brand-primary-hover: var(--color-blue-700);`);
  lines.push(`  --brand-primary-active: var(--color-blue-800);`);
  lines.push(`  --brand-primary-subtle: var(--color-blue-50);`);
  lines.push(`  --brand-primary-muted: var(--color-blue-100);`);
  lines.push('');
  lines.push('  /* Brand - Secondary */');
  lines.push(`  --brand-secondary: var(--color-purple-600);`);
  lines.push(`  --brand-secondary-hover: var(--color-purple-700);`);
  lines.push(`  --brand-secondary-active: var(--color-purple-800);`);
  lines.push(`  --brand-secondary-subtle: var(--color-purple-50);`);
  lines.push(`  --brand-secondary-muted: var(--color-purple-100);`);
  lines.push('');
  lines.push('  /* Brand - Accent */');
  lines.push(`  --brand-accent: var(--color-cyan-600);`);
  lines.push(`  --brand-accent-hover: var(--color-cyan-700);`);
  lines.push(`  --brand-accent-active: var(--color-cyan-800);`);
  lines.push(`  --brand-accent-subtle: var(--color-cyan-50);`);
  lines.push(`  --brand-accent-muted: var(--color-cyan-100);`);
  lines.push('');

  // Status
  lines.push('  /* Status - Success */');
  lines.push(`  --status-success: var(--color-green-600);`);
  lines.push(`  --status-success-hover: var(--color-green-700);`);
  lines.push(`  --status-success-subtle: var(--color-green-50);`);
  lines.push(`  --status-success-muted: var(--color-green-100);`);
  lines.push(`  --status-success-text: var(--color-green-700);`);
  lines.push('');
  lines.push('  /* Status - Warning */');
  lines.push(`  --status-warning: var(--color-yellow-500);`);
  lines.push(`  --status-warning-hover: var(--color-yellow-600);`);
  lines.push(`  --status-warning-subtle: var(--color-yellow-50);`);
  lines.push(`  --status-warning-muted: var(--color-yellow-100);`);
  lines.push(`  --status-warning-text: var(--color-yellow-700);`);
  lines.push('');
  lines.push('  /* Status - Error */');
  lines.push(`  --status-error: var(--color-red-600);`);
  lines.push(`  --status-error-hover: var(--color-red-700);`);
  lines.push(`  --status-error-subtle: var(--color-red-50);`);
  lines.push(`  --status-error-muted: var(--color-red-100);`);
  lines.push(`  --status-error-text: var(--color-red-700);`);
  lines.push('');
  lines.push('  /* Status - Info */');
  lines.push(`  --status-info: var(--color-blue-500);`);
  lines.push(`  --status-info-hover: var(--color-blue-600);`);
  lines.push(`  --status-info-subtle: var(--color-blue-50);`);
  lines.push(`  --status-info-muted: var(--color-blue-100);`);
  lines.push(`  --status-info-text: var(--color-blue-700);`);
  lines.push('');

  // Interactive
  lines.push('  /* Interactive States */');
  lines.push(`  --interactive-default: var(--color-gray-600);`);
  lines.push(`  --interactive-hover: var(--color-gray-700);`);
  lines.push(`  --interactive-active: var(--color-gray-800);`);
  lines.push(`  --interactive-disabled: var(--color-gray-400);`);
  lines.push(`  --interactive-focus: var(--color-blue-500);`);
  lines.push('');

  // Overlay
  lines.push('  /* Overlays */');
  lines.push(`  --overlay-light: ${semantic.overlay.light};`);
  lines.push(`  --overlay-medium: ${semantic.overlay.medium};`);
  lines.push(`  --overlay-dark: ${semantic.overlay.dark};`);
  lines.push(`  --overlay-heavy: ${semantic.overlay.heavy};`);
  lines.push('');

  // Glass
  lines.push('  /* Glass Surfaces */');
  lines.push(`  --glass-surface-light: ${semantic.glass.surface.light};`);
  lines.push(`  --glass-surface-medium: ${semantic.glass.surface.medium};`);
  lines.push(`  --glass-surface-heavy: ${semantic.glass.surface.heavy};`);
  lines.push(`  --glass-surface-dark: ${semantic.glass.surface.dark};`);
  lines.push('');
  lines.push('  /* Glass Borders */');
  lines.push(`  --glass-border-light: ${semantic.glass.border.light};`);
  lines.push(`  --glass-border-default: ${semantic.glass.border.default};`);
  lines.push(`  --glass-border-subtle: ${semantic.glass.border.subtle};`);

  return lines.join('\n');
}

/**
 * Generate CSS variables for component tokens (light mode)
 */
function generateComponents(): string {
  const lines: string[] = [];

  lines.push('  /* ============================================');
  lines.push('     TIER 3: COMPONENTS - UI Element Tokens');
  lines.push('     ============================================ */');
  lines.push('');

  // Button
  lines.push('  /* Button - Primary */');
  lines.push(`  --button-primary-bg: var(--brand-primary);`);
  lines.push(`  --button-primary-bg-hover: var(--brand-primary-hover);`);
  lines.push(`  --button-primary-bg-active: var(--brand-primary-active);`);
  lines.push(`  --button-primary-bg-disabled: var(--surface-disabled);`);
  lines.push(`  --button-primary-text: var(--text-inverse);`);
  lines.push(`  --button-primary-text-disabled: var(--text-disabled);`);
  lines.push('');
  lines.push('  /* Button - Secondary */');
  lines.push(`  --button-secondary-bg: var(--surface-secondary);`);
  lines.push(`  --button-secondary-bg-hover: var(--surface-tertiary);`);
  lines.push(`  --button-secondary-text: var(--text-primary);`);
  lines.push(`  --button-secondary-border: var(--border-default);`);
  lines.push('');
  lines.push('  /* Button - Outline */');
  lines.push(`  --button-outline-bg: transparent;`);
  lines.push(`  --button-outline-bg-hover: var(--brand-primary-subtle);`);
  lines.push(`  --button-outline-text: var(--brand-primary);`);
  lines.push(`  --button-outline-border: var(--brand-primary);`);
  lines.push(`  --button-outline-border-disabled: var(--border-disabled);`);
  lines.push(`  --button-outline-text-disabled: var(--text-disabled);`);
  lines.push('');
  lines.push('  /* Button - Ghost */');
  lines.push(`  --button-ghost-bg: transparent;`);
  lines.push(`  --button-ghost-bg-hover: var(--surface-secondary);`);
  lines.push(`  --button-ghost-text: var(--text-primary);`);
  lines.push(`  --button-ghost-text-disabled: var(--text-disabled);`);
  lines.push('');
  lines.push('  /* Button - Danger */');
  lines.push(`  --button-danger-bg: var(--status-error);`);
  lines.push(`  --button-danger-bg-hover: var(--status-error-hover);`);
  lines.push(`  --button-danger-text: var(--text-inverse);`);
  lines.push('');

  // Input
  lines.push('  /* Input */');
  lines.push(`  --input-bg: var(--surface-primary);`);
  lines.push(`  --input-bg-disabled: var(--surface-disabled);`);
  lines.push(`  --input-text: var(--text-primary);`);
  lines.push(`  --input-text-disabled: var(--text-disabled);`);
  lines.push(`  --input-placeholder: var(--text-tertiary);`);
  lines.push(`  --input-border: var(--border-default);`);
  lines.push(`  --input-border-hover: var(--border-strong);`);
  lines.push(`  --input-border-focus: var(--border-focus);`);
  lines.push(`  --input-border-error: var(--status-error);`);
  lines.push(`  --input-border-disabled: var(--border-disabled);`);
  lines.push('');

  // Card
  lines.push('  /* Card */');
  lines.push(`  --card-bg: var(--surface-primary);`);
  lines.push(`  --card-border: var(--border-subtle);`);
  lines.push(`  --card-border-hover: var(--border-default);`);
  lines.push(`  --card-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);`);
  lines.push(`  --card-shadow-hover: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);`);
  lines.push('');

  // Badge
  lines.push('  /* Badge */');
  lines.push(`  --badge-default-bg: var(--surface-tertiary);`);
  lines.push(`  --badge-default-text: var(--text-secondary);`);
  lines.push(`  --badge-primary-bg: var(--brand-primary-subtle);`);
  lines.push(`  --badge-primary-text: var(--brand-primary);`);
  lines.push(`  --badge-secondary-bg: var(--brand-secondary-subtle);`);
  lines.push(`  --badge-secondary-text: var(--brand-secondary);`);
  lines.push(`  --badge-success-bg: var(--status-success-subtle);`);
  lines.push(`  --badge-success-text: var(--status-success-text);`);
  lines.push(`  --badge-warning-bg: var(--status-warning-subtle);`);
  lines.push(`  --badge-warning-text: var(--status-warning-text);`);
  lines.push(`  --badge-error-bg: var(--status-error-subtle);`);
  lines.push(`  --badge-error-text: var(--status-error-text);`);
  lines.push(`  --badge-info-bg: var(--status-info-subtle);`);
  lines.push(`  --badge-info-text: var(--status-info-text);`);
  lines.push('');

  // Modal
  lines.push('  /* Modal */');
  lines.push(`  --modal-bg: var(--surface-primary);`);
  lines.push(`  --modal-border: var(--border-subtle);`);
  lines.push(`  --modal-overlay: var(--overlay-dark);`);
  lines.push(`  --modal-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);`);
  lines.push('');

  // Tooltip
  lines.push('  /* Tooltip */');
  lines.push(`  --tooltip-bg: var(--color-gray-900);`);
  lines.push(`  --tooltip-text: var(--color-white);`);
  lines.push(`  --tooltip-border: var(--color-gray-800);`);
  lines.push('');

  // Navigation
  lines.push('  /* Navigation */');
  lines.push(`  --nav-bg: var(--surface-primary);`);
  lines.push(`  --nav-bg-hover: var(--surface-secondary);`);
  lines.push(`  --nav-bg-active: var(--brand-primary-subtle);`);
  lines.push(`  --nav-text: var(--text-secondary);`);
  lines.push(`  --nav-text-hover: var(--text-primary);`);
  lines.push(`  --nav-text-active: var(--brand-primary);`);
  lines.push(`  --nav-border: var(--border-subtle);`);
  lines.push('');

  // Tab
  lines.push('  /* Tab */');
  lines.push(`  --tab-bg: transparent;`);
  lines.push(`  --tab-bg-hover: var(--surface-secondary);`);
  lines.push(`  --tab-bg-active: var(--surface-primary);`);
  lines.push(`  --tab-text: var(--text-secondary);`);
  lines.push(`  --tab-text-hover: var(--text-primary);`);
  lines.push(`  --tab-text-active: var(--brand-primary);`);
  lines.push(`  --tab-border: var(--border-subtle);`);
  lines.push(`  --tab-border-active: var(--brand-primary);`);
  lines.push('');

  // Toggle
  lines.push('  /* Toggle/Switch */');
  lines.push(`  --toggle-bg-off: var(--surface-tertiary);`);
  lines.push(`  --toggle-bg-on: var(--brand-primary);`);
  lines.push(`  --toggle-bg-disabled: var(--surface-disabled);`);
  lines.push(`  --toggle-thumb: var(--color-white);`);
  lines.push(`  --toggle-thumb-disabled: var(--color-gray-300);`);
  lines.push('');

  // Avatar
  lines.push('  /* Avatar */');
  lines.push(`  --avatar-bg: var(--surface-tertiary);`);
  lines.push(`  --avatar-text: var(--text-secondary);`);
  lines.push(`  --avatar-border: var(--border-subtle);`);
  lines.push('');

  // Divider
  lines.push('  /* Divider */');
  lines.push(`  --divider-default: var(--border-subtle);`);
  lines.push(`  --divider-strong: var(--border-default);`);
  lines.push('');

  // Skeleton
  lines.push('  /* Skeleton */');
  lines.push(`  --skeleton-bg: var(--surface-tertiary);`);
  lines.push(`  --skeleton-shimmer: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);`);
  lines.push('');

  // Progress
  lines.push('  /* Progress */');
  lines.push(`  --progress-bg: var(--surface-tertiary);`);
  lines.push(`  --progress-fill: var(--brand-primary);`);
  lines.push(`  --progress-fill-success: var(--status-success);`);
  lines.push(`  --progress-fill-warning: var(--status-warning);`);
  lines.push(`  --progress-fill-error: var(--status-error);`);
  lines.push('');

  // Alert
  lines.push('  /* Alert */');
  lines.push(`  --alert-success-bg: var(--status-success-subtle);`);
  lines.push(`  --alert-success-border: var(--status-success-muted);`);
  lines.push(`  --alert-success-text: var(--status-success-text);`);
  lines.push(`  --alert-warning-bg: var(--status-warning-subtle);`);
  lines.push(`  --alert-warning-border: var(--status-warning-muted);`);
  lines.push(`  --alert-warning-text: var(--status-warning-text);`);
  lines.push(`  --alert-error-bg: var(--status-error-subtle);`);
  lines.push(`  --alert-error-border: var(--status-error-muted);`);
  lines.push(`  --alert-error-text: var(--status-error-text);`);
  lines.push(`  --alert-info-bg: var(--status-info-subtle);`);
  lines.push(`  --alert-info-border: var(--status-info-muted);`);
  lines.push(`  --alert-info-text: var(--status-info-text);`);
  lines.push('');

  // Glass components
  lines.push('  /* Glass Card */');
  lines.push(`  --glass-card-bg: var(--glass-surface-light);`);
  lines.push(`  --glass-card-border: var(--glass-border-default);`);
  lines.push(`  --glass-card-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);`);
  lines.push('');
  lines.push('  /* Glass Button */');
  lines.push(`  --glass-button-bg: var(--glass-surface-light);`);
  lines.push(`  --glass-button-bg-hover: var(--glass-surface-medium);`);
  lines.push(`  --glass-button-border: var(--glass-border-light);`);
  lines.push(`  --glass-button-text: var(--text-primary);`);
  lines.push('');
  lines.push('  /* Glass Nav */');
  lines.push(`  --glass-nav-bg: var(--glass-surface-light);`);
  lines.push(`  --glass-nav-border: var(--glass-border-subtle);`);

  return lines.join('\n');
}

/**
 * Generate animation tokens
 */
function generateAnimationTokens(): string {
  const lines: string[] = [];
  const anim = tokens.animation;

  lines.push('  /* ============================================');
  lines.push('     ANIMATION TOKENS');
  lines.push('     ============================================ */');
  lines.push('');

  // Duration
  lines.push('  /* Duration */');
  lines.push(`  --duration-instant: ${anim.duration.instant}ms;`);
  lines.push(`  --duration-fast: ${anim.duration.fast}ms;`);
  lines.push(`  --duration-normal: ${anim.duration.normal}ms;`);
  lines.push(`  --duration-moderate: ${anim.duration.moderate}ms;`);
  lines.push(`  --duration-slow: ${anim.duration.slow}ms;`);
  lines.push(`  --duration-slower: ${anim.duration.slower}ms;`);
  lines.push(`  --duration-deliberate: ${anim.duration.deliberate}ms;`);
  lines.push('');

  // Easing
  lines.push('  /* Easing */');
  lines.push(`  --easing-linear: ${anim.easing.linear};`);
  lines.push(`  --easing-ease: ${anim.easing.ease};`);
  lines.push(`  --easing-ease-in: ${anim.easing.easeIn};`);
  lines.push(`  --easing-ease-out: ${anim.easing.easeOut};`);
  lines.push(`  --easing-ease-in-out: ${anim.easing.easeInOut};`);
  lines.push(`  --easing-standard: ${anim.easing.standard};`);
  lines.push(`  --easing-emphasized: ${anim.easing.emphasized};`);
  lines.push(`  --easing-decelerate: ${anim.easing.decelerate};`);
  lines.push(`  --easing-accelerate: ${anim.easing.accelerate};`);
  lines.push(`  --easing-bounce: ${anim.easing.bounce};`);
  lines.push(`  --easing-elastic: ${anim.easing.elastic};`);
  lines.push(`  --easing-ios-spring: ${anim.easing.iosSpring};`);
  lines.push('');

  // Transitions
  lines.push('  /* Transitions */');
  lines.push(`  --transition-none: ${anim.transition.none};`);
  lines.push(`  --transition-all: ${anim.transition.all};`);
  lines.push(`  --transition-all-fast: ${anim.transition.allFast};`);
  lines.push(`  --transition-all-slow: ${anim.transition.allSlow};`);
  lines.push(`  --transition-colors: ${anim.transition.colors};`);
  lines.push(`  --transition-opacity: ${anim.transition.opacity};`);
  lines.push(`  --transition-transform: ${anim.transition.transform};`);
  lines.push(`  --transition-shadow: ${anim.transition.shadow};`);
  lines.push(`  --transition-button: ${anim.transition.button};`);
  lines.push(`  --transition-card: ${anim.transition.card};`);
  lines.push(`  --transition-input: ${anim.transition.input};`);
  lines.push(`  --transition-modal: ${anim.transition.modal};`);
  lines.push(`  --transition-fade: ${anim.transition.fade};`);
  lines.push(`  --transition-slide: ${anim.transition.slide};`);
  lines.push(`  --transition-scale: ${anim.transition.scale};`);
  lines.push('');

  // Delay
  lines.push('  /* Delay */');
  lines.push(`  --delay-none: ${anim.delay.none}ms;`);
  lines.push(`  --delay-short: ${anim.delay.short}ms;`);
  lines.push(`  --delay-medium: ${anim.delay.medium}ms;`);
  lines.push(`  --delay-long: ${anim.delay.long}ms;`);
  lines.push(`  --delay-stagger: ${anim.delay.stagger}ms;`);

  return lines.join('\n');
}

/**
 * Generate spacing and typography tokens
 */
function generateLayoutTokens(): string {
  const lines: string[] = [];

  lines.push('  /* ============================================');
  lines.push('     SPACING & TYPOGRAPHY');
  lines.push('     ============================================ */');
  lines.push('');

  // Spacing
  lines.push('  /* Spacing (4px base unit) */');
  for (const [key, value] of Object.entries(tokens.spacing)) {
    lines.push(`  --spacing-${key}: ${value}px;`);
  }
  lines.push('');

  // Typography
  lines.push('  /* Font Family */');
  lines.push(`  --font-family-sans: ${tokens.typography.fontFamily.sansWeb || tokens.typography.fontFamily.sans};`);
  lines.push(`  --font-family-mono: ${tokens.typography.fontFamily.mono};`);
  lines.push('');

  lines.push('  /* Font Size */');
  for (const [key, value] of Object.entries(tokens.typography.fontSize)) {
    lines.push(`  --font-size-${key}: ${value}px;`);
  }
  lines.push('');

  lines.push('  /* Font Weight */');
  for (const [key, value] of Object.entries(tokens.typography.fontWeight)) {
    lines.push(`  --font-weight-${key}: ${value};`);
  }
  lines.push('');

  lines.push('  /* Line Height */');
  for (const [key, value] of Object.entries(tokens.typography.lineHeight)) {
    lines.push(`  --line-height-${key}: ${value};`);
  }
  lines.push('');

  // Radius
  lines.push('  /* Border Radius */');
  for (const [key, value] of Object.entries(tokens.radius)) {
    lines.push(`  --radius-${key}: ${value}px;`);
  }
  lines.push('');

  // Blur
  lines.push('  /* Blur */');
  for (const [key, value] of Object.entries(tokens.blur)) {
    lines.push(`  --blur-${key}: ${value}px;`);
  }
  lines.push('');

  // Shadows
  lines.push('  /* Shadows */');
  for (const [key, value] of Object.entries(tokens.shadows)) {
    if (typeof value === 'string') {
      lines.push(`  --shadow-${key}: ${value};`);
    } else if (typeof value === 'object') {
      for (const [subKey, subValue] of Object.entries(value)) {
        lines.push(`  --shadow-${key}-${subKey}: ${subValue};`);
      }
    }
  }

  return lines.join('\n');
}

/**
 * Generate dark mode CSS variables
 */
function generateDarkMode(): string {
  const lines: string[] = [];

  lines.push('  /* ============================================');
  lines.push('     DARK MODE OVERRIDES');
  lines.push('     ============================================ */');
  lines.push('');

  // Surfaces
  lines.push('  /* Surfaces */');
  lines.push(`  --surface-primary: var(--color-gray-900);`);
  lines.push(`  --surface-secondary: var(--color-gray-800);`);
  lines.push(`  --surface-tertiary: var(--color-gray-700);`);
  lines.push(`  --surface-elevated: var(--color-gray-800);`);
  lines.push(`  --surface-sunken: var(--color-gray-950);`);
  lines.push(`  --surface-disabled: var(--color-gray-800);`);
  lines.push('');

  // Text
  lines.push('  /* Text */');
  lines.push(`  --text-primary: var(--color-gray-50);`);
  lines.push(`  --text-secondary: var(--color-gray-300);`);
  lines.push(`  --text-tertiary: var(--color-gray-400);`);
  lines.push(`  --text-disabled: var(--color-gray-500);`);
  lines.push(`  --text-inverse: var(--color-gray-900);`);
  lines.push(`  --text-link: var(--color-blue-400);`);
  lines.push(`  --text-link-hover: var(--color-blue-300);`);
  lines.push('');

  // Borders
  lines.push('  /* Borders */');
  lines.push(`  --border-subtle: var(--color-gray-700);`);
  lines.push(`  --border-default: var(--color-gray-600);`);
  lines.push(`  --border-strong: var(--color-gray-500);`);
  lines.push(`  --border-focus: var(--color-blue-500);`);
  lines.push(`  --border-disabled: var(--color-gray-700);`);
  lines.push('');

  // Brand — matches theme/index.ts createBrandStates(family, isDark=true)
  lines.push('  /* Brand - Primary */');
  lines.push(`  --brand-primary: var(--color-blue-500);`);
  lines.push(`  --brand-primary-hover: var(--color-blue-400);`);
  lines.push(`  --brand-primary-active: var(--color-blue-300);`);
  lines.push(`  --brand-primary-subtle: var(--color-blue-900);`);
  lines.push(`  --brand-primary-muted: var(--color-blue-800);`);
  lines.push('');
  lines.push('  /* Brand - Secondary */');
  lines.push(`  --brand-secondary: var(--color-purple-500);`);
  lines.push(`  --brand-secondary-hover: var(--color-purple-400);`);
  lines.push(`  --brand-secondary-active: var(--color-purple-300);`);
  lines.push(`  --brand-secondary-subtle: var(--color-purple-900);`);
  lines.push(`  --brand-secondary-muted: var(--color-purple-800);`);
  lines.push('');
  lines.push('  /* Brand - Accent */');
  lines.push(`  --brand-accent: var(--color-cyan-500);`);
  lines.push(`  --brand-accent-hover: var(--color-cyan-400);`);
  lines.push(`  --brand-accent-active: var(--color-cyan-300);`);
  lines.push(`  --brand-accent-subtle: var(--color-cyan-900);`);
  lines.push(`  --brand-accent-muted: var(--color-cyan-800);`);
  lines.push('');

  // Status — matches theme/index.ts dark mode status
  lines.push('  /* Status */');
  lines.push(`  --status-success: var(--color-green-500);`);
  lines.push(`  --status-success-hover: var(--color-green-400);`);
  lines.push(`  --status-success-subtle: var(--color-green-900);`);
  lines.push(`  --status-success-muted: var(--color-green-800);`);
  lines.push(`  --status-success-text: var(--color-green-400);`);
  lines.push(`  --status-warning: var(--color-yellow-500);`);
  lines.push(`  --status-warning-hover: var(--color-yellow-400);`);
  lines.push(`  --status-warning-subtle: var(--color-yellow-900);`);
  lines.push(`  --status-warning-muted: var(--color-yellow-800);`);
  lines.push(`  --status-warning-text: var(--color-yellow-400);`);
  lines.push(`  --status-error: var(--color-red-500);`);
  lines.push(`  --status-error-hover: var(--color-red-400);`);
  lines.push(`  --status-error-subtle: var(--color-red-900);`);
  lines.push(`  --status-error-muted: var(--color-red-800);`);
  lines.push(`  --status-error-text: var(--color-red-400);`);
  lines.push(`  --status-info: var(--color-blue-500);`);
  lines.push(`  --status-info-hover: var(--color-blue-400);`);
  lines.push(`  --status-info-subtle: var(--color-blue-900);`);
  lines.push(`  --status-info-muted: var(--color-blue-800);`);
  lines.push(`  --status-info-text: var(--color-blue-400);`);
  lines.push('');

  // Interactive — matches theme/index.ts dark mode interactive
  lines.push('  /* Interactive States */');
  lines.push(`  --interactive-default: var(--color-gray-400);`);
  lines.push(`  --interactive-hover: var(--color-gray-300);`);
  lines.push(`  --interactive-active: var(--color-gray-200);`);
  lines.push(`  --interactive-disabled: var(--color-gray-600);`);
  lines.push(`  --interactive-focus: var(--color-blue-500);`);
  lines.push('');

  // Overlays — matches theme/index.ts dark mode overlay
  lines.push('  /* Overlays */');
  lines.push(`  --overlay-light: rgba(0, 0, 0, 0.2);`);
  lines.push(`  --overlay-medium: rgba(0, 0, 0, 0.4);`);
  lines.push(`  --overlay-dark: rgba(0, 0, 0, 0.6);`);
  lines.push(`  --overlay-heavy: rgba(0, 0, 0, 0.8);`);
  lines.push('');

  // Glass — matches theme/index.ts dark mode glass
  lines.push('  /* Glass */');
  lines.push(`  --glass-surface-light: rgba(0, 0, 0, 0.1);`);
  lines.push(`  --glass-surface-medium: rgba(0, 0, 0, 0.2);`);
  lines.push(`  --glass-surface-heavy: rgba(0, 0, 0, 0.4);`);
  lines.push(`  --glass-surface-dark: rgba(0, 0, 0, 0.6);`);
  lines.push(`  --glass-border-light: rgba(255, 255, 255, 0.1);`);
  lines.push(`  --glass-border-default: rgba(255, 255, 255, 0.15);`);
  lines.push(`  --glass-border-subtle: rgba(255, 255, 255, 0.05);`);
  lines.push('');

  // Component overrides
  lines.push('  /* Component Shadows */');
  lines.push(`  --card-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3);`);
  lines.push(`  --card-shadow-hover: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3);`);
  lines.push(`  --modal-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.5);`);
  lines.push(`  --glass-card-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);`);
  lines.push('');

  // Tooltip inverted
  lines.push('  /* Tooltip (inverted in dark mode) */');
  lines.push(`  --tooltip-bg: var(--color-gray-100);`);
  lines.push(`  --tooltip-text: var(--color-gray-900);`);
  lines.push(`  --tooltip-border: var(--color-gray-200);`);
  lines.push('');

  // Toggle thumb
  lines.push('  /* Toggle */');
  lines.push(`  --toggle-thumb-disabled: var(--color-gray-500);`);
  lines.push('');

  // Skeleton shimmer (reduced opacity in dark)
  lines.push('  /* Skeleton */');
  lines.push(`  --skeleton-shimmer: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);`);

  return lines.join('\n');
}

// ============================================
// FLUID RESPONSIVE SYSTEM
//
// Replaces the old media-query breakpoint system with CSS clamp()
// for smooth interpolation between 375px and 1440px viewports.
// ============================================

/**
 * Build a CSS clamp() expression that interpolates linearly
 * between `min` at viewportMin and `max` at viewportMax.
 *
 * Formula:  clamp(min, min + (max - min) * ((100vw - vpMin) / (vpMax - vpMin)), max)
 * Simplified CSS: clamp(minpx, calc(minpx + (delta) * ((100vw - vpMinpx) / range)), maxpx)
 *
 * Note: Viewports below absoluteMin (360px) are not supported by any modern
 * phone manufactured after 2018. The clamp() function naturally floors at the
 * min value for any viewport <= viewportMin (375px), so no extra guard is needed.
 */
export function clampExpr(min: number, max: number): string {
  if (min === max) return `${min}px`;
  const { viewportMin, viewportMax } = fluidConfig;
  const range = viewportMax - viewportMin; // 1065
  const delta = max - min;
  return `clamp(${min}px, calc(${min}px + ${delta} * ((100vw - ${viewportMin}px) / ${range})), ${max}px)`;
}

/**
 * Fluid font-size tokens.
 * Small sizes (2xs, xs) stay fixed; base and above scale smoothly.
 */
export const FLUID_FONT_SIZES: Record<string, [number, number]> = {
  // [min at 375px, max at 1440px]
  '2xs': [10, 10], // fixed — already very small
  xs:    [12, 14],
  sm:    [14, 16],
  base:  [16, 20],
  lg:    [18, 22],
  xl:    [20, 26],
  xxl:   [22, 28],
  '2xl': [24, 32],
  xxxl:  [28, 36],
  '3xl': [30, 40],
  '4xl': [36, 48],
};

/**
 * Fluid spacing tokens.
 * Small spacings (0 through 3) stay fixed.
 */
export const FLUID_SPACINGS: Record<string, [number, number]> = {
  // [min, max]
  4:  [16, 20],
  5:  [20, 24],
  6:  [24, 32],
  7:  [28, 36],
  8:  [32, 40],
  9:  [36, 44],
  10: [40, 52],
  11: [44, 56],
  12: [48, 60],
  14: [56, 72],
  16: [64, 80],
  20: [80, 100],
  24: [96, 120],
};

/**
 * Fluid radius tokens.
 * xs, sm, md stay fixed.
 */
export const FLUID_RADII: Record<string, [number, number]> = {
  lg:   [10, 14],
  xl:   [14, 20],
  '2xl': [20, 24],
  '3xl': [24, 28],
  '4xl': [28, 32],
  '5xl': [32, 40],
};

/**
 * Fluid button/input component heights and padding.
 * Values are [min at 375px, max at 1440px].
 */
export const FLUID_BUTTON_HEIGHTS: Record<string, [number, number]> = {
  xs: [24, 32],
  sm: [32, 40],
  md: [40, 48],
  lg: [48, 64],
  xl: [56, 72],
};

export const FLUID_BUTTON_PADDING_X: Record<string, [number, number]> = {
  xs: [8, 12],
  sm: [12, 16],
  md: [16, 24],
  lg: [24, 32],
  xl: [32, 48],
};

export const FLUID_BUTTON_PADDING_Y: Record<string, [number, number]> = {
  xs: [4, 6],
  sm: [6, 8],
  md: [8, 12],
  lg: [12, 16],
  xl: [16, 24],
};

export const FLUID_INPUT_HEIGHTS: Record<string, [number, number]> = {
  sm: [32, 40],
  md: [40, 48],
  lg: [48, 64],
};

/**
 * Generate fluid responsive tokens using CSS clamp().
 *
 * Replaces the old generateResponsiveTokens() + generateResponsiveMediaQueries()
 * pair. All scaling now happens inside :root via clamp() — no media query
 * overrides needed.
 */
function generateFluidTokens(): string {
  const lines: string[] = [];

  lines.push('  /* ============================================');
  lines.push('     FLUID RESPONSIVE SCALING');
  lines.push(`     Smooth interpolation: ${fluidConfig.viewportMin}px → ${fluidConfig.viewportMax}px`);
  lines.push('     ============================================ */');
  lines.push('');

  // Fluid font sizes (override the fixed values from generateLayoutTokens)
  lines.push('  /* Fluid font sizes */');
  for (const [key, [min, max]] of Object.entries(FLUID_FONT_SIZES)) {
    if (min === max) continue; // skip fixed sizes, already emitted by generateLayoutTokens
    lines.push(`  --font-size-${key}: ${clampExpr(min, max)};`);
  }
  lines.push('');

  // Fluid spacing (override the fixed values from generateLayoutTokens)
  lines.push('  /* Fluid spacing */');
  for (const [key, [min, max]] of Object.entries(FLUID_SPACINGS)) {
    lines.push(`  --spacing-${key}: ${clampExpr(min, max)};`);
  }
  lines.push('');

  // Fluid radius (override fixed values from generateLayoutTokens)
  lines.push('  /* Fluid radius */');
  for (const [key, [min, max]] of Object.entries(FLUID_RADII)) {
    lines.push(`  --radius-${key}: ${clampExpr(min, max)};`);
  }
  lines.push('');

  // Fluid button heights
  lines.push('  /* Fluid button heights */');
  for (const [size, [min, max]] of Object.entries(FLUID_BUTTON_HEIGHTS)) {
    lines.push(`  --button-${size}-height: ${clampExpr(min, max)};`);
  }
  lines.push('');

  // Fluid button padding
  lines.push('  /* Fluid button padding */');
  for (const [size, [min, max]] of Object.entries(FLUID_BUTTON_PADDING_X)) {
    lines.push(`  --button-${size}-padding-x: ${clampExpr(min, max)};`);
  }
  for (const [size, [min, max]] of Object.entries(FLUID_BUTTON_PADDING_Y)) {
    lines.push(`  --button-${size}-padding-y: ${clampExpr(min, max)};`);
  }
  lines.push('');

  // Fluid input heights
  lines.push('  /* Fluid input heights */');
  for (const [size, [min, max]] of Object.entries(FLUID_INPUT_HEIGHTS)) {
    lines.push(`  --input-${size}-height: ${clampExpr(min, max)};`);
  }
  lines.push('');

  // Breakpoint tokens (still useful as reference values)
  lines.push('  /* Breakpoint tokens */');
  lines.push(`  --breakpoint-mobile: ${tokens.breakpoints.mobile}px;`);
  lines.push(`  --breakpoint-tablet: ${tokens.breakpoints.tablet}px;`);
  lines.push(`  --breakpoint-desktop: ${tokens.breakpoints.desktop}px;`);
  lines.push(`  --breakpoint-large: ${tokens.breakpoints.large}px;`);

  return lines.join('\n');
}

/**
 * Generate complete CSS file
 */
export function generateCSS(): string {
  const lines: string[] = [];

  // Use Google Sans Flex font to match typography.ts
  lines.push('@import url(\'https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@300;400;500;600;700&display=swap\');');
  lines.push('');
  lines.push(':root {');

  lines.push(generatePrimitives());
  lines.push('');

  lines.push(generateSemantic());
  lines.push('');

  lines.push(generateComponents());
  lines.push('');

  lines.push(generateAnimationTokens());
  lines.push('');

  lines.push(generateLayoutTokens());
  lines.push('');

  lines.push(generateFluidTokens());
  lines.push('}');
  lines.push('');

  // Dark mode - manual class (opt-in via .dark on <html>)
  lines.push('/* ============================================');
  lines.push('   DARK MODE - Manual Toggle (.dark class)');
  lines.push('   ============================================ */');
  lines.push('.dark {');
  lines.push(generateDarkMode());
  lines.push('}');

  return lines.join('\n');
}
