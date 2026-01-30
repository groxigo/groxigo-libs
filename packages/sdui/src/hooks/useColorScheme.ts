/**
 * useColorScheme Hook
 *
 * Resolves color scheme to actual colors based on theme.
 */

import { useMemo } from 'react';
import type { ColorScheme, CustomColors, SDUIColorProps } from '../types/colors';

/**
 * Theme colors interface (should match your theme structure)
 */
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  error: string;
  warning: string;
  success: string;
  info: string;
  border: string;
  [key: string]: string;
}

/**
 * Resolved colors for a component
 */
export interface ResolvedColors {
  background: string;
  text: string;
  textSecondary: string;
  accent: string;
  border: string;
  icon: string;
  badgeBackground: string;
  badgeText: string;
  buttonBackground: string;
  buttonText: string;
}

/**
 * Color scheme presets
 */
const COLOR_SCHEME_PRESETS: Record<
  Exclude<ColorScheme, 'custom'>,
  (theme: ThemeColors) => Partial<ResolvedColors>
> = {
  default: (theme) => ({
    background: theme.surface,
    text: theme.text,
    textSecondary: theme.textSecondary,
    accent: theme.primary,
    border: theme.border,
    icon: theme.textSecondary,
    badgeBackground: theme.primary,
    badgeText: '#FFFFFF',
    buttonBackground: theme.primary,
    buttonText: '#FFFFFF',
  }),

  primary: (theme) => ({
    background: theme.primary,
    text: '#FFFFFF',
    textSecondary: 'rgba(255,255,255,0.8)',
    accent: '#FFFFFF',
    border: 'transparent',
    icon: '#FFFFFF',
    badgeBackground: '#FFFFFF',
    badgeText: theme.primary,
    buttonBackground: '#FFFFFF',
    buttonText: theme.primary,
  }),

  secondary: (theme) => ({
    background: theme.secondary,
    text: '#FFFFFF',
    textSecondary: 'rgba(255,255,255,0.8)',
    accent: '#FFFFFF',
    border: 'transparent',
  }),

  accent: (theme) => ({
    background: theme.accent,
    text: '#FFFFFF',
    accent: '#FFFFFF',
  }),

  highlight: (theme) => ({
    background: '#FFF8E7',
    text: theme.text,
    accent: '#FF9500',
    border: '#FFD700',
    badgeBackground: '#FF9500',
    badgeText: '#FFFFFF',
  }),

  sale: (theme) => ({
    background: '#FFF0F0',
    text: theme.text,
    accent: '#E53935',
    border: '#FFCDD2',
    badgeBackground: '#E53935',
    badgeText: '#FFFFFF',
  }),

  new: (theme) => ({
    background: '#E8F5E9',
    text: theme.text,
    accent: '#4CAF50',
    border: '#C8E6C9',
    badgeBackground: '#4CAF50',
    badgeText: '#FFFFFF',
  }),

  featured: (theme) => ({
    background: '#F3E5F5',
    text: theme.text,
    accent: '#9C27B0',
    border: '#E1BEE7',
    badgeBackground: '#9C27B0',
    badgeText: '#FFFFFF',
  }),

  warning: (theme) => ({
    background: '#FFF3E0',
    text: theme.text,
    accent: theme.warning,
    border: '#FFE0B2',
    badgeBackground: theme.warning,
    badgeText: '#000000',
  }),

  error: (theme) => ({
    background: '#FFEBEE',
    text: theme.text,
    accent: theme.error,
    border: '#FFCDD2',
    badgeBackground: theme.error,
    badgeText: '#FFFFFF',
  }),

  success: (theme) => ({
    background: '#E8F5E9',
    text: theme.text,
    accent: theme.success,
    border: '#C8E6C9',
    badgeBackground: theme.success,
    badgeText: '#FFFFFF',
  }),

  info: (theme) => ({
    background: '#E3F2FD',
    text: theme.text,
    accent: theme.info,
    border: '#BBDEFB',
    badgeBackground: theme.info,
    badgeText: '#FFFFFF',
  }),

  muted: (theme) => ({
    background: '#F5F5F5',
    text: theme.textSecondary,
    textSecondary: theme.textSecondary,
    accent: theme.textSecondary,
    border: '#E0E0E0',
  }),

  holiday: (theme) => ({
    background: '#FFF5F5',
    text: '#C41E3A',
    accent: '#228B22',
    border: '#FFD700',
    badgeBackground: '#C41E3A',
    badgeText: '#FFFFFF',
    buttonBackground: '#228B22',
    buttonText: '#FFFFFF',
  }),
};

export interface UseColorSchemeOptions {
  /** Theme colors */
  theme: ThemeColors;
  /** Color scheme name */
  colorScheme?: ColorScheme;
  /** Custom color overrides */
  customColors?: CustomColors;
}

/**
 * Hook to resolve color scheme to actual colors
 */
export function useColorScheme(
  options: UseColorSchemeOptions
): ResolvedColors {
  const { theme, colorScheme = 'default', customColors } = options;

  return useMemo(() => {
    // Start with default colors
    const defaultColors = COLOR_SCHEME_PRESETS.default(theme);

    // Get preset colors if not custom
    const presetColors =
      colorScheme !== 'custom'
        ? COLOR_SCHEME_PRESETS[colorScheme](theme)
        : {};

    // Merge: default <- preset <- custom
    return {
      background: customColors?.background ?? presetColors.background ?? defaultColors.background!,
      text: customColors?.text ?? presetColors.text ?? defaultColors.text!,
      textSecondary: customColors?.textSecondary ?? presetColors.textSecondary ?? defaultColors.textSecondary!,
      accent: customColors?.accent ?? presetColors.accent ?? defaultColors.accent!,
      border: customColors?.border ?? presetColors.border ?? defaultColors.border!,
      icon: customColors?.icon ?? presetColors.icon ?? defaultColors.icon!,
      badgeBackground: customColors?.badgeBackground ?? presetColors.badgeBackground ?? defaultColors.badgeBackground!,
      badgeText: customColors?.badgeText ?? presetColors.badgeText ?? defaultColors.badgeText!,
      buttonBackground: customColors?.buttonBackground ?? presetColors.buttonBackground ?? defaultColors.buttonBackground!,
      buttonText: customColors?.buttonText ?? presetColors.buttonText ?? defaultColors.buttonText!,
    };
  }, [theme, colorScheme, customColors]);
}

/**
 * Helper to get colors from SDUI color props
 */
export function useSDUIColors(
  theme: ThemeColors,
  colorProps?: SDUIColorProps
): ResolvedColors {
  return useColorScheme({
    theme,
    colorScheme: colorProps?.colorScheme,
    customColors: colorProps?.customColors,
  });
}
