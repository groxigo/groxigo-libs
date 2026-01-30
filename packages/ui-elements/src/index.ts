/**
 * @groxigo/ui-elements
 *
 * Primitive UI building blocks for cross-platform React Native applications.
 * Theme-driven components that work seamlessly across iOS, Android, and Web.
 */

// ============================================
// THEME SYSTEM
// ============================================

export {
  ThemeProvider,
  ThemeContext,
  defaultTheme,
  lightTheme,
  darkTheme,
} from './theme';

export type {
  ThemeProviderProps,
  Theme,
  PartialTheme,
  ThemeColors,
  ThemeSpacing,
  ThemeTypography,
  ThemeRadius,
  ThemeShadows,
  ThemeShadow,
  ThemeAnimation,
  ThemeBreakpoints,
  ThemeZIndex,
  ThemeComponentDefaults,
  ThemeContextValue,
  ThemeFontSizes,
  ThemeFontWeights,
  ThemeLineHeights,
  ThemeLetterSpacing,
  ColorScale,
  StateColors,
  StatusColors,
  Breakpoint,
  ResponsiveValue,
  ResponsiveInfo,
  DeepPartial,
} from './theme';

// ============================================
// HOOKS
// ============================================

export {
  // Theme hooks
  useTheme,
  useThemeContext,
  useColors,
  useSpacing,
  useTypography,
  useRadius,
  useShadows,
  useIsDarkMode,
  // Responsive hooks
  useResponsive,
  useWindowDimensions,
  useResponsiveValue,
  useResponsiveStyles,
  useBreakpoint,
  usePlatformValue,
  // Color scheme
  useColorScheme,
} from './hooks';

// ============================================
// UI ELEMENTS
// ============================================

// Typography
export * from './elements/Text';

// Buttons & Actions
export * from './elements/Button';
export * from './elements/Link';

// Layout
export * from './elements/Card';
export * from './elements/Divider';
export * from './elements/Spacer';

// Data Display
export * from './elements/Avatar';
export * from './elements/Badge';
export * from './elements/Icon';
export * from './elements/Image';

// Form Inputs
export * from './elements/Input';
export * from './elements/TextArea';
export * from './elements/Checkbox';
export * from './elements/Radio';
export * from './elements/Switch';
export * from './elements/Select';
export * from './elements/Slider';

// Feedback
export * from './elements/Spinner';
export * from './elements/Progress';
export * from './elements/Skeleton';
export * from './elements/Toast';

// Navigation
export * from './elements/Tabs';
export * from './elements/Breadcrumb';

// Overlays
export * from './elements/Modal';
export * from './elements/Drawer';
export * from './elements/Menu';
export * from './elements/Tooltip';

// ============================================
// UTILITIES
// ============================================

export { Container } from './utils/Container';
export type { ContainerProps } from './utils/Container';
export * from './utils/responsive';
