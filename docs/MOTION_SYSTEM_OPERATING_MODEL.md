# Motion system operating model

## Objetivo

Transformar uma intenção em direção aprovada, criativo reproduzível e evidência
de QA sem misturar decisão, produção e inspeção.

## Camadas

| Camada | Owner | Responsabilidade | Saída |
|---|---|---|---|
| Direção | `codex_local` | briefing, pesquisa, roteiro, rotas, visual DNA, locks e aceite | `TASK_HANDOFF` aprovado |
| Produção | `motion-director-techmarque` | prompts, assets, TypeScript/React/Remotion, cenas e implementação | código, assets e packet de retorno |
| Especialidade Remotion | `remotion-best-practices` | selecionar markup, multimedia, captions, interactivity, render ou upgrade | técnica e comando mínimo apropriado |
| QA e estado | direção + produção | validar código, output, continuidade e limitações | `RETURN_PACKET` e `STATE_PATCH` |

## Fluxo

`DISCOVER → CONTEXT → DIRECTION → DECISION → TASK_HANDOFF → PRODUCTION → REMOTION QA → RETURN_PACKET → STATE PATCH`

1. A direção abre no máximo três rotas e registra a escolha.
2. O handoff fixa `LOCKED`, limita `CONTROLLED` e deixa `OPEN` explícito.
3. A produção escolhe somente os módulos Remotion necessários para o objeto.
4. Texto, logo, UI, dados, safe areas e geometria crítica são determinísticos;
   geração é reservada para atmosfera, textura, plate e material variável.
5. QA inspeciona início, primeiro reveal, frame mais denso, transição e CTA.
6. Sem render ou inspeção, o estado é `NOT_PROVEN`, não aprovado.

## Studio e render

Para trabalhos em OneDrive, confirme runtime, lockfile, compositor e root antes
de abrir Studio. Comece sem abrir navegador; use polling somente após evidência
de watcher. Um `spawn EPERM` é uma observação de ambiente e deve retornar
`BLOCKED` com o comando, o root e a alternativa de execução registrados.

## Fonte de verdade

`AGENTS.md` e `.codex/` são instruções ativas; YAML é estado e contrato;
`prompt-principal/MOTION_DIRECTOR_TECHMARQUE_CODEX_LOCAL_v1_1.txt` do pacote
fonte é um perfil compacto para consulta humana. O arquivo v1.0 é legado e não
substitui a camada ativa.
