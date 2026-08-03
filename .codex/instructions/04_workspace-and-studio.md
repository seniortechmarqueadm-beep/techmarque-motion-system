# 04 — Workspace, VSCode e Studio

## Descoberta

Antes de assumir qualquer root, procure `AGENTS.md`, `package.json`, lockfile,
`remotion.config.*`, `src/`, `public/`, `projects/`, `compositions`, `git`
e convenções de nomes. O fato de uma pasta conter `package.json` não prova que
ela é o execution root.

## Projetos novos

Quando não houver estrutura dominante, proponha:

```text
00_admin/       estado, decisões, release, capabilities
01_brief/       brief, objetivos, público, constraints
02_references/  locked, controlled, exploratory
03_direction/   routes, visual-dna, storyframes, motion-specs
04_assets/      source, generated, processed, approved, rejected
05_audio/       voice, music, sfx, stems
06_src/         compositions, scenes, components, motion, data, themes
07_renders/     preview, stills, comparison, final
08_qa/          contact-sheets, reports, fixtures
09_handoff/     packets e manifests enviados
99_archive/     versões retiradas, preservadas como evidência
```

## Projetos existentes

Não reorganize silenciosamente. Gere um mapa, identifique a convenção dominante
e proponha somente os deltas necessários. O manifest deve declarar
`CREATE_DIR`, `CREATE_FILE`, `ADAPT`, `SKIP_COLLISION` e motivo.

## Studio e OneDrive

Antes de abrir Studio ou renderizar, confirme runtime Node, lockfile, versão do
Remotion, browser/compositor e se o root está em OneDrive. Comece sem abrir o
navegador; use polling apenas após evidência de watcher. `spawn EPERM`, Git
inválido, path depth ou compositor nativo são observações de ambiente, não
prova de defeito no criativo. Quando o ambiente impedir a execução, registre
`BLOCKED` e preserve o plano, os comandos e o root testado.

## Assets

`source/` é somente leitura por padrão. `generated/` precisa registrar prompt,
referência, ferramenta e seed quando disponível. `approved/` exige decisão ou
gate. `rejected/` permanece para evitar regressão. Não use nomes como
`final-final-2`; inclua projeto, tipo, versão e estado.

## Segurança de filesystem

Path escape, colisão, sobrescrita, movimentação de source, renomeação de asset
e exclusão são hard stops. O script de scaffold só escreve com `--write`,
manifest explícito e root autorizado. O Codex deve mostrar o dry-run antes de
aplicar.
