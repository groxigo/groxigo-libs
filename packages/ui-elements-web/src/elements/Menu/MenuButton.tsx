'use client';

/**
 * MenuButton Component (Web)
 *
 * The trigger button for the Menu component.
 * Implements @groxigo/contracts MenuButtonPropsBase for web platform.
 */

import React, { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react';
import { clsx } from 'clsx';
import { useMenuContext } from './Menu';
import type { MenuButtonPropsBase } from '@groxigo/contracts';
import styles from './Menu.module.css';

// ============================================
// MENU BUTTON COMPONENT
// ============================================

export interface MenuButtonProps extends MenuButtonPropsBase {
  className?: string;
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
  /** Whether button is disabled */
  disabled?: boolean;
  /** Test ID */
  testID?: string;
}

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  (
    {
      children,
      showIcon = true,
      className,
      type = 'button',
      disabled = false,
      testID,
    },
    ref
  ) => {
    const { isOpen, setIsOpen, buttonRef, menuRef, setActiveIndex, autoSelect, itemCount } =
      useMenuContext();

    // Sync the forwarded ref with the context ref
    useImperativeHandle(ref, () => buttonRef.current!, [buttonRef]);

    const handleClick = useCallback(() => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    }, [disabled, isOpen, setIsOpen]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;

        switch (e.key) {
          case 'ArrowDown':
          case 'Enter':
          case ' ':
            e.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
              if (autoSelect) {
                setActiveIndex(0);
              }
            }
            break;
          case 'ArrowUp':
            e.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
              if (autoSelect) {
                setActiveIndex(itemCount - 1);
              }
            }
            break;
        }
      },
      [disabled, isOpen, setIsOpen, autoSelect, setActiveIndex, itemCount]
    );

    // Focus first item when menu opens with autoSelect
    useEffect(() => {
      if (isOpen && autoSelect && menuRef.current) {
        const firstItem = menuRef.current.querySelector('[role="menuitem"]:not([aria-disabled="true"])');
        if (firstItem instanceof HTMLElement) {
          firstItem.focus();
        }
      }
    }, [isOpen, autoSelect, menuRef]);

    return (
      <button
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
        type={type}
        className={clsx(styles.menuButton, className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        data-testid={testID}
      >
        {children}
        {showIcon && (
          <svg
            className={clsx(
              styles.menuButtonIcon,
              isOpen && styles.menuButtonIconOpen
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </button>
    );
  }
);

MenuButton.displayName = 'MenuButton';

export default MenuButton;
