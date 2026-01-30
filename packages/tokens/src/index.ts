/**
 * Groxigo Design Tokens Library
 * 
 * Main entry point for the design tokens package.
 * This is the single source of truth for all design tokens.
 */

export * from './tokens';

// Re-export tokens for convenience
import { tokens } from './tokens';
export default tokens;

