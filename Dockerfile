FROM node:current-alpine

WORKDIR /gary
COPY . .
RUN npm install
CMD ["node", "bot.js"]
