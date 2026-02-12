/**
 * Groxigo Design Tokens - Colors
 *
 * A generic, reusable color token system following the three-tier architecture:
 * 1. Primitives - Raw color values (the foundation)
 * 2. Semantic Aliases - Meaningful names mapped from primitives
 * 3. Component Mapped - Component-specific tokens
 *
 * This is designed to be the base for all applications.
 */

// ============================================
// TIER 1: PRIMITIVES
// Raw color values - the foundation palette
// ============================================

export const primitives = {
  // Absolute colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',

  // Neutral grays (slate-based for modern look)
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Blue - Trust, stability, technology
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  // Green - Success, growth, nature
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },

  // Red - Error, danger, urgency
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },

  // Yellow - Warning, attention, optimism
  yellow: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
    950: '#422006',
  },

  // Orange - Energy, enthusiasm, warmth
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  },

  // Purple - Creativity, luxury, wisdom
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },

  // Cyan - Fresh, clean, modern
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344',
  },

  // Pink - Playful, romantic, soft
  pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
    950: '#500724',
  },

  // Indigo - Deep, professional, trustworthy
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },

  // Teal - Balance, calm, sophisticated
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#042f2e',
  },
} as const;

// Legacy export for backwards compatibility
export const groxigoColors = primitives;

// ============================================
// TIER 2: SEMANTIC ALIASES - Light Mode
// Meaningful names for functional purposes
// ============================================

/**
 * Static semantic colors for light mode with default brand (blue/purple/cyan).
 * Must stay in sync with theme/index.ts buildSemanticColors() light-mode output.
 * Per DESIGN_RULES §24, theme/index.ts is the authority for raw values.
 */
export const semantic = {
  // Surface colors (backgrounds)
  surface: {
    primary: primitives.white,
    secondary: primitives.gray[50],
    tertiary: primitives.gray[100],
    elevated: primitives.white,
    sunken: primitives.gray[100],
    disabled: primitives.gray[100],
  },

  // Text colors
  text: {
    primary: primitives.gray[900],  // #0f172a — matches theme/index.ts (DESIGN_RULES §24 authority)
    secondary: primitives.gray[600],
    tertiary: primitives.gray[500],
    disabled: primitives.gray[400],
    inverse: primitives.white,
    link: primitives.blue[600],
    linkHover: primitives.blue[700],
  },

  // Border colors
  border: {
    subtle: primitives.gray[200],
    default: primitives.gray[300],
    strong: primitives.gray[400],
    focus: primitives.blue[500],
    disabled: primitives.gray[200],
  },

  // Brand colors (configurable slots)
  brand: {
    primary: {
      default: primitives.blue[600],
      hover: primitives.blue[700],
      active: primitives.blue[800],
      subtle: primitives.blue[50],
      muted: primitives.blue[100],
    },
    secondary: {
      default: primitives.purple[600],
      hover: primitives.purple[700],
      active: primitives.purple[800],
      subtle: primitives.purple[50],
      muted: primitives.purple[100],
    },
    accent: {
      default: primitives.cyan[600],
      hover: primitives.cyan[700],
      active: primitives.cyan[800],
      subtle: primitives.cyan[50],
      muted: primitives.cyan[100],
    },
  },

  // Status colors
  status: {
    success: {
      default: primitives.green[600],
      hover: primitives.green[700],
      active: primitives.green[800],
      subtle: primitives.green[50],
      muted: primitives.green[100],
      text: primitives.green[700],
    },
    warning: {
      default: primitives.yellow[500],
      hover: primitives.yellow[600],
      active: primitives.yellow[700],
      subtle: primitives.yellow[50],
      muted: primitives.yellow[100],
      text: primitives.yellow[700],
    },
    error: {
      default: primitives.red[600],
      hover: primitives.red[700],
      active: primitives.red[800],
      subtle: primitives.red[50],
      muted: primitives.red[100],
      text: primitives.red[700],
    },
    info: {
      default: primitives.blue[500],
      hover: primitives.blue[600],
      active: primitives.blue[700],
      subtle: primitives.blue[50],
      muted: primitives.blue[100],
      text: primitives.blue[700],
    },
  },

  // Interactive states
  interactive: {
    default: primitives.gray[600],
    hover: primitives.gray[700],
    active: primitives.gray[800],
    disabled: primitives.gray[400],
    focus: primitives.blue[500],
  },

  // Overlay colors — matches theme/index.ts light mode (DESIGN_RULES §24 authority)
  overlay: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.3)',
    dark: 'rgba(0, 0, 0, 0.5)',
    heavy: 'rgba(0, 0, 0, 0.7)',
  },

  // Glass/Blur effects — matches theme/index.ts light mode
  glass: {
    surface: {
      light: 'rgba(255, 255, 255, 0.6)',
      medium: 'rgba(255, 255, 255, 0.7)',
      heavy: 'rgba(255, 255, 255, 0.85)',
      dark: 'rgba(255, 255, 255, 0.95)',
    },
    border: {
      light: 'rgba(255, 255, 255, 0.5)',
      default: 'rgba(255, 255, 255, 0.3)',
      subtle: 'rgba(255, 255, 255, 0.15)',
    },
  },

  // Layout configuration for page/card backgrounds
  // Toggle TRANSPARENT_IMAGES_ENABLED when product images have transparent backgrounds
  // Current: gray page, white cards (images have white backgrounds baked in)
  // Future: white page, gray image areas (when images are transparent)
  layout: {
    // Main scrollable content area background
    page: primitives.gray[50],           // Gray page (change to white when images are transparent)
    // Card surface background
    card: primitives.white,              // White cards
    // Background behind product/recipe images (shows through transparent images)
    imageBg: primitives.white,           // White (change to gray[100] when images are transparent)
  },
} as const;

