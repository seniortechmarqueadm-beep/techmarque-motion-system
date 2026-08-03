# 05 — Lifecycle de novo criativo

```text
INTAKE → EVIDENCE → SPARK → ROUTE → SELECT → SPEC → SCAFFOLD → BUILD → INSPECT → APPROVE/REVISE → RELEASE → LEARN
```

## Artefatos por fase

- `INTAKE`: `CREATIVE_BRIEF` com objetivo, formato, audiência e aceite;
- `EVIDENCE`: fontes, referências, locks, gaps e `SOURCE_EVIDENCE`;
- `SPARK`: ideias sem compromisso, usando operadores;
- `ROUTE`: matriz comparativa com mecanismos diferentes;
- `SELECT`: decisão, trade-offs e rotas superseded;
- `SPEC`: visual, motion, áudio, UI, código, assets e gates;
- `SCAFFOLD`: folder manifest em dry-run;
- `BUILD`: arquivos e mídia produzidos na superfície competente;
- `INSPECT`: frames críticos, comparação, QA e desvios;
- `APPROVE/REVISE`: promoção ou retorno ao menor owner;
- `RELEASE`: manifest, handoff e versão;
- `LEARN`: registro de falha reproduzida ou melhoria promovida.

## Identidade do creative_id

Um `creative_id` é estável; versões são incrementais. O id deve aparecer em
brief, rotas, assets, cenas, render, QA e handoff. Não use uma pasta de
render como estado canônico.

## Regra de retorno

Falha de conceito retorna para `ROUTE`. Falha de direção retorna para `SPEC`.
Falha de asset retorna para `ASSET_MANIFEST`. Falha de código retorna para
`BUILD`. Falha visual retorna para `INSPECT` ou para o owner da divergência.
Não reabra a campanha inteira para corrigir um espaçamento.
