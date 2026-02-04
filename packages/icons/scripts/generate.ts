import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, basename } from 'path';

const DIGIT_WORDS: Record<string, string> = {
  '0': 'Zero',
  '1': 'One',
  '2': 'Two',
  '3': 'Three',
  '4': 'Four',
  '5': 'Five',
  '6': 'Six',
  '7': 'Seven',
  '8': 'Eight',
  '9': 'Nine',
  '10': 'Ten',
  '12': 'Twelve',
  '16': 'Sixteen',
  '18': 'Eighteen',
  '21': 'TwentyOne',
  '30': 'Thirty',
  '45': 'FortyFive',
  '59': 'FiftyNine',
  '99': 'NinetyNine',
  '100': 'Hundred',
  '500': 'FiveHundred',
};

function kebabToPascal(kebab: string): string {
  return kebab
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function filenameToPascal(filename: string): string {
  const name = filename.replace(/\.svg$/, '');

  const leadingNumberMatch = name.match(/^(\d+)/);
  if (leadingNumberMatch) {
    const num = leadingNumberMatch[1];
    const rest = name.slice(num.length);
    const word = DIGIT_WORDS[num] || digitToWord(num);
    const restPascal = rest.startsWith('-')
      ? kebabToPascal(rest.slice(1))
      : rest
        ? rest.charAt(0).toUpperCase() + kebabToPascal(rest.slice(1))
        : '';
    return word + restPascal;
  }

  return kebabToPascal(name);
}

function digitToWord(numStr: string): string {
  return numStr
    .split('')
    .map((d) => DIGIT_WORDS[d] || d)
    .join('');
}

function extractPaths(svgContent: string): string[] {
  const paths: string[] = [];
  const regex = /<path[^>]*\bd=["']([^"']+)["']/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(svgContent)) !== null) {
    paths.push(match[1]);
  }
  return paths;
}

function escapeString(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function generateIconFile(
  componentName: string,
  paths: string[],
): string {
  if (paths.length === 1) {
    return `import { createIcon } from '../create-icon';\nexport const ${componentName} = createIcon('${componentName}', '${escapeString(paths[0])}');\n`;
  }

  const pathArray = paths.map((p) => `'${escapeString(p)}'`).join(', ');
  return `import { createIcon } from '../create-icon';\nexport const ${componentName} = createIcon('${componentName}', [${pathArray}]);\n`;
}

function processVariant(
  variant: 'line' | 'solid',
  svgDir: string,
  outDir: string,
): { generated: number; skipped: number } {
  if (!existsSync(svgDir)) {
    console.error(`SVG directory not found: ${svgDir}`);
    return { generated: 0, skipped: 0 };
  }

  mkdirSync(outDir, { recursive: true });

  const svgFiles = readdirSync(svgDir)
    .filter((f) => f.endsWith('.svg'))
    .sort();

  let generated = 0;
  let skipped = 0;
  const exports: { componentName: string; fileName: string }[] = [];
  const seenNames = new Set<string>();

  for (const svgFile of svgFiles) {
    const svgPath = join(svgDir, svgFile);
    const svgContent = readFileSync(svgPath, 'utf-8');
    const paths = extractPaths(svgContent);

    if (paths.length === 0) {
      console.warn(`  SKIP (no paths): ${svgFile}`);
      skipped++;
      continue;
    }

    let componentName = filenameToPascal(svgFile);

    if (seenNames.has(componentName)) {
      componentName = componentName + 'Alt';
    }
    seenNames.add(componentName);

    const outFileName = basename(svgFile, '.svg');
    const outFilePath = join(outDir, `${outFileName}.ts`);
    const fileContent = generateIconFile(componentName, paths);

    writeFileSync(outFilePath, fileContent);
    exports.push({ componentName, fileName: outFileName });
    generated++;
  }

  const barrelLines = exports
    .sort((a, b) => a.componentName.localeCompare(b.componentName))
    .map((e) => `export { ${e.componentName} } from './${e.fileName}';`);

  writeFileSync(join(outDir, 'index.ts'), barrelLines.join('\n') + '\n');

  return { generated, skipped };
}

function main() {
  const pkgRoot = join(import.meta.dir, '..');
  const uniconsBase = join(pkgRoot, 'node_modules', '@iconscout', 'unicons', 'svg');

  console.log('Generating @groxigo/icons...');
  console.log(`Unicons SVG base: ${uniconsBase}\n`);

  const lineResult = processVariant(
    'line',
    join(uniconsBase, 'line'),
    join(pkgRoot, 'src', 'line'),
  );
  console.log(`\nLine icons: ${lineResult.generated} generated, ${lineResult.skipped} skipped`);

  const solidResult = processVariant(
    'solid',
    join(uniconsBase, 'solid'),
    join(pkgRoot, 'src', 'solid'),
  );
  console.log(`Solid icons: ${solidResult.generated} generated, ${solidResult.skipped} skipped`);

  const total = lineResult.generated + solidResult.generated;
  const totalSkipped = lineResult.skipped + solidResult.skipped;
  console.log(`\nTotal: ${total} icons generated, ${totalSkipped} skipped`);
}

main();
