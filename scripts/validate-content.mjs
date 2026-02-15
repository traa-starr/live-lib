import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { parseFrontmatter } from '../src/lib/content/frontmatter.js';
import { validateResource, validateTransmission } from '../src/lib/content/validators.js';

const ROOT = process.cwd();

const TARGETS = [
  {
    label: 'resources',
    folder: path.join(ROOT, 'content', 'resources'),
    validate: validateResource,
  },
  {
    label: 'transmissions',
    folder: path.join(ROOT, 'content', 'transmissions'),
    validate: validateTransmission,
  },
];

async function listMarkdownFiles(folder) {
  const entries = await readdir(folder, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => path.join(folder, entry.name));
}

async function validateFile(filePath, validator) {
  const raw = await readFile(filePath, 'utf8');
  const { data } = parseFrontmatter(raw);
  validator(data, filePath);
}

async function run() {
  let failures = 0;

  for (const target of TARGETS) {
    const files = await listMarkdownFiles(target.folder);
    for (const file of files) {
      try {
        await validateFile(file, target.validate);
      } catch (error) {
        failures += 1;
        console.error(`\n[content:check] ${target.label} validation failed:`);
        console.error(error instanceof Error ? error.message : String(error));
      }
    }
  }

  if (failures > 0) {
    console.error(`\n[content:check] Failed with ${failures} invalid file(s).`);
    process.exit(1);
  }

  console.log('[content:check] All content is valid.');
}

run().catch((error) => {
  console.error('\n[content:check] Unexpected failure.');
  console.error(error instanceof Error ? error.stack : String(error));
  process.exit(1);
});