// Legacy exports for backwards compatibility
export const aliasShared = semantic;
export const aliasGlass = semantic.glass;

// ============================================
// TIER 2: SEMANTIC ALIASES - Dark Mode
// ============================================

export const semanticDark = {
  // Surface colors (backgrounds)
  surface: {
    primary: primitives.gray[900],
    secondary: primitives.gray[800],
    tertiary: primitives.gray[700],
    elevated: primitives.gray[800],
    sunken: primitives.gray[950],
    disabled: primitives.gray[800],
  },

  // Text colors
  text: {
    primary: primitives.gray[50],
    secondary: primitives.gray[300],
    tertiary: primitives.gray[400],
    disabled: primitives.gray[500],
    inverse: primitives.gray[900],
    link: primitives.blue[400],
    linkHover: primitives.blue[300],
  },

  // Border colors
  border: {
    subtle: primitives.gray[700],
    default: primitives.gray[600],
    strong: primitives.gray[500],
    focus: primitives.blue[500],
    disabled: primitives.gray[700],
  },

  // Brand colors (configurable slots) — createBrandStates(family, isDark=true): [500,400,300,900,800]
  brand: {
    primary: {
      default: primitives.blue[500],
      hover: primitives.blue[400],
      active: primitives.blue[300],
      subtle: primitives.blue[900],
      muted: primitives.blue[800],
    },
    secondary: {
      default: primitives.purple[500],
      hover: primitives.purple[400],
      active: primitives.purple[300],
      subtle: primitives.purple[900],
      muted: primitives.purple[800],
    },
    accent: {
      default: primitives.cyan[500],
      hover: primitives.cyan[400],
      active: primitives.cyan[300],
      subtle: primitives.cyan[900],
      muted: primitives.cyan[800],
    },
  },

  // Status colors
  status: {
    success: {
      default: primitives.green[500],
      hover: primitives.green[400],
      active: primitives.green[300],
      subtle: primitives.green[900],
      muted: primitives.green[800],
      text: primitives.green[400],
    },
    warning: {
      default: primitives.yellow[500],
      hover: primitives.yellow[400],
      active: primitives.yellow[300],
      subtle: primitives.yellow[900],
      muted: primitives.yellow[800],
      text: primitives.yellow[400],
    },
    error: {
      default: primitives.red[500],
      hover: primitives.red[400],
      active: primitives.red[300],
      subtle: primitives.red[900],
      muted: primitives.red[800],
      text: primitives.red[400],
    },
    info: {
      default: primitives.blue[500],
      hover: primitives.blue[400],
      active: primitives.blue[300],
      subtle: primitives.blue[900],
      muted: primitives.blue[800],
      text: primitives.blue[400],
    },
  },

  // Interactive states
  interactive: {
    default: primitives.gray[400],
    hover: primitives.gray[300],
    active: primitives.gray[200],
    disabled: primitives.gray[600],
    focus: primitives.blue[500],
  },

  // Overlay colors
  overlay: {
    light: 'rgba(0, 0, 0, 0.2)',
    medium: 'rgba(0, 0, 0, 0.4)',
    dark: 'rgba(0, 0, 0, 0.6)',
    heavy: 'rgba(0, 0, 0, 0.8)',
  },

  // Glass/Blur effects
  glass: {
    surface: {
      light: 'rgba(0, 0, 0, 0.1)',
      medium: 'rgba(0, 0, 0, 0.2)',
      heavy: 'rgba(0, 0, 0, 0.4)',
      dark: 'rgba(0, 0, 0, 0.6)',
    },
    border: {
      light: 'rgba(255, 255, 255, 0.1)',
      default: 'rgba(255, 255, 255, 0.15)',
      subtle: 'rgba(255, 255, 255, 0.05)',
    },
  },

  // Layout configuration for page/card backgrounds (dark mode)
  layout: {
    page: primitives.gray[900],
    card: primitives.gray[800],
    imageBg: primitives.gray[800],
  },
} as const;

