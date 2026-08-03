import { mkdtemp, writeFile, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { routeRequest } from './route-request.mjs';
import { validateManifest } from './scaffold-creative.mjs';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const cases = JSON.parse(await import('node:fs/promises').then(({ readFile }) => readFile(join(root, 'tests/activation-cases.json'), 'utf8')));
const failures = [];

for (const item of cases) {
  try {
    const result = routeRequest(item.request);
    if (result.mode !== item.mode) failures.push(`${item.request}: expected mode ${item.mode}, got ${result.mode}`);
    for (const node of item.nodes) if (!result.active_nodes.includes(node)) failures.push(`${item.request}: missing node ${node}`);
  } catch (error) {
    failures.push(`${item.request}: ${error.message}`);
  }
}

const temp = await mkdtemp(join(tmpdir(), 'motion-director-test-'));
try {
  const escapeManifest = join(temp, 'escape.json');
  await writeFile(escapeManifest, JSON.stringify({ root: temp, operations: [{ op: 'CREATE_DIR', path: '../escape' }] }));
  const escapeResult = validateManifest(JSON.parse(await import('node:fs/promises').then(({ readFile }) => readFile(escapeManifest, 'utf8'))));
  if (!escapeResult.errors.some((error) => error.includes('path escape bloqueado'))) failures.push('path_escape: scaffold accepted an escaping path');

  const collision = join(temp, 'existing');
  await mkdir(collision);
  const collisionManifest = join(temp, 'collision.json');
  await writeFile(collisionManifest, JSON.stringify({ root: temp, operations: [{ op: 'CREATE_DIR', path: 'existing' }] }));
  const collisionResult = validateManifest(JSON.parse(await import('node:fs/promises').then(({ readFile }) => readFile(collisionManifest, 'utf8'))));
  if (!collisionResult.errors.some((error) => error.includes('collision'))) failures.push('collision: scaffold accepted an existing target');
} finally {
  await rm(temp, { recursive: true, force: true });
}

if (failures.length) {
  console.error('LOCAL TESTS: FAIL');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`LOCAL TESTS: PASS — ${cases.length} activation cases and negative filesystem cases checked.`);
