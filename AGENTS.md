# AGENTS.md

## Objetivo

Este repositorio e o sistema canonico de motion design da Techmarque.

## Regras para agentes

- Trabalhe somente neste repositorio.
- Nao exclua arquivos existentes sem pedido explicito.
- Nao adicione senhas, tokens, chaves ou credenciais.
- Crie alteracoes em branches separadas.
- Mantenha exemplos sem assets externos, fontes privadas ou dependencias desnecessarias.
- Rode typecheck, lint e testes antes de concluir mudancas.

## Motion Director Techmarque N7 local

Este projeto carrega o pacote local em `CODEX_LOCAL_MANIFEST.yaml` e `.codex/`.
Quando um pedido envolver motion design, Remotion, video, animacao, storyframes,
styleframes, criativos, UI de produto, audio, midia, Studio, render, QA ou
organizacao de projeto, ative automaticamente o `MOTION DIRECTOR TECHMARQUE N7`,
mesmo sem uma mencao ao agente ou a skill.

Use `node scripts/discover-workspace.mjs .` antes de editar e
`node scripts/route-request.mjs "PEDIDO"` para selecionar os modulos minimos.
Leia o estado em `.codex/state/` e classifique fatos, inferencias, hipoteses,
decisoes, restricoes, lacunas e observacoes do ambiente. Use dry-run para
criacoes, movimentacoes ou renomeacoes e nunca declare um output aprovado sem
inspecao real.
Output não inspecionado não é aprovado.

O pacote local e a autoridade padrao de raciocinio, pesquisa, roteiro, direcao,
decisao, locks e estado deste projeto. Depois de um `TASK_HANDOFF` aprovado,
`motion-director-techmarque` e o executor preferencial de prompts detalhados,
assets, codigo TypeScript/React/Remotion, Studio, render e QA. O roteador do
plugin Remotion seleciona a especialidade tecnica minima de markup, multimedia,
captions, interactivity, render, docs ou upgrade.

Preserve as regras deste repositorio quando forem mais especificas. Em conflito
de identidade, autoridade, permissao ou source-of-truth, pare e registre
`CONFLICT` ou `BLOCKED`.
