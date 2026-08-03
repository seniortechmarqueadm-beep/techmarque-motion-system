import { readFile } from 'node:fs/promises';

const input = process.argv[2];
if (!input) {
  console.error('Uso: node scripts/score-routes.mjs <routes.json>');
  process.exit(1);
}

const payload = JSON.parse(await readFile(input, 'utf8'));
const routes = Array.isArray(payload) ? payload : payload.routes;
if (!Array.isArray(routes) || routes.length === 0) {
  console.error('O arquivo precisa conter um array routes.');
  process.exit(1);
}

const score = (route) => {
  const s = route.scores || {};
  const weighted = (s.brand || 0) * 3 + (s.clarity || 0) * 3 + (s.feasibility || 0) * 2 + (s.novelty || 0) * 2 + (s.editability || 0) * 2 - (s.risk || 0) * 2;
  const generic = /generic|qualquer empresa|dashboard decorativo|glow|part[ií]culas/i.test(`${route.signature || ''} ${route.translation || ''} ${(route.risks || []).join(' ')}`);
  return { ...route, computed_score: weighted, genericity_flag: generic, decision: generic || (s.brand || 0) < 2 ? 'REVIEW' : 'VIABLE' };
};

const ranked = routes.map(score).sort((a, b) => b.computed_score - a.computed_score);
console.log(JSON.stringify({
  status: 'PASS',
  ranked,
  recommendation: ranked[0]?.decision === 'VIABLE' ? ranked[0].route_id : null,
  warning: ranked[0]?.decision === 'VIABLE' ? null : 'nenhuma rota passou no filtro mínimo de marca/genericidade'
}, null, 2));
