import { existsSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';

const input = process.argv[2] || '.';
const root = resolve(input);

if (!existsSync(root) || !statSync(root).isDirectory()) {
  console.error(JSON.stringify({ status: 'BLOCKED', reason: 'workspace_not_found', root }, null, 2));
  process.exit(2);
}

const ignored = new Set(['node_modules', '.git', '.next', 'build', 'dist', 'out', 'renders', 'qa_renders']);
const files = [];
const dirs = [];

function walk(current, depth = 0) {
  if (depth > 3) return;
  for (const entry of readdirSync(current, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const target = join(current, entry.name);
    const rel = relative(root, target) || '.';
    if (entry.isDirectory()) {
      dirs.push(rel);
      walk(target, depth + 1);
    } else {
      files.push(rel);
    }
  }
}

walk(root);

const matching = (pattern) => files.filter((file) => pattern.test(basename(file)));
const markers = {
  agents: matching(/^AGENTS\.md$/i),
  package: matching(/^package\.json$/i),
  lockfiles: matching(/^(pnpm-lock\.yaml|package-lock\.json|yarn\.lock|bun\.lockb)$/i),
  remotion_config: matching(/^remotion\.config\.(js|mjs|ts)$/i),
  compositions: dirs.filter((dir) => /(composition|scene|remotion|studio)/i.test(dir)),
  source_dirs: dirs.filter((dir) => /(^|\/)(src|public|projects|scripts|docs|assets)(\/|$)/i.test(dir)),
  state_dirs: dirs.filter((dir) => /(^|\/)(\.codex|00_admin|08_qa|09_handoff)(\/|$)/i.test(dir))
};

const likelyRoots = [root, dirname(root)].filter((candidate, index, list) => list.indexOf(candidate) === index).map((candidate) => ({
  path: candidate,
  has_agents: existsSync(join(candidate, 'AGENTS.md')),
  has_package: existsSync(join(candidate, 'package.json')),
  has_remotion_config: ['remotion.config.ts', 'remotion.config.js', 'remotion.config.mjs'].some((name) => existsSync(join(candidate, name)))
}));

console.log(JSON.stringify({
  status: 'PASS',
  root,
  root_name: basename(root),
  likely_roots: likelyRoots,
  markers,
  counts: { files: files.length, directories: dirs.length },
  warnings: [
    markers.package.length === 0 ? 'package_json_not_found' : null,
    markers.remotion_config.length === 0 ? 'remotion_config_not_found' : null,
    markers.agents.length === 0 ? 'agents_instruction_not_found' : null
  ].filter(Boolean)
}, null, 2));
