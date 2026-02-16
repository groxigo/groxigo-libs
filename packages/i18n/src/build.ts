/**
 * Post-tsc build step:
 * 1. Copies src/messages/*.json → dist/messages/ (tsc doesn't emit JSON)
 * 2. Generates dist/generated/message-keys.d.ts from en.json structure
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dir, '..');
const SRC_MESSAGES = join(ROOT, 'src', 'messages');
const DIST = join(ROOT, 'dist');
const DIST_MESSAGES = join(DIST, 'messages');
const DIST_GENERATED = join(DIST, 'generated');

// 1. Copy JSON files
mkdirSync(DIST_MESSAGES, { recursive: true });

const jsonFiles = readdirSync(SRC_MESSAGES).filter((f) => f.endsWith('.json'));
for (const file of jsonFiles) {
  copyFileSync(join(SRC_MESSAGES, file), join(DIST_MESSAGES, file));
}
console.log(`Copied ${jsonFiles.length} message files to dist/messages/`);

// 2. Generate MessageKeys type from en.json
const en = JSON.parse(readFileSync(join(SRC_MESSAGES, 'en.json'), 'utf-8'));

function generateInterface(obj: Record<string, unknown>, indent = '  '): string {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      lines.push(`${indent}${key}: {`);
      lines.push(generateInterface(value as Record<string, unknown>, indent + '  '));
      lines.push(`${indent}};`);
    } else {
      lines.push(`${indent}${key}: string;`);
    }
  }
  return lines.join('\n');
}

mkdirSync(DIST_GENERATED, { recursive: true });

const dts = `// Auto-generated from en.json — do not edit manually
export interface MessageKeys {
${generateInterface(en)}
}
`;

writeFileSync(join(DIST_GENERATED, 'message-keys.d.ts'), dts);
console.log('Generated dist/generated/message-keys.d.ts');
