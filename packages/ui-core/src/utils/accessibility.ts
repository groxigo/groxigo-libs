/**
 * Accessibility Utilities
 *
 * Shared utilities for accessibility features.
 */

/**
 * Standard ARIA roles for components
 */
export const ariaRoles = {
  button: 'button',
  link: 'link',
  checkbox: 'checkbox',
  radio: 'radio',
  switch: 'switch',
  slider: 'slider',
  tab: 'tab',
  tablist: 'tablist',
  tabpanel: 'tabpanel',
  menu: 'menu',
  menuitem: 'menuitem',
  menubar: 'menubar',
  listbox: 'listbox',
  option: 'option',
  combobox: 'combobox',
  dialog: 'dialog',
  alertdialog: 'alertdialog',
  tooltip: 'tooltip',
  progressbar: 'progressbar',
  alert: 'alert',
  status: 'status',
  img: 'img',
  textbox: 'textbox',
  group: 'group',
  separator: 'separator',
} as const;

/**
 * Generate ARIA props for a component
 */
export interface AriaProps {
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-selected'?: boolean;
  'aria-checked'?: boolean | 'mixed';
  'aria-disabled'?: boolean;
  'aria-hidden'?: boolean;
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
  'aria-readonly'?: boolean;
  'aria-busy'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-atomic'?: boolean;
  'aria-relevant'?: 'additions' | 'removals' | 'text' | 'all';
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  'aria-controls'?: string;
  'aria-owns'?: string;
  'aria-activedescendant'?: string;
  'aria-valuemin'?: number;
  'aria-valuemax'?: number;
  'aria-valuenow'?: number;
  'aria-valuetext'?: string;
  tabIndex?: number;
}

/**
 * Create checkbox ARIA props
 */
export function getCheckboxAriaProps(options: {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  labelId?: string;
  errorId?: string;
}): AriaProps {
  const { checked, indeterminate, disabled, required, invalid, labelId, errorId } = options;

  return {
    role: ariaRoles.checkbox,
    'aria-checked': indeterminate ? 'mixed' : checked,
    'aria-disabled': disabled,
    'aria-required': required,
    'aria-invalid': invalid,
    'aria-labelledby': labelId,
    'aria-describedby': errorId,
    tabIndex: disabled ? -1 : 0,
  };
}

/**
 * Create radio ARIA props
 */
export function getRadioAriaProps(options: {
  checked?: boolean;
  disabled?: boolean;
  labelId?: string;
}): AriaProps {
  const { checked, disabled, labelId } = options;

  return {
    role: ariaRoles.radio,
    'aria-checked': checked,
    'aria-disabled': disabled,
    'aria-labelledby': labelId,
    tabIndex: disabled ? -1 : checked ? 0 : -1,
  };
}

/**
 * Create switch ARIA props
 */
export function getSwitchAriaProps(options: {
  checked?: boolean;
  disabled?: boolean;
  labelId?: string;
}): AriaProps {
  const { checked, disabled, labelId } = options;

  return {
    role: ariaRoles.switch,
    'aria-checked': checked,
    'aria-disabled': disabled,
    'aria-labelledby': labelId,
    tabIndex: disabled ? -1 : 0,
  };
}

/**
 * Create slider ARIA props
 */
export function getSliderAriaProps(options: {
  value: number;
  min: number;
  max: number;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  valueText?: string;
}): AriaProps {
  const { value, min, max, disabled, label, valueText } = options;

  return {
    role: ariaRoles.slider,
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': value,
    'aria-valuetext': valueText,
    'aria-disabled': disabled,
    'aria-label': label,
    tabIndex: disabled ? -1 : 0,
  };
}

/**
 * Create progress ARIA props
 */
export function getProgressAriaProps(options: {
  value?: number;
  min?: number;
  max?: number;
  label?: string;
  indeterminate?: boolean;
}): AriaProps {
  const { value, min = 0, max = 100, label, indeterminate } = options;

  const props: AriaProps = {
    role: ariaRoles.progressbar,
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-label': label,
  };

  if (!indeterminate && value !== undefined) {
    props['aria-valuenow'] = value;
    props['aria-valuetext'] = `${Math.round((value / max) * 100)}%`;
  }

  return props;
}

/**
 * Create modal ARIA props
 */
export function getModalAriaProps(options: {
  titleId?: string;
  descriptionId?: string;
  isAlert?: boolean;
}): AriaProps & { 'aria-modal'?: boolean } {
  const { titleId, descriptionId, isAlert } = options;

  return {
    role: isAlert ? ariaRoles.alertdialog : ariaRoles.dialog,
    'aria-modal': true,
    'aria-labelledby': titleId,
    'aria-describedby': descriptionId,
  };
}

/**
 * Create tab list ARIA props
 */
export function getTabListAriaProps(options: {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
}): AriaProps {
  const { label } = options;

  return {
    role: ariaRoles.tablist,
    'aria-label': label,
  };
}

/**
 * Create tab ARIA props
 */
export function getTabAriaProps(options: {
  selected?: boolean;
  disabled?: boolean;
  panelId?: string;
}): AriaProps {
  const { selected, disabled, panelId } = options;

  return {
    role: ariaRoles.tab,
    'aria-selected': selected,
    'aria-disabled': disabled,
    'aria-controls': panelId,
    tabIndex: selected ? 0 : -1,
  };
}

/**
 * Create tab panel ARIA props
 */
export function getTabPanelAriaProps(options: {
  tabId?: string;
  hidden?: boolean;
}): AriaProps {
  const { tabId, hidden } = options;

  return {
    role: ariaRoles.tabpanel,
    'aria-labelledby': tabId,
    'aria-hidden': hidden,
    tabIndex: hidden ? -1 : 0,
  };
}

/**
 * Create tooltip ARIA props
 */
export function getTooltipAriaProps(): AriaProps {
  return {
    role: ariaRoles.tooltip,
  };
}

/**
 * Create menu ARIA props
 */
export function getMenuAriaProps(options: {
  label?: string;
}): AriaProps {
  const { label } = options;

  return {
    role: ariaRoles.menu,
    'aria-label': label,
  };
}

/**
 * Create menu item ARIA props
 */
export function getMenuItemAriaProps(options: {
  disabled?: boolean;
}): AriaProps {
  const { disabled } = options;

  return {
    role: ariaRoles.menuitem,
    'aria-disabled': disabled,
    tabIndex: disabled ? -1 : 0,
  };
}
