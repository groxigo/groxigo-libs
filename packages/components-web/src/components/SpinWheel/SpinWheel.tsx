'use client';

import { forwardRef, useCallback, useRef, useEffect, useState } from 'react';
import type {
  SpinWheelPropsBase,
  SpinWheelSegment,
} from '@groxigo/contracts/components/spin-wheel';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './SpinWheel.module.css';

export type { SpinWheelSegment };

export interface SpinWheelProps extends SpinWheelPropsBase {}

/* ── Alternating segment colors ── */
const SEGMENT_COLORS = [
  'var(--surface-primary, #ffffff)',
  'var(--brand-primary-subtle, #eff6ff)',
];

/* ── Segment label color cycle (matches Figma) ── */
const LABEL_COLORS = [
  'var(--text-primary, #334155)',
  'var(--brand-primary, #2563eb)',
  'var(--text-primary, #334155)',
  'var(--status-success, #16a34a)',
  'var(--text-primary, #334155)',
  'var(--status-warning, #eab308)',
  'var(--text-primary, #334155)',
  'var(--brand-primary, #2563eb)',
];

/** Build conic-gradient for N segments. */
function buildConicGradient(count: number): string {
  const sliceAngle = 360 / count;
  const stops: string[] = [];
  for (let i = 0; i < count; i++) {
    const color = SEGMENT_COLORS[i % 2];
    const start = sliceAngle * i;
    const end = sliceAngle * (i + 1);
    stops.push(`${color} ${start}deg ${end}deg`);
  }
  return `conic-gradient(from 0deg, ${stops.join(', ')})`;
}

export const SpinWheel = forwardRef<HTMLDivElement, SpinWheelProps>(
  (
    {
      segments,
      isSpinning = false,
      remainingSpins,
      onSpin,
      onSpinComplete,
      className,
      testID,
    },
    ref
  ) => {
    const count = segments.length;
    const sliceAngle = 360 / count;
    const wheelRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState(0);
    const spinningRef = useRef(false);

    /* Handle external isSpinning trigger */
    useEffect(() => {
      if (isSpinning && !spinningRef.current) {
        spinningRef.current = true;
        // Random target: 5-8 full rotations + random segment offset
        const extraRotations = (5 + Math.floor(Math.random() * 4)) * 360;
        const targetSegment = Math.floor(Math.random() * count);
        const segmentOffset = targetSegment * sliceAngle;
        const totalRotation = rotation + extraRotations + segmentOffset;
        setRotation(totalRotation);

        // Call onSpinComplete after animation (4s matches CSS)
        const timer = setTimeout(() => {
          spinningRef.current = false;
          onSpinComplete?.(targetSegment);
        }, 4000);

        return () => clearTimeout(timer);
      }
      if (!isSpinning) {
        spinningRef.current = false;
      }
    }, [isSpinning]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSpinClick = useCallback(() => {
      if (isSpinning) return;
      onSpin?.();
    }, [isSpinning, onSpin]);

    const conicBg = buildConicGradient(count);

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        {/* Pointer at top */}
        <div className={styles.pointer} aria-hidden="true">
          <svg
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 16L0 0H20L10 16Z"
              fill="var(--status-error, #dc2626)"
            />
          </svg>
        </div>

        {/* Wheel container */}
        <div className={styles.wheelContainer}>
          {/* Outer ring */}
          <div className={styles.outerRing} />

          {/* Inner wheel with conic gradient */}
          <div
            ref={wheelRef}
            className={clsx(styles.wheel, isSpinning && styles.wheelSpinning)}
            style={{
              background: conicBg,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {/* Divider lines */}
            {segments.map((_, i) => (
              <div
                key={`divider-${i}`}
                className={styles.divider}
                style={{
                  transform: `rotate(${sliceAngle * i}deg)`,
                }}
              />
            ))}

            {/* Segment labels */}
            {segments.map((seg, i) => {
              const angle = sliceAngle * i + sliceAngle / 2 - 90;
              const rad = (angle * Math.PI) / 180;
              const labelRadius = 80; // px from center
              const x = Math.cos(rad) * labelRadius;
              const y = Math.sin(rad) * labelRadius;
              const labelColor = LABEL_COLORS[i % LABEL_COLORS.length];

              return (
                <span
                  key={`label-${i}`}
                  className={styles.segmentLabel}
                  style={{
                    transform: `translate(${x}px, ${y}px) rotate(${angle + 90}deg)`,
                    color: labelColor,
                  }}
                >
                  {seg.label}
                </span>
              );
            })}
          </div>

          {/* Center hub + SPIN button */}
          <Button
            variant="solid"
            colorScheme="primary"
            size="sm"
            onPress={handleSpinClick}
            disabled={isSpinning}
            aria-label="Spin the wheel"
            className={styles.centerHub}
          >
            <span className={styles.spinLabel}>SPIN</span>
          </Button>
        </div>

        {/* Remaining spins text */}
        {remainingSpins != null && (
          <p className={styles.remainingText}>
            {remainingSpins} free spin{remainingSpins !== 1 ? 's' : ''} remaining
            today
          </p>
        )}
      </div>
    );
  }
);

SpinWheel.displayName = 'SpinWheel';
export default SpinWheel;
