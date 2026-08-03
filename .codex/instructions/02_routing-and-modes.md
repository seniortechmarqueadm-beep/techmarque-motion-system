# 02 — Roteamento, nós e modos

## Boot curto

`DISCOVER → LOAD_STATE → ROUTE → LOAD_MINIMUM → ACT → GATE → STATE_PATCH`.

O agente ativa o menor conjunto de módulos que consegue mudar a decisão, o
método, o risco ou a validação. Leitura excessiva não é profundidade; é custo e
ruído.

## Camada operacional

Se houver `TASK_HANDOFF.yaml` com `approval_status: approved`, pule a exploracao de rota e carregue somente o packet, o projeto resolvido e os modulos necessarios para a execucao. Use `Production`, `Refinement`, `Engineering`, `Audit` ou `Release`. Reabra `Discovery`, `Direction` ou `Decision` somente quando o handoff for invalido, um lock for tecnicamente impossivel ou o usuario pedir nova direcao.

| Nó | Função | Saída |
|---|---|---|
| O01 | descobrir root, convenções e superfície | `WORKSPACE_OBSERVATION` |
| O02 | carregar estado, locks e capabilities | `CONTEXT_PACK` |
| O03 | classificar pedido e ativar A00–A19 | `GRAPH_TRACE` |
| O04 | gerar e comparar rotas | `ROUTE_MATRIX` |
| O05 | converter escolha em contrato | `CREATIVE_SPEC` |
| O06 | planejar/criar estrutura em dry-run | `FOLDER_MANIFEST` |
| O07 | implementar o objeto aprovado | código, mídia ou documentos |
| O08 | inspecionar output e gates | `GATE_REPORT` |
| O09 | promover, devolver ou bloquear | `RELEASE_MANIFEST` |

## Modos

`DISCOVERY` abre até três rotas. `DIRECTION` recomenda uma. `DECISION` registra
locks. `SPECIFICATION` fecha entradas e aceite. `PRODUCTION` executa.
`REFINEMENT` preserva locks. `AUDIT` procura evidência e regressão.
`ENGINEERING` segue a sequência de inspeção e validação. `RELEASE` exige
paridade entre intenção, spec, código, render e pacote entregue.

## Ativação A00–A19

- A00/A01: sempre que houver conflito, estado ou mudança de superfície;
- A02/A03/A04: campanha, tese, roteiro, storyframe ou direção;
- A05/A06/A07: movimento 2D, 3D, VFX, composição e cor;
- A08: UI, CRM, produto, dashboard, campos e dados;
- A09/A10/A11: imagem/vídeo generativo, voz e sync;
- A12/A13/A14/A15: arquitetura, Remotion, Python, WebGL e FFmpeg;
- A16: qualquer output que possa ser promovido;
- A17/A18/A19: handoff, teste, aprendizado, versionamento ou release.

Se um predecessor for necessário para interpretar a saída, carregue-o. Se um
dossiê não for encontrado, registre `GAP`; não simule a leitura.
