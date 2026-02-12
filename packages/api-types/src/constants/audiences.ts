/**
 * Target audience constants shared across page and deal-section modules.
 */

export const TARGET_AUDIENCES = [
  'all',
  'authenticated',
  'new_users',
  'returning',
  'vip',
  'guests',
] as const;

export type TargetAudience = (typeof TARGET_AUDIENCES)[number];
