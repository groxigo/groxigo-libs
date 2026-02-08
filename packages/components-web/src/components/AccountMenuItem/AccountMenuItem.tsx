'use client';

import { forwardRef } from 'react';
import { AngleRight } from '@groxigo/icons/line';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './AccountMenuItem.module.css';

export interface AccountMenuItemProps {
  /** Material icon name or emoji to display in the icon circle */
  icon?: string;
  /** Primary label text */
  label: string;
  /** Optional secondary description text */
  subtitle?: string;
  /** Callback when the row is pressed */
  onPress?: () => void;
  /** Whether to show the right chevron arrow @default true */
  showChevron?: boolean;
  /** Optional badge node (e.g. notification count) to render before chevron */
  badge?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}


export const AccountMenuItem = forwardRef<HTMLButtonElement, AccountMenuItemProps>(
  (
    {
      icon,
      label,
      subtitle,
      onPress,
      showChevron = true,
      badge,
      className,
      testID,
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        fullWidth
        onPress={onPress}
        className={clsx(styles.root, className)}
        testID={testID}
        aria-label={label}
      >
        {/* Icon circle */}
        {icon && (
          <span className={styles.iconCircle} aria-hidden="true">
            <span className={styles.iconText}>{icon}</span>
          </span>
        )}

        {/* Content: label + subtitle */}
        <span className={styles.content}>
          <span className={styles.label}>{label}</span>
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </span>

        {/* Optional badge */}
        {badge && <span className={styles.badge}>{badge}</span>}

        {/* Chevron */}
        {showChevron && (
          <span className={styles.chevron}>
            <AngleRight size={16} />
          </span>
        )}
      </Button>
    );
  }
);

AccountMenuItem.displayName = 'AccountMenuItem';
export default AccountMenuItem;
