.DEFAULT_GOAL := help

# No Windows, o GNU Make cai no cmd.exe por padrao (que nao entende test/cp/awk).
# Forca o uso do Git Bash como shell das recipes e garante que seus binarios
# (grep, awk, cp, test, ...) estejam no PATH mesmo fora de um terminal Git Bash.
ifeq ($(OS),Windows_NT)
	SHELL := C:/Program Files/Git/usr/bin/bash.exe
	.SHELLFLAGS := -ec
	export PATH := /c/Program Files/Git/usr/bin:/c/Program Files/Git/bin:$(PATH)
endif

COMPOSE := docker compose

.PHONY: help up down start stop restart build rebuild logs logs-backend logs-frontend logs-postgres \
	ps status backend-shell frontend-shell postgres-shell prisma-studio prisma-generate prisma-push \
	prisma-migrate clean clean-volumes reset env

help: ## Mostra esta ajuda
	@echo "Comandos disponiveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'

env: ## Cria o .env a partir do .env.example (se ainda nao existir)
	@test -f .env || cp .env.example .env

up: env ## Sobe o ambiente (build + start em background)
	$(COMPOSE) up -d --build

start: ## Inicia os containers existentes sem rebuildar
	$(COMPOSE) up -d

down: ## Para e remove os containers
	$(COMPOSE) down

stop: ## Para os containers sem remove-los
	$(COMPOSE) stop

restart: down up ## Reinicia o ambiente (down + up)

build: ## Builda as imagens sem subir os containers
	$(COMPOSE) build

rebuild: ## Rebuilda as imagens sem cache e sobe o ambiente
	$(COMPOSE) build --no-cache
	$(COMPOSE) up -d

logs: ## Acompanha os logs de todos os servicos
	$(COMPOSE) logs -f

logs-backend: ## Acompanha os logs do backend
	$(COMPOSE) logs -f backend

logs-frontend: ## Acompanha os logs do frontend
	$(COMPOSE) logs -f frontend

logs-postgres: ## Acompanha os logs do postgres
	$(COMPOSE) logs -f postgres

ps: ## Lista os containers do projeto
	$(COMPOSE) ps

status: ps ## Alias para ps

backend-shell: ## Abre um shell no container do backend
	$(COMPOSE) exec backend sh

frontend-shell: ## Abre um shell no container do frontend
	$(COMPOSE) exec frontend sh

postgres-shell: ## Abre um shell psql no container do postgres
	$(COMPOSE) exec postgres psql -U $${POSTGRES_USER:-ambrozza} -d $${POSTGRES_DB:-ambrozza}

prisma-studio: ## Abre o Prisma Studio
	$(COMPOSE) exec backend npx prisma studio

prisma-generate: ## Gera o Prisma Client
	$(COMPOSE) exec backend npx prisma generate

prisma-push: ## Sincroniza o schema com o banco (db push)
	$(COMPOSE) exec backend npx prisma db push

prisma-migrate: ## Cria e aplica uma migration (uso: make prisma-migrate name=nome-da-migration)
	$(COMPOSE) exec backend npx prisma migrate dev --name $(name)

clean: down ## Para os containers e remove imagens do projeto
	$(COMPOSE) down --rmi local

clean-volumes: ## Remove containers e volumes (banco, node_modules, prisma gerado)
	$(COMPOSE) down -v

reset: clean-volumes up ## Reset completo: remove volumes e sobe o ambiente do zero
