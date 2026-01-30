/**
 * Text Component (Web)
 *
 * Typography component for web platform.
 * Features responsive typography that scales for tablets/desktops.
 */

import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { TextVariant, TextWeight, TextAlign, TextColorScheme } from '@groxigo/contracts';

type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';

// Base variant classes (phone size)
const variantClasses: Record<string, string> = {
  h1: 'text-4xl leading-tight',
  h2: 'text-3xl leading-tight',
  h3: 'text-2xl leading-snug',
  h4: 'text-xl leading-snug',
  h5: 'text-lg leading-normal',
  h6: 'text-md leading-normal',
  body: 'text-base leading-relaxed',
  bodyLarge: 'text-md leading-relaxed',
  bodySmall: 'text-sm leading-relaxed',
  caption: 'text-xs leading-normal',
  label: 'text-sm leading-normal',
  overline: 'text-xs uppercase tracking-wider leading-normal',
};

// Responsive variant classes (scales up on md/lg/xl screens)
// Uses Tailwind responsive prefixes to match mobile responsive scaling
const responsiveVariantClasses: Record<string, string> = {
  // Headings scale more (matching 1.8x max on large screens)
  h1: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight',
  h2: 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight',
  h3: 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug',
  h4: 'text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-snug',
  h5: 'text-lg md:text-xl lg:text-2xl xl:text-3xl leading-normal',
  h6: 'text-md md:text-lg lg:text-xl xl:text-2xl leading-normal',
  // Body scales moderately (matching 1.6x max)
  body: 'text-base md:text-lg lg:text-xl leading-relaxed',
  bodyLarge: 'text-md md:text-lg lg:text-xl xl:text-2xl leading-relaxed',
  bodySmall: 'text-sm md:text-base lg:text-lg leading-relaxed',
  // Captions scale more for readability (matching 1.75x max)
  caption: 'text-xs md:text-sm lg:text-base leading-normal',
  label: 'text-sm md:text-base lg:text-lg leading-normal',
  overline: 'text-xs md:text-sm lg:text-base uppercase tracking-wider leading-normal',
};

// Weight to Tailwind classes
const weightClasses: Record<string, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

// Color scheme to Tailwind classes
const colorSchemeClasses: Record<string, string> = {
  default: 'text-text-primary',
  primary: 'text-primary-600',
  secondary: 'text-secondary-600',
  accent: 'text-accent-600',
  success: 'text-success',
  warning: 'text-warning-dark',
  error: 'text-error',
  info: 'text-info',
  muted: 'text-text-secondary',
};

// Alignment to Tailwind classes
const alignClasses: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

// Variant to element mapping
const variantElementMap: Record<string, TextElement> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  bodyLarge: 'p',
  bodySmall: 'p',
  caption: 'span',
  label: 'label',
  overline: 'span',
};

export interface TextProps {
  variant?: TextVariant;
  weight?: TextWeight;
  align?: TextAlign;
  colorScheme?: TextColorScheme;
  color?: string;
  truncate?: boolean;
  /**
   * Whether to apply responsive font scaling for tablets/large screens
   * When true, font sizes automatically scale up on larger devices
   * @default true
   */
  responsive?: boolean;
  children?: React.ReactNode;
  className?: string;
  testID?: string;
  as?: TextElement;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = 'body',
      weight = 'normal',
      align,
      colorScheme = 'default',
      color,
      truncate,
      responsive = true,
      children,
      className,
      testID,
      as,
      ...props
    },
    ref
  ) => {
    const Element = as || variantElementMap[variant] || 'span';

    // Use responsive classes if responsive prop is true
    const sizeClasses = responsive
      ? responsiveVariantClasses[variant]
      : variantClasses[variant];

    const classes = cn(
      sizeClasses,
      weightClasses[weight],
      !color && colorSchemeClasses[colorScheme],
      align && alignClasses[align],
      truncate && 'truncate',
      className
    );

    return React.createElement(
      Element,
      {
        ref,
        className: classes,
        style: color ? { color } : undefined,
        'data-testid': testID,
        ...props,
      },
      children
    );
  }
);

Text.displayName = 'Text';

export default Text;
