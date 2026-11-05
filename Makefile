SHELL := /bin/bash
.DEFAULT_GOAL := help

.PHONY: help install dev build preview typecheck clean

help: ## Show all available make targets
	@echo "replacearr.com — marketing site"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z0-9_-]+:.*?##/ { printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

install: ## Install npm dependencies
	npm install

dev: ## Start Vite dev server
	npm run dev

build: ## Typecheck, build dist/, and copy index.html → 404.html for Pages
	npm run build

preview: ## Serve the production build locally
	npm run preview

typecheck: ## Run TypeScript check (tsc --noEmit via project refs)
	npm run typecheck

clean: ## Remove build output
	rm -rf dist
