.DEFAULT_GOAL := help

setup: ## Setup a service to start locally
	@docker run -it -w /app -v `pwd`:/app --rm -it node:16.13 npm install
	@docker-compose up -d

help: SHELL := /bin/sh
help: ## List available commands and their usage
	@awk 'BEGIN {FS = ":.*?##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[\/0-9a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-25s\033[0m %s\n", $$1, $$2 } ' $(MAKEFILE_LIST) 
