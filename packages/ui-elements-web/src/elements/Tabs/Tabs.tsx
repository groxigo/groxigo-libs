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
import { clsx } from 'clsx';
import type {
  TabsPropsBase,
  TabsVariant,
  TabsSize,
  TabItem,
} from '@groxigo/contracts';
import styles from './Tabs.module.css';

// ============================================
// CONTEXT
// ============================================

interface TabsContextValue {
  value: string;
  onChange: (key: string) => void;
  variant: TabsVariant;
  size: TabsSize;
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
// VARIANT CLASS HELPERS
// ============================================

const tabVariantClassMap: Record<TabsVariant, { base: string; selected: string }> = {
  line: { base: styles.tabLine, selected: styles.tabLineSelected },
  enclosed: { base: styles.tabEnclosed, selected: styles.tabEnclosedSelected },
  'soft-rounded': { base: styles.tabSoftRounded, selected: styles.tabSoftRoundedSelected },
  'solid-rounded': { base: styles.tabSolidRounded, selected: styles.tabSolidRoundedSelected },
};

const tabListVariantClassMap: Record<TabsVariant, string> = {
  line: styles.tabListLine,
  enclosed: styles.tabListEnclosed,
  'soft-rounded': styles.tabListSoftRounded,
  'solid-rounded': styles.tabListSolidRounded,
};

const tabListSizeClassMap: Record<TabsSize, string> = {
  sm: styles.tabListSm,
  md: styles.tabListMd,
};

const tabSizeClassMap: Record<TabsSize, string> = {
  sm: styles.tabSm,
  md: styles.tabMd,
};

export function getTabVariantClasses(
  variant: TabsVariant,
  isSelected: boolean
): string {
  const variantClasses = tabVariantClassMap[variant];
  return clsx(variantClasses.base, isSelected && variantClasses.selected);
}

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
        isFitted,
        isManual,
        isLazy,
        keepMounted,
      ]
    );

    // Render using items prop if provided
    if (items && items.length > 0) {
      return (
        <TabsContext.Provider value={contextValue}>
          <div
            ref={ref}
            id={id}
            className={clsx(styles.tabs, styles.horizontal, className)}
            data-testid={testID}
          >
            <div
              role="tablist"
              aria-orientation="horizontal"
              className={clsx(
                styles.tabList,
                styles.tabListHorizontal,
                tabListVariantClassMap[variant],
                tabListSizeClassMap[size]
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
            <div className={styles.itemPanels}>
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
          className={clsx(styles.tabs, styles.horizontal, className)}
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
  const { value: selectedValue, onChange, variant, size, isFitted } =
    useTabsContext();

  const isSelected = selectedValue === value;

  const handleClick = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  const variantClasses = getTabVariantClasses(variant, isSelected);

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
      className={clsx(
        styles.tab,
        tabSizeClassMap[size],
        variantClasses,
        isFitted && styles.tabFitted,
        disabled && styles.tabDisabled
      )}
    >
      {icon}
      {children}
    </button>
  );
}

export default Tabs;