// Legacy exports
export const aliasSharedDark = semanticDark;
export const aliasGlassDark = semanticDark.glass;

// ============================================
// TIER 3: COMPONENT MAPPED - Light Mode
// Component-specific token mappings
// ============================================

export const components = {
  // Button component
  button: {
    primary: {
      bg: semantic.brand.primary.default,
      bgHover: semantic.brand.primary.hover,
      bgActive: semantic.brand.primary.active,
      bgDisabled: semantic.surface.disabled,
      text: semantic.text.inverse,
      textDisabled: semantic.text.disabled,
      border: primitives.transparent,
    },
    secondary: {
      bg: semantic.surface.secondary,
      bgHover: semantic.surface.tertiary,
      bgActive: primitives.gray[200],
      bgDisabled: semantic.surface.disabled,
      text: semantic.text.primary,
      textDisabled: semantic.text.disabled,
      border: semantic.border.default,
    },
    outline: {
      bg: primitives.transparent,
      bgHover: semantic.brand.primary.subtle,
      bgActive: semantic.brand.primary.muted,
      bgDisabled: primitives.transparent,
      text: semantic.brand.primary.default,
      textDisabled: semantic.text.disabled,
      border: semantic.brand.primary.default,
      borderDisabled: semantic.border.disabled,
    },
    ghost: {
      bg: primitives.transparent,
      bgHover: semantic.surface.secondary,
      bgActive: semantic.surface.tertiary,
      bgDisabled: primitives.transparent,
      text: semantic.text.primary,
      textDisabled: semantic.text.disabled,
      border: primitives.transparent,
    },
    danger: {
      bg: semantic.status.error.default,
      bgHover: semantic.status.error.hover,
      bgActive: primitives.red[800],
      bgDisabled: semantic.surface.disabled,
      text: semantic.text.inverse,
      textDisabled: semantic.text.disabled,
      border: primitives.transparent,
    },
  },

  // Input component
  input: {
    bg: semantic.surface.primary,
    bgHover: semantic.surface.primary,
    bgFocus: semantic.surface.primary,
    bgDisabled: semantic.surface.disabled,
    text: semantic.text.primary,
    textDisabled: semantic.text.disabled,
    placeholder: semantic.text.tertiary,
    border: semantic.border.default,
    borderHover: semantic.border.strong,
    borderFocus: semantic.border.focus,
    borderError: semantic.status.error.default,
    borderDisabled: semantic.border.disabled,
  },

  // Card component
  card: {
    bg: semantic.surface.primary,
    bgHover: semantic.surface.primary,
    border: semantic.border.subtle,
    borderHover: semantic.border.default,
    shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    shadowHover: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },

  // Badge component
  badge: {
    default: {
      bg: semantic.surface.tertiary,
      text: semantic.text.secondary,
      border: semantic.border.subtle,
    },
    primary: {
      bg: semantic.brand.primary.subtle,
      text: semantic.brand.primary.default,
      border: semantic.brand.primary.muted,
    },
    secondary: {
      bg: semantic.brand.secondary.subtle,
      text: semantic.brand.secondary.default,
      border: semantic.brand.secondary.muted,
    },
    success: {
      bg: semantic.status.success.subtle,
      text: semantic.status.success.text,
      border: semantic.status.success.muted,
    },
    warning: {
      bg: semantic.status.warning.subtle,
      text: semantic.status.warning.text,
      border: semantic.status.warning.muted,
    },
    error: {
      bg: semantic.status.error.subtle,
      text: semantic.status.error.text,
      border: semantic.status.error.muted,
    },
    info: {
      bg: semantic.status.info.subtle,
      text: semantic.status.info.text,
      border: semantic.status.info.muted,
    },
  },

  // Modal/Dialog component
  modal: {
    bg: semantic.surface.primary,
    border: semantic.border.subtle,
    overlay: semantic.overlay.dark,
    shadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },

  // Tooltip component
  tooltip: {
    bg: primitives.gray[900],
    text: primitives.white,
    border: primitives.gray[800],
  },

  // Navigation component
  nav: {
    bg: semantic.surface.primary,
    bgHover: semantic.surface.secondary,
    bgActive: semantic.brand.primary.subtle,
    text: semantic.text.secondary,
    textHover: semantic.text.primary,
    textActive: semantic.brand.primary.default,
    border: semantic.border.subtle,
  },

  // Tab component
  tab: {
    bg: primitives.transparent,
    bgHover: semantic.surface.secondary,
    bgActive: semantic.surface.primary,
    text: semantic.text.secondary,
    textHover: semantic.text.primary,
    textActive: semantic.brand.primary.default,
    border: semantic.border.subtle,
    borderActive: semantic.brand.primary.default,
  },

  // Avatar component
  avatar: {
    bg: semantic.surface.tertiary,
    text: semantic.text.secondary,
    border: semantic.border.subtle,
  },

  // Divider component
  divider: {
    default: semantic.border.subtle,
    strong: semantic.border.default,
  },

  // Toggle/Switch component
  toggle: {
    bgOff: semantic.surface.tertiary,
    bgOn: semantic.brand.primary.default,
    bgDisabled: semantic.surface.disabled,
    thumb: primitives.white,
    thumbDisabled: primitives.gray[300],
  },

  // Progress component
  progress: {
    bg: semantic.surface.tertiary,
    fill: semantic.brand.primary.default,
    fillSuccess: semantic.status.success.default,
    fillWarning: semantic.status.warning.default,
    fillError: semantic.status.error.default,
  },

  // Skeleton/Loader component
  skeleton: {
    bg: semantic.surface.tertiary,
    shimmer: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
  },

  // Alert component
  alert: {
    success: {
      bg: semantic.status.success.subtle,
      border: semantic.status.success.muted,
      text: semantic.status.success.text,
      icon: semantic.status.success.default,
    },
    warning: {
      bg: semantic.status.warning.subtle,
      border: semantic.status.warning.muted,
      text: semantic.status.warning.text,
      icon: semantic.status.warning.default,
    },
    error: {
      bg: semantic.status.error.subtle,
      border: semantic.status.error.muted,
      text: semantic.status.error.text,
      icon: semantic.status.error.default,
    },
    info: {
      bg: semantic.status.info.subtle,
      border: semantic.status.info.muted,
      text: semantic.status.info.text,
      icon: semantic.status.info.default,
    },
  },

  // Glass components
  glass: {
    card: {
      bg: semantic.glass.surface.light,
      border: semantic.glass.border.default,
      shadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
    },
    button: {
      bg: semantic.glass.surface.light,
      bgHover: semantic.glass.surface.medium,
      border: semantic.glass.border.light,
      text: semantic.text.primary,
    },
    nav: {
      bg: semantic.glass.surface.light,
      border: semantic.glass.border.subtle,
    },
    modal: {
      bg: semantic.glass.surface.light,
      overlay: semantic.overlay.medium,
    },
  },
} as const;

