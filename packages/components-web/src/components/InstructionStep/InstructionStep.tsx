'use client';

import { forwardRef } from 'react';
import type { InstructionStepPropsBase } from '@groxigo/contracts/components/instruction-step';
import clsx from 'clsx';
import styles from './InstructionStep.module.css';

export interface InstructionStepProps extends InstructionStepPropsBase {
  className?: string;
}

export const InstructionStep = forwardRef<HTMLDivElement, InstructionStepProps>(
  ({ stepNumber, instruction, imageUrl, className, testID }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        <div className={styles.stepNumber} aria-hidden="true">
          <span className={styles.stepNumberText}>{stepNumber}</span>
        </div>

        <div className={styles.body}>
          <p className={styles.instruction}>{instruction}</p>

          {imageUrl && (
            <img
              src={imageUrl}
              alt={`Step ${stepNumber} illustration`}
              className={styles.image}
              loading="lazy"
            />
          )}
        </div>
      </div>
    );
  }
);

InstructionStep.displayName = 'InstructionStep';
export default InstructionStep;
