'use client';

import { forwardRef } from 'react';
import type { ProfileHeaderPropsBase } from '@groxigo/contracts/components/profile-header';
import { Avatar } from '@groxigo/ui-elements-web';
import { Edit } from '@groxigo/icons/line';
import clsx from 'clsx';
import styles from './ProfileHeader.module.css';

export interface ProfileHeaderProps extends ProfileHeaderPropsBase {
  className?: string;
}

export const ProfileHeader = forwardRef<HTMLDivElement, ProfileHeaderProps>(
  (
    {
      name,
      email,
      phone,
      avatarUrl,
      onEdit,
      className,
      testID,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        {/* Avatar */}
        <Avatar
          src={avatarUrl}
          name={name}
          size="2xl"
          variant="circle"
          className={styles.avatar}
        />

        {/* User info */}
        <div className={styles.content}>
          <span className={styles.name}>{name}</span>
          {email && <span className={styles.email}>{email}</span>}
          {phone && <span className={styles.phone}>{phone}</span>}
        </div>

        {/* Edit button */}
        {onEdit && (
          <button
            type="button"
            className={styles.editButton}
            onClick={onEdit}
            aria-label="Edit profile"
          >
            <Edit size={22} />
          </button>
        )}
      </div>
    );
  }
);

ProfileHeader.displayName = 'ProfileHeader';
export default ProfileHeader;
