import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const rootInput = args.find((arg) => !arg.startsWith('--')) || '.';
const idIndex = args.indexOf('--creative-id');
const creativeId = idIndex >= 0 ? args[idIndex + 1] : null;
const root = resolve(rootInput);
const idPattern = /^[a-z0-9][a-z0-9-]{2,80}$/;

if (!creativeId || !idPattern.test(creativeId)) {
  console.error('Uso: node scripts/plan-creative.mjs <root> --creative-id <id-kebab-case>');
  process.exit(1);
}
if (!existsSync(root) || !statSync(root).isDirectory()) {
  console.error(JSON.stringify({ status: 'BLOCKED', reason: 'root_not_found', root }, null, 2));
  process.exit(2);
}

const hasRoot = (name) => existsSync(join(root, name));
const existingStudio = ['src', 'public', 'package.json', 'remotion.config.ts', 'remotion.config.js', 'remotion.config.mjs'].some(hasRoot);
const base = existingStudio ? 'adapt_existing' : 'new_project';
const desired = [
  ['CREATE_DIR', '00_admin', 'estado, decisões e release'],
  ['CREATE_DIR', `01_brief/${creativeId}`, 'brief do criativo'],
  ['CREATE_DIR', `02_references/${creativeId}/locked`, 'referências travadas'],
  ['CREATE_DIR', `02_references/${creativeId}/controlled`, 'referências controladas'],
  ['CREATE_DIR', `03_direction/${creativeId}/concept-routes`, 'rotas criativas'],
  ['CREATE_DIR', `03_direction/${creativeId}/storyframes`, 'storyframes'],
  ['CREATE_DIR', `04_assets/${creativeId}/source`, 'assets fonte protegidos'],
  ['CREATE_DIR', `04_assets/${creativeId}/generated`, 'assets gerados com log'],
  ['CREATE_DIR', `04_assets/${creativeId}/approved`, 'assets aprovados'],
  ['CREATE_DIR', `06_src/${creativeId}/scenes`, 'cenas editáveis'],
  ['CREATE_DIR', `06_src/${creativeId}/components`, 'componentes reutilizáveis'],
  ['CREATE_DIR', `07_renders/${creativeId}/preview`, 'previews'],
  ['CREATE_DIR', `07_renders/${creativeId}/comparison`, 'comparações'],
  ['CREATE_DIR', `08_qa/${creativeId}/reports`, 'relatórios de QA'],
  ['CREATE_DIR', `09_handoff/${creativeId}`, 'packets de handoff']
];

const operations = desired.map(([op, path, reason]) => ({
  op: existsSync(join(root, path)) ? 'SKIP_COLLISION' : op,
  path,
  reason: existsSync(join(root, path)) ? `${reason}; caminho já existe` : reason
}));

console.log(JSON.stringify({
  status: 'PASS',
  root,
  creative_id: creativeId,
  mode: base,
  operations,
  safety: { dry_run: true, allow_write: false, collisions_checked: true, path_escape_checked: true },
  notes: [
    'este plano não altera o filesystem',
    'revise colisões e convenções antes de usar scaffold --write',
    `workspace observado como ${base === 'adapt_existing' ? 'existente/adaptável' : 'novo'} pelo conjunto de marcadores: ${readdirSync(root).length}`
  ]
}, null, 2));
