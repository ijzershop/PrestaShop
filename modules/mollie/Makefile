SHELL:=/bin/bash

MODULE_NAME:=mollie
MODULE_VERSION:=$(shell sed -ne "s/\\\$$this->version *= *['\"]\([^'\"]*\)['\"] *;.*/\1/p" ${MODULE_NAME}.php | awk '{$$1=$$1};1')

COLOR_BLACK:=\u001b[30m
COLOR_RED:=\u001b[31m
COLOR_GREEN:=\u001b[32m
COLOR_YELLOW:=\u001b[33m
COLOR_BLUE:=\u001b[34m
COLOR_MAGENTA:=\u001b[35m
COLOR_CYAN:=\u001b[36m
COLOR_WHITE:=\u001b[37m
COLOR_RESET:=\u001b[0m

FILES:=logo.gif
FILES+=logo.png
FILES+=LICENSE
FILES+=controllers/**
FILES+=countries.php
FILES+=index.php
FILES+=${MODULE_NAME}.php
FILES+=sql/**
FILES+=translations/**
FILES+=upgrade/**
FILES+=vendor/**
FILES+=views/index.php
FILES+=views/css/**
FILES+=views/img/**
FILES+=views/js/index.php
FILES+=views/js/dist/*.min.js
FILES+=views/js/dist/*.php
FILES+=views/js/dist/index.php
FILES+=views/templates/**

.PHONY: all quick-clean composer php-scoper node webpack zip vartest

all:
	$(MAKE) quick-clean
	$(MAKE) prod

release:
	$(MAKE) quick-clean
	$(MAKE) prod

prod:
	$(MAKE) composer
	$(MAKE) php-scoper
	$(MAKE) node
	NODE_ENV=production $(MAKE) webpack
	$(MAKE) zip

dev:
	export NODE_ENV=development
	$(MAKE) composer
	$(MAKE) php-scoper
	$(MAKE) node
	NODE_ENV=development $(MAKE) webpack

# Quick aliases
a: all
r: release
p: prod
d: dev
qc: quick-clean

# clean:
# PHP scoper
#	@rm -rf pre-scoper/ 2>/dev/null || true
#	@rm php-scoper.phar 2>/dev/null || true
#	@rm php-scoper.phar.pubkey 2>/dev/null || true

quick-clean:
	@echo -e "${COLOR_BLUE}Cleanup${COLOR_RESET}"
# Remove target file
	@rm -rf build/ 2>/dev/null || true

# Composer
	@rm -rf vendor/ 2>/dev/null || true
	@rm composer.lock 2>/dev/null || true

# Webpack / node.js
	@rm -rf views/js/node_modules/ 2>/dev/null || true
	@rm views/js/package-lock.json 2>/dev/null || true
	@rm views/js/yarn.lock 2>/dev/null || true
	@rm views/js/yarn.lock 2>/dev/null || true
	@rm -rf views/js/dist/ 2>/dev/null || true

composer:
ifeq (,$(wildcard vendor/))
	@echo -e "${COLOR_BLUE}vendor folder is missing, running composer${COLOR_RESET}"
# Composer install
	composer install --no-dev --prefer-dist
# Dump and optimize Composer autoloader
	composer -o dump-autoload
# Copy index.php files to vendor folder or Addons validation
	@echo Copying index.php files to the vendor folder
	@find vendor/ -type d -exec cp index.php {} \;
endif

php-scoper:
# Check if php scoper is available, otherwise download it
	@echo -e "${COLOR_BLUE}Running PHP Scoper${COLOR_RESET}"
ifeq (,$(wildcard php-scoper.phar))
	wget -q https://github.com/humbug/php-scoper/releases/download/0.9.2/php-scoper.phar
	wget -q https://github.com/humbug/php-scoper/releases/download/0.9.2/php-scoper.phar.pubkey
endif
	@rm -rf pre-scoper/ -rf 2>/dev/null || true
	@mkdir pre-scoper
	@mv vendor pre-scoper/
	php ./php-scoper.phar add-prefix -p MollieModule -n
	@mv build/pre-scoper/vendor vendor
	@rm -rf pre-scoper/ -rf 2>/dev/null || true
	@rm -rf build/ 2>/dev/null || true
# Create a new autoloader, the one PHP-scoper generates is not compatible with PHP 5.3.29+
	@composer -o dump-autoload

node:
# Download node modules
# Skip if the node_modules directory already exists
	@echo -e "${COLOR_BLUE}Downloading node_modules${COLOR_RESET}"
ifeq (,$(wildcard views/js/node_modules/))
# Avoid yarn when not available
ifeq (,$(shell which yarn))
	cd views/js/; \
		npm i
else
	cd views/js/; \
		yarn
endif
endif

webpack:
ifndef NODE_ENV
NODE_ENV:=production
endif
webpack:
	@echo -e "${COLOR_BLUE}Running webpack${COLOR_RESET}"
ifndef NODE_ENV
	@export NODE_ENV=production
endif
# Webpack build
ifeq (,$(wildcard views/js/dist/))
	@mkdir -p views/js/dist/
endif
	@cp views/js/index.php views/js/dist/index.php
	@cd views/js/; \
		node_modules/.bin/webpack --mode ${NODE_ENV}

zip:
	@echo -e "${COLOR_BLUE}Going to zip ${COLOR_GREEN}${MODULE_NAME}${COLOR_BLUE} version ${COLOR_GREEN}${MODULE_VERSION}${COLOR_RESET}"
# Remove deprecated files from build
	@mkdir -p build/${MODULE_NAME}
	@$(foreach f,$(FILES),cp --parents -rf $(f) build/$(MODULE_NAME);)
	@cd build/; zip -r -9 ${MODULE_NAME}-v${MODULE_VERSION}.zip ${MODULE_NAME}
	@rm -rf build/${MODULE_NAME} || true

vartest:
ifndef NODE_ENV
NODE_ENV:=production
endif
vartest:
# Use this to test if all environment variables are correctly set
	@echo -e "${COLOR_BLUE}Testing environment variables, NODE_ENV is possibly not set${COLOR_RESET}"
	@echo -e "${COLOR_BLUE}NODE_ENV:${COLOR_YELLOW} ${NODE_ENV}${COLOR_RESET}"
	@echo -e "${COLOR_BLUE}MODULE_NAME:${COLOR_YELLOW} ${MODULE_NAME}${COLOR_RESET}"
	@echo -e "${COLOR_BLUE}MODULE_VERSION:${COLOR_YELLOW} ${MODULE_VERSION}${COLOR_RESET}"
