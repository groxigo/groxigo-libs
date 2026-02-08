'use client';

import { forwardRef, useCallback } from 'react';
import type {
  PreferencesCardPropsBase,
  PreferenceSetting,
  PreferenceOption,
} from '@groxigo/contracts/components/preferences-card';
import { Select } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './PreferencesCard.module.css';

export type { PreferenceSetting, PreferenceOption };

export interface PreferencesCardProps extends PreferencesCardPropsBase {}

export const PreferencesCard = forwardRef<HTMLDivElement, PreferencesCardProps>(
  (
    {
      title = 'Preferences',
      settings,
      onChange,
      className,
      testID,
    },
    ref
  ) => {
    const handleChange = useCallback(
      (key: string, value: string) => {
        onChange?.(key, value);
      },
      [onChange]
    );

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.list}>
          {settings.map((setting) => (
            <div key={setting.key} className={styles.item}>
              <span className={styles.label}>{setting.label}</span>
              <Select
                value={setting.value}
                options={setting.options}
                onChange={(value) => handleChange(setting.key, String(value))}
                size="sm"
                variant="outline"
                testID={testID ? `${testID}-${setting.key}` : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

PreferencesCard.displayName = 'PreferencesCard';
export default PreferencesCard;