// Legacy exports
export const mappedShared = components;
export const mappedGlass = components.glass;

// ============================================
// TIER 3: COMPONENT MAPPED - Dark Mode
// ============================================

export const componentsDark = {
  // Button component
  button: {
    primary: {
      bg: semanticDark.brand.primary.default,
      bgHover: semanticDark.brand.primary.hover,
      bgActive: semanticDark.brand.primary.active,
      bgDisabled: semanticDark.surface.disabled,
      text: primitives.white, // White text on colored button background
      textDisabled: semanticDark.text.disabled,
      border: primitives.transparent,
    },
    secondary: {
      bg: semanticDark.surface.secondary,
      bgHover: semanticDark.surface.tertiary,
      bgActive: primitives.gray[600],
      bgDisabled: semanticDark.surface.disabled,
      text: semanticDark.text.primary,
      textDisabled: semanticDark.text.disabled,
      border: semanticDark.border.default,
    },
    outline: {
      bg: primitives.transparent,
      bgHover: semanticDark.brand.primary.subtle,
      bgActive: semanticDark.brand.primary.muted,
      bgDisabled: primitives.transparent,
      text: semanticDark.brand.primary.default,
      textDisabled: semanticDark.text.disabled,
      border: semanticDark.brand.primary.default,
      borderDisabled: semanticDark.border.disabled,
    },
    ghost: {
      bg: primitives.transparent,
      bgHover: semanticDark.surface.secondary,
      bgActive: semanticDark.surface.tertiary,
      bgDisabled: primitives.transparent,
      text: semanticDark.text.primary,
      textDisabled: semanticDark.text.disabled,
      border: primitives.transparent,
    },
    danger: {
      bg: semanticDark.status.error.default,
      bgHover: semanticDark.status.error.hover,
      bgActive: primitives.red[300],
      bgDisabled: semanticDark.surface.disabled,
      text: primitives.white, // White text on colored button background
      textDisabled: semanticDark.text.disabled,
      border: primitives.transparent,
    },
  },

  // Input component
  input: {
    bg: semanticDark.surface.secondary,
    bgHover: semanticDark.surface.secondary,
    bgFocus: semanticDark.surface.secondary,
    bgDisabled: semanticDark.surface.disabled,
    text: semanticDark.text.primary,
    textDisabled: semanticDark.text.disabled,
    placeholder: semanticDark.text.tertiary,
    border: semanticDark.border.default,
    borderHover: semanticDark.border.strong,
    borderFocus: semanticDark.border.focus,
    borderError: semanticDark.status.error.default,
    borderDisabled: semanticDark.border.disabled,
  },

  // Card component
  card: {
    bg: semanticDark.surface.secondary,
    bgHover: semanticDark.surface.secondary,
    border: semanticDark.border.subtle,
    borderHover: semanticDark.border.default,
    shadow: '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)',
    shadowHover: '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
  },

  // Badge component
  badge: {
    default: {
      bg: semanticDark.surface.tertiary,
      text: semanticDark.text.secondary,
      border: semanticDark.border.subtle,
    },
    primary: {
      bg: semanticDark.brand.primary.subtle,
      text: primitives.blue[400],
      border: primitives.blue[800],
    },
    secondary: {
      bg: semanticDark.brand.secondary.subtle,
      text: primitives.purple[400],
      border: primitives.purple[800],
    },
    success: {
      bg: semanticDark.status.success.subtle,
      text: semanticDark.status.success.text,
      border: primitives.green[800],
    },
    warning: {
      bg: semanticDark.status.warning.subtle,
      text: semanticDark.status.warning.text,
      border: primitives.yellow[800],
    },
    error: {
      bg: semanticDark.status.error.subtle,
      text: semanticDark.status.error.text,
      border: primitives.red[800],
    },
    info: {
      bg: semanticDark.status.info.subtle,
      text: semanticDark.status.info.text,
      border: primitives.blue[800],
    },
  },

  // Modal/Dialog component
  modal: {
    bg: semanticDark.surface.secondary,
    border: semanticDark.border.subtle,
    overlay: semanticDark.overlay.heavy,
    shadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
  },

  // Tooltip component
  tooltip: {
    bg: primitives.gray[100],
    text: primitives.gray[900],
    border: primitives.gray[200],
  },

  // Navigation component
  nav: {
    bg: semanticDark.surface.primary,
    bgHover: semanticDark.surface.secondary,
    bgActive: semanticDark.brand.primary.subtle,
    text: semanticDark.text.secondary,
    textHover: semanticDark.text.primary,
    textActive: semanticDark.brand.primary.default,
    border: semanticDark.border.subtle,
  },

  // Tab component
  tab: {
    bg: primitives.transparent,
    bgHover: semanticDark.surface.secondary,
    bgActive: semanticDark.surface.primary,
    text: semanticDark.text.secondary,
    textHover: semanticDark.text.primary,
    textActive: semanticDark.brand.primary.default,
    border: semanticDark.border.subtle,
    borderActive: semanticDark.brand.primary.default,
  },

  // Avatar component
  avatar: {
    bg: semanticDark.surface.tertiary,
    text: semanticDark.text.secondary,
    border: semanticDark.border.subtle,
  },

  // Divider component
  divider: {
    default: semanticDark.border.subtle,
    strong: semanticDark.border.default,
  },

  // Toggle/Switch component
  toggle: {
    bgOff: semanticDark.surface.tertiary,
    bgOn: semanticDark.brand.primary.default,
    bgDisabled: semanticDark.surface.disabled,
    thumb: primitives.white,
    thumbDisabled: primitives.gray[500],
  },

  // Progress component
  progress: {
    bg: semanticDark.surface.tertiary,
    fill: semanticDark.brand.primary.default,
    fillSuccess: semanticDark.status.success.default,
    fillWarning: semanticDark.status.warning.default,
    fillError: semanticDark.status.error.default,
  },

  // Skeleton/Loader component
  skeleton: {
    bg: semanticDark.surface.tertiary,
    shimmer: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
  },

  // Alert component
  alert: {
    success: {
      bg: semanticDark.status.success.subtle,
      border: primitives.green[800],
      text: semanticDark.status.success.text,
      icon: semanticDark.status.success.default,
    },
    warning: {
      bg: semanticDark.status.warning.subtle,
      border: primitives.yellow[800],
      text: semanticDark.status.warning.text,
      icon: semanticDark.status.warning.default,
    },
    error: {
      bg: semanticDark.status.error.subtle,
      border: primitives.red[800],
      text: semanticDark.status.error.text,
      icon: semanticDark.status.error.default,
    },
    info: {
      bg: semanticDark.status.info.subtle,
      border: primitives.blue[800],
      text: semanticDark.status.info.text,
      icon: semanticDark.status.info.default,
    },
  },

  // Glass components
  glass: {
    card: {
      bg: semanticDark.glass.surface.medium,
      border: semanticDark.glass.border.default,
      shadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
    },
    button: {
      bg: semanticDark.glass.surface.light,
      bgHover: semanticDark.glass.surface.medium,
      border: semanticDark.glass.border.light,
      text: semanticDark.text.primary,
    },
    nav: {
      bg: semanticDark.glass.surface.medium,
      border: semanticDark.glass.border.subtle,
    },
    modal: {
      bg: semanticDark.glass.surface.medium,
      overlay: semanticDark.overlay.heavy,
    },
  },
} as const;

// Legacy exports
export const mappedSharedDark = componentsDark;
export const mappedGlassDark = componentsDark.glass;

// ============================================
// MAIN EXPORT
// ============================================

export const colors = {
  // Tier 1: Primitives
  primitives,

  // Tier 2: Semantic (Light)
  semantic,

  // Tier 3: Components (Light)
  components,

  // Dark mode
  dark: {
    semantic: semanticDark,
    components: componentsDark,
  },

  // Legacy compatibility (deprecated - use new structure)
  /** @deprecated Use colors.primitives instead */
  groxigo: primitives,
  /** @deprecated Use colors.semantic instead */
  alias: {
    shared: semantic,
    glass: semantic.glass,
  },
  /** @deprecated Use colors.components instead */
  mapped: {
    shared: components,
    glass: components.glass,
  },
} as const;

// Type exports
export type ThemeMode = 'light' | 'dark' | 'system';
export type PrimitiveColor = keyof typeof primitives;
export type SemanticCategory = keyof typeof semantic;
export type ComponentCategory = keyof typeof components;
