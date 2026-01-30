/**
 * Shared Utilities
 *
 * Platform-agnostic utilities for UI components.
 */

// ClassNames
export { cn, classNames, clsx } from './classnames';

// Styles
export {
  mergeStyles,
  extractStyleProps,
  pxToRem,
  remToPx,
  clamp,
  lerp,
  mapRange,
  parseStyleValue,
  toKebabCase,
  toCamelCase,
} from './styles';

// Accessibility
export {
  ariaRoles,
  type AriaProps,
  getCheckboxAriaProps,
  getRadioAriaProps,
  getSwitchAriaProps,
  getSliderAriaProps,
  getProgressAriaProps,
  getModalAriaProps,
  getTabListAriaProps,
  getTabAriaProps,
  getTabPanelAriaProps,
  getTooltipAriaProps,
  getMenuAriaProps,
  getMenuItemAriaProps,
} from './accessibility';
