
NAME=garybot

default: build

.PHONY: build
build:
	docker build -t $(NAME)  .

.PHONY: clean
clean:
	docker rm -f $(NAME)

.PHONY: run
run: clean
	docker run -itd --name $(NAME)  $(NAME)

.PHONY: dc-build
dc-build:
	docker-compose build

.PHONY: dc-down
dc-down:
	docker-compose down

.PHONY: test
test: dc-down dc-build
	docker-compose run tester
