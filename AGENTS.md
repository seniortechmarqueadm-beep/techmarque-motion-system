# AGENTS.md

## Missão

Este repositório é o espelho técnico controlado do sistema local de motion design da Techmarque. O ambiente local permanece a estação operacional primária para Remotion Studio, assets privados, caches e renders. O GitHub governa código versionado, schemas, testes, documentação técnica e histórico.

## Fontes da verdade

Antes de executar uma tarefa, identifique o domínio:

- Notion: lógica institucional, Página 0, fluxos, owners e nós canônicos.
- Google Drive: contratos, propostas, OS, SLA e documentos formais.
- GitHub: código, schemas, testes e capacidade técnica versionada.
- Vercel: estado publicado e deployments.
- Ambiente local: execução real do Remotion e estado de trabalho não sincronizado.
- Project State / Decision Ledger / Visual DNA / Continuity Pack: estado audiovisual vigente.

Memória de chat ajuda a localizar contexto, mas não substitui fonte canônica atual.

## Protocolo obrigatório

INSPECT → DIAGNOSE → PLAN → IMPLEMENT → VALIDATE → INSPECT OUTPUT → REPORT → STATE PATCH.

### INSPECT

- Leia este arquivo, `README.md`, `package.json`, configs e documentação relacionada.
- Confirme branch, arquivos existentes, dependências e composição afetada.
- Verifique se o repositório está sincronizado com o ambiente local por manifesto ou handoff.

### DIAGNOSE

- Separe fato observado, inferência e hipótese.
- Identifique campos LOCKED, CONTROLLED e OPEN.
- Não presuma que comandos declarados comprovam a existência de composições ou renders.

### PLAN

- Defina arquivos afetados, riscos, testes e artefatos esperados.
- Não altere direção criativa sem Creative/Visual Packet aprovado.
- Para mockup aprovado, inclua Mockup Fidelity Gate.

### IMPLEMENT

- TypeScript é padrão para React, Remotion e Node.
- Python é padrão para automação, análise e mídia quando apropriado.
- Não altere arquivos não relacionados.
- Não introduza dependências sem justificativa e inspeção do lockfile.
- Não versionar credenciais, fontes licenciadas ou assets restritos.

### VALIDATE

Execute somente validações aplicáveis e reporte o resultado real:

- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`
- `pnpm build`
- renders/stills de frames críticos

Nunca declare PASS sem executar.

### INSPECT OUTPUT

Para mudanças visuais, compare render e referência aprovada em composição, escala, tipografia, espaçamento, cor, hierarquia e continuidade.

### REPORT

Retorne:

- arquivos alterados;
- comandos executados;
- validações;
- artefatos;
- limitações;
- desvios visuais;
- State Patch proposto.

## Branches e revisão

- Trabalhe em branch separada.
- Não exclua arquivos sem pedido explícito.
- Não faça merge automático em `main`.
- Abra Pull Request com resumo, riscos, testes e limitações.

## Handoff mínimo para Codex

Toda tarefa deve conter:

- objetivo;
- fontes da verdade;
- inputs;
- LOCKED / CONTROLLED / OPEN;
- especificações;
- critérios de aceite;
- testes;
- artefatos esperados;
- aprovação necessária.

## Segurança

- Nunca adicionar senhas, tokens, chaves, cookies ou credenciais.
- Usar `.env` local e `.env.example` apenas como modelo.
- Não copiar integralmente conteúdo sensível do Notion ou Drive para o repositório.
- Usar IDs, URLs canônicas, schemas e snapshots controlados.
