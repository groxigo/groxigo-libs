/**
 * MenuItem Component (Web)
 *
 * An individual menu item within MenuList.
 * Implements @groxigo/contracts MenuItemPropsBase for web platform.
 */

import React, { forwardRef, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { useMenuContext } from './Menu';
import type { MenuItemPropsBase } from '@groxigo/contracts';

// ============================================
// MENU ITEM COMPONENT
// ============================================

export interface MenuItemProps extends MenuItemPropsBase {
  /** Test ID */
  testID?: string;
}

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  (
    {
      value,
      children,
      icon,
      rightElement,
      disabled = false,
      isDestructive = false,
      onClick,
      className,
      testID,
    },
    ref
  ) => {
    const { setIsOpen, closeOnSelect, buttonRef } = useMenuContext();

    const handleClick = useCallback(() => {
      if (disabled) return;

      onClick?.();
      if (closeOnSelect) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }, [disabled, onClick, closeOnSelect, setIsOpen, buttonRef]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;

        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      },
      [disabled, handleClick]
    );

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'w-full flex items-center gap-3 px-3 py-2',
          'text-sm text-left',
          'transition-colors duration-150',
          // Normal state
          !disabled && !isDestructive && [
            'text-text-primary',
            'hover:bg-surface-secondary',
            'focus:bg-surface-secondary focus:outline-none',
          ],
          // Destructive state
          !disabled && isDestructive && [
            'text-error',
            'hover:bg-error/10',
            'focus:bg-error/10 focus:outline-none',
          ],
          // Disabled state
          disabled && 'text-text-tertiary cursor-not-allowed',
          className
        )}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        data-value={value}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        data-testid={testID}
      >
        {icon && (
          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
            {icon}
          </span>
        )}
        <span className="flex-1">{children}</span>
        {rightElement && (
          <span className="flex-shrink-0 ml-auto pl-4 text-text-secondary">
            {rightElement}
          </span>
        )}
      </button>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export default MenuItem;
