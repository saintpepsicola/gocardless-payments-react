help:		## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

install:	## Build the project from scratch.
	docker-compose down && \
	docker-compose rm && \
	docker-compose pull && \
	docker-compose build --no-cache

all:		## Build, test, and run the project.
	# WIP Make Target

build:		## Build the project.
	docker-compose build

run:		## Run the project.
	docker-compose up --abort-on-container-exit

detatch:	## Run the project in detatched mode.
	docker-compose up -d

stop:		## Stop the project.
	docker-compose down

edit-tests:	## Edit GOSS tests.
	dgoss edit -p 3000:3000 pod:latest

test:		## Run GOSS tests.
	dgoss run -p 3000:3000 pod:latest
