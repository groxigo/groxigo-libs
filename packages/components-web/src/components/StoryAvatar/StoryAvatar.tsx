'use client';

import { forwardRef } from 'react';
import type { StoryAvatarPropsBase } from '@groxigo/contracts/components/story-avatar';
import { Avatar } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './StoryAvatar.module.css';

export interface StoryAvatarProps extends StoryAvatarPropsBase {}

export const StoryAvatar = forwardRef<HTMLDivElement, StoryAvatarProps>(
  (
    {
      name,
      avatarUrl,
      state = 'unseen',
      onPress,
      className,
      testID,
    },
    ref
  ) => {
    const ringClass = state === 'unseen' ? styles.ringUnseen : styles.ringSeen;

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
        role="button"
        tabIndex={0}
        onClick={onPress}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPress?.();
          }
        }}
        aria-label={`${name} story${state === 'unseen' ? ' (new)' : ''}`}
      >
        <div className={clsx(styles.ring, ringClass)}>
          <Avatar
            src={avatarUrl}
            name={name}
            size="xl"
            variant="circle"
          />
        </div>

        <span className={styles.name} title={name}>
          {name}
        </span>
      </div>
    );
  }
);

StoryAvatar.displayName = 'StoryAvatar';
export default StoryAvatar;
