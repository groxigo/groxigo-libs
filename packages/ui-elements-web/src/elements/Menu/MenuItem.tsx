'use client';

/**
 * MenuItem Component (Web)
 *
 * An individual menu item within MenuList.
 * Implements @groxigo/contracts MenuItemPropsBase for web platform.
 */

import { forwardRef, useCallback, type KeyboardEvent } from 'react';
import { clsx } from 'clsx';
import { useMenuContext } from './Menu';
import type { MenuItemPropsBase } from '@groxigo/contracts';
import styles from './Menu.module.css';

// ============================================
// MENU ITEM COMPONENT
// ============================================

export interface MenuItemProps extends MenuItemPropsBase {
  className?: string;
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
      onPress,
      className,
      testID,
    },
    ref
  ) => {
    const { setIsOpen, closeOnSelect, buttonRef } = useMenuContext();

    const handleClick = useCallback(() => {
      if (disabled) return;

      onPress?.();
      if (closeOnSelect) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }, [disabled, onPress, closeOnSelect, setIsOpen, buttonRef]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => {
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
        className={clsx(
          styles.menuItem,
          !disabled && !isDestructive && undefined,
          !disabled && isDestructive && styles.menuItemDestructive,
          disabled && styles.menuItemDisabled,
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
          <span className={styles.menuItemIcon}>
            {icon}
          </span>
        )}
        <span className={styles.menuItemContent}>{children}</span>
        {rightElement && (
          <span className={styles.menuItemRight}>
            {rightElement}
          </span>
        )}
      </button>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export default MenuItem;
