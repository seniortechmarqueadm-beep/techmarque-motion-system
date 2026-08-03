import { fileURLToPath } from 'node:url';

const normalize = (value) => value.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const rules = [
  { id: 'workspace_discovery', nodes: ['O01'], terms: ['workspace', 'root', 'pasta', 'pastas', 'organizar', 'studio'] },
  { id: 'state_authority', nodes: ['O02', 'A00', 'A01'], terms: ['estado', 'decisao', 'lock', 'autoridade', 'conflito'] },
  { id: 'creative_lab', nodes: ['O03', 'O04', 'A02', 'A03', 'A04'], terms: ['ideia', 'ideias', 'criativo', 'criativos', 'conceito', 'campanha', 'direcao criativa', 'storyframe', 'styleframe'] },
  { id: 'motion_2d_3d', nodes: ['A05', 'A06', 'A07'], terms: ['motion', 'animacao', '2d', '3d', 'vfx', 'compositing', 'cor'] },
  { id: 'ui_product', nodes: ['A08'], terms: ['ui', 'interface', 'crm', 'dashboard', 'produto', 'dados'] },
  { id: 'generative_media', nodes: ['A09', 'A10', 'A11'], terms: ['imagem', 'video generativo', 'video', 'voz', 'audio', 'sound', 'sync'] },
  { id: 'remotion_engineering', nodes: ['O05', 'O07', 'A12', 'A13', 'A14', 'A15'], terms: ['remotion', 'typescript', 'react', 'codigo', 'composicao', 'ffmpeg', 'webgl', 'python'] },
  { id: 'quality', nodes: ['O08', 'A16', 'A18'], terms: ['qa', 'qualidade', 'auditoria', 'teste', 'benchmark', 'regressao', 'inspecao', 'continuidade', 'red team'] },
  { id: 'handoff_release', nodes: ['O09', 'A17', 'A19'], terms: ['handoff', 'entrega', 'release', 'publicar', 'versao', 'manifest'] }
];

export function routeRequest(request) {
  const cleanRequest = request.trim();
  if (!cleanRequest) throw new Error('request_required');
  const text = normalize(cleanRequest);
  const matched = rules.filter((rule) => rule.terms.some((term) => text.includes(term)));
  const ids = [...new Set(['O01', 'O02', 'O03', ...matched.flatMap((rule) => rule.nodes), 'O08'])];
  const mode = text.includes('auditoria') || text.includes('release') || text.includes('qa') ? 'AUDIT'
    : text.includes('implementar') || text.includes('codigo') || text.includes('remotion') ? 'ENGINEERING'
      : text.includes('ideia') || text.includes('criativo') || text.includes('conceito') ? 'CREATIVE_LAB'
        : 'DISCOVERY';

  const read = ['.codex/instructions/01_identity-authority.md', '.codex/instructions/02_routing-and-modes.md'];
  if (matched.some((rule) => rule.id === 'creative_lab')) read.push('.codex/instructions/03_creative-lab.md');
  if (matched.some((rule) => rule.id === 'workspace_discovery')) read.push('.codex/instructions/04_workspace-and-studio.md');
  if (matched.some((rule) => rule.id === 'remotion_engineering')) read.push('.codex/instructions/06_remotion-engineering.md');
  if (matched.some((rule) => rule.id === 'quality')) read.push('.codex/instructions/07_quality-release.md');
  if (matched.some((rule) => rule.id === 'handoff_release')) read.push('.codex/instructions/08_handoff-state.md');
  if (mode === 'ENGINEERING') read.push('.codex/instructions/09_productivity.md');

  return {
    status: 'PASS',
    request: cleanRequest,
    mode,
    active_nodes: ids,
    active_modules: [...new Set(matched.map((rule) => rule.id))],
    read_first: [...new Set(read)],
    stop_conditions: ['unknown_workspace_root', 'missing_locked_reference', 'unverified_capability', 'destructive_operation_without_manifest_and_write'],
    next_artifact: mode === 'CREATIVE_LAB' ? '.codex/templates/CREATIVE_ROUTE_MATRIX.yaml' : mode === 'ENGINEERING' ? '.codex/templates/FOLDER_MANIFEST.yaml' : '.codex/templates/RETURN_PACKET.yaml'
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const request = process.argv.slice(2).join(' ').trim();
  if (!request) {
    console.error('Uso: node scripts/route-request.mjs "seu pedido"');
    process.exit(1);
  }
  console.log(JSON.stringify(routeRequest(request), null, 2));
}
