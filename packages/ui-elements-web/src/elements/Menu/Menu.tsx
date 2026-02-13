/**
 * Menu Component (Web)
 *
 * A dropdown menu container component for web platform.
 * Implements @groxigo/contracts MenuPropsBase for web platform.
 */

import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { clsx } from 'clsx';
import type { MenuPropsBase, MenuPlacement } from '@groxigo/contracts';
import styles from './Menu.module.css';

// ============================================
// MENU CONTEXT
// ============================================

interface MenuContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  closeOnSelect: boolean;
  autoSelect: boolean;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  itemCount: number;
  setItemCount: (count: number) => void;
  registerItem: () => number;
  placement: string;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu compound components must be used within a Menu component');
  }
  return context;
}

// ============================================
// MENU COMPONENT
// ============================================

export interface MenuProps extends MenuPropsBase {
  className?: string;
  /** Menu content (MenuButton, MenuList, etc.) */
  children?: React.ReactNode;
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      isOpen: controlledIsOpen,
      defaultIsOpen = false,
      placement = 'bottom-start',
      closeOnSelect = true,
      closeOnBlur = true,
      autoSelect = true,
      onOpen,
      onClose,
      children,
      className,
      testID,
    },
    ref
  ) => {
    // Support both controlled and uncontrolled modes
    const [internalIsOpen, setInternalIsOpen] = useState(defaultIsOpen);
    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

    const [activeIndex, setActiveIndex] = useState(-1);
    const [itemCount, setItemCount] = useState(0);
    const itemIndexRef = useRef(0);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const setIsOpen = useCallback(
      (open: boolean) => {
        if (controlledIsOpen === undefined) {
          setInternalIsOpen(open);
        }
        if (open) {
          onOpen?.();
        } else {
          onClose?.();
          setActiveIndex(-1);
        }
      },
      [controlledIsOpen, onOpen, onClose]
    );

    const registerItem = useCallback(() => {
      const index = itemIndexRef.current;
      itemIndexRef.current += 1;
      return index;
    }, []);

    // Reset item registration when menu opens
    useEffect(() => {
      if (isOpen) {
        itemIndexRef.current = 0;
      }
    }, [isOpen]);

    // Handle click outside to close
    useEffect(() => {
      if (!isOpen || !closeOnBlur) return;

      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          menuRef.current &&
          !menuRef.current.contains(target) &&
          buttonRef.current &&
          !buttonRef.current.contains(target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, closeOnBlur, setIsOpen]);

    // Handle Escape key
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
          buttonRef.current?.focus();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, setIsOpen]);

    const contextValue: MenuContextValue = {
      isOpen,
      setIsOpen,
      closeOnSelect,
      autoSelect,
      activeIndex,
      setActiveIndex,
      menuRef,
      buttonRef,
      itemCount,
      setItemCount,
      registerItem,
      placement,
    };

    return (
      <MenuContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={clsx(styles.menu, className)}
          data-testid={testID}
          data-placement={placement}
        >
          {children}
        </div>
      </MenuContext.Provider>
    );
  }
);

Menu.displayName = 'Menu';

export default Menu;
