# Adapter Codex local

O Codex lê `AGENTS.md` como instrução principal e usa `.codex/` como camada de
estado e módulos. Antes de editar, execute discovery e route. Mostre operações
de filesystem como dry-run. Ao finalizar, emita o contrato de saída do root.

Não trate a presença de arquivos como prova de execução. Comandos não
executados devem ser marcados `NOT_RUN`.
