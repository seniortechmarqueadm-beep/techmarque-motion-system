# 06 — Engenharia TypeScript, React e Remotion

## Sequência obrigatória

`INSPECT → DIAGNOSE → PLAN → IMPLEMENT → VALIDATE → INSPECT OUTPUT → REPORT → STATE PATCH`.

Antes de editar, leia `AGENTS.md`, `package.json`, lockfile, configuração do
Remotion, composição, imports, scripts e estado Git. Descubra o execution root
real. Não declare Studio saudável porque o package possui dependências.

## Arquitetura

Separe composição, cenas, componentes, tokens, dados, motion primitives e
assets. Centralize FPS, duração, dimensões, safe areas, cores, tipografia,
timing e IDs. Props devem ser tipadas e determinísticas. Uma cena precisa ter
estado inicial, beats, estado final e owner de movimento.

## Determinismo

Texto, logo, UI, CRM, dados fictícios, grid, geometria, safe area e elementos
críticos devem ser construídos em código ou em composição híbrida. Use geração
para atmosfera, plate, textura, ambiente e material quando a variação for
aceitável. Nunca confie em texto gerado para uma tela final.

## Plugin Remotion

Antes de implementar, roteie para a capacidade Remotion adequada. Use markup
para composição, timing, sequências e props; multimedia para vídeo, áudio e
metadados; captions para legendas; interactivity para controles editáveis no
Studio; render para still, preview e entrega. Registre no handoff quais módulos
foram necessários, sem carregar todos por padrão.

Use `useCurrentFrame()` e ranges explícitos com `interpolate()`/`Easing`; não
use CSS `transition`, CSS `animation` ou classes Tailwind de animação. Mantenha
`defaultProps`, dimensões, FPS, duração e registro de composição visíveis e
determinísticos. Use `staticFile()` para assets locais em `public/`.

## Validação

Rode apenas comandos comprovados no projeto: typecheck, lint, tests, build,
Studio, still ou render. Registre `NOT_RUN` quando uma validação não puder ser
executada. Inspecione pelo menos abertura, primeiro reveal, trecho mais denso,
transição e CTA quando houver output visual. Código verde com mockup divergente
é `FAIL`.
