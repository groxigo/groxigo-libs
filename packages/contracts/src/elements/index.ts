/**
 * UI Element Contracts
 *
 * Platform-agnostic interfaces for primitive UI components.
 * Both React Native and Web implementations must conform to these contracts.
 */

// Text
export type {
  TextVariant,
  TextWeight,
  TextAlign,
  TextColorScheme,
  TextPropsBase,
} from './text';

// Button
export type {
  ButtonVariant,
  ButtonColorScheme,
  ButtonSize,
  ButtonPropsBase,
} from './button';

// Badge
export type {
  BadgeVariant,
  BadgeColorScheme,
  BadgeSize,
  BadgePropsBase,
} from './badge';

// Input
export type {
  InputVariant,
  InputSize,
  InputPropsBase,
} from './input';

// Card
export type {
  CardVariant,
  CardSize,
  CardPropsBase,
  CardHeaderPropsBase,
  CardBodyPropsBase,
  CardFooterPropsBase,
} from './card';

// Image
export type {
  ImageResizeMode,
  ImagePropsBase,
} from './image';

// Spinner
export type {
  SpinnerSize,
  SpinnerColorScheme,
  SpinnerPropsBase,
} from './spinner';

// Skeleton
export type {
  SkeletonVariant,
  SkeletonPropsBase,
} from './skeleton';

// Icon
export type {
  IconSize,
  IconColorScheme,
  IconName,
  IconPropsBase,
} from './icon';

// Avatar
export type {
  AvatarSize,
  AvatarVariant,
  AvatarPropsBase,
  AvatarGroupPropsBase,
} from './avatar';

// Checkbox
export type {
  CheckboxSize,
  CheckboxColorScheme,
  CheckboxPropsBase,
  CheckboxGroupPropsBase,
} from './checkbox';

// Radio
export type {
  RadioSize,
  RadioColorScheme,
  RadioPropsBase,
  RadioGroupPropsBase,
} from './radio';

// Switch
export type {
  SwitchSize,
  SwitchColorScheme,
  SwitchPropsBase,
} from './switch';

// Select
export type {
  SelectSize,
  SelectVariant,
  SelectOption,
  SelectPropsBase,
} from './select';

// Divider
export type {
  DividerOrientation,
  DividerVariant,
  DividerPropsBase,
} from './divider';

// Progress
export type {
  ProgressSize,
  ProgressColorScheme,
  ProgressVariant,
  ProgressPropsBase,
  CircularProgressPropsBase,
} from './progress';

// Slider
export type {
  SliderSize,
  SliderColorScheme,
  SliderOrientation,
  SliderPropsBase,
  RangeSliderPropsBase,
} from './slider';

// Modal
export type {
  ModalSize,
  ModalPlacement,
  ModalPropsBase,
  ModalHeaderPropsBase,
  ModalBodyPropsBase,
  ModalFooterPropsBase,
  AlertDialogPropsBase,
} from './modal';

// Drawer
export type {
  DrawerPlacement,
  DrawerSize,
  DrawerPropsBase,
  DrawerHeaderPropsBase,
  DrawerBodyPropsBase,
  DrawerFooterPropsBase,
} from './drawer';

// Tabs
export type {
  TabsVariant,
  TabsSize,
  TabsColorScheme,
  TabsOrientation,
  TabsAlign,
  TabItem,
  TabsPropsBase,
  TabListPropsBase,
  TabPropsBase,
  TabPanelsPropsBase,
  TabPanelPropsBase,
} from './tabs';

// Toast
export type {
  ToastStatus,
  ToastPosition,
  ToastVariant,
  ToastOptions,
  ToastPropsBase,
  UseToastReturn,
  ToastProviderPropsBase,
} from './toast';

// Tooltip
export type {
  TooltipPlacement,
  TooltipPropsBase,
} from './tooltip';

// Menu
export type {
  MenuPlacement,
  MenuItem,
  MenuPropsBase,
  MenuButtonPropsBase,
  MenuListPropsBase,
  MenuItemPropsBase,
  MenuGroupPropsBase,
  MenuDividerPropsBase,
} from './menu';

// TextArea
export type {
  TextAreaSize,
  TextAreaVariant,
  TextAreaResize,
  TextAreaPropsBase,
} from './textarea';

// Link
export type {
  LinkColorScheme,
  LinkPropsBase,
} from './link';

// Breadcrumb
export type {
  BreadcrumbItem,
  BreadcrumbPropsBase,
  BreadcrumbItemPropsBase,
  BreadcrumbSeparatorPropsBase,
} from './breadcrumb';

// Spacer
export type {
  SpacerPropsBase,
} from './spacer';
