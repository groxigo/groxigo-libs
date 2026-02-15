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
