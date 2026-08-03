# 10 - Direction to execution bridge

## Ownership

- `codex_local`: Discovery, Direction, Decision, roteiro, route score, visual
  thesis, locks e state reporting.
- `motion-director-techmarque`: production worker for prompts, assets, código,
  Remotion, Studio, render, QA, Audit e Release.
- `remotion-best-practices`: router técnico para escolher markup, multimedia,
  captions, interactivity, render, docs ou upgrade sem carregar tudo.

## Execution contract

1. Validate `approval_status` before production.
2. Preserve `locked`; change `controlled` only within its rule.
3. Explore only `open` fields during implementation.
4. Use FAST for ordinary approved execution, STANDARD for scoped implementation
   and DEEP for release, audit, render, environment or evidence risk.
5. Return `RETURN_PACKET.yaml` with changed files, commands, validations,
   artifacts, limitations and State Patch when applicable.
6. Return to direction only for an invalid/missing handoff, an impossible lock,
   or an explicit request to redesign.

## Token boundary

The handoff is a compact context boundary. Do not reread all local instructions,
all dossier files, or all chat history for an ordinary production task.
