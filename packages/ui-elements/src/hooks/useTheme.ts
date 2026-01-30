/**
 * useTheme Hook
 *
 * Access the current theme from any component.
 */

import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeContext';
import type { Theme, ThemeContextValue } from '../theme/types';

/**
 * Hook to access the full theme context
 */
export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  return context;
}

/**
 * Hook to access the current theme
 */
export function useTheme(): Theme {
  const { theme } = useThemeContext();
  return theme;
}

/**
 * Hook to access theme colors
 */
export function useColors() {
  const theme = useTheme();
  return theme.colors;
}

/**
 * Hook to access theme spacing
 */
export function useSpacing() {
  const theme = useTheme();
  return theme.spacing;
}

/**
 * Hook to access theme typography
 */
export function useTypography() {
  const theme = useTheme();
  return theme.typography;
}

/**
 * Hook to access theme radius
 */
export function useRadius() {
  const theme = useTheme();
  return theme.radius;
}

/**
 * Hook to access theme shadows
 */
export function useShadows() {
  const theme = useTheme();
  return theme.shadows;
}

/**
 * Hook to access theme animation tokens
 */
export function useAnimation() {
  const theme = useTheme();
  return theme.animation;
}

/**
 * Hook to access theme z-index tokens
 */
export function useZIndex() {
  const theme = useTheme();
  return theme.zIndex;
}

/**
 * Hook to access theme border tokens
 */
export function useBorder() {
  const theme = useTheme();
  return theme.border;
}

/**
 * Hook to access theme icon tokens
 */
export function useIcon() {
  const theme = useTheme();
  return theme.icon;
}

/**
 * Hook to access theme focus tokens (for accessibility)
 */
export function useFocus() {
  const theme = useTheme();
  return theme.focus;
}

/**
 * Hook to access theme blur tokens
 */
export function useBlur() {
  const theme = useTheme();
  return theme.blur;
}

/**
 * Hook to access theme opacity tokens
 */
export function useOpacity() {
  const theme = useTheme();
  return theme.opacity;
}

/**
 * Hook to access theme text styles presets
 */
export function useTextStyles() {
  const theme = useTheme();
  return theme.textStyles;
}

/**
 * Hook to access theme breakpoints
 */
export function useBreakpoints() {
  const theme = useTheme();
  return theme.breakpoints;
}

/**
 * Hook to check if dark mode is active
 */
export function useIsDarkMode(): boolean {
  const { colorScheme } = useThemeContext();
  return colorScheme === 'dark';
}

export default useTheme;
