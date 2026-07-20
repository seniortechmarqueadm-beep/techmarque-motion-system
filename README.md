# Techmarque Motion System

Este projeto e o ponto central para criar videos, animacoes e templates de motion design da Techmarque usando React, TypeScript e Remotion.

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
pnpm studio
```

Tambem existe o comando:

```bash
pnpm dev
```

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
- `pnpm studio`: abre o Remotion Studio.
- `pnpm typecheck`: verifica se o TypeScript esta correto.
- `pnpm lint`: verifica padroes de codigo.
- `pnpm test`: executa testes automatizados.
- `pnpm build`: prepara o bundle do projeto Remotion.
- `pnpm render:demo`: renderiza a composicao de exemplo.

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
