# Fundação operacional do Techmarque Motion System

Esta baseline fecha o ciclo mínimo do agente para produção profissional:

`pedido → codex_local → TASK_HANDOFF → motion-director-techmarque → Remotion → QA → RETURN_PACKET → GitHub`

## Autoridade por camada

- Notion governa lógica institucional, autoridade e decisões.
- Google Drive preserva documentos formais e ativos aprovados.
- GitHub registra código, branches, commits, revisões e histórico técnico.
- O pacote local conduz Discovery, Direction, Decision, roteiro, locks e estado.
- `motion-director-techmarque` executa prompts, assets, código, Studio, render e QA.
- O plugin Remotion fornece as regras de markup, interatividade e render.

## Raízes

- Fonte canônica documental: `C:/Users/allan/OneDrive/CONTATOS Necta Rio/REMOTION AGENT`.
- Checkout técnico Git e execução: `C:/Users/allan/Documents/Codex/techmarque-motion-system`.
- Repositório remoto: `seniortechmarqueadm-beep/techmarque-motion-system`.

O checkout externo é a raiz de install, testes, Studio e render. A sincronização deve ser explícita e validada por diff; não é bidirecional automática.

## Golden path

1. Resolver `project_id` em `docs/PROJECT_REGISTRY.yaml`.
2. Ler estado e fontes governantes.
3. Produzir um `TASK_HANDOFF.yaml` aprovado.
4. Executar somente os módulos necessários.
5. Rodar typecheck, lint, testes, bundle, stills críticos e render.
6. Inspecionar abertura, reveal, frame denso, transição e CTA.
7. Preencher `RETURN_PACKET.yaml`, Gate Report e State Patch.
8. Publicar branch e Pull Request; não fazer merge automático em `main`.

## Piloto de referência

O primeiro golden path é `TechmarqueFoundationPilot`: 1080x1920, 30 fps, 360 frames e quatro cenas determinísticas. O piloto é silencioso por decisão de escopo e não usa mídia remota.

Os contratos e padrões ficam em `projects/foundation-pilot/`.
