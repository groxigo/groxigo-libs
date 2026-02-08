/**
 * AvatarGroup Component (Web)
 *
 * Displays multiple avatars in a stacked/overlapping layout.
 * Shows a +N indicator when there are more avatars than the max.
 */

import React, { forwardRef, Children, isValidElement, cloneElement } from 'react';
import { clsx } from 'clsx';
import type { AvatarGroupPropsBase, AvatarSize } from '@groxigo/contracts';
import styles from './AvatarGroup.module.css';

// Size → badge class mapping
const badgeSizeMap: Record<AvatarSize, string> = {
  xs: 'badgeXs',
  sm: 'badgeSm',
  md: 'badgeMd',
  lg: 'badgeLg',
  xl: 'badgeXl',
  '2xl': 'badge2xl',
};

// Default spacing (negative for overlap) per size
const defaultSpacing: Record<AvatarSize, number> = {
  xs: -6,
  sm: -8,
  md: -10,
  lg: -12,
  xl: -16,
  '2xl': -20,
};

export interface AvatarGroupProps extends AvatarGroupPropsBase {
  /** Click handler for the +N badge */
  onExcessClick?: () => void;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      max = 4,
      size = 'md',
      spacing,
      children,
      className,
      onExcessClick,
    },
    ref
  ) => {
    const childArray = Children.toArray(children).filter(isValidElement);
    const totalCount = childArray.length;
    const visibleAvatars = childArray.slice(0, max);
    const excessCount = totalCount - max;

    // Calculate margin for overlap
    const marginLeft = spacing ?? defaultSpacing[size];

    return (
      <div ref={ref} className={clsx(styles.container, className)}>
        {visibleAvatars.map((child, index) => {
          if (!isValidElement(child)) return null;

          // Clone child with proper sizing and overlap styling
          return (
            <div
              key={index}
              className={styles.avatarWrapper}
              style={{
                marginLeft: index === 0 ? 0 : marginLeft,
                zIndex: visibleAvatars.length - index,
              }}
            >
              {cloneElement(child as React.ReactElement<any>, {
                size,
                className: clsx(
                  styles.avatarBorder,
                  (child as React.ReactElement<any>).props.className
                ),
              })}
            </div>
          );
        })}

        {excessCount > 0 && (
          <div
            className={styles.avatarWrapper}
            style={{
              marginLeft,
              zIndex: 0,
            }}
          >
            <span
              className={clsx(
                styles.countBadge,
                styles[badgeSizeMap[size]],
                onExcessClick && styles.countBadgeClickable
              )}
              onClick={onExcessClick}
              role={onExcessClick ? 'button' : undefined}
              tabIndex={onExcessClick ? 0 : undefined}
              onKeyDown={onExcessClick ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onExcessClick();
                }
              } : undefined}
              aria-label={`${excessCount} more users`}
            >
              +{excessCount}
            </span>
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export default AvatarGroup;
