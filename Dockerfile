FROM node:current-alpine
CMD mkdir /gary
COPY . /gary
CMD node /gary/gary.js