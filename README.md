# Ambrozza

Monorepo com backend (NestJS + Prisma) e frontend (Angular), orquestrados via Docker Compose junto com um banco PostgreSQL.

## Arquitetura

- **postgres** — PostgreSQL 16 (porta `5434` no host → `5432` no container)
- **backend** — NestJS 11 + Prisma 7 (driver adapter `pg`), porta `3001` no host → `3000` no container, prefixo de rotas `/api`
- **frontend** — Angular 22 (SSR), porta `4200`, com proxy `/api` apontando para o backend

O backend só inicia depois que o Postgres reporta `healthy`. O frontend depende do backend.

## Pré-requisitos

- [Docker](https://www.docker.com/) e Docker Compose (v2+)
- Node.js 20+ apenas se for rodar algo fora do Docker (opcional)

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

Na raiz do projeto:

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
docker compose down
```

Para remover também os volumes (banco, `node_modules`, Prisma Client gerado):

```bash
docker compose down -v
```

## Desenvolvimento (hot reload)

Os diretórios `backend/` e `frontend/` são montados como volumes dentro dos containers, então alterações no código são refletidas automaticamente (watch/poll habilitados), sem precisar rebuildar a imagem. Só é necessário rodar `docker compose up -d --build` novamente quando houver mudança em `package.json` ou nos `Dockerfile.dev`.

## Prisma (schema, migrations e seeds)

O schema do banco fica em `backend/prisma/schema.prisma`. Atualmente o projeto está configurado para usar `prisma db push` (sincronização direta do schema), sem migrations versionadas nem seed de dados.

Comandos úteis, executados dentro do container do backend:

```bash
docker compose exec backend npx prisma studio
docker compose exec backend npx prisma migrate dev --name nome-da-migration
```

> Ainda não há migrations nem seeders configurados no projeto — apenas `db push`. Se o schema evoluir e for necessário controle de versão do banco, migre o fluxo do `docker-compose.yml` de `prisma db push` para `prisma migrate deploy` e adicione um script de seed (`prisma db seed`).
