/**
 * Theming System
 *
 * Provides a flexible theming configuration system for easy rebranding.
 * Allows applications to customize brand colors while maintaining
 * the three-tier token architecture.
 */

import type {
  ThemeConfig,
  ThemeColors,
  ColorFamilyName,
  PrimitiveColors,
  SemanticColors,
  ComponentColors,
  BrandStateTokens,
  ColorFamily,
  HexColor,
} from '../types';
import { primitives } from '../tokens/colors';

// ============================================
// DEFAULT THEME CONFIGURATION
// ============================================

export const defaultThemeConfig: ThemeConfig = {
  name: 'default',
  mode: 'light',
  brand: {
    primary: 'blue',
    secondary: 'purple',
    accent: 'cyan',
  },
};

// ============================================
// THEME BUILDER
// ============================================

/**
 * Create brand state tokens from a color family
 */
function createBrandStates(colorFamily: ColorFamily, isDark: boolean): BrandStateTokens {
  if (isDark) {
    return {
      default: colorFamily[500],
      hover: colorFamily[400],
      active: colorFamily[300],
      subtle: colorFamily[900],
      muted: colorFamily[800],
    };
  }
  return {
    default: colorFamily[600],
    hover: colorFamily[700],
    active: colorFamily[800],
    subtle: colorFamily[50],
    muted: colorFamily[100],
  };
}

/**
 * Get color family from primitives by name
 */
function getColorFamily(
  name: ColorFamilyName,
  customColors?: Partial<PrimitiveColors>
): ColorFamily {
  if (customColors && customColors[name]) {
    return customColors[name] as ColorFamily;
  }
  return primitives[name];
}

/**
 * Build semantic colors from theme configuration
 */
function buildSemanticColors(
  config: ThemeConfig,
  isDark: boolean
): SemanticColors {
  const primaryFamily = getColorFamily(config.brand.primary, config.customColors);
  const secondaryFamily = getColorFamily(config.brand.secondary, config.customColors);
  const accentFamily = getColorFamily(config.brand.accent, config.customColors);
  const gray = primitives.gray;
  const green = primitives.green;
  const yellow = primitives.yellow;
  const red = primitives.red;
  const blue = primitives.blue;

  if (isDark) {
    return {
      surface: {
        primary: gray[900],
        secondary: gray[800],
        tertiary: gray[700],
        elevated: gray[800],
        sunken: gray[950],
        disabled: gray[800],
      },
      text: {
        primary: gray[50],
        secondary: gray[300],
        tertiary: gray[400],
        disabled: gray[500],
        inverse: gray[900],
        link: primaryFamily[400],
        linkHover: primaryFamily[300],
      },
      border: {
        subtle: gray[700],
        default: gray[600],
        strong: gray[500],
        focus: primaryFamily[500],
        disabled: gray[700],
      },
      brand: {
        primary: createBrandStates(primaryFamily, true),
        secondary: createBrandStates(secondaryFamily, true),
        accent: createBrandStates(accentFamily, true),
      },
      status: {
        success: {
          default: green[500],
          hover: green[400],
          subtle: green[900],
          muted: green[800],
          text: green[400],
        },
        warning: {
          default: yellow[500],
          hover: yellow[400],
          subtle: yellow[900],
          muted: yellow[800],
          text: yellow[400],
        },
        error: {
          default: red[500],
          hover: red[400],
          subtle: red[900],
          muted: red[800],
          text: red[400],
        },
        info: {
          default: blue[500],
          hover: blue[400],
          subtle: blue[900],
          muted: blue[800],
          text: blue[400],
        },
      },
      interactive: {
        default: gray[400],
        hover: gray[300],
        active: gray[200],
        disabled: gray[600],
        focus: primaryFamily[500],
      },
      overlay: {
        light: 'rgba(0, 0, 0, 0.2)',
        medium: 'rgba(0, 0, 0, 0.4)',
        dark: 'rgba(0, 0, 0, 0.6)',
        heavy: 'rgba(0, 0, 0, 0.8)',
      },
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
    };
  }

  // Light mode
  return {
    surface: {
      primary: primitives.white,
      secondary: gray[50],
      tertiary: gray[100],
      elevated: primitives.white,
      sunken: gray[100],
      disabled: gray[100],
    },
    text: {
      primary: gray[900],
      secondary: gray[600],
      tertiary: gray[500],
      disabled: gray[400],
      inverse: primitives.white,
      link: primaryFamily[600],
      linkHover: primaryFamily[700],
    },
    border: {
      subtle: gray[200],
      default: gray[300],
      strong: gray[400],
      focus: primaryFamily[500],
      disabled: gray[200],
    },
    brand: {
      primary: createBrandStates(primaryFamily, false),
      secondary: createBrandStates(secondaryFamily, false),
      accent: createBrandStates(accentFamily, false),
    },
    status: {
      success: {
        default: green[600],
        hover: green[700],
        subtle: green[50],
        muted: green[100],
        text: green[700],
      },
      warning: {
        default: yellow[500],
        hover: yellow[600],
        subtle: yellow[50],
        muted: yellow[100],
        text: yellow[700],
      },
      error: {
        default: red[600],
        hover: red[700],
        subtle: red[50],
        muted: red[100],
        text: red[700],
      },
      info: {
        default: blue[500],
        hover: blue[600],
        subtle: blue[50],
        muted: blue[100],
        text: blue[700],
      },
    },
    interactive: {
      default: gray[600],
      hover: gray[700],
      active: gray[800],
      disabled: gray[400],
      focus: primaryFamily[500],
    },
    overlay: {
      light: 'rgba(0, 0, 0, 0.1)',
      medium: 'rgba(0, 0, 0, 0.3)',
      dark: 'rgba(0, 0, 0, 0.5)',
      heavy: 'rgba(0, 0, 0, 0.7)',
    },
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
  };
}

