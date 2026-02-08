'use client';

import { forwardRef } from 'react';
import type { CheckoutStepperPropsBase } from '@groxigo/contracts/components/checkout-stepper';
import clsx from 'clsx';
import styles from './CheckoutStepper.module.css';
import { Check } from '@groxigo/icons/line';

export interface CheckoutStepperProps extends CheckoutStepperPropsBase {}

export const CheckoutStepper = forwardRef<HTMLDivElement, CheckoutStepperProps>(
  (
    {
      steps,
      currentStep,
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
        role="navigation"
        aria-label="Checkout progress"
      >
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isFuture = index > currentStep;

          return (
            <div className={styles.stepGroup} key={step.key}>
              {/* Connector line before this step (skip for first step) */}
              {index > 0 && (
                <div className={styles.connectorWrapper}>
                  <div
                    className={clsx(
                      styles.connectorLine,
                      isCompleted || isActive
                        ? styles.connectorCompleted
                        : styles.connectorInactive
                    )}
                  />
                </div>
              )}

              {/* Step circle + label */}
              <div
                className={styles.step}
                aria-current={isActive ? 'step' : undefined}
              >
                <div
                  className={clsx(
                    styles.circle,
                    isCompleted && styles.circleCompleted,
                    isActive && styles.circleActive,
                    isFuture && styles.circleInactive
                  )}
                >
                  {isCompleted ? (
                    <Check size={20} />
                  ) : (
                    <span className={styles.circleNumber}>{index + 1}</span>
                  )}
                </div>

                <span
                  className={clsx(
                    styles.label,
                    isFuture && styles.labelInactive
                  )}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

CheckoutStepper.displayName = 'CheckoutStepper';
export default CheckoutStepper;
