
NAME=garybot

default: build

.PHONY: build run clean

build:
	docker build -t $(NAME)  .

clean:
	docker rm -f $(NAME)

run: clean
	docker run -itd --name $(NAME)  $(NAME)
