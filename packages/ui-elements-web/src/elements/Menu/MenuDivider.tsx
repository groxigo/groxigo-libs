'use client';

/**
 * MenuDivider Component (Web)
 *
 * A divider/separator for menu items.
 * Implements @groxigo/contracts MenuDividerPropsBase for web platform.
 */

import { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { MenuDividerPropsBase } from '@groxigo/contracts';
import styles from './Menu.module.css';

// ============================================
// MENU DIVIDER COMPONENT
// ============================================

export interface MenuDividerProps extends MenuDividerPropsBase {
  className?: string;
  /** Test ID */
  testID?: string;
}

export const MenuDivider = forwardRef<HTMLHRElement, MenuDividerProps>(
  ({ className, testID }, ref) => {
    return (
      <hr
        ref={ref}
        className={clsx(styles.menuDivider, className)}
        role="separator"
        data-testid={testID}
      />
    );
  }
);

MenuDivider.displayName = 'MenuDivider';

export default MenuDivider;
