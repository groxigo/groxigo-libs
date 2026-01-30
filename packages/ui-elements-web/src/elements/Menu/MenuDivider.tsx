/**
 * MenuDivider Component (Web)
 *
 * A divider/separator for menu items.
 * Implements @groxigo/contracts MenuDividerPropsBase for web platform.
 */

import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { MenuDividerPropsBase } from '@groxigo/contracts';

// ============================================
// MENU DIVIDER COMPONENT
// ============================================

export interface MenuDividerProps extends MenuDividerPropsBase {
  /** Test ID */
  testID?: string;
}

export const MenuDivider = forwardRef<HTMLHRElement, MenuDividerProps>(
  ({ className, testID }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn('my-1 border-t border-border', className)}
        role="separator"
        data-testid={testID}
      />
    );
  }
);

MenuDivider.displayName = 'MenuDivider';

export default MenuDivider;
