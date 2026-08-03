# Adapter Remotion

Receba um `CREATIVE_SPEC` ou `TASK_HANDOFF` aprovado. Confirme execution root,
composição, ID, dimensions, FPS, duração, assets, props, safe areas e estado
final antes de editar.

Use o roteador Remotion para selecionar a capacidade mínima: markup para
composição/timing/props, multimedia para mídia, captions para legendas,
interactivity para edição no Studio e render para still/preview/final.
Animações usam `useCurrentFrame()` com `interpolate()` ou easing explícito;
não use transições CSS como prova de animação renderizável. Para elementos
editáveis no Studio, mantenha metadata e `defaultProps` visíveis junto da
composição e prefira propriedades CSS individuais a strings de `transform`.

Antes de declarar saída visual, rode a menor validação proporcional: typecheck,
lint e testes quando aplicáveis; still para layout/timing; render para entrega.
Inspecione abertura, reveal, trecho mais denso, transição e CTA. Entregue
`CODE_REPORT`, `RENDER_QA_MANIFEST` e `RETURN_PACKET`. Se não houver render ou
inspeção, mantenha `remotion_status: NOT_PROVEN`.
