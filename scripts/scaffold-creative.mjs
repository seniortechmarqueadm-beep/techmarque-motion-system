import { existsSync } from 'node:fs';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export function validateManifest(manifest) {
  const root = resolve(manifest.root);
  const operations = Array.isArray(manifest.operations) ? manifest.operations : [];
  const errors = [];
  const plan = [];

  function safeTarget(relativePath, operation) {
    if (!relativePath || isAbsolute(relativePath)) throw new Error('path deve ser relativo ao root');
    const target = resolve(root, relativePath);
    const outside = relative(root, target).startsWith(`..${sep}`) || relative(root, target) === '..';
    if (outside) throw new Error('path escape bloqueado');
    if (operation === 'CREATE_FILE' && (/(^|[\\/])source([\\/]|$)/i.test(relativePath) || /(^|[\\/])approved([\\/]|$)/i.test(relativePath))) {
      throw new Error('operação em source/ ou approved/ exige owner e autorização específica');
    }
    return target;
  }

  for (const operation of operations) {
    try {
      const target = safeTarget(operation.path, operation.op);
      const collision = existsSync(target);
      if (['CREATE_DIR', 'CREATE_FILE'].includes(operation.op) && collision) {
        errors.push(`${operation.op} collision: ${operation.path}`);
        continue;
      }
      plan.push({ ...operation, absolute_path: target, collision });
    } catch (error) {
      errors.push(`${operation.path || '<missing>'}: ${error.message}`);
    }
  }

  return { root, operations: plan, errors };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2);
  const manifestPath = args.find((arg) => !arg.startsWith('--'));
  const writeMode = args.includes('--write');

  if (!manifestPath) {
    console.error('Uso: node scripts/scaffold-creative.mjs <manifest.json> [--write]');
    process.exit(1);
  }

  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const { root, operations: plan, errors } = validateManifest(manifest);

  if (errors.length) {
    console.error(JSON.stringify({ status: 'BLOCKED', errors, write_mode: writeMode }, null, 2));
    process.exit(2);
  }

  if (!writeMode) {
    console.log(JSON.stringify({ status: 'DRY_RUN', root, operations: plan.map(({ absolute_path, ...item }) => ({ ...item, absolute_path })) }, null, 2));
    process.exit(0);
  }

  for (const operation of plan) {
    if (operation.op === 'CREATE_DIR') await mkdir(operation.absolute_path, { recursive: true });
    if (operation.op === 'CREATE_FILE') {
      await mkdir(dirname(operation.absolute_path), { recursive: true });
      await writeFile(operation.absolute_path, operation.content || `# ${operation.path}\n`, 'utf8');
    }
  }

  console.log(JSON.stringify({ status: 'PASS', root, applied: plan.filter((item) => ['CREATE_DIR', 'CREATE_FILE'].includes(item.op)).map((item) => item.path), skipped: plan.filter((item) => !['CREATE_DIR', 'CREATE_FILE'].includes(item.op)).map((item) => item.path) }, null, 2));
}
