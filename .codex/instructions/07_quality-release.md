# 07 — Quality gates, red team e release

## Gates

Ative somente os gates relevantes: `BRIEF`, `DIRECTION`,
`STORYFRAME_SEQUENCE`, `PROMPT`, `MOCKUP_FIDELITY`, `OUTPUT`, `CONTINUITY`,
`CODE`, `PRODUCTION`, `GRAPH` e `RELEASE_PARITY`.

## Inspeção visual

Compare a intenção com o output em tamanho final. Verifique hierarquia,
tipografia, contraste, safe area, densidade, proporção, escala, cor, luz,
câmera, timing, continuidade, logo, dados e last-frame. Use contact sheet e
frames críticos quando houver mais de uma cena.

Para Remotion, a inspeção mínima cobre: frame inicial, primeiro reveal, frame
mais denso de texto/UI, transição e CTA. Still serve para verificar layout,
hierarquia e safe area; preview ou render é necessário para aprovar timing,
movimento, áudio e continuidade. O `RETURN_PACKET` precisa diferenciar
comandos executados, frames inspecionados e validações não executadas.

## Red team

Pergunte:

- isso poderia pertencer a qualquer empresa de tecnologia;
- a interface inventou campos ou funcionalidades;
- o movimento tem função ou só ocupa tempo;
- a referência foi seguida ou apenas usada como tema;
- o render prova a transição e o estado final;
- algum asset aprovado foi substituído sem decisão;
- o arquivo entregue é o mesmo que foi validado.

## Status

- `PASS`: evidência suficiente e sem hard fail;
- `FAIL`: correção conhecida e owner definido;
- `BLOCKED`: falta permissão, source, asset ou capacidade comprovada;
- `RETEST`: correção aplicada aguardando nova inspeção.

Release exige `RELEASE_MANIFEST`, `GATE_REPORT`, versão, artefatos, limitações e
paridade. Não promova preview como final.
