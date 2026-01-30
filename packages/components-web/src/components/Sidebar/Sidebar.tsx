/**
 * Sidebar Component (Web)
 *
 * Collapsible sidebar navigation with menu items.
 * Supports nested menus and active item highlighting.
 */

'use client';

import React, { forwardRef, useEffect, useRef, useCallback } from 'react';
import { cn, Text, Icon, Badge } from '@groxigo/ui-elements-web';

export interface SidebarItem {
  /** Unique item ID */
  id: string;
  /** Item label */
  label: string;
  /** Icon name */
  icon?: string;
  /** Badge content */
  badge?: string | number;
  /** Click handler */
  onPress?: () => void;
  /** Nested items */
  children?: SidebarItem[];
}

export interface SidebarProps {
  /** Sidebar items */
  items: SidebarItem[];
  /** Currently selected item ID */
  selectedId?: string;
  /** Whether sidebar is open */
  open: boolean;
  /** Callback when sidebar should close */
  onClose: () => void;
  /** Sidebar width in pixels @default 280 */
  width?: number;
  /** Section for theming */
  section?: 'groceries' | 'recipes' | 'default';
  /** Header content to display at top of sidebar */
  header?: React.ReactNode;
  /** Footer content to display at bottom of sidebar */
  footer?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      items,
      selectedId,
      open,
      onClose,
      width = 280,
      section = 'default',
      header,
      footer,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const sidebarRef = useRef<HTMLDivElement>(null);

    // Handle escape key to close sidebar
    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      },
      [onClose]
    );

    // Handle click outside to close
    const handleClickOutside = useCallback(
      (event: MouseEvent) => {
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target as Node)
        ) {
          onClose();
        }
      },
      [onClose]
    );

    useEffect(() => {
      if (open) {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);
        // Prevent body scroll when sidebar is open
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = '';
      };
    }, [open, handleKeyDown, handleClickOutside]);

    // Don't render if not open
    if (!open) return null;

    const renderMenuItem = (item: SidebarItem, level: number = 0) => {
      const isSelected = selectedId === item.id;
      const hasChildren = item.children && item.children.length > 0;

      return (
        <div key={item.id}>
          <button
            type="button"
            role="menuitem"
            aria-current={isSelected ? 'page' : undefined}
            onClick={() => {
              item.onPress?.();
              if (!hasChildren) {
                onClose();
              }
            }}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg',
              'transition-colors duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
              isSelected
                ? 'bg-primary-50 text-primary-600'
                : 'text-text-primary hover:bg-gray-100',
              level > 0 && 'ml-6'
            )}
            style={{ paddingLeft: level > 0 ? `${(level + 1) * 12}px` : undefined }}
          >
            {item.icon && (
              <Icon
                name={item.icon as any}
                size="md"
                className={cn(
                  isSelected ? 'text-primary-500' : 'text-text-secondary'
                )}
              />
            )}
            <Text
              variant="body"
              weight={isSelected ? 'semibold' : 'normal'}
              className="flex-1 text-left"
            >
              {item.label}
            </Text>
            {item.badge && (
              <Badge variant="solid" size="sm" colorScheme="primary" rounded>
                {String(item.badge)}
              </Badge>
            )}
            {hasChildren && (
              <Icon
                name="chevron-right"
                size="sm"
                className="text-text-tertiary"
              />
            )}
          </button>

          {/* Render nested items */}
          {hasChildren && (
            <div className="mt-1">
              {item.children!.map((child) => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          'fixed inset-0 z-50',
          'transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        data-testid={testID}
        {...props}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          aria-hidden="true"
          onClick={onClose}
        />

        {/* Sidebar panel */}
        <aside
          ref={sidebarRef}
          role="navigation"
          aria-label="Sidebar navigation"
          className={cn(
            'absolute top-0 left-0 bottom-0',
            'flex flex-col',
            'bg-surface-primary shadow-xl',
            'transform transition-transform duration-300 ease-out',
            open ? 'translate-x-0' : '-translate-x-full',
            className
          )}
          style={{ width }}
        >
          {/* Close button */}
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className={cn(
              'absolute top-3 right-3',
              'p-1 rounded-full',
              'text-text-secondary hover:text-text-primary hover:bg-gray-100',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
            )}
          >
            <Icon name="close" size="md" />
          </button>

          {/* Header */}
          {header && (
            <div className="px-4 py-4 border-b border-border-default">
              {header}
            </div>
          )}

          {/* Menu items */}
          <nav
            role="menu"
            className="flex-1 overflow-y-auto px-4 py-4"
          >
            <div className="space-y-1">
              {items.map((item) => renderMenuItem(item))}
            </div>
          </nav>

          {/* Footer */}
          {footer && (
            <div className="px-4 py-4 border-t border-border-default">
              {footer}
            </div>
          )}
        </aside>
      </div>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export default Sidebar;
