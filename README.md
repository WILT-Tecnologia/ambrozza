# Ambrozza

Monorepo com backend (NestJS + Prisma) e frontend (Angular), orquestrados via Docker Compose junto com um banco PostgreSQL.

## Arquitetura

- **postgres** — PostgreSQL 16 (porta `5434` no host → `5432` no container)
- **backend** — NestJS 11 + Prisma 7 (driver adapter `pg`), porta `3001` no host → `3000` no container, prefixo de rotas `/api`
- **frontend** — Angular 22 (SSR), porta `4200`, com proxy `/api` apontando para o backend

O backend só inicia depois que o Postgres reporta `healthy`. O frontend depende do backend.

## Pré-requisitos

- [Docker](https://www.docker.com/) e Docker Compose (v2+)
- `make`, para usar os atalhos do [Makefile](#comandos-do-makefile) (opcional, veja [instalação](#instalando-o-make))
- Node.js 20+ apenas se for rodar algo fora do Docker (opcional)

### Instalando o `make`

**Linux**

Na maioria das distribuições o `make` já vem instalado. Se não estiver disponível:

```bash
# Debian/Ubuntu
sudo apt update && sudo apt install -y make

# Fedora
sudo dnf install -y make

# Arch
sudo pacman -S make
```

**Windows**

Escolha uma das opções abaixo:

- **winget**:

  ```powershell
  winget install GnuWin32.Make
  ```

- **Chocolatey** (executar no PowerShell como administrador):

  ```powershell
  choco install make
  ```

- **Scoop**:

  ```powershell
  scoop install make
  ```

- **WSL** (recomendado para desenvolvimento): dentro da distro Linux (Ubuntu, por exemplo), instale como descrito acima em "Linux".

- **Git Bash / MSYS2**: instale o pacote `make` via [MSYS2](https://www.msys2.org/) (`pacman -S make`) e garanta que o binário esteja no `PATH`.

Verifique a instalação com:

```bash
make --version
```

> **Importante (Windows):** o `Makefile` deste projeto usa sintaxe de shell POSIX (`test`, `cp`, `grep`, `awk`, expansão `$${VAR:-default}`). O `make` nativo do Windows (instalado via winget/Chocolatey/Scoop) cai no `cmd.exe` por padrão, que não entende esses comandos. Por isso é necessário ter o **Git for Windows** instalado (ele já traz o Git Bash com `sh`, `grep`, `awk`, `cp`, etc.) — o `Makefile` detecta o Windows automaticamente e força o uso do Git Bash (`C:/Program Files/Git/usr/bin/bash.exe`) como shell das recipes. Se o Git estiver instalado em outro caminho, ajuste a variável `SHELL` no topo do `Makefile`. Alternativamente, rode os comandos dentro do **WSL**, onde tudo funciona nativamente.

Caso não queira instalar o `make`, todos os comandos do Makefile podem ser executados diretamente com `docker compose` (veja os comandos equivalentes na seção [Comandos do Makefile](#comandos-do-makefile)).

## Configuração

1. Clone o repositório e entre na pasta raiz.
2. Copie o arquivo de variáveis de ambiente:

   ```bash
   cp .env.example .env
   ```

   Variáveis disponíveis (usadas pelo serviço `postgres` no `docker-compose.yml`):

   | Variável            | Padrão      | Descrição                  |
   | ------------------- | ----------- | --------------------------- |
   | `POSTGRES_USER`     | `ambrozza`  | Usuário do banco            |
   | `POSTGRES_PASSWORD` | `ambrozza`  | Senha do banco              |
   | `POSTGRES_DB`       | `ambrozza`  | Nome do banco               |

   Ajuste os valores se necessário — os padrões já funcionam para desenvolvimento local.

## Subindo o ambiente

Na raiz do projeto, com `make`:

```bash
make up
```

Ou diretamente com Docker Compose:

```bash
docker compose up -d --build
```

Isso vai:

1. Subir o **Postgres** e aguardar o healthcheck (`pg_isready`).
2. Buildar e subir o **backend**, que executa automaticamente:
   - `npx prisma generate` — gera o Prisma Client
   - `npx prisma db push --accept-data-loss` — sincroniza o schema com o banco
   - `npm run start:dev` — inicia o Nest em modo watch
3. Buildar e subir o **frontend** (`ng serve --host 0.0.0.0 --poll 2000`).

Acompanhar os logs:

```bash
docker compose logs -f
# ou de um serviço específico
docker compose logs -f backend
docker compose logs -f frontend
```

## Acessando a aplicação

- Frontend: http://localhost:4200
- Backend (API): http://localhost:3001/api
- Postgres: `localhost:5434` (usuário/senha/banco conforme `.env`)

## Parando o ambiente

```bash
make down
```

Para remover também os volumes (banco, `node_modules`, Prisma Client gerado):

```bash
make clean-volumes
```

## Comandos do Makefile

O `Makefile` reúne atalhos para os comandos de Docker Compose e Prisma mais usados no dia a dia. Rode `make help` para ver a lista completa:

| Comando | Descrição |
| --- | --- |
| `make up` | Sobe o ambiente (build + start em background) |
| `make start` | Inicia os containers existentes sem rebuildar |
| `make down` | Para e remove os containers |
| `make stop` | Para os containers sem removê-los |
| `make restart` | Reinicia o ambiente (down + up) |
| `make build` | Builda as imagens sem subir os containers |
| `make rebuild` | Rebuilda as imagens sem cache e sobe o ambiente |
| `make logs` / `logs-backend` / `logs-frontend` / `logs-postgres` | Acompanha os logs |
| `make ps` | Lista os containers do projeto |
| `make backend-shell` / `frontend-shell` / `postgres-shell` | Abre um shell no container |
| `make prisma-studio` | Abre o Prisma Studio |
| `make prisma-generate` | Gera o Prisma Client |
| `make prisma-push` | Sincroniza o schema com o banco (`db push`) |
| `make prisma-migrate name=nome-da-migration` | Cria e aplica uma migration |
| `make clean` | Para os containers e remove imagens do projeto |
| `make clean-volumes` | Remove containers e volumes (banco, `node_modules`, Prisma gerado) |
| `make reset` | Reset completo: remove volumes e sobe o ambiente do zero |

## Desenvolvimento (hot reload)

Os diretórios `backend/` e `frontend/` são montados como volumes dentro dos containers, então alterações no código são refletidas automaticamente (watch/poll habilitados), sem precisar rebuildar a imagem. Só é necessário rodar `make up` novamente quando houver mudança em `package.json` ou nos `Dockerfile.dev`.

## Prisma (schema, migrations e seeds)

O schema do banco fica em `backend/prisma/schema.prisma`. Atualmente o projeto está configurado para usar `prisma db push` (sincronização direta do schema), sem migrations versionadas nem seed de dados.

Comandos úteis:

```bash
make prisma-studio
make prisma-migrate name=nome-da-migration
```

> Ainda não há migrations nem seeders configurados no projeto — apenas `db push`. Se o schema evoluir e for necessário controle de versão do banco, migre o fluxo do `docker-compose.yml` de `prisma db push` para `prisma migrate deploy` e adicione um script de seed (`prisma db seed`).
