# Techmarque Motion System

Repositório de referência, versionamento e colaboração técnica do sistema de motion design da Techmarque, baseado em React, TypeScript e Remotion.

## Papel deste repositório

A estação operacional primária permanece no ambiente local, onde o Remotion Studio, os assets privados, os caches e os renders de trabalho são executados. Este repositório funciona como:

- espelho técnico controlado do ambiente local;
- histórico de versões e decisões de engenharia;
- ponto de colaboração com Codex e outros agentes;
- armazenamento de código, schemas, testes e documentação não sensível;
- contrato técnico do grafo institucional usado pelo Motion Director.

O conteúdo do GitHub não deve ser tratado automaticamente como cópia integral ou estado em tempo real do computador local. A equivalência entre os dois ambientes deve ser confirmada por commit, manifesto de sincronização ou handoff explícito.

## Fontes da verdade

| Domínio | Fonte principal |
|---|---|
| Lógica institucional, áreas, owners e fluxos | Notion — Página 0 e nós canônicos |
| Contratos, propostas, OS, SLA e documentos formais | Google Drive |
| Código, schemas, testes e histórico técnico | GitHub |
| Estado publicado e deployments | Vercel |
| Execução de Remotion, assets privados e renders intermediários | Ambiente local |
| Estado da campanha e decisões audiovisuais | Project State, Decision Ledger, Visual DNA e Continuity Pack |

Consulte `docs/institutional-contract/` para o contrato técnico dessas relações.

## Estado do espelho

Este repositório pode conter somente parte do projeto local. Antes de usar scripts, composições ou comandos como evidência de execução:

1. confirme que os arquivos referenciados existem no branch atual;
2. compare o manifesto de sincronização com o ambiente local;
3. execute as validações correspondentes;
4. não declare Studio, teste, build ou render como aprovado sem execução real.

## Instalação esperada

Quando o código local estiver sincronizado com este repositório:

```bash
pnpm install
pnpm studio
```

Comandos declarados no `package.json`:

- `pnpm dev` / `pnpm studio`: abre o Remotion Studio;
- `pnpm typecheck`: valida TypeScript;
- `pnpm lint`: executa lint;
- `pnpm test`: executa testes;
- `pnpm build`: gera o bundle;
- scripts `render:*` e `still:*`: geram artefatos específicos.

A existência do comando não comprova que a composição ou o arquivo de entrada está presente no espelho atual.

## Estrutura recomendada

```text
src/                         código Remotion sincronizado
public/                      assets liberados para versionamento
projects/                    campanhas e produtos sem material sensível
tests/                       testes automatizados
scripts/                     automações reproduzíveis
docs/                        documentação técnica
  institutional-contract/   grafo, schemas e fontes da verdade
out/                         renders locais ignorados pelo Git
```

## Fluxo Project → Codex → Remotion

```text
Motion Director Project
→ briefing e estado aprovados
→ Storyframe/Visual/Motion Packet
→ Codex no repositório
→ implementação local editável
→ Remotion Studio
→ frames críticos e comparação visual
→ testes, render e State Patch
```

## Regras de segurança

- Nunca versionar senhas, tokens, chaves, cookies ou credenciais.
- Manter `.env` local e somente modelos em `.env.example`.
- Não versionar fontes licenciadas ou assets de clientes sem autorização.
- Não publicar conteúdo institucional integral copiado do Notion ou documentos formais do Drive.
- Usar IDs, URLs canônicas, schemas e snapshots controlados para integração entre fontes.

## Governança

Leia `AGENTS.md` antes de qualquer alteração. Mudanças devem ocorrer em branch separada e passar por revisão antes de entrar em `main`.
