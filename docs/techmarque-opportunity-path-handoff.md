# Techmarque Opportunity Path — handoff de produção

## Composição

- ID Remotion: `TechmarqueOpportunityPath`
- Formato: 1080 × 1920
- FPS: 30
- Duração: 1800 frames / 60 segundos
- Público: marmorarias em Cachoeiro
- Conceito: O caminho da oportunidade
- Transformação: dispersão → visibilidade → continuidade
- CTA: Comece pelo diagnóstico
- Assinatura: Diagnóstico antes da proposta

## Cenas

| Cena | Frames | Função |
| --- | ---: | --- |
| SF01 — Mais uma tela | 0–179 | quebra da percepção superficial |
| SF02 — Jornada fragmentada | 180–479 | busca, comparação, medidas, fotos e preço dispersos |
| SF03 — Contexto material | 480–689 | compra consultiva de marmoraria |
| SF04 — Oportunidade perdida | 690–929 | perda de contexto, responsável e próximo passo |
| SF05 — Torre de controle | 930–1199 | passagem do universo claro para operação grafite |
| SF06 — Operação visível | 1200–1589 | módulos determinísticos de origem, etapa, responsável e próximo passo |
| SF07 — Síntese e CTA | 1590–1799 | caminho contínuo + assinatura |

## Assets de logo

Os arquivos oficiais de logo ainda não estavam disponíveis no filesystem do projeto no momento desta implementação. A composição já possui a prop `logoSrc`; quando o PNG/SVG oficial estiver em `public/logos`, informe por `defaultProps`:

```tsx
logoSrc: 'logos/nome-do-arquivo.svg'
```

Enquanto `logoSrc` estiver vazio, o filme usa fallback textual `Techmarque`, sem inventar símbolo ou redesenhar marca.

## Princípios de produção

- Textos, linhas, cards e UI são layers reais em React/CSS/SVG-like divs.
- Nenhum PNG gerado por IA foi usado como background final.
- A UI é reconstruída como módulos editáveis, não como captura de software.
- As animações dependem de `useCurrentFrame()` e `interpolate()`.
- Não foram usadas CSS animations ou transitions.
- Safe area principal: 92 px laterais, 150 px topo, 210 px inferior.

## Comandos

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run still:opportunity
npm run render:opportunity
```
