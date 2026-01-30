/**
 * MenuList Component (Web)
 *
 * The container for menu items.
 * Implements @groxigo/contracts MenuListPropsBase for web platform.
 */

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, Children } from 'react';
import { cn } from '../../utils/cn';
import { useMenuContext } from './Menu';
import type { MenuListPropsBase } from '@groxigo/contracts';

// ============================================
// MENU LIST COMPONENT
// ============================================

export interface MenuListProps extends MenuListPropsBase {
  /** Test ID */
  testID?: string;
}

// Placement position classes
const placementClasses: Record<string, string> = {
  'top': 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  'top-start': 'bottom-full left-0 mb-2',
  'top-end': 'bottom-full right-0 mb-2',
  'bottom': 'top-full left-1/2 -translate-x-1/2 mt-2',
  'bottom-start': 'top-full left-0 mt-2',
  'bottom-end': 'top-full right-0 mt-2',
  'left': 'right-full top-1/2 -translate-y-1/2 mr-2',
  'left-start': 'right-full top-0 mr-2',
  'left-end': 'right-full bottom-0 mr-2',
  'right': 'left-full top-1/2 -translate-y-1/2 ml-2',
  'right-start': 'left-full top-0 ml-2',
  'right-end': 'left-full bottom-0 ml-2',
};

export const MenuList = forwardRef<HTMLDivElement, MenuListProps>(
  ({ children, className, testID }, ref) => {
    const {
      isOpen,
      setIsOpen,
      menuRef,
      buttonRef,
      activeIndex,
      setActiveIndex,
      closeOnSelect,
      setItemCount,
    } = useMenuContext();

    // Sync the forwarded ref with the context ref
    useImperativeHandle(ref, () => menuRef.current!, [menuRef]);

    // Count menu items (excluding dividers)
    const itemChildren = Children.toArray(children).filter(
      (child) =>
        React.isValidElement(child) &&
        (child.type as React.ComponentType)?.displayName !== 'MenuDivider'
    );
    const itemCountValue = itemChildren.length;

    // Update item count in context
    useEffect(() => {
      setItemCount(itemCountValue);
    }, [itemCountValue, setItemCount]);

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const menuItems = menuRef.current?.querySelectorAll(
          '[role="menuitem"]:not([aria-disabled="true"])'
        );
        if (!menuItems) return;

        const itemsArray = Array.from(menuItems) as HTMLElement[];
        const currentIndex = itemsArray.findIndex((item) => item === document.activeElement);

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            const nextIndex = currentIndex < itemsArray.length - 1 ? currentIndex + 1 : 0;
            itemsArray[nextIndex]?.focus();
            setActiveIndex(nextIndex);
            break;

          case 'ArrowUp':
            e.preventDefault();
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : itemsArray.length - 1;
            itemsArray[prevIndex]?.focus();
            setActiveIndex(prevIndex);
            break;

          case 'Home':
            e.preventDefault();
            itemsArray[0]?.focus();
            setActiveIndex(0);
            break;

          case 'End':
            e.preventDefault();
            itemsArray[itemsArray.length - 1]?.focus();
            setActiveIndex(itemsArray.length - 1);
            break;

          case 'Tab':
            // Allow tab to close menu and move focus
            setIsOpen(false);
            break;

          case 'Escape':
            e.preventDefault();
            setIsOpen(false);
            buttonRef.current?.focus();
            break;
        }
      },
      [menuRef, buttonRef, setIsOpen, setActiveIndex]
    );

    // Get placement from parent
    const parent = menuRef.current?.parentElement;
    const placement = parent?.dataset?.placement || 'bottom-start';

    if (!isOpen) return null;

    return (
      <div
        ref={menuRef as React.RefObject<HTMLDivElement>}
        className={cn(
          'absolute z-50 min-w-[180px] max-w-[280px]',
          'py-1 rounded-md shadow-lg',
          'bg-surface-primary border border-border',
          'focus:outline-none',
          'animate-in fade-in-0 zoom-in-95 duration-150',
          placementClasses[placement],
          className
        )}
        role="menu"
        aria-orientation="vertical"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        data-testid={testID}
      >
        {children}
      </div>
    );
  }
);

MenuList.displayName = 'MenuList';

export default MenuList;
