import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { routeRequest } from './route-request.mjs';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const required = [
  'AGENTS.md', 'README.md', 'package.json', 'CODEX_LOCAL_MANIFEST.yaml',
  '.codex/state/AGENT_IDENTITY.yaml', '.codex/state/PROJECT_STATE.yaml',
  '.codex/graphs/motion-director-local.yaml',
  '.codex/references/N7_DOSSIER_INDEX.yaml',
  '.codex/schemas/creative-brief.schema.json',
  '.codex/schemas/creative-route.schema.json',
  '.codex/schemas/folder-manifest.schema.json',
  '.codex/schemas/return-packet.schema.json',
  '.codex/schemas/task-handoff.schema.json',
  '.codex/templates/TASK_HANDOFF.yaml',
  'scripts/discover-workspace.mjs', 'scripts/route-request.mjs',
  'scripts/plan-creative.mjs', 'scripts/score-routes.mjs',
  'scripts/scaffold-creative.mjs', 'scripts/validate-codex-pack.mjs'
];
const failures = [];
for (const file of required) if (!existsSync(join(root, file))) failures.push(`missing: ${file}`);

for (const file of required.filter((item) => item.endsWith('.json'))) {
  try { JSON.parse(readFileSync(join(root, file), 'utf8')); } catch (error) { failures.push(`invalid-json: ${file}: ${error.message}`); }
}

const agents = readFileSync(join(root, 'AGENTS.md'), 'utf8');
for (const token of ['MOTION DIRECTOR TECHMARQUE', '.codex/', 'dry-run', 'LOCKED', 'Output não inspecionado']) {
  if (!agents.includes(token)) failures.push(`AGENTS.md missing token: ${token}`);
}
const identity = readFileSync(join(root, '.codex/state/AGENT_IDENTITY.yaml'), 'utf8');
if (!identity.includes('agent_id: motion-director-techmarque-n7')) failures.push('identity mismatch');
if (identity.includes('agent_id: prompt-architect-techmarque')) failures.push('creator identity leaked into motion identity');

try {
  const parsed = routeRequest('criar novo criativo vertical no Remotion');
  if (parsed.mode !== 'ENGINEERING' || !parsed.active_nodes.includes('A13')) failures.push('route smoke test failed');
} catch (error) { failures.push(`route smoke test error: ${error.message}`); }

if (failures.length) {
  console.error('VALIDATION: FAIL');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`VALIDATION: PASS — ${required.length} required artifacts, JSON schemas, identity and route smoke test checked.`);
