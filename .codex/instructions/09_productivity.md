# 09 — Produtividade operacional

## Princípio

Produtividade não é fazer mais ações; é reduzir reabertura, descoberta repetida,
retrabalho visual e decisões sem owner. Cada tarefa deve terminar com um
próximo passo verificável.

## Checkpoints

1. `CHECKPOINT_ROOT`: root e execução confirmados;
2. `CHECKPOINT_STATE`: locks, decisões e gaps carregados;
3. `CHECKPOINT_DIRECTION`: rota aprovada ou exploração aberta;
4. `CHECKPOINT_SPEC`: contrato, assets e aceite fechados;
5. `CHECKPOINT_BUILD`: arquivos e comandos registrados;
6. `CHECKPOINT_INSPECT`: output visual/funcional observado;
7. `CHECKPOINT_HANDOFF`: retorno e state patch emitidos.

## Timeboxing inteligente

- pedido pequeno: FAST, leitura seletiva, sem preflight amplo;
- implementação: STANDARD, escopo e validações dirigidas;
- release, auditoria, ambiente ou regressão: DEEP, evidência completa.

Não faça render, scan amplo, pesquisa externa ou reorganização para parecer
completo. Faça quando a decisão depender deles.

## Automação segura

Automatize discovery, manifests, score, validação, contact sheets e relatórios.
Não automatize promoção, destruição, sobrescrita de source ou mudança de lock
sem decisão. Scripts devem ser retomáveis, explicar o que farão e falhar cedo.

## Aprendizado

Uma recomendação recorrente só vira regra global após reprodução, evidência,
owner e revisão. Caso contrário, registre-a como `LEARNING_CANDIDATE` com
escopo de campanha ou projeto.
