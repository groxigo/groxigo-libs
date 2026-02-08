/**
 * Text Component (Web)
 *
 * Typography component for web platform.
 * Uses CSS custom properties from @groxigo/tokens for fluid scaling.
 */

import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { TextPropsBase } from '@groxigo/contracts';
import styles from './Text.module.css';

type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';

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

// Align class keys
const alignMap: Record<string, string> = {
  left: 'alignLeft',
  center: 'alignCenter',
  right: 'alignRight',
  justify: 'alignJustify',
};

export interface TextProps extends TextPropsBase {
  as?: TextElement;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = 'body',
      align,
      color,
      truncate,
      children,
      className,
      testID,
      as,
      ...props
    },
    ref
  ) => {
    const Element = as || variantElementMap[variant] || 'span';

    const classes = clsx(
      styles[variant],
      align && styles[alignMap[align]],
      truncate && styles.truncate,
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
