// Fails if a spec bypasses the guarded media helpers in tests/e2e/util.ts. See the delete-by-name note there.
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'tests', 'e2e');
const problems = [];

for (const file of readdirSync(dir).filter((f) => f.endsWith('.ts') && f !== 'util.ts')) {
  readFileSync(join(dir, file), 'utf8').split('\n').forEach((line, i) => {
    const where = `tests/e2e/${file}:${i + 1}`;
    if (/\.media\.ensureNameNotExists\(/.test(line)) problems.push(`${where}: use removeTestMedia()`);
    if (/\.media\.createDefaultMedia/.test(line)) problems.push(`${where}: use createTestFolder/createTestImage/createTestFile()`);
    for (const m of line.matchAll(/deleteRulesetsByPrefix\(\s*[^,]+,\s*(['"`])(.*?)\1/g)) {
      if (!m[2].startsWith('MC ')) problems.push(`${where}: deleteRulesetsByPrefix prefix "${m[2]}" must start with "MC "`);
    }
  });
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('check-test-names: OK');
