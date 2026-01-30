/**
 * Tabs Component (Web)
 *
 * A compound tabs component that supports controlled and uncontrolled modes.
 * Implements @groxigo/contracts TabsPropsBase for web platform.
 */

'use client';

import React, {
  forwardRef,
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import type {
  TabsPropsBase,
  TabsVariant,
  TabsSize,
  TabsColorScheme,
  TabsOrientation,
  TabItem,
} from '@groxigo/contracts';

// ============================================
// CONTEXT
// ============================================

interface TabsContextValue {
  value: string;
  onChange: (key: string) => void;
  variant: TabsVariant;
  size: TabsSize;
  colorScheme: TabsColorScheme;
  orientation: TabsOrientation;
  isFitted: boolean;
  isManual: boolean;
  isLazy: boolean;
  keepMounted: boolean;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within a Tabs component');
  }
  return context;
}

// ============================================
// SIZE CLASSES
// ============================================

const sizeClasses: Record<TabsSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

// ============================================
// VARIANT CLASSES
// ============================================

const containerVariantClasses: Record<TabsVariant, string> = {
  line: 'border-b border-gray-200',
  enclosed: 'border border-gray-200 rounded-lg p-1 bg-gray-50',
  'soft-rounded': '',
  'solid-rounded': 'bg-gray-100 p-1 rounded-lg',
  unstyled: '',
};

// ============================================
// TABS COMPONENT
// ============================================

export interface TabsProps extends TabsPropsBase {
  /** HTML id attribute */
  id?: string;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value,
      defaultValue,
      items,
      variant = 'line',
      size = 'md',
      colorScheme = 'primary',
      orientation = 'horizontal',
      align = 'start',
      isFitted = false,
      isLazy = false,
      keepMounted = false,
      isManual = false,
      onChange,
      children,
      className,
      testID,
      id,
    },
    ref
  ) => {
    // Uncontrolled state
    const [internalValue, setInternalValue] = useState(
      defaultValue || (items && items.length > 0 ? items[0].key : '')
    );

    // Determine if controlled
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const handleChange = useCallback(
      (key: string) => {
        if (!isControlled) {
          setInternalValue(key);
        }
        onChange?.(key);
      },
      [isControlled, onChange]
    );

    const contextValue = useMemo<TabsContextValue>(
      () => ({
        value: currentValue,
        onChange: handleChange,
        variant,
        size,
        colorScheme,
        orientation,
        isFitted,
        isManual,
        isLazy,
        keepMounted,
      }),
      [
        currentValue,
        handleChange,
        variant,
        size,
        colorScheme,
        orientation,
        isFitted,
        isManual,
        isLazy,
        keepMounted,
      ]
    );

    const orientationClasses =
      orientation === 'vertical' ? 'flex-row' : 'flex-col';

    // Render using items prop if provided
    if (items && items.length > 0) {
      return (
        <TabsContext.Provider value={contextValue}>
          <div
            ref={ref}
            id={id}
            className={cn('flex', orientationClasses, className)}
            data-testid={testID}
          >
            <div
              role="tablist"
              aria-orientation={orientation}
              className={cn(
                'flex',
                orientation === 'vertical' ? 'flex-col' : 'flex-row',
                containerVariantClasses[variant],
                sizeClasses[size]
              )}
            >
              {items.map((item: TabItem) => (
                <TabButton
                  key={item.key}
                  value={item.key}
                  disabled={item.disabled}
                  icon={item.icon}
                >
                  {item.label}
                  {item.badge}
                </TabButton>
              ))}
            </div>
            <div className="mt-4">
              {items.map((item: TabItem) => (
                <div
                  key={item.key}
                  role="tabpanel"
                  hidden={currentValue !== item.key}
                  id={`tabpanel-${item.key}`}
                  aria-labelledby={`tab-${item.key}`}
                >
                  {(!isLazy || currentValue === item.key || keepMounted) &&
                    item.content}
                </div>
              ))}
            </div>
          </div>
        </TabsContext.Provider>
      );
    }

    // Render using children (compound components)
    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          id={id}
          className={cn('flex', orientationClasses, className)}
          data-testid={testID}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

// ============================================
// INTERNAL TAB BUTTON (for items prop)
// ============================================

interface TabButtonProps {
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
}

function TabButton({ value, disabled, icon, children }: TabButtonProps) {
  const { value: selectedValue, onChange, variant, size, colorScheme, isFitted } =
    useTabsContext();

  const isSelected = selectedValue === value;

  const handleClick = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  const baseClasses =
    'flex items-center gap-2 px-4 py-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = getTabVariantClasses(variant, colorScheme, isSelected);
  const sizeClass = sizeClasses[size];

  return (
    <button
      type="button"
      role="tab"
      id={`tab-${value}`}
      aria-selected={isSelected}
      aria-controls={`tabpanel-${value}`}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        baseClasses,
        variantClasses,
        sizeClass,
        isFitted && 'flex-1',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {icon}
      {children}
    </button>
  );
}

// ============================================
// VARIANT CLASS HELPERS
// ============================================

function getTabVariantClasses(
  variant: TabsVariant,
  colorScheme: TabsColorScheme,
  isSelected: boolean
): string {
  const colorMap: Record<TabsColorScheme, { active: string; ring: string }> = {
    primary: { active: 'text-primary-600', ring: 'focus:ring-primary-500' },
    secondary: { active: 'text-secondary-600', ring: 'focus:ring-secondary-500' },
    accent: { active: 'text-accent-600', ring: 'focus:ring-accent-500' },
    gray: { active: 'text-gray-700', ring: 'focus:ring-gray-500' },
  };

  const colors = colorMap[colorScheme];

  switch (variant) {
    case 'line':
      return cn(
        'border-b-2 -mb-px',
        isSelected
          ? cn('border-current', colors.active)
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        colors.ring
      );

    case 'enclosed':
      return cn(
        'rounded-md',
        isSelected
          ? cn('bg-white shadow-sm', colors.active)
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
        colors.ring
      );

    case 'soft-rounded':
      return cn(
        'rounded-full',
        isSelected
          ? cn(
              colorScheme === 'primary' && 'bg-primary-100 text-primary-700',
              colorScheme === 'secondary' && 'bg-secondary-100 text-secondary-700',
              colorScheme === 'accent' && 'bg-accent-100 text-accent-700',
              colorScheme === 'gray' && 'bg-gray-200 text-gray-700'
            )
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
        colors.ring
      );

    case 'solid-rounded':
      return cn(
        'rounded-md',
        isSelected
          ? cn(
              colorScheme === 'primary' && 'bg-primary-500 text-white',
              colorScheme === 'secondary' && 'bg-secondary-500 text-white',
              colorScheme === 'accent' && 'bg-accent-500 text-white',
              colorScheme === 'gray' && 'bg-gray-700 text-white'
            )
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200',
        colors.ring
      );

    case 'unstyled':
    default:
      return cn(
        isSelected ? colors.active : 'text-gray-500 hover:text-gray-700',
        colors.ring
      );
  }
}

export { getTabVariantClasses };
export default Tabs;
