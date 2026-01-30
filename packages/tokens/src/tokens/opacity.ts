/**
 * Groxigo Design Tokens - Opacity
 * 
 * Opacity scale for consistent transparency values across the design system.
 * Values are named by percentage (100 = fully opaque, 0 = fully transparent).
 */

export const opacity = {
  // 100% - Fully opaque
  "100": 1,
  
  // 90% - High opacity for primary content with slight transparency
  "90": 0.9,
  
  // 80% - Medium-high opacity for secondary content
  "80": 0.8,
  
  // 70% - Medium opacity for tertiary content, labels, descriptions
  "70": 0.7,
  
  // 60% - Medium-low opacity for disabled states, hints
  "60": 0.6,
  
  // 50% - Low opacity for very subtle content
  "50": 0.5,
  
  // 40% - Very low opacity for borders, dividers
  "40": 0.4,
  
  // 30% - Minimum opacity for very subtle backgrounds
  "30": 0.3,
  
  // 20% - Low opacity for subtle overlays
  "20": 0.2,
  
  // 10% - Very low opacity for minimal visibility
  "10": 0.1,
  
  // 0% - Fully transparent
  "0": 0,
} as const;

export type OpacityKey = keyof typeof opacity;

