/**
 * useColorScheme Hook
 *
 * Access and control the current color scheme (light/dark mode).
 */

import { useThemeContext } from './useTheme';

/**
 * Hook to access and control color scheme
 */
export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useThemeContext();

  return {
    /**
     * Current color scheme ('light' or 'dark')
     */
    colorScheme,

    /**
     * Whether dark mode is currently active
     */
    isDark: colorScheme === 'dark',

    /**
     * Whether light mode is currently active
     */
    isLight: colorScheme === 'light',

    /**
     * Set the color scheme
     */
    setColorScheme,

    /**
     * Toggle between light and dark mode
     */
    toggleColorScheme,

    /**
     * Set to light mode
     */
    setLight: () => setColorScheme('light'),

    /**
     * Set to dark mode
     */
    setDark: () => setColorScheme('dark'),
  };
}

export default useColorScheme;