/**
 * Build component colors from semantic colors
 */
function buildComponentColors(
  semantic: SemanticColors,
  isDark: boolean
): ComponentColors {
  return {
    button: {
      primary: {
        bg: semantic.brand.primary.default,
        bgHover: semantic.brand.primary.hover,
        bgActive: semantic.brand.primary.active,
        bgDisabled: semantic.surface.disabled,
        text: isDark ? primitives.white : primitives.white,
        textDisabled: semantic.text.disabled,
        border: primitives.transparent,
      },
      secondary: {
        bg: semantic.surface.secondary,
        bgHover: semantic.surface.tertiary,
        bgActive: isDark ? primitives.gray[600] : primitives.gray[200],
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
        bgActive: isDark ? primitives.red[300] : primitives.red[800],
        bgDisabled: semantic.surface.disabled,
        text: primitives.white,
        textDisabled: semantic.text.disabled,
        border: primitives.transparent,
      },
    },
    input: {
      bg: isDark ? primitives.gray[800] : semantic.surface.primary,
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
    card: {
      bg: semantic.surface.primary,
      border: semantic.border.subtle,
      borderHover: semantic.border.default,
    },
    badge: {
      default: {
        bg: semantic.surface.tertiary,
        text: semantic.text.secondary,
      },
      primary: {
        bg: semantic.brand.primary.subtle,
        text: semantic.brand.primary.default,
      },
      secondary: {
        bg: semantic.brand.secondary.subtle,
        text: semantic.brand.secondary.default,
      },
      success: {
        bg: semantic.status.success.subtle,
        text: semantic.status.success.text,
      },
      warning: {
        bg: semantic.status.warning.subtle,
        text: semantic.status.warning.text,
      },
      error: {
        bg: semantic.status.error.subtle,
        text: semantic.status.error.text,
      },
      info: {
        bg: semantic.status.info.subtle,
        text: semantic.status.info.text,
      },
    },
    modal: {
      bg: semantic.surface.primary,
      border: semantic.border.subtle,
      overlay: semantic.overlay.dark,
    },
    nav: {
      bg: semantic.surface.primary,
      bgHover: semantic.surface.secondary,
      bgActive: semantic.brand.primary.subtle,
      text: semantic.text.secondary,
      textHover: semantic.text.primary,
      textActive: semantic.brand.primary.default,
      border: semantic.border.subtle,
    },
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
    toggle: {
      bgOff: semantic.surface.tertiary,
      bgOn: semantic.brand.primary.default,
      bgDisabled: semantic.surface.disabled,
      thumb: primitives.white,
    },
    progress: {
      bg: semantic.surface.tertiary,
      fill: semantic.brand.primary.default,
      fillSuccess: semantic.status.success.default,
      fillWarning: semantic.status.warning.default,
      fillError: semantic.status.error.default,
    },
    alert: {
      success: {
        bg: semantic.status.success.subtle,
        border: semantic.status.success.muted,
        text: semantic.status.success.text,
      },
      warning: {
        bg: semantic.status.warning.subtle,
        border: semantic.status.warning.muted,
        text: semantic.status.warning.text,
      },
      error: {
        bg: semantic.status.error.subtle,
        border: semantic.status.error.muted,
        text: semantic.status.error.text,
      },
      info: {
        bg: semantic.status.info.subtle,
        border: semantic.status.info.muted,
        text: semantic.status.info.text,
      },
    },
    glass: {
      card: {
        bg: semantic.glass.surface.light,
        border: semantic.glass.border.default,
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
    },
  };
}

// ============================================
// THEME CREATION
// ============================================

/**
 * Create a complete theme from configuration
 */
export function createTheme(config: Partial<ThemeConfig> = {}): {
  light: ThemeColors;
  dark: ThemeColors;
  config: ThemeConfig;
} {
  const fullConfig: ThemeConfig = {
    ...defaultThemeConfig,
    ...config,
    brand: {
      ...defaultThemeConfig.brand,
      ...config.brand,
    },
  };

  const customPrimitives: PrimitiveColors = {
    ...primitives,
    ...fullConfig.customColors,
  };

  const lightSemantic = buildSemanticColors(fullConfig, false);
  const darkSemantic = buildSemanticColors(fullConfig, true);

  return {
    light: {
      primitives: customPrimitives,
      semantic: lightSemantic,
      components: buildComponentColors(lightSemantic, false),
    },
    dark: {
      primitives: customPrimitives,
      semantic: darkSemantic,
      components: buildComponentColors(darkSemantic, true),
    },
    config: fullConfig,
  };
}

/**
 * Get theme colors for current mode
 */
export function getThemeColors(
  config: Partial<ThemeConfig> = {},
  isDark: boolean = false
): ThemeColors {
  const theme = createTheme(config);
  return isDark ? theme.dark : theme.light;
}

// ============================================
// PRESET THEMES
// ============================================

/** Blue theme (default) */
export const blueTheme = createTheme({
  name: 'blue',
  brand: { primary: 'blue', secondary: 'purple', accent: 'cyan' },
});

/** Green theme */
export const greenTheme = createTheme({
  name: 'green',
  brand: { primary: 'green', secondary: 'teal', accent: 'cyan' },
});

/** Purple theme */
export const purpleTheme = createTheme({
  name: 'purple',
  brand: { primary: 'purple', secondary: 'pink', accent: 'indigo' },
});

/** Orange theme */
export const orangeTheme = createTheme({
  name: 'orange',
  brand: { primary: 'orange', secondary: 'yellow', accent: 'red' },
});

/** Teal theme */
export const tealTheme = createTheme({
  name: 'teal',
  brand: { primary: 'teal', secondary: 'cyan', accent: 'green' },
});

/** Indigo theme */
export const indigoTheme = createTheme({
  name: 'indigo',
  brand: { primary: 'indigo', secondary: 'purple', accent: 'blue' },
});

/** All preset themes */
export const presetThemes = {
  blue: blueTheme,
  green: greenTheme,
  purple: purpleTheme,
  orange: orangeTheme,
  teal: tealTheme,
  indigo: indigoTheme,
} as const;

export type PresetThemeName = keyof typeof presetThemes;
