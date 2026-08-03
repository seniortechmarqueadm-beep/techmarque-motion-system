# 08 — Handoff, retorno e estado

## Handoff mínimo

Um handoff precisa carregar `logical_agent_id`, `from_surface`, `to_surface`,
`approval_status`, `execution_lane`, `controlled`, `open`, `visual_dna` e
`narrative_beats`. O handoff aprovado e a fronteira de contexto: a execucao
recebe esse packet, nao todo o pacote local. `locked` nao muda em Production ou
Refinement; `controlled` exige a regra declarada; `open` e o espaco normal de
ajuste.
`project_id`, `task_id`, `creative_id`, source of truth, locks, inputs, specs,
assets, aceite, testes, artefatos esperados e `return_to`.

## Retorno mínimo

Um `RETURN_PACKET` deve listar arquivos alterados, comandos executados,
validações, artefatos, desvios visuais, limitações, status e `STATE_PATCH`.
Não transfira somente uma explicação de chat.

## Estado

`PROJECT_STATE` descreve o estado atual; `DECISION_LEDGER` descreve decisões;
`GRAPH_TRACE` descreve nós ativados e fontes lidas; `CAPABILITY_REGISTRY`
separa capacidade declarada de capacidade comprovada. Atualize apenas depois
de validar o objeto correto.

## Superfícies

- Project: direção, aprovação e contexto;
- Work: pesquisa e entregáveis longos;
- Skill: workflow especializado;
- Codex/VSCode: inspeção, código, scripts e arquivos;
- Remotion: execução audiovisual e render;
- GitHub/Vercel: integração, publicação e ambiente quando comprovados.

Paridade nunca é presumida. O packet deve declarar a superfície que realmente
executou a ação.

## Ownership por camada

- `codex_local`: briefing, pesquisa, roteiro, direção, decisão, locks e estado;
- `motion-director-techmarque`: prompts, assets, código e produção do criativo;
- `remotion`: especialidade de markup, Studio, mídia, render e QA;
- `RETURN_PACKET`: evidência que retorna a produção ao owner de direção.
