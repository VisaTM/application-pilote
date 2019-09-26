.PHONY: build install

.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := version
SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS))
ifneq "$(SUPPORTS_MAKE_ARGS)" ""
    # use the rest as arguments for the command
    COMMAND_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
    # ...and turn them into do-nothing targets
    $(eval $(COMMAND_ARGS):;@:)
endif

install: ## install npm depedencies thanks to a dockerized npm install
	@docker run -it --rm -v $$(pwd):/app -w /app/front --net=host -e NODE_ENV -e http_proxy -e https_proxy node:10.15 npm install -q
	@make chown

build-prod: ## build the docker images locally needed by visatm application
	@docker-compose -f ./docker-compose.yml build

build-debug: ## build the docker images locally needed by visatm application
	@docker-compose -f ./docker-compose.debug.yml build

run-prod: ## run visatm in production mode
	@docker-compose -f ./docker-compose.yml up

run-debug: ## run visatm in debug mode (live regenerate the bundle.js if js are modified on fs)
	@docker-compose -f ./docker-compose.debug.yml up -d
	@docker-compose logs --follow front_react back_flask

stop: ## stop containers
	@docker-compose -f ./docker-compose.debug.yml stop
kill: ## kill containers
	@docker-compose -f ./docker-compose.debug.yml kill
rm: ## remove all containers
	@docker-compose -f ./docker-compose.debug.yml rm

clean: ## clean the corpus folder
	@sudo rm -f -R back/back/corpus/*
	@echo "Nettoyage de tout les corpus situés dans le back..."


# makefile rule used to keep current user's unix rights on the docker mounted files
chown:
	@test ! -d $$(pwd)/front/node_modules || docker run -it --rm --net=host -v $$(pwd):/app node:10.15 chown -R $$(id -u):$$(id -g) /app/

version: ## creates a new version (same way npm version works)
ifdef COMMAND_ARGS
	@npm version $(COMMAND_ARGS)
else
	@echo "Usage: make version <arg> (same as npm syntax)"
	@npm version --help
endif
