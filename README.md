# Techmarque Motion System

Este projeto e o ponto central para criar videos, animacoes e templates de motion design da Techmarque usando React, TypeScript e Remotion.

## Direcao automatica do projeto

Pedidos relacionados a motion, video, Remotion, criativos, storyframes,
styleframes, Studio ou QA ativam automaticamente o `MOTION DIRECTOR TECHMARQUE
N7` por meio de `AGENTS.md`, `CODEX_LOCAL_MANIFEST.yaml` e `.codex/`. Nao e
necessario mencionar o agente. O projeto conduz a direcao e o roteiro; depois
de um handoff aprovado, a skill `motion-director-techmarque` executa prompts,
assets, codigo e producao do criativo, com o plugin Remotion selecionando a
especialidade tecnica necessaria.

Comandos de orientacao e validacao:

```bash
pnpm discover:motion
pnpm route:motion "criar novo criativo vertical no Remotion"
pnpm validate:motion
```

## Producao do criativo

O fluxo canonico e `ideia → direcao → decisao → TASK_HANDOFF → producao → QA →
RETURN_PACKET`. O handoff fixa `LOCKED`, limita `CONTROLLED` e deixa `OPEN`
explicito. A producao escolhe somente os modulos Remotion necessarios: markup,
multimedia, captions, interactivity, render ou upgrade.

O golden path operacional está documentado em
`docs/FOUNDATION_OPERATING_BASELINE.md`. O piloto `TechmarqueFoundationPilot`
prova esse fluxo em um filme vertical de 12 segundos, sem mídia remota.

Para animacoes, use tempo de frame explicito e componentes determinísticos para
texto, logo, UI, dados, safe area e geometria. Still valida layout; preview ou
render valida timing, movimento, audio e continuidade. O modelo completo esta
em `docs/MOTION_SYSTEM_OPERATING_MODEL.md`.

## O que existe aqui

O projeto comeca com uma composicao de exemplo chamada `TechmarqueMotionDemo`. Ela tem 5 segundos, tamanho Full HD (1920x1080), 30 quadros por segundo, fundo neutro e texto com entrada e saida suaves.

## Como instalar

1. Instale o Node.js, se ainda nao tiver.
2. Abra a pasta do projeto no terminal.
3. Rode:

```bash
pnpm install
```

## Como abrir

Para abrir o ambiente visual do Remotion, rode:

```bash
pnpm studio -- --no-open
```

Tambem existe o comando:

```bash
pnpm dev
```

Em Codex ou OneDrive, comece sem abrir o navegador. Se houver erro de watcher,
repita com polling:

```bash
pnpm studio -- --no-open --webpack-poll 1000
```

Nao trate um Studio iniciado como aprovacao visual: still, preview ou render e
inspecao continuam sendo gates separados.

## Como visualizar a composicao

Depois que o Remotion Studio abrir, selecione `TechmarqueMotionDemo` na lista de composicoes.

## Como renderizar o video de exemplo

Para gerar um video MP4 da composicao de demonstracao, rode:

```bash
pnpm render:demo
```

O arquivo sera criado em `out/techmarque-motion-demo.mp4`.

## Comandos principais

- `pnpm dev`: abre uma previa de desenvolvimento.
- `pnpm studio -- --no-open`: inicia o Remotion Studio sem abrir o navegador.
- `pnpm typecheck`: verifica se o TypeScript esta correto.
- `pnpm lint`: verifica padroes de codigo.
- `pnpm test`: executa testes automatizados.
- `pnpm build`: prepara o bundle do projeto Remotion.
- `pnpm render:demo`: renderiza a composicao de exemplo.
- `pnpm render:foundation`: renderiza o piloto da fundação operacional.
- `pnpm still:foundation`: renderiza o frame final do piloto.

## Para que serve cada pasta

- `src/compositions`: videos finais que aparecem no Remotion Studio.
- `src/scenes`: partes maiores de uma composicao.
- `src/components`: blocos reutilizaveis de interface e motion.
- `src/transitions`: efeitos de passagem entre cenas.
- `src/typography`: estilos e componentes de texto.
- `src/layouts`: estruturas de tela e posicionamento.
- `src/themes`: cores, medidas e tokens visuais.
- `src/utils`: funcoes auxiliares.
- `public/logos`: logos da Techmarque e marcas aprovadas.
- `public/fonts`: fontes liberadas para uso no projeto.
- `public/images`: imagens usadas nos videos.
- `public/videos`: videos brutos ou materiais de apoio.
- `public/audio`: musicas, trilhas e efeitos sonoros permitidos.
- `projects/institutional`: videos institucionais.
- `projects/products`: videos de produtos.
- `projects/campaigns`: campanhas comerciais e promocionais.
- `projects/clients`: materiais especificos de clientes.
- `tests`: testes automatizados.
- `scripts`: automacoes e comandos auxiliares.
- `docs`: documentacao do sistema.

## Seguranca

Nao adicione senhas, tokens, chaves ou credenciais ao repositorio. Use `.env.example` apenas como modelo.
