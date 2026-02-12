'use client';

import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import type { HeaderPropsBase } from '@groxigo/contracts/components';
import clsx from 'clsx';
import styles from './Header.module.css';

export interface HeaderProps extends HeaderPropsBase {
  className?: string;
  /** Content rendered in the center area (e.g. SearchBar, address bar) */
  children?: ReactNode;
}

/**
 * Header — responsive navigation shell.
 *
 * Provides layout slots for leftAction, title, center content (children),
 * and rightActions. The consuming app passes icons/buttons into the slots;
 * Header only owns the layout shell.
 *
 * Breakpoints:
 * - Mobile (375px): px=16, justify-between
 * - Tablet (768px): px=32, gap=16
 * - Desktop (1024px+): px=80, gap=32
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(
  (
    {
      title,
      leftAction,
      rightActions,
      elevated = true,
      section = 'default',
      className,
      testID,
      children,
    },
    ref
  ) => {
    const sectionClass =
      section === 'groceries'
        ? styles.sectionGroceries
        : section === 'recipes'
          ? styles.sectionRecipes
          : undefined;

    return (
      <header
        ref={ref}
        className={clsx(
          styles.root,
          elevated && styles.elevated,
          sectionClass,
          className
        )}
        data-testid={testID}
        role="banner"
      >
        <div className={styles.content}>
          {leftAction && (
            <div className={styles.leftAction}>{leftAction}</div>
          )}

          {title && <span className={styles.title}>{title}</span>}

          {children && <div className={styles.center}>{children}</div>}

          {rightActions && rightActions.length > 0 && (
            <div className={styles.rightActions}>
              {rightActions.map((action, index) => (
                <div key={index}>{action}</div>
              ))}
            </div>
          )}
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';
export default Header;
