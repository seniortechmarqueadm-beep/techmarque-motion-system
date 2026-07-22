# Contrato Institucional e Técnico

Esta pasta registra somente a topologia técnica necessária para conectar o Motion Director às fontes vivas da Techmarque. Ela não substitui o conteúdo institucional do Notion nem os documentos formais do Google Drive.

## Autoridade por domínio

- **Notion:** lógica institucional, Página 0, códigos de leitura, fluxos, owners e nós canônicos.
- **Google Drive:** contratos, propostas, OS, SLA, políticas e documentos formais.
- **GitHub:** código, schemas, testes, documentação técnica e histórico.
- **Vercel:** estado publicado, deployments e experiência disponível.
- **Ambiente local:** execução real do Remotion, assets privados, caches e renders intermediários.
- **Documento vinculante:** decide o caso concreto quando houver obrigação formal.

## Regra de leitura

Para qualquer tarefa institucional ou audiovisual com impacto real:

1. classifique o pedido e o fluxo afetado;
2. consulte a Página 0 quando houver contexto institucional;
3. resolva o código de leitura ou nó canônico;
4. identifique nó governante, executor, registrador e decisor;
5. expanda somente para fontes necessárias;
6. separe fato, inferência e hipótese;
7. pare quando objetivo, autoridade, estado, método e aceite estiverem definidos.

## Conteúdo desta pasta

- `source-map.yaml`: autoridade e responsabilidade de cada fonte;
- `reading-graph.yaml`: contrato técnico mínimo do grafo de leitura;
- `local-sync-manifest.example.yaml`: modelo para declarar o estado do espelho local/GitHub;
- `motion-task-packet.example.yaml`: handoff mínimo Project → Codex → Remotion.

## Limites

- Não duplicar integralmente páginas do Notion no GitHub.
- Não versionar documentos formais ou dados sensíveis do Drive.
- Não presumir que o repositório reflete o computador local em tempo real.
- Não promover snapshots a fonte canônica sem validação humana.
